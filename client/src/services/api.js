// Thin fetch wrapper. All requests are same-origin (/api) so the admin cookie is sent automatically.
export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors || {};
  }
}

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`/api${path}`, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.message || 'Something went wrong', res.status, data.errors);
  return data;
}

export const api = {
  submitApplication: (payload) => request('/applications', { method: 'POST', body: payload }),
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me'),
  stats: () => request('/admin/applications/stats'),
  listApplications: (params) => request(`/admin/applications?${new URLSearchParams(params)}`),
  updateApplication: (id, patch) => request(`/admin/applications/${id}`, { method: 'PATCH', body: patch }),
  deleteApplication: (id) => request(`/admin/applications/${id}`, { method: 'DELETE' }),
  exportUrl: (params) => `/api/admin/applications/export?${new URLSearchParams(params)}`,
};
