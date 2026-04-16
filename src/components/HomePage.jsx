import { clothingIcons } from '../data/outfits';
import './HomePage.css';

export default function HomePage({
  outfit,
  outfitIndex,
  totalOutfits,
  onNextOutfit,
  onPrevOutfit,
  onOpenFilter,
  onSelectItem,
  onOpenCart,
  onOpenProfile,
  cartCount,
}) {
  const handleTouchStart = (e) => {
    e.currentTarget.dataset.touchY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const startY = parseFloat(e.currentTarget.dataset.touchY);
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;
    if (Math.abs(diff) > 80) {
      if (diff > 0) onNextOutfit();
      else onPrevOutfit();
    }
  };

  return (
    <div
      className="home-page"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Hero Background */}
      <div
        className="hero-bg"
        style={{ background: outfit.heroGradient }}
      >
        <div className="hero-silhouette">
          <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="55" rx="30" ry="35" fill="rgba(255,255,255,0.08)" />
            <path d="M60 90 C60 90 40 100 35 140 L30 220 L55 220 L60 160 L70 220 L80 220 L75 140 Z" fill="rgba(255,255,255,0.06)" />
            <path d="M125 140 L120 220 L130 220 L140 160 L145 220 L170 220 L165 140 C160 100 140 90 140 90 Z" fill="rgba(255,255,255,0.06)" />
            <rect x="65" y="90" width="70" height="100" rx="5" fill="rgba(255,255,255,0.07)" />
            <path d="M55 220 L50 380 L80 380 L85 250 Z" fill="rgba(255,255,255,0.05)" />
            <path d="M115 250 L120 380 L150 380 L145 220 Z" fill="rgba(255,255,255,0.05)" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="home-header">
        <h1 className="logo-text">نِکست اِستایل</h1>
        <div className="header-actions">
          <button className="icon-btn" aria-label="پروفایل" onClick={onOpenProfile}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="سبد خرید" onClick={onOpenCart}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Side Actions */}
      <div className="side-actions">
        <button className="side-btn ai-btn" onClick={onOpenFilter}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </button>
        <button className="side-btn" aria-label="اشتراک‌گذاری">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
        <button className="side-btn" aria-label="علاقه‌مندی">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      {/* Bottom Thumbnails */}
      <div className="bottom-strip">
        <button className="strip-filter-btn" onClick={onOpenFilter}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
        <div className="strip-number">
          <span>{(outfitIndex + 1).toLocaleString('fa-IR')}</span>
        </div>
        <div className="strip-items">
          {outfit.items.map((item) => (
            <button
              key={item.id}
              className="strip-thumb"
              onClick={() => onSelectItem(item)}
              style={{ background: item.thumbColor }}
            >
              <span className="thumb-icon">{clothingIcons[item.type]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Outfit indicator dots */}
      <div className="outfit-dots">
        {Array.from({ length: totalOutfits }).map((_, i) => (
          <span key={i} className={`dot ${i === outfitIndex ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
}
