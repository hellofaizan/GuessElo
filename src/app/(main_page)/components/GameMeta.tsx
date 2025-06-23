import React from "react";
import { Calendar, Clock, Trophy, Link as LinkIcon } from "lucide-react";

interface GameMetaProps {
  gameDate: string;
  gameTime: string;
  timeControl: string;
  gameResult: string;
  gameStage: string;
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
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="flex items-center gap-2 text-gray-400">
          <Calendar size={16} />
          {gameDate}
        </span>
        <span className="flex items-center gap-2 text-gray-400">
          <Clock size={16} />
          {gameTime}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="flex items-center gap-2 text-gray-400">
          <Trophy size={16} />
          {timeControl}
        </span>
        <a
          href={gameLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-400 hover:underline"
        >
          <LinkIcon size={16} />
          Game Link
        </a>
      </div>
      {gameStage === "revealed" && (
        <div className="pt-2">
          <p className="text-gray-400">
            <span className="font-bold">Result:</span> {gameResult}
          </p>
          <p className="text-gray-400">
            <span className="font-bold">Termination:</span> {gameTermination}
          </p>
        </div>
      )}
    </div>
  );
};

export default GameMeta; 