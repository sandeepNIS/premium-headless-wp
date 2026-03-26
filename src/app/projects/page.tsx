import { getProjects } from '@/lib/api';
import Link from 'next/link';

export default async function ProjectsPage() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-4xl text-white font-black mb-4">No Projects Found</h1>
        <p className="text-muted">Start by adding some projects in your WordPress admin!</p>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <header className="py-24 bg-white/5 border-b border-white/5 mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-primary font-black tracking-widest uppercase text-xs mb-4 block">Portfolio</span>
          <h1 className="text-6xl font-black text-white tracking-tighter mb-8">
            Our Latest <span className="italic text-secondary underline decoration-primary decoration-4 underline-offset-8">Projects</span>.
          </h1>
          <p className="max-w-2xl text-muted text-lg">
            Explore our curated selection of high-performance builds and innovative designs powered by modern headless architecture.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project: any) => {
          const featuredImage = project._embedded?.['wp:featuredmedia']?.[0]?.source_url;
          return (
            <Link 
              key={project.id} 
              href={`/projects/${project.slug}`}
              className="group block bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:bg-white/[0.07] transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                {featuredImage ? (
                  <img 
                    src={featuredImage} 
                    alt={project.title.rendered}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center text-4xl">
                    📁
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-8">
                <div className="mb-4">
                   {project._embedded?.['wp:term']?.[0]?.map((term: any) => (
                     <span key={term.id} className="text-[10px] font-black uppercase tracking-widest text-primary mr-3">
                       {term.name}
                     </span>
                   ))}
                </div>
                <h3 
                  className="text-2xl font-black text-white leading-tight group-hover:text-primary transition-colors mb-4"
                  dangerouslySetInnerHTML={{ __html: project.title.rendered }}
                />
                <div className="flex items-center text-white/40 text-xs font-bold uppercase tracking-widest">
                  View Case Study <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
