# Guess The Elo

A chess training app that tests your ability to guess player Elo ratings by watching their games. Challenge your chess intuition and see how well you understand different skill levels.

## Features

- Watch real chess games and guess player ratings
- Get scored feedback with accuracy metrics
- Compete on the global leaderboard
- Import your own PGN games for practice
- Navigate through games with simple controls
- Track your progress with detailed stats
- Works on desktop and mobile

## Tech Stack

- Next.js 15 with App Router
- React 19 and TypeScript
- Tailwind CSS v4 for styling
- Radix UI for components
- chess.js and react-chessboard for chess logic
- Custom React hooks for state management
- Lucide React for icons
- Sonner for notifications

## Getting Started

1. Clone the repo
   ```bash
   git clone https://github.com/hellofaizan/gte.git
   cd guesstheelo
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the dev server
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## Project Structure

```
src/
├── app/
│   ├── (main_page)/          # Main game page
│   ├── leaderboard/          # Leaderboard page
│   └── layout.tsx           # Root layout
├── components/
│   ├── GameInterface.tsx     # Main game UI
│   ├── board/               # Chess board components
│   └── ui/                  # UI components
├── hooks/
│   └── use-chess-game.ts    # Game logic
├── lib/
│   └── scoring.ts           # Scoring algorithm
└── actions/
    └── chessgames.ts        # API integration
```

## How to Play

1. Click "Start Game" to load a random chess game
2. Watch the game and navigate through moves
3. Use the slider to guess the average Elo rating
4. Submit your guess to see your results
5. Check your score and grade
6. Compare your performance on the leaderboard

## Configuration

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://guesselo.mohammadfaizan.in/
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
```

Update these files with your domain:
- `src/app/layout.tsx` - metadataBase URL
- `src/app/sitemap.ts` - baseUrl
- `public/robots.txt` - sitemap URL

## Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Other platforms
```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Credits

- Chess.com for game data
- chess.js for chess logic
- react-chessboard for the interface
- Radix UI for components
- Tailwind CSS for styling

## Support

Email faizan@mohammadfaizan.in or open an issue in this repo.

---

Made with chess by Mohammad Faizan