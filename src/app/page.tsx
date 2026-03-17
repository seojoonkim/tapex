'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Fade-in hook ─── */
function useFadeIn(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  } as React.CSSProperties;
}

/* ─── Scroll-triggered fade-in hook ─── */
function useScrollFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
  };
  return { ref, style };
}

/* ─── Counter animation hook ─── */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { ref, count };
}

const FONT = "'DM Sans', 'Noto Sans KR', -apple-system, sans-serif";

/* ─── NavBar ─── */
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const navLinks = [
    { href: '#exam', label: '시험안내' },
    { href: '#grade', label: '점수·등급' },
    { href: '#pricing', label: '응시료' },
    { href: '#enterprise', label: '기업' },
  ];

  const handleNavClick = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.04)',
        height: 72,
        display: 'flex', alignItems: 'center',
        padding: '0 48px',
        transition: 'all 0.3s ease',
      }}>
        <img src="/tapex-logo.svg" alt="TAPEX" style={{ height: 32, width: 'auto' }} />

        {/* Desktop menu */}
        {!isMobile && (
          <div style={{
            flex: 1, display: 'flex', justifyContent: 'center', gap: 32,
            fontSize: 14, fontWeight: 500, color: '#64748B',
          }}>
            {navLinks.map(item => (
              <a key={item.href} href={item.href} style={{ transition: 'color 0.2s', textDecoration: 'none', color: '#64748B' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0F172A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
              >{item.label}</a>
            ))}
          </div>
        )}

        {!isMobile && (
          <a href="#register" style={{
            background: '#0F172A', color: '#fff',
            borderRadius: 8, padding: '10px 22px',
            fontSize: 14, fontWeight: 600, textDecoration: 'none',
            transition: 'transform 0.2s',
          }}>시험 접수</a>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              marginLeft: 'auto', background: 'none', border: 'none',
              cursor: 'pointer', padding: 8,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        )}
      </nav>

      {/* Mobile overlay menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 32,
        }}>
          {navLinks.map(item => (
            <a key={item.href} href={item.href} onClick={handleNavClick} style={{
              fontSize: 24, fontWeight: 700, color: '#0F172A',
              textDecoration: 'none', fontFamily: FONT,
            }}>{item.label}</a>
          ))}
          <a href="#register" onClick={handleNavClick} style={{
            background: '#0F172A', color: '#fff',
            borderRadius: 10, padding: '14px 36px',
            fontSize: 16, fontWeight: 700, textDecoration: 'none',
            marginTop: 16,
          }}>시험 접수</a>
        </div>
      )}
    </>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  const fade1 = useFadeIn(100);
  const fade2 = useFadeIn(300);
  const fade3 = useFadeIn(500);

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A1628 0%, #162B4A 60%, #1B3A6B 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '120px 48px 80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background image overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.08,
      }} />

      {/* Background orb */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: 800, height: 600, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Badge */}
      <div style={{
        ...fade1,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        border: '1px solid rgba(201,168,76,0.3)',
        background: 'rgba(201,168,76,0.08)',
        borderRadius: 100, padding: '6px 16px',
        fontSize: 12, fontWeight: 600,
        color: 'rgba(201,168,76,0.9)',
        letterSpacing: '0.05em',
        marginBottom: 40,
        backdropFilter: 'blur(8px)',
        position: 'relative',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', display: 'inline-block' }} />
        한국경제신문 인증 · 세계 최초 4대 LLM 통합 시험
      </div>

      {/* Headline */}
      <h1 style={{
        ...fade2,
        fontSize: 'clamp(48px, 9vw, 108px)',
        fontWeight: 900,
        color: '#fff',
        lineHeight: 1.1,
        letterSpacing: '-0.04em',
        marginBottom: 28,
        maxWidth: 900,
        fontFamily: FONT,
        position: 'relative',
      }}>
        AI를 잘 쓰는<br />사람의 기준,{' '}
        <span style={{
          background: 'linear-gradient(135deg, #C9A84C, #F0D080)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>TAPEX</span>
      </h1>

      <p style={{
        ...fade2,
        fontSize: 'clamp(16px, 2vw, 20px)',
        color: 'rgba(255,255,255,0.55)',
        maxWidth: 560,
        lineHeight: 1.8,
        marginBottom: 52,
        fontWeight: 400,
        position: 'relative',
      }}>
        ChatGPT · Claude · Gemini · Grok<br />
        4대 AI를 실전에서 다루는 능력을 측정하는 세계 최초의 AI 활용 능력 인증 시험
      </p>

      {/* CTA */}
      <div style={{ ...fade3, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
        <a href="#register" style={{
          background: '#C9A84C', color: '#0A1628',
          borderRadius: 10, padding: '16px 36px',
          fontWeight: 700, fontSize: 16,
          letterSpacing: '-0.01em',
          transition: 'transform 0.2s, box-shadow 0.2s',
          textDecoration: 'none',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,168,76,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >시험 접수하기</a>
        <a href="#practice" style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.85)',
          borderRadius: 10, padding: '16px 36px',
          fontWeight: 600, fontSize: 16,
          transition: 'background 0.2s',
          textDecoration: 'none',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
        >온라인 연습 시작</a>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.25)', fontSize: 11,
        letterSpacing: '0.2em', fontWeight: 500,
      }}>SCROLL ↓</div>
    </section>
  );
}

/* ─── Stats ─── */
function StatsSection() {
  const stats = [
    { num: '80문항', desc: '실전 프롬프팅 · 이론 · 시나리오' },
    { num: '990점', desc: 'TOEIC과 동일한 세밀한 척도' },
    { num: '4 LLM', desc: '벤더 중립 범용 역량 평가' },
    { num: '2년', desc: 'AI 기술 변화 반영 갱신 주기' },
  ];

  return (
    <section style={{ background: '#fff', padding: '80px 48px', borderBottom: '1px solid #F1F5F9' }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            textAlign: 'center', padding: '24px 16px',
            borderRight: i < 3 ? '1px solid #F1F5F9' : 'none',
          }}>
            <div style={{
              fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900,
              color: '#0F172A', letterSpacing: '-0.04em', lineHeight: 1,
              fontFamily: FONT,
            }}>{s.num}</div>
            <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 10, lineHeight: 1.8 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Trust Numbers ─── */
function TrustNumbersSection() {
  const items = [
    { target: 12000, suffix: '+', label: '사전 등록자' },
    { target: 50, suffix: '+', label: '기업 파트너' },
    { target: 4, suffix: '', label: 'AI 모델 통합' },
    { target: 160, suffix: '+', label: '개국 응시 가능' },
  ];

  const c0 = useCountUp(items[0].target);
  const c1 = useCountUp(items[1].target);
  const c2 = useCountUp(items[2].target);
  const c3 = useCountUp(items[3].target);
  const counters = [c0, c1, c2, c3];
  const sectionFade = useScrollFadeIn();

  return (
    <section style={{ background: '#0F172A', padding: '120px 48px' }}>
      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12 }}>TRUST IN NUMBERS</p>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900,
          color: '#fff', marginBottom: 64,
          letterSpacing: '-0.04em', fontFamily: FONT,
        }}>숫자로 보는 TAPEX</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {items.map((item, i) => (
            <div key={i} ref={counters[i].ref} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 900,
                color: '#fff', letterSpacing: '-0.04em', lineHeight: 1,
                fontFamily: FONT,
              }}>
                {counters[i].count.toLocaleString()}
                <span style={{ color: '#C9A84C' }}>{item.suffix}</span>
              </div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginTop: 12, lineHeight: 1.8 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why TAPEX ─── */
function WhyTapexSection() {
  const sectionFade = useScrollFadeIn();

  return (
    <section id="exam" style={{ background: '#F8FAFC', padding: '120px 48px' }}>
      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        {/* Left text */}
        <div style={{ flex: '1 1 440px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>WHY TAPEX</p>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900,
            color: '#0F172A', marginBottom: 28,
            letterSpacing: '-0.04em', lineHeight: 1.2,
            fontFamily: FONT,
          }}>일은 이미<br />AI가 하고 있다</h2>
          <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
            보고서, 코드, 데이터 분석 — 지금 당신의 업무 절반은 이미 AI가 처리할 수 있습니다.
          </p>
          <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
            문제는 &lsquo;어떤 AI를 쓰는가&rsquo;가 아니라, &lsquo;어떻게 시키는가&rsquo;입니다.
            같은 ChatGPT를 써도, 프롬프트 하나 차이로 결과물의 품질은 <strong style={{ color: '#0F172A' }}>10배</strong>가 벌어집니다.
          </p>
          <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.8, marginBottom: 32 }}>
            영어 능력엔 TOEIC, 개발 역량엔 코딩 테스트가 있습니다.
            그런데 AI 활용 능력을 객관적으로 측정하는 표준은 — 지금까지 없었습니다.
          </p>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>TAPEX가 그 공백을 채웁니다.</p>
        </div>

        {/* Right: image + infographic */}
        <div style={{ flex: '1 1 380px', maxWidth: 440 }}>
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
            alt="팀 협업"
            style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 16, marginBottom: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'TOEIC', desc: '영어 능력', active: false },
              { label: '코딩 테스트', desc: '개발 역량', active: false },
              { label: 'TAPEX', desc: 'AI 활용 능력', active: true },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                borderRadius: 14, padding: '20px 24px',
                background: item.active ? '#0F172A' : '#fff',
                border: item.active ? 'none' : '1px solid #E2E8F0',
                boxShadow: item.active ? '0 4px 24px rgba(15,23,42,0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  fontSize: 15, fontWeight: 700, width: 100,
                  color: item.active ? '#fff' : '#475569',
                }}>{item.label}</div>
                <div style={{ fontSize: 13, color: item.active ? 'rgba(255,255,255,0.4)' : '#CBD5E1' }}>→</div>
                <div style={{
                  fontSize: 15, fontWeight: 600,
                  color: item.active ? '#C9A84C' : '#94A3B8',
                }}>{item.desc}</div>
                {item.active && (
                  <div style={{
                    marginLeft: 'auto', background: '#C9A84C', color: '#0F172A',
                    borderRadius: 6, padding: '3px 10px',
                    fontSize: 11, fontWeight: 800, letterSpacing: '0.02em',
                  }}>NEW</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Persona Cards ─── */
function PersonaSection() {
  const personas = [
    { title: '취준생 · 대학생', icon: '🎓', quote: '"AI 잘 쓴다고 써봤는데, 증명할 방법이 없더라고요."', detail: 'TAPEX Bronze(450점+)면 서류 통과율이 달라집니다. 학생 40% 할인, 링크드인 배지 발급.', accent: '#C9A84C' },
    { title: '직장인 · 이직자', icon: '💼', quote: '"팀에서 제가 AI 제일 잘 쓰는데, 아무도 몰라요."', detail: 'TAPEX Gold(750점+)로 승진 심사, 연봉 협상, 이직 시 즉시 활용 가능한 스펙.', accent: '#1B3A6B' },
    { title: '프리랜서 · 크리에이터', icon: '🎨', quote: '"클라이언트가 AI 쓸 수 있냐고 물어보는데."', detail: 'TAPEX 점수 + 직무별 마이크로 배지로 포트폴리오를 강화하세요.', accent: '#7C3AED' },
    { title: '기업 HR · 교육 담당', icon: '🏢', quote: '"AI 활용 가능이 50%인데, 누구를 믿죠?"', detail: 'TAPEX for Recruit API로 지원자 점수를 자동 검증. 잡코리아·사람인 연동.', accent: '#059669' },
  ];

  const sectionFade = useScrollFadeIn();

  return (
    <section style={{
      background: 'linear-gradient(180deg, #fff 0%, #F8FAFC 100%)',
      padding: '120px 48px',
      position: 'relative',
    }}>
      {/* Subtle geometric pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(15,23,42,0.02) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12, textAlign: 'center' }}>FOR EVERYONE</p>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900,
          color: '#0F172A', textAlign: 'center', marginBottom: 16,
          letterSpacing: '-0.04em', fontFamily: FONT,
        }}>이런 분이 응시합니다</h2>
        <p style={{ textAlign: 'center', marginBottom: 56, fontSize: 16, color: '#94A3B8', fontWeight: 400, lineHeight: 1.8 }}>
          취준생부터 기업 HR까지 — AI 활용 능력이 필요한 모든 분께
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {personas.map((p, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, padding: '32px 28px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
              borderLeft: `3px solid ${p.accent}`,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'; }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', marginBottom: 12 }}>{p.title}</h3>
              <p style={{ fontSize: 14, fontStyle: 'italic', color: '#94A3B8', marginBottom: 16, lineHeight: 1.6 }}>{p.quote}</p>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.8 }}>{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── LLM Section ─── */
function LLMSection() {
  const llms = [
    { section: 'A', name: 'ChatGPT', sub: '범용 대화', color: '#10A37F', desc: '범용 프롬프팅 · 멀티턴 대화 설계 · 함수 호출 · 출력 구조화' },
    { section: 'B', name: 'Claude', sub: '장문 분석', color: '#D97706', desc: '장문 문서 분석 · 코드 리뷰 · 추론 체인 설계 · 시스템 프롬프트 최적화' },
    { section: 'C', name: 'Gemini', sub: '멀티모달', color: '#1A73E8', desc: '멀티모달 입력 · Google 검색 연동 · 실시간 데이터 활용 · 시각화 지시' },
    { section: 'D', name: 'Grok', sub: '크로스-LLM', color: '#E66C37', desc: '실시간 트렌드 반영 · 크로스 모델 전략 · LLM 한계 우회 · 모델 전환 최적화' },
  ];

  const sectionFade = useScrollFadeIn();

  return (
    <section style={{ background: '#F8FAFC', padding: '120px 48px' }}>
      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12, textAlign: 'center' }}>4 LLMs</p>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900,
          color: '#0F172A', textAlign: 'center', marginBottom: 16,
          letterSpacing: '-0.04em', fontFamily: FONT,
        }}>4대 LLM으로 측정합니다</h2>
        <p style={{ textAlign: 'center', fontSize: 16, color: '#94A3B8', marginBottom: 56, lineHeight: 1.8 }}>
          특정 AI에 종속되지 않는 — 범용 AI 리터러시를 평가합니다
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {llms.map((l, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, padding: '32px 28px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)'; }}
            >
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#94A3B8',
                marginBottom: 16, letterSpacing: '0.05em',
              }}>SECTION {l.section}</div>
              <div style={{
                fontWeight: 800, fontSize: 24, color: '#0F172A',
                marginBottom: 6, letterSpacing: '-0.04em', fontFamily: FONT,
              }}>{l.name}</div>
              <div style={{
                display: 'inline-block',
                background: `${l.color}12`, color: l.color,
                borderRadius: 6, padding: '3px 10px',
                fontSize: 12, fontWeight: 600, marginBottom: 16,
              }}>{l.sub}</div>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Grade System ─── */
function GradeSection() {
  const grades = [
    { range: '850~990', name: 'Platinum', color: '#7C3AED', desc: 'AI 오케스트레이션 마스터 — 상위 1%' },
    { range: '750~849', name: 'Gold', color: '#C9A84C', desc: '전략적 AI 활용 — 팀 리더·시니어 수준' },
    { range: '650~749', name: 'Silver', color: '#64748B', desc: '업무에 즉시 AI를 적용할 수 있는 실무 역량' },
    { range: '450~649', name: 'Bronze', color: '#B45309', desc: '실무 기초 수준 — 신입 AI 활용자로 인정' },
    { range: '200~449', name: 'Developing', color: '#94A3B8', desc: '단순 지시는 가능하나 구조화 능력 미흡' },
    { range: '10~199', name: 'Novice', color: '#CBD5E1', desc: 'AI 도구의 기본 개념을 이해하는 단계' },
  ];

  const sectionFade = useScrollFadeIn();

  return (
    <section id="grade" style={{ background: '#fff', padding: '120px 48px' }}>
      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12, textAlign: 'center' }}>GRADE SYSTEM</p>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900,
          color: '#0F172A', textAlign: 'center', marginBottom: 56,
          letterSpacing: '-0.04em', fontFamily: FONT,
        }}>당신의 점수는 어디에?</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
          {grades.map((g, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 14, padding: '28px 24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              borderTop: `3px solid ${g.color}`,
              display: 'flex', alignItems: 'center', gap: 20,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
            >
              <div>
                <div style={{
                  fontSize: 28, fontWeight: 900, color: g.color,
                  fontFamily: FONT, letterSpacing: '-0.04em', lineHeight: 1,
                }}>{g.range}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>점</div>
              </div>
              <div style={{ borderLeft: '1px solid #F1F5F9', paddingLeft: 20, flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', marginBottom: 4 }}>{g.name}</div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.8 }}>{g.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Enterprise ─── */
function EnterpriseSection() {
  const sectionFade = useScrollFadeIn();

  return (
    <section id="enterprise" style={{ background: '#F8FAFC', padding: '120px 48px' }}>
      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 440px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>FOR ENTERPRISE</p>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900,
            color: '#0F172A', marginBottom: 28,
            letterSpacing: '-0.04em', lineHeight: 1.2,
            fontFamily: FONT,
          }}>AI 잘 쓰는 사람,<br />TAPEX 점수로 찾으세요</h2>
          <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
            서류 전형에 TAPEX 점수 기준을 적용하세요.
          </p>
          <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.8, marginBottom: 32 }}>
            &quot;AI 활용 가능&quot; 같은 모호한 자기소개 대신, 990점 척도의 객관적 수치로 지원자를 평가할 수 있습니다. 잡코리아·사람인 연동을 지원합니다.
          </p>
          <a href="/enterprise" style={{
            display: 'inline-block',
            background: '#0F172A', color: '#fff',
            borderRadius: 10, padding: '14px 32px',
            fontSize: 15, fontWeight: 700,
            transition: 'transform 0.2s, box-shadow 0.2s',
            textDecoration: 'none',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >기업 도입 문의 →</a>
        </div>
        <div style={{ flex: '1 1 440px' }}>
          <img
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80"
            alt="기업 AI 교육"
            style={{ width: '100%', height: 380, objectFit: 'cover', borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Partners ─── */
function PartnerSection() {
  return (
    <section style={{ background: '#fff', padding: '64px 48px', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.25em', color: '#94A3B8', textTransform: 'uppercase' as const, marginBottom: 40, fontWeight: 600 }}>인증 파트너</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 64, flexWrap: 'wrap' }}>
          <img src="/logos/hankook.jpg" alt="한국경제신문" style={{ height: 36, width: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.55 }} />
          <img src="/logos/hashed.jpg" alt="HASHED" style={{ height: 36, width: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.55 }} />
          <img src="/logos/bloomingbit.jpg" alt="bloomingbit" style={{ height: 36, width: 'auto', objectFit: 'contain', filter: 'grayscale(100%) contrast(1.3)', opacity: 0.55, mixBlendMode: 'multiply' as const }} />
        </div>
      </div>
    </section>
  );
}

/* ─── Certification Badge ─── */
function CertificationBadgeSection() {
  const badges = [
    { level: 'Platinum', color: '#7C3AED', bgGrad: 'linear-gradient(135deg, #7C3AED, #9B59B6)', range: '850~990', icon: '◆' },
    { level: 'Gold', color: '#C9A84C', bgGrad: 'linear-gradient(135deg, #C9A84C, #F0D080)', range: '750~849', icon: '★' },
    { level: 'Silver', color: '#64748B', bgGrad: 'linear-gradient(135deg, #64748B, #94A3B8)', range: '650~749', icon: '●' },
  ];

  const sectionFade = useScrollFadeIn();

  return (
    <section style={{ background: '#F8FAFC', padding: '120px 48px' }}>
      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12 }}>DIGITAL BADGE</p>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900,
          color: '#0F172A', marginBottom: 16,
          letterSpacing: '-0.04em', fontFamily: FONT,
        }}>인증 배지를 받으세요</h2>
        <p style={{ fontSize: 16, color: '#94A3B8', marginBottom: 64, lineHeight: 1.8 }}>
          LinkedIn 프로필에 인증 배지를 추가하세요
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginBottom: 48 }}>
          {badges.map((b, i) => (
            <div key={i} style={{
              width: 200, textAlign: 'center',
              transition: 'transform 0.3s',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-8px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {/* Badge circle */}
              <div style={{
                width: 160, height: 160, borderRadius: '50%',
                background: b.bgGrad,
                margin: '0 auto 20px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 32px ${b.color}33`,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', inset: 6, borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                }} />
                <div style={{ fontSize: 24, color: '#fff', marginBottom: 4 }}>{b.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', fontFamily: FONT, letterSpacing: '-0.02em' }}>TAPEX</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginTop: 2 }}>{b.level}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', marginBottom: 4 }}>{b.level}</div>
              <div style={{ fontSize: 14, color: '#64748B' }}>{b.range}점</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
          {[
            { icon: '🔗', text: '블록체인 검증' },
            { icon: '📱', text: 'QR 코드 인증' },
            { icon: '💳', text: '디지털 월렛 호환' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 14, color: '#475569', fontWeight: 500,
            }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTASection() {
  return (
    <section id="pricing" style={{
      background: 'linear-gradient(135deg, #0F172A 0%, #1B3A6B 100%)',
      padding: '140px 48px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background orb */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 400, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <h2 style={{
        fontSize: 'clamp(36px, 7vw, 64px)', fontWeight: 900,
        color: '#fff', marginBottom: 20,
        letterSpacing: '-0.04em', lineHeight: 1.1,
        fontFamily: FONT,
        position: 'relative',
      }}>지금 바로 시작하세요.</h2>
      <p style={{
        color: 'rgba(255,255,255,0.5)', fontSize: 18,
        marginBottom: 52, maxWidth: 560, margin: '0 auto 52px',
        lineHeight: 1.8, position: 'relative',
      }}>
        ₩14,000 온라인 연습으로 지금 내 수준을 확인하고,<br />
        본시험으로 공식 인증받으세요.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
        <a href="#practice" style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.85)',
          borderRadius: 10, padding: '16px 36px',
          fontWeight: 600, fontSize: 16,
          transition: 'background 0.2s',
          textDecoration: 'none',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
        >온라인 연습 ₩14,000</a>
        <a href="#register" style={{
          background: '#C9A84C', color: '#0A1628',
          borderRadius: 10, padding: '16px 36px',
          fontWeight: 800, fontSize: 16,
          letterSpacing: '-0.01em',
          transition: 'transform 0.2s, box-shadow 0.2s',
          textDecoration: 'none',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,168,76,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >본시험 접수 ₩79,000</a>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function FooterSection() {
  const columns = [
    {
      title: '시험안내',
      links: ['시험 구성', '출제 범위', '응시 방법', '시험 일정', 'FAQ'],
    },
    {
      title: '자격증',
      links: ['등급 체계', '배지 발급', '성적 확인', '재발급 안내'],
    },
    {
      title: '기업',
      links: ['기업 도입', '대량 응시', 'API 연동', '맞춤 평가'],
    },
    {
      title: '고객지원',
      links: ['공지사항', '문의하기', '이용약관', '개인정보처리방침'],
    },
  ];

  return (
    <footer style={{ background: '#0F172A', padding: '80px 48px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top: columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 48, marginBottom: 64 }}>
          {/* Brand column */}
          <div>
            <img src="/tapex-logo.svg" alt="TAPEX" style={{ height: 28, width: 'auto', marginBottom: 16, filter: 'brightness(0) invert(1)' }} />
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.8, marginBottom: 16 }}>
              Test of AI Prompt EXpertise<br />
              세계 최초 AI 활용 능력 인증 시험
            </p>
            <p style={{ fontSize: 13, color: '#475569' }}>contact@tapex.kr</p>
          </div>

          {columns.map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 20 }}>{col.title}</div>
              {col.links.map((link, j) => (
                <a key={j} href="#" style={{
                  display: 'block', fontSize: 13, color: '#64748B',
                  marginBottom: 12, textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
                >{link}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 32 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 16,
          }}>
            <div>
              <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>
                © 2026 TAPEX · 한국경제신문 인증
              </div>
              <div style={{ fontSize: 11, color: '#334155' }}>
                서울특별시 중구 세종대로 23길 TAPEX Korea
              </div>
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 16 }}>
              {/* LinkedIn */}
              <a href="#" style={{ color: '#475569', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" style={{ color: '#475569', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" style={{ color: '#475569', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <main style={{ fontFamily: FONT, margin: 0, padding: 0 }}>
      <NavBar />
      <HeroSection />
      <StatsSection />
      <TrustNumbersSection />
      <WhyTapexSection />
      <PersonaSection />
      <LLMSection />
      <GradeSection />
      <EnterpriseSection />
      <PartnerSection />
      <CertificationBadgeSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
