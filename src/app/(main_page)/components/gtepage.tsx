"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Trophy,
  Medal,
  Lock,
  ArrowLeft,
  ArrowRight,
  Link,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import ChessViewer from "~/components/board/board";
import { useChessGame } from "~/hooks/use-chess-game";
import GameControls from "./GameControls";
import PlayerInfo from "./PlayerInfo";
import GameMeta from "./GameMeta";
import GuessPopup from "./GuessPopup";
import MoveList from "./MoveList";

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
      setIsMobile(window.innerWidth < 768);
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

  const getPlayerDisplayName = (position: "top" | "bottom") => {
    const isBmMemberBottom = boardOrientation === bmMemberColor;
    if (gameStage === "initial") {
      return (position === "bottom") === isBmMemberBottom
        ? "BM Member"
        : "Random Noob";
    } else if (gameStage === "guessing") {
      return (position === "bottom") === isBmMemberBottom
        ? "BM Member"
        : "Random Player";
    } else {
      return (position === "bottom") === isBmMemberBottom
        ? bmMemberColor === "white"
          ? whitePlayer
          : blackPlayer
        : bmMemberColor === "white"
        ? blackPlayer
        : whitePlayer;
    }
  };

  const handleFenChange = useCallback((fen: string) => {
    // Use the FEN here if needed, but don't set it as state
    // console.log("Current FEN:", fen);
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-4 lg:flex-row">
          <div className="flex h-full w-full flex-col items-center justify-between gap-4 lg:w-auto">
            <div className="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
              <PlayerInfo
                name={getPlayerDisplayName("top")}
                color={boardOrientation === "white" ? "white" : "black"}
                clockTime={getCurrentClockTime("top")}
                icon={<Medal className="text-neon-green" size={24} />}
              />
            </div>
            <div className="relative flex-1">
              <div className="flex h-full flex-col items-center justify-center gap-4">
                <div className="flex-1 h-full w-full">
                  <ChessViewer
                    pgn={game.pgn()}
                    currentMove={currentMove}
                    onMoveChange={handleMoveSelect}
                    boardOrientation={boardOrientation}
                    onFenChange={handleFenChange}
                    isGameFetched={gameStarted}
                  />
                </div>
                {gameStage !== "initial" && !isMobile && (
                  <GameControls
                    gameStage={gameStage}
                    isMobile={isMobile}
                    handlePreviousMove={handlePreviousMove}
                    handleNextMove={handleNextMove}
                    handleFlipBoard={handleFlipBoard}
                    handleOpenGuessPopup={handleOpenGuessPopup}
                    handleNextGameWithReset={handleNextGameWithReset}
                  />
                )}
              </div>
            </div>
            <div className="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
              <PlayerInfo
                name={getPlayerDisplayName("bottom")}
                color={boardOrientation === "white" ? "black" : "white"}
                clockTime={getCurrentClockTime("bottom")}
                icon={<Trophy className="text-neon-green" size={24} />}
              />
            </div>
          </div>
          <div className="w-full lg:w-96 flex flex-col gap-4">
            {gameStage !== "initial" && (
              <MoveList
                pgn={game.pgn()}
                currentMove={currentMove}
                onMoveChange={handleMoveSelect}
              />
            )}
            <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 flex-1 flex flex-col">
              <h2 className="mb-4 text-xl font-bold">Start New Game</h2>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="mb-4 text-lg">
                  Guess the ELO of the players based on the game.
                </p>
                <Button
                  onClick={handleStartGuessing}
                  className="w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                  disabled={isLoading || gameStage !== 'initial'}
                >
                  {isLoading ? "Loading..." : "Start Guessing"}
                </Button>
              </div>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 flex-1">
              <h2 className="mb-4 text-xl font-bold">Game Information</h2>
              {gameStage === "initial" && (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Game information will appear here.</p>
                </div>
              )}
              {gameStage !== "initial" && (
                <>
                  <GameMeta
                    gameDate={gameDate}
                    gameTime={gameTime}
                    timeControl={timeControl}
                    gameResult={gameResult}
                    gameStage={gameStage}
                    gameTermination={gameTermination}
                    gameLink={gameLink}
                  />

                  {gameStage === "guessing" && isMobile && (
                    <div className="mt-6 text-center">
                      <Button
                        onClick={handleOpenGuessPopup}
                        className="w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                      >
                        Guess the ELO
                      </Button>
                    </div>
                  )}

                  {gameStage === "revealed" && (
                    <div className="mt-6">
                      <h3 className="text-lg font-bold">ELO Rating</h3>
                      <div className="mt-2 text-center">
                        <p>Your Guess: {guessedElo}</p>
                        <p>Actual Elo: {actualElo}</p>
                        <p className="font-bold">
                          Score: {Math.max(0, 1500 - Math.abs(actualElo - guessedElo))}
                        </p>
                      </div>
                      {isMobile && (
                        <div className="mt-4 flex justify-center">
                          <Button
                            onClick={handleNextGameWithReset}
                            className="w-full rounded-lg bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
                          >
                            Next Game
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <GuessPopup
        open={showGuessPopup}
        guessedElo={guessedElo}
        setGuessedElo={setGuessedElo}
        onCancel={handleCloseGuessPopup}
        onSubmit={() => {
          handleGuess();
          handleCloseGuessPopup();
        }}
      />
    </div>
  );
}
