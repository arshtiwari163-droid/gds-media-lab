import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import Logo3D from './Logo3D';

export default function Visualizer() {
    const location = useLocation();
    // Disable global visualizer on pages that have their own 3D background
    const hiddenPaths = ['/designs'];

    if (hiddenPaths.includes(location.pathname)) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: false, powerPreference: 'high-performance', stencil: false, depth: true }}
            >
                {/* Simplified High-Performance Lighting */}
                <ambientLight intensity={2} />
                <directionalLight position={[5, 5, 5]} intensity={3} />

                <Suspense fallback={null}>
                    <Logo3D />
                </Suspense>
            </Canvas>
        </div>
    );
}
