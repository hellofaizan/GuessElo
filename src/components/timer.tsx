import React from "react";

function formatClockTime(clockTime: string): string {
  // Handles formats like HH:MM:SS(.s), MM:SS(.s), etc.
  if (!clockTime) return "00:00";
  const parts = clockTime.split(":");
  let minutes = 0;
  let seconds = 0;
  if (parts.length === 3) {
    // HH:MM:SS(.s)
    minutes = parseInt(parts[1], 10);
    seconds = Math.floor(parseFloat(parts[2]));
  } else if (parts.length === 2) {
    // MM:SS(.s)
    minutes = parseInt(parts[0], 10);
    seconds = Math.floor(parseFloat(parts[1]));
  } else {
    return clockTime;
  }
  // Pad minutes and seconds to 2 digits if needed
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function Timer({ clockTime }: { clockTime: string }) {
  return <div className="text-2xl font-bold">{formatClockTime(clockTime)}</div>;
}
