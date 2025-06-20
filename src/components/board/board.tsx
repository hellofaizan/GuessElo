"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Chess } from "chess.js";
import { ChessPieces } from "~/components/board/pieces";
import { ChessSounds } from "~/components/board/sounds";
import EvaluationBar from "../evaluation";
import { Chessboard } from "react-chessboard";

interface ChessViewerProps {
  pgn: string;
  currentMove: number;
  onMoveChange: (moveIndex: number) => void;
  boardOrientation: "white" | "black";
  onFenChange: (fen: string) => void;
  isGameFetched: boolean;
  showMoveTable: boolean;
}

export default function ChessBoard({
  pgn,
  currentMove,
  onMoveChange,
  boardOrientation,
  onFenChange,
  isGameFetched,
  showMoveTable,
}: ChessViewerProps) {
  const [game, setGame] = useState<Chess>(new Chess());
  const [fen, setFen] = useState<string>(game.fen());
  const prevMoveRef = useRef<number>(-1);
  const boardRef = useRef<HTMLDivElement>(null);
  const [boardHeight, setBoardHeight] = useState(0);
  const [moveTable, setMoveTable] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const customPieces = useMemo(() => {
    const pieceComponents: {
      [piece: string]: React.FC<{ squareWidth: number }>;
    } = {};
    const pieces = [
      "wP",
      "wN",
      "wB",
      "wR",
      "wQ",
      "wK",
      "bP",
      "bN",
      "bB",
      "bR",
      "bQ",
      "bK",
    ];
    const pieceImages = {
      wp: ChessPieces.white.pawn,
      wn: ChessPieces.white.knight,
      wb: ChessPieces.white.bishop,
      wr: ChessPieces.white.rook,
      wq: ChessPieces.white.queen,
      wk: ChessPieces.white.king,
      bp: ChessPieces.black.pawn,
      bn: ChessPieces.black.knight,
      bb: ChessPieces.black.bishop,
      br: ChessPieces.black.rook,
      bq: ChessPieces.black.queen,
      bk: ChessPieces.black.king,
    };

    pieces.forEach((p) => {
      pieceComponents[p] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(${
              pieceImages[p.toLowerCase() as keyof typeof pieceImages]
            })`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      );
    });

    return pieceComponents;
  }, []);

  const playMoveSound = useCallback((move: string) => {
    let audio: HTMLAudioElement;
    if (move.includes("+") || move.includes("#")) {
      audio = new Audio(ChessSounds.check);
    } else if (move.includes("=")) {
      audio = new Audio(ChessSounds.promote);
    } else if (move.includes("x")) {
      audio = new Audio(ChessSounds.capture);
    } else if (move === "O-O" || move === "O-O-O") {
      audio = new Audio(ChessSounds.castle);
    } else {
      audio = new Audio(ChessSounds.self);
    }
    audio.play().catch((error) => console.error("Error playing sound:", error));
  }, []);

  const updateBoardInfo = useCallback(() => {
    onFenChange(game.fen());
  }, [game, onFenChange]);

  useEffect(() => {
    if (pgn) {
      const newGame = new Chess();
      newGame.loadPgn(pgn);
      const moves = newGame.history();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setGame((_prevGame) => {
        const tempGame = new Chess();
        if (currentMove >= 0 && currentMove < moves.length) {
          for (let i = 0; i <= currentMove; i++) {
            tempGame.move(moves[i]);
          }
          if (currentMove !== prevMoveRef.current) {
            playMoveSound(moves[currentMove]);
            prevMoveRef.current = currentMove;
          }
          return tempGame;
        } else {
          return newGame;
        }
      });

      updateBoardInfo();
    }
  }, [pgn, currentMove, playMoveSound, updateBoardInfo]);

  useEffect(() => {
    const updateBoardHeight = () => {
      if (boardRef.current) {
        setBoardHeight(boardRef.current.clientHeight);
      }
    };

    updateBoardHeight();
    window.addEventListener("resize", updateBoardHeight);
    return () => window.removeEventListener("resize", updateBoardHeight);
  }, []);

  return (
    <div className={`w-full h-full flex gap-1`}>
      <div className="flex-none h-full">
      <EvaluationBar
        fen={game.fen()}
        isGameFetched={isGameFetched}
        boardOrientation={boardOrientation}
        boardHeight={boardHeight} // Pass the boardHeight to EvaluationBar
      />
      </div>
      <div className="flex-1 h-full aspect-square" ref={boardRef}>
        <Chessboard
          position={game.fen()}
          customPieces={customPieces}
          areArrowsAllowed={true}
          showBoardNotation={true}
          isDraggablePiece={() => false}
          customDarkSquareStyle={{ backgroundColor: "#769656" }}
          customLightSquareStyle={{ backgroundColor: "#eeeed2" }}
          boardOrientation={boardOrientation}
          onSquareClick={(square) => {
            const moves = game.history({ verbose: true });
            const clickedMoveIndex = moves.findIndex(
              (move) => move.to === square || move.from === square
            );
            if (clickedMoveIndex !== -1) {
              onMoveChange(clickedMoveIndex);
            }
          }}
        />
      </div>
    </div>
  );
}
