'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function ExamPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <SectionWrapper className="bg-white">
        <motion.div {...fadeIn} className="text-center">
          <h1 className="font-display text-4xl text-tapex-text sm:text-5xl md:text-6xl">
            시험 구조
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tapex-muted">
            TAPEX는 특정 AI 도구의 사용법이 아니라,{' '}
            <span className="font-semibold text-tapex-text">
              어떤 LLM이든 효과적으로 활용할 수 있는 범용 AI 리터러시
            </span>
            를 측정합니다.
          </p>
        </motion.div>
      </SectionWrapper>

      {/* Overview Table */}
      <SectionWrapper className="bg-[#F8F9FA]">
        <h2 className="font-display mb-8 text-2xl text-tapex-text sm:text-3xl">시험 개요</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              {[
                ['시험명', 'TAPEX (Test of AI Proficiency EXamination)'],
                ['문항 수', '80문항'],
                ['시험 시간', '120분 (4섹션 × 30분)'],
                ['시험 방식', 'CBT (Computer Based Test) + 라이브 LLM 상호작용'],
                ['점수 범위', '10~990점'],
                ['응시 장소', '전국 지정 시험장 (고등학교·대학 컴퓨터실)'],
                ['결과 발표', '시험 후 72시간 이내'],
              ].map(([label, value], i) => (
                <tr key={i}>
                  <td className="w-40 px-6 py-4 font-semibold text-tapex-primary">{label}</td>
                  <td className="px-6 py-4 text-tapex-text">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {/* 4 LLM Sections */}
      <SectionWrapper className="bg-white">
        <h2 className="font-display mb-10 text-2xl text-tapex-text sm:text-3xl">
          4대 LLM 섹션 구조
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              section: 'A',
              name: 'ChatGPT',
              subtitle: '범용 대화',
              desc: '가장 대중적인 LLM으로 범용 대화, 지시 생성, 반복 자동화 능력을 측정합니다.',
              skills: '프롬프트 최적화 · 대화 시나리오 설계 · 출력 품질 평가 · 자동화 워크플로우',
              color: 'border-green-200 bg-green-50',
              dot: 'bg-green-500',
            },
            {
              section: 'B',
              name: 'Claude',
              subtitle: '장문 분석/코딩',
              desc: '깊이 있는 분석과 코딩에 특화된 LLM 활용 능력을 측정합니다.',
              skills: '장문 요약·분석 · 코드 생성·디버깅 · 논리적 추론 · 시스템 프롬프트 설계',
              color: 'border-purple-200 bg-purple-50',
              dot: 'bg-purple-500',
            },
            {
              section: 'C',
              name: 'Gemini',
              subtitle: '멀티모달/검색',
              desc: 'Google 생태계와 연동된 멀티모달 활용 능력을 측정합니다.',
              skills: '이미지 분석 프롬프팅 · 검색 연동 질의 · 데이터 시각화 지시 · 멀티모달 통합',
              color: 'border-blue-200 bg-blue-50',
              dot: 'bg-blue-500',
            },
            {
              section: 'D',
              name: 'Grok',
              subtitle: '크로스-LLM 적응',
              desc: 'LLM 간 전환·비교·적응 능력과 실시간 정보 활용을 측정합니다.',
              skills: 'LLM 비교 분석 · 모델 선택 전략 · 한계 인지·우회 · 실시간 정보 활용',
              color: 'border-orange-200 bg-orange-50',
              dot: 'bg-orange-500',
            },
          ].map((l, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-6 ${l.color}`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${l.dot}`} />
                <span className="text-xs font-semibold text-tapex-muted">Section {l.section} — 20문항 / 30분</span>
              </div>
              <h3 className="text-xl font-bold text-tapex-text">{l.name}</h3>
              <p className="text-sm font-semibold text-tapex-primary">{l.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-tapex-muted">{l.desc}</p>
              <p className="mt-2 text-xs text-tapex-muted">{l.skills}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Question Types */}
      <SectionWrapper className="bg-[#F8F9FA]">
        <h2 className="font-display mb-8 text-2xl text-tapex-text sm:text-3xl">문항 유형</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="px-6 py-4 text-tapex-muted">유형</th>
                <th className="px-6 py-4 text-tapex-muted">비율</th>
                <th className="px-6 py-4 text-tapex-muted">문항 수</th>
                <th className="px-6 py-4 text-tapex-muted">무엇을 측정하나요?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ['객관식', '30%', '24문항', 'AI 개념 이해, 모델 특성 판단, 윤리적 사용 지식'],
                ['프롬프트 작성형', '40%', '32문항', '실제 LLM에 프롬프트를 입력하고 원하는 결과를 얻어내는 능력'],
                ['출력 평가형', '20%', '16문항', 'LLM이 생성한 결과물의 품질·정확성·편향을 판별하는 능력'],
                ['시나리오 설계형', '10%', '8문항', '복수의 AI 도구를 조합한 업무 워크플로우를 기획하는 능력'],
              ].map(([type, ratio, count, desc], i) => (
                <tr key={i}>
                  <td className="px-6 py-4 font-semibold text-tapex-primary">{type}</td>
                  <td className="px-6 py-4 text-tapex-text">{ratio}</td>
                  <td className="px-6 py-4 text-tapex-text">{count}</td>
                  <td className="px-6 py-4 text-tapex-muted">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 rounded-xl border border-tapex-primary/20 bg-tapex-primary/5 p-4 text-sm text-tapex-primary">
          TAPEX는 40%가 실제 LLM과 실시간으로 대화하는 문항입니다. 이론만 외워서는 고득점할 수 없습니다.
        </p>
      </SectionWrapper>

      {/* Scoring Pipeline */}
      <SectionWrapper className="bg-white">
        <h2 className="font-display mb-4 text-2xl text-tapex-text sm:text-3xl">채점 방식</h2>
        <p className="mb-10 text-tapex-muted">
          TAPEX는 AI가 채점하고, AI가 교차검증합니다.
        </p>

        <h3 className="mb-6 text-lg font-semibold text-tapex-text">4단계 채점 파이프라인</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: '1', title: '자동 채점', desc: '객관식 즉시 채점, 키워드·형식 검증' },
            { step: '2', title: 'AI 심사관', desc: '3개 LLM이 독립적으로 채점, 루브릭 기반' },
            { step: '3', title: '합의 검증', desc: '2/3 이상 일치 시 확정, 불일치 시 인간 심사관 검토' },
            { step: '4', title: 'IRT 보정', desc: '난이도 보정으로 회차 간 점수 동등화, 최종 990점 변환' },
          ].map((s, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-tapex-primary text-lg font-bold text-white">
                {s.step}
              </div>
              <h4 className="text-base font-bold text-tapex-text">{s.title}</h4>
              <p className="mt-2 text-sm text-tapex-muted">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Scoring Criteria */}
        <h3 className="mb-6 mt-12 text-lg font-semibold text-tapex-text">채점 기준</h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="px-6 py-4 text-tapex-muted">기준</th>
                <th className="px-6 py-4 text-tapex-muted">비중</th>
                <th className="px-6 py-4 text-tapex-muted">의미</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ['효과성 (Effectiveness)', '30%', '원하는 결과를 얼마나 잘 달성했는가'],
                ['명확성 (Clarity)', '25%', '프롬프트가 얼마나 구체적이고 모호하지 않은가'],
                ['효율성 (Efficiency)', '20%', '최소한의 토큰으로 최대의 결과를 얻었는가'],
                ['적응성 (Adaptability)', '15%', 'LLM 간 전환과 맥락 적응을 잘 했는가'],
                ['안전성 (Safety)', '10%', '윤리적 사용, 환각 검증, 편향 인지를 했는가'],
              ].map(([criterion, weight, meaning], i) => (
                <tr key={i}>
                  <td className="px-6 py-4 font-semibold text-tapex-primary">{criterion}</td>
                  <td className="px-6 py-4 text-tapex-text">{weight}</td>
                  <td className="px-6 py-4 text-tapex-muted">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>
    </main>
  );
}
