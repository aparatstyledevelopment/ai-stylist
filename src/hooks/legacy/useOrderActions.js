import { useNavigation } from '../../context/NavigationContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export function useOrderActions() {
  const { goBack } = useNavigation();
  const { toast } = useToast();

  const approveOrder = () => {
    toast('حواله تایید و به انباردار ارسال شد');
    setTimeout(() => goBack('orders'), 1000);
  };

  const rejectOrder = () => {
    toast('حواله رد شد — دلیل به نماینده ارسال می‌شود');
    setTimeout(() => goBack('orders'), 1200);
  };

  const toggleTimeline = () => {
    const toggle = document.getElementById('timeline-toggle');
    const content = document.getElementById('timeline-content');
    if (!toggle || !content) return;
    toggle.classList.toggle('open');
    content.classList.toggle('open');
  };

  return { approveOrder, rejectOrder, toggleTimeline };
}
