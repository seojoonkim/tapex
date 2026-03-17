# TAPEX 웹사이트 구현 작업

콘텐츠 기획안: `/Users/gimseojun/.openclaw/media/inbound/TAPEX_Website_Content_Plan---2166365c-469c-40bc-a74e-4feb5c800053.md`

## 디자인 철학
- 권위 있고 세련된: TOEIC 공식 사이트의 신뢰감 + 모던 SaaS 세련됨
- Dark Mode 기반
- 컬러 팔레트:
  - Background: #030B17 (딥 블루 블랙)
  - Primary: #0A1628 (딥 네이비)
  - Secondary: #1E3A5F (미드 네이비)
  - Accent: #C9A84C (골드 — 권위/고급감)
  - Card BG: #0D1F35
  - Text: #F8F9FA (흰색/연백)
  - Text Muted: #94A3B8

## 폰트
- 타이틀: Playfair Display (Google Fonts — 권위감)
- 본문: Pretendard (CDN)

## 구현 파일 목록

### globals.css
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&display=swap');
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css');

:root {
  --color-bg: #030B17;
  --color-primary: #0A1628;
  --color-secondary: #1E3A5F;
  --color-accent: #C9A84C;
  --color-card: #0D1F35;
  --color-text: #F8F9FA;
  --color-muted: #94A3B8;
  --color-border: #1E3A5F;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, sans-serif;
}

.font-display {
  font-family: 'Playfair Display', Georgia, serif;
}
```

### layout.tsx
- NavBar (fixed top, backdrop blur)
- Footer
- Google Fonts import

### app/page.tsx (랜딩 페이지 — 이게 가장 중요)
아래 섹션을 순서대로 구현:

**1. HeroSection**
- 전체 화면 (min-h-screen)
- 배경: 딥 블루 그라디언트 + 미묘한 파티클/글로우 CSS 효과
- 상단 신뢰 배지: "한국경제신문 인증 | 세계 최초 4대 LLM 통합 시험" (작은 pill 형태, 골드 테두리)
- 메인 헤드라인 (Playfair Display, 매우 크게):
  ```
  AI를 잘 쓰는 사람의 기준,
  TAPEX.
  ```
- 서브: "990점으로 증명하세요." (골드색)
- 설명: "4대 LLM을 실시간으로 다루는 능력을 측정하는 세계 최초의 AI 활용 능력 인증 시험. ChatGPT · Claude · Gemini · Grok — 프롬프트를 증명하고, 미래를 움직여라."
- CTA 버튼 2개:
  - [시험 접수하기] → 골드 배경, 진한 텍스트
  - [온라인 연습 시작] → 투명 배경, 골드 테두리/텍스트
- 하단: 스크롤 다운 인디케이터 (animated)

**2. Stats Section (4개 카드)**
- 배경 약간 다른 섹션 구분
- 카드 4개: 80문항 / 10~990점 / 4개 LLM / 2년 유효
- 큰 숫자 (골드), 설명 텍스트 (회색)

**3. Why TAPEX Section**
- 헤드라인: "일은 이미 AI가 하고 있다" (Playfair Display)
- 좌측: 긴 카피 텍스트 (기획안 내용 그대로)
- 우측: 인포그래픽
  - TOEIC → 영어 능력
  - 코딩 테스트 → 개발 역량
  - **TAPEX → AI 활용 능력** (골드 강조)
  SVG나 CSS로 만들어줘

**4. Persona Cards Section**
- 헤드라인: "이런 분이 응시합니다"
- 4개 카드 그리드 (2x2 or 4열):
  - 취준생/대학생
  - 직장인/이직자
  - 프리랜서/크리에이터
  - 기업 HR/교육 담당자
- 각 카드: 아이콘 (lucide-react) + 직군명 + 인용구 + 포인트
- 호버: 골드 상단 테두리 효과

**5. Comparison Table Section**
- 헤드라인: "TAPEX vs 기존 AI 자격증"
- 비교 테이블 (TAPEX 컬럼 골드 강조):
  | | TAPEX | 기존 AI 자격증 |
  - 시험 방식: 실제 LLM과 실시간 대화 vs 객관식 이론
  - LLM: 4개 통합 vs 0~1개
  - 점수: 10~990 연속 vs Pass/Fail
  - 실무반영: 프롬프트 작성/평가 vs 이론 암기
  - 자격증: 블록체인 디지털 배지 vs 종이 인증서
  - 유효기간: 2년 분기 업데이트 vs 고정 문항

**6. LLM Sections Preview**
- 헤드라인: "4대 LLM으로 측정합니다"
- 4개 카드 (가로 스크롤 or 그리드):
  - Section A: ChatGPT — 범용 대화 (녹색 포인트)
  - Section B: Claude — 장문 분석/코딩 (보라 포인트)
  - Section C: Gemini — 멀티모달/검색 (파랑 포인트)
  - Section D: Grok — 크로스-LLM 적응 (오렌지 포인트)

**7. Grade System Section**
- 헤드라인: "당신의 점수는 어디에?"
- 6단계 등급 바 또는 카드:
  - Novice (10~199) — 회색
  - Developing (200~449) — 연회색
  - Bronze (450~649) — 🥉 동색
  - Silver (650~749) — 🥈 은색
  - Gold (750~849) — 🥇 골드
  - Platinum (850~990) — 💎 플래티넘 (반짝이는 효과)

**8. CTA Footer Section**
- "지금 바로 시작하세요."
- [온라인 연습 ₩14,000] [본시험 접수 ₩79,000]
- 배경: 골드 그라디언트 or 딥 블루

### NavBar.tsx
```tsx
// fixed top-0, z-50
// 배경: backdrop-blur + 반투명 딥 블루
// 로고: "TAPEX" Playfair Display 골드색
// 메뉴: 시험안내 | 점수·등급 | 응시료 | 기업 | FAQ
// CTA: "시험 접수" 골드 버튼
// 스크롤 시 더 진해지는 효과
```

### Footer.tsx
```tsx
// 배경: #0A1628
// 상단: TAPEX 로고 + 슬로건 "Prove Your Prompt. Power Your Future."
// 중단: 링크 그룹 (시험안내, 자격증, 기업, 문의)
// 하단: © 2026 TAPEX. 한국경제신문 인증.
```

### app/exam/page.tsx (시험 구조)
- 4대 LLM 섹션 상세 (탭 UI)
- 문항 유형 테이블
- 채점 파이프라인 (4단계 순서도)

### app/exam/scoring/page.tsx (점수·등급)
- 990점 체계 테이블
- 등급별 배지 시각화
- 직무별 마이크로 배지 섹션
- 블록체인 자격증 안내

### app/pricing/page.tsx (응시료)
- 본시험 vs 온라인 연습 비교
- 할인 테이블
- 추천 준비 루트 (Step 1→2→3)

### app/enterprise/page.tsx (기업)
- 기업 도입 혜택 (채용/역량측정/교육)
- TAPEX for Enterprise/Recruit/Academy 카드
- 교육기관 파트너십 테이블

### app/faq/page.tsx (FAQ)
- Radix UI Accordion 사용
- 카테고리별 (시험전반/온라인연습/점수등급/채점/기업HR/응시실무)

## tailwind.config 수정
```js
// 커스텀 컬러 추가
colors: {
  tapex: {
    bg: '#030B17',
    primary: '#0A1628',
    secondary: '#1E3A5F',
    accent: '#C9A84C',
    card: '#0D1F35',
    border: '#1E3A5F',
  }
}
```

## 중요 사항
1. 모든 텍스트는 기획안 파일 내용 그대로 사용
2. 이미지는 플레이스홀더 div (배경 그라디언트)로 처리 — 추후 나노바나나2로 교체 예정
3. 애니메이션은 framer-motion 사용 (섹션 진입 시 fade-in)
4. 반응형: mobile-first
5. Git 이메일: seojoon.kim@gmail.com

## 완료 후
```bash
cd /Users/gimseojun/raon-workspace/projects/tapex
git config user.email "seojoon.kim@gmail.com"
git config user.name "Seojoon Kim"
git add .
git commit -m "feat: complete TAPEX website - all pages implemented"
git push origin main
vercel --yes --prod --scope seojoonkims-projects
```

배포 URL 알려줘!
