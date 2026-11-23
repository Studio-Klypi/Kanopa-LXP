const BASE_DOMAINS = ['kanopa.app', 'localhost'];

export function getSubdomain(hostname: string): string | null {
  const host = hostname.split(':')[0];

  for (const baseDomain of BASE_DOMAINS) {
    if (host === baseDomain) {
      return null;
    }

    if (host.endsWith(`.${baseDomain}`)) {
      return host.slice(0, -(baseDomain.length + 1)).split('.')[0];
    }
  }

  return null;
}

export function useSubdomain() {
  const { hostname } = useRequestURL();

  return computed(() => getSubdomain(hostname));
}
