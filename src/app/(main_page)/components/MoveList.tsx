"use client";

import React, { useRef, useEffect } from "react";
import { Chess } from "chess.js";
import Image from "next/image";
import { ChessPieces } from "~/components/board/pieces";

interface MoveListProps {
  pgn: string;
  currentMove: number;
  onMoveChange: (moveIndex: number) => void;
}

const pieceImageMap: { [key: string]: string } = {
  wn: ChessPieces.white.knight,
  wb: ChessPieces.white.bishop,
  wr: ChessPieces.white.rook,
  wq: ChessPieces.white.queen,
  wk: ChessPieces.white.king,
  bn: ChessPieces.black.knight,
  bb: ChessPieces.black.bishop,
  br: ChessPieces.black.rook,
  bq: ChessPieces.black.queen,
  bk: ChessPieces.black.king,
};

export default function MoveList({
  pgn,
  currentMove,
  onMoveChange,
}: MoveListProps) {
  const game = new Chess();
  game.loadPgn(pgn);
  const moves = game.history({ verbose: true });
  const moveRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (moveRefs.current[currentMove]) {
      moveRefs.current[currentMove]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentMove]);

  const movePairs = [];
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      moveNumber: i / 2 + 1,
      white: moves[i],
      black: moves[i + 1],
    });
  }

  const getMoveContent = (move: (typeof moves)[0]) => {
    if (!move) return null;

    const key = move.color + move.piece;
    let iconUrl = pieceImageMap[key];
    let showIcon = iconUrl && move.piece !== "p";

    // Show pawn icon for 2-letter SAN moves that do not start with a capital letter
    if (
      move.san.length === 2 &&
      move.san[0] === move.san[0].toLowerCase() &&
      move.piece === "p"
    ) {
      iconUrl = move.color === "w" ? ChessPieces.white.pawn : ChessPieces.black.pawn;
      showIcon = true;
    }

    return (
      <div className="flex items-center gap-1">
        {showIcon && (
          <Image src={iconUrl} alt={move.piece} width={16} height={16} />
        )}
        <span>{move.san}</span>
      </div>
    );
  };

  return (
    <div className="h-[250px] overflow-y-auto pr-2">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-x-4 gap-y-1 text-sm">
        {movePairs.map((pair, pairIndex) => (
          <React.Fragment key={pairIndex}>
            <div className="pt-0.5 text-right text-gray-400">
              {pair.moveNumber}.
            </div>
            <div
              ref={(el) => {
                if (el) moveRefs.current[pairIndex * 2] = el;
              }}
              onClick={() => onMoveChange(pairIndex * 2)}
              className={`flex cursor-pointer items-center rounded px-2 py-0.5 ${
                currentMove === pairIndex * 2
                  ? "bg-gray-600"
                  : "hover:bg-gray-700"
              }`}
            >
              {getMoveContent(pair.white)}
            </div>
            {pair.black && (
              <div
                ref={(el) => {
                  if (el) moveRefs.current[pairIndex * 2 + 1] = el;
                }}
                onClick={() => onMoveChange(pairIndex * 2 + 1)}
                className={`flex cursor-pointer items-center rounded px-2 py-0.5 ${
                  currentMove === pairIndex * 2 + 1
                    ? "bg-gray-600"
                    : "hover:bg-gray-700"
                }`}
              >
                {getMoveContent(pair.black)}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
} 