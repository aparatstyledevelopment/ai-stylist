import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

const img = (name) => `/personalization/${name}`;

const BODY_TYPES = [
  {
    id: 'skinny',
    label: 'ورزشکاری',
    image: img('photo_2026-02-22_19-00-29-17d585cd-ad90-4642-a2dd-643683f0863d.png'),
  },
  {
    id: 'average',
    label: 'ساعت شنی',
    image: img('photo_2026-02-22_19-00-31-c5a41ac1-a3f2-4ea6-9279-09de17134868.png'),
  },
  {
    id: 'average',
    label: 'مستطیلی',
    image: img('photo_2026-02-22_19-00-30-3988fa92-9ea8-4241-8d29-cfc363b81eeb.png'),
  },
  {
    id: 'plus_size',
    label: 'سایز بزرگ',
    image: img('photo_2026-02-22_19-00-32-a8df5a13-6abb-4124-a8bb-05c1238b4d34.png'),
  },
  {
    id: 'plus_size',
    label: 'سیب شکل',
    image: img('photo_2026-02-22_19-00-32__2_-5d55cf71-9f6c-4126-8b68-4263dae41888.png'),
  },
  {
    id: 'plus_size',
    label: 'گلابی شکل',
    image: img('photo_2026-02-22_19-00-33-8b75c2bf-a75d-4daa-af1d-56ff98d565d2.png'),
  },
];

const STYLE_PREFERENCES = [
  {
    id: 'special',
    label: 'خاص و متفاوت باشه',
    image: img('photo_2026-02-22_19-01-52-3d33eda4-fed6-4cf8-9a69-ea3fea20c92c.png'),
  },
  {
    id: 'simple',
    label: 'ساده و مرتب باشه',
    image: img('photo_2026-02-22_19-01-50__2_-ebe93d99-1cc2-4e02-b0cc-857e834414b2.png'),
  },
  {
    id: 'trendy',
    label: 'کاملاً ترندی باشه',
    image: img('photo_2026-02-22_19-01-51-f71cfb79-9cee-4077-ab7a-0d6580fc3259.png'),
  },
  {
    id: 'chic',
    label: 'راحت ولی شیک باشه',
    image: img('photo_2026-02-22_19-01-50-6cfaa004-8a10-40e1-8fd9-909207e4eff1.png'),
  },
];

const FIT_PREFERENCES = [
  {
    id: 'comfortable',
    label: 'استایل آزاد و راحت داشته باشن',
    image: img('photo_2026-02-22_19-02-04-77d8db3b-8783-4bd4-a142-1494e0afa561.png'),
  },
  {
    id: 'fitted',
    label: 'فرم بدن رو نشون بدن',
    image: img('photo_2026-02-22_19-02-03-8f9c5cde-cef2-40ca-bae0-da5fd9c8b0ee.png'),
  },
];

const STEPS = [
  { title: 'فرم بدن شما به چه شکل است؟', options: BODY_TYPES, gridCols: 3 },
  { title: 'وقتی میخوای بری بیرون، بیشتر دوست داری استایلت', options: STYLE_PREFERENCES, gridCols: 2 },
  { title: 'ترجیح میدی لباس ها بیشتر:', options: FIT_PREFERENCES, gridCols: 2 },
];

const PROGRESS_START = 25;
const PROGRESS_PER_STEP = 25;

export function Personalization() {
  const navigate = useNavigate();
  const { setFilters, setPersonalizationProgress } = useApp();
  const [step, setStep] = useState(0);

  const current = STEPS[step];
  const progress = PROGRESS_START + step * PROGRESS_PER_STEP;

  const pick = (optionIndex) => {
    if (step === 0) {
      const option = BODY_TYPES[optionIndex];
      setFilters({ body_type: option.id });
    }
    if (step === STEPS.length - 1) {
      setPersonalizationProgress(100);
      navigate('/home', { replace: true });
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="personalization">
      <header className="personalization__header">
        <div className="personalization__header-top">
          <button
            type="button"
            className="personalization__back"
            onClick={() => navigate(-1)}
            aria-label="بازگشت"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: 'scaleX(-1)' }}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>
        <h1 className="personalization__title-main">شخصی‌سازی</h1>
        <div className="personalization__progress-wrap">
          <div
            className="personalization__progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>
      <h2 className="personalization__question-title">{current.title}</h2>
      <div
        className="personalization__grid"
        style={{ gridTemplateColumns: `repeat(${current.gridCols}, 1fr)` }}
      >
        {current.options.map((option, idx) => (
          <button
            key={option.id + option.label + idx}
            type="button"
            className="personalization__card"
            onClick={() => pick(idx)}
          >
            <img src={option.image} alt="" className="personalization__card-image" />
            <span className="personalization__card-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
