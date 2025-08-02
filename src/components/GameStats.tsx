import React from "react";
import { Target, TrendingUp, Award, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface GameStatsProps {
  gamesPlayed: number;
  totalScore: number;
  averageScore: number;
  currentStreak: number;
  bestStreak: number;
}

export default function GameStats({
  gamesPlayed,
  totalScore,
  averageScore,
  currentStreak,
  bestStreak,
}: GameStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
      <Card>
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Target className="h-4 w-4 text-blue-500" />
            Games Played
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-blue-600">
            {gamesPlayed}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Trophy className="h-4 w-4 text-yellow-500" />
            Total Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-yellow-600">
            {totalScore.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Award className="h-4 w-4 text-green-500" />
            Avg Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-green-600">
            {averageScore}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            Best Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-purple-600">
            {bestStreak}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
