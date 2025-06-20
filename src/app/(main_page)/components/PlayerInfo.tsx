import React from "react";
import Timer from "~/components/timer";

interface PlayerInfoProps {
  name: string;
  color: "white" | "black";
  clockTime: string;
  icon: React.ReactNode;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ name, color, clockTime, icon }) => {
  return (
    <div className="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-gray-400">{name}</span>
        <span className={`ml-2 text-xs font-bold ${color === "white" ? "text-gray-700" : "text-gray-500"}`}>
          ({color.charAt(0).toUpperCase() + color.slice(1)})
        </span>
      </div>
      <Timer clockTime={clockTime} />
    </div>
  );
};

export default PlayerInfo; 