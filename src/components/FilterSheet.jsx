import { useState } from 'react';
import './FilterSheet.css';

const FILTER_TABS = [
  {
    id: 'gender',
    label: 'جنسیت',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'style',
    label: 'سبک',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: 'bodyType',
    label: 'نوع اندام',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <line x1="12" y1="11" x2="12" y2="17" />
      </svg>
    ),
  },
  {
    id: 'budget',
    label: 'بودجه',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
];

const FILTER_OPTIONS = {
  gender: [
    { id: 'male', label: 'مرد' },
    { id: 'female', label: 'زن' },
  ],
  style: [
    { id: 'casual', label: 'کژوال' },
    { id: 'formal', label: 'رسمی' },
    { id: 'sport', label: 'اسپرت' },
    { id: 'classic', label: 'کلاسیک' },
  ],
  bodyType: [
    { id: 'slim', label: 'لاغر' },
    { id: 'regular', label: 'معمولی' },
    { id: 'athletic', label: 'ورزشکاری' },
    { id: 'large', label: 'درشت' },
  ],
  budget: [
    { id: 'low', label: 'اقتصادی' },
    { id: 'mid', label: 'متوسط' },
    { id: 'high', label: 'لوکس' },
  ],
};

export default function FilterSheet({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('gender');
  const [selections, setSelections] = useState({});

  const toggleSelection = (tabId, optionId) => {
    setSelections((prev) => ({
      ...prev,
      [tabId]: prev[tabId] === optionId ? null : optionId,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-blur" />
      <div className="filter-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Options */}
        <div className="filter-options">
          {FILTER_OPTIONS[activeTab]?.map((option) => (
            <button
              key={option.id}
              className={`filter-pill ${selections[activeTab] === option.id ? 'active' : ''}`}
              onClick={() => toggleSelection(activeTab, option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Tab Bar */}
        <div className="filter-tabs">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`filter-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              {activeTab === tab.id && <span className="tab-indicator" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
