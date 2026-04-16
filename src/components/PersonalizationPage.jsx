import { useState } from 'react';
import './PersonalizationPage.css';

const STEPS = [
  {
    id: 'gender',
    question: 'جنسیت شما چیست؟',
    options: [
      { id: 'male', label: 'مرد', icon: '👨' },
      { id: 'female', label: 'زن', icon: '👩' },
    ],
    layout: 'row',
  },
  {
    id: 'style',
    question: 'سبک مورد علاقه شما؟',
    options: [
      { id: 'casual', label: 'کژوال', icon: '👕' },
      { id: 'formal', label: 'رسمی', icon: '👔' },
      { id: 'sport', label: 'اسپرت', icon: '🏃' },
      { id: 'classic', label: 'کلاسیک', icon: '🎩' },
      { id: 'street', label: 'خیابانی', icon: '🧢' },
      { id: 'minimal', label: 'مینیمال', icon: '✨' },
    ],
    layout: 'grid',
  },
  {
    id: 'bodyType',
    question: 'فرم بدن شما به چه شکل است؟',
    options: [
      { id: 'rectangle', label: 'مستطیلی', color: '#8B7D6B' },
      { id: 'hourglass', label: 'ساعت شنی', color: '#7B8D7B' },
      { id: 'athletic', label: 'ورزشکاری', color: '#6B7D8B' },
      { id: 'pear', label: 'گلابی شکل', color: '#5B5B6B' },
      { id: 'apple', label: 'سیب شکل', color: '#8B7B6B' },
      { id: 'plus', label: 'سایز بزرگ', color: '#7B7B8B' },
    ],
    layout: 'grid',
  },
  {
    id: 'budget',
    question: 'بودجه خرید شما؟',
    options: [
      { id: 'economy', label: 'اقتصادی', desc: 'تا ۱ میلیون تومان', icon: '💰' },
      { id: 'mid', label: 'متوسط', desc: '۱ تا ۳ میلیون تومان', icon: '💎' },
      { id: 'luxury', label: 'لوکس', desc: 'بالای ۳ میلیون تومان', icon: '👑' },
    ],
    layout: 'list',
  },
];

const BODY_SILHOUETTES = {
  rectangle: (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="16" rx="10" ry="12" fill="rgba(255,255,255,0.25)" />
      <rect x="25" y="30" width="30" height="40" rx="4" fill="rgba(255,255,255,0.18)" />
      <rect x="27" y="72" width="12" height="40" rx="3" fill="rgba(255,255,255,0.15)" />
      <rect x="41" y="72" width="12" height="40" rx="3" fill="rgba(255,255,255,0.15)" />
    </svg>
  ),
  hourglass: (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="16" rx="10" ry="12" fill="rgba(255,255,255,0.25)" />
      <path d="M22 30 C22 30 30 50 40 50 C50 50 58 30 58 30 L58 35 C58 35 50 45 50 55 C50 65 58 75 58 75 L22 75 C22 75 30 65 30 55 C30 45 22 35 22 35 Z" fill="rgba(255,255,255,0.18)" />
      <rect x="27" y="76" width="12" height="36" rx="3" fill="rgba(255,255,255,0.15)" />
      <rect x="41" y="76" width="12" height="36" rx="3" fill="rgba(255,255,255,0.15)" />
    </svg>
  ),
  athletic: (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="16" rx="10" ry="12" fill="rgba(255,255,255,0.25)" />
      <path d="M18 30 L62 30 L56 70 L24 70 Z" fill="rgba(255,255,255,0.18)" />
      <rect x="26" y="72" width="12" height="40" rx="3" fill="rgba(255,255,255,0.15)" />
      <rect x="42" y="72" width="12" height="40" rx="3" fill="rgba(255,255,255,0.15)" />
    </svg>
  ),
  pear: (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="16" rx="10" ry="12" fill="rgba(255,255,255,0.25)" />
      <path d="M30 30 L50 30 L50 45 C50 45 60 60 60 70 L20 70 C20 60 30 45 30 45 Z" fill="rgba(255,255,255,0.18)" />
      <rect x="25" y="72" width="12" height="40" rx="3" fill="rgba(255,255,255,0.15)" />
      <rect x="43" y="72" width="12" height="40" rx="3" fill="rgba(255,255,255,0.15)" />
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="16" rx="10" ry="12" fill="rgba(255,255,255,0.25)" />
      <ellipse cx="40" cy="50" rx="22" ry="22" fill="rgba(255,255,255,0.18)" />
      <rect x="27" y="72" width="12" height="40" rx="3" fill="rgba(255,255,255,0.15)" />
      <rect x="41" y="72" width="12" height="40" rx="3" fill="rgba(255,255,255,0.15)" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="16" rx="11" ry="13" fill="rgba(255,255,255,0.25)" />
      <ellipse cx="40" cy="52" rx="25" ry="24" fill="rgba(255,255,255,0.18)" />
      <rect x="24" y="74" width="14" height="38" rx="4" fill="rgba(255,255,255,0.15)" />
      <rect x="42" y="74" width="14" height="38" rx="4" fill="rgba(255,255,255,0.15)" />
    </svg>
  ),
};

export default function PersonalizationPage({ onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleSelect = (optionId) => {
    setSelections((prev) => ({ ...prev, [step.id]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((p) => p + 1);
    } else {
      onComplete(selections);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((p) => p - 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="personalization-page">
      {/* Header */}
      <div className="pers-header">
        <button className="back-btn" onClick={handleBack}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="pers-scroll">
        <h1 className="pers-title">شخصی‌سازی</h1>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Question */}
        <h2 className="pers-question">{step.question}</h2>

        {/* Options */}
        {step.layout === 'row' && (
          <div className="options-row">
            {step.options.map((opt) => (
              <button
                key={opt.id}
                className={`option-card-row ${selections[step.id] === opt.id ? 'active' : ''}`}
                onClick={() => handleSelect(opt.id)}
              >
                <span className="option-icon-large">{opt.icon}</span>
                <span className="option-label">{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {step.layout === 'grid' && step.id === 'bodyType' && (
          <div className="options-grid">
            {step.options.map((opt) => (
              <button
                key={opt.id}
                className={`body-type-card ${selections[step.id] === opt.id ? 'active' : ''}`}
                onClick={() => handleSelect(opt.id)}
              >
                <div className="body-type-image" style={{ background: opt.color }}>
                  {BODY_SILHOUETTES[opt.id]}
                </div>
                <div className="body-type-label">
                  <span>{opt.label}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {step.layout === 'grid' && step.id === 'style' && (
          <div className="options-grid">
            {step.options.map((opt) => (
              <button
                key={opt.id}
                className={`style-card ${selections[step.id] === opt.id ? 'active' : ''}`}
                onClick={() => handleSelect(opt.id)}
              >
                <span className="style-icon">{opt.icon}</span>
                <span className="style-label">{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {step.layout === 'list' && (
          <div className="options-list">
            {step.options.map((opt) => (
              <button
                key={opt.id}
                className={`option-card-list ${selections[step.id] === opt.id ? 'active' : ''}`}
                onClick={() => handleSelect(opt.id)}
              >
                <span className="list-icon">{opt.icon}</span>
                <div className="list-text">
                  <span className="list-label">{opt.label}</span>
                  {opt.desc && <span className="list-desc">{opt.desc}</span>}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Next Button */}
        {selections[step.id] && (
          <button className="next-btn" onClick={handleNext}>
            {currentStep < STEPS.length - 1 ? 'ادامه' : 'تکمیل شخصی‌سازی'}
          </button>
        )}
      </div>
    </div>
  );
}
