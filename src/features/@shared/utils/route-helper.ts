function buildHref(
  query: {
    [key: string]: string | number;
  },
  oldRoute: {
    params?: URLSearchParams;
    path: string;
  },
) {
  const newQuery = new URLSearchParams(oldRoute.params?.toString() ?? '');
  for (const [key, value] of Object.entries(query)) {
    newQuery.set(key, String(value));
  }
  return `${oldRoute.path}?${newQuery.toString()}`;
}

export { buildHref };
