const BASE_DOMAINS = (process.env.ALLOWED_BASE_DOMAINS ?? 'kanopa.app')
  .split(',')
  .map((d) => d.trim().toLowerCase())
  .filter(Boolean);

const SUBDOMAIN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

// eslint-disable-next-line @typescript-eslint/require-await
export async function isAllowedOrigin(origin?: string): Promise<boolean> {
  if (!origin) return false;

  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  if (url.origin !== origin) return false;

  const { protocol, hostname, port } = url;

  if (process.env.ENVIRONMENT === 'development')
    return (
      protocol === 'http:' &&
      (hostname === 'localhost' || hostname.endsWith('.localhost'))
    );

  if (protocol !== 'https:' || port) return false;

  for (const base of BASE_DOMAINS) {
    if (hostname === base) return true;
    if (hostname.endsWith(`.${base}`))
      return SUBDOMAIN.test(hostname.slice(0, -(base.length + 1)));
  }

  // todo: fetch custom domains list - @loicmaes
  return false;
}
