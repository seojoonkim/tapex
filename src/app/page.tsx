'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, GraduationCap, Briefcase, Palette, Building2 } from 'lucide-react';

const NAVY = '#1B3A6B';
const GOLD = '#C9A84C';
const BG_ALT = '#F7F8FA';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fadeUp(delay = 0): any {
  return {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  };
}

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center" style={{ background: 'linear-gradient(160deg, #0A1628 0%, #1B3A6B 100%)' }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-10 blur-[120px]" style={{ background: '#C9A84C' }} />
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-4xl">
        <div className="mx-auto mb-8 inline-block rounded-full px-5 py-2 text-xs sm:text-sm" style={{ border: `1px solid ${GOLD}80`, background: `${GOLD}15`, color: GOLD }}>
          한국경제신문 인증 &nbsp;|&nbsp; 세계 최초 4대 LLM 통합 시험
        </div>
        <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl md:text-7xl">
          AI를 잘 쓰는 사람의 기준,<br />
          <span className="text-gradient-gold">TAPEX.</span>
        </h1>
        <p className="mt-6 text-xl font-semibold sm:text-2xl" style={{ color: GOLD }}>990점으로 증명하세요.</p>
        <p className="mt-4 text-sm text-gray-300 sm:text-base">
          4대 LLM을 실시간으로 다루는 능력을 측정하는 세계 최초의 AI 활용 능력 인증 시험.<br className="hidden sm:block" />
          ChatGPT · Claude · Gemini · Grok — 프롬프트를 증명하고, 미래를 움직여라.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="#register" className="rounded-full px-8 py-3.5 text-base font-bold transition-all hover:brightness-110" style={{ background: GOLD, color: '#0A1628' }}>시험 접수하기</a>
          <a href="#practice" className="rounded-full px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-white/10" style={{ border: '2px solid rgba(255,255,255,0.3)' }}>온라인 연습 시작</a>
        </div>
      </motion.div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow text-white/40">
        <ChevronDown size={28} />
      </div>
    </section>
  );
}

/* ─── Stats ─── */
function StatsSection() {
  const stats = [
    { num: '80문항', desc: '4섹션 × 20문항, 120분' },
    { num: '10~990점', desc: 'TOEIC과 동일한 990점 만점 체계' },
    { num: '4개 LLM', desc: 'ChatGPT · Claude · Gemini · Grok' },
    { num: '2년', desc: '갱신 시 30% 할인' },
  ];
  return (
    <section className="py-16 px-4" style={{ background: '#fff' }}>
      <div className="mx-auto max-w-5xl grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={i} {...fadeUp(i * 0.1)} className="rounded-2xl p-6 text-center" style={{ background: BG_ALT, border: '1px solid #E5E7EB' }}>
            <div className="font-display text-3xl sm:text-4xl" style={{ color: NAVY }}>{s.num}</div>
            <div className="mt-2 text-xs sm:text-sm" style={{ color: '#6B7280' }}>{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Why TAPEX ─── */
function WhyTapexSection() {
  return (
    <section className="py-20 px-4" style={{ background: BG_ALT }}>
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-12 items-center">
        <motion.div {...fadeUp()} className="flex-1">
          <h2 className="font-display text-3xl sm:text-4xl mb-6" style={{ color: NAVY }}>일은 이미 AI가 하고 있다</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
            보고서를 쓰는 것도, 코드를 짜는 것도, 데이터를 분석하는 것도 — 이제 사람이 직접 하는 것이 아니라 AI에게 시키는 것이 됐습니다.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
            같은 AI를 쓰더라도, 프롬프트를 잘 쓰는 사람과 못 쓰는 사람의 결과물 차이는 <strong>10배 이상</strong>입니다.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: '#374151' }}>
            영어 능력에는 TOEIC이 있고, 코딩에는 코딩 테스트가 있습니다.<br />
            그런데 AI 활용 능력을 측정하는 표준화된 시험은 — 전 세계 어디에도 없었습니다.
          </p>
          <p className="text-base font-bold" style={{ color: NAVY }}>TAPEX가 그 빈자리를 채웁니다.</p>
        </motion.div>

        {/* 인포그래픽 */}
        <motion.div {...fadeUp(0.2)} className="flex-1 max-w-sm mx-auto">
          <div className="rounded-2xl p-6 space-y-4" style={{ background: '#fff', border: '1px solid #E5E7EB', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            {[
              { label: 'TOEIC', desc: '영어 능력', color: '#6B7280' },
              { label: '코딩 테스트', desc: '개발 역량', color: '#6B7280' },
              { label: 'TAPEX', desc: 'AI 활용 능력', color: NAVY, bold: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl p-4" style={{ background: item.bold ? `${NAVY}08` : '#F9FAFB', border: item.bold ? `2px solid ${NAVY}` : '1px solid #E5E7EB' }}>
                <div className="text-sm font-bold w-28" style={{ color: item.bold ? NAVY : '#374151' }}>{item.label}</div>
                <div className="text-xs" style={{ color: '#6B7280' }}>→</div>
                <div className="text-sm font-semibold" style={{ color: item.bold ? NAVY : '#6B7280' }}>{item.desc}</div>
                {item.bold && <div className="ml-auto rounded-full px-2 py-0.5 text-xs font-bold" style={{ background: GOLD, color: '#0A1628' }}>NEW</div>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI 이미지 */}
      <motion.div {...fadeUp(0.3)} className="mt-16 mx-auto max-w-5xl">
        <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden" style={{ background: '#1B3A6B' }}>
          <Image
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80"
            alt="AI로 일하는 전문가"
            fill
            className="object-cover opacity-80"
            unoptimized
          />
          <div className="absolute inset-0 flex items-end p-6" style={{ background: 'linear-gradient(to top, rgba(27,58,107,0.8) 0%, transparent 60%)' }}>
            <p className="text-white font-semibold text-sm">"AI를 잘 쓰는 사람이 미래의 핵심 인재입니다"</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Persona Cards ─── */
function PersonaSection() {
  const personas = [
    { icon: GraduationCap, title: '취준생 / 대학생', quote: '"이력서에 쓸 수 있는 AI 스펙이 필요해요."', detail: 'TAPEX Bronze~Silver로 서류 통과율을 높이세요. 학생 40% 할인 적용.' },
    { icon: Briefcase, title: '직장인 / 이직자', quote: '"AI 잘 쓴다는 걸 숫자로 증명하고 싶어요."', detail: 'TAPEX Gold 이상이면 연봉 협상, 승진 어필에 활용할 수 있습니다.' },
    { icon: Palette, title: '프리랜서 / 크리에이터', quote: '"클라이언트에게 AI 역량을 보여줄 방법이 없었어요."', detail: 'TAPEX 점수 + 직무별 마이크로 배지로 전문성을 입증하세요.' },
    { icon: Building2, title: '기업 HR / 교육 담당자', quote: '"AI 잘 쓰는 사람을 어떻게 걸러야 할지 모르겠어요."', detail: 'TAPEX 점수로 채용 기준을 세우고, 임직원 AI 역량을 측정하세요.' },
  ];
  return (
    <section className="py-20 px-4" style={{ background: '#fff' }}>
      <div className="mx-auto max-w-6xl">
        <motion.h2 {...fadeUp()} className="font-display text-3xl sm:text-4xl text-center mb-4" style={{ color: NAVY }}>이런 분이 응시합니다</motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-center mb-12 text-sm" style={{ color: '#6B7280' }}>취준생부터 기업 HR까지 — AI 활용 능력이 필요한 모든 분께</motion.p>

        {/* 팀 이미지 */}
        <motion.div {...fadeUp(0.15)} className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden mb-12">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
            alt="AI 시대의 인재"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(27,58,107,0.7) 0%, rgba(27,58,107,0.2) 100%)' }} />
          <div className="absolute inset-0 flex items-center px-8">
            <p className="text-white font-display text-xl sm:text-3xl max-w-md">AI 시대의 인재는<br /><span className="text-gradient-gold">프롬프트</span>로 말합니다</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((p, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} className="rounded-2xl p-6 transition-all hover:-translate-y-1" style={{ background: BG_ALT, border: '1px solid #E5E7EB', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: `${NAVY}10` }}>
                <p.icon size={22} style={{ color: NAVY }} />
              </div>
              <h3 className="font-bold text-sm mb-2" style={{ color: NAVY }}>{p.title}</h3>
              <p className="text-sm italic mb-3" style={{ color: '#6B7280' }}>{p.quote}</p>
              <p className="text-xs leading-relaxed" style={{ color: '#374151' }}>{p.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Comparison ─── */
function ComparisonSection() {
  const rows = [
    { label: '시험 방식', tapex: '실제 LLM과 실시간 대화', other: '객관식 이론 시험' },
    { label: 'LLM', tapex: 'ChatGPT·Claude·Gemini·Grok 4개 통합', other: '0~1개 (특정 벤더 종속)' },
    { label: '점수', tapex: '10~990 세밀한 연속 점수', other: 'Pass/Fail 또는 단순 등급' },
    { label: '실무 반영', tapex: '프롬프트 작성, 출력 평가, 워크플로우', other: '이론 지식 암기' },
    { label: '자격증', tapex: '블록체인 기반 디지털 배지, LinkedIn 연동', other: '종이 인증서' },
  ];
  return (
    <section className="py-20 px-4" style={{ background: BG_ALT }}>
      <div className="mx-auto max-w-4xl">
        <motion.h2 {...fadeUp()} className="font-display text-3xl sm:text-4xl text-center mb-12" style={{ color: NAVY }}>TAPEX vs 기존 AI 자격증</motion.h2>
        <motion.div {...fadeUp(0.1)} className="overflow-hidden rounded-2xl" style={{ border: '1px solid #E5E7EB', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide" style={{ background: '#F1F5F9', color: '#6B7280', borderBottom: '1px solid #E5E7EB' }}>항목</th>
                <th className="p-4 text-center text-xs font-bold uppercase tracking-wide" style={{ background: `${NAVY}08`, color: NAVY, borderBottom: '1px solid #E5E7EB', borderLeft: `3px solid ${NAVY}` }}>TAPEX</th>
                <th className="p-4 text-center text-xs font-semibold uppercase tracking-wide" style={{ background: '#F1F5F9', color: '#6B7280', borderBottom: '1px solid #E5E7EB' }}>기존 AI 자격증</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                  <td className="p-4 font-medium text-xs" style={{ color: '#374151', background: '#fff' }}>{r.label}</td>
                  <td className="p-4 text-center text-xs font-medium" style={{ color: NAVY, background: `${NAVY}04`, borderLeft: `3px solid ${NAVY}` }}>{r.tapex}</td>
                  <td className="p-4 text-center text-xs" style={{ color: '#9CA3AF', background: '#fff' }}>{r.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── LLM Sections ─── */
function LLMSection() {
  const llms = [
    { section: 'A', name: 'ChatGPT', sub: '범용 대화', color: '#10A37F', desc: '프롬프트 최적화 · 대화 시나리오 설계 · 출력 품질 평가 · 자동화 워크플로우' },
    { section: 'B', name: 'Claude', sub: '장문 분석/코딩', color: '#7B4F9E', desc: '장문 요약·분석 · 코드 생성·디버깅 · 논리적 추론 · 시스템 프롬프트 설계' },
    { section: 'C', name: 'Gemini', sub: '멀티모달/검색', color: '#1A73E8', desc: '이미지 분석 프롬프팅 · 검색 연동 질의 · 데이터 시각화 지시 · 멀티모달 통합' },
    { section: 'D', name: 'Grok', sub: '크로스-LLM 적응', color: '#E66C37', desc: 'LLM 비교 분석 · 모델 선택 전략 · 한계 인지·우회 · 실시간 정보 활용' },
  ];
  return (
    <section className="py-20 px-4" style={{ background: '#fff' }}>
      <div className="mx-auto max-w-6xl">
        <motion.h2 {...fadeUp()} className="font-display text-3xl sm:text-4xl text-center mb-4" style={{ color: NAVY }}>4대 LLM으로 측정합니다</motion.h2>
        <motion.p {...fadeUp(0.1)} className="text-center text-sm mb-12" style={{ color: '#6B7280' }}>특정 AI에 종속되지 않는 — 범용 AI 리터러시를 평가합니다</motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {llms.map((l, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} className="rounded-2xl p-6" style={{ background: BG_ALT, border: '1px solid #E5E7EB' }}>
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white" style={{ background: l.color }}>
                {l.section}
              </div>
              <div className="font-bold text-sm mb-1" style={{ color: NAVY }}>{l.name}</div>
              <div className="text-xs font-medium mb-3 rounded-full inline-block px-2 py-0.5" style={{ background: `${l.color}15`, color: l.color }}>{l.sub}</div>
              <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>{l.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Grade System ─── */
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
    <section className="py-20 px-4" style={{ background: BG_ALT }}>
      <div className="mx-auto max-w-4xl">
        <motion.h2 {...fadeUp()} className="font-display text-3xl sm:text-4xl text-center mb-12" style={{ color: NAVY }}>당신의 점수는 어디에?</motion.h2>
        <div className="space-y-3">
          {grades.map((g, i) => (
            <motion.div key={i} {...fadeUp(i * 0.07)} className="flex items-center gap-4 rounded-xl p-4 transition-all hover:-translate-x-1" style={{ background: g.bg, border: `1px solid ${g.color}30` }}>
              <div className="text-2xl w-8">{g.badge}</div>
              <div className="w-24 text-sm font-bold" style={{ color: g.color }}>{g.name}</div>
              <div className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${g.color}15`, color: g.color }}>{g.range}점</div>
              <div className="text-xs ml-2" style={{ color: '#6B7280' }}>{g.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Partner Section ─── */
function PartnerSection() {
  return (
    <section className="py-16 px-4" style={{ background: '#fff' }}>
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-10" style={{ color: '#9CA3AF' }}>인증 파트너</p>
        <div className="flex flex-wrap items-center justify-center gap-12">
          <img src="/logos/hankook.jpg" alt="한국경제신문" className="h-10 w-auto object-contain transition-all grayscale hover:grayscale-0 hover:opacity-100 opacity-60" />
          <img src="/logos/hashed.jpg" alt="#HASHED" className="h-8 w-auto object-contain transition-all grayscale hover:grayscale-0 hover:opacity-100 opacity-60" />
          <img src="/logos/bloomingbit.jpg" alt="bloomingbit" className="h-8 w-auto object-contain transition-all grayscale hover:grayscale-0 hover:opacity-100 opacity-60" />
        </div>
        <p className="mt-8 text-sm" style={{ color: '#9CA3AF' }}>TAPEX는 한국경제신문이 인증하는 AI 활용 능력 시험입니다.</p>
      </div>
    </section>
  );
}

/* ─── Enterprise Image ─── */
function EnterpriseSection() {
  return (
    <section className="py-20 px-4" style={{ background: BG_ALT }}>
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-12 items-center">
        <motion.div {...fadeUp()} className="flex-1">
          <h2 className="font-display text-3xl sm:text-4xl mb-6" style={{ color: NAVY }}>AI 잘 쓰는 사람,<br />TAPEX 점수로 찾으세요</h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#374151' }}>
            서류 전형에 TAPEX 점수 기준을 적용하세요. "AI 활용 가능" 같은 모호한 자기소개 대신, 990점 척도의 객관적 수치로 지원자를 평가할 수 있습니다.
          </p>
          <a href="/enterprise" className="inline-block rounded-full px-6 py-2.5 text-sm font-bold transition-all hover:brightness-110" style={{ background: NAVY, color: '#fff' }}>기업 도입 문의 →</a>
        </motion.div>
        <motion.div {...fadeUp(0.2)} className="flex-1 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
            alt="기업 AI 교육"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(27,58,107,0.4) 0%, transparent 60%)' }} />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 px-4 text-center" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0A1628 100%)` }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full blur-[100px] opacity-20" style={{ background: GOLD }} />
      </div>
      <div className="relative z-10 mx-auto max-w-2xl">
        <h2 className="font-display text-3xl text-white sm:text-4xl md:text-5xl">지금 바로 시작하세요.</h2>
        <p className="mt-4 text-base text-gray-300 sm:text-lg">온라인 연습으로 내 AI 활용 점수를 미리 확인해보세요.</p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="#practice" className="rounded-full px-8 py-3.5 text-base font-bold transition-all hover:bg-white/20" style={{ border: '2px solid rgba(255,255,255,0.3)', color: '#fff' }}>온라인 연습 ₩14,000</a>
          <a href="#register" className="rounded-full px-8 py-3.5 text-base font-bold transition-all hover:brightness-110" style={{ background: GOLD, color: '#0A1628' }}>본시험 접수 ₩79,000</a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <WhyTapexSection />
      <PersonaSection />
      <ComparisonSection />
      <LLMSection />
      <GradeSection />
      <EnterpriseSection />
      <PartnerSection />
      <CTASection />
    </main>
  );
}
