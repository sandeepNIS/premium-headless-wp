import Link from 'next/link';

export default function PostCard({ post }: { post: any }) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=100';
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';

  return (
    <article className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-primary/10">
      <div 
        className="w-full h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${featuredImage})` }}
      />
      <div className="p-6 flex flex-col h-full">
        <span className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-3">
          {category}
        </span>
        <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors">
          <Link href={`/posts/${post.slug}`}>
            {post.title.rendered}
          </Link>
        </h3>
        <div 
          className="text-muted text-sm line-clamp-3 mb-6 flex-grow leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <div className="mt-auto">
          <Link 
            href={`/posts/${post.slug}`} 
            className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all"
          >
            Read Briefing <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
