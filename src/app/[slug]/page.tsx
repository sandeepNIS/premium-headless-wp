import { getPageBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Common slugs that should be ignored by the catch-all
  if (['posts', 'category', '_next', 'api'].includes(slug)) {
    return null;
  }

  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-32">
      <header className="mb-20">
        <div className="w-16 h-1.5 bg-secondary mb-8 rounded-full" />
        <h1 
          className="text-4xl md:text-6xl font-black leading-tight tracking-tight" 
          dangerouslySetInnerHTML={{ __html: page.title.rendered }} 
        />
      </header>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-xl">
        <div 
          className="wp-content text-lg text-foreground/80 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      </div>
    </article>
  );
}
