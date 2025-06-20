"use client";

import { useState, useCallback } from "react";
import { Chess } from "chess.js";
import { fetchRandomGame } from "~/actions/chessgames";

export const useChessGame = () => {
    const [game, setGame] = useState(new Chess());
    const [currentMove, setCurrentMove] = useState(0);
    const [guessedElo, setGuessedElo] = useState(1500);
    const [hasGuessed, setHasGuessed] = useState(false);
    const [actualElo, setActualElo] = useState(0);
    const [currentPgn, setCurrentPgn] = useState("");
    const [whitePlayer, setWhitePlayer] = useState("");
    const [blackPlayer, setBlackPlayer] = useState("");
    const [gameLink, setGameLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [bmMemberColor, setBMMemberColor] = useState<"white" | "black" | null>(null);
    const [clockTimes, setClockTimes] = useState<string[]>([]);
    const [gameResult, setGameResult] = useState<string>("");
    const [showGuessPopup, setShowGuessPopup] = useState(false);
    const [gameDate, setGameDate] = useState("");
    const [gameTime, setGameTime] = useState("");
    const [timeControl, setTimeControl] = useState("");
    const [currentClockIndex, setCurrentClockIndex] = useState(0);
    const [gameTermination, setGameTermination] = useState<string>("");
    const [gameStage, setGameStage] = useState<"initial" | "guessing" | "revealed">("initial");
    const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");

    const convertTimeControlToMinutes = (timeControl: string): string => {
        const seconds = parseInt(timeControl);
        if (!isNaN(seconds)) {
            const minutes = Math.floor(seconds / 60);
            return `${minutes} min`;
        }
        return timeControl;
    };
    
    const fetchNewGame = useCallback(async () => {
        setIsLoading(true);
        try {
            const randomGame = await fetchRandomGame();
            const newGame = new Chess();
            newGame.loadPgn(randomGame.pgn);

            setGame(newGame);
            setCurrentMove(0);
            setCurrentClockIndex(0);
            setActualElo(Math.round((randomGame.whitePlayer.rating + randomGame.blackPlayer.rating) / 2));
            setCurrentPgn(randomGame.pgn);
            setHasGuessed(false);
            setGuessedElo(1500);
            setWhitePlayer(randomGame.whitePlayer.username);
            setBlackPlayer(randomGame.blackPlayer.username);
            setGameLink(randomGame.gameLink);
            const newBmMemberColor = randomGame.whitePlayer.isBMMember ? "white" : "black";
            setBMMemberColor(newBmMemberColor);
            setBoardOrientation(newBmMemberColor);
            setGameStarted(true);
            setClockTimes(randomGame.clockTimes);

            const header = newGame.header();
            setGameDate(header["Date"] || "");
            setGameTime(header["StartTime"] || "");
            setTimeControl(convertTimeControlToMinutes(header["TimeControl"] || ""));
            setGameResult(header["Result"] || "");

            const terminationMatch = randomGame.pgn.match(/Termination\s+"(.+?)"/);
            let terminationMessage = terminationMatch ? terminationMatch[1] : "";
            const bmMemberUsername = randomGame.whitePlayer.isBMMember ? randomGame.whitePlayer.username : randomGame.blackPlayer.username;
            const randomPlayerUsername = randomGame.whitePlayer.isBMMember ? randomGame.blackPlayer.username : randomGame.whitePlayer.username;
            terminationMessage = terminationMessage.replace(bmMemberUsername, "BM Member");
            terminationMessage = terminationMessage.replace(randomPlayerUsername, "Random Player");
            setGameTermination(terminationMessage);
        } catch (error) {
            console.error("Error fetching new game:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handlePreviousMove = useCallback(() => {
        setCurrentMove((prevMove) => {
            const newMove = Math.max(0, prevMove - 1);
            setCurrentClockIndex(Math.max(0, Math.floor((newMove - 1) / 2)));
            return newMove;
        });
    }, []);

    const handleNextMove = useCallback(() => {
      setCurrentMove((prevMove) => {
        const historyLength = game.history().length;
        if (historyLength === 0) return 0;
        const newMove = Math.min(historyLength -1, prevMove + 1);
        setCurrentClockIndex(
          Math.min(
            Math.floor(clockTimes.length / 2) - 1,
            Math.floor((newMove + 1) / 2)
          )
        );
        return newMove;
      });
    }, [game, clockTimes]);

    const handleMoveSelect = (moveIndex: number) => {
        setCurrentMove(moveIndex);
        setCurrentClockIndex(Math.floor(moveIndex / 2));
    };

    const handleGuess = () => {
        setHasGuessed(true);
        setGameStage("revealed");
    };

    const handleStartGuessing = useCallback(() => {
        fetchNewGame().then(() => setGameStage("guessing"));
    }, [fetchNewGame]);

    const handleNextGame = useCallback(() => {
        fetchNewGame().then(() => setGameStage("guessing"));
    }, [fetchNewGame]);
    
    const handleNextGameWithReset = () => {
        handleNextGame();
    };

    const handleOpenGuessPopup = () => {
        setShowGuessPopup(true);
    };
    
    const handleCloseGuessPopup = () => {
        setShowGuessPopup(false);
    };

    const handleFlipBoard = () => {
        setBoardOrientation((prev) => (prev === "white" ? "black" : "white"));
    };

    return {
        game,
        currentMove,
        guessedElo,
        setGuessedElo,
        hasGuessed,
        actualElo,
        currentPgn,
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
        handleNextGame,
        handleStartGuessing,
        handleOpenGuessPopup,
        handleCloseGuessPopup,
        handleFlipBoard,
        setCurrentMove
    };
}; 