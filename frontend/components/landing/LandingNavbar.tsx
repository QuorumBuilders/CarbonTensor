"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IconLeaf, IconArrowRight, IconMenu2, IconX } from "@tabler/icons-react";

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "AWD Agronomy", href: "#awd-explainer" },
    { label: "Architecture", href: "#how-it-works" },
    { label: "70/15/15 Split", href: "#payout-split" },
    { label: "Governance & FAQ", href: "#governance" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-fast ${
        isScrolled
          ? "bg-card border-b border-border shadow-xs"
          : "bg-background/80 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-control"
            >
              <div className="w-8 h-8 rounded-control bg-brand flex items-center justify-center text-brand-foreground transition-colors group-hover:bg-brand-hover">
                <IconLeaf size={18} stroke={1.5} />
              </div>
              <span className="font-medium text-base sm:text-lg tracking-tight text-foreground">
                CarbonTensor
              </span>
            </Link>

            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-pill text-[10px] font-mono font-medium tracking-wider uppercase bg-brand-muted text-brand border border-border">
              AWD MRV Layer
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 text-xs font-medium text-muted-foreground"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-foreground transition-colors duration-fast py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="h-9 px-3.5 rounded-control text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-fast flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              className="group h-9 px-4 rounded-control text-xs font-medium text-brand-foreground bg-brand hover:bg-brand-hover active:bg-brand transition-colors duration-fast flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <span>Open Portal</span>
              <IconArrowRight
                size={14}
                stroke={1.5}
                className="group-hover:translate-x-0.5 transition-transform duration-fast"
              />
            </Link>
          </div>

          {/* Mobile Menu Trigger (< 768px) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-control text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <IconX size={20} stroke={1.5} />
              ) : (
                <IconMenu2 size={20} stroke={1.5} />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-fast">
          <nav className="flex flex-col space-y-1 pt-1 text-sm font-medium text-foreground">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-control hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-fast min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-10 rounded-control text-xs font-medium text-center flex items-center justify-center border border-border text-foreground hover:bg-muted transition-colors"
            >
              Sign In to Account
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-10 rounded-control text-xs font-medium text-center flex items-center justify-center gap-1.5 bg-brand text-brand-foreground hover:bg-brand-hover transition-colors"
            >
              <span>Open Portal</span>
              <IconArrowRight size={14} stroke={1.5} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
