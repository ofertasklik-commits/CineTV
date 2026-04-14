import type { Metadata } from 'next';
import { Nunito, Orbitron } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '800', '900'],
  variable: '--font-title',
});

export const metadata: Metadata = {
  title: 'Cine TV - Assinatura Premium | HD e 4K',
  description: 'Melhor IPTV 2026 - Teste Grátis. Canais ao Vivo em HD e 4K, Filmes, Séries e a melhor estabilidade com a Cine TV.',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#060608" />
      </head>
      <body className={`${nunito.variable} ${orbitron.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
