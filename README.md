# ♟️ GTE Chess Explorer

A modern, interactive chess game explorer and analysis tool built with Next.js, featuring a beautiful UI, real-time move lists, sound effects, and advanced customization. Perfect for studying games, playing against yourself, or sharing chess moments.

![GTE Chess Preview](public/file.svg)

## ✨ Features

### 🕹️ Interactive Chessboard
- **Drag & Drop Moves**: Intuitive piece movement
- **Legal Move Highlighting**: Visual cues for possible moves
- **Move Animation**: Smooth transitions for every move
- **Sound Effects**: Realistic chess sounds for moves, captures, checks, and more

### 📜 Move List & Game Details
- **Real-time Move List**: Track every move as you play or explore
- **Game Metadata**: Display player names, event, date, and more
- **Move Navigation**: Jump to any move in the game

### ⏰ Clocks & Timers
- **Dual Player Clocks**: Track time for both sides
- **Custom Time Controls**: Set your own game pace

### 🧑‍💻 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Mode**: Automatic theme switching
- **Intuitive Controls**: Clean, organized interface

### 🔊 Audio & Visual Feedback
- **Customizable Sounds**: Toggle sound effects for different actions
- **Piece & Board Themes**: Choose from multiple visual styles

### 📂 Game Management
- **Load Random Games**: Instantly load a random chess game
- **Game Export**: Download games in PGN format (coming soon)
- **Game Import**: Paste or upload your own PGN (coming soon)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hellofaizan/gte.git
   cd gte
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

## 📝 TODO

- [x] Interactive chessboard with drag & drop
- [x] Move list and navigation
- [x] Game metadata display
- [x] Sound effects for moves and events
- [x] Responsive, modern UI
- [x] Dark/Light mode
- [x] Player clocks and timers
- [ ] Import PGN (paste/upload)
- [ ] Export PGN
- [ ] Custom board and piece Themes
- [ ] Save/load games to local storage
- [ ] Shareable game links
- [ ] Fun randomizer button (load random famous games)
- [ ] Add more sound and visual themes
- [ ] Simple animation (piece bounce, highlight last move)
- [ ] Cloud save support
- [ ] Add text overlay or annotation tools
- [ ] Multiplayer support (online play)
- [ ] Add more color presets for board and pieces

---

*This list is for fun and learning! If you have ideas, feel free to open an issue or PR.*

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Chess Logic**: [chess.js](https://github.com/jhlywa/chess.js) (if used)
- **Sound**: Native HTML5 Audio

## 📁 Project Structure

```
gte/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (main_page)/     # Main chess page and components
│   │   ├── api/             # API routes (random game, etc.)
│   │   ├── globals.css      # Global styles
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── board/           # Chessboard, pieces, sounds
│   │   ├── ui/              # Reusable UI components
│   │   ├── aboutgte.tsx     # About page/component
│   │   ├── evaluation.tsx   # Evaluation bar/component
│   │   ├── gamedetails.tsx  # Game metadata
│   │   └── timer.tsx        # Clocks and timers
│   ├── actions/             # Server actions (game, clock)
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions
├── public/                  # Static assets (pieces, sounds, icons)
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## ♟️ Usage Guide

### Playing or Exploring a Game

1. **Start a New Game**
   - Use the controls to start a new game or load a random one
2. **Move Pieces**
   - Drag and drop pieces, or tap to select and move
3. **Track Progress**
   - Watch the move list update in real time
   - See clocks and game metadata update as you play
4. **Customize Experience**
   - Toggle sound, switch themes, and adjust settings in the sidebar

### Tips for Best Results

- **For Study**: Use the move list and metadata to analyze famous games
- **For Fun**: Try the random game feature or experiment with different themes
- **For Accessibility**: Use keyboard navigation and screen reader features (improving soon!)

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, open an issue first to discuss your ideas.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [chess.js](https://github.com/jhlywa/chess.js) for chess logic
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Onion UI Docs](https://onionui.github.io/docs/apps/logotweak) for inspiration on features and accessibility

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the existing issues for solutions
- Join our community discussions

---

**Made with ❤️ by Mohammad Faizan**
