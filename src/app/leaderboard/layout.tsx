import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard - Guess The Elo",
  description: "View the top players in Guess The Elo. See rankings, scores, streaks, and compete with the best chess rating guessers.",
  keywords: [
    "chess leaderboard",
    "elo guessing leaderboard",
    "chess competition",
    "chess rankings",
    "chess scores"
  ],
  openGraph: {
    title: "Leaderboard - Guess The Elo",
    description: "View the top players in Guess The Elo. See rankings, scores, streaks, and compete with the best chess rating guessers.",
    url: "https://guesstheelo.com/leaderboard",
    siteName: "Guess The Elo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Guess The Elo Leaderboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leaderboard - Guess The Elo",
    description: "View the top players in Guess The Elo. See rankings, scores, streaks, and compete with the best chess rating guessers.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/leaderboard",
  },
};

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 