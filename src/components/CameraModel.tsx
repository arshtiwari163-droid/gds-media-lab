import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function CameraModel(props: any) {
    const gltf = useGLTF(`${import.meta.env.BASE_URL}assets/models/camera.glb`);
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            // Slow rotation for ambient movement
            group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={gltf.scene} />
        </group>
    );
}

useGLTF.preload(`${import.meta.env.BASE_URL}assets/models/camera.glb`);
