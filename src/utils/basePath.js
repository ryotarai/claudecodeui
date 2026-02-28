const normalizeBasePath = (value) => {
  if (!value) return '';
  let base = `${value}`.trim();
  if (!base || base === '/') return '';
  if (base.endsWith('/')) {
    base = base.slice(0, -1);
  }
  if (!base.startsWith('/')) {
    base = `/${base}`;
  }
  return base;
};

export const getBasePath = () =>
  normalizeBasePath(window.__ROUTER_BASENAME__ ?? import.meta.env.BASE_URL ?? '/');

export const getBasePathWithTrailingSlash = () => {
  const base = getBasePath();
  return base === '' ? '/' : `${base}/`;
};

export const resolveAppUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (!url.startsWith('/')) return url;

  const apiOverride = normalizeBasePath(import.meta.env.VITE_API_BASE_PATH || '');
  if ((url === '/api' || url.startsWith('/api/')) && apiOverride) {
    if (apiOverride === '/api') return url;
    return `${apiOverride}${url.slice('/api'.length)}`;
  }

  const base = getBasePath();
  return base ? `${base}${url}` : url;
};

export const withBasePath = (path) => {
  if (!path || typeof path !== 'string') return path;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (!path.startsWith('/')) return path;
  const base = getBasePath();
  return base ? `${base}${path}` : path;
};
