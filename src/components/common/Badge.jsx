import './Badge.css';

export default function Badge({ label, variant = 'default' }) {
  return <span className={`badge badge-${variant}`}>{label}</span>;
}
