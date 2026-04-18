import { useCallback, useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { FILTER_CATEGORIES, isFilterActive } from '../lib/filters.js';

const INDICATOR_WIDTH = 20;

export function FiltersOverlay({ open, onClose, onFiltersChange, closing }) {
  const { filters, setFilters, setUser } = useApp();
  const [activeTab, setActiveTab] = useState('gender');
  const navRef = useRef(null);
  const activeItemRef = useRef(null);
  const [indicator, setIndicator] = useState(null);
  const itemsRef = useRef(null);
  const [itemsOverflow, setItemsOverflow] = useState(false);

  useEffect(() => {
    if (!open) return;
    const measure = () => {
      const nav = navRef.current;
      const item = activeItemRef.current;
      if (!nav || !item) {
        setIndicator(null);
        return;
      }
      const left = item.offsetLeft + (item.offsetWidth - INDICATOR_WIDTH) / 2;
      setIndicator({ left });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (navRef.current) ro.observe(navRef.current);
    return () => ro.disconnect();
  }, [open, activeTab]);

  useEffect(() => {
    if (!open) return;
    const category = FILTER_CATEGORIES.find((c) => c.id === activeTab);
    if (!category || category.items.length === 0) {
      setItemsOverflow(false);
      return;
    }
    const el = itemsRef.current;
    if (!el) return;
    const measure = () => {
      const target = itemsRef.current;
      if (target) setItemsOverflow(target.scrollWidth > target.clientWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, activeTab]);

  const applyFilters = useCallback(
    (next) => {
      setFilters(next);
      if (next.gender) setUser({ gender: next.gender });
      onFiltersChange(next);
    },
    [setFilters, setUser, onFiltersChange],
  );

  const handleWheel = useCallback((e) => {
    const el = itemsRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  }, []);

  const togglePill = useCallback(
    (categoryId, itemId) => {
      const next = { ...filters };
      switch (categoryId) {
        case 'style':
          next.style = next.style === itemId ? undefined : itemId;
          break;
        case 'gender':
          next.gender = next.gender === itemId ? undefined : itemId;
          break;
        case 'body_type':
          next.body_type = next.body_type === itemId ? undefined : itemId;
          break;
        case 'budget':
          next.budget = next.budget === itemId ? undefined : itemId;
          break;
        default:
          return;
      }
      applyFilters(next);
    },
    [filters, applyFilters],
  );

  if (!open) return null;

  const activeCategory =
    FILTER_CATEGORIES.find((c) => c.id === activeTab) ?? FILTER_CATEGORIES[0];

  return (
    <div
      className={`filters-overlay${closing ? ' filters-overlay--closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="فیلترها"
    >
      <div
        className="filters-overlay__backdrop"
        onClick={onClose}
        aria-hidden
      />
      <div className="filters-overlay__panel">
        {activeCategory.items.length > 0 && (
          <div
            key={activeTab}
            ref={itemsRef}
            className={`filters-overlay__items${itemsOverflow ? ' filters-overlay__items--overflow' : ''}`}
            onWheel={handleWheel}
          >
            {activeCategory.items.map((item) => {
              const active = isFilterActive(activeCategory.id, item.id, filters);
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`filters-overlay__pill ${active ? 'filters-overlay__pill--active' : ''}`}
                  onClick={() => togglePill(activeCategory.id, item.id)}
                  aria-pressed={active}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
        <div className="filters-overlay__panel-inner">
          <div className="filters-overlay__body">
            <div className="filters-overlay__nav-bar">
              <nav ref={navRef} className="filters-overlay__nav">
                {indicator && (
                  <span
                    className="filters-overlay__nav-indicator"
                    style={{ left: indicator.left }}
                    aria-hidden
                  />
                )}
                {FILTER_CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  const active = activeTab === category.id;
                  return (
                    <button
                      key={category.id}
                      ref={active ? (node) => (activeItemRef.current = node) : undefined}
                      type="button"
                      className={`filters-overlay__nav-item ${active ? 'filters-overlay__nav-item--active' : ''}`}
                      onClick={() => setActiveTab(category.id)}
                      aria-pressed={active}
                    >
                      <span className="filters-overlay__nav-icon">
                        <Icon />
                      </span>
                      <span className="filters-overlay__nav-label">{category.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
