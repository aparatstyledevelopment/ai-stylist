import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Check } from '../components/icons.jsx';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState('انجام شد');
  const [show, setShow] = useState(false);
  const timerRef = useRef(null);

  const toast = useCallback((message) => {
    setMsg(message);
    setShow(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShow(false), 2400);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className={`toast${show ? ' show' : ''}`} id="toast">
        <Check strokeWidth={2.5} />
        <span id="toast-text">{msg}</span>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
