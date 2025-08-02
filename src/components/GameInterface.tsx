"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Trophy,
  Target,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  BarChart3,
  List,
  Settings,
  Share2,
} from "lucide-react";
import ScoreDisplay from "./ScoreDisplay";
import GameStats from "./GameStats";
import MoveList from "~/app/(main_page)/components/MoveList";
import GameMeta from "~/app/(main_page)/components/GameMeta";
import ShareGame from "./ShareGame";
import ChessViewer from "~/components/board/board";
import { ScoreResult } from "~/lib/scoring";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import Link from "next/link";

interface GameInterfaceProps {
  // Game state
  gameStage: "initial" | "guessing" | "revealed";
  isLoading: boolean;
  guessedElo: number;
  setGuessedElo: (value: number) => void;
  actualElo: number;
  whitePlayer: string;
  blackPlayer: string;
  whitePlayerElo: number;
  blackPlayerElo: number;
  gameLink: string;
  pgn: string;
  currentMove: number;
  onMoveChange: (moveIndex: number) => void;
  boardOrientation: "white" | "black";

  // Scoring
  currentScore: ScoreResult | null;
  totalScore: number;
  gamesPlayed: number;
  currentStreak: number;
  bestStreak: number;
  averageScore: number;

  // Game metadata
  gameDate: string;
  gameTime: string;
  timeControl: string;
  gameResult: string;
  gameTermination: string;

  // Handlers
  handleGuess: () => void;
  handleNextGameWithReset: () => void;
  handlePreviousMove: () => void;
  handleNextMove: () => void;
  handleFlipBoard: () => void;
  handleStartGuessing: () => void;

  // Import functionality
  importDialogOpen?: boolean;
  setImportDialogOpen?: (open: boolean) => void;
  importPgn?: string;
  setImportPgn?: (pgn: string) => void;
  importError?: string | null;
  handleImportPgn?: () => void;
}

export default function GameInterface({
  gameStage,
  isLoading,
  guessedElo,
  setGuessedElo,
  actualElo,
  whitePlayer,
  blackPlayer,
  whitePlayerElo,
  blackPlayerElo,
  gameLink,
  pgn,
  currentMove,
  onMoveChange,
  boardOrientation,
  currentScore,
  totalScore,
  gamesPlayed,
  currentStreak,
  bestStreak,
  averageScore,
  gameDate,
  gameTime,
  timeControl,
  gameResult,
  gameTermination,
  handleGuess,
  handleNextGameWithReset,
  handlePreviousMove,
  handleNextMove,
  handleFlipBoard,
  handleStartGuessing,
  importDialogOpen,
  setImportDialogOpen,
  importPgn,
  setImportPgn,
  importError,
  handleImportPgn,
}: GameInterfaceProps) {
  if (gameStage === "initial") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <CardTitle className="text-3xl font-bold">
                Guess The Elo
              </CardTitle>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Test your chess rating intuition by guessing the average Elo of
              players based on their gameplay.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleStartGuessing}
              className="w-full h-12 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Start Game"}
            </Button>

            {setImportDialogOpen && (
              <Dialog
                open={importDialogOpen}
                onOpenChange={setImportDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-12 text-lg font-semibold"
                    onClick={() => setImportDialogOpen(true)}
                  >
                    Import Game
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Import Chess Game (PGN)</DialogTitle>
                  </DialogHeader>
                  <div className="mt-2">
                    <Textarea
                      value={importPgn || ""}
                      onChange={(e) => setImportPgn?.(e.target.value)}
                      rows={12}
                      placeholder="Paste your PGN here..."
                      className="w-full h-64"
                    />
                    {importError && (
                      <div className="text-red-500 text-sm mt-2">
                        {importError}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-4 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setImportDialogOpen(false);
                        setImportPgn?.("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleImportPgn}>Import & Guess</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {gamesPlayed > 0 && (
              <div className="pt-4 border-t">
                <GameStats
                  gamesPlayed={gamesPlayed}
                  totalScore={totalScore}
                  averageScore={averageScore}
                  currentStreak={currentStreak}
                  bestStreak={bestStreak}
                />
              </div>
            )}

            <div className="pt-4 border-t">
              <Link href="/leaderboard">
                <Card className="w-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <span className="text-lg font-semibold">
                        View Leaderboard
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                      See how you rank against other players
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen justify-between bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Left Panel - Chess Board */}
      <div className="flex flex-1 w-max flex-col p-4">
        {/* Player Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">♔</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {gameStage === "revealed"
                  ? boardOrientation === "white"
                    ? blackPlayer
                    : whitePlayer
                  : "Player 2"}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {gameStage === "revealed"
                  ? `${
                      boardOrientation === "white"
                        ? blackPlayerElo
                        : whitePlayerElo
                    } Elo`
                  : ""}
              </div>
            </div>
          </div>
        </div>

        {/* Chess Board */}
        <div className="h-max w-full rounded-lg overflow-hidden">
          <ChessViewer
            pgn={pgn}
            currentMove={currentMove}
            onMoveChange={onMoveChange}
            boardOrientation={boardOrientation}
            onFenChange={() => {}}
            isGameFetched={true}
          />
        </div>

        {/* Bottom Player Info */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
              <span className="text-black text-lg font-bold">♔</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {gameStage === "revealed"
                  ? boardOrientation === "white"
                    ? whitePlayer
                    : blackPlayer
                  : "Player 1"}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {gameStage === "revealed"
                  ? `${
                      boardOrientation === "white"
                        ? whitePlayerElo
                        : blackPlayerElo
                    } Elo`
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Game Controls & Info */}
      <div className="w-[500px] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
        <Tabs defaultValue="game" className="h-full flex flex-col">
          <div className="border-b border-gray-200 dark:border-gray-700 p-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="game" className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                Game
              </TabsTrigger>
              <TabsTrigger value="moves" className="flex items-center gap-1">
                <List className="h-4 w-4" />
                Moves
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                Analysis
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                Info
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Game Tab */}
            <TabsContent value="game" className="h-full p-4 space-y-4">
              {gameStage === "guessing" && (
                <div className="flex flex-col items-center w-full gap-3">
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Guess The Elo
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {guessedElo}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Your Guess
                        </div>
                      </div>

                      <Slider
                        min={500}
                        max={2500}
                        step={50}
                        value={[guessedElo]}
                        onValueChange={(value) => setGuessedElo(value[0])}
                        className="w-full"
                      />

                      <Button onClick={handleGuess} className="w-full h-10">
                        Submit Guess
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="flex items-center gap-2 w-full">
                    <Button
                      variant="default"
                      size={"lg"}
                      onClick={handlePreviousMove}
                      className="p-0 flex-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size={"lg"}
                      onClick={handleFlipBoard}
                      className="p-0 flex-none"
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="default"
                      size={"lg"}
                      onClick={handleNextMove}
                      className="p-0 flex-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {gameStage === "revealed" && currentScore && (
                <div className="space-y-4">
                  <ScoreDisplay
                    scoreResult={currentScore}
                    guessedElo={guessedElo}
                    actualElo={actualElo}
                    currentStreak={currentStreak}
                    bestStreak={bestStreak}
                    gamesPlayed={gamesPlayed}
                    averageScore={averageScore}
                  />

                  <div className="flex items-center gap-2">
                    <ShareGame
                      gameLink={gameLink}
                      pgn={pgn}
                      playerA={whitePlayer}
                      playerB={blackPlayer}
                    />
                    <Button
                      className="flex-1"
                      onClick={handleNextGameWithReset}
                    >
                      Next Game
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Moves Tab */}
            <TabsContent value="moves" className="h-full p-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <List className="h-5 w-5" />
                    Move List
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MoveList
                    pgn={pgn}
                    currentMove={currentMove}
                    onMoveChange={onMoveChange}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="h-full p-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Game Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {gamesPlayed > 0 && (
                    <GameStats
                      gamesPlayed={gamesPlayed}
                      totalScore={totalScore}
                      averageScore={averageScore}
                      currentStreak={currentStreak}
                      bestStreak={bestStreak}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Info Tab */}
            <TabsContent value="info" className="h-full p-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Game Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GameMeta
                    gameDate={gameDate}
                    gameTime={gameTime}
                    timeControl={timeControl}
                    gameResult={gameResult}
                    gameStage={gameStage}
                    gameTermination={gameTermination}
                    gameLink={gameLink}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
