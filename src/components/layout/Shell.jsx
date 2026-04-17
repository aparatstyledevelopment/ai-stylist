import { useEffect } from 'react';
import TopNav from './TopNav.jsx';
import Sidebar from './Sidebar.jsx';
import { useAppStore } from '../../store/appStore.jsx';
import './Shell.css';

export default function Shell({ children }) {
  const { dispatch } = useAppStore();

  useEffect(() => {
    function onKey(e) {
      // Ctrl+K / Cmd+K → toggle chat
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_CHAT' });
      }
      // Escape → close chat
      if (e.key === 'Escape') {
        dispatch({ type: 'TOGGLE_CHAT', force: false });
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch]);

  return (
    <div className="shell">
      <TopNav />
      <div className="shell-body">
        <Sidebar />
        <main className="shell-main">{children}</main>
      </div>
    </div>
  );
}
