import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const DEFAULT_USER = { id: null, gender: 'female' };

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUserState] = useState(DEFAULT_USER);
  const [filters, setFiltersState] = useState({});
  const [basket, setBasket] = useState([]);
  const [feed, setFeedState] = useState([]);
  const [feedLoading, setFeedLoadingState] = useState(false);
  const [personalizationProgress, setPersonalizationProgress] = useState(25);

  const setUser = useCallback((patch) => {
    setUserState((prev) => ({ ...prev, ...patch }));
  }, []);

  const setFilters = useCallback((patch) => {
    setFiltersState((prev) => ({ ...prev, ...patch }));
  }, []);

  const addToBasket = useCallback((item) => {
    setBasket((prev) => [...prev, item]);
  }, []);

  const removeFromBasket = useCallback((index) => {
    setBasket((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const setFeed = useCallback((next) => setFeedState(next), []);
  const setFeedLoading = useCallback((next) => setFeedLoadingState(next), []);

  const resetOnboarding = useCallback(() => {
    setPersonalizationProgress(25);
    setUserState(DEFAULT_USER);
    setFiltersState({});
  }, []);

  const value = useMemo(
    () => ({
      user,
      filters,
      basket,
      feed,
      feedLoading,
      personalizationProgress,
      setUser,
      setFilters,
      addToBasket,
      removeFromBasket,
      setFeed,
      setFeedLoading,
      setPersonalizationProgress,
      resetOnboarding,
    }),
    [
      user,
      filters,
      basket,
      feed,
      feedLoading,
      personalizationProgress,
      setUser,
      setFilters,
      addToBasket,
      removeFromBasket,
      setFeed,
      setFeedLoading,
      resetOnboarding,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
