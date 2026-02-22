// components/Navigation.tsx
'use client';

import { useState, useTransition, useOptimistic, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Phone, ChevronDown, Shield, GraduationCap, 
  Search, Mail, Clock, ChevronRight, User, LogOut, KeyRound 
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

type NavItem = {
  name: string;
  href: string;
  submenu?: SubMenuItem[];
};

type SubMenuItem = {
  name: string;
  href?: string;
  subitems?: NestedMenuItem[];
};

type NestedMenuItem = {
  name: string;
  href: string;
};

// Type guard function
const hasSubitems = (item: SubMenuItem): item is SubMenuItem & { subitems: NestedMenuItem[] } => {
  return 'subitems' in item && Array.isArray((item as any).subitems);
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  
  // NextAuth session
  const { data: session, status } = useSession();
  const isAdminRoute = pathname?.startsWith('/admin');

  const [optimisticQuery, setOptimisticQuery] = useOptimistic(searchQuery);

  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { 
        name: 'Courses', 
        href: '/courses',
        submenu: [
          { 
            name: 'Occupational Safety & Health', 
            subitems: [
              { name: 'Diploma Programme', href: '/courses/occupational-safety-health-diploma' },
              { name: 'Certificate Programme', href: '/courses/occupational-safety-health-certificate' },
            ]
          },
          { 
            name: 'Fire Safety', 
            subitems: [
              { name: 'IFE Level 2 Diploma', href: '/courses/fire-safety-course-diploma' },
              { name: 'Certificate Courses', href: '/courses/fire-safety-course-certificate' },
            ]
          },
          { 
            name: 'First Aid Training', 
            subitems: [
              { name: 'Occupational First Aid (3 Days)', href: '/courses/first-aid/occupational' },
              { name: 'Basic First Aid (1 Day)', href: '/courses/first-aid/basic' },
              { name: 'Paediatric First Aid', href: '/courses/first-aid/paediatric' },
              { name: 'First Aid Refresher', href: '/courses/first-aid/refresher' },
            ]
          },
          { name: 'Work at Height', href: '/courses/work-at-height' },
          { name: 'Chemical Safety', href: '/courses/chemical-safety' },
          { name: 'Disaster & Emergency Preparedness', href: '/courses/disaster-emergency-preparedness' },
          { name: 'Road Safety', href: '/courses/road-safety' },
          { name: 'Construction Safety', href: '/courses/construction-safety' },
          { name: 'Training Calendar', href: '/calendar' },
          { name: 'All Courses', href: '/courses' },
        ]
      }, 
      { 
        name: 'Services', 
        href: '/services',
        icon: Shield,
        submenu: [
          { 
            name: 'Safety Audits & Assessments', 
            icon: Shield,
            subitems: [
              { name: 'Occupational Safety & Health Audit', href: '/services/occupational-safety-health-audit' },
              { name: 'Fire Safety Audit', href: '/services/fire-safety-audit' },
              { name: 'Risk Assessment', href: '/services/risk-assessment' },
              { name: 'Ergonomics Audit', href: '/services/ergonomics-audit' },
            ]
          },
          { 
            name: 'Environmental Services', 
            subitems: [
              { name: 'Environmental Audit', href: '/services/environmental-audit' },
              { name: 'Environmental Impact Assessment', href: '/services/environmental-impact-assessment' },
              { name: 'Noise Measurement', href: '/services/noise-measurement' },
              { name: 'Indoor Air Quality (IAQ)', href: '/services/indoor-air-quality-iaq' },
            ]
          },
          { 
            name: 'Consultancy Services', 
            subitems: [
              { name: 'Safety Compliance Consulting', href: '/services/consultancy' },
              { name: 'Training Program Development', href: '/services/training' },
              { name: 'Certification Support', href: '/services/certification' },
              { name: 'Customized Safety Solutions', href: '/services/custom-solutions' },
            ]
          },
          { name: 'All Services', href: '/services' },
        ]
      },
      // { name: 'Testimonials', href: '/testimonials' },
      { name: 'Contact', href: '/contact'},
      // { name: 'Blog', href: '/blog' },
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Don't show main navigation on admin pages
  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      {/* Top Contact Bar with adventure styling */}
      <div className="bg-gradient-adventure text-white bg-[#008DB8]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center py-3 text-sm">
            {/* Contact info - hidden on mobile, visible on md+ */}
            <div className="hidden md:flex flex-wrap items-center gap-4 mb-2 md:mb-0">
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
              <div className="hidden md:flex items-center gap-3">
                <a href="https://www.tiktok.com/@istc_ke?_r=1&_t=ZS-93FzoErNgZ7" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light transition-colors">
                  <FaTiktok size={16} />
                </a>
                <a href="https://www.facebook.com/share/1826jx1pxG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light transition-colors">
                  <FaFacebook size={16} />
                </a>
                <a href="https://www.instagram.com/istc._.kenya?igsh=MTV4aDZ0ZGtvYzl2MA==" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light transition-colors">
                  <FaInstagram size={16} />
                </a>
                <a href="https://x.com/hsetraining?s=11&t=i93mQhgATaeMgK7d-PmFGw" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Mobile: Stack authentication at end, Desktop: Keep as before */}
            <div className="w-full md:w-auto flex justify-between md:justify-normal items-center gap-4">
              {/* Authentication status in top bar */}
              <div className="flex items-center gap-2 ml-auto md:ml-0">
                {status === "loading" ? (
                  <div className="h-8 w-20 bg-white/20 rounded animate-pulse"></div>
                ) : session ? (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/admin"
                      className="flex items-center gap-1 text-sm bg-white/20 hover:bg-white/30 px-3 py-3 rounded-3xl transition-colors"
                    >
                      <User size={14} />
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center gap-1 text-sm hover:bg-white/20 px-3 py-3 rounded-3xl transition-colors"
                    >
                      <LogOut size={14} />
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-sm bg-white/20 hover:bg-white/30 px-3 py-3 rounded-3xl transition-colors"
                  >
                    <KeyRound size={14} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation with enhanced features */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-adventure-lg glass-adventure border-b border-accent-100' 
            : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo with reduced text size */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-accent-800 rounded-xl md:rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-adventure border-2 border-transparent group-hover:border-accent-light/30">
                <Image
                  src="/header_logo.png" 
                  alt="ISTC Logo" 
                  width={140}
                  height={140} 
                  className="object-contain w-12 h-12 md:w-16 md:h-16"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-md md:text-sm font-semibold text-gray-700 leading-tight">
                  ISTC
                </span>
                  <span className="text-sm text-accent-600 font-medium italic">
                  Secure your future
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - centered with flex-1 */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-4">
              <div className="flex items-center gap-1">
                {navigation.main.map((item) => {
                  // Check if item should be hidden on desktop
                  const shouldHide = ['Testimonials', 'Blog'].includes(item.name);
                  
                  return (
                    <div 
                      key={item.name} 
                      className={`relative ${shouldHide ? 'hidden-on-desktop' : ''}`}
                    >
                      {item.submenu ? (
                        <div className="group">
                          <button className={`flex items-center gap-1 px-4 py-3 font-medium transition-colors relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-[#039AC5] after:rounded-full after:transition-transform ${
                            isActiveLink(item.href)
                              ? 'text-[#039AC5] after:scale-x-100'
                              : 'text-gray-700 hover:text-[#039AC5] after:scale-x-0 hover:after:scale-x-100'
                          }`}>
                            {item.name}
                            <ChevronDown size={16} className={`group-hover:rotate-180 transition-transform ${
                              isActiveLink(item.href) ? 'text-[#039AC5]' : 'text-gray-500'
                            }`} />
                          </button>
                          <div className="absolute left-0 top-full mt-1 w-72 bg-white rounded-xl shadow-adventure-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top z-50">
                            <div className="p-2">
                              {item.submenu.map((subItem) => (
                                hasSubitems(subItem) ? (
                                  // Nested submenu for items with subitems
                                  <div key={subItem.name} className="relative group/sub">
                                    <div className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-[#039AC5]/5 hover:text-[#039AC5] rounded-lg transition-colors cursor-pointer">
                                      <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${
                                          isActiveLink(item.href) ? 'bg-[#039AC5]' : 'bg-gray-300'
                                        } group-hover/sub:scale-125 transition-transform`}></div>
                                        <span className="font-medium">{subItem.name}</span>
                                      </div>
                                      <ChevronRight size={16} className="text-[#039AC5]" />
                                    </div>
                                    {/* Second level submenu */}
                                    <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-xl shadow-adventure-lg border border-gray-200 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 origin-left">
                                      <div className="p-2">
                                        {subItem.subitems.map((nestedItem) => (
                                          <Link
                                            key={nestedItem.name}
                                            href={nestedItem.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group/nested ${
                                              isActiveLink(nestedItem.href)
                                                ? 'bg-[#039AC5]/5 text-[#039AC5]'
                                                : 'text-gray-700 hover:bg-[#039AC5]/5 hover:text-[#039AC5]'
                                            }`}
                                          >
                                            <div className={`w-1.5 h-1.5 rounded-full ${
                                              isActiveLink(nestedItem.href) ? 'bg-[#039AC5]' : 'bg-gray-400'
                                            } group-hover/nested:scale-125 transition-transform`}></div>
                                            <span className="font-medium">{nestedItem.name}</span>
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  // Regular submenu item
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href!}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group/sub ${
                                      isActiveLink(subItem.href!)
                                        ? 'bg-[#039AC5]/5 text-[#039AC5]'
                                        : 'text-gray-700 hover:bg-[#039AC5]/5 hover:text-[#039AC5]'
                                    }`}
                                  >
                                    <div className={`w-2 h-2 rounded-full ${
                                      isActiveLink(subItem.href!) ? 'bg-[#039AC5] animate-pulse' : 'bg-gray-300'
                                    } group-hover/sub:scale-125 transition-transform`}></div>
                                    <span className="font-medium">{subItem.name}</span>
                                  </Link>
                                )
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`px-4 py-3 font-medium transition-colors relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-[#039AC5] after:rounded-full after:transition-transform ${
                            isActiveLink(item.href)
                              ? 'text-[#039AC5] after:scale-x-100'
                              : 'text-gray-700 hover:text-[#039AC5] after:scale-x-0 hover:after:scale-x-100'
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* CTA Buttons - original styling preserved */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              {session && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-3 py-3 bg-gradient-to-r from-[#039AC5] to-[#008DB8] text-white rounded-3xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <User size={18} />
                </Link>
              )}
              <Link
                href="/courses"
                className="btn-adventure flex items-center gap-2"
              >
                <GraduationCap size={18} />
                Browse Courses
              </Link>
            </div>

            {/* Mobile menu button - original styling */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-[#039AC5]/10 hover:bg-[#039AC5]/20 transition-colors relative group"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-[#039AC5]" />
              ) : (
                <Menu size={24} className="text-[#039AC5] group-hover:scale-110 transition-transform" />
              )}
              {!isMenuOpen && pathname !== '/' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#039AC5] rounded-full animate-pulse"></span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - original styling preserved */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-4 py-6">
              {/* Logo and Company Name - Visible on Mobile */}
              <div className="flex items-center gap-1 mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 bg-accent-800 rounded-lg">
                  <Image
                    src="/header_logo.png" 
                    alt="ISTC Logo" 
                    width={140}
                    height={140} 
                    className="object-contain w-10 h-10"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-sm font-semibold text-gray-700 leading-tight">
                    International Safety Training Centre
                  </span>
<span className="text-xs text-accent-600 font-medium font-serif italic" style={{ fontFamily: 'Holiday, cursive' }}>
                    Secure your future
                  </span>
                </div>
              </div>

              {/* Authentication section in mobile menu */}
              {status === "loading" ? (
                <div className="mb-4 p-3 bg-gray-100 rounded-lg animate-pulse">
                  <div className="h-6 bg-gray-300 rounded"></div>
                </div>
              ) : session ? (
                <div className="mb-4 p-3 bg-[#039AC5]/5 rounded-lg border border-[#039AC5]/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User size={18} className="text-[#039AC5]" />
                      <span className="font-medium text-[#039AC5]">
                        Welcome, {session.user?.name?.split(' ')[0] || 'Admin'}
                      </span>
                    </div>
                    <span className="text-xs bg-[#039AC5] text-white px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex-1 text-center bg-[#039AC5] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#0284B4] transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="flex-1 text-center border border-[#039AC5] text-[#039AC5] py-2 rounded-lg text-sm font-medium hover:bg-[#039AC5]/5 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="mb-4 flex items-center justify-center gap-2 w-full bg-[#039AC5]/10 text-[#039AC5] hover:bg-[#039AC5]/20 py-3 rounded-lg font-medium transition-colors"
                >
                  <KeyRound size={18} />
                  Admin Login
                </Link>
              )}

              {/* Mobile Navigation */}
              <div className="space-y-1 max-h-[70vh] overflow-y-auto">
                {navigation.main.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 last:border-0">
                    {item.submenu ? (
                      <details className="group">
                        <summary className={`flex items-center justify-between py-4 font-semibold cursor-pointer list-none transition-colors ${
                          isActiveLink(item.href)
                            ? 'text-[#039AC5]'
                            : 'text-gray-700 hover:text-[#039AC5]'
                        }`}>
                          {item.name}
                          <ChevronDown size={20} className={`group-open:rotate-180 transition-transform ${
                            isActiveLink(item.href) ? 'text-[#039AC5]' : 'text-gray-500'
                          }`} />
                        </summary>
                        <div className="pb-4">
                          {item.submenu.map((subItem) => (
                            hasSubitems(subItem) ? (
                              <details key={subItem.name} className="group/sub ml-4">
                                <summary className="flex items-center justify-between py-3 px-4 cursor-pointer list-none">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                      isActiveLink(item.href) ? 'bg-[#039AC5]' : 'bg-gray-400'
                                    }`}></div>
                                    <span className={`${
                                      isActiveLink(item.href)
                                        ? 'text-[#039AC5]'
                                        : 'text-gray-600 hover:text-[#039AC5]'
                                    }`}>{subItem.name}</span>
                                  </div>
                                  <ChevronRight size={16} className="text-[#039AC5] group-open/sub:rotate-90 transition-transform" />
                                </summary>
                                <div className="ml-4">
                                  {subItem.subitems.map((nestedItem) => (
                                    <Link
                                      key={nestedItem.name}
                                      href={nestedItem.href}
                                      onClick={() => setIsMenuOpen(false)}
                                      className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
                                        isActiveLink(nestedItem.href)
                                          ? 'bg-[#039AC5]/5 text-[#039AC5]'
                                          : 'text-gray-600 hover:bg-[#039AC5]/5 hover:text-[#039AC5]'
                                      }`}
                                    >
                                      <div className={`w-1 h-1 rounded-full ${
                                        isActiveLink(nestedItem.href) ? 'bg-[#039AC5]' : 'bg-gray-400'
                                      }`}></div>
                                      {nestedItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </details>
                            ) : (
                              <Link
                                key={subItem.name}
                                href={subItem.href!}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
                                  isActiveLink(subItem.href!)
                                    ? 'bg-[#039AC5]/5 text-[#039AC5]'
                                    : 'text-gray-600 hover:bg-[#039AC5]/5 hover:text-[#039AC5]'
                                }`}
                              >
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                  isActiveLink(subItem.href!) ? 'bg-[#039AC5] animate-pulse' : 'bg-gray-400'
                                }`}></div>
                                {subItem.name}
                              </Link>
                            )
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between py-4 font-semibold transition-colors ${
                          isActiveLink(item.href)
                            ? 'text-[#039AC5]'
                            : 'text-gray-700 hover:text-[#039AC5]'
                        }`}
                      >
                        {item.name}
                        {isActiveLink(item.href) && (
                          <div className="w-2 h-2 rounded-full bg-[#039AC5] animate-pulse"></div>
                        )}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile CTA Buttons - original styling */}
              <div className="mt-8 space-y-3">
                <Link
                  href="/consultation"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-[#039AC5] text-white hover:bg-[#0284B4] transition-colors py-3.5 rounded-lg font-semibold"
                >
                  Schedule Free Consultation
                </Link>
                <Link
                  href="/courses"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center border-2 border-[#039AC5] text-[#039AC5] hover:bg-[#039AC5] hover:text-white transition-colors py-3.5 rounded-lg font-semibold"
                >
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Add custom CSS for media queries */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          .hidden-on-desktop {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;

