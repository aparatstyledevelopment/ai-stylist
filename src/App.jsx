import { useState, useCallback, useMemo } from 'react';
import HomePage from './components/HomePage';
import FilterSheet from './components/FilterSheet';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import PersonalizationPage from './components/PersonalizationPage';
import ProfilePage from './components/ProfilePage';
import { outfits } from './data/outfits';
import './App.css';

function App() {
  const [outfitIndex, setOutfitIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [cart, setCart] = useState([]);
  const [personalizationData, setPersonalizationData] = useState(null);

  const currentOutfit = outfits[outfitIndex];

  const allItems = useMemo(
    () => outfits.flatMap((o) => o.items),
    []
  );

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

  const handleRemoveFromCart = useCallback((itemId) => {
    setCart((prev) => prev.filter((c) => c.itemId !== itemId));
  }, []);

  const isInCart = useCallback(
    (itemId) => cart.some((c) => c.itemId === itemId),
    [cart]
  );

  const handlePersonalizationComplete = useCallback((data) => {
    setPersonalizationData(data);
    setShowPersonalization(false);
  }, []);

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
        onOpenCart={() => setShowCart(true)}
        onOpenProfile={() => setShowProfile(true)}
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
          onOpenCart={() => { setSelectedItem(null); setShowCart(true); }}
          cartCount={cart.length}
          isInCart={isInCart(selectedItem.id)}
        />
      )}

      {showCart && (
        <CartPage
          cart={cart}
          allItems={allItems}
          onRemoveFromCart={handleRemoveFromCart}
          onClose={() => setShowCart(false)}
        />
      )}

      {showProfile && (
        <ProfilePage
          onClose={() => setShowProfile(false)}
          onOpenPersonalization={() => { setShowProfile(false); setShowPersonalization(true); }}
          personalizationData={personalizationData}
        />
      )}

      {showPersonalization && (
        <PersonalizationPage
          onClose={() => setShowPersonalization(false)}
          onComplete={handlePersonalizationComplete}
        />
      )}
    </div>
  );
}

export default App;
