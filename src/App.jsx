import { useState } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { OverlayProvider } from './context/OverlayContext.jsx';
import { OnboardingProvider } from './context/OnboardingContext.jsx';
import { StatusBar } from './components/StatusBar.jsx';
import { GlobalNav } from './components/GlobalNav.jsx';
import { InfoLabel } from './components/InfoLabel.jsx';
import { ResetButton } from './components/ResetButton.jsx';

import { DashboardPage } from './pages/DashboardPage.jsx';
import { SubscriptionPage } from './pages/SubscriptionPage.jsx';
import { OrdersPage } from './pages/OrdersPage.jsx';
import { OrderDetailPage } from './pages/OrderDetailPage.jsx';
import { ProductDetailPage } from './pages/ProductDetailPage.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { ShopPage } from './pages/ShopPage.jsx';
import { WarehousePage } from './pages/WarehousePage.jsx';
import { AddTilePage } from './pages/AddTilePage.jsx';
import { TileDetailPage } from './pages/TileDetailPage.jsx';
import { ExcelAiPage } from './pages/ExcelAiPage.jsx';
import { B2BConnectorPage } from './pages/B2BConnectorPage.jsx';
import { PriceManagementPage } from './pages/PriceManagementPage.jsx';
import { TeamPage } from './pages/TeamPage.jsx';

import { RemoveModal } from './overlays/RemoveModal.jsx';
import { FilterSheet } from './overlays/FilterSheet.jsx';
import { SettingsSheet } from './overlays/SettingsSheet.jsx';
import { WorkflowSheet } from './overlays/WorkflowSheet.jsx';
import { QrSheet } from './overlays/QrSheet.jsx';

const PAGE_REGISTRY = {
  dashboard: DashboardPage,
  subscription: SubscriptionPage,
  orders: OrdersPage,
  'order-detail': OrderDetailPage,
  'product-detail': ProductDetailPage,
  cart: CartPage,
  shop: ShopPage,
  warehouse: WarehousePage,
  'add-tile': AddTilePage,
  'tile-detail': TileDetailPage,
  'excel-ai': ExcelAiPage,
  'b2b-connector': B2BConnectorPage,
  'price-management': PriceManagementPage,
  team: TeamPage,
};

function Pages() {
  const { currentPage, direction } = useNavigation();
  const Page = PAGE_REGISTRY[currentPage] || DashboardPage;
  const animClass = direction === 'back' ? 'page active back' : 'page active';
  return (
    <div className="pages">
      <div className={animClass} key={currentPage} data-page={currentPage} style={{ display: 'flex' }}>
        <Page />
      </div>
    </div>
  );
}

function BrowserChrome() {
  return (
    <div className="browser-chrome">
      <div className="bc-dots">
        <span className="bc-dot red" />
        <span className="bc-dot yellow" />
        <span className="bc-dot green" />
      </div>
      <div className="bc-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11" style={{opacity:.5}}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span className="bc-url">app.ai-stylist.ir</span>
      </div>
      <div style={{width:'60px'}} />
    </div>
  );
}

function DeviceShell({ mode }) {
  return (
    <div className="device" data-mode={mode}>
      {mode === 'desktop' && <BrowserChrome />}
      {mode === 'tablet' && <div className="tablet-home-bar" />}
      <div className="screen">
        <div className="viewport">
          <StatusBar />
          <Pages />
          <GlobalNav />

          <RemoveModal />
          <FilterSheet />
          <SettingsSheet />
          <WorkflowSheet />
          <QrSheet />
        </div>
      </div>
    </div>
  );
}

function DeviceToggle({ mode, onChange }) {
  return (
    <div className="device-toggle">
      <button className={`dt-btn${mode === 'phone' ? ' on' : ''}`} onClick={() => onChange('phone')} title="Phone">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="6" y="2" width="12" height="20" rx="3"/>
          <circle cx="12" cy="18.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
      </button>
      <button className={`dt-btn${mode === 'tablet' ? ' on' : ''}`} onClick={() => onChange('tablet')} title="Tablet">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="3"/>
          <circle cx="19.5" cy="12" r="0.8" fill="currentColor" stroke="none"/>
        </svg>
      </button>
      <button className={`dt-btn${mode === 'desktop' ? ' on' : ''}`} onClick={() => onChange('desktop')} title="Desktop">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="4" width="20" height="13" rx="2"/>
          <path d="M8 21h8M12 17v4" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

export function App() {
  const [mode, setMode] = useState('phone');
  return (
    <NavigationProvider>
      <ToastProvider>
        <OverlayProvider>
          <OnboardingProvider>
            <InfoLabel />
            <ResetButton />
            <div className={`device-frame-wrap mode-${mode}`}>
              <DeviceShell mode={mode} />
            </div>
            <DeviceToggle mode={mode} onChange={setMode} />
          </OnboardingProvider>
        </OverlayProvider>
      </ToastProvider>
    </NavigationProvider>
  );
}
