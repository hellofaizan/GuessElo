"use client";

import React, { useEffect, useState } from "react";
import { useChessGame } from "~/hooks/use-chess-game";
import GameInterface from "~/components/GameInterface";
import { toast } from "sonner";
import { Chess } from "chess.js";
import { PGNClockStripper } from "~/actions/getclock";

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
    currentScore,
    totalScore,
    gamesPlayed,
    currentStreak,
    bestStreak,
    averageScore,
    handleNextGameWithReset,
    handlePreviousMove,
    handleNextMove,
    handleMoveSelect,
    handleGuess,
    handleStartGuessing,
    handleFlipBoard,
    error,
    clearError,
    setGame,
    setCurrentMove,
    setCurrentClockIndex,
    setActualElo,
    setWhitePlayer,
    setWhitePlayerElo,
    setBlackPlayer,
    setBlackPlayerElo,
    setGameLink,
    setGameDate,
    setGameTime,
    setTimeControl,
    setGameResult,
    setGameTermination,
    setGameStarted,
    setGameStage,
    setBoardOrientation,
    setClockTimes,
  } = useChessGame();

  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importPgn, setImportPgn] = useState("");
  const [importError, setImportError] = useState<string | null>(null);

  // Handler for importing PGN
  const handleImportPgn = () => {
    setImportError(null);
    try {
      const pgn = importPgn.trim();
      if (!pgn) {
        setImportError("Please paste a PGN.");
        return;
      }
      // Extract headers
      const headerRegex = /\[(.*?)\s+"(.*?)"\]/g;
      let match;
      const headers: Record<string, string> = {};
      while ((match = headerRegex.exec(pgn)) !== null) {
        headers[match[1]] = match[2];
      }
      const whitePlayer = headers["White"] || "White";
      const blackPlayer = headers["Black"] || "Black";
      const whitePlayerElo = parseInt(headers["WhiteElo"] || "0", 10);
      const blackPlayerElo = parseInt(headers["BlackElo"] || "0", 10);
      const gameLink = headers["Link"] || "";
      const gameDate = headers["Date"] || "";
      const gameTime = headers["StartTime"] || "";
      const timeControl = headers["TimeControl"] || "";
      const gameResult = headers["Result"] || "";
      const gameTermination = headers["Termination"] || "";
      if (!whitePlayerElo || !blackPlayerElo) {
        setImportError("PGN must include both WhiteElo and BlackElo headers.");
        return;
      }
      const actualElo = Math.round((whitePlayerElo + blackPlayerElo) / 2);
      // Parse clock times
      const { strippedPgn, clockTimes } = PGNClockStripper(pgn);
      // Validate PGN
      let chess;
      try {
        chess = new Chess();
        chess.loadPgn(strippedPgn); // Use stripped PGN for move validation
        if (chess.history().length < 8) {
          setImportError("Game is too short (must have at least 8 moves).");
          return;
        }
      } catch (e) {
        setImportError("Invalid PGN format.");
        return;
      }
      // Set up state as if a game was fetched
      setGame(chess);
      setCurrentMove(0);
      setCurrentClockIndex(0);
      setActualElo(actualElo);
      setGuessedElo(1500);
      setWhitePlayer(whitePlayer);
      setWhitePlayerElo(whitePlayerElo);
      setBlackPlayer(blackPlayer);
      setBlackPlayerElo(blackPlayerElo);
      setGameLink(gameLink);
      setGameDate(gameDate);
      setGameTime(gameTime);
      setTimeControl(timeControl);
      setGameResult(gameResult);
      setGameTermination(gameTermination);
      setGameStarted(true);
      setGameStage("guessing");
      setBoardOrientation("white");
      setClockTimes(clockTimes);
      setImportDialogOpen(false);
      setImportPgn("");
      setImportError(null);
    } catch (e) {
      setImportError("Failed to import game. Please check your PGN.");
    }
  };

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

  return (
    <GameInterface
      gameStage={gameStage}
      isLoading={isLoading}
      guessedElo={guessedElo}
      setGuessedElo={setGuessedElo}
      actualElo={actualElo}
      whitePlayer={whitePlayer}
      blackPlayer={blackPlayer}
      whitePlayerElo={whitePlayerElo}
      blackPlayerElo={blackPlayerElo}
      gameLink={gameLink}
      pgn={game.pgn()}
      currentMove={currentMove}
      onMoveChange={handleMoveSelect}
      boardOrientation={boardOrientation}
      currentScore={currentScore}
      totalScore={totalScore}
      gamesPlayed={gamesPlayed}
      currentStreak={currentStreak}
      bestStreak={bestStreak}
      averageScore={averageScore}
      gameDate={gameDate}
      gameTime={gameTime}
      timeControl={timeControl}
      gameResult={gameResult}
      gameTermination={gameTermination}
      handleGuess={handleGuess}
      handleNextGameWithReset={handleNextGameWithReset}
      handlePreviousMove={handlePreviousMove}
      handleNextMove={handleNextMove}
      handleFlipBoard={handleFlipBoard}
      handleStartGuessing={handleStartGuessing}
      importDialogOpen={importDialogOpen}
      setImportDialogOpen={setImportDialogOpen}
      importPgn={importPgn}
      setImportPgn={setImportPgn}
      importError={importError}
      handleImportPgn={handleImportPgn}
    />
  );
}
