import React from 'react';

const Experience = ({ lang }) => {
  const t = {
    en: {
      title: 'Experience',
      experiences: [
        {
          role: 'Data Specialist Intern',
          date: 'May 2025 – Jun 2025',
          company: 'Technical Hub',
          bullets: [
            'Trained as a Data Specialist, gaining deep expertise in Excel (advanced charts, pivot tables), SharePoint (lists & sites), and Power Automate (cloud flows).',
            'Integrated Excel, SharePoint, and automation tools to streamline data analysis and automate operational workflows.',
            'Automated leave approvals and inventory tracking reporting loops, reducing administrative processing times.'
          ]
        },
        {
          role: 'Technical Trainee',
          date: 'Sep 2023 – Present',
          company: 'Technical Hub',
          bullets: [
            'Undergoing continuous professional training in coding paradigms (Python, Java), databases (SQL, Snowflake data warehousing), and cloud computing.',
            'Developing hands-on data cleaning, exploratory data analysis (EDA), and machine learning pipelines.',
            'Building and hosting real-world integration prototype applications blending system design and data-driven automation.'
          ]
        }
      ]
    },
    jp: {
      title: '経歴',
      experiences: [
        {
          role: 'データスペシャリスト インターン',
          date: '2025年5月 – 2025年6月',
          company: 'Technical Hub',
          bullets: [
            'データスペシャリストとしてトレーニングを受け、Excel（高度なグラフ、ピボットテーブル）、SharePoint（リストとサイト）、およびPower Automate（クラウドフロー）に関する深い専門知識を習得しました。',
            'Excel、SharePoint、および自動化ツールを統合してデータ分析を合理化し、業務ワークフローを自動化しました。',
            '休暇承認と在庫追跡レポートの自動化ループを構築し、事務処理の所要時間を大幅に削減しました。'
          ]
        },
        {
          role: '技術研修生',
          date: '2023年9月 – 現在',
          company: 'Technical Hub',
          bullets: [
            'コーディングパラダイム（Python、Java）、データベース（SQL、Snowflakeデータウェアハウス）、およびクラウドコンピューティングに関する継続的な専門技術トレーニングを受けています。',
            '実践的なデータクレンジング、探索的データ分析（EDA）、および機械学習パイプラインの開発を行っています。',
            'システム設計とデータ駆動型自動化を融合させた、実用的な統合プロトタイプアプリケーションの構築とホスティングを行っています。'
          ]
        }
      ]
    },
    ar: {
      title: 'الخبرة العملية',
      experiences: [
        {
          role: 'متدرب أخصائي بيانات',
          date: 'مايو 2025 – يونيو 2025',
          company: 'Technical Hub',
          bullets: [
            'التدريب كأخصائي بيانات، واكتساب خبرة عميقة في Excel (المخططات المتقدمة، الجداول المحورية)، و SharePoint (القوائم والمواقع)، و Power Automate (تدفقات السحاب).',
            'دمج Excel و SharePoint وأدوات الأتمتة لتبسيط تحليل البيانات وأتمتة مسارات العمل التشغيلية.',
            'أتمتة الموافقات على الإجازات وحلقات تقارير تتبع المخزون، مما قلل من أوقات المعالجة الإدارية.'
          ]
        },
        {
          role: 'متدرب تقني',
          date: 'سبتمبر 2023 – الحاضر',
          company: 'Technical Hub',
          bullets: [
            'الخضوع لتدريب مهني مستمر في نماذج البرمجة (Python و Java)، وقواعد البيانات (SQL ومستودع بيانات Snowflake)، والحوسبة السحابية.',
            'تطوير مسارات تنظيف البيانات الاستكشافية (EDA) وتطبيقات التعلم الآلي بشكل عملي.',
            'بناء واستضافة تطبيقات نموذجية للدمج في العالم الحقيقي تجمع بين تصميم النظام والأتمتة القائمة على البيانات.'
          ]
        }
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
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {c.experiences.map((exp, expIdx) => (
          <div 
            key={expIdx} 
            style={{ 
              paddingLeft: lang === 'ar' ? '0' : '16px', 
              paddingRight: lang === 'ar' ? '16px' : '0',
              borderLeft: lang === 'ar' ? 'none' : '4px solid var(--primary)',
              borderRight: lang === 'ar' ? '4px solid var(--primary)' : 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text)' }}>
                {exp.role}
              </h3>
              <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600 }}>
                {exp.date}
              </span>
            </div>
            <h4 style={{ fontSize: '16px', color: 'var(--text-light)', marginBottom: '16px', fontWeight: 500 }}>
              {exp.company}
            </h4>
            
            <ul style={{ 
              color: 'var(--text-light)', 
              marginLeft: lang === 'ar' ? '0' : '16px', 
              marginRight: lang === 'ar' ? '16px' : '0',
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              fontSize: '15px'
            }}>
              {exp.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
