import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { imageUrl } from '../lib/api.js';
import { formatNumber } from '../lib/format.js';

const FREE_SHIPPING_THRESHOLD = 500000;

export function Basket() {
  const navigate = useNavigate();
  const { basket, removeFromBasket } = useApp();

  const subtotal = basket.reduce((sum, entry) => {
    if (entry.type === 'post') {
      return sum + (entry.post.selling_price || entry.post.price);
    }
    return sum + (entry.product.selling_price || entry.product.price);
  }, 0);

  const count = basket.length;
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className="basket">
      <header className="basket__header">
        <div className="basket__header-top">
          <button
            type="button"
            className="basket__back"
            onClick={() => navigate(-1)}
            aria-label="بازگشت"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: 'scaleX(-1)' }}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          {count > 0 && (
            <span className="basket__count" aria-hidden>
              {count} قلم
            </span>
          )}
        </div>
        <h1 className="basket__title">سبد خرید</h1>
        <p className="basket__subtitle">محصولات انتخاب‌شده شما برای خرید</p>
      </header>
      <div className="basket__info-strip">
        <span className="basket__info-icon" aria-hidden>
          🚚
        </span>
        <span>
          ارسال رایگان برای سفارش بالای {formatNumber(FREE_SHIPPING_THRESHOLD)} تومان
        </span>
      </div>
      <div className="basket__list">
        {basket.length === 0 ? (
          <div className="basket__empty">
            <div className="basket__empty-icon" aria-hidden>
              🛒
            </div>
            <p className="basket__empty-title">سبد شما خالی است</p>
            <p className="basket__empty-desc">
              با انتخاب محصولات از شووروم، آن‌ها را اینجا ببینید و برای تکمیل خرید آماده کنید.
            </p>
            <Link to="/home" className="basket__empty-cta">
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <ul className="basket__items">
            {basket.map((entry, idx) => {
              const imgSrc =
                entry.type === 'post'
                  ? imageUrl(entry.post.main_image)
                  : imageUrl(entry.product.thumbnail || entry.product.images?.[0]);
              const price =
                entry.type === 'post'
                  ? entry.post.selling_price || entry.post.price
                  : entry.product.selling_price || entry.product.price;
              return (
                <li key={idx} className="basket__item">
                  <div className="basket__item-img-wrap">
                    <img src={imgSrc} alt="" className="basket__item-img" />
                    {entry.type === 'product' && entry.product.brand && (
                      <span className="basket__item-brand">{entry.product.brand}</span>
                    )}
                  </div>
                  <div className="basket__item-info">
                    <span className="basket__item-title">
                      {entry.type === 'post' ? 'پست کامل' : entry.product.title}
                    </span>
                    {entry.type === 'product' && (
                      <span className="basket__item-meta">
                        سایز و رنگ در مرحله پرداخت انتخاب می‌شود
                      </span>
                    )}
                    <span className="basket__item-price">
                      {formatNumber(price)} تومان
                    </span>
                  </div>
                  <button
                    type="button"
                    className="basket__item-remove"
                    onClick={() => removeFromBasket(idx)}
                    aria-label="حذف از سبد"
                  >
                    ✕
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {basket.length > 0 && (
        <footer className="basket__footer">
          <div className="basket__summary">
            <div className="basket__summary-row">
              <span className="basket__summary-label">جمع کالاها</span>
              <span className="basket__summary-value">{formatNumber(subtotal)} تومان</span>
            </div>
            <div className="basket__summary-row basket__summary-row--shipping">
              <span className="basket__summary-label">هزینه ارسال</span>
              <span className="basket__summary-value">
                {freeShipping ? 'رایگان' : 'در مرحله بعد محاسبه می‌شود'}
              </span>
            </div>
            <div className="basket__summary-divider" />
            <div className="basket__summary-row basket__summary-row--total">
              <span className="basket__summary-label">مبلغ قابل پرداخت</span>
              <span className="basket__summary-value basket__summary-value--total">
                {formatNumber(subtotal)} تومان
              </span>
            </div>
          </div>
          <div className="basket__promo">
            <label htmlFor="basket-promo" className="basket__promo-label">
              کد تخفیف دارید؟
            </label>
            <input
              id="basket-promo"
              type="text"
              className="basket__promo-input"
              placeholder="کد را وارد کنید"
              readOnly
              aria-readonly
            />
          </div>
          <p className="basket__secure">پرداخت امن از طریق درگاه بانکی</p>
          <button type="button" className="basket__checkout" disabled>
            تکمیل خرید (به‌زودی)
          </button>
        </footer>
      )}
    </div>
  );
}
