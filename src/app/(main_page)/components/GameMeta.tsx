import React from "react";
import { Calendar, Clock, Link } from "lucide-react";

interface GameMetaProps {
  gameDate: string;
  gameTime: string;
  timeControl: string;
  gameResult: string;
  gameStage: "initial" | "guessing" | "revealed";
  gameTermination: string;
  gameLink: string;
}

const GameMeta: React.FC<GameMetaProps> = ({
  gameDate,
  gameTime,
  timeControl,
  gameResult,
  gameStage,
  gameTermination,
  gameLink,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Calendar className="h-5 w-5" /> Date
        </span>
        <span>{gameDate}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Clock className="h-5 w-5" /> Time
        </span>
        <span>{gameTime}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          Time Control
        </span>
        <span>{timeControl}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-500 dark:text-gray-400">Result</span>
        <span>{gameResult}</span>
      </div>
      {gameStage === "revealed" && (
        <>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Termination</span>
            <span className="text-right">{gameTermination}</span>
          </div>
          <div className="flex items-center justify-between">
            <a
              href={gameLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:underline dark:text-blue-400"
            >
              <Link className="h-5 w-5" /> View Game
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default GameMeta; 