# TAPEX 웹사이트 리디자인 작업

## 변경 사항

### 1. 색상 테마 변경 (Dark → Light)
- **배경**: 순백색 `#FFFFFF`
- **섹션 배경 번갈아가며**: `#FFFFFF` ↔ `#F8F9FA` (연한 회색)
- **텍스트**: `#111827` (거의 검정)
- **보조 텍스트**: `#6B7280`
- **Accent**: `#1B3A6B` (딥 네이비 — 권위감 유지)
- **골드 Accent**: `#C9A84C` (CTA 버튼, 강조)
- **카드 배경**: `#FFFFFF`, 테두리 `#E5E7EB`
- **NavBar**: 흰색 배경 + 하단 border

### 2. 폰트 변경
**모든 폰트 산세리프체로 통일** (Playfair Display 제거)
- 타이틀: `Inter` 또는 `Pretendard Variable` — `font-weight: 800`
- 본문: `Pretendard Variable` — `font-weight: 400~600`
- Google Fonts에서 Inter 추가

### 3. 섹션 배경 번갈아가며

```
Hero Section → 흰색 (#FFFFFF) + 상단 딥 네이비 그라디언트 (Hero만 예외적으로 딥 네이비 배경 유지 or 흰색)
Why TAPEX → 연회색 (#F8F9FA)
Stats Cards → 흰색
Persona Cards → 연회색 (#F8F9FA)
Comparison Table → 흰색
LLM Sections → 연회색 (#F8F9FA)
Grade System → 흰색
Partner Section → 연회색 (#F8F9FA)
Footer CTA → 딥 네이비 (#1B3A6B) — 마지막은 진하게
Footer → #111827
```

### 4. 사진 추가 (나노바나나2 MCP로 생성)
아래 3개 섹션에 실사 분위기 사진 삽입:

**사진 1 — "Why TAPEX" 섹션 우측**
- 프롬프트: "professional person working with AI on laptop in modern office, realistic photo, warm lighting, productivity, AI era, clean corporate"
- 크기: 약 600x400, 둥근 모서리 (rounded-2xl)

**사진 2 — "Persona Cards" 위쪽 또는 섹션 배경**
- 프롬프트: "diverse group of professionals in modern workspace using AI tools, laptops, collaborative environment, realistic corporate photo, bright office"
- 크기: 전체 너비 배너 (16:9 비율)

**사진 3 — "Enterprise" 섹션**
- 프롬프트: "business team meeting in modern conference room, data analytics on screen, AI dashboard, professional corporate setting, realistic photo"
- 크기: 약 600x400

나노바나나2 사용법:
```
mcp__nanobana2__generate_image 도구 사용
prompt: "..."
```

나노바나나2가 없으면 Unsplash placeholder로 대체:
```
https://images.unsplash.com/photo-1551434678-e076c223a692?w=800 (office/AI)
https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800 (team)
https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800 (enterprise)
```

### 5. 파트너 로고 섹션 추가/업데이트
`public/logos/` 에 로고 파일 3개 있음:
- `hankook.jpg` — 한국경제신문 로고
- `hashed.jpg` — #HASHED 로고
- `bloomingbit.jpg` — bloomingbit 로고

파트너 섹션에 이 3개 로고를 나란히 배치:
```tsx
// PartnerSection 컴포넌트
<section className="bg-[#F8F9FA] py-16">
  <div className="max-w-5xl mx-auto px-6">
    <p className="text-center text-sm text-gray-500 mb-10 uppercase tracking-widest">인증 파트너</p>
    <div className="flex items-center justify-center gap-16 flex-wrap">
      <img src="/logos/hankook.jpg" alt="한국경제신문" className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
      <img src="/logos/hashed.jpg" alt="#HASHED" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
      <img src="/logos/bloomingbit.jpg" alt="bloomingbit" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
    </div>
  </div>
</section>
```

## 전체 globals.css 교체
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #FFFFFF;
  --color-bg-alt: #F8F9FA;
  --color-primary: #1B3A6B;
  --color-accent: #C9A84C;
  --color-text: #111827;
  --color-muted: #6B7280;
  --color-border: #E5E7EB;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #FFFFFF;
  color: #111827;
  font-family: 'Pretendard Variable', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Playfair Display 완전 제거 — 모든 font-display 클래스도 Inter로 */
.font-display {
  font-family: 'Inter', 'Pretendard Variable', sans-serif;
  font-weight: 800;
}
```

## tailwind.config 업데이트
```js
colors: {
  tapex: {
    bg: '#FFFFFF',
    'bg-alt': '#F8F9FA',
    primary: '#1B3A6B',
    accent: '#C9A84C',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
    card: '#FFFFFF',
  }
}
```

## NavBar 변경
- 배경: `bg-white border-b border-gray-200`
- 로고 "TAPEX": `text-[#1B3A6B]` 딥 네이비
- 메뉴 텍스트: `text-gray-700`
- CTA 버튼: `bg-[#1B3A6B] text-white`

## Hero Section 옵션
Hero는 흰색 or 딥 네이비 중 선택:
→ **딥 네이비 유지** (#1B3A6B → #0A1628) + 흰색 텍스트 (대비 효과로 임팩트 있음)
다른 모든 섹션은 흰색/연회색 번갈아가며

## 완료 후
```bash
cd /Users/gimseojun/raon-workspace/projects/tapex
git config user.email "seojoon.kim@gmail.com"
git add .
git commit -m "redesign: light theme, san-serif fonts, partner logos, AI photos"
git push origin main
vercel --yes --prod --scope seojoonkims-projects
```

배포 URL 알려줘!
