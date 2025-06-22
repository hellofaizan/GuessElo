"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// Define the shape of messages from the Stockfish worker
interface StockfishMessage {
  data: string;
}

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
  const [isStockfishReady, setIsStockfishReady] = useState(false);
  const stockfish = useRef<Worker | null>(null);

  useEffect(() => {
    // The worker is now created from a static file in the public directory
    // This file imports the stockfish script, making it statically analyzable
    const worker = new Worker(
      new URL("../workers/stockfish-worker.js", import.meta.url)
    );
    stockfish.current = worker;

    worker.onmessage = (event: StockfishMessage) => {
      const message = event.data;

      if (message === "readyok") {
        setIsStockfishReady(true);
      } else if (message.startsWith("info depth")) {
        const match = message.match(/score (cp|mate) (-?\d+)/);
        if (match) {
          const scoreType = match[1];
          const scoreValue = parseInt(match[2], 10);

          let evalInPawns: number;
          if (scoreType === "cp") {
            evalInPawns = scoreValue / 100.0;
          } else {
            evalInPawns = scoreValue > 0 ? 8 : -8;
          }
          setEvaluation(evalInPawns);
        }
      }
    };

    worker.postMessage("uci");
    worker.postMessage("isready");

    return () => {
      stockfish.current?.postMessage("quit");
      stockfish.current?.terminate();
    };
  }, []);

  useEffect(() => {
    if (isGameFetched && fen && stockfish.current && isStockfishReady) {
      stockfish.current.postMessage(`position fen ${fen}`);
      stockfish.current.postMessage("go depth 12");
    }
  }, [fen, isGameFetched, isStockfishReady]);

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
          duration: 1,
        }}
      />
      
      {/* Show evaluation only for the player at the bottom */}
      <AnimatePresence mode="wait">
        {evaluation !== null && Number(displayEvaluation(evaluation)) >= 0 && (
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
              damping: 25 
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
                damping: 20 
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
              damping: 25 
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
                damping: 20 
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
