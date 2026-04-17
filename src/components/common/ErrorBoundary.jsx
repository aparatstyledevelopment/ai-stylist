import { Component } from 'react';
import './ErrorBoundary.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-inner">
            <div className="error-boundary-icon">⚠</div>
            <h2 className="error-boundary-title">Something went wrong</h2>
            <p className="error-boundary-msg">{this.state.error?.message}</p>
            <div className="error-boundary-actions">
              <button className="error-boundary-btn" onClick={() => this.setState({ hasError: false, error: null })}>
                Try again
              </button>
              <button className="error-boundary-btn-ghost" onClick={() => window.location.href = '/workspace'}>
                Go to Workspace
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
