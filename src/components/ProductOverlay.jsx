import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import {
  COLOR_LABELS,
  SIZE_LABELS,
  colorFromName,
  formatNumber,
} from '../lib/format.js';
import { BagIcon } from './icons.jsx';

const FALLBACK_IMAGE = 'https://placehold.co/400x500/1a1a1a/666';
const FALLBACK_THUMB = 'https://placehold.co/80/1a1a1a/666';
const DEFAULT_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

function resolveThumb(product, imageUrl) {
  const raw = product.thumbnail || product.images?.[0];
  return imageUrl(raw) || FALLBACK_THUMB;
}

export function ProductOverlay({ products, initialIndex, onClose, closing, restored, imageUrl }) {
  const { basket, addToBasket, removeFromBasket } = useApp();
  const basketCount = basket.length;

  const [index, setIndex] = useState(initialIndex);
  const product = products[index];

  const inBasket = basket.some(
    (item) => item.type === 'product' && item.product.link === product.link,
  );

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? '');
  const [imageIndex, setImageIndex] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [fadePhase, setFadePhase] = useState('idle');
  const pendingIndex = useRef(null);
  const scrollRef = useRef(null);

  const images = product.images?.length ? product.images : [FALLBACK_IMAGE];
  const sizes = product.sizes?.length ? product.sizes : DEFAULT_SIZES;

  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, time: 0 });
  const dragAxis = useRef(null);
  const carouselRef = useRef(null);

  const filmstripRef = useRef(null);
  const filmstripDrag = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    didDrag: false,
  });

  const onPointerDown = useCallback(
    (e) => {
      if (images.length <= 1) return;
      dragStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
      dragAxis.current = null;
      setDragging(true);
      setDragOffset(0);
      e.target.setPointerCapture(e.pointerId);
    },
    [images.length],
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!dragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (!dragAxis.current) {
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          dragAxis.current = Math.abs(dx) >= Math.abs(dy) ? 'horizontal' : 'vertical';
        }
        return;
      }
      if (dragAxis.current === 'vertical') return;
      e.preventDefault();
      const atLastGoingRight = imageIndex === images.length - 1 && dx > 0;
      const atFirstGoingLeft = imageIndex === 0 && dx < 0;
      const resist = atLastGoingRight || atFirstGoingLeft ? dx * 0.3 : dx;
      setDragOffset(-resist);
    },
    [dragging, imageIndex, images.length],
  );

  const onPointerUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    if (dragAxis.current !== 'horizontal') {
      setDragOffset(0);
      return;
    }
    const elapsed = Date.now() - dragStart.current.time;
    const velocity = Math.abs(dragOffset) / Math.max(elapsed, 1);
    const threshold = velocity > 0.4 ? 20 : (carouselRef.current?.offsetWidth ?? 300) * 0.25;
    if (dragOffset < -threshold && imageIndex < images.length - 1) {
      setImageIndex((i) => i + 1);
    } else if (dragOffset > threshold && imageIndex > 0) {
      setImageIndex((i) => i - 1);
    }
    setDragOffset(0);
  }, [dragging, dragOffset, imageIndex, images.length]);

  useEffect(() => {
    const next = products[index];
    setSelectedColor(next.colors?.[0] ?? '');
    setSelectedSize(next.sizes?.[0] ?? '');
    setImageIndex(0);
  }, [index, products]);

  useEffect(() => {
    if (!toastVisible) return;
    const t = setTimeout(() => setToastVisible(false), 2000);
    return () => clearTimeout(t);
  }, [toastVisible]);

  const toggleBasket = () => {
    if (inBasket) {
      const idx = basket.findIndex(
        (item) => item.type === 'product' && item.product.link === product.link,
      );
      if (idx !== -1) removeFromBasket(idx);
    } else {
      addToBasket({ type: 'product', product, postId: null });
      setToastVisible(true);
    }
  };

  const switchProduct = (nextIdx) => {
    if (nextIdx === index || fadePhase === 'out') return;
    pendingIndex.current = nextIdx;
    setFadePhase('out');
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (fadePhase !== 'out') return;
    const t = setTimeout(() => {
      if (pendingIndex.current !== null) {
        setIndex(pendingIndex.current);
        pendingIndex.current = null;
      }
      setFadePhase('in');
    }, 40);
    return () => clearTimeout(t);
  }, [fadePhase]);

  const goToImage = (i) => {
    setImageIndex(i);
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filmstripPointerDown = useCallback((e) => {
    if (e.target.closest('.product-overlay__filmstrip-back')) return;
    const el = filmstripRef.current;
    if (!el) return;
    filmstripDrag.current = {
      isDown: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      didDrag: false,
    };
  }, []);

  const filmstripPointerMove = useCallback((e) => {
    if (!filmstripDrag.current.isDown) return;
    const el = filmstripRef.current;
    if (!el) return;
    const delta = e.clientX - filmstripDrag.current.startX;
    if (Math.abs(delta) > 4) filmstripDrag.current.didDrag = true;
    el.scrollLeft = filmstripDrag.current.scrollLeft - delta;
  }, []);

  const filmstripPointerUp = useCallback(() => {
    filmstripDrag.current.isDown = false;
    const el = filmstripRef.current;
    if (el) el.style.cursor = '';
  }, []);

  const onlyOneSize =
    sizes.length === 1 && sizes[0].toLowerCase() === 'one size';

  return (
    <div
      className={`product-overlay${closing ? ' product-overlay--closing' : ''}${restored ? ' product-overlay--restored' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="جزئیات محصول"
    >
      <div className="product-overlay__backdrop" aria-hidden />
      <header className="product-overlay__header">
        <Link to="/basket" className="product-overlay__header-icon" aria-label="سبد خرید">
          <BagIcon size={18} />
          {basketCount > 0 && (
            <span className="product-overlay__badge">
              {basketCount > 99 ? '۹۹+' : formatNumber(basketCount)}
            </span>
          )}
        </Link>
        <span className="product-overlay__brand">{product.brand || 'برند'}</span>
      </header>
      <div ref={scrollRef} className="product-overlay__scroll">
        <div
          className={`product-overlay__content${
            fadePhase === 'out' ? ' product-overlay__content--fade-out' : ''
          }${fadePhase === 'in' ? ' product-overlay__content--fade-in' : ''}`}
        >
          <div
            ref={carouselRef}
            className="product-overlay__carousel product-overlay__carousel--rtl"
            dir="rtl"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ touchAction: images.length > 1 ? 'pan-y' : undefined }}
          >
            <div
              className={`product-overlay__carousel-track${dragging ? ' product-overlay__carousel-track--dragging' : ''}`}
              style={{
                transform: `translateX(calc(${imageIndex * 100}% - ${dragOffset}px))`,
              }}
            >
              {images.map((img, i) => (
                <div key={i} className="product-overlay__carousel-slide">
                  <img src={img} alt="" className="product-overlay__image" />
                </div>
              ))}
            </div>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="product-overlay__carousel-prev"
                  onClick={() =>
                    setImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))
                  }
                  aria-label="قبلی"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="product-overlay__carousel-next"
                  onClick={() =>
                    setImageIndex((i) => (i === images.length - 1 ? 0 : i + 1))
                  }
                  aria-label="بعدی"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <div className="product-overlay__carousel-dots" dir="rtl">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`product-overlay__carousel-dot ${i === imageIndex ? 'product-overlay__carousel-dot--active' : ''}`}
                      onClick={() => goToImage(i)}
                      aria-label={`تصویر ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <h2 className="product-overlay__title">{product.title}</h2>
          <div className="product-overlay__title-actions" dir="ltr">
            <button
              type="button"
              className={`product-overlay__add${inBasket ? ' product-overlay__add--added' : ''}`}
              onClick={toggleBasket}
            >
              <span className="product-overlay__add-icon" aria-hidden>
                {inBasket ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10.5l4 4 8-9"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <img src="/assets/icons/bag-plus.png" alt="" width={22} height={22} />
                )}
              </span>
              <span className="product-overlay__add-text" dir="rtl">
                {inBasket ? 'اضافه شد به سبد' : 'اضافه به سبد'}
              </span>
            </button>
            <div className="product-overlay__price-row">
              <img
                src="/assets/currency-badge.png"
                alt="تومان"
                className="product-overlay__price-badge"
              />
              <span className="product-overlay__price-num">
                {formatNumber(product.selling_price || product.price)}
              </span>
            </div>
          </div>
          {product.colors?.length > 0 && (
            <section className="product-overlay__section">
              <span className="product-overlay__label">
                رنگ: {COLOR_LABELS[selectedColor] || selectedColor}
              </span>
              <div className="product-overlay__colors">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`product-overlay__color ${selectedColor === c ? 'product-overlay__color--active' : ''}`}
                    style={{ background: colorFromName(c) }}
                    onClick={() => setSelectedColor(c)}
                    aria-pressed={selectedColor === c}
                  />
                ))}
              </div>
            </section>
          )}
          {!onlyOneSize && (
            <section className="product-overlay__section">
              <span className="product-overlay__label">
                اندازه: {SIZE_LABELS[selectedSize] || selectedSize}
              </span>
              <div className="product-overlay__sizes">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`product-overlay__size ${selectedSize === s ? 'product-overlay__size--active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                    aria-pressed={selectedSize === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <div className="product-overlay__filmstrip">
        <div
          ref={filmstripRef}
          className="product-overlay__filmstrip-thumbs"
          onPointerDown={filmstripPointerDown}
          onPointerMove={filmstripPointerMove}
          onPointerUp={filmstripPointerUp}
          onPointerCancel={filmstripPointerUp}
        >
          <button
            type="button"
            className="product-overlay__filmstrip-back"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="بازگشت"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          {products.map((p, i) => {
            const src = resolveThumb(p, imageUrl);
            const active = index === i;
            return (
              <button
                key={i}
                type="button"
                className={`product-overlay__filmstrip-thumb ${active ? 'product-overlay__filmstrip-thumb--active' : ''}`}
                style={{ viewTransitionName: `product-thumb-${i}` }}
                onClick={() => {
                  if (!filmstripDrag.current.didDrag) switchProduct(i);
                }}
                aria-pressed={active}
              >
                <img src={src} alt="" />
              </button>
            );
          })}
        </div>
      </div>
      {toastVisible && (
        <div className="product-overlay__toast" role="status">
          به سبد اضافه شد
        </div>
      )}
    </div>
  );
}
