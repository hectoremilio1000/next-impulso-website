// /lib/restaurantReportApi.js
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function autocompleteRestaurants(input) {
  const { data } = await axios.get(
    `${API}/restaurant-reports/autocomplete`,
    { params: { input } }
  );
  return data.predictions ?? [];
}

export async function getRestaurantReportPreview(placeId) {
  const { data } = await axios.get(`${API}/restaurant-reports/preview`, {
    params: { place_id: placeId },
  });
  return data.data;
}

export async function createRestaurantReport(placeId) {
  const { data } = await axios.post(`${API}/restaurant-reports`, {
    place_id: placeId,
  });
  return data.data;
}

export async function getRestaurantReport(id) {
  const { data } = await axios.get(`${API}/restaurant-reports/${id}`);
  return data.data;
}

export async function createRestaurantReportLead(reportId, { name, whatsapp, email }) {
  const { data } = await axios.post(
    `${API}/restaurant-reports/${reportId}/lead`,
    { name, whatsapp, email }
  );
  return data.data;
}
