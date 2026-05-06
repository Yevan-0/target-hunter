import { useEffect } from 'react'
import { Sky, PointerLockControls } from "@react-three/drei"
import { Target } from "./Target.tsx"
import { useGameStore } from "../../store"
import Shooter from './Shooter.tsx'
import Timer from './Timer.tsx'

const fogColor = "#f8faff"

export default function Experience() {
  const targets = useGameStore(s => s.targets)
  const spawnTargets = useGameStore(s => s.spawnTargets)
  const nextWave = useGameStore(s => s.nextWave)
  const timeLeft = useGameStore(s => s.timeLeft)

  useEffect(() => {
    if (targets.length === 0 && timeLeft < 30) {
      nextWave()
    }
  }, [targets])
  
  useEffect(() => {
    spawnTargets(1)
  }, [])

  return (
    <>
      <PointerLockControls
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
      />
      <Timer />
      <Shooter />
      <ambientLight color="#B3D9FF" intensity={0.5} />
      <directionalLight castShadow position={[5, 30, 5]} intensity={1.5} />
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0.5} azimuth={0.25} />
      <fog attach="fog" args={[fogColor, 1, 50]} />

      {targets.map(t => (
        <Target
          id={t.id}
          key={t.id}
          position={t.position}
          scale={t.scale}
          speed={t.speed}
        />
      ))}

      <mesh
        rotation-x={-Math.PI * 0.5}
        receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#ffcb86" />
      </mesh>
    </>
  )
}