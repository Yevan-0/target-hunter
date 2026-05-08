import { useGameStore, gameStates } from "../store"

export default function Menu() {
  const gameState = useGameStore(s => s.gameState)
  const setGameState = useGameStore(s => s.setGameState)
  const spawnTargets = useGameStore(s => s.spawnTargets)

  const startGame = () => {
    spawnTargets(1)
    setGameState(gameStates.GAME)
  }

  if (gameState !== gameStates.MENU) return null

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: 'white',
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(10px)',
      padding: '40px',
      borderRadius: '12px',
      minWidth: '300px'
    }}>
      <h1>Target Hunter</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  )
}