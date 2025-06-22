"use client";

import React, { useRef, useEffect } from "react";
import { Chess } from "chess.js";

interface MoveListProps {
  pgn: string;
  currentMove: number;
  onMoveChange: (moveIndex: number) => void;
}

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

  return (
    <div className="h-48 overflow-y-auto rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold">Game Moves</h2>
      <div className="grid grid-cols-3 gap-x-2 text-sm">
        {moves.map((move, index) => (
          <React.Fragment key={index}>
            {index % 2 === 0 && (
              <div className="text-right">{`${Math.floor(index / 2) + 1}.`}</div>
            )}
            <div
              ref={(el) => (moveRefs.current[index] = el)}
              onClick={() => onMoveChange(index)}
              className={`cursor-pointer rounded px-1 ${
                currentMove === index
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {move.san}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
} 