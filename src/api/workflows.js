import { apiFetch, streamPost } from './client.js';

export const getWorkflowTemplates = () => apiFetch('/workflows/templates');
export const getScheduledWorkflows = () => apiFetch('/workflows/scheduled');
export const getActiveWorkflows = () => apiFetch('/workflows/active');
export const runWorkflow = (type, payload) => streamPost('/workflows/run', { type, payload });
