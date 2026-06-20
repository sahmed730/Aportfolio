import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import NewsTicker from './components/NewsTicker';
import LiquidBackground from './components/LiquidBackground';
import FloatingLogos from './components/FloatingLogos';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import ResumeModal from './components/ResumeModal';
import CertificatesGallery from './components/CertificatesGallery';
import MimmiChatbot from './components/MimmiChatbot';

function App() {
  const [lang, setLang] = useState('en');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [theme, setTheme] = useState('moon');

  // Apply theme to document root for CSS variable switching
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle RTL direction for Arabic globally
  useEffect(() => {
    if (lang === 'ar') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  }, [lang]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'moon' ? 'sun' : 'moon');
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Liquid Glass Dynamic Environment */}
      <LiquidBackground theme={theme} />
      
      {/* Interactive Floating 3D Tech Logos */}
      <FloatingLogos />
      
      <div className="content-wrapper" style={{ fontFamily: lang === 'ar' ? 'var(--font-ar)' : 'var(--font-primary)' }}>
        <Navbar 
          lang={lang} 
          setLang={setLang} 
          onOpenResume={() => setIsResumeOpen(true)} 
          onOpenCertificates={() => setIsCertificatesOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <div id="home">
          <Hero lang={lang} onOpenResume={() => setIsResumeOpen(true)} />
        </div>
      </div>
      
      <div style={{ width: '100%', position: 'relative' }}>
        <NewsTicker lang={lang} />
      </div>
      
      <div className="content-wrapper" style={{ fontFamily: lang === 'ar' ? 'var(--font-ar)' : 'var(--font-primary)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', width: '100%', position: 'relative', zIndex: 10 }}>
          <div id="about"><About lang={lang} /></div>
          <Experience lang={lang} />
          <div id="works"><Projects lang={lang} /></div>
          <Skills lang={lang} />
        </div>
        
        <Contact lang={lang} />
      </div>

      {/* Global Resume Selector & Interactive Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} lang={lang} />
      
      {/* Certificates Gallery Modal */}
      <CertificatesGallery isOpen={isCertificatesOpen} onClose={() => setIsCertificatesOpen(false)} lang={lang} />
      
      {/* Mimmi AI Mascot & Chat */}
      <MimmiChatbot />
    </div>
  );
}

export default App;
