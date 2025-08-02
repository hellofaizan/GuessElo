import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "~/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Guess The Elo - Test Your Chess Rating Intuition",
    template: "%s | Guess The Elo"
  },
  description: "Challenge your chess rating intuition! Watch chess games and guess the average Elo rating of the players. Test your knowledge, compete on the leaderboard, and improve your chess understanding.",
  keywords: [
    "chess",
    "elo rating",
    "chess game",
    "chess analysis",
    "chess training",
    "chess rating",
    "chess intuition",
    "chess practice",
    "chess improvement",
    "chess skills"
  ],
  authors: [{ name: "Guess The Elo Team" }],
  creator: "Guess The Elo",
  publisher: "Guess The Elo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://guesstheelo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://guesstheelo.com',
    title: 'Guess The Elo - Test Your Chess Rating Intuition',
    description: 'Challenge your chess rating intuition! Watch chess games and guess the average Elo rating of the players. Test your knowledge, compete on the leaderboard, and improve your chess understanding.',
    siteName: 'Guess The Elo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Guess The Elo - Chess Rating Challenge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guess The Elo - Test Your Chess Rating Intuition',
    description: 'Challenge your chess rating intuition! Watch chess games and guess the average Elo rating of the players.',
    images: ['/og-image.png'],
    creator: '@guesstheelo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
