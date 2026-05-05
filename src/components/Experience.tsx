import { useEffect } from 'react'
import { Sky, PointerLockControls } from "@react-three/drei"
import { Target } from "./Target.tsx"
import { useGameStore } from "../../store"
const fogColor = "#f8faff8a"

export default function Experience() {
  const targets = useGameStore(s => s.targets)
  const hitTarget = useGameStore(s => s.hitTarget)
  const spawnTargets = useGameStore(s => s.spawnTargets)

  useEffect(() => {
    spawnTargets(0)
  }, [])

  return (
    <>
      <PointerLockControls
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
      />

      <ambientLight color="#B3D9FF" intensity={0.5} />
      <directionalLight castShadow position={[5, 30, 5]} intensity={1.5} />
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0.5} azimuth={0.25} />
      <fog attach="fog" args={[fogColor, 1, 50]} />

      {targets.map(t => (
        <Target
          key={t.id}
          position={t.position}
          scale={t.scale}
          speed={t.speed}
          onClick={() => hitTarget(t.id)}
        />
      ))}

      <mesh rotation-x={-Math.PI * 0.5} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#ffcb86" />
      </mesh>
    </>
  )
}