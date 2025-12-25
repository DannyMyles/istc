// components/Navigation.tsx
'use client';

import { useState, useTransition, useOptimistic, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown, Shield, GraduationCap, Search, Mail, Clock } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image'


const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const [optimisticQuery, setOptimisticQuery] = useOptimistic(searchQuery);

  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { 
        name: 'Courses', 
        href: '/courses',
        submenu: [
          { name: 'Occupational Safety', href: '/courses/occupational-safety' },
          { name: 'Health & First Aid', href: '/courses/health-first-aid' },
          { name: 'Environmental Protection', href: '/courses/environmental-protection' },
          { name: 'Fire Safety', href: '/courses/fire-safety' },
          { name: 'Construction Safety', href: '/courses/construction-safety' },
        ]
      },
      { 
        name: 'Services', 
        href: '/services',
        submenu: [
          { name: 'Consultancy', href: '/services/consultancy' },
          { name: 'Training Programs', href: '/services/training' },
          { name: 'Safety Audits', href: '/services/audits' },
          { name: 'Certification', href: '/services/certification' },
        ]
      },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!optimisticQuery.trim()) return;

    startTransition(() => {
      setOptimisticQuery(optimisticQuery);
      router.push(`/search?q=${encodeURIComponent(optimisticQuery)}`);
    });
  };

  return (
    <>
      {/* Top Contact Bar with adventure styling */}
      <div className="bg-gradient-adventure text-white bg-[#008DB8]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center py-3 text-sm">
            <div className="flex flex-wrap items-center gap-4 mb-2 md:mb-0">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-accent-light" />
                <a 
                  href={`tel:+254700364722`}
                  className="font-semibold hover:text-accent-light transition-colors hover:underline underline-offset-2"
                >
                  +254700364722
                </a>
              </div>
              <div className="hidden md:block h-4 w-px bg-white/30"></div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-accent-light" />
                <a 
                  href="mailto:hsetraining@istc.co.ke"
                  className="hover:text-accent-light transition-colors hover:underline underline-offset-2"
                >
                  hsetraining@istc.co.ke
                </a>
              </div>
              <div className="hidden md:block h-4 w-px bg-white/30"></div>
              <div className="flex items-center gap-2 text-accent-light font-medium animate-pulse-glow">
                <Clock size={14} />
                24/7 Emergency Support Available
              </div>
            </div>
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <input
                  type="text"
                  value={optimisticQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-1.5 rounded-lg text-accent-900 text-sm w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:shadow-glow-accent"
                  disabled={isPending}
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-500" />
                {isPending && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
                  </div>
                )}
              </form>
              <Link 
                href="/consultation" 
                className="btn-adventure flex items-center gap-2"
              >
                <Clock size={16} />
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation with enhanced features */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-adventure-lg glass-adventure border-b border-accent-100 ' 
            : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo with enhanced branding */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-12 h-12 bg-accent-800 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-adventure">
                <Image
                  src="/istclogo.png" 
                  alt="Source of Adventure Logo" 
                  width={88}
                  height={88}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-accent-800 tracking-tight">
                  ISTC
                </span>
                <span className="text-xs text-gray-600 -mt-1 max-w-[180px] leading-tight">
                  International Safety Training Centre
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with enhanced interactions */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.main.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <div className="group">
                      <button className="flex items-center gap-1 px-4 py-3 text-gray-700 hover:text-accent-800 font-medium transition-colors relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-gradient-to-r after:from-accent after:to-accent-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:rounded-full">
                        {item.name}
                        <ChevronDown size={16} className="group-hover:rotate-180 transition-transform text-accent" />
                      </button>
                      <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-xl shadow-adventure-lg border border-accent-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top">
                        <div className="p-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-accent-50 hover:text-accent-800 rounded-lg transition-colors group/sub adventure-card"
                            >
                              <div className="w-2 h-2 rounded-full bg-accent group-hover/sub:scale-125 transition-transform animate-pulse-glow"></div>
                              <span className="font-medium">{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-3 font-medium transition-colors relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-gradient-to-r after:from-accent after:to-accent-600 after:transition-transform after:rounded-full ${
                        pathname === item.href
                          ? 'text-accent-800 after:scale-x-100'
                          : 'text-gray-700 hover:text-accent-800 after:scale-x-0 hover:after:scale-x-100'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/courses"
                className="btn-adventure flex items-center gap-2"
              >
                <GraduationCap size={18} />
                Browse Courses
              </Link>
            </div>

            {/* Enhanced Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-accent-50 hover:bg-accent-100 transition-colors relative group"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-accent-800" />
              ) : (
                <Menu size={24} className="text-accent-800 group-hover:scale-110 transition-transform" />
              )}
              {!isMenuOpen && pathname !== '/' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse-glow"></span>
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu with animations */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-accent-100 animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={optimisticQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses and resources..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-accent-200 focus:outline-none focus:ring-2 focus:ring-accent focus:shadow-glow-accent adventure-card"
                    disabled={isPending}
                  />
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-500" />
                  {isPending && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent"></div>
                    </div>
                  )}
                </div>
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-1">
                {navigation.main.map((item) => (
                  <div key={item.name} className="border-b border-accent-100 last:border-0">
                    {item.submenu ? (
                      <details className="group">
                        <summary className="flex items-center justify-between py-4 text-gray-700 font-semibold cursor-pointer list-none hover:text-accent-800 transition-colors">
                          {item.name}
                          <ChevronDown size={20} className="text-accent-400 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="pb-4">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-3 py-3 px-4 text-gray-600 hover:text-accent-800 hover:bg-accent-50 rounded-lg transition-colors adventure-card"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow"></div>
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center py-4 text-gray-700 font-semibold hover:text-accent-800 transition-colors ${
                          pathname === item.href ? 'text-accent-800' : ''
                        }`}
                      >
                        {item.name}
                        {pathname === item.href && (
                          <div className="ml-2 w-2 h-2 rounded-full bg-accent animate-pulse-glow"></div>
                        )}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="mt-8 space-y-3">
                <Link
                  href="/consultation"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center btn-adventure py-3.5"
                >
                  Schedule Free Consultation
                </Link>
                <Link
                  href="/enroll"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center btn-adventure-outline py-3.5"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navigation;