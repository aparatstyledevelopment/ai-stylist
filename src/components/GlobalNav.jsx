import { useNavigation } from '../context/NavigationContext.jsx';

const NAV_MAP = {
  dashboard: 'dashboard',
  shop: 'shop',
  cart: 'shop',
  'product-detail': 'shop',
  warehouse: 'warehouse',
  'tile-detail': 'warehouse',
  'add-tile': 'warehouse',
  'price-management': 'warehouse',
  'excel-ai': 'warehouse',
  orders: 'orders',
  'order-detail': 'orders',
  team: 'dashboard',
  'b2b-connector': 'dashboard',
  subscription: 'dashboard',
};

const HIDE_NAV_PAGES = new Set(['product-detail']);

export function GlobalNav() {
  const { currentPage, goTo } = useNavigation();
  if (HIDE_NAV_PAGES.has(currentPage)) return null;
  const active = NAV_MAP[currentPage] || '';

  const items = [
    {
      key: 'dashboard',
      label: 'خانه',
      outline: (
        <svg className="ni-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 12l9-9 9 9" />
          <path d="M5 10v10h14V10" />
        </svg>
      ),
      filled: (
        <svg className="ni-filled" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.1L1 12h3v9h6v-6h4v6h6v-9h3z" />
        </svg>
      ),
    },
    {
      key: 'shop',
      label: 'فروشگاه',
      outline: (
        <svg className="ni-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M2 7h20l-2 13H4z" />
          <path d="M9 7V3a3 3 0 0 1 6 0v4" />
        </svg>
      ),
      filled: (
        <svg className="ni-filled" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 7H2l2 14h16l2-14zM9 7V3a3 3 0 0 1 6 0v4h-2V3a1 1 0 0 0-2 0v4H9z" />
        </svg>
      ),
    },
    {
      key: 'warehouse',
      label: 'انبار',
      outline: (
        <svg className="ni-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
        </svg>
      ),
      filled: (
        <svg className="ni-filled" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 3H3a1 1 0 0 0-1 1v5h20V4a1 1 0 0 0-1-1zM2 11v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-9H2z" />
        </svg>
      ),
    },
    {
      key: 'orders',
      label: 'حواله',
      outline: (
        <svg className="ni-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 7h-4V3H8v4H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" />
        </svg>
      ),
      filled: (
        <svg className="ni-filled" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-6 0h-4V5h4v2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bottom-nav" id="global-nav">
      {items.map((item) => (
        <div
          key={item.key}
          className={`nav-item${active === item.key ? ' active' : ''}`}
          data-nav={item.key}
          onClick={() => goTo(item.key)}
        >
          {item.outline}
          {item.filled}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
