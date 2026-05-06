import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Experience from "./components/Experience.tsx"
import { Physics } from "@react-three/rapier"
export default function App() {
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
   </div>
  )
}