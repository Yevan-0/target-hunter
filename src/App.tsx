import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Experience from "./components/Experience.tsx"
import { Physics } from "@react-three/rapier"

export default function App() {
  return (
    <Canvas camera={{ position: [0, 1.6, 0], fov: 75 }}>
      <Suspense>
        <Physics>
          <Experience />
        </Physics>
      </Suspense>
    </Canvas>
  )
}