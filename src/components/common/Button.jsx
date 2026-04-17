import './Button.css';

export default function Button({ children, variant = 'primary', size = 'md', loading, onClick, disabled, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className="btn-spinner" />}
      {children}
    </button>
  );
}
