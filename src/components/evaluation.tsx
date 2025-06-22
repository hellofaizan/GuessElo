"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  const [isFetching, setIsFetching] = useState(false);
  const fetchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchEvaluation = async () => {
      if (!fen || isFetching) return;
      setIsFetching(true);
      try {
        const response = await axios.post("https://chess-api.com/v1", {
          fen: fen,
          depth: 14,
        });
        if (response.data && typeof response.data.eval === "number") {
          setEvaluation(response.data.eval);
        }
      } catch (error) {
        console.error("Error fetching evaluation:", error);
        setEvaluation(null);
      } finally {
        setIsFetching(false);
      }
    };

    if (isGameFetched) {
      if (fetchTimeout.current) {
        clearTimeout(fetchTimeout.current);
      }
      fetchTimeout.current = setTimeout(fetchEvaluation, 500); // Debounce API calls
    }

    return () => {
      if (fetchTimeout.current) {
        clearTimeout(fetchTimeout.current);
      }
    };
  }, [fen, isGameFetched]);

  const getWhiteHeight = (evalScore: number | null) => {
    if (evalScore === null) return "50%";
    const normalizedEval = Math.max(-10, Math.min(10, evalScore));
    const percentage = ((normalizedEval + 10) / 20) * 100;
    return `${percentage}%`;
  };

  const displayEvaluation = (evalScore: number | null) => {
    if (evalScore === null) return "0.0";
    const absEval = Math.abs(evalScore);
    const sign = evalScore > 0 ? "+" : "-";
    if (evalScore === 0) return "0.0";

    if (absEval >= 9.5) {
      return `M${Math.ceil(absEval)}`;
    } else {
      return `${sign}${absEval.toFixed(1)}`;
    }
  };

  return (
    <div
      className="relative w-6 bg-accent-foreground overflow-hidden"
      style={{ height: boardHeight > 0 ? `${boardHeight}px` : "100%" }}
    >
      <motion.div
        className={`absolute ${
          boardOrientation === "white" ? "bottom-0" : "top-0"
        } left-0 right-0 bg-[#dcdcdc]`}
        style={{ height: getWhiteHeight(evaluation) }}
        animate={{ height: getWhiteHeight(evaluation) }}
        transition={{
          ease: "circInOut",
          duration: 0.8,
        }}
      />

      {/* Show evaluation only for the player at the bottom */}
      <AnimatePresence mode="wait">
        {evaluation !== null && evaluation >= 0 && (
          <motion.div
            key="white-eval"
            id="whiteEvaluation"
            className={`absolute inset-0 ${
              boardOrientation === "white"
                ? "bottom-3 items-end"
                : "top-3 items-start"
            } flex items-end justify-center`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <motion.span
              key={evaluation}
              className="font-bold text-xs"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
              }}
            >
              {displayEvaluation(evaluation).replace(/[^0-9.-]+/g, "")}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* If evaluation is negative, show it at the top for black */}
      <AnimatePresence mode="wait">
        {evaluation !== null && evaluation < 0 && (
          <motion.div
            key="black-eval"
            id="blackEvaluation"
            className={`absolute inset-0 ${
              boardOrientation === "white"
                ? "top-3 items-start"
                : "bottom-3 items-end"
            } flex items-end justify-center`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <motion.span
              key={evaluation}
              className="font-bold text-white text-xs"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
              }}
            >
              {displayEvaluation(evaluation).replace(/[^0-9.]+/g, "")}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EvaluationBar;
