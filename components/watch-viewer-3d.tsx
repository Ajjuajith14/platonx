"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import type * as THREE from "three"

function WatchModel() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group>
      {/* Watch case */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.3, 32]} />
        <meshStandardMaterial color="#E5E7EB" metalness={0.9} roughness={0.1} envMapIntensity={1} />
      </mesh>

      {/* Watch face */}
      <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 12
        const x = Math.cos(angle) * 0.8
        const z = Math.sin(angle) * 0.8
        return (
          <mesh key={i} position={[x, 0.17, z]}>
            <boxGeometry args={[0.05, 0.01, 0.1]} />
            <meshStandardMaterial color="#E5E7EB" />
          </mesh>
        )
      })}

      {/* Watch hands */}
      <mesh position={[0, 0.18, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.02, 0.01, 0.6]} />
        <meshStandardMaterial color="#E5E7EB" />
      </mesh>

      <mesh position={[0, 0.19, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.015, 0.01, 0.4]} />
        <meshStandardMaterial color="#E5E7EB" />
      </mesh>

      {/* Watch band */}
      <mesh position={[0, 0, 1.5]}>
        <boxGeometry args={[0.3, 0.1, 1]} />
        <meshStandardMaterial color="#1F2937" />
      </mesh>

      <mesh position={[0, 0, -1.5]}>
        <boxGeometry args={[0.3, 0.1, 1]} />
        <meshStandardMaterial color="#1F2937" />
      </mesh>
    </group>
  )
}

export default function WatchViewer3D() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 2, 5]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <Environment preset="studio" />
        <WatchModel />
      </Canvas>
    </div>
  )
}
