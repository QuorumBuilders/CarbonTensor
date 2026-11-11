"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  LayoutDashboard,
  ShieldCheck,
  Coins,
  Building2,
  Building,
  ChevronDown,
} from "lucide-react";

interface AppHeaderProps {
  cooperativeName?: string;
  roleBadge?: string;
}

export function AppHeader({
  cooperativeName = "Kebbi Green Rice Growers Union",
  roleBadge = "Cooperative Admin",
}: AppHeaderProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard" || pathname.startsWith("/dashboard/"),
    },
    {
      label: "MRV Verifier",
      href: "/verifier",
      icon: ShieldCheck,
      active: pathname === "/verifier" || pathname.startsWith("/verifier/"),
    },
    {
      label: "Finance & Payouts",
      href: "/finance",
      icon: Coins,
      active: pathname === "/finance" || pathname.startsWith("/finance/"),
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-neutral-purple-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Identity & Portal Pill */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 group focus:outline-hidden"
              aria-label="CarbonTensor Cooperative Portal"
            >
              <div className="w-8 h-8 rounded bg-primary-green-700 flex items-center justify-center text-white shadow-xs group-hover:bg-primary-green-800 transition-colors duration-150">
                <Activity className="w-4 h-4 text-primary-green-100" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-primary-green-900">
                CarbonTensor
              </span>
            </Link>

            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider uppercase bg-primary-green-50 text-primary-green-800 border border-primary-green-200">
              Cooperative Portal
            </span>
          </div>

          {/* Center Navigation Tabs */}
          <nav
            className="hidden md:flex items-center gap-1 h-16"
            aria-label="Cooperative Portal Navigation"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-md transition-colors duration-150 relative ${
                    item.active
                      ? "text-primary-green-800 font-semibold bg-primary-green-50/70"
                      : "text-neutral-purple-700 hover:text-primary-green-900 hover:bg-neutral-purple-50"
                  }`}
                  aria-current={item.active ? "page" : undefined}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      item.active ? "text-primary-green-700" : "text-neutral-purple-500"
                    }`}
                  />
                  <span>{item.label}</span>
                  {item.active && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary-green-700 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Sandbox Badge & Active Cooperative User Chip */}
          <div className="flex items-center gap-3">
            {/* Sandbox Status Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-orange-50 text-accent-orange-700 border border-accent-orange-200">
              <Building className="w-3.5 h-3.5 text-accent-orange-600" />
              <span>Access Bank Sandbox (Simulated)</span>
            </div>

            {/* Active User Chip */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-neutral-purple-200">
              <div className="w-8 h-8 rounded-full bg-primary-green-100 border border-primary-green-300 text-primary-green-900 font-bold text-xs flex items-center justify-center">
                KG
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-neutral-purple-900 max-w-[180px] truncate">
                    {cooperativeName}
                  </span>
                  <ChevronDown className="w-3 h-3 text-neutral-purple-500" />
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="w-2.5 h-2.5 text-primary-green-700" />
                  <span className="text-[10px] font-medium text-primary-green-700 uppercase tracking-wider">
                    {roleBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Subnavigation Tabs */}
        <div className="md:hidden flex items-center justify-around border-t border-neutral-purple-100 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded ${
                  item.active
                    ? "text-primary-green-800 font-bold bg-primary-green-50"
                    : "text-neutral-purple-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

