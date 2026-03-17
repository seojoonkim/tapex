'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function PricingPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <SectionWrapper>
        <motion.div {...fadeIn} className="text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">
            응시료 안내
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-tapex-muted">
            본시험과 온라인 연습, 목적에 맞게 선택하세요.
          </p>
        </motion.div>
      </SectionWrapper>

      {/* Pricing Cards */}
      <SectionWrapper className="bg-tapex-primary/50">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Practice */}
          <motion.div {...fadeIn} className="rounded-2xl border border-tapex-border bg-tapex-card p-8">
            <div className="mb-6">
              <span className="text-sm font-semibold text-tapex-muted">온라인 연습</span>
              <h3 className="mt-2 text-lg font-bold text-tapex-text">TAPEX Practice</h3>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-tapex-text">&#8361;14,000</span>
              <span className="ml-2 text-tapex-muted">/ 회</span>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                '어디서든 온라인 응시',
                '80문항 / 120분 (본시험과 동일 포맷)',
                '4대 LLM 라이브 상호작용',
                '예상 점수 + 섹션별 약점 분석',
                '실력 점검 + 약점 보완 + 본시험 대비',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-tapex-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-tapex-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#practice"
              className="mt-8 block rounded-full border-2 border-tapex-accent py-3 text-center text-sm font-bold text-tapex-accent transition-all hover:bg-tapex-accent hover:text-tapex-primary"
            >
              온라인 연습 시작
            </a>
          </motion.div>

          {/* Main Exam */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.15 }}
            className="relative rounded-2xl border-2 border-tapex-accent bg-tapex-card p-8 glow-accent"
          >
            <div className="absolute -top-3 right-6 rounded-full bg-tapex-accent px-4 py-1 text-xs font-bold text-tapex-primary">
              RECOMMENDED
            </div>
            <div className="mb-6">
              <span className="text-sm font-semibold text-tapex-accent">본시험</span>
              <h3 className="mt-2 text-lg font-bold text-tapex-text">TAPEX Official</h3>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-tapex-accent">&#8361;79,000</span>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                '전국 지정 시험장 (오프라인)',
                '80문항 / 120분',
                '4대 LLM 라이브 상호작용',
                '공식 점수 + 등급 배지',
                '블록체인 디지털 자격증 발급',
                '채용·승진·이력서에 공식 활용',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-tapex-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-tapex-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#register"
              className="mt-8 block rounded-full bg-tapex-accent py-3 text-center text-sm font-bold text-tapex-primary transition-all hover:brightness-110"
            >
              시험 접수하기
            </a>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Recommended Route */}
      <SectionWrapper>
        <h2 className="font-display mb-4 text-2xl font-bold sm:text-3xl">이렇게 준비하세요</h2>
        <p className="mb-10 text-tapex-muted">
          대부분의 응시자가 본시험 전에 2~3회 온라인 연습을 합니다.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: '1',
              title: '첫 연습',
              price: '₩14,000',
              desc: '현재 내 수준을 파악합니다. 예상 점수와 섹션별 약점 리포트를 확인하세요.',
            },
            {
              step: '2',
              title: '약점 보완 후 재연습',
              price: '₩14,000',
              desc: '약한 섹션을 집중 연습합니다. 점수 변화를 추적하세요.',
            },
            {
              step: '3',
              title: '본시험 응시',
              price: '₩79,000',
              desc: '목표 점수에 도달하면 본시험에 응시합니다. 공식 점수와 등급 배지를 발급받으세요.',
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-tapex-border bg-tapex-card p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-tapex-accent text-lg font-bold text-tapex-primary">
                {s.step}
              </div>
              <h3 className="text-lg font-bold text-tapex-text">Step {s.step} — {s.title}</h3>
              <p className="mt-1 text-sm font-semibold text-tapex-accent">{s.price}</p>
              <p className="mt-3 text-sm text-tapex-muted">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-tapex-accent/30 bg-tapex-accent/5 p-5 text-center">
          <p className="text-sm text-tapex-muted">
            총 비용 예시: 연습 2회(₩28,000) + 본시험 1회(₩79,000) ={' '}
            <span className="font-bold text-tapex-accent">₩107,000</span>
          </p>
        </div>
      </SectionWrapper>

      {/* Discounts */}
      <SectionWrapper className="bg-tapex-primary/50">
        <h2 className="font-display mb-8 text-2xl font-bold sm:text-3xl">할인 안내</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-tapex-border text-left">
                <th className="p-4 text-tapex-muted">대상</th>
                <th className="p-4 text-tapex-muted">할인율</th>
                <th className="p-4 text-tapex-muted">본시험 적용가</th>
                <th className="p-4 text-tapex-muted">비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tapex-border/50">
              {[
                ['학생', '40%', '₩47,400', '대학 재학 증명 필요'],
                ['갱신 응시', '30%', '₩55,300', '유효기간 만료 전 6개월부터'],
                ['한경 구독자', '20%', '₩63,200', '한경 유료 구독자'],
                ['얼리버드', '50%', '₩39,500', '런칭 첫 3개월 한정'],
                ['단체 (10인+)', '20%', '₩63,200', '개인 단체 접수 시'],
              ].map(([target, rate, price, note], i) => (
                <tr key={i}>
                  <td className="p-4 font-semibold text-tapex-text">{target}</td>
                  <td className="p-4 text-tapex-accent font-bold">{rate}</td>
                  <td className="p-4 text-tapex-text">{price}</td>
                  <td className="p-4 text-tapex-muted">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {/* Validity */}
      <SectionWrapper>
        <h2 className="font-display mb-8 text-2xl font-bold sm:text-3xl">유효기간</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-tapex-border">
              {[
                ['유효기간', '취득일로부터 2년'],
                ['갱신 방법', '재응시 (30% 할인) 또는 CPD 포인트 축적'],
                ['CPD 대체', '연간 40시간 AI 관련 학습 인증 시 1년 연장 (1회 한정)'],
                ['만료 유예', '만료 후 6개월 이내 응시 시 기존 등급 유지'],
              ].map(([label, value], i) => (
                <tr key={i}>
                  <td className="w-40 py-4 pr-4 font-semibold text-tapex-accent">{label}</td>
                  <td className="py-4 text-tapex-text">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>
    </main>
  );
}
