import { useNavigation } from '../context/NavigationContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useOverlay } from '../context/OverlayContext.jsx';

export function ResetButton() {
  const { reset } = useNavigation();
  const { toast } = useToast();
  const { closeSheet, closeModal } = useOverlay();

  const onReset = () => {
    closeSheet();
    closeModal();
    reset();
    toast('پروتوتایپ بازنشانی شد');
  };

  return (
    <button className="reset-btn" onClick={onReset}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M23 4v6h-6" />
        <path d="M1 20v-6h6" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
      بازنشانی
    </button>
  );
}
