import React from "react";
import type { Metadata } from "next";
import GTEPage from "./components/gtepage";

export const metadata: Metadata = {
  title: "Guess The Elo - Test Your Chess Rating Intuition",
  description: "Challenge your chess rating intuition! Watch chess games and guess the average Elo rating of the players. Test your knowledge, compete on the leaderboard, and improve your chess understanding.",
  keywords: [
    "chess elo guessing game",
    "chess rating challenge",
    "chess training app",
    "chess analysis tool",
    "chess improvement game"
  ],
  openGraph: {
    title: "Guess The Elo - Test Your Chess Rating Intuition",
    description: "Challenge your chess rating intuition! Watch chess games and guess the average Elo rating of the players.",
    url: "https://guesstheelo.com",
    siteName: "Guess The Elo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Guess The Elo - Chess Rating Challenge",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guess The Elo - Test Your Chess Rating Intuition",
    description: "Challenge your chess rating intuition! Watch chess games and guess the average Elo rating of the players.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Guess The Elo",
            "description": "A chess training application that challenges users to guess the Elo rating of players based on their gameplay",
            "url": "https://guesstheelo.com",
            "applicationCategory": "Game",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "Guess The Elo Team"
            },
            "genre": ["Chess", "Training", "Game"],
            "keywords": "chess, elo rating, chess training, chess game, chess analysis",
            "screenshot": "https://guesstheelo.com/og-image.png",
            "featureList": [
              "Watch chess games and guess player Elo ratings",
              "Interactive chess board with move navigation",
              "Scoring system with grades and streaks",
              "Leaderboard competition",
              "Import custom PGN games",
              "Share games with others"
            ]
          })
        }}
      />
      <GTEPage />
    </>
  );
}