
type Props = {
  position: [number, number, number]
  scale?: number
  speed?: number
  onClick?: () => void
}

export function Target({ position, scale = 1, onClick }: Props) {


  return (
    <mesh position={position} scale={scale} onClick={onClick} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[1, 1, 0.1, 64]} />
      <meshStandardMaterial color="white" />

      <mesh position={[0, 0.06, 0]} rotation-x={-Math.PI * 0.5}>
        <ringGeometry args={[0.65, 0.75, 64]} />
        <meshStandardMaterial color="black" />
      </mesh>

      <mesh position={[0, 0.06, 0]} rotation-x={-Math.PI * 0.5}>
        <ringGeometry args={[0.45, 0.65, 64]} />
        <meshStandardMaterial color="#4488ff" />
      </mesh>

      <mesh position={[0, 0.06, 0]} rotation-x={-Math.PI * 0.5}>
        <ringGeometry args={[0.25, 0.45, 64]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh position={[0, 0.06, 0]} rotation-x={-Math.PI * 0.5}>
        <circleGeometry args={[0.25, 64]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
    </mesh>
  )
}