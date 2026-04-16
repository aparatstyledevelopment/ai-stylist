import { useState, useCallback } from 'react';
import HomePage from './components/HomePage';
import FilterSheet from './components/FilterSheet';
import ProductDetail from './components/ProductDetail';
import { outfits } from './data/outfits';
import './App.css';

function App() {
  const [outfitIndex, setOutfitIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [cart, setCart] = useState([]);

  const currentOutfit = outfits[outfitIndex];

  const handleNextOutfit = useCallback(() => {
    setOutfitIndex((prev) => (prev + 1) % outfits.length);
  }, []);

  const handlePrevOutfit = useCallback(() => {
    setOutfitIndex((prev) => (prev - 1 + outfits.length) % outfits.length);
  }, []);

  const handleAddToCart = useCallback((item, size) => {
    setCart((prev) => {
      if (prev.some((c) => c.itemId === item.id)) return prev;
      return [...prev, { itemId: item.id, size }];
    });
  }, []);

  const isInCart = useCallback(
    (itemId) => cart.some((c) => c.itemId === itemId),
    [cart]
  );

  return (
    <div className="app">
      <HomePage
        outfit={currentOutfit}
        outfitIndex={outfitIndex}
        totalOutfits={outfits.length}
        onNextOutfit={handleNextOutfit}
        onPrevOutfit={handlePrevOutfit}
        onOpenFilter={() => setShowFilter(true)}
        onSelectItem={setSelectedItem}
        cartCount={cart.length}
      />

      <FilterSheet
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
      />

      {selectedItem && (
        <ProductDetail
          item={selectedItem}
          outfitItems={currentOutfit.items}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
          onSelectItem={setSelectedItem}
          cartCount={cart.length}
          isInCart={isInCart(selectedItem.id)}
        />
      )}
    </div>
  );
}

export default App;
