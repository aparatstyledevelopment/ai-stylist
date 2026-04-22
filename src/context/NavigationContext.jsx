import { createContext, useCallback, useContext, useRef, useState } from 'react';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [direction, setDirection] = useState('forward');
  const historyRef = useRef(['dashboard']);

  const goTo = useCallback((pageName) => {
    setCurrentPage((prev) => {
      if (prev === pageName) return prev;
      historyRef.current.push(pageName);
      setDirection('forward');
      return pageName;
    });
  }, []);

  const goBack = useCallback((fallback) => {
    const history = historyRef.current;
    history.pop();
    const prev = history[history.length - 1] || fallback;
    setDirection('back');
    setCurrentPage(prev);
  }, []);

  const reset = useCallback(() => {
    historyRef.current = ['dashboard'];
    setDirection('forward');
    setCurrentPage('dashboard');
  }, []);

  const value = { currentPage, direction, goTo, goBack, reset };
  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
