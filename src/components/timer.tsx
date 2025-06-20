import React from "react";

export default function Timer({ clockTime }: { clockTime: string }) {
  return <div className="text-2xl font-bold">{clockTime}</div>;
}
