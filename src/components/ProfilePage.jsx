import { useState } from 'react';
import './ProfilePage.css';

export default function ProfilePage({ onClose, onOpenPersonalization, personalizationData }) {
  const [settings, setSettings] = useState({
    dailyNotifications: false,
    autoSaveGallery: false,
    dataSaver: false,
  });

  const completedSteps = personalizationData ? Object.keys(personalizationData).length : 0;
  const totalSteps = 4;
  const accuracy = Math.round((completedSteps / totalSteps) * 100);

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // SVG arc for the progress ring
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (accuracy / 100) * circumference;

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <button className="back-btn" onClick={onClose}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="profile-scroll">
        <h1 className="profile-title">پروفایل</h1>

        {/* Accuracy Card */}
        <div className="accuracy-card" onClick={onOpenPersonalization}>
          <div className="accuracy-info">
            <h2 className="accuracy-heading">دقت شخصی‌سازی</h2>
            <p className="accuracy-desc">
              هرچه پروفایل شما کامل‌تر باشد، طراحی‌های هوش مصنوعی دقیق‌تر خواهند بود.
            </p>
          </div>
          <div className="accuracy-ring">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
              />
              <circle
                cx="50" cy="50" r={radius}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
              />
            </svg>
            <span className="accuracy-percent">{accuracy.toLocaleString('fa-IR')}٪</span>
          </div>
        </div>

        {/* App Settings Section */}
        <div className="section-header">
          <span className="section-bar" />
          <h3 className="section-title">تنظیمات برنامه</h3>
        </div>

        <div className="settings-list">
          <div className="setting-item">
            <button
              className={`toggle ${settings.dailyNotifications ? 'on' : ''}`}
              onClick={() => toggleSetting('dailyNotifications')}
            >
              <span className="toggle-knob" />
            </button>
            <span className="setting-label">دریافت نوتیفیکشن استایل‌های روزانه</span>
          </div>
          <div className="setting-item">
            <button
              className={`toggle ${settings.autoSaveGallery ? 'on' : ''}`}
              onClick={() => toggleSetting('autoSaveGallery')}
            >
              <span className="toggle-knob" />
            </button>
            <span className="setting-label">ذخیره خودکار در گالری</span>
          </div>
          <div className="setting-item">
            <button
              className={`toggle ${settings.dataSaver ? 'on' : ''}`}
              onClick={() => toggleSetting('dataSaver')}
            >
              <span className="toggle-knob" />
            </button>
            <span className="setting-label">حالت صرفه‌جویی در مصرف داده</span>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="section-header">
          <span className="section-bar" />
          <h3 className="section-title">حریم خصوصی و امنیت</h3>
        </div>

        <div className="settings-list">
          <button className="link-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="setting-label">مدیریت داده‌های هوش مصنوعی</span>
          </button>
          <button className="link-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="setting-label">گزارش خطاهای سیستم</span>
          </button>
        </div>
      </div>
    </div>
  );
}
