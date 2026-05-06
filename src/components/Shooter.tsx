import { useThree } from '@react-three/fiber'
import { useGameStore } from '../store'
import { Vector2 } from 'three'
import { useEffect } from 'react'

export default function Shooter() {
  const { camera, raycaster } = useThree()
  const hitTarget = useGameStore(s => s.hitTarget)
  const unregisterMesh = useGameStore(s => s.unregisterMesh)

  const handleShoot = () => {
    console.log("shot fired")
    const meshes = useGameStore.getState().meshes
    raycaster.setFromCamera(new Vector2(0, 0), camera)
    const hits = raycaster.intersectObjects(meshes,false)
    console.log('meshes:', meshes)
    console.log('hits:', hits)
    if (hits.length === 0) {
      return
    }
    else {
      const id = hits[0].object.userData.id
      console.log('hit id:', id)
      hitTarget(id)
      unregisterMesh(id)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleShoot)
    return () => {
      window.removeEventListener('click', handleShoot)
    }
  }, [])
  return null
}