# Guess The Elo 🏆♟️

A chess training application that challenges users to guess the Elo rating of players based on their gameplay. Test your chess intuition, compete on the leaderboard, and improve your understanding of chess skill levels.

## 🎯 Features

- **Interactive Chess Games**: Watch real chess games and guess player Elo ratings
- **Scoring System**: Get graded scores with detailed feedback and accuracy metrics
- **Leaderboard Competition**: Compete with other players worldwide
- **Game Import**: Import custom PGN games for practice
- **Move Navigation**: Navigate through games with intuitive controls
- **Statistics Tracking**: Monitor your progress with detailed analytics
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Radix UI Components
- **Chess Engine**: chess.js, react-chessboard
- **State Management**: React Hooks with custom useChessGame hook
- **UI Components**: Lucide React Icons, Sonner for notifications
- **SEO**: Next.js Metadata API, Structured Data (JSON-LD)

## 📊 SEO Features

### ✅ Implemented SEO Elements

- **Meta Tags**: Comprehensive title, description, and keyword optimization
- **Open Graph**: Rich social media sharing with custom images
- **Twitter Cards**: Optimized for Twitter sharing
- **Structured Data**: JSON-LD schema markup for search engines
- **Sitemap**: Dynamic XML sitemap generation
- **Robots.txt**: Search engine crawling instructions
- **Web App Manifest**: PWA capabilities for mobile devices
- **Canonical URLs**: Prevent duplicate content issues
- **Page-Specific Metadata**: Optimized for each route

### 🎯 SEO Keywords

Primary keywords: `chess elo guessing game`, `chess rating challenge`, `chess training app`, `chess analysis tool`, `chess improvement game`

Secondary keywords: `chess leaderboard`, `elo guessing leaderboard`, `chess competition`, `chess rankings`, `chess scores`

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/guesstheelo.git
   cd guesstheelo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
guesstheelo/
├── src/
│   ├── app/
│   │   ├── (main_page)/
│   │   │   ├── components/
│   │   │   │   ├── gtepage.tsx          # Main game interface
│   │   │   │   ├── GameControls.tsx     # Game navigation controls
│   │   │   │   ├── GameMeta.tsx         # Game metadata display
│   │   │   │   ├── MoveList.tsx         # Move list component
│   │   │   │   └── PlayerInfo.tsx       # Player information
│   │   │   └── page.tsx                 # Home page with SEO metadata
│   │   ├── leaderboard/
│   │   │   └── page.tsx                 # Leaderboard page with structured data
│   │   ├── layout.tsx                   # Root layout with global SEO
│   │   ├── sitemap.ts                   # Dynamic sitemap generation
│   │   └── globals.css                  # Global styles
│   ├── components/
│   │   ├── GameInterface.tsx            # Main game UI component
│   │   ├── ScoreDisplay.tsx             # Score results display
│   │   ├── GameStats.tsx                # Statistics component
│   │   ├── ShareGame.tsx                # Game sharing functionality
│   │   ├── board/
│   │   │   ├── board.tsx                # Chess board component
│   │   │   ├── pieces.tsx               # Chess pieces
│   │   │   └── sounds.tsx               # Sound effects
│   │   └── ui/                          # Radix UI components
│   ├── hooks/
│   │   └── use-chess-game.ts            # Main game logic hook
│   ├── lib/
│   │   ├── utils.ts                     # Utility functions
│   │   └── scoring.ts                   # Scoring algorithm
│   └── actions/
│       ├── chessgames.ts                # Chess.com API integration
│       └── getclock.ts                  # PGN clock processing
├── public/
│   ├── robots.txt                       # Search engine instructions
│   ├── site.webmanifest                 # PWA manifest
│   ├── favicon.ico                      # Site favicon
│   └── chessset/                        # Chess piece images
└── package.json
```

## 🎮 How to Play

1. **Start a Game**: Click "Start Game" to load a random chess game
2. **Watch the Game**: Navigate through moves using the controls
3. **Make Your Guess**: Use the slider to guess the average Elo rating
4. **Submit Your Guess**: Click "Submit Guess" to see your results
5. **View Results**: Get your score, grade, and detailed feedback
6. **Compete**: Check the leaderboard to see how you rank

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://guesstheelo.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
```

### SEO Configuration

Update the following files with your domain:

- `src/app/layout.tsx` - Update `metadataBase` URL
- `src/app/sitemap.ts` - Update `baseUrl`
- `public/robots.txt` - Update sitemap URL
- `public/site.webmanifest` - Update app details

## 📈 SEO Performance

### Core Web Vitals
- **LCP**: Optimized with Next.js Image component
- **FID**: Minimal JavaScript with efficient React rendering
- **CLS**: Stable layout with proper CSS

### Search Engine Optimization
- **Mobile-First**: Responsive design for all devices
- **Fast Loading**: Optimized bundle size and lazy loading
- **Accessibility**: ARIA labels and keyboard navigation
- **Structured Data**: Rich snippets for search results

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
```bash
npm run build
npm start
```

## 📊 Analytics

The application is ready for Google Analytics integration. Add your GA4 ID to the environment variables and implement tracking in the game components.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Chess.com](https://chess.com) for game data
- [chess.js](https://github.com/jhlywa/chess.js) for chess logic
- [react-chessboard](https://github.com/Clariity/react-chessboard) for the chess interface
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

For support, email support@guesstheelo.com or create an issue in this repository.

---

**Made with ♟️ by the Guess The Elo Team**