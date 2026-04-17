import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { listArtifacts } from '../../api/artifacts.js';
import './Sidebar.css';

const NAV_LINKS = [
  { to: '/workspace', label: 'Workspace', icon: GridIcon },
  { to: '/explorer', label: 'Data Explorer', icon: TableIcon },
];

const WORKFLOW_LINKS = [
  { to: '/workflow/meeting-brief', label: 'Meeting Brief', icon: BriefcaseIcon },
  { to: '/workflow/investor-targeting', label: 'Investor Targeting', icon: TargetIcon },
  { to: '/workflow/board-pack', label: 'Board Pack', icon: FileIcon },
  { to: '/workflow/post-meeting', label: 'Post-Meeting', icon: BarIcon },
  { to: '/workflow/regulatory-monitor', label: 'Regulatory Monitor', icon: ShieldIcon },
];

const TYPE_LABEL = {
  'meeting-brief': 'Brief',
  'investor-targeting': 'Target',
  'board-pack': 'Pack',
  'post-meeting': 'Synthesis',
  'regulatory-monitor': 'Monitor',
};

export default function Sidebar() {
  const navigate = useNavigate();
  const [recentArtifacts, setRecentArtifacts] = useState([]);

  useEffect(() => {
    listArtifacts({ limit: 5 })
      .then(r => setRecentArtifacts(r.artifacts || []))
      .catch(() => {});
  }, []);

  return (
    <nav className="sidebar">
      <div className="sidebar-section">
        <span className="sidebar-section-label">Navigation</span>
        {NAV_LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-section">
        <span className="sidebar-section-label">Workflows</span>
        {WORKFLOW_LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>

      {recentArtifacts.length > 0 && (
        <div className="sidebar-section sidebar-recent">
          <span className="sidebar-section-label">Recent</span>
          {recentArtifacts.map(a => (
            <button
              key={a.id}
              className="sidebar-recent-item"
              onClick={() => navigate(`/artifact/${a.id}`)}
              title={a.title}
            >
              <span className="sidebar-recent-type">{TYPE_LABEL[a.type] || a.type}</span>
              <span className="sidebar-recent-title">{a.title}</span>
            </button>
          ))}
        </div>
      )}

      <div className="sidebar-footer">
        <div className="sidebar-credits">
          <span className="sidebar-credits-label">Credits</span>
          <div className="sidebar-credits-bar">
            <div className="sidebar-credits-fill" style={{ width: '62%' }} />
          </div>
          <span className="sidebar-credits-num num">31,200 / 50,000</span>
        </div>
      </div>
    </nav>
  );
}

function GridIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
}
function TableIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>;
}
function BriefcaseIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
}
function TargetIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
}
function FileIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
}
function BarIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}
function ShieldIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
