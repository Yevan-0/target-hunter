import { useEffect } from "react";
import { useGameStore } from "../store";

export default function Timer() {
  const tickTimer = useGameStore(s => s.tickTimer)
  const isGameOver = useGameStore(s => s.isGameOver)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGameOver) return
      tickTimer()
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return null
}