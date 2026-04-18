import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { toFarsiDigits } from '../lib/format.js';

export function Profile() {
  const navigate = useNavigate();
  const { personalizationProgress } = useApp();
  const [notifications, setNotifications] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [dataSaver, setDataSaver] = useState(false);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - personalizationProgress / 100);

  return (
    <div className="profile">
      <div className="profile__scroll">
        <header className="profile__header">
          <div className="profile__header-top">
            <button
              type="button"
              className="profile__back"
              onClick={() => navigate('/home')}
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
          <h1 className="profile__title">پروفایل</h1>
        </header>
        <section className="profile__accuracy">
          <div className="profile__accuracy-info">
            <h2 className="profile__accuracy-heading">دقت شخصی‌سازی</h2>
            <p className="profile__accuracy-desc">
              هرچه پروفایل شما کامل‌تر باشد، طراحی‌های هوش مصنوعی دقیق‌تر خواهند بود.
            </p>
          </div>
          <div className="profile__accuracy-ring">
            <svg viewBox="0 0 100 100" width="88" height="88">
              <defs>
                <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="url(#ring-grad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <span className="profile__accuracy-pct">
              {toFarsiDigits(personalizationProgress)}٪
            </span>
          </div>
        </section>
        <section className="profile__section">
          <h3 className="profile__section-heading">
            <span>تنظیمات برنامه</span>
            <span className="profile__section-bar" />
          </h3>
          <div className="profile__toggle-list">
            <label className="profile__toggle-row">
              <span className="profile__toggle-label">
                دریافت نوتیفیکیشن استایل‌های روزانه
              </span>
              <span className="profile__switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications((v) => !v)}
                />
                <span className="profile__switch-track" />
              </span>
            </label>
            <label className="profile__toggle-row">
              <span className="profile__toggle-label">ذخیره خودکار در گالری</span>
              <span className="profile__switch">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={() => setAutoSave((v) => !v)}
                />
                <span className="profile__switch-track" />
              </span>
            </label>
            <label className="profile__toggle-row">
              <span className="profile__toggle-label">حالت صرفه‌جویی در مصرف داده</span>
              <span className="profile__switch">
                <input
                  type="checkbox"
                  checked={dataSaver}
                  onChange={() => setDataSaver((v) => !v)}
                />
                <span className="profile__switch-track" />
              </span>
            </label>
          </div>
        </section>
        <section className="profile__section">
          <h3 className="profile__section-heading">
            <span>حریم خصوصی و امنیت</span>
            <span className="profile__section-bar" />
          </h3>
          <div className="profile__link-list">
            <button type="button" className="profile__link-row">
              <span>مدیریت داده‌های هوش مصنوعی</span>
              <span className="profile__chevron profile__chevron--flipped">‹</span>
            </button>
            <button type="button" className="profile__link-row">
              <span>گزارش خطاهای سیستم</span>
              <span className="profile__chevron profile__chevron--flipped">‹</span>
            </button>
            <button type="button" className="profile__link-row">
              <span>شرایط و قوانین استفاده</span>
              <span className="profile__chevron profile__chevron--flipped">‹</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
