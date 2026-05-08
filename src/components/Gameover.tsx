import { useState, useEffect } from "react"
import { useGameStore, gameStates } from "../store"
import { submitScore, getLeaderboard } from "../api"

export default function GameOver() {
  const gameState = useGameStore(s => s.gameState)
  const score = useGameStore(s => s.score)
  const resetGame = useGameStore(s => s.resetGame)
  const [name, setName] = useState('')
  const [leaderboard, setLeaderboard] = useState<{ name: string, score: number }[]>([])
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (gameState === gameStates.GAME_OVER) {
      getLeaderboard().then(data => setLeaderboard(data || []))
    }
  }, [gameState])

  if (gameState !== gameStates.GAME_OVER) return null

  const handleSubmit = async () => {
    await submitScore(name, score)
    const data = await getLeaderboard()
    setLeaderboard(data || [])
    setSubmitted(true)
  }

  const handlePlayAgain = () => {
    setSubmitted(false)
    setName('')
    resetGame()
  }

  return (
    <div>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center', color: 'white',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)',
        padding: '40px', borderRadius: '12px',
        minWidth: '300px'
      }}>
        <h1>Game Over</h1>
        <h3>Press Esc to activate cursor</h3>
        <p style={{ fontSize: '24px' }}>Score: {score}</p>

        {!submitted && (
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ padding: '8px', fontSize: '16px', marginBottom: '10px', width: '100%' }}
            />
            <button
              onClick={handleSubmit}
              style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
            >
              Submit Score
            </button>
          </div>
        )}

        <h2 style={{ marginTop: '20px' }}>Leaderboard</h2>
        {leaderboard.map((entry, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
            <span>{i + 1}. {entry.name}</span>
            <span>{entry.score}</span>
          </div>
        ))}

        <button
          onClick={handlePlayAgain}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}