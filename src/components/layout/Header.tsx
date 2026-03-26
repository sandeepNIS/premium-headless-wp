"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header({ categories }: { categories: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            HeadlessCMS
          </Link>
          
          {/* Desktop Nav - Hidden below 990px */}
          <nav className="hidden [@media(min-width:991px)]:block">
            <ul className="flex gap-8 items-center font-medium">
              <li>
                <Link href="/" className="text-foreground/70 hover:text-primary transition-colors">Home</Link>
              </li>
              {categories.map((category: any) => (
                <li key={category.id}>
                  <Link 
                    href={`/category/${category.slug}`}
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/projects" className="text-foreground/70 hover:text-primary transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">About</Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors text-gradient font-black">Contact</Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Toggle - Visible below 990px */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="[@media(min-width:991px)]:hidden z-50 p-2 text-foreground/70 hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between overflow-hidden">
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'translate-x-full opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 z-[60] [@media(min-width:991px)]:hidden transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Sidebar Panel */}
        <aside 
          className={`absolute right-0 top-0 h-full w-[300px] bg-background border-l border-white/10 p-10 transform transition-transform duration-500 ease-out select-none ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col h-full">
            <div className="mb-12">
               <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                HeadlessCMS
               </Link>
            </div>
            <nav>
              <ul className="flex flex-col gap-6 text-xl font-bold">
                <li>
                  <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Home</Link>
                </li>
                {categories.map((category: any) => (
                  <li key={category.id}>
                    <Link 
                      href={`/category/${category.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/projects" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Projects</Link>
                </li>
                <li>
                  <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">About</Link>
                </li>
                <li>
                  <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Contact</Link>
                </li>
              </ul>
            </nav>
            <div className="mt-auto pt-10 border-t border-white/10 text-muted text-sm">
              <p>Explore premium content and architecture.</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
