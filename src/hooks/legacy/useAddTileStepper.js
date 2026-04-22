import { useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { toPersianNum } from '../../utils/format.js';

const STEP_NAMES = { 1: 'اطلاعات پایه', 2: 'ویژگی‌ها و بسته‌بندی', 3: 'قیمت و دسترسی' };
const TOTAL_STEPS = 3;

export function useAddTileStepper() {
  const { goBack } = useNavigation();
  const { toast } = useToast();
  const stepRef = useRef(1);

  const updateStepper = (currentStep) => {
    document.querySelectorAll('.form-step').forEach((s) => s.classList.remove('active'));
    const step = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (step) step.classList.add('active');
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      const seg = document.getElementById(`seg-${i}`);
      if (!seg) continue;
      seg.classList.remove('active', 'done');
      if (i < currentStep) seg.classList.add('done');
      else if (i === currentStep) seg.classList.add('active');
    }
    const num = document.getElementById('step-num');
    const name = document.getElementById('step-name');
    if (num) num.textContent = `قدم ${toPersianNum(currentStep)} از ${toPersianNum(TOTAL_STEPS)}`;
    if (name) name.textContent = STEP_NAMES[currentStep];
    const back = document.getElementById('step-back');
    const next = document.getElementById('step-next');
    const submit = document.getElementById('step-submit');
    if (back) back.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    if (next) next.style.display = currentStep < TOTAL_STEPS ? 'inline-flex' : 'none';
    if (submit) submit.style.display = currentStep === TOTAL_STEPS ? 'inline-flex' : 'none';
    const content = document.querySelector('.page[data-page="add-tile"] .content');
    if (content) content.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => {
    if (stepRef.current < TOTAL_STEPS) {
      stepRef.current++;
      updateStepper(stepRef.current);
    }
  };

  const prevStep = () => {
    if (stepRef.current > 1) {
      stepRef.current--;
      updateStepper(stepRef.current);
    }
  };

  const saveTile = () => {
    toast('کاشی جدید ذخیره شد');
    setTimeout(() => goBack('warehouse'), 800);
  };

  return { nextStep, prevStep, saveTile };
}
