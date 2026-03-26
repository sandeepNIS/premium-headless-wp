import { getPageBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function AboutPage() {
  const page = await getPageBySlug('about');

  if (!page) {
    // If 'about' page doesn't exist in WP, we could show a fallback or notFound
    // but the user wants to fetch it.
    console.warn("About page not found in WordPress. Using fallback content.");
  }

  const title = page?.title?.rendered || "About Our Vision";
  const content = page?.content?.rendered || "We are dedicated to building the most seamless headless CMS experiences using modern technologies like Next.js and Tailwind CSS.";

  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* Unique About Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/about_hero_image.png" 
            alt="About Hero" 
            fill 
            className="object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <span className="text-secondary font-black tracking-[0.2em] uppercase text-sm mb-6 block animate-fade-in">
            EST. 2026
          </span>
          <h1 
            className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter mb-8 max-w-4xl"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className="w-24 h-2 bg-primary rounded-full" />
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-black text-white leading-tight">
            Crafting Digital <span className="text-primary italic">Excellence</span> Through Headless Architecture.
          </h2>
          <div 
            className="wp-content text-xl text-foreground/70 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="pt-6 flex gap-12">
            <div>
              <p className="text-3xl font-black text-white mb-1">99%</p>
              <p className="text-muted text-sm uppercase font-bold tracking-widest">Efficiency</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white mb-1">24/7</p>
              <p className="text-muted text-sm uppercase font-bold tracking-widest">Delivery</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white mb-1">0.2s</p>
              <p className="text-muted text-sm uppercase font-bold tracking-widest">Load Speed</p>
            </div>
          </div>
        </div>
        
        <div className="relative aspect-square">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
          <div className="relative z-10 grid grid-cols-2 gap-4 h-full">
             <div className="bg-white/5 border border-white/10 rounded-3xl h-full mt-12 overflow-hidden hover:border-primary/50 transition-colors">
                <Image src="https://images.unsplash.com/photo-1522071823991-b1ae657b01c1?w=400&q=80" alt="Team" width={400} height={600} className="object-cover h-full opacity-60 grayscale hover:grayscale-0 transition-all duration-700" />
             </div>
             <div className="bg-white/5 border border-white/10 rounded-3xl h-full mb-12 overflow-hidden hover:border-secondary/50 transition-colors">
                <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80" alt="Space" width={400} height={600} className="object-cover h-full opacity-60 grayscale hover:grayscale-0 transition-all duration-700" />
             </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white/5 border-y border-white/5 py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-secondary font-bold tracking-widest uppercase text-sm mb-8 block">Our Mission</h3>
          <p className="text-3xl md:text-5xl font-black text-white leading-tight mb-12">
            "To empower creators with the most flexible, performant, and beautiful headless content solutions on the planet."
          </p>
          <button className="px-10 py-5 bg-white text-background font-black rounded-2xl hover:bg-white/90 transition-all active:scale-95 shadow-2xl shadow-white/10">
            Join the Revolution
          </button>
        </div>
      </section>
    </div>
  );
}
