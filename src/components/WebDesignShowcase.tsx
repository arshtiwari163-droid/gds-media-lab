import { useRef, useLayoutEffect, Suspense } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import CameraModel from './CameraModel';

gsap.registerPlugin(ScrollTrigger);

const TierSection = ({ title, subtitle, features, description, color, align = 'left' }: any) => {
    return (
        <div className={`tier-section py-32 px-6 flex flex-col md:flex-row items-center gap-16 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1 text-center md:text-left content-col">
                <h3 className={`text-7xl font-serif mb-6 ${color} drop-shadow-sm`}>{title}</h3>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-10 font-medium">{subtitle}</p>

                <p className="text-gray-300 leading-loose mb-10 max-w-xl text-lg font-light border-l-2 border-white/10 pl-6">
                    {description}
                </p>


            </div>

            <div className="image-col flex-1 w-full max-w-lg bg-white/5 p-12 border border-white/10 backdrop-blur-xl rounded-3xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${color.replace('text-', 'from-').replace('500', '')}/10 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-80`}></div>
                <h4 className="text-3xl font-serif text-white mb-10 border-b border-white/10 pb-4">Inclusions</h4>
                <ul className="space-y-6">
                    {features.map((f: string, i: number) => (
                        <li key={i} className="flex items-center gap-6 text-gray-300 group/item hover:translate-x-2 transition-transform duration-300">
                            <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-white/30 transition-colors`}>
                                <Check className={`w-4 h-4 ${color}`} />
                            </div>
                            <span className="text-sm tracking-wide font-light">{f}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default function WebDesignShowcase() {
    const container = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.tier-section').forEach((section: any) => {
                const content = section.querySelector('.content-col');
                const image = section.querySelector('.image-col');
                const items = section.querySelectorAll('li');

                gsap.from(content, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                    },
                    x: -50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });

                gsap.from(image, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                    },
                    x: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.2
                });

                gsap.from(items, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 60%",
                    },
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.4
                });
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative z-10 min-h-screen bg-rich-black pt-24 overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    dpr={1}
                    gl={{ antialias: false, powerPreference: "default" }}
                >
                    <color attach="background" args={['#050505']} />
                    <fog attach="fog" args={['#050505', 5, 20]} />

                    <ambientLight intensity={2} />
                    <directionalLight position={[10, 10, 5]} intensity={4} />

                    {/* Cinematic Lighting */}
                    <pointLight position={[-5, 2, 5]} color="#00ffff" intensity={10} distance={15} />
                    <pointLight position={[5, -2, 5]} color="#ffd700" intensity={10} distance={15} />

                    <Sparkles count={50} scale={10} size={2} speed={0.4} opacity={0.5} color="#ffffff" />

                    <Suspense fallback={null}>
                        <CameraModel scale={3} />
                    </Suspense>
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>
            <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
            <div className="py-20 text-center relative z-20">
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-royal-gold mb-6 drop-shadow-lg">The Collection</h2>
                <p className="text-xl text-white max-w-2xl mx-auto uppercase tracking-widest font-medium drop-shadow-md">
                    Choose the canvas for your digital masterpiece
                </p>
            </div>

            <div className="w-full">
                <TierSection
                    title="Basic"
                    subtitle="Foundation"
                    description="The perfect starting point for establishing your digital presence. We build a sleek, responsive, and high-performing single-page website that captures your brand's essence. Ideal for portfolios, landing pages, and small businesses looking to make a strong first impression."
                    color="text-gray-400"
                    features={[
                        "Custom Home Page Design",
                        "Mobile Responsive Layout",
                        "Contact Form Integration",
                        "Basic SEO Setup",
                        "1 Week Support"
                    ]}
                />
                <TierSection
                    title="Deluxe"
                    subtitle="Sovereign"
                    description="Elevate your business with a multi-page experience designed for growth. The Deluxe package includes a Content Management System (CMS) allowing you to update your site easily, along with a blog to engage your audience and improve search rankings."
                    color="text-antique-gold"
                    align="right"
                    features={[
                        "5 Page Premium Design",
                        "CMS Integration",
                        "Blog / News Section",
                        "Social Media Integration",
                        "Performance Optimization",
                        "Basic Analytics"
                    ]}
                />
                <TierSection
                    title="Super Deluxe"
                    subtitle="Monarch"
                    description="Dominate your market with a powerful e-commerce ready website. This package is tailored for businesses ready to sell online or showcase a large catalog of products. Includes advanced SEO to drive traffic and custom animations to dazzle visitors."
                    color="text-deep-saffron"
                    features={[
                        "10 Page Bespoke Design",
                        "E-commerce Capability",
                        "Advanced SEO Package",
                        "Newsletter Integration",
                        "Custom Animations",
                        "Brand Identity Refinement"
                    ]}
                />
                <TierSection
                    title="Premium"
                    subtitle="Imperial"
                    description="The ultimate digital flagship. A fully custom, enterprise-grade solution featuring immersive 3D elements, multi-language support, and a comprehensive content strategy. Designed for industry leaders who demand nothing less than perfection."
                    color="text-velvet-red"
                    align="right"
                    features={[
                        "Unlimited Pages",
                        "Full E-commerce Suite",
                        "Interactive 3D Elements",
                        "Priority Support (24/7)",
                        "Monthly Performance Reports",
                        "Content Strategy Consultation",
                        "Multi-language Support"
                    ]}
                />
                <TierSection
                    title="Customizable"
                    subtitle="Absolute"
                    description="Your vision, realized without compromise. We work closely with you to engineer a completely bespoke solution, from complex web applications to secure enterprise portals. If you can dream it, we can build it."
                    price="Custom Quote"
                    color="text-royal-gold"
                    features={[
                        "Tailored to specific business needs",
                        "Enterprise level security",
                        "Custom Web Applications",
                        "API Integrations",
                        "Dedicated Project Manager",
                        "White-label solutions"
                    ]}
                />
            </div>
        </section>
    );
}
