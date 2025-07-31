"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Medal, Target, TrendingUp, Award, Crown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface LeaderboardEntry {
  id: string;
  name: string;
  totalScore: number;
  gamesPlayed: number;
  averageScore: number;
  bestStreak: number;
  currentStreak: number;
  bestGrade: string;
  lastPlayed: string;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading leaderboard data
    setTimeout(() => {
      const mockData: LeaderboardEntry[] = [
        {
          id: "1",
          name: "ChessMaster2024",
          totalScore: 2850,
          gamesPlayed: 30,
          averageScore: 95,
          bestStreak: 12,
          currentStreak: 5,
          bestGrade: "S+",
          lastPlayed: "2 hours ago"
        },
        {
          id: "2",
          name: "RatingGenius",
          totalScore: 2720,
          gamesPlayed: 28,
          averageScore: 97,
          bestStreak: 15,
          currentStreak: 8,
          bestGrade: "S+",
          lastPlayed: "1 hour ago"
        },
        {
          id: "3",
          name: "EloHunter",
          totalScore: 2600,
          gamesPlayed: 35,
          averageScore: 74,
          bestStreak: 7,
          currentStreak: 2,
          bestGrade: "A",
          lastPlayed: "3 hours ago"
        },
        {
          id: "4",
          name: "ChessNovice",
          totalScore: 1800,
          gamesPlayed: 20,
          averageScore: 90,
          bestStreak: 4,
          currentStreak: 0,
          bestGrade: "B+",
          lastPlayed: "5 hours ago"
        },
        {
          id: "5",
          name: "RatingPro",
          totalScore: 2400,
          gamesPlayed: 25,
          averageScore: 96,
          bestStreak: 10,
          currentStreak: 3,
          bestGrade: "S",
          lastPlayed: "30 minutes ago"
        }
      ];
      setLeaderboard(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "S+":
      case "S":
        return "text-emerald-600";
      case "A+":
      case "A":
        return "text-green-500";
      case "B+":
      case "B":
        return "text-blue-500";
      case "C+":
      case "C":
        return "text-yellow-500";
      default:
        return "text-red-500";
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Leaderboard
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Top players in Guess The Elo
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">1,247</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Games Played Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">3,456</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">72</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Best Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">23</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Top Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(index + 1)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {player.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Last played: {player.lastPlayed}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Total Score
                      </div>
                      <div className="font-bold text-blue-600">
                        {player.totalScore.toLocaleString()}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Avg Score
                      </div>
                      <div className="font-bold text-green-600">
                        {player.averageScore}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Games
                      </div>
                      <div className="font-bold text-purple-600">
                        {player.gamesPlayed}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Best Streak
                      </div>
                      <div className="font-bold text-orange-600">
                        {player.bestStreak}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Best Grade
                      </div>
                      <div className={`font-bold ${getGradeColor(player.bestGrade)}`}>
                        {player.bestGrade}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <Button
            onClick={() => window.history.back()}
            className="px-8 py-3 text-lg"
          >
            Play Now
          </Button>
        </div>
      </div>
    </div>
  );
}