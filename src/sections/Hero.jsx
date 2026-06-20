import React, { useState, useEffect } from 'react';
import profilePic from '../assets/new-profile.png';

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
};

const Hero = ({ lang, onOpenResume }) => {
  const isMobile = useIsMobile();
  const [nextPrayer, setNextPrayer] = useState(null);

  const greetings = [
    { text: 'Hello', font: 'var(--font-custom)', style: 'italic', dir: 'ltr' },
    { text: 'السلام عليكم', font: 'var(--font-ar)', style: 'normal', dir: 'rtl' },
    { text: 'こんにちは', font: 'var(--font-jp)', style: 'normal', dir: 'ltr' },
    { text: 'Hola', font: 'var(--font-custom)', style: 'italic', dir: 'ltr' },
    { text: 'Bonjour', font: 'var(--font-custom)', style: 'italic', dir: 'ltr' },
    { text: 'नमस्ते', font: 'var(--font-custom)', style: 'normal', dir: 'ltr' },
    { text: 'Ciao', font: 'var(--font-custom)', style: 'italic', dir: 'ltr' }
  ];

  const [greetingIndex, setGreetingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Role animation cycle
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleFade, setRoleFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleFade(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % 6);
        setRoleFade(true);
      }, 500); // Wait for fade out
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Typing animation cycle
  useEffect(() => {
    let timeout;
    const currentGreeting = greetings[greetingIndex].text;
    
    if (isDeleting) {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentGreeting.substring(0, displayedText.length - 1));
        }, 50); // Fast delete
      } else {
        setIsDeleting(false);
        setGreetingIndex((prev) => (prev + 1) % greetings.length);
      }
    } else {
      if (displayedText.length < currentGreeting.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentGreeting.substring(0, displayedText.length + 1));
        }, 150); // Typing speed
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2500); // Pause at the end before deleting
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, greetingIndex]);

  // Fetch Prayer Times for Arabic Mode
  useEffect(() => {
    if (lang === 'ar') {
      const fetchPrayerTimes = async () => {
        try {
          const res = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Dubai&country=United%20Arab%20Emirates&method=8');
          const data = await res.json();
          if (data && data.data && data.data.timings) {
            const timings = data.data.timings;
            const now = new Date();
            const currentHour = now.getHours();
            const currentMin = now.getMinutes();
            const currentTotalMins = currentHour * 60 + currentMin;

            const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
            let next = null;
            let minDiff = Infinity;

            for (let prayer of prayers) {
              const [h, m] = timings[prayer].split(':').map(Number);
              const prayerTotalMins = h * 60 + m;
              let diff = prayerTotalMins - currentTotalMins;

              if (diff > 0 && diff < minDiff) {
                minDiff = diff;
                next = { name: prayer, diffMins: diff };
              }
            }

            if (next) {
              const hrs = Math.floor(next.diffMins / 60);
              const mins = next.diffMins % 60;
              const timeStr = hrs > 0 ? `${hrs}h ${mins}m` : `${mins} min`;
              // Map English prayer names to Arabic logic if needed, but keeping original for now
              setNextPrayer(`Maghrib in ${timeStr}`); // Hardcoded prefix to match original request style, dynamically update time
              // Actually let's use the real next prayer name
              setNextPrayer(`${next.name} in ${timeStr}`);
            } else {
              setNextPrayer('Isha has passed');
            }
          }
        } catch (err) {
          console.error("Failed to fetch prayer times", err);
          setNextPrayer('Maghrib in 30 min'); // fallback
        }
      };
      fetchPrayerTimes();
    } else {
      setNextPrayer(null);
    }
  }, [lang]);

  const getCustomFont = () => {
    if (lang === 'jp') return 'var(--font-jp)';
    if (lang === 'ar') return 'var(--font-ar)';
    return 'var(--font-custom)';
  };

  const t = {
    en: {
      status: 'Available for new opportunities',
      bio: 'Specialized in Business Intelligence, Workflow Automation, Data Analysis, and Power Platform Development.',
      i_am: 'I AM',
      name: 'AHMED',
      roles: [
        ['DATA', 'SPECIALIST', 'EXPERT'],
        ['BI', 'DATA', 'PROFESSIONAL'],
        ['POWER', 'PLATFORM', 'DEVELOPER'],
        ['DATA', 'AND', 'ANALYST'],
        ['AI', 'PROMPT', 'ENGINEER'],
        ['SAP', 'CPI', 'DEVELOPER']
      ]
    },
    jp: {
      status: '新しい機会を探しています',
      bio: 'ビジネスインテリジェンス、ワークフロー自動化、データ分析、Power Platform開発を専門としています。',
      i_am: '私は',
      name: 'アーメド',
      roles: [
        ['データ', 'スペシャリスト', '専門家'],
        ['BI', 'データ', 'プロフェッショナル'],
        ['POWER', 'PLATFORM', '開発者'],
        ['データ', 'と', 'アナリスト'],
        ['AI', 'プロンプト', 'エンジニア'],
        ['SAP', 'CPI', '開発者']
      ]
    },
    ar: {
      status: 'متاح لفرص جديدة',
      bio: 'متخصص في ذكاء الأعمال، أتمتة سير العمل، تحليل البيانات، وتطوير منصات Power Platform.',
      i_am: 'أنا',
      name: 'أحمد',
      roles: [
        ['خبير', 'بيانات', 'متخصص'],
        ['محترف', 'ذكاء', 'أعمال'],
        ['مطور', 'Power', 'Platform'],
        ['محلل', 'وبيانات', 'متخصص'],
        ['مهندس', 'أوامر', 'الذكاء الاصطناعي'],
        ['مطور', 'SAP', 'CPI']
      ]
    }
  };

  if (isMobile) {
    // ===== MOBILE LAYOUT: Clean vertical stack, no overlaps =====
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0 24px',
        gap: '0',
        direction: lang === 'ar' ? 'rtl' : 'ltr'
      }}>

        {/* Typing Greeting */}
        <div style={{
          textAlign: 'center',
          fontFamily: greetings[greetingIndex].font,
          fontStyle: greetings[greetingIndex].style,
          fontSize: 'clamp(28px, 10vw, 56px)',
          lineHeight: 1.1,
          color: 'var(--primary)',
          whiteSpace: 'nowrap',
          direction: greetings[greetingIndex].dir,
          minHeight: '60px'
        }}>
          {displayedText}<span style={{ opacity: 0.6, fontWeight: 300, fontFamily: 'var(--font-primary)' }}>|</span>
        </div>

        {/* Name & Role — compact horizontal bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%',
          padding: '8px 0',
          marginTop: '4px'
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 8vw, 40px)',
            fontWeight: 700,
            lineHeight: 0.9,
            textTransform: 'uppercase',
            color: 'var(--text)'
          }}>
            {t[lang].i_am}<br />{t[lang].name}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(14px, 4.5vw, 24px)',
            fontWeight: 700,
            lineHeight: 0.9,
            textTransform: 'uppercase',
            textAlign: lang === 'ar' ? 'left' : 'right',
            color: 'var(--text-light)',
            opacity: roleFade ? 1 : 0,
            transition: 'opacity 0.5s ease'
          }}>
            {t[lang].roles[roleIndex][0]}<br />{t[lang].roles[roleIndex][1]}<br />{t[lang].roles[roleIndex][2]}
          </div>
        </div>

        {/* Profile Image — contained, no overlap */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          maxHeight: '45vh',
          overflow: 'hidden',
          marginTop: '8px'
        }}>
          <img
            src={profilePic}
            alt="Ahmed Ali"
            style={{
              height: '100%',
              maxHeight: '45vh',
              objectFit: 'contain',
              maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
            }}
          />
        </div>

        {/* Status Badge */}
        <div style={{
          background: 'var(--surface)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid var(--border)',
          padding: '8px 20px',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '12px'
        }}>
          <div style={{
            width: '10px', height: '10px',
            background: 'var(--accent)',
            borderRadius: '50%',
            boxShadow: '0 0 8px var(--accent)'
          }} />
          <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text)' }}>
            {lang === 'ar' && nextPrayer ? nextPrayer : t[lang].status}
          </span>
        </div>

        {/* Bio Text */}
        <p style={{
          fontSize: '12px',
          fontWeight: 400,
          color: 'var(--text-light)',
          textAlign: 'center',
          maxWidth: '320px',
          lineHeight: 1.5,
          marginTop: '10px',
          padding: '0 8px'
        }}>
          {t[lang].bio}
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button
            onClick={onOpenResume}
            className="btn-pill"
            style={{
              background: 'var(--primary)',
              color: 'var(--bg-dark)',
              padding: '10px 20px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 6px 20px var(--btn-shadow)',
              border: 'none'
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            {lang === 'ar' ? 'السيرة الذاتية' : (lang === 'jp' ? '履歴書を選択' : 'My Resume')}
          </button>

          <a
            href="mailto:Ahmedali51367@gmail.com"
            className="btn-pill"
            style={{
              background: 'transparent',
              border: '1.5px solid var(--text-light)',
              color: 'var(--text)',
              padding: '10px 20px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none'
            }}
          >
            {lang === 'ar' ? 'تواصل معي' : (lang === 'jp' ? 'お問い合わせ' : 'Let\'s Connect')}
          </a>
        </div>
      </div>
    );
  }

  // ===== DESKTOP LAYOUT: Original absolute-positioned overlay =====
  return (
    <div style={{
      position: 'relative',
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: '0',
      paddingTop: '5vh'
    }}>

      {/* BACKGROUND LAYER - Huge Custom Font (Typing Style) */}
      <div style={{
        width: '100%',
        textAlign: 'center',
        zIndex: 0,
        fontFamily: greetings[greetingIndex].font,
        fontStyle: greetings[greetingIndex].style,
        fontSize: greetings[greetingIndex].font === 'var(--font-ar)' ? 'clamp(60px, 10vw, 130px)' : 'clamp(60px, 10vw, 150px)',
        lineHeight: 1,
        color: 'var(--primary)',
        whiteSpace: 'nowrap',
        direction: greetings[greetingIndex].dir,
        marginBottom: '-5vh'
      }}>
        {displayedText}<span style={{ opacity: 0.7, fontWeight: 300, fontFamily: 'var(--font-primary)' }}>|</span>
      </div>

      {/* MIDDLE LAYER - Profile Picture */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '65vh',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <img
          src={profilePic}
          alt="Ahmed Ali"
          style={{
            height: '100%',
            objectFit: 'contain',
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
          }}
        />
      </div>

      {/* Call to Actions */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginTop: '16px',
        zIndex: 10,
        position: 'relative',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={onOpenResume}
          className="btn-pill"
          style={{
            background: 'var(--primary)',
            color: 'var(--bg-dark)',
            padding: '12px 32px',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 25px var(--btn-shadow)',
            border: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 255, 255, 0.25)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px var(--btn-shadow)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          {lang === 'ar' ? 'اختر سيرتك الذاتية' : (lang === 'jp' ? '特化型履歴書を選択' : 'Choose Specialized Resume')}
        </button>

        <a
          href="mailto:Ahmedali51367@gmail.com"
          className="btn-pill"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1.5px solid var(--text)',
            color: 'var(--text)',
            padding: '12px 32px',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(138,43,226,0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'var(--text)';
            e.currentTarget.style.color = 'var(--text)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {lang === 'ar' ? 'تواصل معي' : (lang === 'jp' ? 'お問い合わせ' : 'Let\'s Connect')}
        </a>
      </div>

      {/* FOREGROUND LAYER - UI Badges and Text (desktop only) */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
        direction: lang === 'ar' ? 'rtl' : 'ltr'
      }}>

        {/* Left Badge: Status / Prayer Time */}
        <div style={{
          position: 'absolute',
          top: '40%',
          [lang === 'ar' ? 'right' : 'left']: '0',
          background: 'var(--surface)',
          padding: '12px 24px',
          borderRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          pointerEvents: 'auto'
        }}>
          <div style={{
            position: 'relative',
            width: '24px',
            height: '24px',
            background: '#FFE4D6',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'var(--accent)',
              borderRadius: '50%',
              boxShadow: '0 0 10px var(--accent)'
            }}></div>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>
            {lang === 'ar' && nextPrayer ? nextPrayer : t[lang].status}
          </span>
        </div>

        {/* Right Short Bio */}
        <div style={{
          position: 'absolute',
          top: '45%',
          [lang === 'ar' ? 'left' : 'right']: '0',
          maxWidth: '240px',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--primary)',
          pointerEvents: 'auto'
        }}>
          {t[lang].bio}
        </div>

        {/* Bottom Left: I AM AHMED */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          [lang === 'ar' ? 'right' : 'left']: '0',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(60px, 8vw, 120px)',
          fontWeight: 700,
          lineHeight: 0.9,
          textTransform: 'uppercase'
        }}>
          {t[lang].i_am}<br />{t[lang].name}
        </div>

        {/* Bottom Right: DATA SPECIALIST EXPERT */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          [lang === 'ar' ? 'left' : 'right']: '0',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(40px, 5vw, 70px)',
          fontWeight: 700,
          lineHeight: 0.9,
          textTransform: 'uppercase',
          textAlign: lang === 'ar' ? 'left' : 'right',
          opacity: roleFade ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}>
          {t[lang].roles[roleIndex][0]}<br />{t[lang].roles[roleIndex][1]}<br />{t[lang].roles[roleIndex][2]}
        </div>

      </div>

    </div>
  );
};

export default Hero;

