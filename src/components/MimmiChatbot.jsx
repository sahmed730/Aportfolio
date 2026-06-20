import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './MimmiChatbot.css';

const MimmiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'mimmi', text: "Meow! I'm Mimmi. 🐾 I can tell you all about my human, Ahmed's, resume, projects, and skills. What would you like to know?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(false);
  const catRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isTyping]);

  // Track cursor for eyes
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!catRef.current) return;

      const catRect = catRef.current.getBoundingClientRect();
      const catCenterX = catRect.left + catRect.width / 2;
      const catCenterY = catRect.top + catRect.height / 2;

      // Calculate distance and angle from cat center to mouse
      const deltaX = e.clientX - catCenterX;
      const deltaY = e.clientY - catCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Limit pupil movement radius
      const maxPupilOffset = 6;
      const radius = Math.min(distance / 15, maxPupilOffset);
      const angle = Math.atan2(deltaY, deltaX);

      setPupilPosition({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Initialize Gemini API
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
      
      // Provide system context
      const systemContext = `You are Mimmi, a helpful and cute AI cat mascot residing in Ahmed's portfolio website.
You speak on behalf of Ahmed, providing details about his resume, projects, and skills.
Keep your answers short, sweet, and feline-like. Occasionally use cat sounds like 'Meow' or 'Purr'.
Do not invent information. Use only the following details about Ahmed:

ABOUT:
- Name: Ahmed
- Bio: Business Intelligence professional with hands-on experience in BI dashboard development, ERP reporting, workflow automation, and data analysis. Specializes in Microsoft D365 ecosystem (Power Apps, Power Pages, Power Automate).
- Education: Pursuing B.Tech in Data Science at Aditya College of Engineering and Technology (Expected 2027).

EXPERIENCE:
- SAP CPI Integration Developer (Jan 2026 - Present): Architected end-to-end iFlow solutions on SAP BTP Integration Suite, Groovy scripting, REST/SFTP adapters.
- Data Specialist Intern @ Technical Hub (May 2025 - Jun 2025): Expertise in Excel, SharePoint, Power Automate. Automated leave approvals and inventory tracking.
- Technical Trainee @ Technical Hub (Sep 2023 - Present): Training in Python, Java, SQL, Snowflake, cloud computing. Developing ML pipelines and integration prototypes.

SKILLS:
- Top: Data Engineering, Data Analysis, Microsoft Power BI, SAP CPI, Prompt Engineering
- Programming: Python, Java, SQL, Data Cleaning, EDA, Groovy Scripting
- Visualization: Power BI, Excel Dashboards, SharePoint, Power Apps
- Cloud: Snowflake, GCP, AWS, SAP BTP
- AI & Auto: Power Automate, ChatGPT Prompting, GitHub Copilot, Prompt Engineering
- Certifications: Google AI Essentials, Google Prompting Essentials, Learning REST APIs, Docker Foundations, SAP BTP Foundations

PROJECTS:
- SAP CPI Integrations: Automated Invoice Processing and Student Info Systems using REST, SFTP, and SAP HANA.
- Live Inventory Dashboard (Power BI, Excel, Power Automate) - reduced delays by 50%.
- Leave Letter System (Power Automate, SharePoint, Outlook) - cut HR processing by 60%.
- Sales Fusion Tracker (Python, SQL, Power BI) - centralized sales performance analysis.
- NourishLink Platform (Python, SQLite) - community food redistribution platform.
- Memory Jar App (React, CSS, Web Storage) - interactive digital archive.
- Wedding Invite App (HTML, JS, CSS, Google Sheets) - digital invitation system with RSVP automation.

CONTACT DETAILS:
- Email: Ahmedali51367@gmail.com
- Phone: +91 9701062341
- Location: Kakinada, Andhra Pradesh, India
- LinkedIn: https://linkedin.com/in/SAhmed730
- GitHub: https://github.com/sahmed730`;
      
      const prompt = `${systemContext}\n\nUser: ${inputText}\nMimmi:`;
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      setMessages(prev => [...prev, { sender: 'mimmi', text: responseText }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { 
        sender: 'mimmi', 
        text: `Meow... I'm having trouble connecting to my brain right now! Error: ${error.message || "Unknown error"}. Please check the API key or try again later.` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="mimmi-chatbot-container">
      {/* Chat Window */}
      <div className={`mimmi-chat-window glass-card ${isOpen ? 'open' : ''}`}>
        <div className="mimmi-chat-header">
          <div className="mimmi-avatar-small">
            <svg viewBox="0 0 100 100" width="30" height="30">
              <path d="M10 90 Q 50 100 90 90 L 100 10 L 70 30 Q 50 20 30 30 L 0 10 Z" fill="var(--text)" />
              <path d="M30 60 Q 50 70 70 60" fill="transparent" stroke="var(--bg)" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>
          <h3>Mimmi AI</h3>
          <button className="mimmi-close-btn" onClick={() => setIsOpen(false)}>×</button>
        </div>
        
        <div className="mimmi-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mimmi-message ${msg.sender}`}>
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="mimmi-message mimmi">
              <div className="message-bubble" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                Mimmi is typing... 🐾
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="mimmi-input-area" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Ask Mimmi a question..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
          />
          <button type="submit" className="mimmi-send-btn" disabled={isTyping}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>

      {/* Mimmi Mascot Trigger */}
      <div 
        className="mimmi-mascot" 
        ref={catRef}
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with Mimmi!"
      >
        {!isOpen && (
          <div className="mimmi-tooltip glass-card">
            Can I help you? 🐾
          </div>
        )}
        <svg viewBox="0 0 100 100" width="80" height="80" className="mimmi-svg">
          {/* Ears & Head - Glassmorphic look */}
          <path d="M10 80 Q 50 100 90 80 L 95 20 L 65 35 Q 50 25 35 35 L 5 20 Z" fill="var(--surface)" stroke="var(--border)" strokeWidth="3" />
          {/* Inner Ears */}
          <path d="M15 35 L 30 45 L 20 60 Z" fill="var(--brand-glow, var(--accent))" opacity="0.3"/>
          <path d="M85 35 L 70 45 L 80 60 Z" fill="var(--brand-glow, var(--accent))" opacity="0.3"/>
          {/* Eyes Base */}
          <ellipse cx="35" cy="55" rx="12" ry="14" fill="var(--text)" />
          <ellipse cx="65" cy="55" rx="12" ry="14" fill="var(--text)" />
          {/* Pupils */}
          <circle cx={35 + pupilPosition.x} cy={55 + pupilPosition.y} r="5" fill="var(--bg)" />
          <circle cx={65 + pupilPosition.x} cy={55 + pupilPosition.y} r="5" fill="var(--bg)" />
          {/* Nose */}
          <polygon points="47,65 53,65 50,70" fill="var(--brand-glow, var(--accent))"/>
          {/* Mouth */}
          <path d="M40 72 Q 45 76 50 72 Q 55 76 60 72" fill="transparent" stroke="var(--text)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <div className="mimmi-glow"></div>
      </div>
    </div>
  );
};

export default MimmiChatbot;
