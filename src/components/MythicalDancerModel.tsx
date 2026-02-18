import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function MythicalDancerModel() {
    const { scene } = useGLTF(`${import.meta.env.BASE_URL}assets/models/mythical_dancer.glb`);
    const modelRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += delta * 0.5; // Smooth rotation independent of frame rate
        }
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
        >
            <primitive
                ref={modelRef}
                object={scene}
                scale={6.5}
                position={[0, 0, 0]}
                rotation={[0, Math.PI / 4, 0]}
            />
        </Float>
    );
}

useGLTF.preload(`${import.meta.env.BASE_URL}assets/models/mythical_dancer.glb`);
