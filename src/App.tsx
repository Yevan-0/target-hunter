import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Experience from "./components/Experience.tsx"
import { Physics } from "@react-three/rapier"
import { useGameStore } from "./store.ts"

export default function App() {
  const timeLeft = useGameStore(s => s.timeLeft)
  const score = useGameStore(s => s.score)
  const wave = useGameStore(s => s.wave)

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>

      <Canvas
        camera={{ position: [0, 1.6, 0], fov: 75 }}
      >
        <Suspense>
          <Physics>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '24px',
        pointerEvents: 'none'
      }}>
        +
      </div>
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '60px',
        pointerEvents: 'none',
        fontWeight: "bold"
      }} >
        {timeLeft}
      </div>
    </div >
  )
}