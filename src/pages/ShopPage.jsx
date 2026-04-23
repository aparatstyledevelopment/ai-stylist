import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Search, ChevronDown, ShoppingCart } from '../components/icons.jsx';
import { ShopCard } from '../components/ShopCard.jsx';
import { PRODUCTS } from '../data/products.js';
import { useOnboarding } from '../context/OnboardingContext.jsx';

export function ShopPage() {
  const { addToCart, goTo, openFilterSheet } = useLegacyActions();
  const { isEmpty } = useOnboarding();

  if (isEmpty) return (
    <div className="ob-empty">
      <div className="ob-empty-illus">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="32" height="32"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      </div>
      <h3>ویترین خالیه</h3>
      <p>بعد از قیمت‌گذاری روی کاشی‌ها،<br />محصولات اینجا ظاهر میشن.</p>
      <button className="btn primary" onClick={() => goTo('price-management')}>
        قیمت‌گذاری محصولات
      </button>
    </div>
  );

  return (
    <>
          <div className="shop-header">
            <button className="icon-btn cart-icon" id="shop-cart-icon" onClick={() => { goTo('cart') }}>
              <ShoppingCart strokeWidth={1.8} />
              <span className="cart-badge" id="shop-cart-badge">۲</span>
            </button>
            <div className="shop-search">
              <Search strokeWidth={1.8} />
              <input placeholder="جستجو در کاشی‌ها…" />
            </div>
          </div>
          
          <div className="shop-filter-chips-wrap">
            <div className="shop-filter-chips">
              <button className="sfc all active" onClick={() => { clearAllFilters() }}>
                همه
              </button>
              <button className="sfc" data-filter="size" onClick={() => { openFilterSheet('size') }}>
                <span className="sfc-label">سایز</span>
                <span className="sfc-count"></span>
                <ChevronDown size={10} />
              </button>
              <button className="sfc" data-filter="body" onClick={() => { openFilterSheet('body') }}>
                <span className="sfc-label">بدنه</span>
                <span className="sfc-count"></span>
                <ChevronDown size={10} />
              </button>
              <button className="sfc" data-filter="glaze" onClick={() => { openFilterSheet('glaze') }}>
                <span className="sfc-label">لعاب</span>
                <span className="sfc-count"></span>
                <ChevronDown size={10} />
              </button>
              <button className="sfc" data-filter="usage" onClick={() => { openFilterSheet('usage') }}>
                <span className="sfc-label">کاربرد</span>
                <span className="sfc-count"></span>
                <ChevronDown size={10} />
              </button>
            </div>
          </div>

          <div className="content shop-grid">
            {PRODUCTS.map((p) => (
              <ShopCard
                key={p.id}
                {...p}
                onPress={() => goTo('product-detail')}
                onAddToCart={addToCart}
              />
            ))}
          </div></>
  );
}
