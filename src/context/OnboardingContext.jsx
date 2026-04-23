import { createContext, useContext, useState } from 'react';

const Ctx = createContext(null);

export function OnboardingProvider({ children }) {
  const [isEmpty, setIsEmpty] = useState(false);
  return <Ctx.Provider value={{ isEmpty, setIsEmpty }}>{children}</Ctx.Provider>;
}

export function useOnboarding() {
  return useContext(Ctx);
}
