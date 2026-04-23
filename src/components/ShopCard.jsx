import { useState } from 'react';
import { Heart, Home, ShoppingCart } from './icons.jsx';

export function ShopCard({ pattern, name, brand, attrs, stock, price, lowStock, liked: initialLiked, onPress, onAddToCart }) {
  const [liked, setLiked] = useState(!!initialLiked);

  return (
    <div className="shop-card" onClick={onPress}>
      <div className={`sc-media ${pattern}`}>
        <div className="sc-pattern-inner" />
        <button
          className={`sc-fav-btn${liked ? ' on' : ''}`}
          onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
        >
          {liked
            ? <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            : <Heart strokeWidth={1.8} />
          }
        </button>
        <span className={`sc-stock-badge${lowStock ? ' low' : ''}`}>
          <span className="sc-stock-dot" />
          {stock}
        </span>
      </div>
      <div className="sc-info">
        <div className="sc-name">{name}</div>
        <div className="sc-brand">
          <Home strokeWidth={1.8} />
          {brand}
        </div>
        <div className="sc-attrs">
          {attrs.map((a) => <span key={a} className="sc-attr">{a}</span>)}
        </div>
        <div className="sc-spacer" />
        <div className="sc-footer-inline">
          <div className="sc-price-wrap">
            <span className="sc-pv">{price}</span>
            <span className="sc-pu">تومان / عدد</span>
          </div>
          <button className="sc-add" onClick={(e) => { e.stopPropagation(); onAddToCart(); }}>
            <ShoppingCart strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </div>
  );
}
