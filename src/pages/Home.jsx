import { startTransition, useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiltersOverlay } from '../components/FiltersOverlay.jsx';
import { Header } from '../components/Header.jsx';
import { ProductOverlay } from '../components/ProductOverlay.jsx';
import { ProgressiveImage } from '../components/ProgressiveImage.jsx';
import {
  FilterIcon,
  ShareIcon,
  StarsIcon,
} from '../components/icons.jsx';
import { useApp } from '../context/AppContext.jsx';
import { fetchFeed, imageUrl } from '../lib/api.js';
import { toFarsiDigits } from '../lib/format.js';

const DRAG_THRESHOLD = 8;
const VISIBLE_PRODUCT_THUMBS = 4;

function readOverlayState() {
  try {
    return JSON.parse(sessionStorage.getItem('overlayState') || '');
  } catch {
    return null;
  }
}

export function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const {
    user,
    filters,
    feed,
    setFeed,
    setFeedLoading,
    personalizationProgress,
  } = useApp();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filtersClosing, setFiltersClosing] = useState(false);

  const [overlayProducts, setOverlayProducts] = useState(() => {
    if (pathname !== '/product') return null;
    const saved = readOverlayState();
    return Array.isArray(saved?.products) && saved.products.length > 0
      ? saved.products
      : null;
  });
  const [overlayIndex, setOverlayIndex] = useState(() => {
    if (pathname !== '/product') return 0;
    return readOverlayState()?.initialIndex ?? 0;
  });
  const restoredRef = useRef(overlayProducts !== null);

  const [overlayClosing, setOverlayClosing] = useState(false);

  const [slideIndex, setSlideIndex] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState(null);
  const [zooming, setZooming] = useState(false);
  const pinchRef = useRef(null);
  const zoomResetTimer = useRef(null);

  const [loadedThumbs, setLoadedThumbs] = useState(new Set());
  const [hasLoaded, setHasLoaded] = useState(false);
  const [feedError, setFeedError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [likedPosts, setLikedPosts] = useState(() => new Set());
  const [likeBump, setLikeBump] = useState(0);

  const feedRef = useRef(null);
  const prevPathname = useRef(pathname);
  const latestOverlay = useRef(overlayProducts);
  latestOverlay.current = overlayProducts;
  const latestFiltersOpen = useRef(filtersOpen);
  latestFiltersOpen.current = filtersOpen;

  const overlayCloseTimer = useRef(null);
  const filtersCloseTimer = useRef(null);
  const dragStateRef = useRef(null);

  const reloadFeed = useCallback(async () => {
    setFeedLoading(true);
    setFeedError(null);
    try {
      const result = await fetchFeed(filters, user);
      startTransition(() => {
        setFeed(result);
        setSlideIndex(0);
        setFeedLoading(false);
        setHasLoaded(true);
      });
    } catch (err) {
      setFeed([]);
      setFeedLoading(false);
      setFeedError(err instanceof Error ? err : new Error(String(err)));
      setHasLoaded(true);
    }
  }, [filters, user, setFeed, setFeedLoading]);

  const refetchWithFilters = useCallback(
    async (nextFilters) => {
      setRefreshing(true);
      setFeedError(null);
      try {
        const result = await fetchFeed(nextFilters, user);
        startTransition(() => {
          setFeed(result);
          setSlideIndex(0);
          setFeedLoading(false);
          setRefreshing(false);
          setHasLoaded(true);
        });
      } catch (err) {
        setFeed([]);
        setFeedLoading(false);
        setRefreshing(false);
        setFeedError(err instanceof Error ? err : new Error(String(err)));
        setHasLoaded(true);
      }
    },
    [user, setFeed, setFeedLoading],
  );

  useEffect(() => {
    reloadFeed();
  }, [reloadFeed]);

  useEffect(() => {
    if (pathname === '/product' && !overlayProducts) {
      navigate('/home', { replace: true });
    } else if (pathname === '/filters') {
      setFiltersOpen(true);
    }
    return () => {
      document.documentElement.classList.remove('vt-product-open');
      if (overlayCloseTimer.current) clearTimeout(overlayCloseTimer.current);
      if (filtersCloseTimer.current) clearTimeout(filtersCloseTimer.current);
      if (zoomResetTimer.current) clearTimeout(zoomResetTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const prev = prevPathname.current;
    if (prev === pathname) return;
    prevPathname.current = pathname;

    if (prev === '/product' && pathname !== '/product' && latestOverlay.current) {
      if (overlayCloseTimer.current) {
        clearTimeout(overlayCloseTimer.current);
        overlayCloseTimer.current = null;
      }
      sessionStorage.removeItem('overlayState');
      if (typeof document.startViewTransition === 'function') {
        flushSync(() => setOverlayClosing(true));
        document
          .startViewTransition(() => {
            document.documentElement.classList.remove('vt-product-open');
            flushSync(() => setOverlayProducts(null));
          })
          .finished.then(() => {
            setOverlayClosing(false);
          });
      } else {
        document.documentElement.classList.remove('vt-product-open');
        setOverlayClosing(true);
        overlayCloseTimer.current = setTimeout(() => {
          setOverlayClosing(false);
          setOverlayProducts(null);
          overlayCloseTimer.current = null;
        }, 400);
      }
    }
    if (prev === '/filters' && pathname !== '/filters' && latestFiltersOpen.current) {
      if (filtersCloseTimer.current) {
        clearTimeout(filtersCloseTimer.current);
        filtersCloseTimer.current = null;
      }
      setFiltersClosing(true);
      filtersCloseTimer.current = setTimeout(() => {
        setFiltersClosing(false);
        setFiltersOpen(false);
        filtersCloseTimer.current = null;
      }, 400);
    }
    if (pathname === '/filters' && prev !== '/filters') {
      setFiltersOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    setLoadedThumbs(new Set());
  }, [feed]);

  useEffect(() => {
    const el = feedRef.current;
    if (el && feed.length > 0) el.scrollTo({ top: 0 });
  }, [feed]);

  useEffect(() => {
    setZoomScale(1);
    setZoomOrigin(null);
  }, [slideIndex]);

  const distance = (touches) =>
    Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY,
    );

  const onTouchStart = (e) => {
    if (e.touches.length !== 2) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    setZoomOrigin({ x: midX - rect.left, y: midY - rect.top });
    setZooming(true);
    pinchRef.current = {
      initialDistance: distance(e.touches),
      initialScale: zoomScale,
    };
  };

  const onTouchMove = useCallback((e) => {
    if (e.touches.length !== 2 || !pinchRef.current) return;
    const feedEl = feedRef.current;
    const target = e.target;
    if (!feedEl?.contains(target) || !target.closest?.('.home__post-image-wrap')) return;
    e.preventDefault();
    const d = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY,
    );
    const next = Math.min(
      4,
      Math.max(1, pinchRef.current.initialScale * (d / pinchRef.current.initialDistance)),
    );
    setZoomScale(next);
  }, []);

  const onTouchEnd = (e) => {
    if (e.touches.length >= 2) return;
    pinchRef.current = null;
    setZooming(false);
    setZoomScale(1);
    if (zoomResetTimer.current) clearTimeout(zoomResetTimer.current);
    zoomResetTimer.current = setTimeout(() => setZoomOrigin(null), 260);
  };

  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', onTouchMove);
  }, [onTouchMove]);

  useEffect(() => {
    const el = feedRef.current;
    if (!el || feed.length === 0) return;
    const handler = () => {
      const top = el.scrollTop;
      const h = el.clientHeight;
      const idx = Math.round(top / h);
      setSlideIndex(Math.min(idx, feed.length - 1));
    };
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, [feed.length]);

  const currentPost = feed[slideIndex] ?? null;

  const openOverlay = (post, productIdx) => {
    if (overlayProducts) return;
    const list = Array.isArray(post?.products) ? post.products : [];
    if (list.length === 0) return;
    restoredRef.current = false;
    sessionStorage.setItem(
      'overlayState',
      JSON.stringify({ products: list, initialIndex: productIdx }),
    );
    const apply = () => {
      flushSync(() => {
        setOverlayIndex(productIdx);
        setOverlayProducts(list);
      });
    };
    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => {
        document.documentElement.classList.add('vt-product-open');
        apply();
      });
    } else {
      apply();
    }
    prevPathname.current = '/product';
    navigate('/product');
  };

  const makePointerDown = (post, productIdx) => (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const onMove = (ev) => {
      const state = dragStateRef.current;
      if (!state) return;
      const dx = ev.clientX - state.downX;
      const dy = ev.clientY - state.downY;
      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
        if (!state.didDrag) {
          state.didDrag = true;
          state.lastY = ev.clientY;
        }
        const feedEl = feedRef.current;
        if (feedEl && state.didDrag) {
          const delta = ev.clientY - state.lastY;
          state.lastY = ev.clientY;
          feedEl.scrollTop += delta;
        }
      }
    };
    const onUp = () => {
      const state = dragStateRef.current;
      if (state) {
        document.removeEventListener('pointermove', state.onMove);
        document.removeEventListener('pointerup', state.onUp);
        document.removeEventListener('pointercancel', state.onUp);
        dragStateRef.current = null;
      }
    };
    dragStateRef.current = {
      downX: e.clientX,
      downY: e.clientY,
      didDrag: false,
      lastY: e.clientY,
      post,
      index: productIdx,
      onMove,
      onUp,
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', onUp);
  };

  const makePointerUp = (post, productIdx) => (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const state = dragStateRef.current;
    if (!state) return;
    document.removeEventListener('pointermove', state.onMove);
    document.removeEventListener('pointerup', state.onUp);
    document.removeEventListener('pointercancel', state.onUp);
    dragStateRef.current = null;
    if (state.didDrag || state.post !== post || state.index !== productIdx) return;
    e.preventDefault();
    e.stopPropagation();
    openOverlay(post, productIdx);
  };

  const closeOverlay = () => {
    if (overlayClosing) return;
    const idx = window.history.state?.idx ?? 0;
    if (idx > 0) navigate(-1);
    else navigate('/home', { replace: true });
  };

  const closeFilters = () => {
    if (filtersClosing) return;
    const idx = window.history.state?.idx ?? 0;
    if (idx > 0) navigate(-1);
    else navigate('/home', { replace: true });
  };

  const toggleLike = () => {
    if (!currentPost?.id) return;
    const postId = currentPost.id;
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
    setLikeBump((n) => n + 1);
  };

  return (
    <div
      className={`home${overlayProducts && !overlayClosing ? ' home--overlay-open' : ''}${overlayClosing ? ' home--overlay-closing' : ''}${filtersOpen ? ' home--filters-open' : ''}${filtersClosing ? ' home--filters-closing' : ''}`}
    >
      <Header />
      <div ref={feedRef} className="home__feed" role="feed">
        {feed.length === 0 && !hasLoaded && (
          <div className="home__loading" aria-busy="true" aria-label="در حال بارگذاری">
            <span className="home__loading-spinner" />
          </div>
        )}
        {feed.length === 0 && hasLoaded && feedError && (
          <div className="home__error" role="alert">
            <span className="home__error-icon" aria-hidden />
            <p className="home__error-message">مشکلی پیش آمد. دوباره تلاش کنید.</p>
            <button
              type="button"
              className="home__error-retry"
              onClick={() => reloadFeed()}
            >
              تلاش مجدد
            </button>
          </div>
        )}
        {feed.length === 0 && hasLoaded && !feedError && (
          <div className="home__empty">
            <div className="home__empty-content">
              <span className="home__empty-icon" aria-hidden />
              <h2 className="home__empty-title">هنوز پستی این‌جا نیست</h2>
              <p className="home__empty-desc">با فیلترهای دیگر امتحان کنید یا بعداً سر بزنید.</p>
            </div>
          </div>
        )}
        {feed.length > 0 &&
          feed.map((post, i) => {
            const products = Array.isArray(post.products) ? post.products : [];
            const visible = products.slice(0, VISIBLE_PRODUCT_THUMBS);
            const overflow = products.length - VISIBLE_PRODUCT_THUMBS;
            return (
              <section
                key={post.id}
                className="home__slide"
                aria-hidden={i !== slideIndex}
              >
                <div
                  className="home__post-image-wrap"
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                  onTouchCancel={onTouchEnd}
                >
                  <img
                    src={imageUrl(post.main_image) || 'https://placehold.co/400x800/1a1a1a/666'}
                    alt=""
                    className="home__post-image"
                    style={
                      i === slideIndex && (zoomScale !== 1 || zoomOrigin)
                        ? {
                            transform: `scale(${zoomScale})`,
                            transformOrigin: zoomOrigin
                              ? `${zoomOrigin.x}px ${zoomOrigin.y}px`
                              : 'center center',
                            transition: zooming ? 'none' : 'transform 0.22s ease-out',
                          }
                        : undefined
                    }
                  />
                </div>
                <div className="home__products">
                  {visible.map((product, idx) => {
                    const thumbKey = `${post.id}-${idx}`;
                    const loaded = loadedThumbs.has(thumbKey);
                    const thumbSrc =
                      imageUrl(product.thumbnail || product.images?.[0]) ||
                      'https://placehold.co/80/1a1a1a/666';
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`home__product-thumb${loaded ? '' : ' home__product-thumb--loading'}`}
                        style={{
                          zIndex: VISIBLE_PRODUCT_THUMBS - idx,
                          touchAction: 'pan-y',
                          ...(i === slideIndex && !overlayProducts
                            ? { viewTransitionName: `product-thumb-${idx}` }
                            : {}),
                        }}
                        onPointerDown={makePointerDown(post, idx)}
                        onPointerUp={makePointerUp(post, idx)}
                      >
                        <ProgressiveImage
                          src={thumbSrc}
                          onLoaded={() =>
                            setLoadedThumbs((prev) => new Set(prev).add(thumbKey))
                          }
                        />
                      </button>
                    );
                  })}
                  {overflow > 0 && (
                    <button
                      type="button"
                      className="home__product-thumb home__product-thumb--overflow"
                      style={{ zIndex: 0, touchAction: 'pan-y' }}
                      onPointerDown={makePointerDown(post, VISIBLE_PRODUCT_THUMBS)}
                      onPointerUp={makePointerUp(post, VISIBLE_PRODUCT_THUMBS)}
                    >
                      <span className="home__product-overflow-text">
                        <span className="home__product-overflow-circle" aria-hidden>
                          {toFarsiDigits(overflow)}
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              </section>
            );
          })}
        {refreshing && feed.length > 0 && (
          <div className="home__feed-refresh-overlay" aria-hidden>
            <span className="home__feed-refresh-dots">
              <span />
              <span />
              <span />
            </span>
          </div>
        )}
      </div>
      {feed.length > 0 && currentPost && (
        <div className="home__actions">
          <span
            className="home__action-wrap home__action-wrap--personalize"
            style={{ '--personalize-progress': `${personalizationProgress}%` }}
          >
            <button
              type="button"
              className="home__action home__action--personalize"
              onClick={() => navigate('/personalization')}
              aria-label="شخصی‌سازی"
            >
              <span className="home__action-icon">
                <StarsIcon size={22} />
              </span>
            </button>
          </span>
          <button type="button" className="home__action" aria-label="اشتراک‌گذاری">
            <span className="home__action-icon">
              <ShareIcon size={22} />
            </span>
          </button>
          <button
            type="button"
            className={`home__action home__action--like${currentPost?.id != null && likedPosts.has(currentPost.id) ? ' home__action--like-is-liked' : ''}`}
            aria-label={currentPost?.id != null && likedPosts.has(currentPost.id) ? 'لایک شده' : 'لایک'}
            aria-pressed={currentPost?.id != null ? likedPosts.has(currentPost.id) : undefined}
            onClick={toggleLike}
          >
            <span className="home__action-icon home__action-icon--heart">
              <svg
                className="home__heart-svg"
                width={21}
                height={21}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path
                  className="home__heart-path"
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
            </span>
            <span key={likeBump} className="home__like-ring" aria-hidden />
          </button>
          <button
            type="button"
            className="home__action home__action--filter"
            onClick={() => navigate('/filters')}
            aria-label="فیلتر"
          >
            <span className="home__action-icon">
              <FilterIcon size={22} />
            </span>
          </button>
        </div>
      )}
      {filtersOpen && (
        <>
          <div
            className={`overlay-blur-layer overlay-blur-layer--filters${filtersOpen && !filtersClosing ? ' overlay-blur-layer--blurred' : ''}${filtersClosing ? ' overlay-blur-layer--closing' : ''}`}
          />
          <FiltersOverlay
            open={filtersOpen}
            onClose={closeFilters}
            onFiltersChange={refetchWithFilters}
            closing={filtersClosing}
          />
        </>
      )}
      {overlayProducts && overlayProducts.length > 0 && (
        <>
          <div
            className={`overlay-blur-layer overlay-blur-layer--product${overlayProducts && !overlayClosing ? ' overlay-blur-layer--blurred' : ''}${overlayClosing ? ' overlay-blur-layer--closing' : ''}`}
          />
          <ProductOverlay
            products={overlayProducts}
            initialIndex={overlayIndex}
            onClose={closeOverlay}
            closing={overlayClosing}
            restored={restoredRef.current}
            imageUrl={imageUrl}
          />
        </>
      )}
    </div>
  );
}
