import { useState } from 'react';
import { clothingIcons } from '../data/outfits';
import './CartPage.css';

export default function CartPage({ cart, allItems, onRemoveFromCart, onClose }) {
  const [discountCode, setDiscountCode] = useState('');

  const cartItems = cart
    .map((c) => {
      const item = allItems.find((i) => i.id === c.itemId);
      return item ? { ...item, selectedSize: c.size } : null;
    })
    .filter(Boolean);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.priceNum, 0);
  const formattedTotal = totalPrice.toLocaleString('fa-IR');
  const isFreeShipping = totalPrice >= 500000;

  return (
    <div className="cart-page">
      {/* Header */}
      <div className="cart-header">
        <button className="back-btn" onClick={onClose}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <span className="cart-count-badge">{cartItems.length} قلم</span>
      </div>

      <div className="cart-scroll">
        {/* Title */}
        <div className="cart-title-section">
          <h1 className="cart-title">سبد خرید</h1>
          <p className="cart-subtitle">محصولات انتخاب‌شده شما برای خرید</p>
        </div>

        {/* Free Shipping Banner */}
        <div className="free-shipping-banner">
          <span className="shipping-icon">🚚</span>
          <span>ارسال رایگان برای سفارش بالای ۵۰۰٬۰۰۰ تومان</span>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>سبد خرید شما خالی است</p>
          </div>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <button
                  className="remove-btn"
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name.length > 28 ? item.name.slice(0, 28) + '...' : item.name}</h3>
                  {item.selectedSize && <p className="cart-item-size">سایز: {item.selectedSize}</p>}
                  <span className="cart-item-price">{item.price} تومان</span>
                </div>
                <div className="cart-item-image" style={{ background: item.cardColors[0] }}>
                  <span className="cart-item-emoji">{clothingIcons[item.type]}</span>
                  <span className="cart-item-brand">{item.brand}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Divider */}
        {cartItems.length > 0 && (
          <>
            <div className="cart-divider" />

            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-row">
                <span className="summary-label">جمع کالاها</span>
                <span className="summary-value">{formattedTotal} تومان</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">هزینه ارسال</span>
                <span className="summary-value">{isFreeShipping ? 'رایگان' : '۸۹٬۰۰۰ تومان'}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row total">
                <span className="summary-label">مبلغ قابل پرداخت</span>
                <span className="summary-value">{formattedTotal} تومان</span>
              </div>
            </div>

            {/* Discount Code */}
            <div className="discount-section">
              <p className="discount-label">کد تخفیف دارید؟</p>
              <input
                className="discount-input"
                type="text"
                placeholder="کد را وارد کنید"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
            </div>

            {/* Secure Payment Note */}
            <p className="secure-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              پرداخت امن از طریق درگاه بانکی
            </p>

            {/* Checkout Button */}
            <button className="checkout-btn" disabled>
              تکمیل خرید (به‌زودی)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
