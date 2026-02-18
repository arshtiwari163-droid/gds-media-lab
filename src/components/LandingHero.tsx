import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Instagram, Mail } from 'lucide-react';
import LazyBackgroundVideo from './LazyBackgroundVideo';


gsap.registerPlugin(ScrollTrigger);

const SectionSeparator = () => (
    <div className="flex justify-center items-center py-10 opacity-50">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-royal-gold to-transparent"></div>
        <div className="mx-4 text-royal-gold text-xl animate-pulse">❖</div>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-royal-gold to-transparent"></div>
    </div>
);

export default function LandingHero() {
    const container = useRef(null);
    const titleRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation (Staggered entrance)
            // Hero Title Animation
            const heroTl = gsap.timeline({ delay: 0.5 });

            heroTl.to(".hero-decoration", {
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            })
                .to(".hero-text-char", {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    stagger: 0.05,
                    duration: 1.2,
                    ease: "power4.out"
                }, "-=0.5")
                .to(".hero-subtitle", {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out"
                }, "-=0.8");

            // Parallax Effects for sections
            gsap.utils.toArray('.parallax-section').forEach((section: any) => {
                gsap.to(section, {
                    backgroundPosition: "50% 100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

            // Fade Up + Scale animation for cards
            gsap.utils.toArray('.reveal-card').forEach((elem: any) => {
                gsap.from(elem, {
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                    },
                    y: 50,
                    scale: 0.95,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });
            });

            // Royal Standard Process Animation
            const processTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".process-line-path",
                    start: "top 80%",
                    end: "bottom 50%",
                    scrub: 1
                }
            });

            processTl.to(".process-line-path", {
                strokeDashoffset: 0,
                duration: 2,
                ease: "power1.inOut"
            });

            gsap.from(".process-card", {
                scrollTrigger: {
                    trigger: ".process-card",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: "back.out(1.7)"
            });

        }, container);
        return () => ctx.revert();
    }, []);

    // Split title utility
    const title = "MEDIA LAB";

    return (
        <section id="landing-section" ref={container} className="relative z-10 w-full overflow-hidden">

            {/* HERO HERO */}
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative border-b border-royal-gold/20">
                <div className="absolute inset-0 z-0 pointer-events-none">

                </div>

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.15)_0%,_transparent_70%)] pointer-events-none"></div>

                {/* Decorative Top Element */}
                <div className="mb-12 relative opacity-0 hero-decoration">
                    <div className="w-1 h-24 bg-gradient-to-b from-transparent via-royal-gold to-transparent mx-auto"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border rotate-45 border-royal-gold/50"></div>
                </div>

                <h1 ref={titleRef} className="text-5xl md:text-[8rem] lg:text-[10rem] leading-tight text-imperial-gold mb-8 md:mb-12 z-10 tracking-wider overflow-hidden drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" style={{ fontFamily: 'Samarkan, sans-serif', textShadow: '0 0 40px rgba(212,175,55,0.4)' }}>
                    {title.split("").map((char, i) => (
                        <span key={i} className="hero-text-char inline-block opacity-0 translate-y-20 hover:text-white transition-colors duration-500 cursor-default">{char}</span>
                    ))}
                </h1>

                <div className="hero-subtitle opacity-0 max-w-4xl mx-auto relative cursor-default px-4">
                    <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
                        <div className="h-[1px] w-8 md:w-32 bg-gradient-to-r from-transparent to-royal-gold"></div>
                        <span className="text-xl md:text-2xl text-royal-gold animate-spin-slow">✦</span>
                        <div className="h-[1px] w-8 md:w-32 bg-gradient-to-l from-transparent to-royal-gold"></div>
                    </div>

                    <p className="text-xl md:text-4xl text-off-white font-serif tracking-[0.1em] uppercase mb-8 md:mb-12 drop-shadow-lg text-center leading-relaxed">
                        "नास्त्युद्धतसमं बलम | नास्ति बुद्धिसमं सुखम ||"
                    </p>
                    <p className="text-sm md:text-base text-royal-gold/80 font-light tracking-[0.3em] uppercase">
                        Curating Digital Opulence
                    </p>
                </div>

                <div className="absolute bottom-10 animate-bounce text-royal-gold opacity-70 cursor-pointer hover:text-white transition-colors duration-300">
                    <ArrowDown className="w-8 h-8" />
                </div>
            </div>

            {/* MOTO SECTION */}
            <div className="py-24 md:py-32 px-6 relative parallax-section overflow-hidden">
                <LazyBackgroundVideo
                    className="absolute inset-0 w-full h-full object-cover"
                    src={`${import.meta.env.BASE_URL}assets/videos/philosophy-bg.mp4`}
                    autoPlay
                />
                <div className="absolute inset-0 bg-black/80"></div>

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <SectionSeparator />
                    <h2 className="reveal-card text-3xl md:text-6xl font-serif text-white mb-10 md:mb-16">The Philosophy</h2>
                    <div className="reveal-card relative p-8 md:p-12 border-2 border-royal-gold/10 bg-white/5 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] transform hover:scale-[1.02] transition-transform duration-500">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-royal-gold"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-royal-gold"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-royal-gold"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-royal-gold"></div>

                        <p className="text-lg md:text-2xl text-off-white leading-loose font-serif italic text-center">
                            "We don’t just build systems; we curate legacies. In a world of fleeting trends, we offer timeless grandeur.
                            Our goal is to forge a digital dominion that stands as a testament to your prestige."
                        </p>
                    </div>
                    <SectionSeparator />
                </div>
            </div>

            {/* PROCESS SECTION */}
            <div className="py-24 md:py-40 bg-gradient-to-b from-rich-black to-velvet-red/5 border-y border-royal-gold/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_60%)] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20 md:mb-32">
                        <SectionSeparator />
                        <h2 className="reveal-card text-4xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-imperial-gold via-royal-gold to-bronze mb-6">The Royal Standard</h2>
                        <p className="reveal-card text-lg md:text-xl text-gray-400 font-light tracking-widest uppercase">The Path to Sovereignty</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24 relative">
                        {/* Animated Connecting Line (Desktop) */}
                        <svg className="hidden md:block absolute top-16 left-0 w-full h-[200px] -z-10 pointer-events-none" preserveAspectRatio="none">
                            <path
                                className="process-line-path"
                                d="M 160,80 Q 400,80 600,80 T 1100,80"
                                fill="none"
                                stroke="url(#goldGradient)"
                                strokeWidth="2"
                                strokeDasharray="1000"
                                strokeDashoffset="1000"
                            />
                            <defs>
                                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="20%" stopColor="#D4AF37" />
                                    <stop offset="80%" stopColor="#D4AF37" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {[
                            { step: "I", title: "Consult", desc: "Understanding the sovereign essence of your vision." },
                            { step: "II", title: "Craft", desc: "Forging architecture with gold-standard precision." },
                            { step: "III", title: "Coronate", desc: "Unveiling a masterpiece worthy of your name." }
                        ].map((item, i) => (
                            <div key={i} className="process-card flex flex-col items-center text-center group">
                                {/* Diamond Container */}
                                <div className="w-40 h-40 relative flex items-center justify-center mb-12 perspective-1000">
                                    <div className="relative w-24 h-24 transform-style-3d group-hover:rotate-y-180 transition-transform duration-1000 ease-in-out">
                                        {/* Front */}
                                        <div className="absolute inset-0 bg-rich-black border-2 border-royal-gold rotate-45 shadow-[0_0_30px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-shadow duration-500 backface-hidden flex items-center justify-center">
                                            <span className="text-4xl font-serif text-imperial-gold">{item.step}</span>
                                        </div>
                                        {/* Back Glow Effect */}
                                        <div className="absolute inset-0 bg-royal-gold/10 border border-royal-gold rotate-45 blur-md -z-10 animate-pulse-slow"></div>
                                    </div>

                                    {/* Orbiting Particles */}
                                    <div className="absolute w-full h-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                        <div className="absolute top-0 left-1/2 w-1 h-1 bg-royal-gold rounded-full shadow-[0_0_10px_#D4AF37]"></div>
                                        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-royal-gold rounded-full shadow-[0_0_10px_#D4AF37]"></div>
                                    </div>
                                </div>

                                <h3 className="text-4xl font-serif text-off-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-noble-white group-hover:to-royal-gold transition-all duration-500 transform group-hover:-translate-y-2">
                                    {item.title}
                                </h3>
                                <div className="h-[1px] w-12 bg-royal-gold/50 mb-6 group-hover:w-24 transition-all duration-500"></div>
                                <p className="text-gray-400 max-w-xs font-light tracking-wide leading-relaxed group-hover:text-gray-200 transition-colors duration-500">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SIGNATURE SERVICES */}
            <div className="py-24 md:py-40 px-6 relative bg-texture-pattern overflow-hidden">
                <div className="container mx-auto max-w-6xl relative z-10">
                    <h2 className="reveal-card text-center text-4xl md:text-7xl font-serif text-antique-gold mb-20 md:mb-40 tracking-wider">Signature Services</h2>

                    <div className="space-y-24 md:space-y-40">
                        {[
                            { id: "01", title: "Bespoke Web Architecture", desc: "We construct digital palaces. Every pixel is placed with intent, every interaction designed for dignity and grace.", align: "left" },
                            { id: "02", title: "Imperial Marketing Strategy", desc: "Commanding attention in a crowded kingdom. We deploy campaigns that act as royal decrees—unignorable and absolute.", align: "right" },
                            { id: "03", title: "Elite Brand Elevation", desc: "Transforming entities into dynasties. We refine your visual language to speak with the authority of history.", align: "left" }
                        ].map((s, i) => (
                            <div key={i} className={`reveal-card flex flex-col ${s.align === 'right' ? 'md:items-end text-right' : 'md:items-start text-left'} relative group`}>
                                {/* Glass Card Background */}
                                <div className={`absolute -inset-6 md:-inset-10 bg-white/5 backdrop-blur-sm rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${s.align === 'right' ? 'origin-right' : 'origin-left'} transform group-hover:scale-105`}></div>

                                {/* Watermark Number */}
                                <div className={`absolute top-1/2 -translate-y-1/2 ${s.align === 'right' ? '-left-10 md:-left-20' : '-right-10 md:-right-20'} text-[6rem] md:text-[12rem] font-serif text-royal-gold/5 pointer-events-none select-none transition-transform duration-1000 group-hover:scale-110 group-hover:text-royal-gold/10`}>
                                    {s.id}
                                </div>

                                <h3 className="text-2xl md:text-6xl font-serif text-white mb-6 md:mb-8 relative inline-block pb-4 z-10">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 group-hover:from-imperial-gold group-hover:via-royal-gold group-hover:to-bronze transition-all duration-700">
                                        {s.title}
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:scale-x-105 transition-transform duration-700"></span>
                                    <span className={`absolute bottom-0 ${s.align === 'left' ? 'left-0' : 'right-0'} w-0 h-[3px] bg-royal-gold group-hover:w-full transition-all duration-1000 ease-in-out`}></span>
                                </h3>

                                <p className="text-lg md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-light group-hover:text-gray-200 transition-colors duration-500 z-10">
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FOUNDERS SECTION */}
            <div className="py-24 md:py-40 relative border-t border-royal-gold/30 overflow-hidden">
                <LazyBackgroundVideo
                    className="absolute inset-0 w-full h-full object-cover"
                    src={`${import.meta.env.BASE_URL}assets/videos/founder-bg.mp4`}
                    autoPlay
                />
                <div className="absolute inset-0 bg-black/85"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16 md:mb-24">
                        <SectionSeparator />
                        <h2 className="reveal-card text-4xl md:text-7xl font-serif text-white mb-6">The Founders</h2>
                        <p className="reveal-card text-xl text-gray-300 font-light max-w-2xl mx-auto">
                            "Preserving the sanctity of connection. We bond tradition with tomorrow, ensuring your legacy echoes through the digital ages."
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 group/section">
                        {/* Founder 1 */}
                        <div className="reveal-card flex flex-col items-center group/founder transition-all duration-700 hover:scale-105 hover:!opacity-100 group-hover/section:opacity-50">
                            <div className="relative w-80 h-96 mb-12 perspective-1000">
                                <div className="absolute -inset-4 border border-royal-gold/30 rotate-3 group-hover/founder:rotate-6 transition-transform duration-700"></div>
                                <div className="absolute -inset-4 border border-royal-gold/30 -rotate-3 group-hover/founder:-rotate-6 transition-transform duration-700"></div>
                                <div className="absolute inset-0 border-2 border-double border-royal-gold shadow-[0_0_30px_rgba(212,175,55,0.2)] bg-rich-black overflow-hidden flex items-center justify-center transform group-hover/founder:rotate-y-12 transition-transform duration-700">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/founders/datta.jpg`}
                                        alt="Datta Eswar Tangeti"
                                        className="w-full h-full object-cover opacity-75 group-hover/founder:opacity-100 transition-opacity duration-500"
                                    />
                                </div>
                            </div>
                            <h3 className="text-3xl font-serif text-off-white mb-2">Datta Eswar Tangeti</h3>
                            <p className="text-royal-gold uppercase tracking-[0.2em] text-sm mb-6">Visionary</p>
                            <div className="flex gap-6 opacity-0 group-hover/founder:opacity-100 transition-opacity duration-500 translate-y-4 group-hover/founder:translate-y-0">
                                <a href="https://www.instagram.com/dattaeswar?igsh=a3p0ZzhrdGp4d2F6" target="_blank" rel="noopener noreferrer" className="text-antique-gold hover:text-white transition-colors"><Instagram size={20} /></a>
                                <a href="mailto:dattaeswar.tangeti@gmail.com" className="text-antique-gold hover:text-white transition-colors"><Mail size={20} /></a>
                            </div>
                        </div>

                        {/* Founder 2 */}
                        <div className="reveal-card flex flex-col items-center group/founder transition-all duration-700 hover:scale-105 hover:!opacity-100 group-hover/section:opacity-50">
                            <div className="relative w-80 h-96 mb-12 perspective-1000">
                                <div className="absolute -inset-4 border border-royal-gold/30 -rotate-3 group-hover/founder:-rotate-6 transition-transform duration-700"></div>
                                <div className="absolute -inset-4 border border-royal-gold/30 rotate-3 group-hover/founder:rotate-6 transition-transform duration-700"></div>
                                <div className="absolute inset-0 border-2 border-double border-royal-gold shadow-[0_0_30px_rgba(212,175,55,0.2)] bg-rich-black overflow-hidden flex items-center justify-center transform group-hover/founder:-rotate-y-12 transition-transform duration-700">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/founders/founder2.webp`}
                                        alt="Harpreet Singh"
                                        className="w-full h-full object-cover opacity-75 group-hover/founder:opacity-100 transition-opacity duration-500"
                                    />
                                </div>
                            </div>
                            <h3 className="text-3xl font-serif text-off-white mb-2">Harpreet Singh</h3>
                            <p className="text-royal-gold uppercase tracking-[0.2em] text-sm mb-6">Curator</p>
                            <div className="flex gap-6 opacity-0 group-hover/founder:opacity-100 transition-opacity duration-500 translate-y-4 group-hover/founder:translate-y-0">
                                <a href="https://www.instagram.com/itz__ronak__ox?igsh=MTNxbnZ5azdqbWhtbQ==" target="_blank" rel="noopener noreferrer" className="text-antique-gold hover:text-white transition-colors"><Instagram size={20} /></a>
                                <a href="mailto:blackjoker.ronak@gmail.com" className="text-antique-gold hover:text-white transition-colors"><Mail size={20} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
