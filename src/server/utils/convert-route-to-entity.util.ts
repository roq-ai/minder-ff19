const mapping: Record<string, string> = {
  companies: 'company',
  employees: 'employee',
  users: 'user',
  'water-intakes': 'water_intake',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
