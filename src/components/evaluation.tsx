"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface EvaluationBarProps {
  fen: string;
  isGameFetched: boolean;
  boardOrientation: "white" | "black";
  boardHeight: number;
}

const EvaluationBar: React.FC<EvaluationBarProps> = ({
  fen,
  isGameFetched,
  boardOrientation,
  boardHeight,
}) => {
  const [evaluation, setEvaluation] = useState<number | null>(null);
  const [evaluationSign, setEvaluationSign] = useState<string | null>(null);

  const getWhiteHeight = (evalScore: number | null) => {
    if (evalScore === null) return "50%";
    const normalizedEval = Math.max(-8, Math.min(8, evalScore));
    const percentage = ((normalizedEval + 8) / 16) * 100;
    return `${percentage}%`;
  };

  const displayEvaluation = (evalScore: number | null) => {
    if (evalScore === null) return "0.0";
    const absEval = Math.abs(evalScore);
    const sign = evalScore >= 0 ? "+" : "-";
    return `${sign}${absEval.toFixed(1)}`;
  };

  useEffect(() => {
    if (isGameFetched && fen) {
      const fetchEvaluation = async () => {
        try {
          const response = await axios.post("https://chess-api.com/v1", {
            fen: fen,
            depth: 12,
          });
          setEvaluation(
            response.data.eval !== undefined ? response.data.eval : null
          );
        } catch (error) {
          console.error("Error fetching evaluation:", error);
        }
      };

      fetchEvaluation();
    }
  }, [fen, isGameFetched]);

  return (
    <div className="relative w-6 bg-accent-foreground overflow-hidden h-full">
      <div
        className={`absolute ${
          boardOrientation === "white" ? "bottom-0" : "top-0"
        } left-0 right-0 bg-[#dcdcdc]`}
        style={{ height: getWhiteHeight(evaluation) }}
      />
      {/* Show evaluation only for the player at the bottom */}

      <div
        id="whiteEvaluation"
        className={`absolute inset-0 ${
          boardOrientation === "white"
            ? "bottom-3 items-end"
            : "top-3 items-start"
        } ${
          Number(displayEvaluation(evaluation)) > 0 ? "flex" : "hidden"
        } flex items-end justify-center`}
      >
        <span
          key={evaluation}
          className="font-bold text-xs"
        >
          {displayEvaluation(evaluation).replace(/[^0-9.-]+/g, "")}
        </span>
      </div>
      {/* If evaluation is negative, show it at the top for black */}
      {evaluation !== null && evaluation < 0 && (
        <div
          id="blackEvaluation"
          className={`absolute inset-0 ${
            boardOrientation === "white"
              ? "top-3 items-start"
              : "bottom-3 items-end"
          } ${Number(displayEvaluation(evaluation)) < 0 ? "flex" : "hidden"}
          flex items-end justify-center`}
        >
          <span
            key={evaluation}
            className="font-bold text-white text-xs"
          >
            {displayEvaluation(evaluation).replace(/[^0-9.]+/g, "")}
          </span>
        </div>
      )}
    </div>
  );
};

export default EvaluationBar;
