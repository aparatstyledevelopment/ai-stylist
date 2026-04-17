import './WorkflowProgress.css';

export default function WorkflowProgress({ steps = [], currentStep = 0, partialText = '' }) {
  return (
    <div className="wf-progress">
      <div className="wf-progress-steps">
        {steps.map((step, i) => {
          const status = i < currentStep ? 'done' : i === currentStep ? 'active' : 'pending';
          return (
            <div key={i} className={`wf-step wf-step-${status}`}>
              <div className="wf-step-dot">
                {status === 'done' && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
                {status === 'active' && <span className="wf-step-spinner" />}
              </div>
              <span className="wf-step-label">{step}</span>
            </div>
          );
        })}
      </div>
      {partialText && (
        <div className="wf-partial">
          <div className="wf-partial-label label">Generating…</div>
          <div className="wf-partial-text">
            {partialText.slice(-600)}
            <span className="wf-cursor" />
          </div>
        </div>
      )}
    </div>
  );
}
