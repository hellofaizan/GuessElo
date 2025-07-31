export interface ScoreResult {
  score: number;
  accuracy: number;
  grade: string;
  message: string;
  color: string;
}

/**
 * Calculate score based on the difference between guessed and actual Elo
 * Uses a tiered scoring system similar to chess rating accuracy
 */
export function calculateScore(guess: number, actual: number): ScoreResult {
  const diff = Math.abs(guess - actual);
  
  // Base scoring tiers
  if (diff <= 10) {
    return {
      score: 100,
      accuracy: 99,
      grade: "S+",
      message: "Perfect! You're a chess rating expert!",
      color: "text-emerald-600"
    };
  }
  
  if (diff <= 25) {
    return {
      score: 95,
      accuracy: 95,
      grade: "S",
      message: "Excellent! Incredible rating intuition!",
      color: "text-emerald-500"
    };
  }
  
  if (diff <= 50) {
    return {
      score: 90,
      accuracy: 90,
      grade: "A+",
      message: "Great! You have a keen eye for skill levels!",
      color: "text-green-500"
    };
  }
  
  if (diff <= 75) {
    return {
      score: 80,
      accuracy: 85,
      grade: "A",
      message: "Very good! Strong rating assessment skills!",
      color: "text-green-400"
    };
  }
  
  if (diff <= 100) {
    return {
      score: 70,
      accuracy: 80,
      grade: "B+",
      message: "Good! You understand chess skill levels well!",
      color: "text-blue-500"
    };
  }
  
  if (diff <= 150) {
    return {
      score: 60,
      accuracy: 75,
      grade: "B",
      message: "Fair! You're getting the hang of rating assessment!",
      color: "text-blue-400"
    };
  }
  
  if (diff <= 200) {
    return {
      score: 50,
      accuracy: 70,
      grade: "C+",
      message: "Average! Keep practicing to improve your rating sense!",
      color: "text-yellow-500"
    };
  }
  
  if (diff <= 250) {
    return {
      score: 40,
      accuracy: 65,
      grade: "C",
      message: "Below average! Study more games to improve!",
      color: "text-yellow-400"
    };
  }
  
  if (diff <= 300) {
    return {
      score: 30,
      accuracy: 60,
      grade: "D",
      message: "Poor! You need more practice with rating assessment!",
      color: "text-orange-500"
    };
  }
  
  if (diff <= 400) {
    return {
      score: 20,
      accuracy: 55,
      grade: "F",
      message: "Very poor! Consider studying chess fundamentals!",
      color: "text-red-500"
    };
  }
  
  // Anything beyond 400 Elo difference
  return {
    score: 10,
    accuracy: 50,
    grade: "F-",
    message: "Terrible! You might need to learn chess basics first!",
    color: "text-red-600"
  };
}

/**
 * Calculate accuracy percentage based on the difference
 */
export function calculateAccuracy(guess: number, actual: number): number {
  const diff = Math.abs(guess - actual);
  const maxDiff = Math.max(guess, actual) * 0.5; // 50% of the higher rating
  return Math.max(0, Math.round(100 - (diff / maxDiff) * 100));
}

/**
 * Get a motivational message based on the score
 */
export function getMotivationalMessage(score: number): string {
  if (score >= 95) return "You're a rating genius! 🧠";
  if (score >= 85) return "Amazing intuition! 🌟";
  if (score >= 75) return "Great job! Keep it up! 👍";
  if (score >= 65) return "Good effort! You're improving! 📈";
  if (score >= 55) return "Not bad! Practice makes perfect! 💪";
  if (score >= 45) return "Keep practicing! You'll get better! 🎯";
  if (score >= 35) return "Don't give up! Learning takes time! 📚";
  if (score >= 25) return "Study more games to improve! 🔍";
  if (score >= 15) return "Consider learning chess basics! ♟️";
  return "Maybe start with chess fundamentals! 🎓";
}

/**
 * Calculate bonus points for consecutive good guesses
 */
export function calculateStreakBonus(currentStreak: number): number {
  if (currentStreak <= 1) return 0;
  if (currentStreak <= 3) return 5;
  if (currentStreak <= 5) return 10;
  if (currentStreak <= 10) return 15;
  return 20; // Max bonus for 10+ streak
}

/**
 * Calculate total score with streak bonus
 */
export function calculateTotalScore(
  baseScore: number, 
  streak: number, 
  timeBonus: number = 0
): number {
  const streakBonus = calculateStreakBonus(streak);
  return Math.min(100, baseScore + streakBonus + timeBonus);
} 