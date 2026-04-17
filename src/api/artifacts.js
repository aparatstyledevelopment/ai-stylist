import { apiFetch } from './client.js';

export const listArtifacts = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return apiFetch(`/artifacts${qs ? '?' + qs : ''}`);
};
export const getArtifact = (id) => apiFetch(`/artifacts/${id}`);
export const deleteArtifact = (id) => apiFetch(`/artifacts/${id}`, { method: 'DELETE' });
export const saveArtifact = (artifact) => apiFetch('/artifacts', { method: 'POST', body: JSON.stringify(artifact) });
