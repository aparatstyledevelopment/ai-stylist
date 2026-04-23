import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Search, ChevronDown, ShoppingCart } from '../components/icons.jsx';
import { ShopCard } from '../components/ShopCard.jsx';
import { PRODUCTS } from '../data/products.js';

export function ShopPage() {
  const { addToCart, goTo, openFilterSheet } = useLegacyActions();
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
