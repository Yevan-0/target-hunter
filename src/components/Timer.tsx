import { useEffect } from "react";
import { useGameStore, gameStates } from "../store";

export default function Timer() {
  const tickTimer = useGameStore(s => s.tickTimer)
  const isGameOver = useGameStore(s => s.isGameOver)
  const gameState = useGameStore(s => s.gameState)
  const setGameState = useGameStore(s => s.setGameState)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGameOver || gameState !== gameStates.GAME) return
      tickTimer()
    }, 1000)
    return () => clearInterval(interval)
  }, [gameState])

  useEffect(() => {
    if (isGameOver) {
      setGameState(gameStates.GAME_OVER)
    }
  }, [isGameOver])

  return null
}