import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame, animate } from 'framer-motion';

const CARD_WIDTH = 340;
const GAP = 50;
const ITEM_SIZE = CARD_WIDTH + GAP;

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const VisionCard = ({ proj, logo, viewText, lang, onViewCase, index, globalX, totalItems }) => {
  const cardRef = useRef(null);
  const trackWidth = totalItems * ITEM_SIZE;
  const halfTrack = trackWidth / 2;
  const baseX = index * ITEM_SIZE;

  const cardX = useMotionValue(baseX);

  useAnimationFrame(() => {
    const rawX = baseX + globalX.get();
    const wrappedX = wrap(-halfTrack, halfTrack, rawX);
    cardX.set(wrappedX);
  });

  // Calculate 3D transforms based on wrapped position relative to center (0)
  const scale = useTransform(cardX, [-ITEM_SIZE * 1.5, 0, ITEM_SIZE * 1.5], [0.75, 1.05, 0.75], { clamp: true });
  const z = useTransform(cardX, [-ITEM_SIZE * 1.5, 0, ITEM_SIZE * 1.5], [-150, 50, -150], { clamp: true });
  const rotateYBase = useTransform(cardX, [-ITEM_SIZE * 1.5, 0, ITEM_SIZE * 1.5], [30, 0, -30], { clamp: true });
  const opacity = useTransform(cardX, [-ITEM_SIZE * 1.5, 0, ITEM_SIZE * 1.5], [0.15, 1, 0.15], { clamp: true });
  const zIndex = useTransform(cardX, [-ITEM_SIZE, 0, ITEM_SIZE], [1, 10, 1], { clamp: true });

  // Mouse Parallax for center card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  
  const tiltX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const tiltY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);

  // Combine carousel rotation and mouse tilt dynamically
  const rotateY = useTransform(() => `${rotateYBase.get() + tiltY.get()}deg`);
  const rotateX = useTransform(() => `${tiltX.get()}deg`);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPct = (e.clientX - rect.left) / width - 0.5;
    const mouseYPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(mouseXPct);
    mouseY.set(mouseYPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="vision-glass-card"
      style={{ x: cardX, scale, z, rotateY, rotateX, opacity, zIndex }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onViewCase}
    >
      <div className="vision-edge-glow" />
      <div className="vision-glare" />
      
      <div className="vision-card-content">
        <div style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--primary)' }}>
          {logo}
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px' }}>
          {proj.title}
        </h3>
        <p style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '24px', flexGrow: 1, lineHeight: '1.6' }}>
          {proj.desc}
        </p>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewCase();
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            background: 'var(--primary)',
            border: 'none',
            borderRadius: '24px',
            color: 'var(--bg-dark)',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 25px rgba(138,43,226,0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
          }}
        >
          {viewText}
        </button>
      </div>
    </motion.div>
  );
};

const GITHUB_REPOS = {
  sales: "https://github.com/sahmed730/Sales-fusion",
  nourish: "https://github.com/sahmed730/NourishLink",
  memory: "https://github.com/sahmed730/memory-jar"
};

const Projects = ({ lang }) => {
  const [activeCase, setActiveCase] = useState(null);
  
  // Carousel continuous auto-scroll logic
  const globalX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useAnimationFrame((t, delta) => {
    // Only scroll if we aren't hovering and a modal isn't open
    if (!isHovered && !activeCase) {
      // Speed multiplier increased slightly as requested
      globalX.set(globalX.get() - (delta * 0.08)); 
    }
  });

  const handleNext = () => {
    animate(globalX, globalX.get() - ITEM_SIZE, { type: "spring", stiffness: 200, damping: 25 });
  };

  const handlePrev = () => {
    animate(globalX, globalX.get() + ITEM_SIZE, { type: "spring", stiffness: 200, damping: 25 });
  };

  const t = {
    en: {
      title: 'Selected Works',
      subtitle: 'A collection of real-world business integration workflows, dynamic data visualization dashboards, and creative software applications.',
      view: 'View Case',
      close: 'Close',
      challenge: 'Challenge',
      solution: 'Solution',
      impact: 'Business Impact',
      tech: 'Technologies Used',
      github: 'GitHub Repo',
      projects: [
        {
          id: 'inventory',
          title: "Live Inventory Dashboard",
          desc: "Automated retail inventory reporting with Excel + Power Automate, reducing status update delays by 50% and improving accuracy by 30%.",
          challenge: "Manual inventory logs led to frequent stockouts, critical delays of up to 48 hours in stock updates, and a high error rate in local data entries.",
          solution: "Built dynamic notification triggers in Power Automate tied to cloud Excel sheets, which feed directly into an automated Power BI dashboard for real-time manager alerts.",
          impact: "Boosted inventory reporting accuracy by 30% and dropped system reporting latency by 50%, enabling immediate out-of-stock warning flows.",
          tech: ['Power BI', 'Advanced Excel', 'Power Automate', 'SharePoint']
        },
        {
          id: 'leave',
          title: "Leave Letter System",
          desc: "Automated corporate approval flows via Outlook and SharePoint lists, cutting manual HR processing time by 60%.",
          challenge: "Paper request workflows or unstructured emails caused lengthy delays (averaging 5 days) and complete lack of tracking history for trainees.",
          solution: "Engineered a centralized automated request portal using SharePoint lists as the backend and Power Automate workflows to route manager approvals and notify trainees via Outlook.",
          impact: "Cut request routing overhead, lowering average approval cycles by 60% (from 5 days to under 24 hours) with secure digital trails.",
          tech: ['Power Automate', 'SharePoint Lists', 'Outlook Cloud Flows', 'Process Audit']
        },
        {
          id: 'sales',
          title: "Sales Fusion Tracker",
          desc: "A centralized performance analysis platform consolidating diverse regional sales channels into predictive forecasting views.",
          challenge: "Sales metrics were highly fragmented across regional teams using different formats, making unified monthly sales forecasting impossible.",
          solution: "Created Python data cleaning scripts to ingest and normalize multi-source CSV files, structuring database records in SQL, and visualizing performance metrics in Power BI.",
          impact: "Enabled consolidated regional reports, enabling immediate executive trend analysis, high-margin product tracking, and sales performance forecasting.",
          tech: ['Python', 'SQL', 'Data Normalization', 'Power BI']
        },
        {
          id: 'nourish',
          title: "NourishLink Platform",
          desc: "A community food redistribution platform design aimed at minimizing commercial waste and optimizing donor logistics.",
          challenge: "Tons of edible surplus food from commercial restaurants and events went directly to landfills due to the absence of real-time logistics channels.",
          solution: "Conceptualized and designed NourishLink—a dynamic platform prototype connecting local restaurants directly to NGOs for on-demand collection matches.",
          impact: "Substantially optimizes community support resource allocations, maps donation routes, and minimizes environmental footprint through waste reduction.",
          tech: ['Python', 'SQLite', 'API Architecture', 'Responsive UI']
        },
        {
          id: 'memory',
          title: "Memory Jar App",
          desc: "An immersive interactive digital archive allowing users to save and view personal memories inside glowing glass jar elements.",
          challenge: "Standard journaling applications are dry, lacks visual style, and fails to engage users emotionally.",
          solution: "Designed a creative front-end application built with responsive glassmorphism modules, glowing custom particles, and localized data persistence via LocalStorage.",
          impact: "Created a highly praised interactive frontend design piece that blends custom CSS glass-art aesthetics with reliable data persistence.",
          tech: ['React.js', 'CSS Glassmorphism', 'Web Storage', 'UI/UX Design']
        },
        {
          id: 'wedding',
          title: "Wedding Invite App",
          desc: "A premium immersive digital invitation system combining dynamic visual particle flows, RSVP triggers, and background soundscapes.",
          challenge: "Paper invitations are static, expensive to produce and mail, and require tedious manual follow-ups to organize guest counts.",
          solution: "Crafted a responsive digital invitation experience boasting floating animations, audio players, and a direct Google Sheets database script for live RSVP tracking.",
          impact: "Eliminated physical mailing overhead and enabled secure guest tracking with automatic real-time spreadsheet updates.",
          tech: ['HTML5', 'Vanilla JavaScript', 'CSS Keyframes', 'RSVP Automation']
        }
      ]
    },
    jp: {
      title: '厳選された作品',
      subtitle: '実用的な統合ワークフロー、動的なデータ可視化ダッシュボード、およびクリエイティブなソフトウェアアプリケーションのコレクション。',
      view: '詳細を見る',
      close: '閉じる',
      challenge: '課題',
      solution: '解決策',
      impact: 'ビジネスへの影響',
      tech: '使用技術',
      github: 'GitHubコード',
      projects: [
        {
          id: 'inventory',
          title: "ライブ在庫ダッシュボード",
          desc: "Excel + Power Automateを使用した自動在庫レポートシステム。更新遅延を50%削減し、データ精度を30%向上させました。",
          challenge: "手動の在庫追跡では頻繁な在庫切れが発生し、在庫の反映に最大48時間の遅延が発生し、データ入力ミスも多発していました。",
          solution: "クラウドのExcelシートと連動する動的なPower Automate通知トリガーを構築し、動的なPower BIダッシュボードにデータを直接フィードすることで、リアルタイムでの管理アラートを実現しました。",
          impact: "在庫レポートの精度が30%向上し、システムレポートの遅延が50%短縮され、即時の在庫切れ警告フローが可能になりました。",
          tech: ['Power BI', 'Advanced Excel', 'Power Automate', 'SharePoint']
        },
        {
          id: 'leave',
          title: "休暇届自動化システム",
          desc: "OutlookおよびSharePointリストを介した自動承認フロー。手動の人事処理時間を60%削減しました。",
          challenge: "紙ベースの申請ワークフローや整理されていないメール送信により、平均5日の大幅な遅延が生じ、研修生用の履歴追跡も行えませんでした。",
          solution: "SharePointリストをバックエンドとして使用し、管理承認をルーティングして研修生にOutlook経由で自動通知するPower Automate承認ワークフローを作成しました。",
          impact: "申請の転送オーバーヘッドが削減され、平均承認サイクルが60%短縮（5日から24時間未満へ）され、デジタル監査証跡が確立されました。",
          tech: ['Power Automate', 'SharePoint Lists', 'Outlook Cloud Flows', 'Process Audit']
        },
        {
          id: 'sales',
          title: "Sales Fusion トラッカー",
          desc: "地域の複数販売チャネルを一元化し、将来の販売予測を可視化するデータ統合プラットフォーム。",
          challenge: "販売実績データが地域チームごとに異なる形式で分散していたため、統合的な月次販売予測の算出が不可能でした。",
          solution: "Pythonのデータクリーニングスクリプトを作成して複数ソースのCSVファイルを統合・正規化し、SQLデータベースに書き込んでPower BIでパフォーマンスメトリクスを可視化しました。",
          impact: "地域全体の販売報告が一元化され、経営陣によるリアルタイムのトレンド分析、高利益商品の追跡、および販売パフォーマンス予測が可能になりました。",
          tech: ['Python', 'SQL', 'Data Normalization', 'Power BI']
        },
        {
          id: 'nourish',
          title: "NourishLink プラットフォーム",
          desc: "商業廃棄食品を最小限に抑え、寄付配送物流を最適化するためのコミュニティ食品再分配プラットフォーム。",
          challenge: "飲食店やイベントでの余剰食品が、効率的なリアルタイム物流チャネルがないためにそのまま廃棄されていました。",
          solution: "地元のレストランとNGOを直接接続し、オンデマンドで食品寄付のマッチングを行う動的プラットフォームプロトタイプ「NourishLink」を設計しました。",
          impact: "コミュニティ支援リソースの配分が大幅に最適化され、寄付ルートが整備され、廃棄物削減を通じて環境負荷を軽減しました。",
          tech: ['Python', 'SQLite', 'API Architecture', 'Responsive UI']
        },
        {
          id: 'memory',
          title: "Memory Jar アプリ",
          desc: "光り輝くガラスジャーの中に個人の思い出を保存・閲覧できる、没入型デジタルアーカイブアプリケーション。",
          challenge: "従来のテキストベースの日記アプリはビジュアルが単調で、ユーザーが愛着を持って使い続ける仕組みが欠けていました。",
          solution: "レスポンシブなグラスモルフィズムモジュール、光り輝くパーティクルエフェクト、LocalStorageによるローカルデータ永続化を実装した、クリエイティブなフロントエンドアプリを開発しました。",
          impact: "カスタムCSSガラスデザイン技術と安定したローカル保存技術を組み合わせた、視覚的に優れたインタラクティブUIとして高く評価されました。",
          tech: ['React.js', 'CSS Glassmorphism', 'Web Storage', 'UI/UX Design']
        },
        {
          id: 'wedding',
          title: "Wedding Invite アプリ",
          desc: "浮遊パーティクル、BGM再生、RSVP管理用データベース統合を特徴とする、高級感あふれる招待状アプリ。",
          challenge: "紙の招待状は印刷・配送コストが高く、返信の取りまとめや出席者人数の集計に膨大な手作業が必要でした。",
          solution: "美しいCSS浮遊アニメーション、音楽プレイヤー、リアルタイムRSVP収集用のGoogleスプレッドシート自動データベース連携を組み込んだ、招待用シングルページアプリを構築しました。",
          impact: "物理的な招待状の郵送費をゼロにし、リアルタイムで正確な出席管理とスプレッドシートへの自動反映を実現しました。",
          tech: ['HTML5', 'Vanilla JavaScript', 'CSS Keyframes', 'RSVP Automation']
        }
      ]
    },
    ar: {
      title: 'أعمال مختارة',
      subtitle: 'مجموعة من مسارات عمل دمج الأعمال، لوحات معلومات تصور البيانات الديناميكية، وتطبيقات البرمجيات الإبداعية.',
      view: 'عرض التفاصيل',
      close: 'إغلاق',
      challenge: 'التحدي',
      solution: 'الحل المطور',
      impact: 'الأثر التجاري',
      tech: 'التقنيات المستخدمة',
      github: 'مستودع GitHub',
      projects: [
        {
          id: 'inventory',
          title: "لوحة معلومات المخزون المباشر",
          desc: "أتمتة تقارير المخزون باستخدام Excel + Power Automate، مما قلل تأخيرات التحديث بنسبة 50% وحسّن الدقة بنسبة 30%.",
          challenge: "تسببت سجلات المخزون اليدوية في نفاد المتكرر للمنتجات، وتأخيرات حرجة تصل إلى 48 ساعة في التحديث، وارتفاع معدلات الأخطاء الإملائية والبيانية.",
          solution: "بناء مشغلات تنبيه ديناميكية في Power Automate مرتبطة بملفات Excel السحابية، لتغذية لوحة معلومات Power BI مؤتمتة للمديرين في الوقت الفعلي.",
          impact: "تحسين دقة تقارير المخزون بنسبة 30% وتقليل وقت استجابة التقارير بنسبة 50%، مما أتاح إطلاق تدفقات تحذير فورية عند نفاد المنتجات.",
          tech: ['Power BI', 'Advanced Excel', 'Power Automate', 'SharePoint']
        },
        {
          id: 'leave',
          title: "نظام خطابات الإجازة",
          desc: "أتمتة تدفقات الموافقة للمؤسسة عبر البريد الإلكتروني Outlook وقوائم SharePoint، لتقليل وقت معالجة الموارد البشرية بنسبة 60%.",
          challenge: "سير العمل الورقي أو رسائل البريد الإلكتروني غير المهيكلة تسببت في تأخير طويل (بمتوسط 5 أيام) وعدم وجود أي سجل تتبع للمتدربين.",
          solution: "هندسة بوابة إلكترونية مركزية للطلبات باستخدام قوائم SharePoint كقاعدة بيانات خلفية، وتدفقات Power Automate لتوجيه موافقات المديرين وإخطار المتدربين عبر Outlook.",
          impact: "تقليص العبء الإداري لتوجيه الطلبات، وتقليل دورات الموافقة بنسبة 60% (من 5 أيام إلى أقل من 24 ساعة) مع سجل رقمي آمن.",
          tech: ['Power Automate', 'SharePoint Lists', 'Outlook Cloud Flows', 'Process Audit']
        },
        {
          id: 'sales',
          title: " sales Fusion",
          desc: "منصة مركزية لتحليل أداء المبيعات تجمع قنوات المبيعات الإقليمية المتباينة في لوحة توقعات موحدة.",
          challenge: "كانت مقاييس المبيعات مجزأة للغاية بين الفرق الإقليمية التي تستخدم تنسيقات مختلفة، مما جعل التنبؤ الموحد بالمبيعات الشهرية مستحيلاً.",
          solution: "تطوير نصوص بايثون لتنظيف وتطبيع ملفات CSV متعددة المصادر، وهيكلة سجلات البيانات في SQL وتصوير مقاييس الأداء عبر Power BI.",
          impact: "تمكين التقارير الإقليمية الموحدة، مما سمح للإدارة بالتحليل الفوري للاتجاهات وتتبع المنتجات عالية الهامش والتنبؤ بالمبيعات المستقبلية.",
          tech: ['Python', 'SQL', 'Data Normalization', 'Power BI']
        },
        {
          id: 'nourish',
          title: "منصة NourishLink",
          desc: "تصميم منصة مجتمعية لإعادة توزيع فائض الأغذية تهدف إلى تقليل الهدر التجاري وتحسين الخدمات اللوجستية للمتبرعين.",
          challenge: "ذهاب أطنان من الأغذية الصالحة للأكل من المطاعم والفعاليات التجارية مباشرة إلى مكبات النفايات لعدم وجود قنوات تواصل لوجستية فورية.",
          solution: "تصور وتصميم نموذج NourishLink — منصة ديناميكية تربط المطاعم المحلية مباشرة بالمنظمات غير الحكومية لتنسيق عمليات الجمع الفوري للأغذية.",
          impact: "تحسين توزيع موارد الدعم المجتمعي بشكل كبير، وتحديد مسارات التبرع المثلى، وتقليل الأثر البيئي من خلال تقليص النفايات الأغذية.",
          tech: ['Python', 'SQLite', 'API Architecture', 'Responsive UI']
        },
        {
          id: 'memory',
          title: "تطبيق Memory Jar",
          desc: "أرشيف رقمي تفاعلي يسمح للمستخدمين بحفظ وعرض ذكرياتهم الشخصية داخل وعاء زجاجي مضيء وجذاب.",
          challenge: "تطبيقات التدوين التقليدية تبدو صامتة وخالية من الجماليات البصرية، وتفشل في إشراك المستخدمين عاطفيًا وتفاعليًا.",
          solution: "تصميم واجهة مستخدم تفاعلية مبنية بالكامل باستخدام جماليات الزجاج frosted glassmorphic، وتدفقات جزيئات مضيئة، وحفظ دائم للبيانات محلياً عبر LocalStorage.",
          impact: "إنشاء تحفة تفاعلية للواجهة الأمامية حظيت بإشادة واسعة، تمزج بين تصميمات زجاج CSS والاحتفاظ بالبيانات محلياً.",
          tech: ['React.js', 'CSS Glassmorphism', 'Web Storage', 'UI/UX Design']
        },
        {
          id: 'wedding',
          title: "تطبيق دعوة الزفاف الرقمية",
          desc: "نظام دعوة رقمي فاخر يدمج بين تدفقات الجزيئات البصرية المذهلة، ومشغل الموسيقى، وجمع الردود RSPV آلياً.",
          challenge: "الدعوات الورقية ثابتة ومكلفة للإنتاج والشحن، وتتطلب متابعة يدوية مرهقة لجمع وتأكيد أعداد الضيوف والمدعوين.",
          solution: "تطوير صفحة دعوة ويب تفاعلية متجاوبة تحتوي على رسوم متحركة طائرة، ومشغل ملفات صوتية، وربط قاعدة بيانات تلقائي بملفات Google Sheets لتتبع الردود فوراً.",
          impact: "القضاء على تكاليف البريد المادي بالكامل وتمكين التتبع الآمن للضيوف مع تحديثات الجداول المباشرة في الوقت الفعلي.",
          tech: ['HTML5', 'Vanilla JavaScript', 'CSS Keyframes', 'RSVP Automation']
        }
      ]
    }
  };

  const c = t[lang] || t.en;
  
  // Custom Logos that fit each project beautifully
  const logos = [
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>,
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M12 14v4M9 17h6"/></svg>,
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>,
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
  ];

  return (
    <div style={{ padding: '40px 0', position: 'relative', zIndex: 5 }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ textAlign: 'center', marginBottom: '64px' }}
      >
        <h2 style={{ fontSize: '44px', marginBottom: '16px', textTransform: 'uppercase', color: 'var(--text)', fontWeight: 800 }}>
          {c.title}
        </h2>
        <p style={{ color: 'var(--text-light)', fontSize: '17px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
          {c.subtitle}
        </p>
      </motion.div>

      <div style={{ position: 'relative', maxWidth: '100vw', overflow: 'hidden' }}>
        <motion.div 
          className="carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          {/* We map the actual projects, duplicate rendering is handled via wrapping math natively */}
          {c.projects.map((proj, idx) => (
            <VisionCard 
              key={proj.id}
              index={idx}
              proj={proj}
              logo={logos[idx]}
              viewText={c.view}
              lang={lang}
              onViewCase={() => setActiveCase(proj)}
              globalX={globalX}
              totalItems={c.projects.length}
            />
          ))}
        </motion.div>

        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%',
            width: '56px', height: '56px',
            color: 'var(--text)',
            cursor: 'pointer',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 20,
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }}>
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button 
          onClick={handleNext}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%',
            width: '56px', height: '56px',
            color: 'var(--text)',
            cursor: 'pointer',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 20,
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }}>
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Dynamic Glassmorphic Case Study Modal Overlay */}
      {activeCase && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--modal-overlay)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px',
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={() => setActiveCase(null)}
        >
          <div 
            className="glass-card"
            style={{
              maxWidth: '650px',
              width: '100%',
              background: 'var(--modal-bg)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid var(--border)',
              borderRadius: '28px',
              padding: '36px',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.2)',
              direction: lang === 'ar' ? 'rtl' : 'ltr',
              textAlign: lang === 'ar' ? 'right' : 'left'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveCase(null)}
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
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              ×
            </button>

            {/* Case Study Title */}
            <h3 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--primary)',
              marginBottom: '20px',
              paddingRight: lang === 'ar' ? '0' : '40px',
              paddingLeft: lang === 'ar' ? '40px' : '0',
              lineHeight: '1.3'
            }}>
              {activeCase.title}
            </h3>

            {/* Tech Stack Tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {activeCase.tech.map((tag, i) => (
                <span 
                  key={i} 
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(138, 43, 226, 0.1)',
                    border: '1px solid rgba(138, 43, 226, 0.3)',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    color: 'var(--text)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Main Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text)' }}>
              
              {/* Challenge */}
              <div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.7)',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                  letterSpacing: '0.5px'
                }}>
                  // {c.challenge}
                </h4>
                <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.6' }}>
                  {activeCase.challenge}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.7)',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                  letterSpacing: '0.5px'
                }}>
                  // {c.solution}
                </h4>
                <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.6' }}>
                  {activeCase.solution}
                </p>
              </div>

              {/* Impact */}
              <div style={{
                background: 'rgba(138, 43, 226, 0.05)',
                border: '1px solid rgba(138, 43, 226, 0.2)',
                borderRadius: '16px',
                padding: '20px',
                marginTop: '10px'
              }}>
                <h4 style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                  {c.impact}
                </h4>
                <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.6', fontWeight: 500 }}>
                  {activeCase.impact}
                </p>
              </div>

            </div>

            {/* Bottom Actions */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '12px',
              marginTop: '30px' 
            }}>
              {GITHUB_REPOS[activeCase.id] && (
                <a 
                  href={GITHUB_REPOS[activeCase.id]}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill"
                  style={{
                    background: 'var(--brand-glow, rgba(138,43,226,0.15))',
                    border: '1px solid var(--accent)',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    padding: '10px 24px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--accent)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--brand-glow, rgba(138,43,226,0.15))';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ 
                    marginRight: lang === 'ar' ? '0' : '8px', 
                    marginLeft: lang === 'ar' ? '8px' : '0' 
                  }}>
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  {c.github}
                </a>
              )}
              <button 
                onClick={() => setActiveCase(null)}
                className="btn-pill"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--text)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  padding: '10px 24px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                {c.close}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
