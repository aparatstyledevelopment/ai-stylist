import { useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MeetingBriefForm from '../components/workflow/MeetingBriefForm.jsx';
import InvestorTargetingForm from '../components/workflow/InvestorTargetingForm.jsx';
import WorkflowProgress from '../components/workflow/WorkflowProgress.jsx';
import ArtifactViewer from '../components/artifact/ArtifactViewer.jsx';
import CitationPanel from '../components/artifact/CitationPanel.jsx';
import Button from '../components/common/Button.jsx';
import { runWorkflow } from '../api/workflows.js';
import { getArtifact } from '../api/artifacts.js';
import './WorkflowPage.css';

const META = {
  'meeting-brief':       { name: 'Meeting Brief', description: 'Generate a structured investor meeting brief with cited data.', FormComponent: MeetingBriefForm },
  'investor-targeting':  { name: 'Investor Targeting', description: 'Find and rank investors matching your criteria using natural language.', FormComponent: InvestorTargetingForm },
  'board-pack':          { name: 'Board IR Pack', description: 'Generate the monthly board IR pack.', FormComponent: GenericStubForm },
  'post-meeting':        { name: 'Post-Meeting Synthesis', description: 'Synthesize roadshow feedback and ownership correlation.', FormComponent: GenericStubForm },
  'regulatory-monitor':  { name: 'Regulatory Monitor', description: 'Monitor short positions, insider transactions, and activist filings.', FormComponent: GenericStubForm },
};

function GenericStubForm({ onSubmit, loading }) {
  return (
    <div className="wf-stub">
      <p className="wf-stub-msg">This workflow is in development. Click below to generate a stub demo.</p>
      <Button variant="primary" size="lg" loading={loading} onClick={() => onSubmit({})}>
        Generate Demo
      </Button>
    </div>
  );
}

export default function WorkflowPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const meta = META[type] || { name: type, description: '', FormComponent: GenericStubForm };
  const { name, description, FormComponent } = meta;

  const [phase, setPhase] = useState('form'); // form | running | done | error
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [partialText, setPartialText] = useState('');
  const [citations, setCitations] = useState([]);
  const [artifact, setArtifact] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const abortRef = useRef(false);

  const handleSubmit = useCallback(async (payload) => {
    abortRef.current = false;
    setPhase('running');
    setSteps([]);
    setCurrentStep(0);
    setPartialText('');
    setCitations([]);
    setArtifact(null);
    setErrorMsg('');

    try {
      const stream = runWorkflow(type, payload);
      for await (const { event, data } of stream) {
        if (abortRef.current) break;
        if (event === 'progress') {
          setSteps(prev => {
            const next = [...prev];
            if (!next.includes(data.step)) next.push(data.step);
            return next;
          });
          setCurrentStep(data.stepIndex);
        } else if (event === 'chunk') {
          setPartialText(prev => prev + data.text);
        } else if (event === 'citation') {
          setCitations(prev => [...prev, data]);
        } else if (event === 'done') {
          // Fetch full artifact
          try {
            const full = await getArtifact(data.artifactId);
            setArtifact(full);
          } catch {
            setArtifact({ id: data.artifactId, type, rawText: partialText, citations, status: 'complete', title: name });
          }
          setPhase('done');
        } else if (event === 'error') {
          setErrorMsg(data.message || 'Unknown error');
          setPhase('error');
        }
      }
    } catch (err) {
      setErrorMsg(err.message);
      setPhase('error');
    }
  }, [type, name]);

  function handleReset() {
    abortRef.current = true;
    setPhase('form');
    setPartialText('');
    setCitations([]);
    setArtifact(null);
    setErrorMsg('');
  }

  return (
    <div className="wf-page">
      <div className="wf-page-header">
        <div className="wf-page-header-left">
          <button className="wf-back-btn" onClick={() => navigate('/workspace')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Workspace
          </button>
          <h1 className="wf-page-title">{name}</h1>
          <p className="wf-page-desc">{description}</p>
        </div>
        {phase === 'done' && (
          <div className="wf-page-header-actions">
            <Button variant="secondary" size="sm" onClick={handleReset}>New Run</Button>
            <Button variant="primary" size="sm" onClick={() => navigate(`/artifact/${artifact?.id}`)}>
              View Full Artifact
            </Button>
          </div>
        )}
      </div>

      {phase === 'form' && (
        <div className="wf-page-body">
          <FormComponent onSubmit={handleSubmit} loading={false} />
        </div>
      )}

      {phase === 'running' && (
        <div className="wf-page-body">
          <WorkflowProgress steps={steps} currentStep={currentStep} partialText={partialText} />
        </div>
      )}

      {phase === 'error' && (
        <div className="wf-page-body">
          <div className="wf-error">
            <p className="negative">{errorMsg}</p>
            <Button variant="secondary" onClick={handleReset}>Try Again</Button>
          </div>
        </div>
      )}

      {phase === 'done' && artifact && (
        <div className="wf-page-result">
          <ArtifactViewer artifact={artifact} />
          <CitationPanel citations={artifact.citations || citations} />
        </div>
      )}
    </div>
  );
}
