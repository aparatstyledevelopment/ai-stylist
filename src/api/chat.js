import { streamPost } from './client.js';

export const sendChatMessage = (messages, context = {}) =>
  streamPost('/chat', { messages, context });
