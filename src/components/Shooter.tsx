import { useThree } from '@react-three/fiber'
import { useGameStore,gameStates } from '../store'
import { Vector2 } from 'three'
import { useEffect } from 'react'

export default function Shooter() {
  const { camera, raycaster } = useThree()
  const hitTarget = useGameStore(s => s.hitTarget)
  const unregisterMesh = useGameStore(s => s.unregisterMesh)
  const gameState = useGameStore(s=> s.gameState)

  const handleShoot = () => {
    if (gameState !== gameStates.GAME) return
    const meshes = useGameStore.getState().meshes
    raycaster.setFromCamera(new Vector2(0, 0), camera)
    const hits = raycaster.intersectObjects(meshes, false)
    if (hits.length === 0) {
      return
    }
    else {
      const id = hits[0].object.userData.id
      hitTarget(id)
      unregisterMesh(id)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleShoot)
    return () => {
      window.removeEventListener('click', handleShoot)
    }
  }, [gameState])
  return null
}