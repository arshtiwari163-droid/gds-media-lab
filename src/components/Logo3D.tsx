import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Center } from '@react-three/drei';
import * as THREE from 'three';
import { useAudio } from '../context/AudioContext';

export default function Logo3D() {
    const ref = useRef<THREE.Group>(null);
    const { scene } = useGLTF(`${import.meta.env.BASE_URL}logo.glb`);
    const { analyser } = useAudio();
    const dataArray = useRef(new Uint8Array(0));
    const currentScale = useRef(0.5); // Base scale

    useEffect(() => {
        if (analyser) {
            dataArray.current = new Uint8Array(analyser.frequencyBinCount);
        }
    }, [analyser]);

    useFrame((state) => {
        if (ref.current) {
            // Audio Reactivity
            let scaleMultiplier = 1;
            if (analyser && dataArray.current.length > 0) {
                analyser.getByteFrequencyData(dataArray.current);

                // Calculate average of bass frequencies (lower half of data)
                const bassCount = Math.floor(dataArray.current.length * 0.2); // Focus on first 20% (bass)

                if (bassCount > 0) {
                    let sum = 0;
                    for (let i = 0; i < bassCount; i++) {
                        sum += dataArray.current[i];
                    }
                    const average = sum / bassCount;

                    // Normalize and map to scale (0 to 255 -> 1.0 to 1.3ish)
                    // Threshold: only react significantly if volume is audible
                    // Safeguard average against NaN just in case
                    if (!isNaN(average)) {
                        const intensity = THREE.MathUtils.mapLinear(average, 0, 200, 0, 0.4);
                        scaleMultiplier = 1 + intensity;
                    }
                }
            }

            // Smooth scaling
            currentScale.current = THREE.MathUtils.lerp(currentScale.current, 0.5 * scaleMultiplier, 0.2);
            ref.current.scale.setScalar(currentScale.current);

            // Mouse interaction: Rotate based on pointer position (normalized -1 to 1)
            const targetRotationY = state.pointer.x * 0.5; // Horizontal movement controls Y rotation
            const targetRotationX = -state.pointer.y * 0.5; // Vertical movement controls X rotation

            // Smoothly interpolate current rotation to target rotation
            ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotationY, 0.1);
            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotationX, 0.1);
        }
    });

    return (
        <Float floatIntensity={2} rotationIntensity={1} speed={1.5}>
            <group ref={ref}>
                <Center>
                    <primitive object={scene} />
                </Center>
            </group>
        </Float>
    );
}

useGLTF.preload(`${import.meta.env.BASE_URL}logo.glb`);
