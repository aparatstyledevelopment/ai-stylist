import TopNav from './TopNav.jsx';
import Sidebar from './Sidebar.jsx';
import './Shell.css';

export default function Shell({ children }) {
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
