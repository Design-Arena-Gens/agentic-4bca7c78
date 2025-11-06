import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Indian Micro Brand Inspiration Index',
  description: 'Curated gallery of creative posts and carousels from lesser-known Indian micro brands across niches.',
  metadataBase: new URL('https://agentic-4bca7c78.vercel.app'),
  openGraph: {
    title: 'Indian Micro Brand Inspiration Index',
    description: 'Swipe-worthy creative inspiration from under-the-radar Indian brands.',
    url: 'https://agentic-4bca7c78.vercel.app',
    siteName: 'Inspiration Index',
    locale: 'en_IN',
    type: 'website'
  },
  keywords: [
    'Indian micro brands',
    'creative carousels',
    'social media inspiration',
    'brand design reference'
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
