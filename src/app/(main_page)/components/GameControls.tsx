import React from "react";
import { ArrowLeft, ArrowRight, ArrowUpDown, RefreshCw } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "~/components/ui/sheet";
import { Slider } from "~/components/ui/slider";

interface GameControlsProps {
  gameStage: "initial" | "guessing" | "revealed";
  isMobile: boolean;
  handlePreviousMove: () => void;
  handleNextMove: () => void;
  handleFlipBoard: () => void;
  handleNextGameWithReset: () => void;
  guessedElo: number;
  setGuessedElo: (elo: number) => void;
  handleGuess: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameStage,
  isMobile,
  handlePreviousMove,
  handleNextMove,
  handleFlipBoard,
  handleNextGameWithReset,
  guessedElo,
  setGuessedElo,
  handleGuess,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {gameStage === "guessing" && (
        <>
          <Button
            onClick={handlePreviousMove}
            className="p-2 border border-border cursor-pointer"
            variant="outline"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button onClick={handleNextMove} className="p-2 border border-border cursor-pointer" variant="outline">
            <ArrowRight className="h-6 w-6" />
          </Button>
          <Button onClick={handleFlipBoard} className="p-2 border border-border cursor-pointer" variant="outline">
            <ArrowUpDown className="h-6 w-6" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-48 rounded-lg px-4 py-2 font-bold cursor-pointer">
                Guess the ELO
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-lg">
              <SheetHeader>
                <SheetTitle>Guess the ELO</SheetTitle>
              </SheetHeader>
              <div className="my-6 px-6">
                <Slider
                  min={500}
                  max={2500}
                  step={50}
                  value={[guessedElo]}
                  onValueChange={(value) => setGuessedElo(value[0])}
                  className="mb-4"
                />
                <div className="mb-4 text-center text-lg">
                  Guessed Elo: <span className="font-bold">{guessedElo}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button className="w-full cursor-pointer" onClick={handleGuess}>
                    Submit Guess
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </>
      )}
      {gameStage === "revealed" && (
        <Button
          onClick={handleNextGameWithReset}
          className="w-48 rounded-lg px-4 py-2 font-bold cursor-pointer"
        >
          Next Game
        </Button>
      )}
    </div>
  );
};

export default GameControls; 