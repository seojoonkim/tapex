'use client';

import { motion } from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const faqCategories = [
  {
    title: '시험 전반',
    items: [
      { q: 'TAPEX는 어떤 시험인가요?', a: 'TAPEX(Test of AI Proficiency EXamination)는 ChatGPT, Claude, Gemini, Grok 4대 LLM을 실시간으로 활용하는 능력을 측정하는 AI 활용 능력 인증 시험입니다. 80문항/120분, 10~990점 체계입니다.' },
      { q: '기존 AI 자격증과 뭐가 다른가요?', a: '기존 시험(Microsoft AI-900, AWS ML Specialty 등)은 이론 중심의 객관식 시험입니다. TAPEX는 40%가 실제 LLM과 실시간으로 대화하는 문항이며, 4대 LLM을 통합 활용하는 유일한 시험입니다.' },
      { q: 'TOEIC처럼 채용에 활용되나요?', a: '네. TAPEX는 한국경제신문이 인증하며, 대기업 채용·공채·승진 평가에 활용될 수 있도록 HR 시스템 API 연동을 제공합니다. 잡코리아·사람인 등 채용 플랫폼과도 연동됩니다.' },
      { q: '시험은 어디서 보나요?', a: '전국 지정 시험장(고등학교·대학 컴퓨터실)에서 오프라인으로 응시합니다. 온라인 연습(TAPEX Practice)은 어디서든 가능합니다.' },
    ],
  },
  {
    title: '온라인 연습',
    items: [
      { q: 'TAPEX Practice는 뭔가요?', a: '본시험과 동일한 포맷(80문항/120분, 4대 LLM 라이브)으로 온라인에서 연습할 수 있는 모의시험입니다. ₩14,000/회이며, 예상 점수와 섹션별 약점 분석 리포트를 제공합니다.' },
      { q: '온라인 연습 점수가 공식 점수로 인정되나요?', a: '아닙니다. 온라인 연습은 실력 점검과 약점 보완 용도이며, 공식 점수 인증·등급 배지·블록체인 자격증은 본시험에서만 발급됩니다.' },
      { q: '몇 번 정도 연습하고 본시험을 보면 좋을까요?', a: '평균적으로 2~3회 연습 후 본시험에 응시하는 것을 권장합니다. 첫 연습에서 현재 수준을 파악하고, 약점 섹션을 보완한 후 본시험에 도전하세요.' },
    ],
  },
  {
    title: '점수·등급',
    items: [
      { q: '990점 만점인데, 몇 점을 받아야 하나요?', a: '목적에 따라 다릅니다. 대학생·신입 취업이라면 Bronze(450점+), 경력직이라면 Silver~Gold(650점+), 리더급이라면 Platinum(850점+)이 권장됩니다.' },
      { q: '점수의 유효기간은 얼마인가요?', a: '2년입니다. AI 기술 발전 속도를 반영하여 2년마다 갱신합니다. 갱신 시 30% 할인이 적용됩니다.' },
      { q: '등급 배지는 어디에 쓸 수 있나요?', a: '블록체인 기반 디지털 배지로 발급되며, LinkedIn 프로필, 이력서, 포트폴리오에 임베드할 수 있습니다. QR 코드 스캔으로 누구나 진위를 검증할 수 있습니다.' },
    ],
  },
  {
    title: '채점',
    items: [
      { q: 'AI가 채점하면 공정한가요?', a: 'TAPEX는 4단계 채점 파이프라인을 사용합니다. 3개의 서로 다른 AI가 독립적으로 채점하고, 2/3 이상 합의해야 점수가 확정됩니다. 합의가 안 되면 인간 심사관이 검토합니다.' },
      { q: '채점 결과에 이의를 제기할 수 있나요?', a: '네. 이의신청 시 72시간 이내에 재채점이 진행됩니다.' },
    ],
  },
  {
    title: '기업·HR',
    items: [
      { q: '우리 회사 채용에 TAPEX 점수를 활용하고 싶습니다.', a: 'TAPEX for Recruit를 도입하시면 채용 연동 API로 지원자 점수를 자동 조회할 수 있습니다. 잡코리아·사람인과도 연동됩니다.' },
      { q: '임직원 전체에게 시험을 치르게 하고 싶습니다.', a: 'TAPEX for Enterprise 패키지로 대량 응시 관리, 부서별 역량 리포트, HR 시스템 연동이 가능합니다.' },
    ],
  },
  {
    title: '응시 실무',
    items: [
      { q: '시험 중에 인터넷 검색이 가능한가요?', a: '시험용 LLM 인터페이스만 사용 가능하며, 외부 검색·메신저 등은 차단됩니다.' },
      { q: '시험을 중간에 그만두면 어떻게 되나요?', a: '응시를 시작하면 최소 10점이 부여됩니다. 중도 포기 시 제출된 문항까지만 채점됩니다.' },
      { q: '부정행위 방지는 어떻게 하나요?', a: '시험장 감독관 배치, 실시간 프로세스 모니터링, 동적 문항 생성(동일 문항 미반복), AI 기반 행동 패턴 분석을 통해 부정행위를 방지합니다.' },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="pt-20">
      <SectionWrapper className="bg-white">
        <motion.div {...fadeIn} className="text-center">
          <h1 className="font-display text-4xl text-tapex-text sm:text-5xl md:text-6xl">
            자주 묻는 질문
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-tapex-muted">
            TAPEX에 대해 궁금한 점을 확인하세요.
          </p>
        </motion.div>
      </SectionWrapper>

      {faqCategories.map((cat, ci) => (
        <SectionWrapper key={ci} className={ci % 2 === 0 ? 'bg-[#F8F9FA]' : 'bg-white'}>
          <h2 className="font-display mb-6 text-xl text-tapex-text sm:text-2xl">{cat.title}</h2>
          <Accordion.Root type="multiple" className="space-y-3">
            {cat.items.map((item, i) => (
              <Accordion.Item
                key={i}
                value={`${ci}-${i}`}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <Accordion.Trigger className="group flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-tapex-text transition-colors hover:text-tapex-primary">
                  {item.q}
                  <ChevronDown className="h-4 w-4 shrink-0 text-tapex-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-tapex-muted">
                    {item.a}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </SectionWrapper>
      ))}
    </main>
  );
}
