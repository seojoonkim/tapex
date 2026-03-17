# TAPEX Website Major Redesign Task

## CRITICAL RULES
- ALL styles must be inline style (NO Tailwind custom classes like `className`)
- Use `<img>` tags (NO Next.js Image component)
- Build must succeed before any deployment
- Git: `git config user.email "seojoon.kim@gmail.com" && git config user.name "Seojoon Kim"`

## Architecture Issue to Fix First
The current `src/app/layout.tsx` imports `NavBar` and `Footer` components AND `page.tsx` also has its own inline NavBar and Footer. This causes DOUBLE NavBar/Footer.

**Fix:** Remove the NavBar and Footer imports from `layout.tsx`. The page.tsx already has comprehensive inline versions. Make layout.tsx simple:
```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TAPEX — AI 활용 능력 인증 시험',
  description: '4대 LLM을 실시간으로 다루는 능력을 측정하는 세계 최초의 AI 활용 능력 인증 시험.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Noto+Sans+KR:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
```

## Changes to page.tsx

### 1. SVG Logo in NavBar
Replace the text "TAPEX" in NavBar with:
```tsx
<img src="/tapex-logo.svg" alt="TAPEX" style={{ height: 32, width: 'auto' }} />
```

### 2. Mobile Hamburger Menu in NavBar
Add a hamburger menu for mobile (screen width < 768px):
- Add state `menuOpen` 
- Show hamburger icon (3 lines SVG) on mobile, hide desktop links
- When open, show full-screen overlay with nav links
- Use `window.innerWidth` check or media query approach with inline styles
- Add a `useEffect` to track window width for responsive behavior

### 3. Hero Section - Add Background Image Overlay
Add a subtle background image with dark overlay:
```tsx
// Inside hero section, add as first child (absolute positioned):
<div style={{
  position: 'absolute', inset: 0,
  backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80)',
  backgroundSize: 'cover', backgroundPosition: 'center',
  opacity: 0.08,
}} />
```
Make headlines bigger: change max fontSize from 96px to 108px.
Tighten letter-spacing to -0.04em.

### 4. NEW: Trust Numbers Section (after Stats)
Add a new section "숫자로 보는 TAPEX" with animated counting numbers:
```
- 12,000+ 사전 등록자
- 50+ 기업 파트너
- 4 AI 모델 통합
- 160+ 개국 응시 가능
```
Design: Dark navy background (#0F172A), large white numbers with gold accents. Use a counter animation on scroll (intersection observer).

### 5. Why TAPEX Section - Add Image
Add a real photo on the right side (replace or supplement the infographic):
```
https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80
```
(Team collaboration / professional workplace image)

### 6. Persona Section - Add Subtle Background Pattern
Add a subtle geometric pattern or gradient background to make it pop.
Each card: add small icon/emoji at top matching the persona.

### 7. Enterprise Section - Better Image
Replace current enterprise image with:
```
https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80
```
(Corporate meeting / enterprise setting)

### 8. NEW: Certification Badge Section (before CTA)
Add a visual section showing the TAPEX digital badge design:
- Show 3 badge levels: Platinum, Gold, Silver
- Each badge: circular design with level color, "TAPEX" text, score range
- Text explaining: "LinkedIn 프로필에 인증 배지를 추가하세요"
- Mention: blockchain verification, QR code, digital wallet compatible

### 9. Footer Enhancement
Replace the minimal footer with a rich one:
- 4 columns: 시험안내, 자격증, 기업, 고객지원
- Bottom: copyright, social media icons (LinkedIn, Instagram, YouTube)
- Add contact email: contact@tapex.kr
- Add address line
- ALL inline styles (no className)

### 10. Global Polish
- All hover effects should have smooth transitions (0.2s-0.3s)
- Add subtle entrance animations using the existing useFadeIn hook
- Ensure consistent spacing: sections min 120px padding top/bottom
- Typography: headlines letter-spacing -0.04em, body line-height 1.8

### 11. Color Refinement
Keep the existing palette but refine:
- Primary navy: #0F172A
- Gold accent: #C9A84C (keep)
- Light gold for highlights: #F0D080
- Section alternation: white (#fff) → light gray (#F8FAFC) → dark navy (#0F172A)
- Ensure sufficient contrast ratios

## Unsplash Images to Use
1. Hero BG: `https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80` (tech workspace)
2. Why TAPEX: `https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80` (team collaboration)
3. Enterprise: `https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80` (corporate meeting)
4. Certification: No image needed, use SVG badge designs

## Build & Deploy
After all changes:
```bash
cd /Users/gimseojun/raon-workspace/projects/tapex
npm run build
```
If build succeeds:
```bash
git config user.email "seojoon.kim@gmail.com"
git config user.name "Seojoon Kim"
git add .
git commit -m "feat: major redesign - SVG logo, trust section, photos, badges, rich footer, mobile menu, full polish"
git push origin main
```
Then deploy:
```bash
npx vercel --yes --prod --scope seojoonkims-projects
```

## IMPORTANT
- Do NOT use any className or Tailwind classes in page.tsx
- All styles must be inline `style={{}}` objects
- Use `<img>` not `<Image>` from next/image
- The page.tsx is self-contained with its own NavBar and Footer functions
- Make sure there's no duplicate NavBar/Footer from layout.tsx
