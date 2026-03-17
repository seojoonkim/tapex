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
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  } as React.CSSProperties;
}

/* ─── NavBar ─── */
function NavBar() {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: 64 }}>
      <span style={{ fontWeight: 900, fontSize: 22, color: '#1B3A6B', fontFamily: 'system-ui' }}>TAPEX</span>
      <div style={{ display: 'flex', gap: 28, fontSize: 14, color: '#374151' }}>
        <a href="#exam" style={{ textDecoration: 'none', color: 'inherit' }}>시험안내</a>
        <a href="#grade" style={{ textDecoration: 'none', color: 'inherit' }}>점수·등급</a>
        <a href="#pricing" style={{ textDecoration: 'none', color: 'inherit' }}>응시료</a>
        <a href="#enterprise" style={{ textDecoration: 'none', color: 'inherit' }}>기업</a>
      </div>
      <a href="#register" style={{ background: '#1B3A6B', color: '#fff', borderRadius: 24, padding: '8px 20px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>시험 접수</a>
    </nav>
  );
}

/* ─── Section 1: Hero ─── */
function HeroSection() {
  const fade = useFadeIn(100);
  return (
    <section style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0A1628 0%, #1B3A6B 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 40px', textAlign: 'center' }}>
      <div style={fade}>
        {/* 신뢰 배지 */}
        <div style={{ border: '1px solid rgba(201,168,76,0.5)', background: 'rgba(201,168,76,0.1)', borderRadius: 24, padding: '6px 20px', fontSize: 12, color: '#C9A84C', marginBottom: 32, display: 'inline-block' }}>
          한국경제신문 인증 &nbsp;|&nbsp; 세계 최초 4대 LLM 통합 시험
        </div>

        {/* 헤드라인 */}
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 24, fontFamily: 'system-ui' }}>
          AI를 잘 쓰는 사람의 기준,<br />
          <span style={{ background: 'linear-gradient(135deg, #C9A84C, #E8D48B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TAPEX.</span>
        </h1>

        <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 600, color: '#C9A84C', marginBottom: 16 }}>990점으로 증명하세요.</p>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 600, lineHeight: 1.7, marginBottom: 48, margin: '0 auto 48px' }}>
          4대 LLM을 실시간으로 다루는 능력을 측정하는 세계 최초의 AI 활용 능력 인증 시험.<br />
          ChatGPT · Claude · Gemini · Grok
        </p>

        {/* CTA 버튼 */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#register" style={{ background: '#C9A84C', color: '#0A1628', borderRadius: 32, padding: '14px 32px', fontWeight: 800, fontSize: 16, textDecoration: 'none' }}>시험 접수하기</a>
          <a href="#practice" style={{ border: '2px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 32, padding: '14px 32px', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>온라인 연습 시작</a>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: Stats ─── */
function StatsSection() {
  const stats = [
    { num: '80문항', desc: '4섹션 × 20문항, 120분' },
    { num: '10~990점', desc: 'TOEIC과 동일한 990점 만점 체계' },
    { num: '4개 LLM', desc: 'ChatGPT · Claude · Gemini · Grok' },
    { num: '2년', desc: '갱신 시 30% 할인' },
  ];
  return (
    <section style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: '#F7F8FA', borderRadius: 20, padding: '32px 24px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: 'clamp(28px,5vw,40px)', fontWeight: 900, color: '#1B3A6B', fontFamily: 'system-ui' }}>{s.num}</div>
            <div style={{ fontSize: 13, color: '#6B7280', marginTop: 8 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Section 3: Why TAPEX ─── */
function WhyTapexSection() {
  return (
    <section id="exam" style={{ background: '#F7F8FA', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
        {/* 좌측 텍스트 */}
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: 'clamp(28px,5vw,40px)', fontWeight: 900, color: '#1B3A6B', marginBottom: 24, fontFamily: 'system-ui' }}>일은 이미 AI가 하고 있다</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            보고서를 쓰는 것도, 코드를 짜는 것도, 데이터를 분석하는 것도 — 이제 사람이 직접 하는 것이 아니라 AI에게 시키는 것이 됐습니다.
          </p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            같은 AI를 쓰더라도, 프롬프트를 잘 쓰는 사람과 못 쓰는 사람의 결과물 차이는 <strong>10배 이상</strong>입니다.
          </p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 24 }}>
            영어 능력에는 TOEIC이 있고, 코딩에는 코딩 테스트가 있습니다.<br />
            그런데 AI 활용 능력을 측정하는 표준화된 시험은 — 전 세계 어디에도 없었습니다.
          </p>
          <p style={{ fontSize: 18, fontWeight: 800, color: '#1B3A6B' }}>TAPEX가 그 빈자리를 채웁니다.</p>
        </div>

        {/* 우측 인포그래픽 */}
        <div style={{ flex: '1 1 340px', maxWidth: 400, margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            {[
              { label: 'TOEIC', desc: '영어 능력', bold: false },
              { label: '코딩 테스트', desc: '개발 역량', bold: false },
              { label: 'TAPEX', desc: 'AI 활용 능력', bold: true },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, borderRadius: 12, padding: 16, marginBottom: i < 2 ? 12 : 0, background: item.bold ? 'rgba(27,58,107,0.05)' : '#F9FAFB', border: item.bold ? '2px solid #1B3A6B' : '1px solid #E5E7EB' }}>
                <div style={{ fontSize: 14, fontWeight: 700, width: 100, color: item.bold ? '#1B3A6B' : '#374151' }}>{item.label}</div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>→</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: item.bold ? '#1B3A6B' : '#6B7280' }}>{item.desc}</div>
                {item.bold && <div style={{ marginLeft: 'auto', background: '#C9A84C', color: '#0A1628', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 800 }}>NEW</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI 이미지 */}
      <div style={{ maxWidth: 1100, margin: '64px auto 0' }}>
        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80" alt="AI 근무" style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 20 }} />
      </div>
    </section>
  );
}

/* ─── Section 4: Persona Cards ─── */
function PersonaSection() {
  const personas = [
    { emoji: '🎓', title: '취준생 / 대학생', quote: '"이력서에 쓸 수 있는 AI 스펙이 필요해요."', detail: 'TAPEX Bronze~Silver로 서류 통과율을 높이세요. 학생 40% 할인 적용.' },
    { emoji: '💼', title: '직장인 / 이직자', quote: '"AI 잘 쓴다는 걸 숫자로 증명하고 싶어요."', detail: 'TAPEX Gold 이상이면 연봉 협상, 승진 어필에 활용할 수 있습니다.' },
    { emoji: '🎨', title: '프리랜서 / 크리에이터', quote: '"클라이언트에게 AI 역량을 보여줄 방법이 없었어요."', detail: 'TAPEX 점수 + 직무별 마이크로 배지로 전문성을 입증하세요.' },
    { emoji: '🏢', title: '기업 HR / 교육 담당자', quote: '"AI 잘 쓰는 사람을 어떻게 걸러야 할지 모르겠어요."', detail: 'TAPEX 점수로 채용 기준을 세우고, 임직원 AI 역량을 측정하세요.' },
  ];
  return (
    <section style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px,5vw,40px)', fontWeight: 900, color: '#1B3A6B', textAlign: 'center', marginBottom: 8, fontFamily: 'system-ui' }}>이런 분이 응시합니다</h2>
        <p style={{ textAlign: 'center', marginBottom: 48, fontSize: 14, color: '#6B7280' }}>취준생부터 기업 HR까지 — AI 활용 능력이 필요한 모든 분께</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {personas.map((p, i) => (
            <div key={i} style={{ background: '#F7F8FA', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{p.emoji}</div>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: '#1B3A6B', marginBottom: 8 }}>{p.title}</h3>
              <p style={{ fontSize: 14, fontStyle: 'italic', color: '#6B7280', marginBottom: 12 }}>{p.quote}</p>
              <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5: LLM 4개 섹션 ─── */
function LLMSection() {
  const llms = [
    { section: 'A', name: 'ChatGPT', sub: '범용 대화', color: '#10A37F', desc: '프롬프트 최적화 · 대화 시나리오 설계 · 출력 품질 평가 · 자동화 워크플로우' },
    { section: 'B', name: 'Claude', sub: '장문 분석/코딩', color: '#7B4F9E', desc: '장문 요약·분석 · 코드 생성·디버깅 · 논리적 추론 · 시스템 프롬프트 설계' },
    { section: 'C', name: 'Gemini', sub: '멀티모달/검색', color: '#1A73E8', desc: '이미지 분석 프롬프팅 · 검색 연동 질의 · 데이터 시각화 지시 · 멀티모달 통합' },
    { section: 'D', name: 'Grok', sub: '크로스-LLM 적응', color: '#E66C37', desc: 'LLM 비교 분석 · 모델 선택 전략 · 한계 인지·우회 · 실시간 정보 활용' },
  ];
  return (
    <section style={{ background: '#F7F8FA', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px,5vw,40px)', fontWeight: 900, color: '#1B3A6B', textAlign: 'center', marginBottom: 8, fontFamily: 'system-ui' }}>4대 LLM으로 측정합니다</h2>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#6B7280', marginBottom: 48 }}>특정 AI에 종속되지 않는 — 범용 AI 리터러시를 평가합니다</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {llms.map((l, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: l.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, marginBottom: 12 }}>{l.section}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1B3A6B', marginBottom: 4 }}>{l.name}</div>
              <div style={{ display: 'inline-block', background: `${l.color}20`, color: l.color, borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 600, marginBottom: 12 }}>{l.sub}</div>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 6: Grade System ─── */
function GradeSection() {
  const grades = [
    { range: '10~199', name: 'Novice', badge: '', color: '#D1D5DB', bg: '#F9FAFB', desc: 'AI를 처음 접하는 분' },
    { range: '200~449', name: 'Developing', badge: '', color: '#9CA3AF', bg: '#F3F4F6', desc: 'AI를 가끔 사용하는 분' },
    { range: '450~649', name: 'Bronze', badge: '🥉', color: '#CD7F32', bg: '#FEF9EC', desc: '대학생·신입 수준의 AI 활용' },
    { range: '650~749', name: 'Silver', badge: '🥈', color: '#8C9BAB', bg: '#F8FAFC', desc: '주니어~미드 직장인' },
    { range: '750~849', name: 'Gold', badge: '🥇', color: '#C9A84C', bg: '#FEF9EC', desc: '시니어·매니저급' },
    { range: '850~990', name: 'Platinum', badge: '💎', color: '#7C3AED', bg: '#F5F3FF', desc: '리더·전문가급 / 상위 1%' },
  ];
  return (
    <section id="grade" style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px,5vw,40px)', fontWeight: 900, color: '#1B3A6B', textAlign: 'center', marginBottom: 48, fontFamily: 'system-ui' }}>당신의 점수는 어디에?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {grades.map((g, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, borderRadius: 12, padding: 16, background: g.bg, border: `1px solid ${g.color}40` }}>
              <div style={{ fontSize: 24, width: 32, textAlign: 'center' }}>{g.badge}</div>
              <div style={{ width: 100, fontSize: 14, fontWeight: 700, color: g.color }}>{g.name}</div>
              <div style={{ background: `${g.color}20`, color: g.color, borderRadius: 6, padding: '2px 8px', fontSize: 12, fontFamily: 'monospace' }}>{g.range}점</div>
              <div style={{ fontSize: 13, color: '#6B7280', marginLeft: 8 }}>{g.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 7: 기업 섹션 ─── */
function EnterpriseSection() {
  return (
    <section id="enterprise" style={{ background: '#F7F8FA', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: 'clamp(28px,5vw,40px)', fontWeight: 900, color: '#1B3A6B', marginBottom: 24, fontFamily: 'system-ui' }}>AI 잘 쓰는 사람,<br />TAPEX 점수로 찾으세요</h2>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 24 }}>
            서류 전형에 TAPEX 점수 기준을 적용하세요. &quot;AI 활용 가능&quot; 같은 모호한 자기소개 대신, 990점 척도의 객관적 수치로 지원자를 평가할 수 있습니다.
          </p>
          <a href="/enterprise" style={{ display: 'inline-block', background: '#1B3A6B', color: '#fff', borderRadius: 32, padding: '12px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>기업 도입 문의 →</a>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80" alt="기업 AI 교육" style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 20 }} />
        </div>
      </div>
    </section>
  );
}

/* ─── Section 8: 파트너 로고 ─── */
function PartnerSection() {
  return (
    <section style={{ background: '#fff', padding: '64px 24px', textAlign: 'center' }}>
      <p style={{ fontSize: 11, letterSpacing: '0.25em', color: '#9CA3AF', textTransform: 'uppercase' as const, marginBottom: 40 }}>인증 파트너</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60, flexWrap: 'wrap' }}>
        <img src="/logos/hankook.jpg" alt="한국경제신문" style={{ height: 40, objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.6 }} />
        <img src="/logos/hashed.jpg" alt="HASHED" style={{ height: 32, objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.6 }} />
        <img src="/logos/bloomingbit.jpg" alt="bloomingbit" style={{ height: 32, objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.6 }} />
      </div>
    </section>
  );
}

/* ─── Section 9: CTA Footer ─── */
function CTASection() {
  return (
    <section id="pricing" style={{ background: 'linear-gradient(135deg, #1B3A6B, #0A1628)', padding: '96px 24px', textAlign: 'center' }}>
      <h2 style={{ fontSize: 'clamp(32px,6vw,56px)', fontWeight: 900, color: '#fff', marginBottom: 16, fontFamily: 'system-ui' }}>지금 바로 시작하세요.</h2>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, marginBottom: 40 }}>온라인 연습으로 내 AI 활용 점수를 미리 확인해보세요.</p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="#practice" style={{ border: '2px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 32, padding: '14px 32px', fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>온라인 연습 ₩14,000</a>
        <a href="#register" style={{ background: '#C9A84C', color: '#0A1628', borderRadius: 32, padding: '14px 32px', fontWeight: 800, textDecoration: 'none', fontSize: 16 }}>본시험 접수 ₩79,000</a>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function FooterSection() {
  return (
    <footer style={{ background: '#0F172A', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ fontWeight: 900, fontSize: 20, color: '#1B3A6B', marginBottom: 8 }}>TAPEX</div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>© 2026 TAPEX. 한국경제신문 인증.</p>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <main style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', margin: 0, padding: 0 }}>
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
