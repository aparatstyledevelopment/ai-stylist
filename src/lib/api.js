export function apiBase() {
  const cfg = window.__SHOWROOM_CONFIG__;
  if (cfg && cfg.apiBaseUrl) return cfg.apiBaseUrl;
  return 'http://localhost:8000/api';
}

export function imageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const origin = apiBase().replace(/\/api\/?$/, '');
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}

function buildQuery(filters) {
  const params = new URLSearchParams();
  if (filters.gender) params.set('gender', filters.gender);
  if (filters.body_type) params.set('body_type', filters.body_type);
  if (filters.style) params.set('style', filters.style);
  if (filters.budget) params.set('budget', filters.budget);
  return params.toString();
}

export async function fetchFeed(filters, _user) {
  const query = buildQuery(filters);
  const url = `${apiBase()}/feed${query ? `?${query}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch feed');
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data.map((post) => ({
    ...post,
    id: (post._id != null ? String(post._id) : post.id) ?? null,
  }));
}
