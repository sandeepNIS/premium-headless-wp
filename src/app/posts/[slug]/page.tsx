import { getPostBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <article className="pb-24">
      {/* Hero Post Header - Unique Header */}
      <header className="relative w-full h-[60vh] flex items-end pb-20 overflow-hidden">
        {featuredImage && (
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center brightness-50"
            style={{ backgroundImage: `url(${featuredImage})` }}
          />
        )}
        <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
              Post Content
            </span>
            <div className="h-px w-12 bg-white/20" />
            <time className="text-white/60 text-xs font-medium">
              {new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
            </time>
          </div>
          <h1 
            className="text-4xl md:text-6xl font-black text-white leading-[1.1]" 
            dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[1]" />
      </header>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-white/5">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
              {post._embedded?.author?.[0]?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-white font-bold leading-none mb-1">
                {post._embedded?.author?.[0]?.name || 'Staff Writer'}
              </p>
              <p className="text-muted text-xs">WordPress Contributor</p>
            </div>
          </div>
          
          <div 
            className="wp-content post-content text-lg md:text-xl text-foreground/90 leading-relaxed mb-20"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* ACF Extended Data - Only shows if ACF is populated */}
          {post.acf && Object.keys(post.acf).length > 0 && (
            <div className="border-t border-white/10 pt-16">
              <h3 className="text-2xl font-black text-white mb-8 tracking-tighter">
                Project <span className="text-primary italic">Specifications</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(post.acf).map(([key, value]) => {
                  if (!value || typeof value === 'object') return null;
                  
                  // Simple formatting for the label (e.g. project_highlights -> Project Highlights)
                  const label = key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
                  
                  return (
                    <div key={key} className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.07] transition-all hover:-translate-y-1">
                      <p className="text-secondary text-[10px] uppercase font-black tracking-widest mb-2">
                        {label}
                      </p>
                      <p className="text-white font-medium text-lg">
                        {String(value)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
