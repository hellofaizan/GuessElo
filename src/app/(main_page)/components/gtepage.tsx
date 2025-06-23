"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Medal, Trophy } from "lucide-react";
import { Button } from "~/components/ui/button";
import ChessViewer from "~/components/board/board";
import { useChessGame } from "~/hooks/use-chess-game";
import GameControls from "./GameControls";
import PlayerInfo from "./PlayerInfo";
import GameMeta from "./GameMeta";
import MoveList from "./MoveList";
import { Slider } from "~/components/ui/slider";

export default function GTEPage() {
  const {
    game,
    currentMove,
    guessedElo,
    setGuessedElo,
    hasGuessed,
    actualElo,
    whitePlayer,
    blackPlayer,
    gameLink,
    isLoading,
    gameStarted,
    bmMemberColor,
    clockTimes,
    gameResult,
    showGuessPopup,
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
    handleCloseGuessPopup,
    handleFlipBoard,
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

  const getCurrentClockTime = (position: "top" | "bottom") => {
    const isWhiteBottom = boardOrientation === "white";
    const index =
      currentClockIndex * 2 +
      ((position === "bottom") === isWhiteBottom ? 0 : 1);
    return clockTimes[index] || "00:00";
  };

  const getPlayerDisplayName = (position: "top" | "bottom"): string => {
    const isWhiteBottom = boardOrientation === "white";
    const isPlayerOne = (position === "bottom" && isWhiteBottom) || (position === "top" && !isWhiteBottom);

    if (gameStage === "revealed") {
      if (bmMemberColor === "white") {
        return isPlayerOne ? whitePlayer || "" : blackPlayer || "";
      } else {
        return isPlayerOne ? blackPlayer || "" : whitePlayer || "";
      }
    }
    // Before reveal, show Player 1/Player 2
    return isPlayerOne ? "Player 1" : "Player 2";
  };

  const handleFenChange = useCallback((fen: string) => {
    // This function is passed to ChessViewer but can be empty for now
  }, []);

  if (isMobile) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-between bg-gray-100 p-4">
        <div className="flex w-full max-w-md items-center justify-between rounded-lg bg-gray-800 p-2 text-white shadow-md">
          <PlayerInfo
            name={getPlayerDisplayName("top")}
            color={boardOrientation === "white" ? "black" : "white"}
            clockTime={getCurrentClockTime("top")}
            position="top"
          />
        </div>

        <div className="flex flex-col items-center gap-4 py-4">
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

          {gameStage !== "initial" && (
            <div className="w-full max-w-md">
              <GameControls
                gameStage={gameStage}
                isMobile={isMobile}
                handlePreviousMove={handlePreviousMove}
                handleNextMove={handleNextMove}
                handleFlipBoard={handleFlipBoard}
                handleOpenGuessPopup={handleOpenGuessPopup}
                handleNextGameWithReset={handleNextGameWithReset}
              />
            </div>
          )}

          {gameStage !== "initial" ? (
            <div className="w-full max-w-md">
              <MoveList
                pgn={game.pgn()}
                currentMove={currentMove}
                onMoveChange={handleMoveSelect}
              />
            </div>
          ) : (
            <div className="w-full max-w-md rounded-lg bg-gray-800 p-4 text-center text-white shadow-md">
              <h2 className="mb-2 text-xl font-bold">GUESS THE ELO</h2>
              <p className="mb-4 text-sm">
                Guess the Elo is a fun game where you try to guess the average
                Elo rating of two chess players based on their gameplay. Can you
                accurately estimate their skill level?
              </p>
              <Button
                onClick={handleStartGuessing}
                className="w-full rounded-lg bg-white px-4 py-2 font-bold text-gray-800 hover:bg-gray-200"
                disabled={isLoading || gameStage !== "initial"}
              >
                {isLoading ? "Loading..." : "START GUESSING"}
              </Button>
            </div>
          )}
        </div>

        <div className="flex w-full max-w-md items-center justify-between rounded-lg bg-gray-800 p-2 text-white shadow-md">
          <PlayerInfo
            name={getPlayerDisplayName("bottom")}
            color={boardOrientation === "white" ? "white" : "black"}
            clockTime={getCurrentClockTime("bottom")}
            position="bottom"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col justify-center">
          <PlayerInfo
            name={getPlayerDisplayName("top")}
            color={boardOrientation === "white" ? "black" : "white"}
            clockTime={getCurrentClockTime("top")}
            position="top"
          />
          <div className="my-2 h-max w-full">
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
            color={boardOrientation === "white" ? "white" : "black"}
            clockTime={getCurrentClockTime("bottom")}
            position="bottom"
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {gameStage === "initial" && (
            <>
              <div className="rounded-lg bg-gray-800 p-6 text-white">
                <h2 className="mb-4 text-2xl font-bold uppercase">
                  Guess the Elo
                </h2>
                <p className="mb-6 text-gray-300">
                  Guess the Elo is a fun game where you try to guess the average
                  Elo rating of two chess players based on their gameplay. Can
                  you accurately estimate their skill level?
                </p>
                <Button
                  onClick={handleStartGuessing}
                  className="w-full rounded-md bg-white py-3 text-lg font-bold uppercase text-gray-800 hover:bg-gray-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Start Guessing"}
                </Button>
              </div>
              <div className="rounded-lg bg-gray-800 p-6 text-white">
                <h2 className="mb-4 text-2xl font-bold uppercase">
                  Leaderboard
                </h2>
                <p className="text-gray-300">Coming Soon...</p>
              </div>
            </>
          )}

          {(gameStage === "guessing" || gameStage === "revealed") && (
            <>
              <div className="rounded-lg bg-gray-800 p-6 text-white">
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
                  Guessed Elo:{" "}
                  <span className="font-bold">{guessedElo}</span>
                </div>
                <Button
                  onClick={handleGuess}
                  className="w-full rounded-md bg-white py-3 text-lg font-bold uppercase text-gray-800 hover:bg-gray-200"
                  disabled={gameStage === "revealed"}
                >
                  Submit Guess
                </Button>
                {gameStage === "revealed" && (
                   <div className="mt-4 text-center">
                    <p>Actual Elo: {actualElo}</p>
                    <p className="font-bold">
                      Score:{" "}
                      {Math.max(0, 1500 - Math.abs(actualElo - guessedElo))}
                    </p>
                    <Button
                      onClick={handleNextGameWithReset}
                      className="mt-4 w-full rounded-md bg-green-500 py-3 text-lg font-bold uppercase text-white hover:bg-green-600"
                    >
                      Next Game
                    </Button>
                  </div>
                )}
              </div>
              <div className="rounded-lg bg-gray-800 p-6 text-white">
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
              <div className="rounded-lg bg-gray-800 p-6 text-white">
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
