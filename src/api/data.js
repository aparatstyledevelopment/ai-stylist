import { apiFetch } from './client.js';

export const getInvestors = (params = {}) => apiFetch('/data/investors?' + new URLSearchParams(params));
export const getHoldings = (params = {}) => apiFetch('/data/holdings?' + new URLSearchParams(params));
export const getPeers = (params = {}) => apiFetch('/data/peers?' + new URLSearchParams(params));
export const getMeetings = (params = {}) => apiFetch('/data/meetings?' + new URLSearchParams(params));
export const getCRM = (params = {}) => apiFetch('/data/crm?' + new URLSearchParams(params));
export const resolveCitation = (citationId) => apiFetch(`/data/citation/${citationId}`);
