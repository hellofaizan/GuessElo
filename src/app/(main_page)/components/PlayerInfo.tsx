import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface PlayerInfoProps {
  name: string;
  color: "white" | "black";
  clockTime: string;
  position: "top" | "bottom";
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({
  name,
  color,
  clockTime,
  position,
}) => {
  const borderRadiusClass = position === "top" ? "rounded-t-lg" : "rounded-b-lg";

  return (
    <div
      className={`flex w-full items-center justify-between bg-slate-900 p-3 text-white shadow-md ${borderRadiusClass}`}
    >
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={`https://www.chess.com/serve/user_avatar/prod/${name.toLowerCase()}.jpg`}
            alt={name}
          />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm text-gray-400">
            Playing as {color.charAt(0).toUpperCase() + color.slice(1)}
          </p>
        </div>
      </div>
      <div className="text-2xl font-bold">{clockTime}</div>
    </div>
  );
};

export default PlayerInfo; 