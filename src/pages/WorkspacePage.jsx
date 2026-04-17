import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore.jsx';
import { listArtifacts } from '../api/artifacts.js';
import { getWorkflowTemplates } from '../api/workflows.js';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import ChatPanel from '../components/chat/ChatPanel.jsx';
import './WorkspacePage.css';

const TYPE_BADGE_VARIANT = {
  'meeting-brief': 'meeting-brief',
  'investor-targeting': 'investor-targeting',
  'board-pack': 'board-pack',
  'post-meeting': 'post-meeting',
  'regulatory-monitor': 'regulatory-monitor',
};

const TYPE_LABEL = {
  'meeting-brief': 'Meeting Brief',
  'investor-targeting': 'Investor Targeting',
  'board-pack': 'Board Pack',
  'post-meeting': 'Post-Meeting',
  'regulatory-monitor': 'Regulatory Monitor',
};

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (d > 1) return `${d}d ago`;
  if (h > 1) return `${h}h ago`;
  return 'recently';
}

const WORKFLOW_ICONS = {
  'meeting-brief': '📋',
  'investor-targeting': '🎯',
  'board-pack': '📄',
  'post-meeting': '📊',
  'regulatory-monitor': '🛡',
};

export default function WorkspacePage() {
  const { state, dispatch } = useAppStore();
  const navigate = useNavigate();
  const [artifacts, setArtifacts] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      listArtifacts({ limit: 12 }),
      getWorkflowTemplates(),
    ]).then(([arts, wfs]) => {
      setArtifacts(arts.artifacts || []);
      setWorkflows(wfs || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="workspace">
      {/* Alerts */}
      {state.alerts.length > 0 && (
        <div className="workspace-alerts">
          {state.alerts.map(alert => (
            <div key={alert.id} className={`workspace-alert workspace-alert-${alert.severity}`}>
              <span className="workspace-alert-msg">{alert.message}</span>
              <button className="workspace-alert-dismiss" onClick={() => dispatch({ type: 'DISMISS_ALERT', payload: alert.id })}>✕</button>
            </div>
          ))}
        </div>
      )}

      <div className="workspace-body">
        {/* Workflow tray */}
        <section className="workspace-section">
          <div className="workspace-section-header">
            <h2 className="workspace-section-title">Workflows</h2>
            <p className="workspace-section-sub">Generate cited IR artifacts in minutes</p>
          </div>
          <div className="workflow-tray">
            {workflows.map(wf => (
              <button key={wf.id} className="workflow-card" onClick={() => navigate(`/workflow/${wf.type}`)}>
                <span className="workflow-card-icon">{WORKFLOW_ICONS[wf.type] || '⚡'}</span>
                <div className="workflow-card-body">
                  <span className="workflow-card-name">{wf.name}</span>
                  <span className="workflow-card-desc">{wf.description}</span>
                  <span className="workflow-card-credits muted">{wf.estimatedCredits} credits</span>
                </div>
                <svg className="workflow-card-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            ))}
          </div>
        </section>

        {/* Scheduled workflows */}
        {state.scheduledWorkflows.length > 0 && (
          <section className="workspace-section">
            <div className="workspace-section-header">
              <h2 className="workspace-section-title">Scheduled</h2>
            </div>
            <div className="scheduled-list">
              {state.scheduledWorkflows.map(sw => (
                <div key={sw.id} className="scheduled-item">
                  <Badge label={TYPE_LABEL[sw.type] || sw.type} variant={TYPE_BADGE_VARIANT[sw.type] || 'default'} />
                  <span className="scheduled-label">{sw.label}</span>
                  <span className="scheduled-date muted num">{sw.scheduledFor} · {sw.recurrence}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recent artifacts */}
        <section className="workspace-section workspace-section-artifacts">
          <div className="workspace-section-header">
            <h2 className="workspace-section-title">Recent Artifacts</h2>
            <span className="muted" style={{fontSize:12}}>{artifacts.length} artifacts</span>
          </div>
          {loading ? (
            <div className="workspace-loading">Loading…</div>
          ) : artifacts.length === 0 ? (
            <div className="workspace-empty">No artifacts yet — run a workflow above to generate your first.</div>
          ) : (
            <div className="artifact-grid">
              {artifacts.map(art => (
                <button key={art.id} className="artifact-card" onClick={() => navigate(`/artifact/${art.id}`)}>
                  <div className="artifact-card-header">
                    <Badge label={TYPE_LABEL[art.type] || art.type} variant={TYPE_BADGE_VARIANT[art.type] || 'default'} />
                    <span className="artifact-card-age muted">{timeAgo(art.createdAt)}</span>
                  </div>
                  <h3 className="artifact-card-title">{art.title}</h3>
                  {art.previewText && (
                    <p className="artifact-card-preview muted">{art.previewText.slice(0, 120)}…</p>
                  )}
                  <div className="artifact-card-footer">
                    <span className="artifact-card-citations muted">
                      {art.citations?.length > 0 ? `${art.citations.length} sources` : ''}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Chat panel */}
      <div className="workspace-chat-bar">
        <button className="workspace-chat-trigger" onClick={() => dispatch({ type: 'TOGGLE_CHAT' })}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Ask anything about your investors…
        </button>
        <span className="workspace-chat-hint muted">Ctrl+K</span>
      </div>

      {state.chatOpen && <ChatPanel onClose={() => dispatch({ type: 'TOGGLE_CHAT' })} />}
    </div>
  );
}
