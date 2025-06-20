import React from "react";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";

interface GuessPopupProps {
  open: boolean;
  guessedElo: number;
  setGuessedElo: (elo: number) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const GuessPopup: React.FC<GuessPopupProps> = ({
  open,
  guessedElo,
  setGuessedElo,
  onCancel,
  onSubmit,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold">Guess the ELO</h2>
        <div className="flex items-center justify-center">
          <span className="text-4xl font-bold">{guessedElo}</span>
        </div>
        <Slider
          min={500}
          max={2500}
          step={50}
          value={[guessedElo]}
          onValueChange={(value) => setGuessedElo(value[0])}
          className="my-6"
        />
        <div className="flex justify-end gap-2">
          <Button
            onClick={onCancel}
            className="rounded-lg bg-gray-300 px-4 py-2 text-black hover:bg-gray-400 dark:bg-gray-600 dark:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          >
            Submit Guess
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuessPopup; 