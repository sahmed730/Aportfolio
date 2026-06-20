import React, { useState } from 'react';

const ResumeModal = ({ isOpen, onClose, lang }) => {
  const [selectedPath, setSelectedPath] = useState(null);

  if (!isOpen) return null;

  const resumes = {
    sap: {
      role: {
        en: 'SAP CPI Developer & Integration Specialist',
        jp: 'SAP CPI デベロッパー & 統合スペシャリスト',
        ar: 'مطور SAP CPI وأخصائي دمج الأنظمة'
      },
      summary: {
        en: 'Aspiring Integration Specialist passionate about linking cloud systems, designing REST APIs, and automating enterprise workflows. Experienced in Python, Java, SQL, and Power Automate, with a solid academic foundation in Data Science.',
        jp: 'クラウドシステムの連携、REST APIの設計、およびエンタープライズワークフローの自動化に情熱を注ぐ、意欲的な統合スペシャリスト。Python、Java、SQL、Power Automateの実務経験があり、データサイエンス分野で強固な学術的基礎を誇ります。',
        ar: 'متخصص دمج أنظمة طموح وشغوف بربط الأنظمة السحابية وتصميم واجهات برمجة التطبيقات (REST APIs) وأتمتة مسارات العمل في المؤسسات. من ذوي الخبرة في لغات بايثون، جافا، SQL، و Power Automate، مع أساس أكاديمي متين في علوم البيانات.'
      },
      skills: ['SAP Cloud Integration (CPI)', 'REST APIs & Web Services', 'Python & Java Programming', 'System Architecture & Middleware', 'Power Automate workflows', 'Docker Virtualization', 'SharePoint integration'],
      projects: [
        {
          title: 'Leave Letter System Automation',
          desc: 'Developed an automated HR approval workflow utilizing SharePoint lists and trigger-based Outlook mail channels, cutting average processing duration by 60%.'
        },
        {
          title: 'Live Inventory Dashboard Alerts',
          desc: 'Integrated Power Automate flow triggers with Excel cloud datasets to trigger instant notifications, improving updates and inventory tracking latency by 50%.'
        }
      ]
    },
    analyst: {
      role: {
        en: 'Data Analyst & BI Specialist',
        jp: 'データアナリスト & BIスペシャリスト',
        ar: 'محلل بيانات وأخصائي ذكاء الأعمال (BI)'
      },
      summary: {
        en: 'Analytical Business Intelligence professional skilled in creating data-driven dashboard reports, structuring clean relational databases, and automating operational workflows. Proficient in Power BI, SQL, advanced Excel, and SharePoint portals.',
        jp: 'データ駆動型のダッシュボードレポート作成、クリーンなリレーショナルデータベースの構築、および業務自動化ワークフローの設計に長けたBI分析の専門家。Power BI、SQL、高度なExcel、SharePointの操作に精通。',
        ar: 'محترف تحليل أعمال وذكاء اصطناعي بارع في إنشاء تقارير لوحات المعلومات التفاعلية القائمة على البيانات، وهيكلة قواعد البيانات، وأتمتة سير العمل التشغيلي. متمرس في استخدام Power BI و SQL و Excel المتقدم وبوابات SharePoint.'
      },
      skills: ['Microsoft Power BI', 'Advanced Excel (Pivot, Charts)', 'SQL Database Querying', 'Data Cleaning & Normalization', 'SharePoint Portal Structures', 'KPI Dashboards & ETL', 'Exploratory Data Analysis (EDA)'],
      projects: [
        {
          title: 'Live Inventory Dashboard',
          desc: 'Engineered an automated reporting dashboard displaying stock counts in Power BI, increasing tracking data accuracy by 30% and eliminating 50% of communication delays.'
        },
        {
          title: 'Sales Fusion Consolidation',
          desc: 'Normalized multi-source regional spreadsheet tables with Python and SQL, delivering centralized sales KPIs and forecasting trendlines.'
        }
      ]
    },
    science: {
      role: {
        en: 'Data Scientist & ML Engineer',
        jp: 'データサイエンティスト & 機械学習エンジニア',
        ar: 'عالم بيانات ومهندس تعلم آلة (ML)'
      },
      summary: {
        en: 'B.Tech Data Science candidate skilled in data engineering pipeline structures, predictive statistics, exploratory data analysis, and advanced prompting models. Experienced with Snowflake, Google Cloud Platform, and Python ML packages.',
        jp: 'データエンジニアリングパイプラインの構築、予測統計学、探索的データ分析、および高度なプロンプト設計モデルに精通したデータサイエンス専攻のB.Tech候補生。Snowflake、Google Cloud Platform、およびPython MLライブラリの取り扱い経験。',
        ar: 'طالب بكالوريوس هندسة في علوم البيانات ماهر في بناء خطوط أنابيب هندسة البيانات، والإحصاء التنبؤي، وتحليل البيانات الاستكشافي، ونماذج التوجيه المتقدمة. متمرس في استخدام Snowflake و Google Cloud Platform وحزم بايثون البرمجية للتعلم الآلي.'
      },
      skills: ['Python ML Libraries (Pandas, Numpy, Scikit-learn)', 'Snowflake Cloud Data Warehousing', 'Google Cloud Platform (GCP)', 'Exploratory Data Analysis (EDA)', 'Prompt Engineering & ChatGPT API', 'SQL Database Architectures', 'Docker Foundations'],
      projects: [
        {
          title: 'Sales Fusion Analytical Tracker',
          desc: 'Consolidated complex datasets from regional sales tracks into SQL, utilizing Python algorithms to clean raw records and output predictive growth statistics.'
        },
        {
          title: 'NourishLink Platform',
          desc: 'Conceptualized a dynamic logistic routing platform to matching local restaurants food surplus with immediate community center demands, minimizing food waste.'
        }
      ]
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const c = resumes[selectedPath];

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--modal-overlay)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        padding: '20px',
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        className="glass-card"
        style={{
          maxWidth: selectedPath ? '800px' : '550px',
          width: '100%',
          background: 'var(--modal-bg)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid var(--border)',
          borderRadius: '32px',
          padding: '36px',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.2)',
          direction: lang === 'ar' ? 'rtl' : 'ltr',
          textAlign: lang === 'ar' ? 'right' : 'left',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: lang === 'ar' ? 'auto' : '20px',
            left: lang === 'ar' ? '20px' : 'auto',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--text)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            zIndex: 10
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
          }}
        >
          ×
        </button>

        {!selectedPath ? (
          /* PATH SELECTOR STATE */
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '16px', color: 'var(--primary)', textTransform: 'uppercase' }}>
              {lang === 'ar' ? 'اختر السيرة الذاتية المتخصصة' : (lang === 'jp' ? '特化型履歴書を選択' : 'Select Specialized Resume')}
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px' }}>
              {lang === 'ar' 
                ? 'أحمد علي يمتلك خبرات واسعة في عدة مجالات تقنية. الرجاء اختيار السيرة الذاتية المخصصة للمجال الذي تبحث عنه للاطلاع عليها مباشرة:' 
                : (lang === 'jp' 
                  ? 'アーメド・アリは複数の専門技術分野で深い実績を持っています。ターゲットとなる分野に適した履歴書を選択して直接表示できます：' 
                  : 'Ahmed Ali is skilled across multiple cutting-edge technology domains. Select the customized resume that matches your target hiring track below:')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Path 1: SAP CPI */}
              <button 
                onClick={() => setSelectedPath('sap')}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '20px',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(138, 43, 226, 0.4)';
                  e.currentTarget.style.background = 'rgba(138, 43, 226, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ background: 'rgba(138, 43, 226, 0.1)', padding: '12px', borderRadius: '14px', color: 'var(--primary)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42 0-.83.04-1.24.11A6 6 0 0 0 3.5 14.5c0 2.21 1.79 4 4 4" /><path d="M12 12v6" /><path d="M9 15h6" /></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>SAP CPI & Integration Developer</h4>
                  <span style={{ fontSize: '13px', color: 'var(--text-light)' }}>APIs, Cloud Workflows, Middleware, SAP BTP, Power Automate</span>
                </div>
              </button>

              {/* Path 2: Data Analyst */}
              <button 
                onClick={() => setSelectedPath('analyst')}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '20px',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(138, 43, 226, 0.4)';
                  e.currentTarget.style.background = 'rgba(138, 43, 226, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ background: 'rgba(138, 43, 226, 0.1)', padding: '12px', borderRadius: '14px', color: 'var(--primary)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>Data Analyst & BI Specialist</h4>
                  <span style={{ fontSize: '13px', color: 'var(--text-light)' }}>Power BI, SQL Databases, Advanced Excel, Dashboards, SharePoint</span>
                </div>
              </button>

              {/* Path 3: Data Scientist */}
              <button 
                onClick={() => setSelectedPath('science')}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '20px',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(138, 43, 226, 0.4)';
                  e.currentTarget.style.background = 'rgba(138, 43, 226, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ background: 'rgba(138, 43, 226, 0.1)', padding: '12px', borderRadius: '14px', color: 'var(--primary)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" /></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>Data Scientist & ML Engineer</h4>
                  <span style={{ fontSize: '13px', color: 'var(--text-light)' }}>Python ML, SQL, Snowflake, Google Cloud (GCP), Prompt Engineering</span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE INTERACTIVE RESUME PREVIEW STATE */
          <div id="printable-resume-area" style={{ color: 'var(--text)' }}>
            
            {/* Header / Actions bar */}
            <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <button 
                onClick={() => setSelectedPath(null)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'var(--text)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                {lang === 'ar' ? 'تغيير التخصص' : (lang === 'jp' ? '専門パスを変更' : 'Change Pathway')}
              </button>

              <button 
                onClick={handlePrint}
                className="btn-pill"
                style={{
                  fontSize: '13px',
                  padding: '8px 20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                {lang === 'ar' ? 'طباعة / حفظ PDF' : (lang === 'jp' ? '印刷 / PDF保存' : 'Print / Save PDF')}
              </button>
            </div>

            {/* Resume Document Frame */}
            <div style={{
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)'
            }}>
              
              {/* Name & Contact Info */}
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '24px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px', letterSpacing: '1px' }}>AHMED ALI</h1>
                <h3 style={{ fontSize: '18px', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
                  {c.role[lang] || c.role.en}
                </h3>
                
                {/* Contact List */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--text-light)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    +91 9701062341
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    ahmedali51367@gmail.com
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    linkedin.com/in/sahmed730
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                    Kakinada, India
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '15px', color: 'var(--primary)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {lang === 'ar' ? 'الملخص المهني' : (lang === 'jp' ? '要約' : 'Professional Summary')}
                </h4>
                <p style={{ fontSize: '14.5px', color: 'var(--text-light)', lineHeight: '1.6' }}>
                  {c.summary[lang] || c.summary.en}
                </p>
              </div>

              {/* Key Competencies */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '15px', color: 'var(--primary)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {lang === 'ar' ? 'المهارات الفنية الأساسية' : (lang === 'jp' ? '主要技術スキル' : 'Core Technical Skills')}
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {c.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      style={{
                        fontSize: '12px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        color: 'var(--text)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education & Experience */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                
                {/* Left: Work Experience */}
                <div>
                  <h4 style={{ fontSize: '15px', color: 'var(--primary)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {lang === 'ar' ? 'الخبرات المهنية' : (lang === 'jp' ? '職務経歴' : 'Professional Experience')}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '13.5px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text)' }}>Data Specialist Intern</span>
                        <span style={{ color: 'var(--accent)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>05/2025 – 06/2025</span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>Technical Hub | Kakinada</div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '13.5px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text)' }}>Technical Trainee</span>
                        <span style={{ color: 'var(--accent)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>09/2023 – Present</span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>Technical Hub | Kakinada</div>
                    </div>
                  </div>
                </div>

                {/* Right: Education */}
                <div>
                  <h4 style={{ fontSize: '15px', color: 'var(--primary)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {lang === 'ar' ? 'التعليم' : (lang === 'jp' ? '学歴' : 'Education')}
                  </h4>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '13.5px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text)' }}>B.Tech - Data Science</span>
                      <span style={{ color: 'var(--accent)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>2023 – 2027</span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-light)', marginTop: '4px', lineHeight: '1.4' }}>
                      Aditya College of Engineering & Technology<br/>
                      Kakinada, Andhra Pradesh, India
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Projects */}
              <div>
                <h4 style={{ fontSize: '15px', color: 'var(--primary)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {lang === 'ar' ? 'مشاريع تطبيقية مختارة' : (lang === 'jp' ? '厳選した実践プロジェクト' : 'Selected Target Projects')}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {c.projects.map((proj, idx) => (
                    <div key={idx}>
                      <h5 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                        {proj.title}
                      </h5>
                      <p style={{ fontSize: '13px', color: 'var(--text-light)', paddingLeft: lang === 'ar' ? '0' : '12px', paddingRight: lang === 'ar' ? '12px' : '0', lineHeight: '1.5' }}>
                        {proj.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeModal;
