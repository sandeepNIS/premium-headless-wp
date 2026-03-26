import { getPosts } from '@/lib/api';
import PostCard from '@/components/blog/PostCard';
import Link from 'next/link';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section - Unique to Home */}
      <section className="relative overflow-hidden pt-20 pb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
            Infinite Content. <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
              Next Gen Headless.
            </span>
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
            A premium frontend architecture for your WordPress backend. 
            Experience speed, security, and a stunning interface built with Next.js & Tailwind.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
              Explore Content
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all hover:border-white/20">
              Technical Docs
            </button>
          </div>
        </div>
      </section>

      {/* Content Grid - Unique Layout */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-8">
          <div>
            <h2 className="text-4xl font-black mb-4 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full" />
              Latest Insights
            </h2>
            <p className="text-muted text-lg">Curated stories from our WordPress ecosystem.</p>
          </div>
          <Link href="/category/all" className="hidden sm:block text-primary font-bold hover:underline underline-offset-8">
            Browse Archive →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
