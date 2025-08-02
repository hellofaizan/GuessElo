import React from "react";
import { ScoreResult } from "~/lib/scoring";
import { Trophy, Target, TrendingUp, Award } from "lucide-react";

interface ScoreDisplayProps {
  scoreResult: ScoreResult;
  guessedElo: number;
  actualElo: number;
  currentStreak: number;
  bestStreak: number;
  gamesPlayed: number;
  averageScore: number;
}

export default function ScoreDisplay({
  scoreResult,
  guessedElo,
  actualElo,
  currentStreak,
  bestStreak,
  gamesPlayed,
  averageScore,
}: ScoreDisplayProps) {
  const diff = Math.abs(guessedElo - actualElo);
  const accuracy = Math.round(100 - (diff / Math.max(guessedElo, actualElo)) * 100);

  return (
    <div className="space-y-4">
      {/* Main Score Display */}
      <div className="rounded-lg border-2 border-green-400 bg-green-50 p-6 text-center dark:bg-green-950/20">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h3 className="text-lg font-bold">Your Score</h3>
        </div>
        
        <div className="mb-2">
          <div className="text-4xl font-bold text-green-600">
            {scoreResult.score}/100
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 text-sm text-gray-600 dark:text-gray-400">
          <div>Your Guess: <span className="font-semibold">{guessedElo}</span></div>
          <div>Actual Elo: <span className="font-semibold">{actualElo}</span></div>
          <div>Difference: <span className="font-semibold">{diff} points</span></div>
          <div>Accuracy: <span className="font-semibold">{accuracy}%</span></div>
        </div>

        <div className={`text-center text-sm font-medium ${scoreResult.color}`}>
          {scoreResult.message}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-start dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 flex items-center justify-start gap-1">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Current Streak
            </span>
          </div>
          <div className="text-5xl font-bold text-blue-600">
            {currentStreak}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 text-start dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 flex items-center justify-start gap-1">
            <Award className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Best Streak
            </span>
          </div>
          <div className="text-5xl font-bold text-purple-600">
            {bestStreak}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 text-start dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 flex items-center justify-start gap-1">
            <Target className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Games Played
            </span>
          </div>
          <div className="text-5xl font-bold text-green-600">
            {gamesPlayed}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 text-start dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 flex items-center justify-start gap-1">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Avg Score
            </span>
          </div>
          <div className="text-5xl font-bold text-yellow-600">
            {averageScore}
          </div>
        </div>
      </div>

      {/* Performance Indicator */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
          Performance Level
        </div>
        <div className="flex items-center justify-center gap-2">
          {scoreResult.score >= 90 && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
              Expert
            </span>
          )}
          {scoreResult.score >= 80 && scoreResult.score < 90 && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
              Advanced
            </span>
          )}
          {scoreResult.score >= 70 && scoreResult.score < 80 && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
              Intermediate
            </span>
          )}
          {scoreResult.score >= 60 && scoreResult.score < 70 && (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
              Beginner
            </span>
          )}
          {scoreResult.score < 60 && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900/20 dark:text-red-400">
              Novice
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 
