import { getPosts, getCategories } from '@/lib/api';
import PostCard from '@/components/blog/PostCard';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isAll = slug === 'all';
  const categories = await getCategories();
  const category = isAll ? { name: 'All Postings', slug: 'all' } : categories.find((c: any) => c.slug === slug);

  if (!category && !isAll) {
    notFound();
  }

  const posts = await getPosts(isAll ? undefined : slug);

  return (
    <div className="pb-24 flex-grow">
      {/* Search/Category Header - Unique to Category */}
      <header className="bg-white/5 border-y border-white/5 py-24 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">
                Category Archive
              </span>
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                {category.name}
              </h1>
              <p className="text-muted text-lg leading-relaxed">
                Exploring perspectives in {category.name}. Found {posts.length} entries matching this topic.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-12 h-1 bg-secondary rounded-full" />
              <div className="w-6 h-1 bg-white/10 rounded-full" />
              <div className="w-6 h-1 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[40px]">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-3xl mb-6">
              📭
            </div>
            <p className="text-xl text-muted font-medium">This category is awaiting content.</p>
          </div>
        )}
      </div>
    </div>
  );
}
