
import { Check, Instagram, Youtube } from 'lucide-react';



interface PackageTier {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    icon: 'instagram' | 'youtube';
    color: string;
    highlight?: boolean;
    pdfUrl?: string;
}

const PackageCard = ({ tier }: { tier: PackageTier }) => {
    const isInsta = tier.icon === 'instagram';
    const Icon = isInsta ? Instagram : Youtube;

    return (
        <div className={`relative h-full flex flex-col p-8 md:p-12 rounded-3xl border backdrop-blur-xl transition-all duration-500 group hover:-translate-y-2
      ${tier.highlight
                ? 'bg-white/10 border-white/20 shadow-2xl shadow-royal-gold/10'
                : 'bg-white/5 border-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-black/50'
            }
    `}>
            {/* Background Gradient */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-${isInsta ? 'pink-500' : 'red-600'}/10 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-opacity duration-700 opacity-30 group-hover:opacity-60`}></div>

            {/* Header */}
            <div className="relative z-10 mb-8">
                <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-6 ${tier.highlight ? 'bg-white/20' : 'bg-white/10'}`}>
                    <Icon className={`w-8 h-8 ${tier.color}`} />
                </div>
                <h3 className="text-3xl font-serif text-white mb-2">{tier.title}</h3>
                <p className={`text-sm uppercase tracking-widest font-medium ${tier.color} opacity-90`}>{tier.subtitle}</p>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-10 flex-grow font-light border-l-2 border-white/10 pl-4">
                {tier.description}
            </p>

            {/* Features */}
            <div className="relative z-10">
                <h4 className="text-sm uppercase text-white/50 mb-6 font-semibold tracking-wider">Inclusions</h4>
                <ul className="space-y-4">
                    {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300 group/item">
                            <div className={`mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border border-white/10 ${tier.highlight ? 'bg-royal-gold/20 border-royal-gold/30' : 'bg-white/5'}`}>
                                <Check className={`w-3 h-3 ${tier.color}`} />
                            </div>
                            <span className="text-sm tracking-wide font-light group-hover/item:text-white transition-colors">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTA Button */}
            {tier.pdfUrl ? (
                <a
                    href={tier.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-10 w-full py-4 rounded-xl font-medium tracking-wide transition-all duration-300 block text-center
            ${tier.highlight
                            ? 'bg-royal-gold text-black hover:bg-white'
                            : 'bg-white/10 text-white hover:bg-white hover:text-black'
                        }
          `}
                >
                    View More Details
                </a>
            ) : (
                <button className={`mt-10 w-full py-4 rounded-xl font-medium tracking-wide transition-all duration-300
            ${tier.highlight
                        ? 'bg-royal-gold text-black hover:bg-white'
                        : 'bg-white/10 text-white hover:bg-white hover:text-black'
                    }
          `}>
                    View More Details
                </button>
            )}
        </div>
    );
};

export default function Packages() {
    const tiers: PackageTier[] = [
        {
            title: "Foundation",
            subtitle: "Instagram Growth",
            icon: "instagram",
            description: "Establish a visually stunning presence. Perfect for brands starting their journey to influence.",
            color: "text-pink-500",
            features: [
                "Profile Optimization",
                "Content Strategy (9 Posts/mo)",
                "Basic Hashtag Research",
                "Community Engagement",
                "Monthly Performance Report"
            ],
            pdfUrl: `${import.meta.env.BASE_URL}foundation.pdf`
        },
        {
            title: "Empire",
            subtitle: "Instagram Dominance",
            icon: "instagram",
            description: "Scale your brand with aggressive growth strategies and premium content production.",
            color: "text-pink-400",
            highlight: true,
            features: [
                "Advanced Profile Aesthetics",
                "Feature-Rich Content (15 Posts + 4 Reels)",
                "Influencer Outreach",
                "Strategic Story Campaigns",
                "24/7 Community Management",
                "Weekly Analytics Deep Dive"
            ],
            pdfUrl: `${import.meta.env.BASE_URL}empire.pdf`
        },
        {
            title: "Launch",
            subtitle: "YouTube Starter",
            icon: "youtube",
            description: "Launch your channel with broadcast-quality editing and SEO-optimized video structure.",
            color: "text-red-500",
            features: [
                "Channel Branding Setup",
                "Video Editing (2 Videos/mo)",
                "Thumbnail Design",
                "Basic SEO & Keyword Research",
                "Upload Management"
            ],
            pdfUrl: `${import.meta.env.BASE_URL}launch.pdf`
        },
        {
            title: "Dominion",
            subtitle: "YouTube Authority",
            icon: "youtube",
            description: "Command your niche with high-retention editing, script coaching, and viral growth tactics.",
            color: "text-red-400",
            highlight: true,
            features: [
                "Complete Channel Management",
                "Premium Editing (4 Videos + 4 Shorts)",
                "Click-Through Rate Optimization",
                "Script & Hook Consultation",
                "Audience Growth Strategy",
                "Monetization Guidance"
            ],
            pdfUrl: `${import.meta.env.BASE_URL}dominion.pdf`
        }
    ];

    return (
        <section className="relative z-10 min-h-screen py-16 md:py-24 px-6 overflow-hidden">
            {/* Interactive 3D Background - REMOVED to use global Visualizer */}
            {/* <div className="absolute inset-0 z-0 pointer-events-none"> ... </div> */}

            <div className="relative z-10 max-w-7xl mx-auto pointer-events-none">
                <div className="text-center mb-16 md:mb-20 pointer-events-auto">
                    <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-4 md:mb-6">Service Packages</h2>
                    <p className="text-lg md:text-xl text-royal-gold max-w-2xl mx-auto uppercase tracking-widest font-medium">
                        Curated strategies for digital excellence
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pointer-events-auto">
                    {tiers.map((tier, index) => (
                        <PackageCard key={index} tier={tier} />
                    ))}
                </div>
            </div>
        </section>
    );
}
