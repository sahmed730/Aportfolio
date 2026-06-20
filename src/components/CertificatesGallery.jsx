import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CertificatesGallery = ({ isOpen, onClose, lang }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Close lightbox on escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (selectedImage) setSelectedImage(null);
        else onClose();
      }
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, selectedImage, onClose]);

  const certificateCategories = [
    {
      name: 'Microsoft',
      images: [
        '/certificates/Microsoft.jpg', 
        '/certificates/microsoft2.jpg'
      ]
    },
    {
      name: 'Google',
      images: [
        '/certificates/Google.jpg', 
        '/certificates/google2.jpg'
      ]
    },
    {
      name: 'Anthropic',
      images: [
        '/certificates/Antropic.jpg', 
        '/certificates/Antropic2.jpg', 
        '/certificates/Antropic3.jpg', 
        '/certificates/Antropic4.jpg'
      ]
    },
    {
      name: 'Oracle & Snowflake',
      images: [
        '/certificates/Oracle Java.jpg',
        '/certificates/Snowflake.jpg'
      ]
    },
    {
      name: 'LinkedIn Learning',
      images: Array.from({ length: 8 }, (_, i) => `/certificates/LinkedIn/rest_page-000${i + 1}.jpg`)
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(10, 10, 15, 0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={() => {
            if (selectedImage) setSelectedImage(null);
            else onClose();
          }}
        >
          <motion.div 
            className="glass-card"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            style={{
              maxWidth: selectedImage ? '95vw' : '1200px',
              width: '95vw',
              background: 'var(--modal-bg)',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              padding: selectedImage ? '0' : '40px',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: selectedImage ? 'hidden' : 'auto',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              direction: lang === 'ar' ? 'rtl' : 'ltr',
              textAlign: lang === 'ar' ? 'right' : 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={selectedImage ? () => setSelectedImage(null) : onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: lang === 'ar' ? 'auto' : '20px',
                left: lang === 'ar' ? '20px' : 'auto',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '20px',
                zIndex: 50,
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {selectedImage ? '←' : '×'}
            </button>

            {/* Grid View (Always rendered to preserve scroll and layoutId nodes) */}
            <div style={{ width: '100%', opacity: selectedImage ? 0 : 1, transition: 'opacity 0.2s', pointerEvents: selectedImage ? 'none' : 'auto' }}>
              <motion.h2 
                layout="position"
                style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: 'var(--primary)', textTransform: 'uppercase' }}
              >
                {lang === 'ar' ? 'الشهادات المهنية' : (lang === 'jp' ? '資格・修了証' : 'Professional Certificates')}
              </motion.h2>
              <motion.p 
                layout="position"
                style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}
              >
                {lang === 'ar' 
                  ? 'مجموعة من الشهادات المهنية التي حصلت عليها لتعزيز مهاراتي في مختلف المجالات التقنية.' 
                  : (lang === 'jp' 
                    ? 'さまざまな技術分野でのスキルを向上させるために取得した専門的な証明書のコレクション。' 
                    : 'A collection of professional certificates I have acquired to enhance my skills across various technical domains.')}
              </motion.p>

              {/* Credly Link Button */}
              <motion.div layout="position" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                <a 
                  href="https://www.credly.com/users/umar-saddiq-ahmed-ali-sayyed" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-pill"
                  style={{
                    background: 'var(--brand-glow, rgba(138,43,226,0.15))',
                    border: '1.5px solid var(--accent)',
                    color: 'var(--primary)',
                    padding: '12px 28px',
                    fontSize: '15px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(138,43,226,0.2)'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  {lang === 'ar' ? 'عرض شارات Credly الموثقة' : (lang === 'jp' ? '認定Credlyバッジを表示' : 'View Verified Credly Badges')}
                </a>
              </motion.div>

              {/* Categorized Layout */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', width: '100%' }}>
                {certificateCategories.map((category, catIdx) => (
                  <div key={catIdx}>
                    <motion.h3 
                      layout="position"
                      style={{ 
                        fontSize: '20px', 
                        fontWeight: 600, 
                        color: 'var(--text)', 
                        borderBottom: '1px solid var(--border)',
                        paddingBottom: '8px',
                        marginBottom: '20px'
                      }}
                    >
                      {category.name}
                    </motion.h3>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: '24px',
                      width: '100%'
                    }}>
                      {category.images.map((src, imgIdx) => (
                        <motion.div 
                          layoutId={`cert-container-${catIdx}-${imgIdx}`}
                          key={imgIdx}
                          style={{
                            position: 'relative',
                            cursor: 'pointer',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            backgroundColor: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            height: '240px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '16px'
                          }}
                          whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px rgba(138,43,226,0.2)', borderColor: 'rgba(138,43,226,0.5)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedImage({ src, id: `${catIdx}-${imgIdx}` })}
                        >
                          <motion.img 
                            layoutId={`cert-img-${catIdx}-${imgIdx}`}
                            src={src} 
                            alt={`${category.name} Certificate ${imgIdx + 1}`} 
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              display: 'block'
                            }}
                            loading="lazy"
                          />
                          <motion.div 
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              width: '100%',
                              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                              padding: '30px 10px 15px',
                              color: 'white',
                              fontSize: '12px',
                              textAlign: 'center',
                              fontWeight: 600
                            }}
                          >
                            {lang === 'ar' ? 'عرض الشهادة' : (lang === 'jp' ? '証明書を見る' : 'View Certificate')}
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Lightbox Expanded View */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                layoutId={`cert-container-${selectedImage.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ 
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(10, 15, 25, 0.95)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  cursor: 'zoom-out',
                  zIndex: 99999
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                 <motion.img 
                    layoutId={`cert-img-${selectedImage.id}`}
                    src={selectedImage.src} 
                    alt="Selected Certificate" 
                    style={{
                      width: '90%',
                      height: '90%',
                      objectFit: 'contain',
                      borderRadius: '12px'
                    }}
                  />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificatesGallery;
