import React from "react";
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "~/components/ui/button";

interface GameControlsProps {
  gameStage: "initial" | "guessing" | "revealed";
  isMobile: boolean;
  handlePreviousMove: () => void;
  handleNextMove: () => void;
  handleFlipBoard: () => void;
  handleOpenGuessPopup: () => void;
  handleNextGameWithReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameStage,
  isMobile,
  handlePreviousMove,
  handleNextMove,
  handleFlipBoard,
  handleOpenGuessPopup,
  handleNextGameWithReset,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {gameStage === "guessing" && (
        <>
          <Button
            onClick={handlePreviousMove}
            className="p-2"
            variant="ghost"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button onClick={handleNextMove} className="p-2" variant="ghost">
            <ArrowRight className="h-6 w-6" />
          </Button>
          <Button onClick={handleFlipBoard} className="p-2" variant="ghost">
            <RefreshCw className="h-6 w-6" />
          </Button>
          <Button
            onClick={handleOpenGuessPopup}
            className="w-48 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          >
            Guess the ELO
          </Button>
        </>
      )}
      {gameStage === "revealed" && (
        <Button
          onClick={handleNextGameWithReset}
          className="w-48 rounded-lg bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
        >
          Next Game
        </Button>
      )}
    </div>
  );
};

export default GameControls; 