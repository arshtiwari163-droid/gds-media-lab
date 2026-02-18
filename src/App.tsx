import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
const Visualizer = lazy(() => import('./components/Visualizer'));
import Navigation from './components/Navigation';
import AudioPlayer from './components/AudioPlayer';
import { AudioProvider } from './context/AudioContext';

const LandingHero = lazy(() => import('./components/LandingHero'));
const WebDesignShowcase = lazy(() => import('./components/WebDesignShowcase'));
const DigitalMarketing = lazy(() => import('./components/DigitalMarketing'));
const Packages = lazy(() => import('./components/Packages'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

function LoadingSpinner() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-rich-black">
      <div className="w-12 h-12 border-4 border-royal-gold/30 border-t-royal-gold rounded-full animate-spin"></div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SmoothScroll>
        <ScrollToTop />
        <AudioProvider>
          <main className="bg-rich-black text-off-white selection:bg-royal-gold selection:text-black font-sans min-h-screen flex flex-col">
            {/* 3D Background - Persists across all routes */}
            <Suspense fallback={null}>
              <Visualizer />
            </Suspense>

            {/* Navigation */}
            <Navigation />

            {/* Background Music Player */}
            <AudioPlayer />

            {/* Content */}
            <div className="relative z-10 flex-grow">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<LandingHero />} />
                  <Route path="/designs" element={<WebDesignShowcase />} />
                  <Route path="/samples" element={<DigitalMarketing />} />
                  <Route path="/packages" element={<Packages />} />
                </Routes>
              </Suspense>
            </div>
          </main>
        </AudioProvider>
      </SmoothScroll>
    </Router>
  );
}

export default App;
