import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'ATHENA — 키움증권의 AI 투자 워크스페이스',
  icons: { icon: '/brand/athena.png' },
  description:
    '투자의 모든 생각이, 하나의 흐름으로. Agora, Metis, Aegis, Ergane, Pallas와 글로우가 함께하는 키움증권의 ATHENA.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main">
          본문으로 이동
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
