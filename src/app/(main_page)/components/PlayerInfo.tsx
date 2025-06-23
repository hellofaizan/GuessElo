import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Timer from "~/components/timer";

interface PlayerInfoProps {
  name: string;
  elo?: number | null;
  color: "white" | "black";
  clockTime: string;
  position: "top" | "bottom";
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({
  name,
  elo,
  color,
  clockTime,
  position,
}) => {
  const borderRadiusClass = position === "top" ? "rounded-t-lg" : "rounded-b-lg";

  return (
    <div
      className={`flex w-full items-center justify-between border border-border p-3 ${borderRadiusClass}`}
    >
      <div className="flex items-center gap-4">
        <Avatar >
          <AvatarImage
            src={`https://images.chesscomfiles.com/uploads/v1/user/${name.toLowerCase()}.jpg`}
            alt={name}
            width={32}
            height={32}
          />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-bold flex items-center gap-1">
            {elo ? (
              <Link href={`https://www.chess.com/player/${name.toLowerCase()}`} className="hover:underline" target="_blank">
                {name}
              </Link>
            ) : (
              name
            )}
            <span className="text-sm text-gray-500">{elo && `(${elo})`}</span>
          </div>
          <p className="text-sm">
            Playing as {color.charAt(0).toUpperCase() + color.slice(1)}
          </p>
        </div>
      </div>
      <Timer clockTime={clockTime} />
    </div>
  );
};

export default PlayerInfo; 