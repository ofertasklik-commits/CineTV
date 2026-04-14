'use client';
import { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Drag and drop carousel state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Plans toggle state
  const [screensCount, setScreensCount] = useState<1 | 2>(1);

  const CONFIG = {
    nome: "Cine TV",
    whatsapp: "559188800976",
    mensagem: "Quero um teste gratuito",
    preco_mensal: "R$ 30,00",
    preco_trimestral: "R$ 75,00",
  };

  // Modal Automated Test State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<'form' | 'loading' | 'success'>('form');
  const [formData, setFormData] = useState({ nome: '', whatsapp: '' });
  const [testResult, setTestResult] = useState({ user: '', pass: '' });

  const handleGenerateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalStep('loading');

    try {
      const response = await fetch('https://alpha-server-oficial.sigma.st/api/chatbot/2BDvomGWrk/8241Kg1mxd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.nome, 
          whatsapp: formData.whatsapp 
        }),
      });

      const data = await response.json();
      const message = data.data?.[0]?.message || '';
      
      console.log('Mensagem da API:', message);

      // Regex extremamente robusta: 
      // Busca por variações de "Usuário" ou "Senha" seguidos de qualquer coisa até encontrar dígitos
      const userMatch = message.match(/(?:Usu[a-z-\s]*rio|Usuário|Usuario|Usurio|USUARIO)[\s\*:]+([\d\w\-]+)/i);
      const passMatch = message.match(/(?:Senha)[\s\*:]+([\d\w\-]+)/i);

      if (userMatch && passMatch) {
        setTestResult({ user: userMatch[1], pass: passMatch[1] });
        setModalStep('success');
      } else {
        // Fallback: se não encontrar as palavras-chave, tenta pegar os dois primeiros grupos de números
        const numbers = message.match(/\d{5,}/g); // Pega números com 5 ou mais dígitos
        if (numbers && numbers.length >= 2) {
          setTestResult({ user: numbers[0], pass: numbers[1] });
          setModalStep('success');
        } else {
          console.error('Resposta da API sem padrão esperado:', message);
          throw new Error('Formato de resposta inválido');
        }
      }
    } catch (error) {
      console.error('Erro ao gerar teste:', error);
      alert('Ocorreu um erro ao gerar seu teste. Por favor, tente novamente ou fale conosco pelo WhatsApp.');
      setModalStep('form');
    }
  };

  const successWppUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(`Olá, acabei de gerar meu teste, esses são meus dados de acesso:\nUsuário: ${testResult.user}\nSenha: ${testResult.pass}\nO que faço agora?`)}`;

  const wppUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.mensagem)}`;

  const MOVIES = [
    { title: "Harry Potter (Série 2026)", url: "https://image.tmdb.org/t/p/w500/SJCnXVBJZh7X7ePLt6XMp6TZAj.jpg" },
    { title: "Avatar Fogo e Cinzas", url: "https://image.tmdb.org/t/p/w500/9k2zKeUfcKkAz1dGt5MP6dZMm4G.jpg" },
    { title: "Avengers Doomsday", url: "https://image.tmdb.org/t/p/w500/i29O7K4n3z5qB2SAJmSc0kR5dPj.jpg" },
    { title: "The Batman Part II", url: "https://image.tmdb.org/t/p/w500/hUe1G6Ziwl8b6DaaGHjhG6LQQH8.jpg" },
    { title: "Stranger Things 5", url: "https://image.tmdb.org/t/p/w500/4C1EXyRhkG8WrNBVaA9rKo9pqxq.jpg" },
    { title: "The Last of Us", url: "https://image.tmdb.org/t/p/w500/el1KQzwdIm17I3A6cYPfsVIWhfX.jpg" },
    { title: "Deadpool Wolverine", url: "https://image.tmdb.org/t/p/w500/53YWSo75mSaw1vd2YEeX5kwkRos.jpg" },
    { title: "Coringa 2", url: "https://image.tmdb.org/t/p/w500/9RmVr8dPWicFyPZ5JCQK3NcBNB5.jpg" },
    { title: "Gladiador 2", url: "https://image.tmdb.org/t/p/w500/342bly9MqveL65TnEFzx8TTUxcL.jpg" },
    { title: "Duna 2", url: "https://image.tmdb.org/t/p/w500/8LJJjLjAzAwXS40S5mx79PJ2jSs.jpg" },
    { title: "Oppenheimer", url: "https://image.tmdb.org/t/p/w500/1OsQJEoSXBjduuCvDOlRhoEUaHu.jpg" },
    { title: "Moana 2", url: "https://image.tmdb.org/t/p/w500/dnqgkKoIGf6hErzRm6VtaK1OJrD.jpg" },
    { title: "Sonic 3", url: "https://image.tmdb.org/t/p/w500/tfM1T6tAivjvy0sLwt6Y9WvlmzB.jpg" },
    { title: "Homem Aranha Através do Aranhaverso", url: "https://image.tmdb.org/t/p/w500/4CwKj1fw33BXYzxvrpM3GlAhK4L.jpg" },
    { title: "Vingadores Ultimato", url: "https://image.tmdb.org/t/p/w500/9fRX8UKlIW7Lb9GqNsJVakWWFCi.jpg" },
    { title: "Interestelar", url: "https://image.tmdb.org/t/p/w500/6ricSDD83BClJsFdGB6x7cM0MFQ.jpg" },
    { title: "Titanic", url: "https://image.tmdb.org/t/p/w500/As0zX43h3w6kD2NS4uVHu9HKdEh.jpg" },
    { title: "O Rei Leao", url: "https://image.tmdb.org/t/p/w500/8aIvm8OaJISOpVTt7rMIh7X35G5.jpg" },
    { title: "Breaking Bad", url: "https://image.tmdb.org/t/p/w500/hGwm9Cj3CdbJIqQWNExQqiYmCd4.jpg" },
    { title: "A Casa do Dragao", url: "https://image.tmdb.org/t/p/w500/xEC4nyJvcWcOu7QaobLcqz6iRUL.jpg" },
    { title: "Round 6", url: "https://image.tmdb.org/t/p/w500/6gcHdboppvplmBWxvROc96NJnmm.jpg" },
    { title: "Wandinha", url: "https://image.tmdb.org/t/p/w500/7rxiQrZjrer0RB9qNA8rHYFo53R.jpg" },
    { title: "The Boys", url: "https://image.tmdb.org/t/p/w500/in1R2dDc421JxsoRWaIIAqVI2KE.jpg" },
    { title: "Fallout", url: "https://image.tmdb.org/t/p/w500/tQRX6GbYooU7kUaarKf5YXDTONy.jpg" },
    { title: "One Piece A Serie", url: "https://image.tmdb.org/t/p/w500/aesLt9fsKSA6KCgGxA60VVxjtLk.jpg" },
    { title: "Game of Thrones", url: "https://image.tmdb.org/t/p/w500/eDn8XWA0a4U3zOhd1gh7HExdt4Y.jpg" },
    { title: "Vikings", url: "https://image.tmdb.org/t/p/w500/bQLrHIRNEkE3PdIWQrZHynQZazu.jpg" },
    { title: "The Walking Dead", url: "https://image.tmdb.org/t/p/w500/9lb02gTh4LLB17yAEXFd4C3R4JP.jpg" },
    { title: "O Urso", url: "https://image.tmdb.org/t/p/w500/tAJYUFaWot3jn5vtDUoxNNIw9aF.jpg" },
    { title: "Succession", url: "https://image.tmdb.org/t/p/w500/z0XiwdrCQ9yVIr4O0pxzaAYRxdW.jpg" }
  ];

  useEffect(() => {
    if (!scrollRef.current) return;
    
    let animationId: number;
    // Auto-scroll logic via JS ao invez de keyframes CSS (permite drag)
    const playScroll = () => {
      if (!isDragging && scrollRef.current) {
        scrollRef.current.scrollLeft += 0.5; // Velocidade lenta

        // Verifica se chegamos na metade do tamanho (looping frame)
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(playScroll);
    };

    animationId = requestAnimationFrame(playScroll);

    return () => cancelAnimationFrame(animationId);
  }, [isDragging]);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };
  
  const handleTouchStart = (e: TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do arraste
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="main-wrapper" suppressHydrationWarning>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol id="ico-tv" viewBox="0 0 24 24"><path d="M21 3H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 14H3V5h18v12z"/></symbol>
        <symbol id="ico-smartphone" viewBox="0 0 24 24"><path d="M17 1H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm0 18H7V5h10v14zm-4 2h-2v1h2v-1z"/><circle cx="12" cy="20" r="1"/></symbol>
        <symbol id="ico-apple" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></symbol>
        <symbol id="ico-laptop" viewBox="0 0 24 24"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></symbol>
        <symbol id="ico-box" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zM6 10h12v2H6z"/></symbol>
        <symbol id="ico-fire" viewBox="0 0 24 24"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></symbol>
        <symbol id="ico-cast" viewBox="0 0 24 24"><path d="M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></symbol>
        <symbol id="ico-disc" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-12.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 5.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></symbol>
        <symbol id="ico-zap" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></symbol>
        <symbol id="ico-film" viewBox="0 0 24 24"><path d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/></symbol>
        <symbol id="ico-globe" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></symbol>
        <symbol id="ico-lock" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></symbol>
        <symbol id="ico-devices" viewBox="0 0 24 24"><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/></symbol>
        <symbol id="ico-headset" viewBox="0 0 24 24"><path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/></symbol>
        <symbol id="ico-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></symbol>
        <symbol id="ico-star" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></symbol>
      </svg>

      <header className="header">
        <div className="header-inner" suppressHydrationWarning>
          <a href="#" className="logo">
            <img src="/logo.jpg" alt="Cine TV Logo" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
            Cine <span>TV</span>
          </a>
          <nav className="nav">
            <a href="#canais">Canais</a>
            <a href="#dispositivos">Dispositivos</a>
            <a href="#planos">Planos</a>
            <a href="#faq">FAQ</a>
          </nav>
          <button className="btn-teste-header" onClick={() => { setIsModalOpen(true); setModalStep('form'); }}>Teste Grátis</button>
          <button className="mobile-toggle" aria-label="Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div className="hamburger"><span></span><span></span><span></span></div>
          </button>
        </div>
      </header>

      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`} suppressHydrationWarning>
        <a href="#canais" onClick={() => setIsMobileMenuOpen(false)}>Canais</a>
        <a href="#dispositivos" onClick={() => setIsMobileMenuOpen(false)}>Dispositivos</a>
        <a href="#planos" onClick={() => setIsMobileMenuOpen(false)}>Planos</a>
        <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
        <button className="btn-teste-header" onClick={() => { setIsModalOpen(true); setModalStep('form'); setIsMobileMenuOpen(false); }} style={{ alignSelf: 'center' }}>Teste Grátis</button>
      </div>

      <main>
        {/* HERO */}
        <section className="hero" id="canais">
          <div className="container hero-inner" suppressHydrationWarning>
            <div className="hero-content fade-in">
              <div className="badge">
                <img className="badge-favicon" src="https://www.google.com/s2/favicons?domain=google.com&sz=32" alt="" width="18" height="18" />
                +22.000 clientes ativos no Brasil
              </div>
              <h1 style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src="/logo.jpg" alt="Cine TV Logo" style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)' }} />
                  <span>Cine TV</span>
                </div>
                <span className="accent">Canais HD e 4K</span>
              </h1>
              <p className="hero-sub">A melhor experiência em TV por internet. Assista Canais ao Vivo, filmes, Séries e muito mais em qualquer dispositivo com qualidade de imagem superior.</p>
              <div className="hero-btns">
                <button className="btn-primary" onClick={() => { setIsModalOpen(true); setModalStep('form'); }}>Teste Grátis Agora</button>
                <a className="btn-outline" href="#planos">Ver Planos</a>
              </div>
              <div className="trust-line">
                <span><i className="trust-dot"></i> Sem cartão de crédito</span>
                <span><i className="trust-dot"></i> Ativação imediata</span>
                <span><i className="trust-dot"></i> Suporte 24h</span>
              </div>
            </div>
            
            <div className="hero-mockup fade-in">
              <div className="tv-frame">
                <div className="tv-screen">
                  {/* HUD top bar */}
                  <div className="tv-hud">
                    <div className="tv-hud-left">
                      <span className="tv-live-dot"></span>
                      <span className="tv-live-label">AO VIVO</span>
                    </div>
                    <div className="tv-hud-right">
                      <div className="tv-signal">
                        <span className="tv-signal-bar"></span>
                        <span className="tv-signal-bar"></span>
                        <span className="tv-signal-bar"></span>
                        <span className="tv-signal-bar"></span>
                      </div>
                      <span className="tv-quality">4K</span>
                    </div>
                  </div>
                  {/* Channel grid */}
                  <div className="tv-grid">
                    <div className="tv-thumb active">
                      <div className="tv-thumb-shimmer"></div>
                      <div className="tv-play-mini"></div>
                      <div className="tv-thumb-bar">
                        <span className="tv-thumb-name">ESPORTES</span>
                        <span className="tv-thumb-badge live">LIVE</span>
                      </div>
                    </div>
                    <div className="tv-thumb">
                      <div className="tv-thumb-shimmer"></div>
                      <div className="tv-thumb-bar">
                        <span className="tv-thumb-name">FILMES</span>
                        <span className="tv-thumb-badge hd">HD</span>
                      </div>
                    </div>
                    <div className="tv-thumb">
                      <div className="tv-thumb-shimmer"></div>
                      <div className="tv-thumb-bar">
                        <span className="tv-thumb-name">SÉRIES</span>
                        <span className="tv-thumb-badge k4">4K</span>
                      </div>
                    </div>
                    <div className="tv-thumb">
                      <div className="tv-thumb-shimmer"></div>
                      <div className="tv-thumb-bar">
                        <span className="tv-thumb-name">NOTÍCIAS</span>
                        <span className="tv-thumb-badge live">LIVE</span>
                      </div>
                    </div>
                    <div className="tv-thumb">
                      <div className="tv-thumb-shimmer"></div>
                      <div className="tv-thumb-bar">
                        <span className="tv-thumb-name">INFANTIL</span>
                        <span className="tv-thumb-badge hd">HD</span>
                      </div>
                    </div>
                    <div className="tv-thumb">
                      <div className="tv-thumb-shimmer"></div>
                      <div className="tv-thumb-bar">
                        <span className="tv-thumb-name">DOCUMENTÁRIOS</span>
                        <span className="tv-thumb-badge k4">4K</span>
                      </div>
                    </div>
                  </div>
                  <div className="tv-progress">
                    <div className="tv-progress-fill"></div>
                  </div>
                  <div className="tv-tags">
                    <span className="tv-tag">HD</span>
                    <span className="tv-tag">4K</span>
                    <span className="tv-tag">AO VIVO</span>
                    <span className="tv-tag">VOD</span>
                    <span className="tv-tag">SPORT</span>
                    <span className="tv-tag">KIDS</span>
                  </div>
                </div>
                <div className="tv-stand"></div>
                <div className="tv-glow"></div>
              </div>
            </div>
          </div>

          {/* CARROSSEL DE CAPAS 2025/2026 */}
          <div className="mt-16 relative overflow-hidden group">
            {/* Efeito de fade nas laterais para fusão com fundo preto */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#060608] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#060608] to-transparent z-10 pointer-events-none"></div>

            <div 
              className={`flex whitespace-nowrap gap-4 py-8 overflow-x-hidden no-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeaveOrUp}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleMouseLeaveOrUp}
              onTouchMove={handleTouchMove}
            >
              {[...MOVIES, ...MOVIES].map((movie, idx) => (
                <div 
                  key={idx} 
                  className="inline-block w-[180px] md:w-[220px] lg:w-[250px] shrink-0 transform transition-transform duration-300 hover:scale-[1.03] hover:z-20 pointer-events-none"
                >
                  <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/5 bg-zinc-900 transition-colors relative isolate">
                    <img
                      src={movie.url}
                      alt={movie.title}
                      loading="lazy"
                      className="w-full h-full object-cover pointer-events-none"
                      onError={(e) => {
                        // Fallback lindo text-based em caso de erro no link da imagem
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        if (target.nextElementSibling) {
                          (target.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-gradient-to-tr from-accent/20 to-zinc-900 border border-white/10 items-center justify-center p-4 text-center whitespace-normal pointer-events-none">
                      <h3 className="font-title font-bold text-lg text-white/90 drop-shadow-md">{movie.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="stats">
          <div className="container">
            <div className="stats-grid fade-in">
              <div>
                <div className="stat-num">2.500+</div>
                <div className="stat-label">Canais ao Vivo</div>
              </div>
              <div>
                <div className="stat-num">50.000+</div>
                <div className="stat-label">Filmes e Séries</div>
              </div>
              <div>
                <div className="stat-num">99,9%</div>
                <div className="stat-label">Sinal Estável</div>
              </div>
              <div>
                <div className="stat-num">24h</div>
                <div className="stat-label">Suporte Online</div>
              </div>
            </div>
          </div>
        </section>

        {/* DEVICES */}
        <section className="devices" id="dispositivos">
          <div className="container">
            <div className="section-title fade-in">
              <h2>Compatível com <span className="accent">Todos os Dispositivos</span></h2>
              <p>Assista onde e quando quiser. Nossa plataforma funciona nos principais aparelhos do mercado.</p>
            </div>
            <div className="devices-grid">
              <div className="device-card fade-in"><div className="device-icon"><svg className="icon-device"><use href="#ico-tv"></use></svg></div><h3 className="device-name">Smart TV</h3></div>
              <div className="device-card fade-in"><div className="device-icon"><svg className="icon-device"><use href="#ico-smartphone"></use></svg></div><h3 className="device-name">Android</h3></div>
              <div className="device-card fade-in"><div className="device-icon"><svg className="icon-device"><use href="#ico-apple"></use></svg></div><h3 className="device-name">iPhone / iPad</h3></div>
              <div className="device-card fade-in"><div className="device-icon"><svg className="icon-device"><use href="#ico-laptop"></use></svg></div><h3 className="device-name">PC / Mac</h3></div>
              <div className="device-card fade-in"><div className="device-icon"><svg className="icon-device"><use href="#ico-box"></use></svg></div><h3 className="device-name">TV Box</h3></div>
              <div className="device-card fade-in"><div className="device-icon"><svg className="icon-device"><use href="#ico-fire"></use></svg></div><h3 className="device-name">Fire TV Stick</h3></div>
              <div className="device-card fade-in"><div className="device-icon"><svg className="icon-device"><use href="#ico-cast"></use></svg></div><h3 className="device-name">Chromecast</h3></div>
              <div className="device-card fade-in"><div className="device-icon"><svg className="icon-device"><use href="#ico-disc"></use></svg></div><h3 className="device-name">Roku</h3></div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features">
          <div className="container">
            <div className="section-title fade-in">
              <h2>Por que escolher o <span className="accent">Cine TV</span>?</h2>
              <p>Tecnologia de ponta e suporte dedicado para você ter a melhor experiência.</p>
            </div>
            <div className="features-grid">
              <div className="feature-card fade-in">
                <div className="feature-icon"><svg className="icon-feature"><use href="#ico-zap"></use></svg></div>
                <h3 className="feature-title">Ativação Imediata</h3>
                <div className="feature-desc">Receba seus dados de acesso em minutos após a confirmação. Sem burocracia, sem espera.</div>
              </div>
              <div className="feature-card fade-in">
                <div className="feature-icon"><svg className="icon-feature"><use href="#ico-film"></use></svg></div>
                <h3 className="feature-title">HD e 4K Ultra</h3>
                <div className="feature-desc">Qualidade de imagem superior com canais em alta definição e resolução 4K disponível.</div>
              </div>
              <div className="feature-card fade-in">
                <div className="feature-icon"><svg className="icon-feature"><use href="#ico-globe"></use></svg></div>
                <h3 className="feature-title">Canais Internacionais</h3>
                <div className="feature-desc">Acesso a canais de diversos países além de todo conteúdo nacional disponível.</div>
              </div>
              <div className="feature-card fade-in">
                <div className="feature-icon"><svg className="icon-feature"><use href="#ico-lock"></use></svg></div>
                <h3 className="feature-title">Acesso Seguro</h3>
                <div className="feature-desc">Conexão estável e protegida para você assistir com tranquilidade em qualquer lugar.</div>
              </div>
              <div className="feature-card fade-in">
                <div className="feature-icon"><svg className="icon-feature"><use href="#ico-devices"></use></svg></div>
                <h3 className="feature-title">Multi-Dispositivos</h3>
                <div className="feature-desc">Use em até 2 aparelhos ao mesmo tempo. Smart TV, celular, tablet ou computador.</div>
              </div>
              <div className="feature-card fade-in">
                <div className="feature-icon"><svg className="icon-feature"><use href="#ico-headset"></use></svg></div>
                <h3 className="feature-title">Suporte 24 Horas</h3>
                <div className="feature-desc">Equipe disponível todos os dias para ajudar com qualquer dúvida ou configuração.</div>
              </div>
            </div>
          </div>
        </section>

        {/* STREAMING & SPORTS SHOWCASE */}
        <section className="streaming-showcase">
          <div className="container">
            <div className="section-title fade-in">
              <h2>O Melhor do Entretenimento <span className="accent">em um Só Lugar</span></h2>
              <p>Acesse as maiores plataformas de streaming e canais premium sem precisar de várias assinaturas.</p>
            </div>
            
              <div className="streaming-grid fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', alignItems: 'center', justifyItems: 'center' }}>
                <div className="platform-logo"><img src="https://www.vectorlogo.zone/logos/netflix/netflix-ar21.svg" alt="Netflix" style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain', transform: 'scale(1.1)' }} /></div>
                <div className="platform-logo"><img src="/hbo.png" alt="HBO Max" style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain' }} /></div>
                <div className="platform-logo"><img src="/prime.png" alt="Prime Video" style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain', transform: 'scale(1.2)' }} /></div>
                <div className="platform-logo"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Paramount_Plus.svg" alt="Paramount+" style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain', transform: 'scale(1.3)' }} /></div>
                <div className="platform-logo"><img src="/globoplay.png" alt="Globoplay" style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain' }} /></div>
                <div className="platform-logo"><img src="/espn.png" alt="ESPN" style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain' }} /></div>
                <div className="platform-logo"><img src="/combate.png" alt="Combate" style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain', transform: 'scale(0.8)' }} /></div>
                <div className="platform-logo"><img src="/discovery.png" alt="Discovery" style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain', transform: 'scale(1.8)', filter: 'brightness(0) invert(1)' }} /></div>
              </div>

            <div className="streaming-footer-text fade-in">
              <p>E muito mais... São mais de <strong>2.500 canais</strong> e <strong>50.000 títulos</strong> esperando por você.</p>
              <button className="btn-primary" style={{ marginTop: '2.5rem' }} onClick={() => { setIsModalOpen(true); setModalStep('form'); }}>Pedir Teste Grátis Agora</button>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how">
          <div className="container">
            <div className="section-title fade-in">
              <h2>Como <span className="accent">Funciona</span>?</h2>
              <p>Em 3 passos simples você já está assistindo. Rápido e sem complicação.</p>
            </div>
            <div className="how-grid">
              <div className="how-card fade-in">
                <div className="how-num">1</div>
                <h3 className="how-title">Clique e Abra o WhatsApp</h3>
                <div className="how-desc">Toque no botão e inicie uma conversa direta com nossa equipe pelo WhatsApp.</div>
              </div>
              <div className="how-card fade-in">
                <div className="how-num">2</div>
                <h3 className="how-title">Solicite seu Teste ou Plano</h3>
                <div className="how-desc">Informe qual plano deseja ou solicite um teste gratuito para experimentar.</div>
              </div>
              <div className="how-card fade-in">
                <div className="how-num">3</div>
                <h3 className="how-title">Receba e Configure na Hora</h3>
                <div className="how-desc">Seus dados de acesso são enviados em minutos. Configure e comece a assistir.</div>
              </div>
            </div>
          </div>
        </section>

        {/* PLANOS */}
        <section className="plans pricing-v2" id="planos">
          <div className="container">
            <div className="section-title">
              <h2>Escolha seu <span className="accent">plano ideal</span></h2>
              <p>Todos os planos incluem acesso completo ao catálogo e garantia de 7 dias</p>
            </div>

            <div className="plans-toggle-wrap">
              <div className="plans-toggle">
                <button
                  onClick={() => setScreensCount(1)}
                  className={screensCount === 1 ? 'active' : ''}
                >
                  1 TELA
                </button>
                <button
                  onClick={() => setScreensCount(2)}
                  className={screensCount === 2 ? 'active' : ''}
                >
                  2 TELAS
                </button>
              </div>
            </div>

            {(() => {
              const plans = [
                {
                  name: 'Mensal',
                  period: '/mês',
                  oneScreenPrice: '30,00',
                  twoScreensPrice: '50,00',
                  monthlyText: '',
                },
                {
                  name: 'Trimestral',
                  period: '/3 meses',
                  oneScreenPrice: '75,00',
                  twoScreensPrice: '150,00',
                  discountText: screensCount === 1 ? '16% OFF' : '',
                  badge: 'Mais Popular',
                  featured: true,
                  monthlyText: 'Equivale a R$ 25,00/mês',
                },
                {
                  name: 'Semestral',
                  period: '/6 meses',
                  oneScreenPrice: '130,00',
                  twoScreensPrice: '240,00',
                  discountText: screensCount === 1 ? '27% OFF' : '',
                  monthlyText: 'Equivale a R$ 21,66/mês',
                },
                {
                  name: 'Anual',
                  period: '/ano',
                  oneScreenPrice: '220,00',
                  twoScreensPrice: '400,00',
                  discountText: screensCount === 1 ? '38% OFF' : '',
                  badge: 'Super Oferta',
                  monthlyText: 'Equivale a R$ 18,33/mês',
                },
              ];

              const features = [
                '2.500+ canais ao vivo',
                '40.000+ filmes e séries',
                'Qualidade 4K/HD',
                'Suporte VIP via WhatsApp',
                'Sem contrato de fidelidade',
                `${screensCount} dispositivo${screensCount > 1 ? 's' : ''} simultâneo${screensCount > 1 ? 's' : ''}`,
              ];

              return (
                <div className="pricing-grid">
                  {plans.map((plan) => {
                    const price = screensCount === 1 ? plan.oneScreenPrice : plan.twoScreensPrice;
                    return (
                      <article
                        key={plan.name}
                        className={`pricing-card ${plan.featured ? 'featured' : ''}`}
                      >
                        {plan.badge ? <span className="pricing-badge">{plan.badge}</span> : null}

                        <h3 className="pricing-name">{plan.name}</h3>
                        <div className="pricing-price-wrap">
                          <span className="pricing-price">R$ {price}</span>
                          <span className="pricing-period">{plan.period}</span>
                        </div>

                        {plan.discountText ? <p className="pricing-discount">{plan.discountText}</p> : null}
                        {plan.monthlyText ? <p className="pricing-monthly">{plan.monthlyText}</p> : null}

                        <ul className="pricing-features">
                          {features.map((feature) => (
                            <li key={`${plan.name}-${feature}`}>
                              <span className="pricing-dot"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <a href={wppUrl} className="pricing-btn">
                          ASSINAR AGORA
                        </a>
                        <p className="pricing-guarantee">Garantia de 7 dias</p>
                      </article>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials">
          <div className="container">
            <div className="section-title fade-in">
              <h2>O que nossos <span className="accent">Clientes</span> dizem</h2>
              <p>Milhares de pessoas já escolheram o melhor serviço de IPTV do Brasil.</p>
            </div>
            <div className="testimonials-grid">
              <div className="testimonial-card fade-in">
                <div className="testimonial-stars"><svg><use href="#ico-star"></use></svg><svg><use href="#ico-star"></use></svg><svg><use href="#ico-star"></use></svg><svg><use href="#ico-star"></use></svg><svg><use href="#ico-star"></use></svg></div>
                <div className="testimonial-text">&quot;Qualidade incrível! Assisto futebol todo fim de semana sem travar. Melhor custo-benefício que já encontrei.&quot;</div>
                <div className="testimonial-author">Carlos M.</div>
                <div className="testimonial-city">São Paulo, SP</div>
              </div>
              <div className="testimonial-card fade-in">
                <div className="testimonial-stars"><svg><use href="#ico-star"></use></svg><svg><use href="#ico-star"></use></svg><svg><use href="#ico-star"></use></svg><svg><use href="#ico-star"></use></svg><svg><use href="#ico-star"></use></svg></div>
                <div className="testimonial-text">&quot;Fiz o teste grátis e assinei no mesmo dia. Minha família inteira usa e adora os filmes e séries.&quot;</div>
                <div className="testimonial-author">Ana Paula S.</div>
                <div className="testimonial-city">Belo Horizonte, MG</div>
              </div>
              <div className="testimonial-card fade-in">
                <div className="testimonial-stars"><svg><use href="#ico-star"></use></svg><svg><use href="#ico-star"></use></svg><svg><use href="#ico-star"></use></svg><svg><use href="#ico-star"></use></svg><svg><use href="#ico-star"></use></svg></div>
                <div className="testimonial-text">&quot;Cancelei a TV a cabo e não me arrependi. A variedade de canais é absurda. Funciona perfeito na Smart TV.&quot;</div>
                <div className="testimonial-author">Fernanda L.</div>
                <div className="testimonial-city">Porto Alegre, RS</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq" id="faq">
          <div className="container">
            <div className="section-title fade-in">
              <h2>Perguntas <span className="accent">Frequentes</span></h2>
              <p>Tire suas dúvidas sobre nosso serviço de IPTV.</p>
            </div>
            <div className="faq-list fade-in">
              {[
                { q: "O teste é gratuito?", a: "Sim! Oferecemos um teste gratuito de 4 horas para você conhecer nossa qualidade antes de assinar qualquer plano. Basta pedir pelo WhatsApp e começar agora mesmo." },
                { q: "Funciona na Smart TV?", a: "Sim! Funciona em todas as Smart TVs (Samsung, LG, Android TV), TV Box, Celular (Android e iOS), Computador e Notebook. Fornecemos o aplicativo ideal para cada dispositivo." },
                { q: "Trava ou dá buffering?", a: "Nossos servidores são de alta performance e garantem 99,9% de estabilidade. Recomendamos uma conexão de internet de pelo menos 10 Mbps para a melhor experiência em HD e 4K." },
                { q: "Quantos dispositivos simultâneos?", a: "O plano Mensal permite 1 dispositivo simultâneo. Os planos Trimestral, Semestral e Anual também vêm com 1 tela por padrão, mas você pode adicionar telas extras se desejar. Perfeito para dividir com a família." },
                { q: "Tem canais ao vivo e filmes no mesmo plano?", a: "Sim! Todos os planos incluem acesso completo a mais de 2.500 canais ao vivo e um catálogo com mais de 40.000 filmes e séries (VOD) atualizados semanalmente. Tudo em um único plano." },
                { q: "Como é feita a ativação?", a: "A ativação é imediata após a confirmação. Enviamos seus dados de acesso pelo WhatsApp com um passo a passo simples de como configurar no seu dispositivo. Em menos de 5 minutos você já está assistindo." },
                { q: "Quais as formas de pagamento?", a: "Aceitamos PIX, cartão de crédito e boleto bancário. O PIX é o método mais rápido, com ativação automática instantânea após a confirmação do pagamento." },
                { q: "E se eu não gostar?", a: "Por isso oferecemos o teste gratuito de 4 horas! Experimente sem compromisso. Além disso, temos uma garantia de satisfação de 7 dias para todos os planos assinados." }
              ].map((item, index) => (
                <div className={`faq-item ${activeFaq === index ? 'active' : ''}`} key={index}>
                  <h3 className="faq-question" onClick={() => toggleFaq(index)}>
                    <span>{item.q}</span>
                    <span className="faq-icon">+</span>
                  </h3>
                  <div className="faq-answer" style={{ maxHeight: activeFaq === index ? '200px' : '0' }}>
                    <div className="faq-answer-inner">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-final">
          <div className="container fade-in">
            <h2>Pronto para o melhor <span className="accent">Teste IPTV</span>?</h2>
            <p>Comece agora com um teste gratuito. Sem burocracia, sem cartão de crédito. Ativação em minutos.</p>
            <button className="btn-cta-big" onClick={() => { setIsModalOpen(true); setModalStep('form'); }}>Quero Meu Teste Grátis</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
                <img src="/logo.jpg" alt="Cine TV Logo" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.1)' }} />
                <div className="footer-brand">
                  Cine <span>TV</span>
                </div>
                <div className="footer-tagline">A melhor experiência em TV por internet do Brasil. Qualidade, estabilidade e suporte que você merece.</div>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Principal</span>
              <a href="#canais">Canais</a>
              <a href="#planos">Planos</a>
              <a href="#faq">Perguntas Frequentes</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Dispositivos</span>
              <a href="#dispositivos">Smart TV</a>
              <a href="#dispositivos">Android / iOS</a>
              <a href="#dispositivos">Fire TV / TV Box</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Suporte</span>
              <a href={wppUrl}>WhatsApp</a>
              <a href="#faq" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); setModalStep('form'); }}>Dúvidas Frequentes</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p style={{ marginBottom: '0.5rem', color: '#ff6b00', fontWeight: 'bold', textShadow: '0 0 10px rgba(255, 107, 0, 0.5)', fontSize: '0.9rem' }}>Criado Por Rodz</p>
            <p>&copy; {new Date().getFullYear()} Cine TV. Todos os direitos reservados.</p>
            <p>Este serviço destina-se ao uso pessoal e responsável. Não nos responsabilizamos pelo uso indevido.</p>
          </div>
        </div>
      </footer>

      {/* MODAL SYSTEM */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container fade-in">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            
            {modalStep === 'form' && (
              <div className="modal-content">
                <h2 className="modal-title">Acesso Imediato</h2>
                <p className="modal-subtitle">Preencha abaixo para receber seu teste gratuito agora mesmo.</p>
                
                <form className="modal-form" onSubmit={handleGenerateTest}>
                  <div className="form-group">
                    <label>Seu Nome</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ex: João Silva" 
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Seu WhatsApp</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="Ex: 11 99999-9999" 
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn-modal-submit">GERAR MEU TESTE AGORA</button>
                </form>
              </div>
            )}

            {modalStep === 'loading' && (
              <div className="modal-content centered">
                <div className="loading-spinner"></div>
                <p className="modal-subtitle">Gerando suas credenciais de acesso...</p>
              </div>
            )}

            {modalStep === 'success' && (
              <div className="modal-content">
                <h2 className="modal-title">Teste Gerado!</h2>
                <p className="modal-subtitle">Suas credenciais foram geradas com sucesso.</p>
                
                <div className="result-card">
                  <div className="result-check">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <div className="result-item">
                    <span className="result-label">USUÁRIO</span>
                    <span className="result-value">{testResult.user}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">SENHA</span>
                    <span className="result-value">{testResult.pass}</span>
                  </div>
                </div>

                <a href={successWppUrl} target="_blank" rel="noopener noreferrer" className="btn-modal-wpp">
                  <svg viewBox="0 0 24 24" className="icon-wpp"><path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.19-.3a8.232 8.232 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24Zm-3.95 3.1c-.24 0-.51.03-.7.25-.19.22-.72.69-.72 1.69 0 1 .73 1.97.83 2.1.1.13 1.44 2.19 3.47 3.07.49.21.87.33 1.17.43.49.15.93.13 1.29.08.39-.05 1.2-.49 1.37-.96.17-.47.17-.88.12-.96-.05-.08-.19-.12-.4-.22-.21-.1-.1.25-.45-.37-.15-.05-.29-.08-.43-.08-.14 0-.17.06-.23.13-.06.07-.22.25-.22.25s-.08.08-.2.08-.2-.05-.4-.15c-.2-.1-.78-.29-1.49-.93-.55-.49-.92-1.09-1.03-1.27-.11-.18-.01-.28.08-.37.08-.08.18-.21.27-.31.09-.1.12-.17.18-.28.06-.11.03-.2-.01-.28-.04-.08-.43-1.03-.59-1.41-.15-.38-.32-.32-.44-.32Z"/></svg>
                  RECEBER NO WHATSAPP
                </a>
                <p className="modal-footer-hint">Clique no botão acima para abrir seu teste direto no aplicativo.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .modal-container {
          background: #111417;
          width: 100%;
          max-width: 450px;
          border-radius: 24px;
          padding: 40px;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: #666;
          font-size: 32px;
          cursor: pointer;
          transition: color 0.2s;
        }
        .modal-close:hover { color: #fff; }
        .modal-title {
          font-family: var(--font-title);
          font-size: 2rem;
          text-align: center;
          margin-bottom: 12px;
          color: #fff;
        }
        .modal-subtitle {
          text-align: center;
          color: #999;
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 32px;
        }
        .modal-form { display: flex; flex-direction: column; gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #fff;
          margin-left: 4px;
        }
        .form-group input {
          background: #1a1e23;
          border: 2px solid #2d343c;
          border-radius: 12px;
          padding: 14px 18px;
          color: #fff;
          font-size: 1rem;
          transition: all 0.2s;
        }
        .form-group input:focus {
          outline: none;
          border-color: #ff6b00;
          box-shadow: 0 0 0 4px rgba(255, 107, 0, 0.1);
        }
        .btn-modal-submit {
          background: #ff6b00;
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 18px;
          font-family: var(--font-title);
          font-weight: 900;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 10px;
        }
        .btn-modal-submit:hover {
          transform: translateY(-2px);
          background: #ff8533;
          box-shadow: 0 10px 20px rgba(255, 107, 0, 0.3);
        }
        .centered {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
        }
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 107, 0, 0.1);
          border-top: 4px solid #ff6b00;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .result-card {
          background: #0d0f11;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          text-align: center;
        }
        .result-check {
          width: 60px;
          height: 60px;
          background: rgba(255, 107, 0, 0.1);
          color: #ff6b00;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        .result-check svg { width: 32px; height: 32px; }
        .result-item { display: flex; flex-direction: column; gap: 4px; }
        .result-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #666;
          letter-spacing: 1px;
        }
        .result-value {
          font-family: var(--font-title);
          font-size: 2.2rem;
          color: #ff6b00;
          letter-spacing: 2px;
        }
        .btn-modal-wpp {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: #25d366;
          color: #fff;
          text-decoration: none;
          padding: 18px;
          border-radius: 12px;
          font-family: var(--font-title);
          font-weight: 900;
          font-size: 1.1rem;
          transition: all 0.2s;
        }
        .btn-modal-wpp:hover {
          transform: translateY(-2px);
          background: #20ba56;
          box-shadow: 0 10px 20px rgba(37, 211, 102, 0.3);
        }
        .icon-wpp { width: 24px; height: 24px; }
        .modal-footer-hint {
          margin-top: 20px;
          text-align: center;
          font-size: 0.85rem;
          color: #666;
        }

        /* STREAMING SHOWCASE STYLES */
        .streaming-showcase {
          padding: 80px 0;
          background: linear-gradient(to bottom, #060608, #0a0a0c);
          position: relative;
          overflow: hidden;
        }
        .streaming-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 30px;
          align-items: center;
          justify-items: center;
          margin: 50px 0;
        }
        .platform-logo {
          width: 100%;
          max-width: 160px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: brightness(0) invert(1) opacity(0.6);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .platform-logo:hover {
          filter: brightness(1) invert(0) opacity(1);
          transform: scale(1.1);
          filter: drop-shadow(0 0 10px rgba(255, 107, 0, 0.4));
        }
        .platform-logo img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .streaming-footer-text {
          text-align: center;
          margin-top: 40px;
        }
        .streaming-footer-text p {
          color: #888;
          font-size: 1.1rem;
        }
        .streaming-footer-text strong {
          color: #fff;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .streaming-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          .platform-logo {
            height: 40px;
            filter: brightness(1) invert(0) opacity(1);
          }
        }

        .main-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}
