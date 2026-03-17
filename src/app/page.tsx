'use client';

import { motion } from 'framer-motion';
import {
  ChevronDown,
  GraduationCap,
  Briefcase,
  Palette,
  Building2,
  FileText,
  BarChart3,
  Bot,
  CalendarClock,
} from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* BG glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-tapex-secondary/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-tapex-accent/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {/* Trust badge */}
        <div className="mx-auto mb-8 inline-block rounded-full border border-tapex-accent/50 bg-tapex-accent/10 px-5 py-2 text-xs text-tapex-accent sm:text-sm">
          한국경제신문 인증 &nbsp;|&nbsp; 세계 최초 4대 LLM 통합 시험
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
          AI를 잘 쓰는 사람의 기준,
          <br />
          <span className="text-gradient-gold">TAPEX.</span>
        </h1>

        {/* Sub */}
        <p className="mt-6 text-xl font-semibold text-tapex-accent sm:text-2xl">
          990점으로 증명하세요.
        </p>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-tapex-muted sm:text-lg">
          4대 LLM을 실시간으로 다루는 능력을 측정하는 세계 최초의 AI 활용 능력 인증 시험.
          <br className="hidden sm:block" />
          ChatGPT · Claude · Gemini · Grok — 프롬프트를 증명하고, 미래를 움직여라.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#register"
            className="rounded-full bg-tapex-accent px-8 py-3.5 text-base font-bold text-tapex-primary transition-all hover:brightness-110"
          >
            시험 접수하기
          </a>
          <a
            href="#practice"
            className="rounded-full border border-tapex-accent px-8 py-3.5 text-base font-bold text-tapex-accent transition-all hover:bg-tapex-accent/10"
          >
            온라인 연습 시작
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow text-tapex-muted">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}

/* ─── Stats ─── */
function StatsSection() {
  const stats = [
    { icon: FileText, number: '80', unit: '문항', desc: '4섹션 × 20문항, 120분' },
    { icon: BarChart3, number: '10~990', unit: '점', desc: 'TOEIC과 동일한 990점 만점 체계' },
    { icon: Bot, number: '4', unit: '개 LLM', desc: 'ChatGPT · Claude · Gemini · Grok' },
    { icon: CalendarClock, number: '2', unit: '년 유효', desc: '갱신 시 30% 할인' },
  ];

  return (
    <SectionWrapper className="bg-tapex-primary/50">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-tapex-border bg-tapex-card p-6 text-center"
          >
            <s.icon className="mx-auto mb-3 h-8 w-8 text-tapex-accent" />
            <div className="font-display text-3xl font-bold text-tapex-accent sm:text-4xl">
              {s.number}
              <span className="ml-1 text-lg">{s.unit}</span>
            </div>
            <p className="mt-2 text-sm text-tapex-muted">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ─── Why TAPEX ─── */
function WhyTapexSection() {
  return (
    <SectionWrapper>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left — copy */}
        <div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            일은 이미 AI가 하고 있다
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-tapex-muted sm:text-lg">
            <p>
              보고서를 쓰는 것도, 코드를 짜는 것도, 데이터를 분석하는 것도 — 이제 사람이 직접 하는 것이
              아니라 AI에게 시키는 것이 됐습니다.
            </p>
            <p>
              같은 AI를 쓰더라도, 프롬프트를 잘 쓰는 사람과 못 쓰는 사람의 결과물 차이는{' '}
              <span className="text-tapex-text font-semibold">10배 이상</span>입니다.
            </p>
            <p className="font-semibold text-tapex-text">
              &ldquo;무엇을 아느냐&rdquo;가 아니라, &ldquo;AI에게 무엇을 어떻게 시키느냐&rdquo;가
              생산성을 결정하는 시대.
            </p>
            <p>
              영어 능력에는 TOEIC이 있습니다. 코딩에는 코딩 테스트가 있습니다.
              <br />
              그런데 AI 활용 능력을 측정하는 표준화된 시험은 — 전 세계 어디에도 없었습니다.
            </p>
            <p className="text-tapex-accent font-semibold">TAPEX가 그 빈자리를 채웁니다.</p>
          </div>
        </div>

        {/* Right — infographic */}
        <div className="flex flex-col items-center gap-6">
          {[
            { label: 'TOEIC', desc: '영어 능력', color: 'border-tapex-muted/50 text-tapex-muted' },
            { label: '코딩 테스트', desc: '개발 역량', color: 'border-tapex-muted/50 text-tapex-muted' },
            {
              label: 'TAPEX',
              desc: 'AI 활용 능력',
              color: 'border-tapex-accent text-tapex-accent glow-accent',
              highlight: true,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`flex w-full max-w-sm items-center gap-6 rounded-2xl border-2 bg-tapex-card p-6 ${item.color}`}
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
                  item.highlight
                    ? 'bg-tapex-accent text-tapex-primary'
                    : 'bg-tapex-secondary/50 text-tapex-muted'
                }`}
              >
                {item.label.charAt(0)}
              </div>
              <div>
                <div className="text-lg font-bold">{item.label}</div>
                <div className="text-sm text-tapex-muted">{item.desc}</div>
              </div>
              <svg className="ml-auto h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ─── Persona Cards ─── */
function PersonaSection() {
  const personas = [
    {
      icon: GraduationCap,
      title: '취준생 / 대학생',
      quote: '"이력서에 쓸 수 있는 AI 스펙이 필요해요."',
      point: 'TAPEX Bronze~Silver로 서류 통과율을 높이세요. 학생 40% 할인 적용.',
    },
    {
      icon: Briefcase,
      title: '직장인 / 이직자',
      quote: '"AI 잘 쓴다는 걸 숫자로 증명하고 싶어요."',
      point: 'TAPEX Gold 이상이면 연봉 협상, 승진 어필에 활용할 수 있습니다.',
    },
    {
      icon: Palette,
      title: '프리랜서 / 크리에이터',
      quote: '"클라이언트에게 AI 역량을 보여줄 방법이 없었어요."',
      point: 'TAPEX 점수 + 직무별 마이크로 배지로 전문성을 입증하세요.',
    },
    {
      icon: Building2,
      title: '기업 HR / 교육 담당자',
      quote: '"AI 잘 쓰는 사람을 어떻게 걸러야 할지 모르겠어요."',
      point: 'TAPEX 점수로 채용 기준을 세우고, 임직원 AI 역량을 측정하세요.',
    },
  ];

  return (
    <SectionWrapper className="bg-tapex-primary/30">
      <h2 className="font-display mb-12 text-center text-3xl font-bold sm:text-4xl">
        이런 분이 응시합니다
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {personas.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-2xl border border-tapex-border bg-tapex-card p-6 transition-all hover:border-t-2 hover:border-t-tapex-accent"
          >
            <p.icon className="mb-4 h-8 w-8 text-tapex-accent" />
            <h3 className="mb-3 text-lg font-bold text-tapex-text">{p.title}</h3>
            <p className="mb-4 text-sm italic text-tapex-muted">{p.quote}</p>
            <p className="text-sm text-tapex-muted">{p.point}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ─── Comparison Table ─── */
function ComparisonSection() {
  const rows = [
    { label: '시험 방식', tapex: '실제 LLM과 실시간 대화', other: '객관식 이론 시험' },
    { label: 'LLM', tapex: 'ChatGPT·Claude·Gemini·Grok 4개 통합', other: '0~1개 (벤더 종속)' },
    { label: '점수', tapex: '10~990 세밀한 연속 점수', other: 'Pass/Fail 또는 단순 등급' },
    { label: '실무 반영', tapex: '프롬프트 작성, 출력 평가, 워크플로우 설계', other: '이론 지식 암기' },
    { label: '자격증', tapex: '블록체인 기반 디지털 배지, LinkedIn 연동', other: '종이 인증서' },
    { label: '유효기간', tapex: '2년 (분기별 문항 업데이트)', other: '1~3년 (고정 문항)' },
  ];

  return (
    <SectionWrapper>
      <h2 className="font-display mb-12 text-center text-3xl font-bold sm:text-4xl">
        TAPEX vs 기존 AI 자격증
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="border-b border-tapex-border p-4 text-tapex-muted" />
              <th className="border-b border-tapex-border p-4 text-lg font-bold text-tapex-accent">
                TAPEX
              </th>
              <th className="border-b border-tapex-border p-4 text-lg font-bold text-tapex-muted">
                기존 AI 자격증
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-tapex-border/50">
                <td className="p-4 font-semibold text-tapex-text">{r.label}</td>
                <td className="p-4 text-tapex-text">{r.tapex}</td>
                <td className="p-4 text-tapex-muted">{r.other}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}

/* ─── LLM Sections Preview ─── */
function LLMSection() {
  const llms = [
    {
      section: 'A',
      name: 'ChatGPT',
      desc: '범용 대화',
      detail: '프롬프트 최적화 · 대화 시나리오 설계 · 출력 품질 평가',
      color: 'from-green-500/20 to-green-900/10 border-green-500/30',
      dot: 'bg-green-500',
    },
    {
      section: 'B',
      name: 'Claude',
      desc: '장문 분석/코딩',
      detail: '장문 요약·분석 · 코드 생성·디버깅 · 논리적 추론',
      color: 'from-purple-500/20 to-purple-900/10 border-purple-500/30',
      dot: 'bg-purple-500',
    },
    {
      section: 'C',
      name: 'Gemini',
      desc: '멀티모달/검색',
      detail: '이미지 분석 프롬프팅 · 검색 연동 질의 · 데이터 시각화',
      color: 'from-blue-500/20 to-blue-900/10 border-blue-500/30',
      dot: 'bg-blue-500',
    },
    {
      section: 'D',
      name: 'Grok',
      desc: '크로스-LLM 적응',
      detail: 'LLM 비교 분석 · 모델 선택 전략 · 실시간 정보 활용',
      color: 'from-orange-500/20 to-orange-900/10 border-orange-500/30',
      dot: 'bg-orange-500',
    },
  ];

  return (
    <SectionWrapper className="bg-tapex-primary/30">
      <h2 className="font-display mb-12 text-center text-3xl font-bold sm:text-4xl">
        4대 LLM으로 측정합니다
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {llms.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl border bg-gradient-to-b p-6 ${l.color}`}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className={`h-3 w-3 rounded-full ${l.dot}`} />
              <span className="text-xs font-semibold text-tapex-muted">Section {l.section}</span>
            </div>
            <h3 className="text-xl font-bold text-tapex-text">{l.name}</h3>
            <p className="mt-1 text-sm font-semibold text-tapex-accent">{l.desc}</p>
            <p className="mt-3 text-sm leading-relaxed text-tapex-muted">{l.detail}</p>
            <p className="mt-3 text-xs text-tapex-muted">20문항 / 30분</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ─── Grade System ─── */
function GradeSection() {
  const grades = [
    { name: 'Novice', range: '10~199', color: 'bg-gray-500', textColor: 'text-gray-400', width: 'w-[20%]' },
    { name: 'Developing', range: '200~449', color: 'bg-gray-400', textColor: 'text-gray-300', width: 'w-[25%]' },
    { name: 'Bronze', range: '450~649', color: 'bg-amber-700', textColor: 'text-amber-600', width: 'w-[20%]' },
    { name: 'Silver', range: '650~749', color: 'bg-gray-300', textColor: 'text-gray-200', width: 'w-[10%]' },
    { name: 'Gold', range: '750~849', color: 'bg-tapex-accent', textColor: 'text-tapex-accent', width: 'w-[10%]' },
    { name: 'Platinum', range: '850~990', color: 'bg-cyan-300', textColor: 'text-cyan-300', width: 'w-[15%]', shimmer: true },
  ];

  return (
    <SectionWrapper>
      <h2 className="font-display mb-12 text-center text-3xl font-bold sm:text-4xl">
        당신의 점수는 어디에?
      </h2>

      {/* Bar visualization */}
      <div className="mb-10 flex h-10 overflow-hidden rounded-xl">
        {grades.map((g, i) => (
          <div key={i} className={`${g.color} ${g.width} flex items-center justify-center`}>
            <span className="text-xs font-bold text-tapex-primary">{g.name}</span>
          </div>
        ))}
      </div>

      {/* Grade cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grades.map((g, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-tapex-border bg-tapex-card p-5"
          >
            <div className="flex items-center gap-3">
              <div className={`h-4 w-4 rounded-full ${g.color}`} />
              <span className={`text-lg font-bold ${g.shimmer ? 'shimmer' : g.textColor}`}>
                {g.name}
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-tapex-text">{g.range}<span className="ml-1 text-sm text-tapex-muted">점</span></p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ─── CTA Footer ─── */
function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-tapex-secondary to-tapex-primary px-4 py-24 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-tapex-accent/10 blur-[100px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          지금 바로 시작하세요.
        </h2>
        <p className="mt-4 text-base text-tapex-muted sm:text-lg">
          온라인 연습으로 내 AI 활용 점수를 미리 확인해보세요.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#practice"
            className="rounded-full border-2 border-tapex-accent bg-tapex-accent/10 px-8 py-3.5 text-base font-bold text-tapex-accent transition-all hover:bg-tapex-accent hover:text-tapex-primary"
          >
            온라인 연습 &#8361;14,000
          </a>
          <a
            href="#register"
            className="rounded-full bg-tapex-accent px-8 py-3.5 text-base font-bold text-tapex-primary transition-all hover:brightness-110"
          >
            본시험 접수 &#8361;79,000
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
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
      <CTASection />
    </main>
  );
}
