'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/exam', label: '시험안내' },
    { href: '/exam/scoring', label: '점수·등급' },
    { href: '/pricing', label: '응시료' },
    { href: '/enterprise', label: '기업' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-tapex-primary/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold text-tapex-accent">
            TAPEX
          </Link>

          {/* Desktop menu */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-tapex-muted transition-colors hover:text-tapex-text"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#register"
              className="rounded-full bg-tapex-accent px-5 py-2 text-sm font-semibold text-tapex-primary transition-all hover:brightness-110"
            >
              시험 접수
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-tapex-text"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-tapex-border pb-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-tapex-muted transition-colors hover:text-tapex-text"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Link
                href="#register"
                className="block rounded-full bg-tapex-accent py-2 text-center text-sm font-semibold text-tapex-primary"
                onClick={() => setMenuOpen(false)}
              >
                시험 접수
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
