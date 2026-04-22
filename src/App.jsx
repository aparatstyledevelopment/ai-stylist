import { NavigationProvider, useNavigation } from './context/NavigationContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { OverlayProvider } from './context/OverlayContext.jsx';
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

function DeviceShell() {
  return (
    <div className="device">
      <div className="screen">
        <div className="viewport">
          <StatusBar />
          <Pages />
          <GlobalNav />

          {/* Overlays */}
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

export function App() {
  return (
    <NavigationProvider>
      <ToastProvider>
        <OverlayProvider>
          <InfoLabel />
          <ResetButton />
          <DeviceShell />
        </OverlayProvider>
      </ToastProvider>
    </NavigationProvider>
  );
}
