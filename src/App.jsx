import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import { Basket } from './pages/Basket.jsx';
import { Home } from './pages/Home.jsx';
import { Onboarding } from './pages/Onboarding.jsx';
import { Personalization } from './pages/Personalization.jsx';
import { Profile } from './pages/Profile.jsx';
import { Splash } from './pages/Splash.jsx';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Home />} />
          <Route path="/filters" element={<Home />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/personalization" element={<Personalization />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
