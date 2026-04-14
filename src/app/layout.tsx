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
  openGraph: {
    title: 'Cine TV - Assinatura Premium | HD e 4K',
    description: 'Melhor IPTV 2026 - Teste Grátis. Canais ao Vivo em HD e 4K, Filmes, Séries e a melhor estabilidade com a Cine TV.',
    images: ['/logo.jpg'],
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo.jpg'],
  },
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#060608" />
      </head>
      <body className={`${nunito.variable} ${orbitron.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
