import { useNavigation } from '../../context/NavigationContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export function useExcelAi() {
  const { goBack } = useNavigation();
  const { toast } = useToast();

  const simulateAiUpload = () => {
    const dz = document.getElementById('ai-dropzone');
    const preview = document.getElementById('ai-preview');
    const submit = document.getElementById('ai-submit');
    if (!dz || !preview || !submit) return;
    dz.style.display = 'none';
    preview.style.display = 'block';
    submit.disabled = false;
    const text = document.getElementById('ai-submit-text');
    if (text) text.textContent = 'ایمپورت ۲۴ آیتم';
  };

  const resetAiUpload = () => {
    const dz = document.getElementById('ai-dropzone');
    const preview = document.getElementById('ai-preview');
    const submit = document.getElementById('ai-submit');
    if (!dz || !preview || !submit) return;
    dz.style.display = 'block';
    preview.style.display = 'none';
    submit.disabled = true;
    const text = document.getElementById('ai-submit-text');
    if (text) text.textContent = 'شروع تحلیل هوشمند';
    const analyze = document.getElementById('ai-analyze');
    if (analyze) analyze.classList.remove('open');
  };

  const toggleAnalyze = () => {
    document.getElementById('ai-analyze')?.classList.toggle('open');
  };

  const submitAiUpload = () => {
    const btnText = document.getElementById('ai-submit-text');
    const btn = document.getElementById('ai-submit');
    if (!btn || !btnText) return;
    btnText.textContent = 'در حال ایمپورت…';
    btn.disabled = true;
    setTimeout(() => {
      toast('✓ ۲۴ آیتم با موفقیت ایمپورت شد');
      goBack('warehouse');
      setTimeout(resetAiUpload, 400);
    }, 1500);
  };

  return { simulateAiUpload, resetAiUpload, toggleAnalyze, submitAiUpload };
}
