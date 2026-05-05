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
}

const randX = () => (Math.random() - 0.5) * 20
const randZ = () => -(Math.random() * 30 + 5)

const generateTargets = (_stage: number) => {
  return [
    { id: 1, position: [randX(), 1.5, randZ()] as [number, number, number], scale: 1.4, speed: 0.3 },
    { id: 2, position: [randX(), 1.5, randZ()] as [number, number, number], scale: 0.9, speed: 0.5 },
    { id: 3, position: [randX(), 1.5, randZ()] as [number, number, number], scale: 0.5, speed: 1.0 },
  ]
}


export const useGameStore = create<GameStore>()(subscribeWithSelector((set, _get) => ({
  level: null,
  currentStage: 0,
  targets: [],
  score: 0,
  meshes: [],

  spawnTargets: (stage) => set({
    targets: generateTargets(stage)
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
  }))
})))
