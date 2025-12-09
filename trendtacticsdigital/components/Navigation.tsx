'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode logic
  useEffect(() => {
    // Check localStorage or system preference
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ttDarkMode') : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enabled = saved === '1' || (saved === null && prefersDark);
    setDarkMode(enabled);
    if (enabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('ttDarkMode', '1');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('ttDarkMode', '0');
      }
      return next;
    });
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Academy', href: '/academy' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-primary text-[#0A1E3F] px-4 py-2 rounded z-50">Skip to main content</a>
      <nav role="navigation" aria-label="Main navigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-[#00FFFF]/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-16 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#00FFFF] rounded-lg flex items-center justify-center">
              <span className="text-[#0A1E3F] font-bold text-xl">T</span>
            </div>
            <span className={`font-bold text-xl transition-colors ${
              isScrolled ? 'text-[#0A1E3F]' : 'text-white'
            }`}>
              Trendtactics
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors hover:text-[#00FFFF] ${
                  isScrolled ? 'text-[#0A1E3F]' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/quiz"
              className={`px-4 py-2 rounded-full border transition-colors ${
                isScrolled 
                  ? 'border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#0A1E3F]' 
                  : 'border-white text-white hover:bg-white hover:text-[#0A1E3F]'
              }`}
            >
              Take Quiz
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 bg-[#00FFFF] text-[#0A1E3F] font-semibold rounded-full hover:bg-[#40E0D0] transition-colors shadow-lg"
            >
              Get Started
            </Link>
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="ml-2 p-2 rounded-full border border-[#00FFFF] text-[#00FFFF] bg-transparent hover:bg-[#00FFFF] hover:text-[#0A1E3F] transition-colors"
            >
              {darkMode ? (
                <i className="fas fa-sun" aria-hidden="true" />
              ) : (
                <i className="fas fa-moon" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 transition-all duration-300 ${
              isScrolled ? 'bg-[#0A1E3F]' : 'bg-white'
            } ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 my-1 transition-all duration-300 ${
              isScrolled ? 'bg-[#0A1E3F]' : 'bg-white'
            } ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${
              isScrolled ? 'bg-[#0A1E3F]' : 'bg-white'
            } ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-4 border-t border-[#00FFFF]/20">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block font-medium text-[#0A1E3F] hover:text-[#00FFFF] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3 border-t border-[#00FFFF]/20">
              <Link
                href="/quiz"
                className="block px-4 py-2 rounded-full border border-[#00FFFF] text-[#00FFFF] text-center hover:bg-[#00FFFF] hover:text-[#0A1E3F] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Take Quiz
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 bg-[#00FFFF] text-[#0A1E3F] font-semibold rounded-full text-center hover:bg-[#40E0D0] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
} 