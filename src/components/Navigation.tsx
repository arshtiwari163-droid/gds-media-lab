import { Link, useLocation } from 'react-router-dom';

/* 
  Ethereal Navigation Bar 
  A sophisticated, dark-glass floating element with subtle gold accents.
  Designed to feel "weightless" and premium.
*/

export default function Navigation() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="fixed top-8 right-8 z-50 flex justify-end pointer-events-none mix-blend-screen">
            <nav className="relative pointer-events-auto group perspective-1000">

                {/* Main Crystal Container */}
                <div
                    className="
            relative 
            flex items-center justify-between 
            px-8 py-3
            rounded-2xl
            backdrop-blur-xl bg-white/5 
            border border-white/10
            shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
            transition-all duration-500 
            hover:bg-white/10 hover:border-royal-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]
            overflow-hidden
          "
                >
                    {/* Subtle animated noisy texture overlay */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

                    {/* Top Gold Line Gradient */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-royal-gold/50 to-transparent opacity-50"></div>


                    {/* HOME Logo - Minimalist */}
                    <Link
                        to="/"
                        className="
              mr-8 text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400
              hover:text-royal-gold transition-all duration-300
              tracking-[0.1em]
              flex items-center gap-2
            "
                    >
                        HOME
                    </Link>

                    {/* Links Container */}
                    <div className="flex items-center gap-6">
                        {[
                            { path: '/designs', label: 'Designs' },
                            { path: '/samples', label: 'Samples' },
                            { path: '/packages', label: 'Packages' }
                        ].map((link) => (
                            <div key={link.path} className="relative group/link">
                                <Link
                                    to={link.path}
                                    className={`
                    text-xs font-medium tracking-[0.2em] uppercase 
                    transition-all duration-500 ease-out
                    ${isActive(link.path) ? 'text-royal-gold' : 'text-gray-300 hover:text-white'}
                  `}
                                >
                                    {link.label}
                                </Link>

                                {/* Hover line indicator */}
                                <span className={`
                    absolute -bottom-1 left-0 w-0 h-[1px] bg-royal-gold 
                    transition-all duration-300 group-hover/link:w-full
                    ${isActive(link.path) ? 'w-full opacity-100' : 'opacity-0'}
                `}></span>
                            </div>
                        ))}
                    </div>

                    {/* Shine Sweep Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                </div>

            </nav>
        </div>
    );
}
