import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import './styles/base.css';
import './styles/layout.css';
import './styles/orders.css';
import './styles/components.css';
import './styles/forms.css';
import './styles/warehouse.css';
import './styles/tile-detail.css';
import './styles/shop.css';
import './styles/dashboard.css';
import './styles/subscription.css';
import './styles/settings.css';
import './styles/product-detail.css';
import './styles/cart.css';
import './styles/price-management.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
