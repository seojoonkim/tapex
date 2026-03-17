'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

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
  const style: React.CSSProperties = {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
  };
  return { ref, style };
}

/* ─── Counter animation hook ─── */
function useCountUp(target: number, _duration = 2000) {
  const ref = useRef<HTMLDivElement>(null);
  return { ref, count: target };
}

const FONT = "'DM Sans', 'Noto Sans KR', -apple-system, sans-serif";

/* ─── Mobile detection hook ─── */
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

/* ─── Section Divider ─── */
function SectionDivider({ color = '#F1F5F9' }: { color?: string }) {
  return (
    <div style={{
      height: 1,
      background: `linear-gradient(90deg, transparent 0%, ${color} 20%, ${color} 80%, transparent 100%)`,
    }} />
  );
}

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
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
        height: 72,
        display: 'flex', alignItems: 'center',
        padding: isMobile ? '0 20px' : '0 48px',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.04)' : 'none',
      }}>
        <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 22, letterSpacing: '-0.04em', color: '#0F172A', display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>
          TAPEX
          <span style={{ position: 'absolute', bottom: -4, left: 0, width: '100%', height: 2.5, background: 'linear-gradient(90deg, #C9A84C, rgba(240,208,128,0.3))', borderRadius: 2 }} />
        </span>

        {/* Desktop menu */}
        {!isMobile && (
          <div style={{
            flex: 1, display: 'flex', justifyContent: 'center', gap: 36,
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
            borderRadius: 8, padding: '10px 24px',
            fontSize: 14, fontWeight: 600, textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(15,23,42,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >시험 접수</a>
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
  const fade4 = useFadeIn(700);
  const isMobile = useIsMobile();

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #060E1F 0%, #0F1D36 30%, #162B4A 60%, #1B3A6B 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '100px 20px 60px' : '120px 48px 80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background image overlay — stronger opacity */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.18,
        filter: 'saturate(0.3)',
      }} />
      {/* Dark gradient overlay on top of image for readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(6,14,31,0.7) 0%, rgba(15,29,54,0.5) 50%, rgba(27,58,107,0.6) 100%)',
      }} />

      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%',
        transform: 'translateX(-50%)',
        width: 900, height: 700, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(27,58,107,0.3) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Badge */}
      <div style={{
        ...fade1,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        border: '1px solid rgba(201,168,76,0.35)',
        background: 'rgba(201,168,76,0.1)',
        borderRadius: 100, padding: '8px 20px',
        fontSize: 12, fontWeight: 600,
        color: 'rgba(201,168,76,0.95)',
        letterSpacing: '0.05em',
        marginBottom: 44,
        backdropFilter: 'blur(8px)',
        position: 'relative',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', display: 'inline-block', boxShadow: '0 0 8px rgba(201,168,76,0.5)' }} />
        한국경제신문 인증 · 세계 최초 AI 프롬프트 역량 인증 시험
      </div>

      {/* Headline */}
      <h1 style={{
        ...fade2,
        fontSize: 'clamp(44px, 8.5vw, 100px)',
        fontWeight: 900,
        color: '#fff',
        lineHeight: 1.08,
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
        color: 'rgba(255,255,255,0.6)',
        maxWidth: 560,
        lineHeight: 1.8,
        marginBottom: 56,
        fontWeight: 400,
        position: 'relative',
      }}>
        프롬프트 설계부터 데이터 분석, 코드 생성까지<br />
        6가지 핵심 역량으로 측정하는 세계 최초의 AI 활용 능력 인증 시험
      </p>

      {/* CTA */}
      <div style={{ ...fade3, display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
        <a href="#register" style={{
          background: 'linear-gradient(135deg, #C9A84C 0%, #D4B65E 100%)',
          color: '#0A1628',
          borderRadius: 12, padding: '18px 40px',
          fontWeight: 800, fontSize: 16,
          letterSpacing: '-0.01em',
          transition: 'transform 0.2s, box-shadow 0.2s',
          textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(201,168,76,0.25)',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,168,76,0.35)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,168,76,0.25)'; }}
        >시험 접수하기</a>
        <a href="#practice" style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.18)',
          color: 'rgba(255,255,255,0.9)',
          borderRadius: 12, padding: '18px 40px',
          fontWeight: 600, fontSize: 16,
          transition: 'all 0.2s',
          textDecoration: 'none',
          backdropFilter: 'blur(4px)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
        >온라인 연습 시작</a>
      </div>

      {/* Trust indicators under CTA */}
      <div style={{
        ...fade4,
        display: 'flex', gap: 24, marginTop: 48,
        position: 'relative', flexWrap: 'wrap', justifyContent: 'center',
      }}>
        {['12,000+ 사전등록', '160+ 개국', '4대 LLM'].map((text, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500,
          }}>
            <span style={{ color: 'rgba(201,168,76,0.6)', fontSize: 10 }}>●</span>
            {text}
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.2)', fontSize: 11,
        letterSpacing: '0.2em', fontWeight: 500,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <span>SCROLL</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ opacity: 0.4 }}>
          <rect x="4" y="0" width="8" height="14" rx="4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
          <circle cx="8" cy="5" r="1.5" fill="rgba(255,255,255,0.5)" />
        </svg>
      </div>
    </section>
  );
}

/* ─── Stats ─── */
function StatsSection() {
  const isMobile = useIsMobile();
  const stats = [
    { num: '80문항', desc: '실전 프롬프팅 · 이론 · 시나리오', icon: '📋' },
    { num: '990점', desc: 'TOEIC과 동일한 세밀한 척도', icon: '📊' },
    { num: '6개', desc: '역량 카테고리 범위 측정', icon: '🤖' },
    { num: '2년', desc: 'AI 기술 변화 반영 갱신 주기', icon: '🔄' },
  ];

  return (
    <section style={{
      background: '#fff',
      padding: isMobile ? '48px 20px' : '0 48px',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        background: '#fff',
        borderRadius: isMobile ? 0 : 20,
        boxShadow: isMobile ? 'none' : '0 4px 32px rgba(0,0,0,0.06)',
        marginTop: isMobile ? 0 : -48,
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            textAlign: 'center', padding: isMobile ? '24px 16px' : '40px 24px',
            borderRight: isMobile ? 'none' : (i < 3 ? '1px solid #F1F5F9' : 'none'),
            borderBottom: isMobile && i < 2 ? '1px solid #F1F5F9' : 'none',
            transition: 'background 0.2s',
          }}>
            <div style={{
              fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900,
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
  const isMobile = useIsMobile();
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
    <section style={{
      background: '#0F172A',
      padding: isMobile ? '80px 20px' : '120px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12 }}>TRUST IN NUMBERS</p>
        <h2 style={{
          fontSize: 'clamp(26px, 5vw, 48px)', fontWeight: 900,
          color: '#fff', marginBottom: isMobile ? 48 : 72,
          letterSpacing: '-0.04em', fontFamily: FONT,
        }}>숫자로 보는 TAPEX</h2>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 24 : 40 }}>
          {items.map((item, i) => (
            <div key={i} ref={counters[i].ref} style={{
              textAlign: 'center',
              padding: '32px 16px',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{
                fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900,
                color: '#fff', letterSpacing: '-0.04em', lineHeight: 1,
                fontFamily: FONT,
              }}>
                {counters[i].count.toLocaleString()}
                <span style={{ color: '#C9A84C' }}>{item.suffix}</span>
              </div>
              <div style={{
                fontSize: 14, color: 'rgba(255,255,255,0.45)', marginTop: 12, lineHeight: 1.8,
                fontWeight: 500,
              }}>{item.label}</div>
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
  const isMobile = useIsMobile();

  const comparisons = [
    { label: 'TOEIC', desc: '영어 능력', icon: 'EN', active: false },
    { label: 'TOEFL', desc: '영어 학술 역량', icon: 'EN', active: false },
    { label: '엑셀 인증', desc: 'Office 활용 능력', icon: 'XL', active: false },
    { label: '코딩 테스트', desc: '개발 역량', icon: '<>', active: false },
    { label: 'TAPEX', desc: 'AI 활용 능력', icon: 'AI', active: true },
  ];

  return (
    <section id="exam" style={{
      background: '#F8FAFC',
      padding: isMobile ? '80px 20px' : '120px 48px',
      position: 'relative',
    }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 80, height: 3, background: 'linear-gradient(90deg, #C9A84C, #F0D080)',
        borderRadius: 2,
      }} />

      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', flexWrap: 'wrap', gap: isMobile ? 48 : 80, alignItems: 'center' }}>
        {/* Left text */}
        <div style={{ flex: '1 1 440px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 16 }}>WHY TAPEX</p>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900,
            color: '#0F172A', marginBottom: 28,
            letterSpacing: '-0.04em', lineHeight: 1.2,
            fontFamily: FONT,
          }}>일은 이미<br />AI가 하고 있다</h2>

          <div style={{
            width: 40, height: 3,
            background: 'linear-gradient(90deg, #C9A84C, transparent)',
            borderRadius: 2, marginBottom: 28,
          }} />

          <p style={{ fontSize: isMobile ? 15 : 17, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
            보고서, 코드, 데이터 분석 — 지금 당신의 업무 절반은 이미 AI가 처리할 수 있습니다.
          </p>
          <p style={{ fontSize: isMobile ? 15 : 17, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
            문제는 &lsquo;어떤 AI를 쓰는가&rsquo;가 아니라, &lsquo;어떻게 시키는가&rsquo;입니다.
            같은 ChatGPT를 써도, 프롬프트 하나 차이로 결과물의 품질은 <strong style={{ color: '#0F172A', fontSize: '110%' }}>10배</strong>가 벌어집니다.
          </p>
          <p style={{ fontSize: isMobile ? 15 : 17, color: '#475569', lineHeight: 1.8, marginBottom: 32 }}>
            영어 능력엔 TOEIC·TOEFL, 엑셀엔 MOS, 개발 역량엔 코딩 테스트가 있습니다.
            그런데 AI 활용 능력을 객관적으로 측정하는 표준은 — 지금까지 없었습니다.
          </p>
          <p style={{
            fontSize: 22, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em',
            paddingLeft: 16, borderLeft: '3px solid #C9A84C',
          }}>TAPEX가 그 공백을 채웁니다.</p>
        </div>

        {/* Right: image + comparison cards */}
        <div style={{ flex: '1 1 400px', maxWidth: 480 }}>
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
            alt="팀 협업"
            style={{
              width: '100%', height: 240, objectFit: 'cover',
              borderRadius: 20, marginBottom: 24,
              boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {comparisons.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                borderRadius: 16, padding: '22px 24px',
                background: item.active ? 'linear-gradient(135deg, #0F172A 0%, #1B3A6B 100%)' : '#fff',
                border: item.active ? 'none' : '1px solid #E2E8F0',
                boxShadow: item.active ? '0 8px 32px rgba(15,23,42,0.2)' : '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'all 0.25s ease',
                transform: item.active ? 'scale(1.02)' : 'scale(1)',
              }}>
                {/* Icon circle */}
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: item.active ? 'rgba(201,168,76,0.15)' : '#F8FAFC',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, flexShrink: 0,
                  color: item.active ? '#C9A84C' : '#94A3B8',
                  fontFamily: FONT,
                }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 15, fontWeight: 700,
                    color: item.active ? '#fff' : '#475569',
                    marginBottom: 2,
                  }}>{item.label}</div>
                  <div style={{
                    fontSize: 13,
                    color: item.active ? 'rgba(201,168,76,0.8)' : '#94A3B8',
                    fontWeight: 500,
                  }}>{item.desc}</div>
                </div>
                {item.active && (
                  <div style={{
                    background: 'linear-gradient(135deg, #C9A84C, #D4B65E)', color: '#0F172A',
                    borderRadius: 8, padding: '5px 12px',
                    fontSize: 11, fontWeight: 800, letterSpacing: '0.03em',
                  }}>NEW</div>
                )}
                {!item.active && (
                  <div style={{ fontSize: 12, color: '#CBD5E1', fontWeight: 500 }}>→</div>
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
  const isMobile = useIsMobile();
  const personas = [
    {
      title: '취준생 · 대학생',
      quote: '"AI 잘 쓴다고 써봤는데, 증명할 방법이 없더라고요."',
      detail: 'TAPEX Bronze(600점+)면 서류 통과율이 달라집니다. 학생 40% 할인, 링크드인 배지 발급.',
      accent: '#C9A84C',
      accentBg: 'rgba(201,168,76,0.06)',
      icon: '🎓',
    },
    {
      title: '직장인 · 이직자',
      quote: '"팀에서 제가 AI 제일 잘 쓰는데, 아무도 몰라요."',
      detail: 'TAPEX Gold(800점+)로 승진 심사, 연봉 협상, 이직 시 즉시 활용 가능한 스펙.',
      accent: '#1B3A6B',
      accentBg: 'rgba(27,58,107,0.04)',
      icon: '💼',
    },
    {
      title: '프리랜서 · 크리에이터',
      quote: '"클라이언트가 AI 쓸 수 있냐고 물어보는데."',
      detail: 'TAPEX 점수 + 직무별 마이크로 배지로 포트폴리오를 강화하세요.',
      accent: '#7C3AED',
      accentBg: 'rgba(124,58,237,0.04)',
      icon: '🎨',
    },
    {
      title: '기업 HR · 교육 담당',
      quote: '"AI 활용 가능이 50%인데, 누구를 믿죠?"',
      detail: 'TAPEX for Recruit API로 지원자 점수를 자동 검증. 잡코리아·사람인 연동.',
      accent: '#059669',
      accentBg: 'rgba(5,150,105,0.04)',
      icon: '🏢',
    },
  ];

  const sectionFade = useScrollFadeIn();

  return (
    <section style={{
      background: '#fff',
      padding: isMobile ? '80px 20px' : '120px 48px',
      position: 'relative',
    }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 80, height: 3, background: 'linear-gradient(90deg, #C9A84C, #F0D080)',
        borderRadius: 2,
      }} />

      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12, textAlign: 'center' }}>FOR EVERYONE</p>
        <h2 style={{
          fontSize: 'clamp(26px, 5vw, 48px)', fontWeight: 900,
          color: '#0F172A', textAlign: 'center', marginBottom: 16,
          letterSpacing: '-0.04em', fontFamily: FONT,
        }}>이런 분이 응시합니다</h2>
        <p style={{ textAlign: 'center', marginBottom: 56, fontSize: 16, color: '#94A3B8', fontWeight: 400, lineHeight: 1.8 }}>
          취준생부터 기업 HR까지 — AI 활용 능력이 필요한 모든 분께
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 20 }}>
          {personas.map((p, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: 20,
              padding: isMobile ? '28px 24px' : '36px 32px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.03)',
              border: '1px solid #F1F5F9',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
              position: 'relative' as const,
              overflow: 'hidden' as const,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = `${p.accent}40`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.03)';
                e.currentTarget.style.borderColor = '#F1F5F9';
              }}
            >
              {/* Accent top bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 3, background: `linear-gradient(90deg, ${p.accent}, ${p.accent}60)`,
              }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                {/* Number + icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: p.accentBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                }}>{p.icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: p.accent, letterSpacing: '0.1em', marginBottom: 4 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 18, color: '#0F172A', margin: 0 }}>{p.title}</h3>
                </div>
              </div>

              <p style={{
                fontSize: 15, fontStyle: 'italic', color: '#64748B',
                marginBottom: 14, lineHeight: 1.6,
                paddingLeft: 16,
                borderLeft: `2px solid ${p.accent}30`,
              }}>{p.quote}</p>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.8 }}>{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Exam Categories ─── */
/* ─── Category SVG Icons ─── */
const CategoryIcons: Record<string, React.ReactElement> = {
  '01': (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="4" y="8" width="32" height="24" rx="4" stroke="#1B3A6B" strokeWidth="2.5"/>
      <path d="M10 16h6M10 20h10M10 24h7" stroke="#1B3A6B" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 15l4 5-4 5" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  '02': (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M8 30L16 20l6 6 6-8 6 8" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8" cy="30" r="2" fill="#059669"/>
      <circle cx="16" cy="20" r="2" fill="#059669"/>
      <circle cx="22" cy="26" r="2" fill="#059669"/>
      <circle cx="28" cy="18" r="2" fill="#059669"/>
      <circle cx="34" cy="22" r="2" fill="#C9A84C"/>
      <path d="M8 34h24" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.3"/>
    </svg>
  ),
  '03': (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M14 13l-6 7 6 7" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26 13l6 7-6 7" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 10l-4 20" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  '04': (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="6" y="6" width="28" height="34" rx="3" stroke="#C9A84C" strokeWidth="2.5"/>
      <path d="M12 14h16M12 19h16M12 24h10" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="30" cy="30" r="6" fill="#0F172A"/>
      <path d="M27 30l2 2 4-4" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  '05': (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 8c-6.6 0-12 5.4-12 12 0 4 2 7.5 5 9.6V32h14v-2.4c3-2.1 5-5.6 5-9.6 0-6.6-5.4-12-12-12z" stroke="#E11D48" strokeWidth="2.5"/>
      <path d="M16 32v3h8v-3" stroke="#E11D48" strokeWidth="2"/>
      <path d="M17 20c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  '06': (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="6" y="10" width="20" height="14" rx="3" stroke="#0284C7" strokeWidth="2.5"/>
      <path d="M26 14l8-4v16l-8-4" stroke="#0284C7" strokeWidth="2.5" strokeLinejoin="round"/>
      <circle cx="16" cy="17" r="3" fill="#0284C7" fillOpacity="0.2" stroke="#0284C7" strokeWidth="1.5"/>
      <path d="M8 28h12M8 31h8" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

function ExamCategorySection() {
  const isMobile = useIsMobile();
  const categories = [
    {
      code: '01',
      name: '프롬프트 설계',
      sub: 'Prompt Engineering',
      color: '#1B3A6B',
      desc: '명확한 지시문 작성, 컨텍스트 구성, 멀티턴 대화 설계 및 출력 구조화 능력을 평가합니다.',
    },
    {
      code: '02',
      name: '데이터 분석',
      sub: 'Data Analysis',
      color: '#059669',
      desc: 'AI를 활용한 데이터 해석, 인사이트 도출, 시각화 지시 및 통계적 추론 활용 능력을 평가합니다.',
    },
    {
      code: '03',
      name: '코드 생성·디버깅',
      sub: 'Code & Debug',
      color: '#7C3AED',
      desc: '코드 작성 지시, 오류 수정 요청, 리팩토링 설계, 기술 문서 요약 활용 능력을 평가합니다.',
    },
    {
      code: '04',
      name: '비즈니스 문서',
      sub: 'Business Writing',
      color: '#C9A84C',
      desc: '기획서, 보고서, 이메일, 제안서 등 업무 문서 작성을 AI로 효율화하는 능력을 평가합니다.',
    },
    {
      code: '05',
      name: '창작·콘텐츠',
      sub: 'Creative Content',
      color: '#E11D48',
      desc: '카피라이팅, SNS 콘텐츠, 스크립트, 브레인스토밍 등 창의적 결과물 생성 능력을 평가합니다.',
    },
    {
      code: '06',
      name: '멀티모달·고급',
      sub: 'Multimodal & Advanced',
      color: '#0284C7',
      desc: '이미지·음성 입력 활용, 에이전트 설계, 워크플로우 자동화 등 고급 AI 활용 능력을 평가합니다.',
    },
  ];

  const sectionFade = useScrollFadeIn();

  return (
    <section style={{ background: '#F8FAFC', padding: isMobile ? '80px 20px' : '120px 48px' }}>
      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12, textAlign: 'center' }}>EXAM STRUCTURE</p>
        <h2 style={{
          fontSize: 'clamp(26px, 5vw, 48px)', fontWeight: 900,
          color: '#0F172A', textAlign: 'center', marginBottom: 12,
          letterSpacing: '-0.04em', fontFamily: FONT,
        }}>6가지 역량으로 측정합니다</h2>
        <p style={{ textAlign: 'center', fontSize: 16, color: '#94A3B8', marginBottom: 16, lineHeight: 1.8 }}>
          사용할 AI 모델은 수험생이 자유롭게 선택
        </p>
        {/* LLM choice badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#0F172A', borderRadius: 100,
            padding: '10px 24px',
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>지원 모델</span>
            {['ChatGPT', 'Claude', 'Gemini', 'Grok'].map((m, i) => (
              <span key={i} style={{
                fontSize: 12, fontWeight: 700, color: '#C9A84C',
                background: 'rgba(201,168,76,0.12)',
                borderRadius: 6, padding: '2px 10px',
              }}>{m}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
          {categories.map((c, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16,
              padding: isMobile ? '28px 24px' : '36px 32px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.03)',
              border: '1px solid #F1F5F9',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.03)'; }}
            >
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                {/* SVG Icon */}
                <div style={{ flexShrink: 0, marginTop: 2 }}>{CategoryIcons[c.code]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: c.color, letterSpacing: '0.1em', marginBottom: 6 }}>{c.code}</div>
                  <div style={{ fontWeight: 800, fontSize: 18, color: '#0F172A', marginBottom: 8, letterSpacing: '-0.03em', fontFamily: FONT }}>{c.name}</div>
                  <div style={{
                    display: 'inline-block',
                    background: `${c.color}10`, color: c.color,
                    borderRadius: 6, padding: '2px 10px',
                    fontSize: 11, fontWeight: 600, marginBottom: 14,
                  }}>{c.sub}</div>
                  <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8, margin: 0 }}>{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Grade System ─── */
function GradeSection() {
  const isMobile = useIsMobile();
  const grades = [
    { range: '900~990', name: 'Platinum', color: '#7C3AED', desc: 'AI를 전략적으로 설계하고 조율하는 최상위 역량 — 상위 1%', bar: '95%' },
    { range: '800~899', name: 'Gold', color: '#C9A84C', desc: 'AI를 업무 전반에 자유롭게 적용하는 팀 리더·시니어 수준', bar: '80%' },
    { range: '700~799', name: 'Silver', color: '#64748B', desc: 'AI를 실무에 즉시 투입할 수 있는 검증된 활용 역량', bar: '65%' },
    { range: '600~699', name: 'Bronze', color: '#B45309', desc: 'AI 활용의 실무 기초를 갖춘 입문 전문가 수준', bar: '50%' },
    { range: '500~599', name: 'Developing', color: '#94A3B8', desc: 'AI 도구를 인식하고 기초적인 활용을 시작한 단계', bar: '30%' },
    { range: '499 이하', name: 'Novice', color: '#CBD5E1', desc: 'AI를 본격적으로 배우고 익혀가는 학습 단계', bar: '15%' },
  ];

  const sectionFade = useScrollFadeIn();

  return (
    <section id="grade" style={{
      background: '#fff',
      padding: isMobile ? '80px 20px' : '120px 48px',
      position: 'relative',
    }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 80, height: 3, background: 'linear-gradient(90deg, #C9A84C, #F0D080)',
        borderRadius: 2,
      }} />

      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12, textAlign: 'center' }}>GRADE SYSTEM</p>
        <h2 style={{
          fontSize: 'clamp(26px, 5vw, 48px)', fontWeight: 900,
          color: '#0F172A', textAlign: 'center', marginBottom: 56,
          letterSpacing: '-0.04em', fontFamily: FONT,
        }}>당신의 점수는 어디에?</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: 16,
        }}>
          {grades.map((g, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, padding: isMobile ? '24px 20px' : '28px 28px',
              border: '1px solid #F1F5F9',
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              display: 'flex', alignItems: 'center', gap: 20,
              transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
              position: 'relative' as const,
              overflow: 'hidden' as const,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = `${g.color}40`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.03)';
                e.currentTarget.style.borderColor = '#F1F5F9';
              }}
            >
              {/* Left accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: 3, background: g.color,
              }} />

              {/* Score badge */}
              <div style={{
                minWidth: 80, textAlign: 'center' as const,
              }}>
                <div style={{
                  fontSize: 24, fontWeight: 900, color: g.color,
                  fontFamily: FONT, letterSpacing: '-0.04em', lineHeight: 1,
                }}>{g.range}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>점</div>
              </div>

              <div style={{ borderLeft: '1px solid #F1F5F9', paddingLeft: 20, flex: 1 }}>
                <div style={{
                  fontWeight: 700, fontSize: 16, color: '#0F172A', marginBottom: 6,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  {g.name}
                  {i === 0 && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: g.color,
                      background: `${g.color}12`, borderRadius: 4,
                      padding: '2px 6px', letterSpacing: '0.05em',
                    }}>TOP 1%</span>
                  )}
                </div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7, marginBottom: 8 }}>{g.desc}</div>
                {/* Progress bar */}
                <div style={{
                  height: 3, background: '#F1F5F9', borderRadius: 2,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', width: g.bar,
                    background: `linear-gradient(90deg, ${g.color}, ${g.color}80)`,
                    borderRadius: 2,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
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
  const isMobile = useIsMobile();

  return (
    <section id="enterprise" style={{
      background: '#F8FAFC',
      padding: isMobile ? '80px 20px' : '120px 48px',
      position: 'relative',
    }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 80, height: 3, background: 'linear-gradient(90deg, #C9A84C, #F0D080)',
        borderRadius: 2,
      }} />

      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap', gap: isMobile ? 40 : 80, alignItems: 'center' }}>
        <div style={{ flex: '1 1 440px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 16 }}>FOR ENTERPRISE</p>
          <h2 style={{
            fontSize: 'clamp(26px, 5vw, 48px)', fontWeight: 900,
            color: '#0F172A', marginBottom: 28,
            letterSpacing: '-0.04em', lineHeight: 1.2,
            fontFamily: FONT,
          }}>AI 잘 쓰는 사람,<br />TAPEX 점수로 찾으세요</h2>

          <div style={{
            width: 40, height: 3,
            background: 'linear-gradient(90deg, #C9A84C, transparent)',
            borderRadius: 2, marginBottom: 28,
          }} />

          <p style={{ fontSize: isMobile ? 15 : 17, color: '#475569', lineHeight: 1.8, marginBottom: 20 }}>
            서류 전형에 TAPEX 점수 기준을 적용하세요.
          </p>
          <p style={{ fontSize: isMobile ? 15 : 17, color: '#475569', lineHeight: 1.8, marginBottom: 36 }}>
            &quot;AI 활용 가능&quot; 같은 모호한 자기소개 대신, 990점 척도의 객관적 수치로 지원자를 평가할 수 있습니다. 잡코리아·사람인 연동을 지원합니다.
          </p>

          {/* Feature checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
            {['990점 척도 객관적 평가', '잡코리아·사람인 자동 연동', 'API 기반 자동 검증'].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#334155', fontWeight: 500 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 6,
                  background: 'rgba(201,168,76,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: '#C9A84C', fontSize: 12, fontWeight: 700 }}>✓</span>
                </div>
                {text}
              </div>
            ))}
          </div>

          <a href="/enterprise" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#0F172A', color: '#fff',
            borderRadius: 12, padding: '16px 36px',
            fontSize: 15, fontWeight: 700,
            transition: 'transform 0.2s, box-shadow 0.2s',
            textDecoration: 'none',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(15,23,42,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >기업 도입 문의 <span style={{ fontSize: 18 }}>→</span></a>
        </div>
        <div style={{ flex: '1 1 440px' }}>
          <img
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80"
            alt="기업 AI 교육"
            style={{
              width: '100%', height: 400, objectFit: 'cover',
              borderRadius: 24,
              boxShadow: '0 16px 48px rgba(0,0,0,0.1)',
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Partners ─── */
function PartnerSection() {
  const isMobile = useIsMobile();
  return (
    <section style={{
      background: '#0F172A',
      padding: isMobile ? '56px 20px' : '72px 48px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' as const, marginBottom: 40, fontWeight: 600 }}>인증 파트너</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 40 : 72, flexWrap: 'wrap' }}>
          <img src="/logos/hankook.jpg" alt="한국경제신문" style={{ height: 36, maxWidth: 160, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
          <img src="/logos/hashed.jpg" alt="HASHED" style={{ height: 36, maxWidth: 160, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
          <img src="/logos/bloomingbit.jpg" alt="bloomingbit" style={{ height: 36, maxWidth: 160, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
        </div>
      </div>
    </section>
  );
}

/* ─── Certification Badge ─── */
function CertificationBadgeSection() {
  const isMobile = useIsMobile();
  const badges = [
    { level: 'Platinum', color: '#7C3AED', range: '900~990', icon: '◆' },
    { level: 'Gold', color: '#C9A84C', range: '800~899', icon: '★' },
    { level: 'Silver', color: '#64748B', range: '700~799', icon: '●' },
  ];

  const sectionFade = useScrollFadeIn();

  return (
    <section style={{
      background: '#F8FAFC',
      padding: isMobile ? '80px 20px' : '120px 48px',
      position: 'relative',
    }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 80, height: 3, background: 'linear-gradient(90deg, #C9A84C, #F0D080)',
        borderRadius: 2,
      }} />

      <div ref={sectionFade.ref} style={{ ...sectionFade.style, maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 12 }}>DIGITAL BADGE</p>
        <h2 style={{
          fontSize: 'clamp(26px, 5vw, 48px)', fontWeight: 900,
          color: '#0F172A', marginBottom: 16,
          letterSpacing: '-0.04em', fontFamily: FONT,
        }}>인증 배지를 받으세요</h2>
        <p style={{ fontSize: 16, color: '#94A3B8', marginBottom: 64, lineHeight: 1.8 }}>
          LinkedIn 프로필에 인증 배지를 추가하세요
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 16 : 32, flexWrap: 'wrap', marginBottom: 48 }}>
          {badges.map((b, i) => (
            <div key={i} style={{
              background: '#fff',
              border: '1px solid #F1F5F9',
              borderRadius: 20,
              padding: '36px 28px',
              textAlign: 'left' as const,
              width: isMobile ? '100%' : 240,
              maxWidth: 300,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
              position: 'relative' as const,
              overflow: 'hidden' as const,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = `${b.color}40`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#F1F5F9';
              }}
            >
              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 3, background: `linear-gradient(90deg, ${b.color}, ${b.color}60)`,
              }} />

              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: `${b.color}10`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <span style={{ fontSize: 22, color: b.color }}>{b.icon}</span>
              </div>
              <div style={{ fontWeight: 900, fontSize: 20, color: '#0F172A', marginBottom: 4, letterSpacing: '-0.03em' }}>
                TAPEX {b.level}
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>{b.range}점</div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontWeight: 700, color: b.color,
                background: `${b.color}08`, borderRadius: 6, padding: '5px 10px',
                letterSpacing: '0.05em',
              }}>
                <span style={{ fontSize: 10 }}>✓</span> VERIFIED
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 20 : 40, flexWrap: 'wrap' }}>
          {[
            { text: '블록체인 검증' },
            { text: 'QR 코드 인증' },
            { text: '디지털 월렛 호환' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 14, color: '#475569', fontWeight: 500,
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6,
                background: 'rgba(201,168,76,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#C9A84C', fontSize: 11, fontWeight: 700 }}>✓</span>
              </div>
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
  const isMobile = useIsMobile();
  return (
    <section id="pricing" style={{
      background: 'linear-gradient(160deg, #060E1F 0%, #0F172A 40%, #1B3A6B 100%)',
      padding: isMobile ? '100px 20px' : '140px 48px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 500, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative' }}>
        {/* Price badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: 100, padding: '8px 20px',
          fontSize: 13, fontWeight: 600, color: '#C9A84C',
          marginBottom: 32,
        }}>
          온라인 연습 ₩14,000 · 본시험 ₩79,000
        </div>

        <h2 style={{
          fontSize: 'clamp(36px, 7vw, 64px)', fontWeight: 900,
          color: '#fff', marginBottom: 20,
          letterSpacing: '-0.04em', lineHeight: 1.1,
          fontFamily: FONT,
        }}>지금 바로 시작하세요.</h2>
        <p style={{
          color: 'rgba(255,255,255,0.5)', fontSize: 18,
          marginBottom: 52, maxWidth: 560, margin: '0 auto 52px',
          lineHeight: 1.8,
        }}>
          온라인 연습으로 지금 내 수준을 확인하고,<br />
          본시험으로 공식 인증받으세요.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#practice" style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.18)',
            color: 'rgba(255,255,255,0.9)',
            borderRadius: 12, padding: '18px 40px',
            fontWeight: 600, fontSize: 16,
            transition: 'all 0.2s',
            textDecoration: 'none',
            backdropFilter: 'blur(4px)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
          >온라인 연습 ₩14,000</a>
          <a href="#register" style={{
            background: 'linear-gradient(135deg, #C9A84C 0%, #D4B65E 100%)',
            color: '#0A1628',
            borderRadius: 12, padding: '18px 40px',
            fontWeight: 800, fontSize: 16,
            letterSpacing: '-0.01em',
            transition: 'transform 0.2s, box-shadow 0.2s',
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(201,168,76,0.25)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,168,76,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,168,76,0.25)'; }}
          >본시험 접수 ₩79,000</a>
        </div>
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

  const isMobile = useIsMobile();
  return (
    <footer style={{ background: '#0A0F1A', padding: isMobile ? '60px 20px 32px' : '80px 48px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top: columns */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(160px, 1fr))', gap: isMobile ? 32 : 48, marginBottom: isMobile ? 40 : 64 }}>
          {/* Brand column */}
          <div>
            <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 20, letterSpacing: '-0.04em', color: '#fff', display: 'inline-block', marginBottom: 16 }}>TAPEX</span>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.8, marginBottom: 16 }}>
              Test of AI Prompt EXpertise<br />
              세계 최초 AI 활용 능력 인증 시험
            </p>
            <p style={{ fontSize: 13, color: '#475569' }}>contact@tapex.kr</p>
          </div>

          {columns.map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8', marginBottom: 20, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>{col.title}</div>
              {col.links.map((link, j) => (
                <a key={j} href="#" style={{
                  display: 'block', fontSize: 13, color: '#475569',
                  marginBottom: 12, textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                >{link}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 32 }}>
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
      <SectionDivider />
      <TrustNumbersSection />
      <WhyTapexSection />
      <SectionDivider color="#E2E8F0" />
      <PersonaSection />
      <SectionDivider />
      <ExamCategorySection />
      <SectionDivider color="#E2E8F0" />
      <GradeSection />
      <SectionDivider />
      <EnterpriseSection />
      <SectionDivider color="#E2E8F0" />
      <PartnerSection />
      <SectionDivider />
      <CertificationBadgeSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
