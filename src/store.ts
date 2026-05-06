import type { Mesh } from "three";
import { create } from "zustand";
import { subscribeWithSelector } from 'zustand/middleware'

type GameStore = {
  level: null | number
  currentStage: number
  targets: { id: number; position: [number, number, number]; scale: number; speed: number }[]
  score: number
  spawnTargets: (stage: number) => void
  hitTarget: (id: number) => void
  meshes: Mesh[]
  registerMesh: (mesh: Mesh) => void
  unregisterMesh: (id: number) => void
  timeLeft: number
  wave: number
  isGameOver: boolean
  tickTimer: () => void
  nextWave: () => void
}

const randX = () => (Math.random() - 0.5) * 20
const randZ = () => -(Math.random() * 30 + 5)

const generateTargets = (wave: number) => {
  const targets = []
  for (let i = 0; i < wave * 3; i++) {
    targets.push({
      id: i,
      position: [randX(), 1.5, randZ()] as [number, number, number],
      scale: Math.max(0.3, 1.4 - i * 0.1),
      speed: 0.3 + i * 0.1
    })
  }
  return targets
}

export const useGameStore = create<GameStore>()(subscribeWithSelector((set, get) => ({
  level: null,
  currentStage: 0,
  targets: [],
  score: 0,
  meshes: [],
  timeLeft: 30,
  wave: 1,
  isGameOver: false,

  spawnTargets: (stage) => set({
    targets: generateTargets(stage),
  }),
  hitTarget: (id) => set((state) => ({
    targets: state.targets.filter(t => t.id !== id),
    score: state.score + 1
  })),
  registerMesh: (mesh) => set((state) => ({
    meshes: [...state.meshes, mesh]
  })),
  unregisterMesh: (id) => set((state) => ({
    meshes: state.meshes.filter(m => m.userData.id !== id)
  })),
  tickTimer: () => set((state) => ({
    timeLeft: Math.max(0, state.timeLeft - 1),
    isGameOver: state.timeLeft - 1 <= 0
  })),
  nextWave: () => set((state) => {
    const newWave = state.wave + 1
    get().spawnTargets(newWave)
    return { wave: newWave }
  })
})))
