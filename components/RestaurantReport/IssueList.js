function groupIssues(issues) {
  const groups = [];
  const groupByName = new Map();

  issues.forEach((issue) => {
    const name = issue.group || "General";
    if (!groupByName.has(name)) {
      const group = { name, issues: [] };
      groupByName.set(name, group);
      groups.push(group);
    }
    groupByName.get(name).issues.push(issue);
  });

  return groups;
}

function IssueRow({ issue }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-[2px] flex h-6 w-6 flex-none items-center justify-center rounded-full text-sm font-bold ${
          issue.pass
            ? "bg-emerald-500 text-black"
            : "bg-red-500/90 text-white"
        }`}
      >
        {issue.pass ? "✓" : "✗"}
      </span>
      <div>
        <p className="parrafo-tw text-white/85">{issue.label}</p>
        <p className="mt-0.5 text-xs text-white/40">{issue.why}</p>
      </div>
    </li>
  );
}

export default function IssueList({ title, intro, issues, header }) {
  const groups = groupIssues(issues.filter((issue) => issue.checkable));

  return (
    <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 md:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
        {title}
      </h3>

      {intro && <p className="mt-2 text-sm text-white/50">{intro}</p>}

      {header && <div className="mt-4">{header}</div>}

      <div className="mt-5 space-y-6">
        {groups.map((group) => (
          <div key={group.name}>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
              {group.name}
            </p>
            <ul className="mt-3 space-y-3">
              {group.issues.map((issue) => (
                <IssueRow key={issue.key} issue={issue} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
