'use client';

import { useState, useEffect } from 'react';

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

const FONT = "'DM Sans', 'Noto Sans KR', -apple-system, sans-serif";

/* ─── NavBar ─── */
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
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
      <span style={{ fontWeight: 900, fontSize: 18, color: '#0F172A', letterSpacing: '-0.5px', fontFamily: FONT }}>TAPEX</span>
      
      {/* Desktop menu - centered */}
      <div style={{
        flex: 1, display: 'flex', justifyContent: 'center', gap: 32,
        fontSize: 14, fontWeight: 500, color: '#64748B',
      }}>
        {[
          { href: '#exam', label: '시험안내' },
          { href: '#grade', label: '점수·등급' },
          { href: '#pricing', label: '응시료' },
          { href: '#enterprise', label: '기업' },
        ].map(item => (
          <a key={item.href} href={item.href} style={{ transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0F172A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
          >{item.label}</a>
        ))}
      </div>

      <a href="#register" style={{
        background: '#0F172A', color: '#fff',
        borderRadius: 8, padding: '10px 22px',
        fontSize: 14, fontWeight: 600,
      }}>시험 접수</a>
    </nav>
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
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', display: 'inline-block' }} />
        한국경제신문 인증 · 세계 최초 4대 LLM 통합 시험
      </div>

      {/* Headline */}
      <h1 style={{
        ...fade2,
        fontSize: 'clamp(48px, 9vw, 96px)',
        fontWeight: 900,
        color: '#fff',
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        marginBottom: 28,
        maxWidth: 900,
        fontFamily: FONT,
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
        lineHeight: 1.7,
        marginBottom: 52,
        fontWeight: 400,
      }}>
        ChatGPT · Claude · Gemini · Grok<br />
        4대 AI를 실전에서 다루는 능력을 측정하는 세계 최초의 AI 활용 능력 인증 시험
      </p>

      {/* CTA */}
      <div style={{ ...fade3, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="#register" style={{
          background: '#C9A84C', color: '#0A1628',
          borderRadius: 10, padding: '16px 36px',
          fontWeight: 700, fontSize: 16,
          letterSpacing: '-0.01em',
          transition: 'transform 0.2s, box-shadow 0.2s',
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
              color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1,
              fontFamily: FONT,
            }}>{s.num}</div>
            <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 10, lineHeight: 1.5 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Why TAPEX ─── */
function WhyTapexSection() {
  return (
    <section id="exam" style={{ background: '#F8FAFC', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        {/* Left text */}
        <div style={{ flex: '1 1 440px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>WHY TAPEX</p>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900,
            color: '#0F172A', marginBottom: 28,
            letterSpacing: '-0.02em', lineHeight: 1.2,
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

        {/* Right infographic */}
        <div style={{ flex: '1 1 380px', maxWidth: 440 }}>
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
    { title: '취준생 · 대학생', quote: '"AI 잘 쓴다고 써봤는데, 증명할 방법이 없더라고요."', detail: 'TAPEX Bronze(450점+)면 서류 통과율이 달라집니다. 학생 40% 할인, 링크드인 배지 발급.', accent: '#C9A84C' },
    { title: '직장인 · 이직자', quote: '"팀에서 제가 AI 제일 잘 쓰는데, 아무도 몰라요."', detail: 'TAPEX Gold(750점+)로 승진 심사, 연봉 협상, 이직 시 즉시 활용 가능한 스펙.', accent: '#1B3A6B' },
    { title: '프리랜서 · 크리에이터', quote: '"클라이언트가 AI 쓸 수 있냐고 물어보는데."', detail: 'TAPEX 점수 + 직무별 마이크로 배지로 포트폴리오를 강화하세요.', accent: '#7C3AED' },
    { title: '기업 HR · 교육 담당', quote: '"AI 활용 가능이 50%인데, 누구를 믿죠?"', detail: 'TAPEX for Recruit API로 지원자 점수를 자동 검증. 잡코리아·사람인 연동.', accent: '#059669' },
  ];

  return (
    <section style={{ background: '#fff', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12, textAlign: 'center' }}>FOR EVERYONE</p>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900,
          color: '#0F172A', textAlign: 'center', marginBottom: 16,
          letterSpacing: '-0.02em', fontFamily: FONT,
        }}>이런 분이 응시합니다</h2>
        <p style={{ textAlign: 'center', marginBottom: 56, fontSize: 16, color: '#94A3B8', fontWeight: 400 }}>
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
              <h3 style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', marginBottom: 12 }}>{p.title}</h3>
              <p style={{ fontSize: 14, fontStyle: 'italic', color: '#94A3B8', marginBottom: 16, lineHeight: 1.6 }}>{p.quote}</p>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7 }}>{p.detail}</p>
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

  return (
    <section style={{ background: '#F8FAFC', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12, textAlign: 'center' }}>4 LLMs</p>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900,
          color: '#0F172A', textAlign: 'center', marginBottom: 16,
          letterSpacing: '-0.02em', fontFamily: FONT,
        }}>4대 LLM으로 측정합니다</h2>
        <p style={{ textAlign: 'center', fontSize: 16, color: '#94A3B8', marginBottom: 56 }}>
          특정 AI에 종속되지 않는 — 범용 AI 리터러시를 평가합니다
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {llms.map((l, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, padding: '32px 28px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#94A3B8',
                marginBottom: 16, letterSpacing: '0.05em',
              }}>SECTION {l.section}</div>
              <div style={{
                fontWeight: 800, fontSize: 24, color: '#0F172A',
                marginBottom: 6, letterSpacing: '-0.02em', fontFamily: FONT,
              }}>{l.name}</div>
              <div style={{
                display: 'inline-block',
                background: `${l.color}12`, color: l.color,
                borderRadius: 6, padding: '3px 10px',
                fontSize: 12, fontWeight: 600, marginBottom: 16,
              }}>{l.sub}</div>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7 }}>{l.desc}</p>
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

  return (
    <section id="grade" style={{ background: '#fff', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12, textAlign: 'center' }}>GRADE SYSTEM</p>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900,
          color: '#0F172A', textAlign: 'center', marginBottom: 56,
          letterSpacing: '-0.02em', fontFamily: FONT,
        }}>당신의 점수는 어디에?</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
          {grades.map((g, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 14, padding: '28px 24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              borderTop: `3px solid ${g.color}`,
              display: 'flex', alignItems: 'center', gap: 20,
            }}>
              <div>
                <div style={{
                  fontSize: 28, fontWeight: 900, color: g.color,
                  fontFamily: FONT, letterSpacing: '-0.02em', lineHeight: 1,
                }}>{g.range}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>점</div>
              </div>
              <div style={{ borderLeft: '1px solid #F1F5F9', paddingLeft: 20, flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', marginBottom: 4 }}>{g.name}</div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>{g.desc}</div>
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
  return (
    <section id="enterprise" style={{ background: '#F8FAFC', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 440px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>FOR ENTERPRISE</p>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900,
            color: '#0F172A', marginBottom: 28,
            letterSpacing: '-0.02em', lineHeight: 1.2,
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
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >기업 도입 문의 →</a>
        </div>
        <div style={{ flex: '1 1 440px' }}>
          <img
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
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
          <img src="/logos/bloomingbit.jpg" alt="bloomingbit" style={{ height: 36, width: 'auto', objectFit: 'contain', filter: 'grayscale(100%) contrast(1.3)', opacity: 0.55, mixBlendMode: 'multiply' }} />
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
        letterSpacing: '-0.03em', lineHeight: 1.1,
        fontFamily: FONT,
        position: 'relative',
      }}>지금 바로 시작하세요.</h2>
      <p style={{
        color: 'rgba(255,255,255,0.5)', fontSize: 18,
        marginBottom: 52, maxWidth: 560, margin: '0 auto 52px',
        lineHeight: 1.7, position: 'relative',
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
        }}>온라인 연습 ₩14,000</a>
        <a href="#register" style={{
          background: '#C9A84C', color: '#0A1628',
          borderRadius: 10, padding: '16px 36px',
          fontWeight: 800, fontSize: 16,
          letterSpacing: '-0.01em',
          transition: 'transform 0.2s, box-shadow 0.2s',
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
  return (
    <footer style={{ background: '#0F172A', padding: '60px 48px' }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 24,
      }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 20, color: '#fff', marginBottom: 4, fontFamily: FONT }}>TAPEX</div>
          <div style={{ fontSize: 13, color: '#475569' }}>Test of AI Prompt EXpertise</div>
        </div>
        <div style={{ fontSize: 13, color: '#475569' }}>© 2026 TAPEX · 한국경제신문 인증</div>
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
      <WhyTapexSection />
      <PersonaSection />
      <LLMSection />
      <GradeSection />
      <EnterpriseSection />
      <PartnerSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
