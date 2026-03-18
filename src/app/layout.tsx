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
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700;800;900&family=Noto+Serif+KR:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
