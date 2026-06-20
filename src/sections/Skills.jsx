import React from 'react';

const SkillGroup = ({ title, skills, lang }) => (
  <div style={{ marginBottom: '24px' }}>
    <h3 style={{ color: 'var(--text)', marginBottom: '12px', fontSize: '18px', fontWeight: 600 }}>{title}</h3>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {skills.map(skill => (
        <span key={skill} style={{
          fontFamily: lang === 'en' ? 'var(--font-mono)' : 'inherit',
          fontSize: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '6px 12px',
          color: 'var(--text)',
          borderRadius: '16px',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.borderColor = 'rgba(138, 43, 226, 0.3)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }}
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const Skills = ({ lang }) => {
  const t = {
    en: {
      title: 'Skills & Certifications',
      cats: {
        top: 'Top Expertise',
        prog: 'Programming & Data',
        vis: 'Visualization & BI',
        cloud: 'Cloud Platforms',
        auto: 'AI & Automation',
        certs: 'Certifications'
      },
      skills: {
        top: ['Data Engineering', 'Data Analysis', 'Microsoft Power BI'],
        prog: ['Python', 'Java', 'SQL', 'Data Cleaning', 'Exploratory Data Analysis (EDA)'],
        vis: ['Microsoft Power BI', 'Excel Dashboards', 'SharePoint (Lists & Sites)', 'Outlook Integration', 'Power Apps'],
        cloud: ['Snowflake', 'Google Cloud Platform (GCP)', 'Amazon Web Services (AWS)'],
        auto: ['Power Automate (Cloud Flows)', 'ChatGPT Prompting', 'GitHub Copilot', 'AI System Integration']
      },
      certsList: [
        'Google AI Essentials (V1)',
        'Google Prompting Essentials Specialization',
        'Learning REST APIs (LinkedIn Learning)',
        'Docker Foundations Professional Certificate'
      ]
    },
    jp: {
      title: 'スキルと資格',
      cats: {
        top: '主な専門分野',
        prog: 'プログラミングとデータ',
        vis: '可視化とBI',
        cloud: 'クラウド・プラットフォーム',
        auto: 'AIと自動化',
        certs: '資格・修了証'
      },
      skills: {
        top: ['データエンジニアリング', 'データ分析', 'Microsoft Power BI'],
        prog: ['Python', 'Java', 'SQL', 'データクリーニング', '探索的データ分析 (EDA)'],
        vis: ['Microsoft Power BI', 'Excelダッシュボード', 'SharePoint (リストとサイト)', 'Outlook統合', 'Power Apps'],
        cloud: ['Snowflake', 'Google Cloud (GCP)', 'Amazon Web Services (AWS)'],
        auto: ['Power Automate (クラウドフロー)', 'ChatGPT プロンプティング', 'GitHub Copilot', 'AIシステム統合']
      },
      certsList: [
        'Google AI Essentials (V1)',
        'Google プロンプティング・エッセンシャル・スペシャライゼーション',
        'REST APIの学習 (LinkedInラーニング)',
        'Docker Foundations プロフェッショナル証明書'
      ]
    },
    ar: {
      title: 'المهارات والشهادات',
      cats: {
        top: 'الخبرات الأساسية',
        prog: 'البرمجة والبيانات',
        vis: 'تصور البيانات وذكاء الأعمال',
        cloud: 'منصات السحاب',
        auto: 'الذكاء الاصطناعي والأتمتة',
        certs: 'الشهادات المهنية'
      },
      skills: {
        top: ['هندسة البيانات', 'تحليل البيانات', 'مايكروسوفت باور بي آي'],
        prog: ['بايثون', 'جافا', 'SQL', 'تنظيف البيانات', 'تحليل البيانات الاستكشافي (EDA)'],
        vis: ['مايكروسوفت باور بي آي', 'لوحات معلومات Excel', 'SharePoint (القوائم والمواقع)', 'تكامل Outlook', 'Power Apps'],
        cloud: ['Snowflake', 'منصة Google Cloud (GCP)', 'خدمات Amazon السحابية (AWS)'],
        auto: ['Power Automate (تدفقات السحاب)', 'صياغة أوامر ChatGPT', 'GitHub Copilot', 'دمج أنظمة الذكاء الاصطناعي']
      },
      certsList: [
        'أساسيات الذكاء الاصطناعي من جوجل (Google AI Essentials V1)',
        'تخصص أساسيات توجيه الأوامر من جوجل (Google Prompting Essentials)',
        'تعلم واجهات برمجة التطبيقات (Learning REST APIs)',
        'شهادة أساسيات دوكر المهنية (Docker Foundations)'
      ]
    }
  };

  const c = t[lang] || t.en;

  return (
    <div className="glass-card">
      <h2 style={{ 
        fontSize: '24px', 
        marginBottom: '24px',
        textTransform: 'uppercase'
      }}>
        {c.title}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <div>
          <SkillGroup title={c.cats.top} skills={c.skills.top} lang={lang} />
          <SkillGroup title={c.cats.prog} skills={c.skills.prog} lang={lang} />
          <SkillGroup title={c.cats.vis} skills={c.skills.vis} lang={lang} />
        </div>
        <div>
          <SkillGroup title={c.cats.cloud} skills={c.skills.cloud} lang={lang} />
          <SkillGroup title={c.cats.auto} skills={c.skills.auto} lang={lang} />
          
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ color: 'var(--text)', marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>{c.cats.certs}</h3>
            <ul style={{ 
              color: 'var(--text-light)', 
              marginLeft: lang === 'ar' ? '0' : '24px', 
              marginRight: lang === 'ar' ? '24px' : '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {c.certsList.map((cert, idx) => (
                <li key={idx} style={{ fontSize: '14px', lineHeight: '1.6' }}>{cert}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
