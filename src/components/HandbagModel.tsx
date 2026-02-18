import { useRef } from 'react';
import { useGLTF, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export default function HandbagModel(props: any) {
    const { scene } = useGLTF(`${import.meta.env.BASE_URL}assets/models/handbag.glb`);
    const group = useRef<Group>(null);

    useFrame((state) => {
        if (group.current) {
            // Continuous rotation
            group.current.rotation.y += 0.005;
            // Slight floating tilt
            group.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={3} rotationIntensity={1.5} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
            <group ref={group} {...props} dispose={null}>
                <primitive object={scene} />
            </group>
        </Float>
    );
}

useGLTF.preload(`${import.meta.env.BASE_URL}assets/models/handbag.glb`);
