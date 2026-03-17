import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'TAPEX — AI 활용 능력 인증 시험',
  description:
    '4대 LLM을 실시간으로 다루는 능력을 측정하는 세계 최초의 AI 활용 능력 인증 시험. ChatGPT · Claude · Gemini · Grok.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={playfair.variable}>
      <body className="antialiased">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
