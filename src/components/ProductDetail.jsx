import { useState } from 'react';
import { clothingIcons } from '../data/outfits';
import './ProductDetail.css';

export default function ProductDetail({
  item,
  outfitItems,
  onClose,
  onAddToCart,
  onSelectItem,
  onOpenCart,
  cartCount,
  isInCart,
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizes, setShowSizes] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    if (!showSizes) {
      setShowSizes(true);
      return;
    }
    if (selectedSize && !isInCart) {
      onAddToCart(item, selectedSize);
      setJustAdded(true);
    }
  };

  const handleTouchStart = (e) => {
    e.currentTarget.dataset.touchX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const startX = parseFloat(e.currentTarget.dataset.touchX);
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentImage < item.cardColors.length - 1) {
        setCurrentImage((p) => p + 1);
      } else if (diff < 0 && currentImage > 0) {
        setCurrentImage((p) => p - 1);
      }
    }
  };

  return (
    <div className="product-detail">
      {/* Dark gradient bg */}
      <div className="product-bg" />

      {/* Header */}
      <div className="product-header">
        <span className="brand-name">{item.brand}</span>
        <button className="icon-btn" onClick={onOpenCart} aria-label="سبد خرید">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>

      {/* Product Card */}
      <div
        className="product-card"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="product-image"
          style={{ background: item.cardColors[currentImage] }}
        >
          <span className="product-emoji">{clothingIcons[item.type]}</span>
        </div>

        {/* Carousel arrows */}
        {currentImage > 0 && (
          <button
            className="carousel-arrow arrow-right"
            onClick={() => setCurrentImage((p) => p - 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
        {currentImage < item.cardColors.length - 1 && (
          <button
            className="carousel-arrow arrow-left"
            onClick={() => setCurrentImage((p) => p + 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Dots */}
        <div className="carousel-dots">
          {item.cardColors.map((_, i) => (
            <span key={i} className={`cdot ${i === currentImage ? 'active' : ''}`} />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h2 className="product-name">{item.name}</h2>
        <div className="product-price-row">
          <button
            className={`add-to-cart-btn ${justAdded || isInCart ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {justAdded || isInCart ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>اضافه شد به سبد</span>
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <span>اضافه به سبد</span>
              </>
            )}
          </button>
          <div className="price-tag">
            <span className="price-value">{item.price}</span>
            <span className="price-unit">تومن</span>
          </div>
        </div>

        {/* Size Selector */}
        {showSizes && (
          <div className="size-section">
            <span className="size-label">اندازه:</span>
            <div className="size-options">
              {item.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-pill ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Outfit Strip */}
      <div className="product-bottom-strip">
        {outfitItems.map((outfitItem) => (
          <button
            key={outfitItem.id}
            className={`pstrip-thumb ${outfitItem.id === item.id ? 'active' : ''}`}
            onClick={() => {
              if (outfitItem.id !== item.id) {
                onSelectItem(outfitItem);
                setCurrentImage(0);
                setShowSizes(false);
                setSelectedSize(null);
                setJustAdded(false);
              }
            }}
            style={{ background: outfitItem.thumbColor }}
          >
            <span className="thumb-icon">{clothingIcons[outfitItem.type]}</span>
          </button>
        ))}
        <button className="pstrip-more" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
