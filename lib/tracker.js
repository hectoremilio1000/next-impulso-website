/**
 * First-party tracking library for impulso.
 *
 * Captures click IDs (fbclid, gclid, ttclid, msclkid) and UTMs from the URL,
 * persists a _gs_lead_id cookie for cross-session identity, stores first-touch
 * attribution in localStorage and last-touch in sessionStorage, and posts
 * touchpoints to pos_tracking_api.
 *
 * Identical engine to growthsuite / lalloronacantina; differs only in default `site`.
 *
 * Usage from _app.js:
 *   import { initTracker, trackPageview } from '../lib/tracker';
 *   useEffect(() => { initTracker({ site: 'impulso' }) }, []);
 *   router.events.on('routeChangeComplete', () => trackPageview());
 */

const LEAD_COOKIE = '_gs_lead_id';
const FIRST_ATTR_KEY = '_gs_first_attr';
const LAST_ATTR_KEY = '_gs_last_attr';
const SESSION_KEY = '_gs_session_id';

const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 365 * 2; // 2 years

let config = {
  site: 'impulso',
  endpoint: '',
  debug: false,
};

let initialized = false;

/* ─────────────────────────── cookies/storage ─────────────────────────── */

function readCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name, value, maxAgeSec) {
  if (typeof document === 'undefined') return;
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie =
    name + '=' + encodeURIComponent(value) +
    '; Path=/; Max-Age=' + maxAgeSec +
    '; SameSite=Lax' + secure;
}

function readJSON(storage, key) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJSON(storage, key, value) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota/private mode */
  }
}

/* ─────────────────────────── id helpers ─────────────────────────── */

function newLeadUid() {
  const rand = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
  return 'ld_' + Date.now().toString(36) + rand;
}

function newEventId() {
  return 'ev_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 12);
}

function ensureLeadUid() {
  let uid = readCookie(LEAD_COOKIE);
  if (!uid) {
    uid = newLeadUid();
    writeCookie(LEAD_COOKIE, uid, COOKIE_MAX_AGE_SEC);
  }
  return uid;
}

function ensureSessionId() {
  if (typeof sessionStorage === 'undefined') return null;
  const existing = sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const sid = 'sess_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  sessionStorage.setItem(SESSION_KEY, sid);
  return sid;
}

/* ─────────────────────────── attribution capture ─────────────────────────── */

function parseAttributionFromUrl() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);

  const pick = (k) => {
    const v = params.get(k);
    return v ? v.trim() : null;
  };

  return {
    utm_source: pick('utm_source'),
    utm_medium: pick('utm_medium'),
    utm_campaign: pick('utm_campaign'),
    utm_content: pick('utm_content'),
    utm_term: pick('utm_term'),
    fbclid: pick('fbclid'),
    gclid: pick('gclid'),
    ttclid: pick('ttclid'),
    msclkid: pick('msclkid'),
  };
}

function hasAnyAttribution(a) {
  return !!(
    a.utm_source || a.utm_medium || a.utm_campaign ||
    a.fbclid || a.gclid || a.ttclid || a.msclkid
  );
}

function loadCookieValue(name) {
  return readCookie(name);
}

/**
 * Compute the attribution for the current touchpoint by merging URL params,
 * sticky first-touch (localStorage) and last-touch (sessionStorage).
 */
function computeAttribution() {
  const urlAttr = parseAttributionFromUrl();

  let firstAttr = null;
  let lastAttr = null;

  if (typeof localStorage !== 'undefined') {
    firstAttr = readJSON(localStorage, FIRST_ATTR_KEY);
  }
  if (typeof sessionStorage !== 'undefined') {
    lastAttr = readJSON(sessionStorage, LAST_ATTR_KEY);
  }

  /* First visit ever: save first-touch */
  if (!firstAttr && hasAnyAttribution(urlAttr) && typeof localStorage !== 'undefined') {
    firstAttr = { ...urlAttr, captured_at: new Date().toISOString() };
    writeJSON(localStorage, FIRST_ATTR_KEY, firstAttr);
  }

  /* Always refresh last-touch when the URL carries attribution */
  if (hasAnyAttribution(urlAttr) && typeof sessionStorage !== 'undefined') {
    lastAttr = { ...urlAttr, captured_at: new Date().toISOString() };
    writeJSON(sessionStorage, LAST_ATTR_KEY, lastAttr);
  }

  /* Merged: prefer URL > last session > first touch (for enrichment fallback) */
  const source = urlAttr.utm_source || (lastAttr && lastAttr.utm_source) || (firstAttr && firstAttr.utm_source) || null;
  const medium = urlAttr.utm_medium || (lastAttr && lastAttr.utm_medium) || (firstAttr && firstAttr.utm_medium) || null;
  const campaign = urlAttr.utm_campaign || (lastAttr && lastAttr.utm_campaign) || (firstAttr && firstAttr.utm_campaign) || null;
  const content = urlAttr.utm_content || (lastAttr && lastAttr.utm_content) || null;
  const term = urlAttr.utm_term || (lastAttr && lastAttr.utm_term) || null;

  return {
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
    utm_content: content,
    utm_term: term,
    fbclid: urlAttr.fbclid || (lastAttr && lastAttr.fbclid) || (firstAttr && firstAttr.fbclid) || null,
    gclid: urlAttr.gclid || (lastAttr && lastAttr.gclid) || (firstAttr && firstAttr.gclid) || null,
    ttclid: urlAttr.ttclid || (lastAttr && lastAttr.ttclid) || (firstAttr && firstAttr.ttclid) || null,
    msclkid: urlAttr.msclkid || (lastAttr && lastAttr.msclkid) || (firstAttr && firstAttr.msclkid) || null,
    _first: firstAttr,
    _last: lastAttr,
  };
}

function deriveChannel(a) {
  if (a.fbclid) return 'meta';
  if (a.ttclid) return 'tiktok';
  if (a.gclid) return 'google';
  if (a.msclkid) return 'bing';
  const s = (a.utm_source || '').toLowerCase();
  if (['facebook', 'fb', 'meta', 'instagram', 'ig'].includes(s)) return 'meta';
  if (s === 'tiktok' || s === 'tt') return 'tiktok';
  if (['google', 'google_ads', 'googleads', 'adwords'].includes(s)) return 'google';
  if (s === 'whatsapp' || s === 'wa') return 'whatsapp';
  if (s) return s;

  const ref = (typeof document !== 'undefined' ? document.referrer : '') || '';
  if (ref.includes('facebook.com') || ref.includes('instagram.com')) return 'meta';
  if (ref.includes('tiktok.com')) return 'tiktok';
  if (ref.includes('google.')) return 'google';
  if (!ref) return 'direct';
  return 'referral';
}

/* ─────────────────────────── public API ─────────────────────────── */

export function initTracker({ site, endpoint, debug } = {}) {
  if (typeof window === 'undefined') return;

  config.site = site || config.site;
  config.endpoint =
    endpoint ||
    (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_TRACKING_API_URL) ||
    'http://localhost:3349';
  config.debug = !!debug;

  ensureLeadUid();
  ensureSessionId();
  computeAttribution(); // side-effect: saves first-touch if URL has attribution

  initialized = true;
  if (config.debug) {
    console.log('[tracker] initialized', {
      lead_uid: readCookie(LEAD_COOKIE),
      endpoint: config.endpoint,
      site: config.site,
    });
  }

  /* Send initial pageview */
  trackPageview({ event_name: 'page_view' });
}

export function trackPageview(opts = {}) {
  if (typeof window === 'undefined' || !initialized) return;

  const attr = computeAttribution();
  const leadUid = ensureLeadUid();
  const sessionId = ensureSessionId();

  const payload = {
    lead_uid: leadUid,
    site: config.site,
    event_name: opts.event_name || 'page_view',
    event_id: newEventId(),
    occurred_at: new Date().toISOString(),

    page_url: window.location.href,
    landing_page: opts.landing_page || window.location.href,
    referrer: document.referrer || null,

    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
    utm_content: attr.utm_content,
    utm_term: attr.utm_term,

    fbclid: attr.fbclid,
    gclid: attr.gclid,
    ttclid: attr.ttclid,
    msclkid: attr.msclkid,

    fbp: loadCookieValue('_fbp'),
    fbc: loadCookieValue('_fbc'),

    session_id: sessionId,
    user_agent: navigator.userAgent,

    meta: opts.meta || {},
  };

  const body = JSON.stringify(payload);
  const url = config.endpoint.replace(/\/$/, '') + '/api/events';

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(url, blob);
    } else {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
        credentials: 'omit',
      }).catch(() => {});
    }
    if (config.debug) console.log('[tracker] sent', payload);
  } catch (err) {
    if (config.debug) console.warn('[tracker] send failed', err);
  }
}

export function trackEvent(eventName, meta = {}) {
  return trackPageview({ event_name: eventName, meta });
}

export function getLeadUid() {
  if (typeof window === 'undefined') return null;
  return readCookie(LEAD_COOKIE);
}

export function getCurrentAttribution() {
  if (typeof window === 'undefined') return { channel: null };
  const attr = computeAttribution();
  return {
    channel: deriveChannel(attr),
    source: attr.utm_source,
    medium: attr.utm_medium,
    campaign: attr.utm_campaign,
    content: attr.utm_content,
    term: attr.utm_term,
  };
}

/**
 * Construye una URL del widget de pos_booking_api con lead_uid + UTMs
 * inyectados. El widget vive en otro dominio (iframe), así que NO puede
 * leer cookies del padre — por eso pasamos todo via query params.
 *
 *   buildBookingWidgetUrl('http://localhost:5174', 'impulso-restaurantero', 'demo-impulso')
 *   → 'http://localhost:5174/?slug=impulso-restaurantero&type=demo-impulso&lead_uid=ld_xyz&utm_source=...'
 *
 * options.maxWidth (px): hace el widget más compacto en este embed (?maxw=).
 */
export function buildBookingWidgetUrl(widgetBaseUrl, slug, eventTypeSlug, options = {}) {
  if (!widgetBaseUrl || !slug || typeof window === 'undefined') return widgetBaseUrl || '';

  const leadUid = getLeadUid();
  const attr = computeAttribution();

  let url;
  try {
    url = new URL(widgetBaseUrl);
  } catch {
    return widgetBaseUrl;
  }

  url.searchParams.set('slug', slug);
  if (eventTypeSlug) url.searchParams.set('type', eventTypeSlug);
  if (options.maxWidth) url.searchParams.set('maxw', String(options.maxWidth));

  if (leadUid) url.searchParams.set('lead_uid', leadUid);

  if (attr.utm_source) url.searchParams.set('utm_source', attr.utm_source);
  if (attr.utm_medium) url.searchParams.set('utm_medium', attr.utm_medium);
  if (attr.utm_campaign) url.searchParams.set('utm_campaign', attr.utm_campaign);
  if (attr.utm_content) url.searchParams.set('utm_content', attr.utm_content);
  if (attr.utm_term) url.searchParams.set('utm_term', attr.utm_term);

  return url.toString();
}

/**
 * Appends lead_uid (as utm_content) + UTMs to a Calendly embed URL so the
 * webhook can match the booking back to this lead.
 */
export function buildCalendlyUrl(baseUrl) {
  if (!baseUrl || typeof window === 'undefined') return baseUrl;

  const leadUid = getLeadUid();
  const attr = computeAttribution();

  let url;
  try {
    url = new URL(baseUrl, window.location.origin);
  } catch {
    return baseUrl;
  }

  if (leadUid) url.searchParams.set('utm_content', leadUid);
  if (attr.utm_source) url.searchParams.set('utm_source', attr.utm_source);
  if (attr.utm_medium) url.searchParams.set('utm_medium', attr.utm_medium);
  if (attr.utm_campaign) url.searchParams.set('utm_campaign', attr.utm_campaign);
  if (attr.utm_term) url.searchParams.set('utm_term', attr.utm_term);

  /* Custom field picked up server-side as tracking.utm_site — separates
   * leads from different sites when they feed into the same API */
  url.searchParams.set('utm_site', config.site);

  return url.toString();
}
