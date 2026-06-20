import React from 'react';

const Navbar = ({ lang, setLang, onOpenResume, onOpenCertificates, theme, onToggleTheme }) => {
  const translations = {
    en: { home: 'Home', works: 'Works', about: 'About', services: 'Open to work freelancing in designing', contact: 'Contact' },
    jp: { home: 'ホーム', works: '作品', about: '私について', services: 'デザインのフリーランス対応可能', contact: '連絡する' },
    ar: { home: 'الرئيسية', works: 'أعمالي', about: 'عني', services: 'متاح للعمل الحر في التصميم', contact: 'اتصل بي' }
  };

  const t = translations[lang] || translations.en;
  const isMoon = theme === 'moon';

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '32px 0',
      width: '100%',
      flexWrap: 'wrap',
      gap: '16px'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href="#home">
          <img 
            src="/logo.png" 
            alt="S. Ahmed Ali Signature Logo" 
            style={{
              height: '80px', // Increased height to make the signature legible
              margin: '-16px 0', // Compensates for logo vertical height
              objectFit: 'contain',
              filter: isMoon ? 'invert(1) brightness(1.5)' : 'none',
              transition: 'filter 0.6s ease, transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </a>
      </div>

      {/* Links */}
      <div className="glass-nav-pill" style={{
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <a href="#home" className="nav-link">{t.home}</a>
        <a href="#works" className="nav-link">{t.works}</a>
        <a href="#about" className="nav-link">{t.about}</a>
        <a href="mailto:Ahmedali51367@gmail.com?subject=Freelance%20Design%20Inquiry" className="nav-link" style={{ 
          background: 'var(--brand-glow, rgba(138,43,226,0.15))', 
          border: '1px solid var(--accent)',
          textTransform: 'none',
          fontWeight: 600,
          color: 'var(--primary)'
        }}>{t.services}</a>
      </div>

      {/* Controls: Theme Toggle, Lang Toggle & Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        
        {/* ☀️🌙 Theme Toggle */}
        <button 
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={isMoon ? 'Switch to sun mode' : 'Switch to moon mode'}
          title={isMoon ? 'Switch to Sun ☀️' : 'Switch to Moon 🌙'}
        >
          {isMoon ? (
            /* Crescent Moon Icon */
            <svg 
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: 'rotate(0deg)' }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            /* Sun Icon */
            <svg 
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: 'rotate(90deg)', color: '#FF8C00' }}
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>

        {/* Language Toggle */}
        <div style={{
          display: 'flex',
          gap: '4px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: '4px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'background 0.6s ease, border-color 0.6s ease'
        }}>
          {['en', 'jp', 'ar'].map(l => (
            <button 
              key={l}
              onClick={() => setLang(l)}
              style={{
                background: lang === l ? 'var(--primary)' : 'transparent',
                color: lang === l ? 'var(--bg)' : 'var(--text-light)',
                border: 'none',
                padding: '4px 12px',
                borderRadius: '16px',
                cursor: 'pointer',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '12px',
                transition: 'all 0.3s ease'
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Socials Group */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '4px 16px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'background 0.6s ease, border-color 0.6s ease'
        }}>
          <span style={{ 
            fontSize: '12px', 
            fontWeight: 700, 
            color: 'var(--text-light)', 
            marginRight: '4px', 
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Socials
          </span>
          <a href="https://linkedin.com/in/SAhmed730" target="_blank" rel="noreferrer" title="LinkedIn" style={{ color: 'var(--text)', transition: 'all 0.3s ease', display: 'flex' }} onMouseOver={e => { e.currentTarget.style.color='var(--primary)'; e.currentTarget.style.transform='scale(1.1)'; }} onMouseOut={e => { e.currentTarget.style.color='var(--text)'; e.currentTarget.style.transform='scale(1)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://www.instagram.com/s.ahmed730/" target="_blank" rel="noreferrer" title="Instagram" style={{ color: 'var(--text)', transition: 'all 0.3s ease', display: 'flex' }} onMouseOver={e => { e.currentTarget.style.color='var(--primary)'; e.currentTarget.style.transform='scale(1.1)'; }} onMouseOut={e => { e.currentTarget.style.color='var(--text)'; e.currentTarget.style.transform='scale(1)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.credly.com/users/umar-saddiq-ahmed-ali-sayyed" target="_blank" rel="noreferrer" title="Credly Badges" style={{ color: 'var(--text)', transition: 'all 0.3s ease', display: 'flex' }} onMouseOver={e => { e.currentTarget.style.color='var(--primary)'; e.currentTarget.style.transform='scale(1.1)'; }} onMouseOut={e => { e.currentTarget.style.color='var(--text)'; e.currentTarget.style.transform='scale(1)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          </a>
        </div>

        {/* Resume Selector Trigger Button */}
        <button 
          onClick={onOpenResume}
          className="btn-pill"
          style={{
            background: 'transparent',
            border: '1.5px solid var(--text)',
            color: 'var(--text)',
            cursor: 'pointer',
            padding: '8px 20px',
            fontSize: '13px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 4px 15px var(--ticker-hover-glow)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'var(--text)';
            e.currentTarget.style.color = 'var(--text)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          {lang === 'ar' ? 'السيرة الذاتية' : (lang === 'jp' ? '履歴書' : 'Resume')}
        </button>

        <button 
          onClick={onOpenCertificates}
          className="btn-pill"
          style={{
            background: 'transparent',
            border: '1.5px solid var(--text)',
            color: 'var(--text)',
            cursor: 'pointer',
            padding: '8px 20px',
            fontSize: '13px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 4px 15px var(--ticker-hover-glow)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'var(--text)';
            e.currentTarget.style.color = 'var(--text)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          {lang === 'ar' ? 'الشهادات' : (lang === 'jp' ? '資格' : 'Certificates')}
        </button>

        <a href="mailto:Ahmedali51367@gmail.com" className="btn-pill">
          {t.contact}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
