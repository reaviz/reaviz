function generateSubset(
  members: any[],
  notMembers: any[],
  lookup: any
): any {
  const sets = members.map((s) => s.label);
  const label = sets.join(' ∩ ');
  const others = members.slice(1).map((s) => lookup.get(s)!);
  const not = notMembers.map((s) => lookup.get(s)!);
  const values: any[] = members[0].values.filter((v) => others.every((o) => o.has(v)) && not.every((o) => !o.has(v)));

  return {
    sets,
    label,
    value: values.length,
    values,
    degree: sets.length,
  };
}

export function extractSets(data: readonly any[], options: any = {}) {
  const sets: any[] = [];
  const lookup = new Map(data.map((s) => [s, new Set(s.values)]));
  const base = data.slice(0, 5);

  switch (base.length) {
    case 1:
      sets.push(generateSubset([base[0]], [], lookup));
      break;
    case 2:
      sets.push(
        generateSubset([base[0]], [base[1]], lookup),
        generateSubset([base[1]], [base[0]], lookup),
        generateSubset([base[0], base[1]], [], lookup)
      );
      break;
    case 3:
      sets.push(
        generateSubset([base[0]], [base[1], base[2]], lookup),
        generateSubset([base[1]], [base[0], base[2]], lookup),
        generateSubset([base[2]], [base[0], base[1]], lookup),
        generateSubset([base[0], base[1]], [base[2]], lookup),
        generateSubset([base[0], base[2]], [base[1]], lookup),
        generateSubset([base[1], base[2]], [base[0]], lookup),
        generateSubset([base[0], base[1], base[2]], [], lookup)
      );
      break;
    case 4:
      sets.push(
        generateSubset([base[0]], [base[1], base[2], base[3]], lookup),
        generateSubset([base[1]], [base[0], base[2], base[3]], lookup),
        generateSubset([base[2]], [base[0], base[1], base[3]], lookup),
        generateSubset([base[3]], [base[0], base[1], base[2]], lookup),
        generateSubset([base[0], base[1]], [base[2], base[3]], lookup),
        generateSubset([base[0], base[2]], [base[1], base[3]], lookup),
        generateSubset([base[0], base[3]], [base[1], base[2]], lookup),
        generateSubset([base[1], base[2]], [base[0], base[3]], lookup),
        generateSubset([base[1], base[3]], [base[0], base[2]], lookup),
        generateSubset([base[2], base[3]], [base[0], base[1]], lookup),
        generateSubset([base[0], base[1], base[2]], [base[3]], lookup),
        generateSubset([base[0], base[1], base[3]], [base[2]], lookup),
        generateSubset([base[0], base[2], base[3]], [base[1]], lookup),
        generateSubset([base[1], base[2], base[3]], [base[0]], lookup),
        generateSubset([base[0], base[1], base[2], base[3]], [], lookup)
      );
      break;
    case 5:
      sets.push(
        generateSubset([base[0]], [base[1], base[2], base[3], base[4]], lookup),
        generateSubset([base[1]], [base[0], base[2], base[3], base[4]], lookup),
        generateSubset([base[2]], [base[0], base[1], base[3], base[4]], lookup),
        generateSubset([base[3]], [base[0], base[1], base[2], base[4]], lookup),
        generateSubset([base[4]], [base[0], base[1], base[2], base[3]], lookup),

        generateSubset([base[0], base[1]], [base[2], base[3], base[4]], lookup),
        generateSubset([base[0], base[2]], [base[1], base[3], base[4]], lookup),
        generateSubset([base[0], base[3]], [base[1], base[2], base[4]], lookup),
        generateSubset([base[0], base[4]], [base[1], base[2], base[3]], lookup),
        generateSubset([base[1], base[2]], [base[0], base[3], base[4]], lookup),
        generateSubset([base[1], base[3]], [base[0], base[2], base[4]], lookup),
        generateSubset([base[1], base[4]], [base[0], base[2], base[3]], lookup),
        generateSubset([base[2], base[3]], [base[0], base[1], base[4]], lookup),
        generateSubset([base[2], base[4]], [base[0], base[1], base[3]], lookup),
        generateSubset([base[3], base[4]], [base[0], base[1], base[2]], lookup),

        generateSubset([base[0], base[1], base[2]], [base[3], base[4]], lookup),
        generateSubset([base[0], base[1], base[3]], [base[2], base[4]], lookup),
        generateSubset([base[0], base[1], base[4]], [base[2], base[3]], lookup),
        generateSubset([base[0], base[2], base[3]], [base[1], base[4]], lookup),
        generateSubset([base[0], base[2], base[4]], [base[1], base[3]], lookup),
        generateSubset([base[0], base[3], base[4]], [base[1], base[2]], lookup),
        generateSubset([base[1], base[2], base[3]], [base[0], base[4]], lookup),
        generateSubset([base[1], base[2], base[4]], [base[0], base[3]], lookup),
        generateSubset([base[1], base[3], base[4]], [base[0], base[2]], lookup),
        generateSubset([base[2], base[3], base[4]], [base[0], base[1]], lookup),

        generateSubset([base[0], base[1], base[2], base[3]], [base[4]], lookup),
        generateSubset([base[0], base[1], base[2], base[4]], [base[3]], lookup),
        generateSubset([base[0], base[1], base[3], base[4]], [base[2]], lookup),
        generateSubset([base[0], base[2], base[3], base[4]], [base[1]], lookup),
        generateSubset([base[1], base[2], base[3], base[4]], [base[0]], lookup),

        generateSubset([base[0], base[1], base[2], base[3], base[4]], [], lookup)
      );
      break;
  }
  return {
    labels: sets.map((s) => s.label),
    datasets: [
      {
        label: options.label || 'Venn Diagram',
        data: sets,
      },
    ],
  };
}
