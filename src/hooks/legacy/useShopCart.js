import { useRef } from 'react';
import { useToast } from '../../context/ToastContext.jsx';
import { toPersianNum } from '../../utils/format.js';

export function useShopCart() {
  const { toast } = useToast();
  const countRef = useRef(2);

  const updateShopCartIcon = () => {
    const icon = document.getElementById('shop-cart-icon');
    const badge = document.getElementById('shop-cart-badge');
    if (!icon || !badge) return;
    badge.textContent = toPersianNum(countRef.current);
    if (countRef.current > 0) {
      icon.classList.add('has-items');
      badge.classList.remove('hidden');
    } else {
      icon.classList.remove('has-items');
      badge.classList.add('hidden');
    }
  };

  const addToCart = () => {
    countRef.current++;
    updateShopCartIcon();
    const icon = document.getElementById('shop-cart-icon');
    if (icon) {
      icon.classList.remove('pulse');
      void icon.offsetWidth;
      icon.classList.add('pulse');
    }
    toast('به سبد اضافه شد');
  };

  return { addToCart };
}
