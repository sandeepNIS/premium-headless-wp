import { getProjectBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const featuredImage = project._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <article className="pb-32">
       {/* Hero Section */}
      <header className="relative w-full h-[60vh] flex items-end pb-20 overflow-hidden">
        {featuredImage && (
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center brightness-50"
            style={{ backgroundImage: `url(${featuredImage})` }}
          />
        )}
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
              Case Study
            </span>
            <div className="h-px w-12 bg-white/20" />
            <div className="flex gap-4">
               {project._embedded?.['wp:term']?.[0]?.map((term: any) => (
                 <span key={term.id} className="text-white/60 text-xs font-bold uppercase tracking-widest">
                   {term.name}
                 </span>
               ))}
            </div>
          </div>
          <h1 
            className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[1]" 
            dangerouslySetInnerHTML={{ __html: project.title.rendered }} 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[1]" />
      </header>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-8">
           <div 
              className="wp-content post-content text-xl text-foreground/80 leading-relaxed mb-16"
              dangerouslySetInnerHTML={{ __html: project.content.rendered }}
            />

            {/* ACF Fields Check */}
            {project.acf && Object.keys(project.acf).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white/5 border border-white/10 rounded-[40px]">
                {Object.entries(project.acf).map(([key, value]) => {
                  if (!value || typeof value === 'object') return null;
                  const label = key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
                  return (
                    <div key={key}>
                      <p className="text-secondary text-[10px] uppercase font-black tracking-widest mb-1">{label}</p>
                      <p className="text-white font-bold text-lg">{String(value)}</p>
                    </div>
                  );
                })}
              </div>
            )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-10">
          <div className="p-8 bg-gradient-to-br from-primary/10 to-transparent border border-white/5 rounded-[40px]">
            <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Key Details</h4>
            <div className="space-y-6">
              <div>
                <p className="text-muted text-[10px] uppercase font-bold tracking-widest mb-1">Date Published</p>
                <p className="text-white font-medium">{new Date(project.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted text-[10px] uppercase font-bold tracking-widest mb-1">Author</p>
                <p className="text-white font-medium">{project._embedded?.author?.[0]?.name || 'Modern Team'}</p>
              </div>
            </div>
            <Link href="/projects" className="inline-block mt-10 text-primary font-black text-sm hover:underline">
              ← Back to all projects
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
