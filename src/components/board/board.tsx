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
}

export default function ChessBoard({
  pgn,
  currentMove,
  onMoveChange,
  boardOrientation,
  onFenChange,
  isGameFetched,
}: ChessViewerProps) {
  const [game, setGame] = useState<Chess>(new Chess());
  const prevMoveRef = useRef<number>(-1);
  const boardRef = useRef<HTMLDivElement>(null);
  const [boardHeight, setBoardHeight] = useState(0);

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

  useEffect(() => {
    if (pgn) {
      const newGame = new Chess();
      newGame.loadPgn(pgn);
      const moves = newGame.history();
      const tempGame = new Chess();
      const headers = newGame.header();
      if (headers.FEN) {
        tempGame.load(headers.FEN);
      }

      if (currentMove >= 0 && currentMove < moves.length) {
        for (let i = 0; i <= currentMove; i++) {
          tempGame.move(moves[i]);
        }
      }

      if (currentMove !== prevMoveRef.current) {
        if (currentMove > -1 && currentMove < moves.length) {
          playMoveSound(moves[currentMove]);
        }
        prevMoveRef.current = currentMove;
      }
      setGame(tempGame);
    }
  }, [pgn, currentMove, playMoveSound]);

  useEffect(() => {
    onFenChange(game.fen());
  }, [game, onFenChange]);

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
    <div className={`flex items-start gap-2`}>
      <div className="flex-none h-full">
        <EvaluationBar
          fen={game.fen()}
          isGameFetched={isGameFetched}
          boardOrientation={boardOrientation}
          boardHeight={boardHeight}
        />
      </div>
      <div className="flex-1 h-full aspect-square max-w-[800px] max-h-[800px]" ref={boardRef}>
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
