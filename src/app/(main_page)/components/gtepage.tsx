"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Medal,
  Trophy,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import ChessViewer from "~/components/board/board";
import { useChessGame } from "~/hooks/use-chess-game";
import GameControls from "./GameControls";
import PlayerInfo from "./PlayerInfo";
import GameMeta from "./GameMeta";
import MoveList from "./MoveList";
import { Slider } from "~/components/ui/slider";
import { toast } from "sonner";
import { Separator } from "~/components/ui/separator";
import ShareGame from "~/components/ShareGame";

export default function GTEPage() {
  const {
    game,
    currentMove,
    guessedElo,
    setGuessedElo,
    actualElo,
    whitePlayer,
    blackPlayer,
    whitePlayerElo,
    blackPlayerElo,
    gameLink,
    isLoading,
    gameStarted,
    clockTimes,
    gameResult,
    gameDate,
    gameTime,
    timeControl,
    currentClockIndex,
    gameTermination,
    gameStage,
    boardOrientation,
    handleNextGameWithReset,
    handlePreviousMove,
    handleNextMove,
    handleMoveSelect,
    handleGuess,
    handleStartGuessing,
    handleOpenGuessPopup,
    handleFlipBoard,
    clearError,
    error,
  } = useChessGame();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePreviousMove();
      } else if (event.key === "ArrowRight") {
        handleNextMove();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePreviousMove, handleNextMove]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const getCurrentClockTime = (position: "top" | "bottom") => {
    const isWhiteBottom = boardOrientation === "white";
    const index =
      currentClockIndex * 2 +
      ((position === "bottom") === isWhiteBottom ? 0 : 1);
    return clockTimes[index] || "00:00";
  };

  const getPlayerDisplayName = (position: "top" | "bottom"): string => {
    const isWhiteBottom = boardOrientation === "white";
    const isPlayerOne =
      (position === "bottom" && isWhiteBottom) ||
      (position === "top" && !isWhiteBottom);

    if (gameStage === "revealed") {
      return isPlayerOne ? whitePlayer || "" : blackPlayer || "";
    }
    // Before reveal, show Player 1/Player 2
    return isPlayerOne ? "Player 1" : "Player 2";
  };

  const getPlayerElo = (position: "top" | "bottom"): number | null => {
    const isWhiteBottom = boardOrientation === "white";
    const isPlayerOne =
      (position === "bottom" && isWhiteBottom) ||
      (position === "top" && !isWhiteBottom);

    if (gameStage === "revealed") {
      return isPlayerOne ? whitePlayerElo : blackPlayerElo;
    }
    return null;
  };

  const handleFenChange = useCallback((fen: string) => {
    // This function is passed to ChessViewer but can be empty for now
  }, []);

  if (isMobile) {
    return (
      <div className="flex h-screen w-screen flex-col items-center p-4">
        <div className="flex w-full max-w-md items-center justify-center rounded-lg">
          <PlayerInfo
            name={getPlayerDisplayName("top")}
            color={boardOrientation === "white" ? "black" : "white"}
            clockTime={getCurrentClockTime("top")}
            position="top"
          />
        </div>

        <div className="w-full max-w-md">
          <ChessViewer
            pgn={game.pgn()}
            currentMove={currentMove}
            onMoveChange={handleMoveSelect}
            boardOrientation={boardOrientation}
            onFenChange={handleFenChange}
            isGameFetched={gameStarted}
          />
        </div>

        <div className="flex w-full max-w-md items-center justify-between rounded-lg">
          <PlayerInfo
            name={getPlayerDisplayName("bottom")}
            color={boardOrientation === "white" ? "white" : "black"}
            clockTime={getCurrentClockTime("bottom")}
            position="bottom"
          />
        </div>

        <div className="flex flex-col items-center mt-4 mb-4 gap-4 w-full border border-border rounded-lg p-4">
          {gameStage !== "initial" && (
            <div className="w-full max-w-md">
              <GameControls
                gameStage={gameStage}
                isMobile={isMobile}
                handlePreviousMove={handlePreviousMove}
                handleNextMove={handleNextMove}
                handleFlipBoard={handleFlipBoard}
                handleNextGameWithReset={handleNextGameWithReset}
                guessedElo={guessedElo}
                setGuessedElo={setGuessedElo}
                handleGuess={handleGuess}
              />
            </div>
          )}

          {gameStage !== "initial" ? (
            <div className="w-full max-w-md">
              {gameStage === "revealed" && (
                <div className="mb-4 rounded-lg border border-green-400 bg-green-50 p-4 text-center">
                  <div className="text-lg font-bold mb-1">
                    Your Guess:{" "}
                    <span className="text-primary">{guessedElo}</span>
                  </div>
                  <div className="text-lg mb-1">
                    Actual Elo: <span className="font-bold">{actualElo}</span>
                  </div>
                  <div className="text-lg">
                    Score:{" "}
                    <span className="font-bold">
                      {Math.max(0, 1500 - Math.abs(actualElo - guessedElo))}
                    </span>
                  </div>
                </div>
              )}
              <MoveList
                pgn={game.pgn()}
                currentMove={currentMove}
                onMoveChange={handleMoveSelect}
              />
            </div>
          ) : (
            <div className="w-full max-w-md rounded-lg text-center">
              <h2 className="mb-2 text-xl font-bold">GUESS THE ELO</h2>
              <p className="mb-4 text-sm">
                Guess the Elo is a fun game where you try to guess the average
                Elo rating of two chess players based on their gameplay. Can you
                accurately estimate their skill level?
              </p>
              <Button
                onClick={handleStartGuessing}
                className="w-full rounded-lg px-4 py-2 font-bold cursor-pointer"
                disabled={isLoading || gameStage !== "initial"}
              >
                {isLoading ? "Loading..." : "START GUESSING"}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col justify-center">
          <PlayerInfo
            name={getPlayerDisplayName("top")}
            elo={getPlayerElo("top")}
            color={boardOrientation === "white" ? "black" : "white"}
            clockTime={getCurrentClockTime("top")}
            position="top"
          />
          <div className="my-1 h-max w-full">
            <ChessViewer
              pgn={game.pgn()}
              currentMove={currentMove}
              onMoveChange={handleMoveSelect}
              boardOrientation={boardOrientation}
              onFenChange={handleFenChange}
              isGameFetched={gameStarted}
            />
          </div>
          <PlayerInfo
            name={getPlayerDisplayName("bottom")}
            elo={getPlayerElo("bottom")}
            color={boardOrientation === "white" ? "white" : "black"}
            clockTime={getCurrentClockTime("bottom")}
            position="bottom"
          />

          {/* Controls Bar */}
          {(gameStage === "guessing" || gameStage === "revealed") && (
            <div className="mt-2 h-12 flex w-full items-center justify-between rounded-lg overflow-hidden">
              <Button
                className="flex-1 h-full flex items-center justify-cente rounded-r-none transition-colors"
                onClick={handlePreviousMove}
                aria-label="Previous Move"
              >
                <ChevronLeft size={32} />
              </Button>
              <Button
                className="flex-1 h-full flex items-center justify-center py-3 rounded-none transition-colors border-x"
                onClick={handleFlipBoard}
                aria-label="Flip Board"
                title=""
              >
                <ArrowUpDown size={28} />
              </Button>
              <Button
                className="flex-1 h-full flex items-center justify-center rounded-l-none transition-colors"
                onClick={handleNextMove}
                aria-label="Next Move"
              >
                <ChevronRight size={32} />
              </Button>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-2">
          {gameStage === "initial" && (
            <>
              <div className="rounded-lg border border-border p-6">
                <h2 className="mb-4 text-2xl font-bold uppercase">
                  Guess the Elo
                </h2>
                <p className="mb-6">
                  Guess the Elo is a fun game where you try to guess the average
                  Elo rating of two chess players based on their gameplay. Can
                  you accurately estimate their skill level?
                </p>
                <Button
                  onClick={handleStartGuessing}
                  className="w-full rounded-md py-3 cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Start Guessing"}
                </Button>
              </div>
              <div className="rounded-lg border border-border p-6">
                <h2 className="mb-4 text-2xl font-bold uppercase">
                  Leaderboard
                </h2>
                <p className="">Coming Soon...</p>
              </div>
            </>
          )}

          {(gameStage === "guessing" || gameStage === "revealed") && (
            <>
              <div className="rounded-lg border border-border p-6">
                <h2 className="mb-4 text-2xl font-bold uppercase">
                  Guess the Elo
                </h2>
                <Slider
                  min={500}
                  max={2500}
                  step={50}
                  value={[guessedElo]}
                  onValueChange={(value) => setGuessedElo(value[0])}
                  className="my-6"
                  disabled={gameStage === "revealed"}
                />
                <div className="mb-6 text-center text-lg">
                  Guessed Elo: <span className="font-bold">{guessedElo}</span>
                </div>
                <Button
                  onClick={handleGuess}
                  className="w-full rounded-md py-3 cursor-pointer"
                  disabled={gameStage === "revealed"}
                  hidden={gameStage === "revealed"}
                >
                  Submit Guess
                </Button>
                {gameStage === "revealed" && (
                  <div className="mt-4 text-center w-full flex flex-col gap-2">
                    <Button
                      onClick={handleNextGameWithReset}
                      className="mt-4 w-full rounded-md py-3 cursor-pointer"
                    >
                      Next Game
                    </Button>
                    <ShareGame gameLink={gameLink} pgn={game.pgn()} playerA={whitePlayer} playerB={blackPlayer} />
                  </div>
                )}
              </div>
              <div className="rounded-lg border border-border p-6">
                <GameMeta
                  gameDate={gameDate}
                  gameTime={gameTime}
                  timeControl={timeControl}
                  gameResult={gameResult}
                  gameStage={gameStage}
                  gameTermination={gameTermination}
                  gameLink={gameLink}
                />
              </div>
              <div className="rounded-lg border border-border p-6">
                {gameStage === "revealed" && (
                  <div className="mb-4 rounded-lg border border-green-400 bg-green-50 p-4 text-center">
                    <div className="flex gap-4 w-full justify-center">
                      <div className="text-lg font-bold mb-1">
                        Your Guess:{" "}
                        <span className="text-primary">{guessedElo}</span>
                      </div>
                      <div className="text-lg mb-1">
                        Actual Elo:{" "}
                        <span className="font-bold">{actualElo}</span>
                      </div>
                    </div>
                    <div className="text-lg">
                      Score:{" "}
                      <span className="font-bold">
                        {Math.max(0, 1500 - Math.abs(actualElo - guessedElo))}
                      </span>
                    </div>
                  </div>
                )}
                <MoveList
                  pgn={game.pgn()}
                  currentMove={currentMove}
                  onMoveChange={handleMoveSelect}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
