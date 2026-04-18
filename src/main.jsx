import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import './styles/index.css';

async function bootstrap() {
  try {
    const res = await fetch('/config.json');
    if (res.ok) {
      window.__SHOWROOM_CONFIG__ = await res.json();
    }
  } catch {
    window.__SHOWROOM_CONFIG__ = {};
  }
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

bootstrap();
