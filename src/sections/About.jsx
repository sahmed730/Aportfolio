import React from 'react';

const About = ({ lang }) => {
  const t = {
    en: {
      title: 'About Me',
      p1: 'I am a Business Intelligence professional with hands-on experience in BI dashboard development, ERP reporting, workflow automation, and data analysis. I specialize in the Microsoft D365 ecosystem — including Power Apps, Power Pages, and Power Automate.',
      p2: 'Currently pursuing my B.Tech in Data Science at Aditya College of Engineering and Technology (Expected 2027), I am eager to contribute to business development through data-driven strategy and process optimization.'
    },
    jp: {
      title: '私について',
      p1: '私はBIダッシュボード開発、ERPレポート作成、ワークフロー自動化、データ分析の実務経験を持つビジネスインテリジェンスの専門家です。Power Apps、Power Pages、Power AutomateなどのMicrosoft D365エコシステムを専門としています。',
      p2: '現在、Aditya College of Engineering and TechnologyでデータサイエンスのB.Techを専攻しており（2027年卒業予定）、データ駆動型の戦略とプロセス最適化を通じてビジネスの発展に貢献したいと考えています。'
    },
    ar: {
      title: 'نبذة عني',
      p1: 'أنا محترف في ذكاء الأعمال ولدي خبرة عملية في تطوير لوحات معلومات BI، تقارير ERP، أتمتة سير العمل، وتحليل البيانات. أتخصص في نظام Microsoft D365 البيئي — بما في ذلك Power Apps و Power Pages و Power Automate.',
      p2: 'أتابع حاليًا دراسة البكالوريوس في علوم البيانات في كلية أديتيا للهندسة والتكنولوجيا (متوقع عام 2027)، وأنا متحمس للمساهمة في تطوير الأعمال من خلال الاستراتيجيات القائمة على البيانات وتحسين العمليات.'
    }
  };

  const c = t[lang] || t.en;

  return (
    <div className="glass-card">
      <h2 style={{ 
        fontSize: '24px', 
        marginBottom: '16px',
        textTransform: 'uppercase'
      }}>
        {c.title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ color: 'var(--text-light)', fontSize: '16px' }}>
          {c.p1}
        </p>
        <p style={{ color: 'var(--text-light)', fontSize: '16px' }}>
          {c.p2}
        </p>
      </div>
    </div>
  );
};

export default About;
