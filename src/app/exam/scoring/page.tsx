'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const grades = [
  { range: '10~199', name: 'Novice', badge: '', level: 'AI 도구 기본 인지', who: 'AI를 처음 접하는 분', color: 'bg-gray-500', textColor: 'text-gray-400' },
  { range: '200~449', name: 'Developing', badge: '', level: '기본 프롬프트 작성', who: 'AI를 가끔 사용하는 분', color: 'bg-gray-400', textColor: 'text-gray-300' },
  { range: '450~649', name: 'Bronze', badge: '', level: '구조화된 프롬프팅', who: '대학생·신입 수준의 AI 활용', color: 'bg-amber-700', textColor: 'text-amber-600' },
  { range: '650~749', name: 'Silver', badge: '', level: '업무 AI 활용 능숙', who: '주니어~미드 직장인', color: 'bg-gray-300', textColor: 'text-gray-200' },
  { range: '750~849', name: 'Gold', badge: '', level: 'AI 전략적 활용', who: '시니어·매니저급', color: 'bg-tapex-accent', textColor: 'text-tapex-accent' },
  { range: '850~990', name: 'Platinum', badge: '', level: 'AI 오케스트레이션 마스터', who: '리더·전문가급', color: 'bg-cyan-300', textColor: 'text-cyan-300', shimmer: true },
];

const microBadges = [
  { badge: 'TAPEX:Marketing', area: 'AI 카피라이팅, 콘텐츠 생성, A/B 테스트', job: '마케터, 콘텐츠 크리에이터' },
  { badge: 'TAPEX:PM', area: '요구사항 정의, 유저스토리 생성, 일정관리', job: '프로덕트 매니저' },
  { badge: 'TAPEX:Developer', area: '코드 생성, 디버깅, 아키텍처 설계', job: '개발자, 엔지니어' },
  { badge: 'TAPEX:Analyst', area: '데이터 분석, 시각화, 인사이트 도출', job: '데이터 분석가' },
  { badge: 'TAPEX:Writer', area: '장문 작성, 편집, 톤 조절', job: '작가, 에디터' },
  { badge: 'TAPEX:Creative', area: '멀티모달 활용, 이미지 생성, 디자인', job: '디자이너, 크리에이터' },
];

export default function ScoringPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <SectionWrapper>
        <motion.div {...fadeIn} className="text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">
            점수·등급 체계
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tapex-muted">
            TOEIC이 영어 능력을 990점으로 측정하듯, TAPEX는 AI 활용 능력을 990점으로 측정합니다.
          </p>
        </motion.div>
      </SectionWrapper>

      {/* Grade Table */}
      <SectionWrapper className="bg-tapex-primary/50">
        <h2 className="font-display mb-8 text-2xl font-bold sm:text-3xl">990점 체계</h2>

        {/* Bar */}
        <div className="mb-8 flex h-10 overflow-hidden rounded-xl">
          {grades.map((g, i) => (
            <div key={i} className={`${g.color} flex flex-1 items-center justify-center`}>
              <span className="hidden text-xs font-bold text-tapex-primary sm:block">{g.name}</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-tapex-border text-left">
                <th className="p-4 text-tapex-muted">점수 범위</th>
                <th className="p-4 text-tapex-muted">등급</th>
                <th className="p-4 text-tapex-muted">수준</th>
                <th className="p-4 text-tapex-muted">이런 분에게 해당합니다</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tapex-border/50">
              {grades.map((g, i) => (
                <tr key={i}>
                  <td className="p-4 font-semibold text-tapex-text">{g.range}</td>
                  <td className={`p-4 font-bold ${g.shimmer ? 'shimmer' : g.textColor}`}>{g.name}</td>
                  <td className="p-4 text-tapex-muted">{g.level}</td>
                  <td className="p-4 text-tapex-muted">{g.who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-2 text-sm text-tapex-muted">
          <p>* 449점 이하는 등급이 부여되지 않습니다 (점수 리포트만 제공)</p>
          <p>* 950점 이상은 Platinum 내 <span className="font-semibold text-tapex-accent">Apex</span> 뱃지로 상위 1%를 별도 표시합니다</p>
        </div>
      </SectionWrapper>

      {/* Micro Badges */}
      <SectionWrapper>
        <h2 className="font-display mb-4 text-2xl font-bold sm:text-3xl">직무별 마이크로 배지</h2>
        <p className="mb-8 text-tapex-muted">
          본시험 점수와 별개로, 섹션별 성적을 기반으로 직무 특화 배지를 추가 발급합니다.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {microBadges.map((b, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-tapex-border bg-tapex-card p-6"
            >
              <h3 className="mb-2 font-mono text-sm font-bold text-tapex-accent">{b.badge}</h3>
              <p className="text-sm text-tapex-text">{b.area}</p>
              <p className="mt-2 text-xs text-tapex-muted">{b.job}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Blockchain Cert */}
      <SectionWrapper className="bg-tapex-primary/50">
        <h2 className="font-display mb-4 text-2xl font-bold sm:text-3xl">블록체인 디지털 자격증</h2>
        <p className="mb-8 text-tapex-muted">
          TAPEX 자격증은 블록체인에 기록됩니다. 위변조가 불가능하고, 누구나 원클릭으로 진위를 검증할 수 있습니다.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'W3C VC 표준', desc: 'Verifiable Credentials 표준 준수' },
            { title: 'Polygon PoS', desc: '블록체인 기반 온체인 발행' },
            { title: 'LinkedIn 연동', desc: 'Open Badge 2.0 기반 임베드 가능' },
            { title: 'HR 시스템 API', desc: '채용 담당자 원클릭 점수 검증' },
            { title: 'QR 코드 검증', desc: '스캔으로 즉시 진위 확인 가능' },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-tapex-border bg-tapex-card p-5"
            >
              <h3 className="font-semibold text-tapex-accent">{item.title}</h3>
              <p className="mt-1 text-sm text-tapex-muted">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </main>
  );
}
