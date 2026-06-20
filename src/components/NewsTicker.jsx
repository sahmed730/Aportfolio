import React from 'react';

const NewsTicker = ({ lang = 'en' }) => {
  const tickerItems = [
    {
      id: 'ds',
      translations: {
        en: 'Data Scientist',
        jp: 'データサイエンティスト',
        ar: 'عالم بيانات'
      },
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12" />
          <path d="M12 3v12" />
          <path d="M5.5 18a2.5 2.5 0 0 0 2.5 2.5h8a2.5 2.5 0 0 0 2.5-2.5c0-2-1.5-5-2.5-7l-3-6H10l-3 6c-1 2-2.5 5-2.5 7z" />
          <circle cx="12" cy="15" r="1.5" fill="var(--accent)" stroke="none" />
        </svg>
      )
    },
    {
      id: 'da',
      translations: {
        en: 'Data Analyst',
        jp: 'データアナリスト',
        ar: 'محلل بيانات'
      },
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <path d="M3 3v18h18" />
          <path d="M18 10l-6-6-6 10" stroke="var(--accent)" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'ba',
      translations: {
        en: 'Business Analyst',
        jp: 'ビジネスアナリスト',
        ar: 'محلل أعمال'
      },
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M21 12H3" />
          <path d="M12 3v18" />
          <path d="m16 7-4 4-2-2-3 3" stroke="var(--accent)" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'sap',
      translations: {
        en: 'SAP CPI Developer',
        jp: 'SAP CPI デベロッパー',
        ar: 'مطور SAP CPI'
      },
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42 0-.83.04-1.24.11A6 6 0 0 0 3.5 14.5c0 2.21 1.79 4 4 4" />
          <path d="M12 12v6" />
          <path d="M9 15h6" stroke="var(--accent)" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'ml',
      translations: {
        en: 'ML Engineer',
        jp: '機械学習エンジニア',
        ar: 'مهندس تعلم آلة'
      },
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
          <circle cx="12" cy="12" r="1.5" fill="var(--accent)" stroke="none" />
        </svg>
      )
    },
    {
      id: 'ai',
      translations: {
        en: 'AI Integration Specialist',
        jp: 'AI統合スペシャリスト',
        ar: 'أخصائي دمج الذكاء الاصطناعي'
      },
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          <path d="M12 8v8" stroke="var(--accent)" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'prompt',
      translations: {
        en: 'Prompt Engineer',
        jp: 'プロンプトエンジニア',
        ar: 'مهندس أوامر ذكاء اصطناعي'
      },
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 9 4 3-4 3" />
          <path d="M10 15h4" />
          <path d="m19 5-8 8" stroke="var(--accent)" />
          <path d="m15 4 2 2" />
          <path d="m18 3 3 3" />
        </svg>
      )
    }
  ];

  // We duplicate the items array so the ticker has seamless infinite scrolling
  const doubleItems = [...tickerItems, ...tickerItems];

  return (
    <div className="news-ticker-container" style={{ direction: 'ltr' }}>
      <div className="news-ticker-track">
        {doubleItems.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="news-ticker-item">
            {item.icon}
            <span style={{ fontFamily: lang === 'jp' ? 'var(--font-jp)' : (lang === 'ar' ? 'var(--font-ar)' : 'var(--font-primary)') }}>
              {item.translations[lang] || item.translations.en}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
