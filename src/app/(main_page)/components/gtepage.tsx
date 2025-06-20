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
import { Chess } from "chess.js";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";
import ChessViewer from "~/components/board/board";
import Timer from "~/components/timer";
import { fetchRandomGame } from "~/actions/chessgames";

export default function GTEPage() {
  const [game, setGame] = useState(new Chess());
  const [currentMove, setCurrentMove] = useState(0);
  const [guessedElo, setGuessedElo] = useState(1500);
  const [hasGuessed, setHasGuessed] = useState(false);
  const [actualElo, setActualElo] = useState(0);
  const [currentPgn, setCurrentPgn] = useState("");
  const [whitePlayer, setWhitePlayer] = useState("");
  const [blackPlayer, setBlackPlayer] = useState("");
  const [gameLink, setGameLink] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [bmMemberColor, setBMMemberColor] = useState<"white" | "black" | null>(
    null
  );
  const [clockTimes, setClockTimes] = useState<string[]>([]);
  const [gameResult, setGameResult] = useState<string>("");
  const [showGuessPopup, setShowGuessPopup] = useState(false);
  const [showMoveTable] = useState(false);
  const [gameDate, setGameDate] = useState("");
  const [gameTime, setGameTime] = useState("");
  const [timeControl, setTimeControl] = useState("");
  const [currentClockIndex, setCurrentClockIndex] = useState(0);
  const [gameTermination, setGameTermination] = useState<string>("");
  const [gameStage, setGameStage] = useState<
    "initial" | "guessing" | "revealed"
  >("initial");
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    "white"
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const handleNextGameWithReset = () => {
    handleNextGame();
    setGameStage("guessing");
  };

  const handlePreviousMove = useCallback(() => {
    setCurrentMove((prevMove) => {
      const newMove = Math.max(0, prevMove - 1);
      setCurrentClockIndex(Math.max(0, Math.floor((newMove - 1) / 2)));
      return newMove;
    });
  }, []);

  const handleNextMove = useCallback(() => {
    setCurrentMove((prevMove) => {
      const newMove = Math.min(game.history().length - 1, prevMove + 1);
      setCurrentClockIndex(
        Math.min(
          Math.floor(clockTimes.length / 2) - 1,
          Math.floor((newMove + 1) / 2)
        )
      );
      return newMove;
    });
  }, [game, clockTimes]);

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

  const fetchNewGame = async () => {
    setIsLoading(true);
    try {
      const randomGame = await fetchRandomGame();
      const newGame = new Chess();
      newGame.loadPgn(randomGame.pgn);

      setGame(newGame);
      setCurrentMove(0);
      setCurrentClockIndex(0);
      setActualElo(
        Math.round(
          (randomGame.whitePlayer.rating + randomGame.blackPlayer.rating) / 2
        )
      );
      setCurrentPgn(randomGame.pgn);
      setHasGuessed(false);
      setGuessedElo(1500);
      setWhitePlayer(randomGame.whitePlayer.username);
      setBlackPlayer(randomGame.blackPlayer.username);
      setGameLink(randomGame.gameLink);
      const newBmMemberColor = randomGame.whitePlayer.isBMMember
        ? "white"
        : "black";
      setBMMemberColor(newBmMemberColor);
      setBoardOrientation(newBmMemberColor);
      setGameStarted(true);
      setClockTimes(randomGame.clockTimes);

      // Extract additional PGN information
      const header = newGame.header();
      setGameDate(header["Date"] || "");
      setGameTime(header["StartTime"] || "");
      setTimeControl(convertTimeControlToMinutes(header["TimeControl"] || ""));
      setGameResult(header["Result"] || "");

      // Extract termination information
      const terminationMatch = randomGame.pgn.match(/Termination\s+"(.+?)"/);
      let terminationMessage = terminationMatch ? terminationMatch[1] : "";

      // Replace usernames with "BM Member" or "Random Player"
      const bmMemberUsername = randomGame.whitePlayer.isBMMember
        ? randomGame.whitePlayer.username
        : randomGame.blackPlayer.username;
      const randomPlayerUsername = randomGame.whitePlayer.isBMMember
        ? randomGame.blackPlayer.username
        : randomGame.whitePlayer.username;

      terminationMessage = terminationMessage.replace(
        bmMemberUsername,
        "BM Member"
      );
      terminationMessage = terminationMessage.replace(
        randomPlayerUsername,
        "Random Player"
      );

      setGameTermination(terminationMessage);
    } catch (error) {
      console.error("Error fetching new game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const convertTimeControlToMinutes = (timeControl: string): string => {
    const seconds = parseInt(timeControl);
    if (!isNaN(seconds)) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} min`;
    }
    return timeControl; // Return original if not in seconds format
  };

  const handleMoveSelect = (moveIndex: number) => {
    setCurrentMove(moveIndex);
    setCurrentClockIndex(Math.floor(moveIndex / 2));
  };

  const handleGuess = () => {
    setHasGuessed(true);
    setGameStage("revealed");
  };

  const handleNextGame = () => {
    fetchNewGame();
  };

  const handleStartGuessing = () => {
    fetchNewGame();
    setGameStage("guessing");
  };

  const handleOpenGuessPopup = () => {
    setShowGuessPopup(true);
  };

  const handleCloseGuessPopup = () => {
    setShowGuessPopup(false);
  };

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

  const handleFlipBoard = () => {
    setBoardOrientation((prev) => (prev === "white" ? "black" : "white"));
  };

  const handleFenChange = useCallback((fen: string) => {
    // Use the FEN here if needed, but don't set it as state
    // console.log("Current FEN:", fen);
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col relative w-full">
        {/* <Background /> */}
        <main className="flex-1 p-4 md:p-6 lg:p-10 z-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 md:gap-8 mb-6">
              
              <div className="bg-gray-800/50 p-4 md:p-6 rounded-2xl shadow-2xl border border-neon-green/20 xl:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col items-center">
                    {/* <img
                      src={bmAvatar}
                      alt="BM Member"
                      className="w-24 h-24 rounded-full mb-2"
                    /> */}
                    <span className="font-semibold text-lg">
                      {gameStage === "revealed"
                        ? bmMemberColor === "white"
                          ? whitePlayer
                          : blackPlayer
                        : "BM Member"}
                    </span>
                    <span className="text-sm text-gray-400">
                      {bmMemberColor === "white" ? "White" : "Black"}
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-neon-green">VS</div>
                  <div className="flex flex-col items-center">
                    {/* <img
                      src={noobAvatar}
                      alt="Random Player"
                      className="w-24 h-24 rounded-full mb-2"
                    /> */}
                    <span className="font-semibold text-lg">
                      {gameStage === "revealed"
                        ? bmMemberColor === "white"
                          ? blackPlayer
                          : whitePlayer
                        : "Random Player"}
                    </span>
                    <span className="text-sm text-gray-400">
                      {bmMemberColor === "white" ? "Black" : "White"}
                    </span>
                  </div>
                </div>
                {isLoading ? (
                  <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-green"></div>
                  </div>
                ) : !gameStarted ? (
                  <div>
                    <Button
                      onClick={handleStartGuessing}
                      className="w-full py-3 mb-4 bg-gradient-to-r from-neon-green to-blue-500 text-black font-bold text-lg hover:from-blue-500 hover:to-neon-green transition-all duration-300"
                    >
                      Start Guessing
                    </Button>
                    <div className="mt-4 p-4 bg-gray-700 rounded-lg shadow-lg">
                      <h3 className="text-xl font-bold text-neon-green mb-2">
                        What is Guess the Elo?
                      </h3>
                      <p className="text-white">
                        Guess the Elo is a fun game where you try to guess the
                        average Elo rating of two chess players based on their
                        gameplay. Can you accurately estimate their skill level?
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {!hasGuessed ? (
                      <div>
                        {isMobile ? (
                          <Button
                            onClick={handleOpenGuessPopup}
                            className="w-full py-3 bg-gradient-to-r from-neon-green to-blue-500 text-black font-bold text-lg hover:from-blue-500 hover:to-neon-green transition-all duration-300"
                          >
                            Guess Elo
                          </Button>
                        ) : (
                          <>
                            <div className="mb-4">
                              <Slider
                                value={[guessedElo]}
                                onValueChange={(value) =>
                                  setGuessedElo(value[0])
                                }
                                min={100}
                                max={3100}
                                step={25}
                                disabled={hasGuessed}
                              />
                              <p className="text-center mt-2">
                                Guessed Elo: {guessedElo}
                              </p>
                            </div>
                            <Button
                              onClick={handleGuess}
                              className="w-full py-3 bg-gradient-to-r from-neon-green to-blue-500 text-black font-bold text-lg hover:from-blue-500 hover:to-neon-green transition-all duration-300"
                            >
                              Submit Guess
                            </Button>
                          </>
                        )}
                        <div className="mt-4 p-4 bg-gray-700 rounded-lg shadow-lg">
                          <h3 className="text-xl font-bold text-neon-green mb-2">
                            Game Info
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center">
                              <Calendar className="text-neon-green mr-3" />
                              <span className="text-white">{gameDate}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="text-neon-green mr-3" />
                              <span className="text-white">{gameTime}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="text-neon-green mr-3" />
                              <span className="text-white">{timeControl}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-center text-gray-300 mt-4">
                          Guess the average Elo rating of the two players in
                          this game. One player is a BM Member, and the other is
                          a random player.
                        </p>
                        <p className="text-center text-neon-green mt-2">
                          Game Result: {gameResult}
                        </p>
                        {gameTermination && (
                          <p className="text-center text-gray-300 mt-1">
                            Termination: {gameTermination}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="p-4 bg-gray-700 rounded-lg shadow-lg w-full flex items-center justify-center">
                            <p className="text-2xl font-semibold text-neon-green">
                              Average Elo: {actualElo}
                            </p>
                          </div>
                          <div className="p-4 bg-gray-700 rounded-lg shadow-lg w-full flex items-center justify-center">
                            <p className="text-2xl font-semibold">
                              Difference:{" "}
                              <span className="text-yellow-400">
                                {Math.abs(guessedElo - actualElo)}
                              </span>
                            </p>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <p
                              className={`text-xl font-semibold ${
                                Math.abs(guessedElo - actualElo) <= 100
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {Math.abs(guessedElo - actualElo) <= 100
                                ? "Great guess!"
                                : "Nice try, but not quite!"}
                            </p>

                            <p className="text-sm text-gray-400">
                              {Math.abs(guessedElo - actualElo) <= 100
                                ? "You're getting good at this!"
                                : "Keep practicing to improve your guesses!"}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={handleNextGameWithReset}
                          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                        >
                          Next Game
                        </Button>
                      </div>
                    )}
                  </>
                )}
                {hasGuessed && (
                  <div className="mt-4 py-4 flex items-center justify-center">
                    <Link className="mr-2 text-neon-green" />
                    <a
                      href={gameLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 text-black bg-neon-green rounded hover:bg-green-700 transition duration-300"
                    >
                      View full game
                    </a>
                  </div>
                )}
              </div>

              <div className="flex-1 h-full w-full">
                <ChessViewer
                  pgn={currentPgn}
                  currentMove={currentMove}
                  onMoveChange={handleMoveSelect}
                  boardOrientation={boardOrientation}
                  onFenChange={handleFenChange}
                  isGameFetched={gameStarted}
                  showMoveTable={showMoveTable}
                />
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Guess Popup for Mobile */}
      {showGuessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-neon-green/20 w-11/12 max-w-md">
            <h2 className="text-2xl font-bold text-neon-green mb-4">
              Guess the Elo
            </h2>
            <div className="mb-4">
              <Slider
                value={[guessedElo]}
                onValueChange={(value) => setGuessedElo(value[0])}
                min={100}
                max={3100}
                step={25}
                disabled={hasGuessed}
              />
              <p className="text-center mt-2">Guessed Elo: {guessedElo}</p>
            </div>
            <Button
              onClick={() => {
                handleGuess();
                handleCloseGuessPopup();
              }}
              className="w-full py-3 bg-gradient-to-r from-neon-green to-blue-500 text-black font-bold text-lg hover:from-blue-500 hover:to-neon-green transition-all duration-300"
            >
              Submit Guess
            </Button>
            <Button
              onClick={handleCloseGuessPopup}
              className="w-full mt-2 py-3 bg-gray-700 text-white font-bold text-lg hover:bg-gray-600 transition-all duration-300"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
