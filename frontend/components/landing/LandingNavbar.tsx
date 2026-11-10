"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, Activity } from "lucide-react";

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Learn", href: "#learn" },
    { label: "White paper", href: "#white-paper" },
    { label: "About", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Identity with small pill badge AWD MRV Layer */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded bg-primary-green-700 flex items-center justify-center text-white shadow-xs">
                <Activity className="w-4 h-4 text-primary-green-100" />
              </div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-primary-green-900 group-hover:text-primary-green-700 transition-colors duration-150">
                AgriTensor
              </span>
            </Link>

            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-primary-green-50 text-primary-green-800 border border-primary-green-200">
              AWD MRV Layer
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-purple-900">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-primary-green-700 border-b border-transparent hover:border-primary-green-300 transition-all duration-150 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA: Single Bold Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded text-sm font-bold text-white bg-accent-orange-500 hover:bg-accent-orange-600 active:bg-accent-orange-700 transition-all duration-150 shadow-xs hover:shadow-sm"
            >
              <span>Register</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Trigger (< 768px) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-neutral-purple-800 hover:text-primary-green-900 hover:bg-neutral-purple-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-green-600"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Accessible Drawer / Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-purple-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          <nav className="flex flex-col space-y-3 pt-2 text-base font-semibold text-neutral-purple-900">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-2 rounded-md hover:bg-neutral-purple-50 hover:text-primary-green-700 transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-neutral-purple-200 flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded text-sm font-bold text-white bg-accent-orange-500 hover:bg-accent-orange-600 active:bg-accent-orange-700 transition-all duration-150 shadow-sm"
            >
              <span>Register</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
