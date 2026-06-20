import React from 'react';

const Contact = ({ lang }) => {
  const t = {
    en: {
      title: "Let's Connect",
      desc: "I'm always open to discussing new opportunities in Data Analysis and Business Intelligence.",
      email: "Email Me",
      linkedin: "LinkedIn",
      github: "GitHub",
      credly: "Credly Badges"
    },
    jp: {
      title: "つながりましょう",
      desc: "データ分析やビジネスインテリジェンスの新たな機会について、いつでも話し合う準備ができています。",
      email: "メールを送る",
      linkedin: "LinkedIn",
      github: "GitHub",
      credly: "Credly バッジ"
    },
    ar: {
      title: "دعنا نتواصل",
      desc: "أنا مستعد دائمًا لمناقشة فرص جديدة في تحليل البيانات وذكاء الأعمال.",
      email: "راسلني",
      linkedin: "لينكد إن",
      github: "جيت هب",
      credly: "شارات Credly"
    }
  };

  const c = t[lang] || t.en;

  return (
    <div className="glass-card" style={{ marginTop: '16px', textAlign: 'center', padding: '48px' }}>
      <h2 style={{ 
        fontSize: '32px', 
        color: 'var(--text)', 
        marginBottom: '16px',
        textTransform: 'uppercase'
      }}>
        {c.title}
      </h2>
      <p style={{ color: 'var(--text-light)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px auto' }}>
        {c.desc}
      </p>

      {/* Direct Contact Details */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '24px', 
        flexWrap: 'wrap', 
        marginBottom: '32px', 
        color: 'var(--text-light)', 
        fontSize: '14px',
        fontFamily: lang === 'en' ? 'var(--font-mono)' : 'inherit'
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '6px 16px', borderRadius: '20px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          +91 9701062341
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '6px 16px', borderRadius: '20px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
          {lang === 'ar' ? 'كاكينادا، أندرا براديش، الهند' : (lang === 'jp' ? 'インド、アーンドラ・プラデーシュ州カキナダ' : 'Kakinada, Andhra Pradesh, India')}
        </span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <a href="mailto:Ahmedali51367@gmail.com" className="btn-pill" style={{ fontSize: '16px', padding: '12px 32px' }}>
          {c.email}
        </a>
        <a href="https://linkedin.com/in/SAhmed730" target="_blank" rel="noreferrer" className="btn-pill" style={{ fontSize: '16px', padding: '12px 32px' }}>
          {c.linkedin}
        </a>
        <a href="https://github.com/sahmed730" target="_blank" rel="noreferrer" className="btn-pill" style={{ fontSize: '16px', padding: '12px 32px' }}>
          {c.github}
        </a>
        <a href="https://www.credly.com/users/umar-saddiq-ahmed-ali-sayyed" target="_blank" rel="noreferrer" className="btn-pill" style={{ fontSize: '16px', padding: '12px 32px', background: 'var(--brand-glow, rgba(138,43,226,0.15))', borderColor: 'var(--accent)', color: 'var(--primary)' }}>
          {c.credly}
        </a>
      </div>
    </div>
  );
};

export default Contact;
