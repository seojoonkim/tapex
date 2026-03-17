# TAPEX 웹사이트 완전 재작업

## 현재 문제
- Hero 섹션만 보이고 나머지 모든 섹션이 빈 흰 공간으로 나옴
- 디자인이 엉망인 상태

## 해결 방법
**Tailwind v4 커스텀 색상 클래스가 안 먹히는 문제 → inline style로 전부 교체**
**framer-motion whileInView가 fullPage 스크린샷에서 안 보이는 문제 → animate로 교체 (initial 없이)**

## 완전 재작업 지시

기존 파일 전부 무시하고, `/Users/gimseojun/raon-workspace/projects/tapex/src/app/page.tsx` 를 완전히 새로 작성해줘.

### 디자인 스펙
- 배경: 흰색 (#fff) / 섹션 번갈아 연회색 (#F7F8FA)
- 강조색: 네이비 #1B3A6B / 골드 #C9A84C
- 폰트: 전부 sans-serif (Inter / system-ui)
- 모든 색상: inline style로만 (Tailwind 커스텀 클래스 금지)
- framer-motion: `animate` 사용 (whileInView 금지 — SSR/풀페이지 이슈)
- Next.js Image 대신 `<img>` 태그 사용 (도메인 설정 없이 Unsplash 사용 가능)

### NavBar (고정)
```tsx
<nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background:'rgba(255,255,255,0.95)', backdropFilter:'blur(12px)', borderBottom:'1px solid #E5E7EB', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 32px', height:64 }}>
  <span style={{ fontWeight:900, fontSize:22, color:'#1B3A6B', fontFamily:'system-ui' }}>TAPEX</span>
  <div style={{ display:'flex', gap:28, fontSize:14, color:'#374151' }}>
    <a href="#exam" style={{ textDecoration:'none', color:'inherit' }}>시험안내</a>
    <a href="#grade" style={{ textDecoration:'none', color:'inherit' }}>점수·등급</a>
    <a href="#pricing" style={{ textDecoration:'none', color:'inherit' }}>응시료</a>
    <a href="#enterprise" style={{ textDecoration:'none', color:'inherit' }}>기업</a>
  </div>
  <a href="#register" style={{ background:'#1B3A6B', color:'#fff', borderRadius:24, padding:'8px 20px', fontSize:14, fontWeight:700, textDecoration:'none' }}>시험 접수</a>
</nav>
```

### Section 1: Hero (네이비 배경)
```tsx
<section style={{ minHeight:'100vh', background:'linear-gradient(160deg, #0A1628 0%, #1B3A6B 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 24px 40px', textAlign:'center' }}>
  {/* 신뢰 배지 */}
  <div style={{ border:'1px solid rgba(201,168,76,0.5)', background:'rgba(201,168,76,0.1)', borderRadius:24, padding:'6px 20px', fontSize:12, color:'#C9A84C', marginBottom:32, display:'inline-block' }}>
    한국경제신문 인증 &nbsp;|&nbsp; 세계 최초 4대 LLM 통합 시험
  </div>
  
  {/* 헤드라인 */}
  <h1 style={{ fontSize:'clamp(40px, 8vw, 80px)', fontWeight:900, color:'#fff', lineHeight:1.15, marginBottom:24, fontFamily:'system-ui' }}>
    AI를 잘 쓰는 사람의 기준,<br />
    <span style={{ background:'linear-gradient(135deg, #C9A84C, #E8D48B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>TAPEX.</span>
  </h1>
  
  <p style={{ fontSize:'clamp(18px, 3vw, 24px)', fontWeight:600, color:'#C9A84C', marginBottom:16 }}>990점으로 증명하세요.</p>
  <p style={{ fontSize:16, color:'rgba(255,255,255,0.7)', maxWidth:600, lineHeight:1.7, marginBottom:48 }}>
    4대 LLM을 실시간으로 다루는 능력을 측정하는 세계 최초의 AI 활용 능력 인증 시험.<br />
    ChatGPT · Claude · Gemini · Grok
  </p>
  
  {/* CTA 버튼 */}
  <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center' }}>
    <a href="#register" style={{ background:'#C9A84C', color:'#0A1628', borderRadius:32, padding:'14px 32px', fontWeight:800, fontSize:16, textDecoration:'none' }}>시험 접수하기</a>
    <a href="#practice" style={{ border:'2px solid rgba(255,255,255,0.3)', color:'#fff', borderRadius:32, padding:'14px 32px', fontWeight:700, fontSize:16, textDecoration:'none' }}>온라인 연습 시작</a>
  </div>
</section>
```

### Section 2: Stats (흰색, paddingTop 80)
4개 stat 카드: 80문항 / 10~990점 / 4개 LLM / 2년 유효
```tsx
<section style={{ background:'#fff', padding:'80px 24px' }}>
  <div style={{ maxWidth:960, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:24 }}>
    {[
      { num:'80문항', desc:'4섹션 × 20문항, 120분' },
      { num:'10~990점', desc:'TOEIC과 동일한 990점 만점 체계' },
      { num:'4개 LLM', desc:'ChatGPT · Claude · Gemini · Grok' },
      { num:'2년', desc:'갱신 시 30% 할인' },
    ].map((s,i)=>(
      <div key={i} style={{ background:'#F7F8FA', borderRadius:20, padding:'32px 24px', textAlign:'center', border:'1px solid #E5E7EB' }}>
        <div style={{ fontSize:'clamp(28px,5vw,40px)', fontWeight:900, color:'#1B3A6B', fontFamily:'system-ui' }}>{s.num}</div>
        <div style={{ fontSize:13, color:'#6B7280', marginTop:8 }}>{s.desc}</div>
      </div>
    ))}
  </div>
</section>
```

### Section 3: Why TAPEX (연회색)
좌측 텍스트 + 우측 인포그래픽 카드 (2열 레이아웃)
아래 이미지 포함:
```html
<img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80" alt="AI 근무" style="width:100%;height:320px;objectFit:cover;borderRadius:20px;" />
```

### Section 4: Persona Cards (흰색)
4개 카드 그리드 (2x2 or 4열)
각 카드에 이모지 아이콘 + 직군 + 인용구 + 설명

### Section 5: LLM 4개 섹션 (연회색)
4개 색상 카드 (ChatGPT 초록, Claude 보라, Gemini 파랑, Grok 오렌지)

### Section 6: Grade System (흰색)
6단계 등급 리스트:
Novice(10~199) / Developing(200~449) / Bronze🥉(450~649) / Silver🥈(650~749) / Gold🥇(750~849) / Platinum💎(850~990)

### Section 7: 기업 섹션 (연회색)
좌측 텍스트 + 우측 이미지
```html
<img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80" />
```

### Section 8: 파트너 로고 (흰색)
```tsx
<section style={{ background:'#fff', padding:'64px 24px', textAlign:'center' }}>
  <p style={{ fontSize:11, letterSpacing:'0.25em', color:'#9CA3AF', textTransform:'uppercase', marginBottom:40 }}>인증 파트너</p>
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:60, flexWrap:'wrap' }}>
    <img src="/logos/hankook.jpg" alt="한국경제신문" style={{ height:40, objectFit:'contain', filter:'grayscale(100%)', opacity:0.6 }} />
    <img src="/logos/hashed.jpg" alt="HASHED" style={{ height:32, objectFit:'contain', filter:'grayscale(100%)', opacity:0.6 }} />
    <img src="/logos/bloomingbit.jpg" alt="bloomingbit" style={{ height:32, objectFit:'contain', filter:'grayscale(100%)', opacity:0.6 }} />
  </div>
</section>
```

### Section 9: CTA Footer (네이비)
```tsx
<section style={{ background:'linear-gradient(135deg, #1B3A6B, #0A1628)', padding:'96px 24px', textAlign:'center' }}>
  <h2 style={{ fontSize:'clamp(32px,6vw,56px)', fontWeight:900, color:'#fff', marginBottom:16 }}>지금 바로 시작하세요.</h2>
  <p style={{ color:'rgba(255,255,255,0.7)', fontSize:18, marginBottom:40 }}>온라인 연습으로 내 AI 활용 점수를 미리 확인해보세요.</p>
  <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
    <a href="#practice" style={{ border:'2px solid rgba(255,255,255,0.3)', color:'#fff', borderRadius:32, padding:'14px 32px', fontWeight:700, textDecoration:'none', fontSize:16 }}>온라인 연습 ₩14,000</a>
    <a href="#register" style={{ background:'#C9A84C', color:'#0A1628', borderRadius:32, padding:'14px 32px', fontWeight:800, textDecoration:'none', fontSize:16 }}>본시험 접수 ₩79,000</a>
  </div>
</section>
```

### Footer
```tsx
<footer style={{ background:'#0F172A', padding:'40px 24px', textAlign:'center' }}>
  <div style={{ fontWeight:900, fontSize:20, color:'#1B3A6B', marginBottom:8 }}>TAPEX</div>
  <p style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>© 2026 TAPEX. 한국경제신문 인증.</p>
</footer>
```

---

## 중요 규칙
1. **모든 스타일 → inline style만** (Tailwind 클래스 일절 금지)
2. **`<img>` 태그** 사용 (Next.js Image 컴포넌트 금지)
3. **framer-motion 금지** (plain CSS + 간단한 useState로 대체)
4. 'use client' 선언 맨 위에 필수
5. NavBar + 모든 섹션 + Footer를 한 파일(page.tsx)에 전부 작성
6. 각 섹션 사이 `paddingTop: 80, paddingBottom: 80`

## 완료 후
```bash
cd /Users/gimseojun/raon-workspace/projects/tapex
npm run build 2>&1 | tail -10
git add .
git commit -m "fix: complete rebuild with inline styles, no Tailwind custom classes"
git push origin main
vercel --yes --prod --scope seojoonkims-projects 2>&1 | tail -5
```

빌드 성공 후 배포 URL 알려줘!
