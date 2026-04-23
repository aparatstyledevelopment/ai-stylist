import { useToast } from '../../context/ToastContext.jsx';

export function useB2bConnect() {
  const { toast } = useToast();

  const simulateB2bConnect = () => {
    const input = document.querySelector('.b2b-input');
    if (!input || !input.value.trim()) {
      toast('کد دعوت را وارد کنید');
      input?.focus();
      return;
    }
    toast('✓ اتصال به کارخانه برقرار شد');
    input.value = '';
  };

  return { simulateB2bConnect };
}
