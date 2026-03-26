export default function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-white/10 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-muted mb-6 text-sm">
          &copy; {new Date().getFullYear()} HeadlessCMS. Built with Next.js, Tailwind & WordPress.
        </p>
        <div className="flex justify-center gap-8">
          <a href="#" className="text-muted hover:text-foreground transition-colors text-sm font-medium">Twitter</a>
          <a href="#" className="text-muted hover:text-foreground transition-colors text-sm font-medium">GitHub</a>
          <a href="#" className="text-muted hover:text-foreground transition-colors text-sm font-medium">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
