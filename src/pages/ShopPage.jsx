import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { ShoppingCart, Search, ChevronDown, Heart, Home } from '../components/icons.jsx';

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
            
            {/* Product 1: normal stock */}
            <div className="shop-card" onClick={() => { goTo('product-detail') }}>
              <div className="sc-media pattern-a">
                <div className="sc-pattern-inner"></div>
                <button className="sc-fav-btn" onClick={(e) => { e.stopPropagation(); e.currentTarget.classList.toggle('on'); }}>
                  <Heart strokeWidth={1.8} />
                </button>
                <span className="sc-stock-badge">
                  <span className="sc-stock-dot"></span>
                  ۷۲۰ عدد
                </span>
              </div>
              <div className="sc-info">
                <div className="sc-name">کاشی خاک‌سفید — پله ۸۰۵</div>
                <div className="sc-brand">
                  <Home strokeWidth={1.8} />
                  پارلاسرام
                </div>
                <div className="sc-attrs">
                  <span className="sc-attr">۱۰۰×۳۵</span>
                  <span className="sc-attr">سرامیک</span>
                  <span className="sc-attr">مات</span>
                </div>
                <div className="sc-spacer"></div>
                <div className="sc-footer-inline">
                  <div className="sc-price-wrap">
                    <span className="sc-pv">۵۸۰,۰۰۰</span>
                    <span className="sc-pu">تومان / عدد</span>
                  </div>
                  <button className="sc-add" onClick={(e) => { e.stopPropagation(); addToCart(); }}>
                    <ShoppingCart strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product 2: liked */}
            <div className="shop-card" onClick={() => { goTo('product-detail') }}>
              <div className="sc-media pattern-b">
                <div className="sc-pattern-inner"></div>
                <button className="sc-fav-btn on" onClick={(e) => { e.stopPropagation(); e.currentTarget.classList.toggle('on'); }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                </button>
                <span className="sc-stock-badge">
                  <span className="sc-stock-dot"></span>
                  ۱,۲۶۰ عدد
                </span>
              </div>
              <div className="sc-info">
                <div className="sc-name">کاشی خاک‌سفید — پله ۸۴۶</div>
                <div className="sc-brand">
                  <Home strokeWidth={1.8} />
                  پارلاسرام
                </div>
                <div className="sc-attrs">
                  <span className="sc-attr">۱۰۰×۳۵</span>
                  <span className="sc-attr">سرامیک</span>
                  <span className="sc-attr">براق</span>
                </div>
                <div className="sc-spacer"></div>
                <div className="sc-footer-inline">
                  <div className="sc-price-wrap">
                    <span className="sc-pv">۶۴۰,۰۰۰</span>
                    <span className="sc-pu">تومان / عدد</span>
                  </div>
                  <button className="sc-add" onClick={(e) => { e.stopPropagation(); addToCart(); }}>
                    <ShoppingCart strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product 3: low stock */}
            <div className="shop-card" onClick={() => { goTo('product-detail') }}>
              <div className="sc-media pattern-c">
                <div className="sc-pattern-inner"></div>
                <button className="sc-fav-btn" onClick={(e) => { e.stopPropagation(); e.currentTarget.classList.toggle('on'); }}>
                  <Heart strokeWidth={1.8} />
                </button>
                <span className="sc-stock-badge low">
                  <span className="sc-stock-dot"></span>
                  فقط ۱۵ عدد
                </span>
              </div>
              <div className="sc-info">
                <div className="sc-name">کاشی خاک‌سفید — پله ۸۳۰ پرسلان</div>
                <div className="sc-brand">
                  <Home strokeWidth={1.8} />
                  پارلاسرام
                </div>
                <div className="sc-attrs">
                  <span className="sc-attr">۱۰۰×۳۰</span>
                  <span className="sc-attr">پرسلان</span>
                  <span className="sc-attr">مات</span>
                </div>
                <div className="sc-spacer"></div>
                <div className="sc-footer-inline">
                  <div className="sc-price-wrap">
                    <span className="sc-pv">۷۲۰,۰۰۰</span>
                    <span className="sc-pu">تومان / عدد</span>
                  </div>
                  <button className="sc-add" onClick={(e) => { e.stopPropagation(); addToCart(); }}>
                    <ShoppingCart strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product 4 */}
            <div className="shop-card" onClick={() => { goTo('product-detail') }}>
              <div className="sc-media pattern-d">
                <div className="sc-pattern-inner"></div>
                <button className="sc-fav-btn" onClick={(e) => { e.stopPropagation(); e.currentTarget.classList.toggle('on'); }}>
                  <Heart strokeWidth={1.8} />
                </button>
                <span className="sc-stock-badge">
                  <span className="sc-stock-dot"></span>
                  ۹۲ عدد
                </span>
              </div>
              <div className="sc-info">
                <div className="sc-name">کاشی پرسلان کلکته گلد لعاب‌دار</div>
                <div className="sc-brand">
                  <Home strokeWidth={1.8} />
                  پرسلان ایرانا
                </div>
                <div className="sc-attrs">
                  <span className="sc-attr">۱۲۰×۶۰</span>
                  <span className="sc-attr">پرسلان</span>
                  <span className="sc-attr">پولیش</span>
                </div>
                <div className="sc-spacer"></div>
                <div className="sc-footer-inline">
                  <div className="sc-price-wrap">
                    <span className="sc-pv">۱,۲۵۰,۰۰۰</span>
                    <span className="sc-pu">تومان / عدد</span>
                  </div>
                  <button className="sc-add" onClick={(e) => { e.stopPropagation(); addToCart(); }}>
                    <ShoppingCart strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </div>

          </div></>
  );
}
