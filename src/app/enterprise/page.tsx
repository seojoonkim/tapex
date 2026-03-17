'use client';

import { motion } from 'framer-motion';
import { Users, BarChart3, GraduationCap } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function EnterprisePage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <SectionWrapper>
        <motion.div {...fadeIn} className="text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">
            기업·교육기관
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-tapex-accent font-semibold">
            AI 잘 쓰는 사람, TAPEX 점수로 찾으세요.
          </p>
        </motion.div>
      </SectionWrapper>

      {/* Benefits */}
      <SectionWrapper className="bg-tapex-primary/50">
        <h2 className="font-display mb-10 text-2xl font-bold sm:text-3xl">
          기업이 TAPEX를 도입하면
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Users,
              title: '채용에 활용',
              desc: '서류 전형에 TAPEX 점수 기준을 적용하세요. "AI 활용 가능" 같은 모호한 자기소개 대신, 990점 척도의 객관적 수치로 지원자를 평가할 수 있습니다.',
            },
            {
              icon: BarChart3,
              title: '임직원 역량 측정',
              desc: '전사 AI 리터러시를 반기별로 측정하고, 부서별·개인별 역량 리포트를 받으세요. 맞춤형 AI 교육 커리큘럼을 설계할 수 있습니다.',
            },
            {
              icon: GraduationCap,
              title: '교육·연수',
              desc: '한경아카데미 TAPEX 대비반과 연계하여 임직원 AI 역량을 체계적으로 향상시키세요.',
            },
          ].map((b, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-tapex-border bg-tapex-card p-6"
            >
              <b.icon className="mb-4 h-10 w-10 text-tapex-accent" />
              <h3 className="mb-3 text-lg font-bold text-tapex-text">{b.title}</h3>
              <p className="text-sm leading-relaxed text-tapex-muted">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Products */}
      <SectionWrapper>
        <h2 className="font-display mb-10 text-2xl font-bold sm:text-3xl">기업용 제품</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: 'TAPEX for Enterprise',
              target: '대기업·중견기업',
              features: '대량 응시 관리, 부서별 역량 리포트, HR 시스템 API 연동',
            },
            {
              name: 'TAPEX for Recruit',
              target: 'HR·채용팀',
              features: '채용 연동 API, 지원자 점수 대시보드, 잡코리아/사람인 연동',
            },
            {
              name: 'TAPEX for Academy',
              target: '교육기관',
              features: 'LMS 연동, 학점 인정 연계, 커리큘럼 패키지',
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-tapex-accent/30 bg-tapex-card p-6"
            >
              <h3 className="text-lg font-bold text-tapex-accent">{p.name}</h3>
              <p className="mt-1 text-sm text-tapex-muted">{p.target}</p>
              <p className="mt-4 text-sm text-tapex-text">{p.features}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Education Partners */}
      <SectionWrapper className="bg-tapex-primary/50">
        <h2 className="font-display mb-8 text-2xl font-bold sm:text-3xl">교육기관 파트너십</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="border-b border-tapex-border text-left">
                <th className="p-4 text-tapex-muted">파트너 유형</th>
                <th className="p-4 text-tapex-muted">협력 모델</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tapex-border/50">
              {[
                ['4년제 대학', '정규 교과 연계, 졸업 요건 권장, 학생 할인 제공'],
                ['부트캠프', '수료 시 TAPEX 무료 응시권 제공'],
                ['한경아카데미', 'TAPEX 대비반 공동 운영'],
                ['평생교육원', 'AI 리터러시 과정 공동 개발'],
                ['직업훈련기관', '국비지원 과정 TAPEX 연계'],
              ].map(([type, model], i) => (
                <tr key={i}>
                  <td className="p-4 font-semibold text-tapex-accent">{type}</td>
                  <td className="p-4 text-tapex-text">{model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {/* Contact CTA */}
      <SectionWrapper>
        <div className="rounded-2xl border border-tapex-accent/30 bg-gradient-to-br from-tapex-secondary/30 to-tapex-primary p-10 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">도입 문의</h2>
          <p className="mt-4 text-tapex-muted">
            TAPEX 기업 도입, 교육기관 파트너십에 대해 상담하세요.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-full bg-tapex-accent px-8 py-3.5 text-base font-bold text-tapex-primary transition-all hover:brightness-110"
          >
            기업 도입 문의하기
          </a>
          <p className="mt-4 text-sm text-tapex-muted">담당: 한국경제신문 TAPEX 사업팀</p>
        </div>
      </SectionWrapper>
    </main>
  );
}
