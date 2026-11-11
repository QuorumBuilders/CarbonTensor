"use client";

import { useState } from "react";
import Link from "next/link";
import { AppSidebar } from "./AppSidebar";
import { DemoController } from "./DemoController";
import { Menu, X, Activity } from "lucide-react";

interface PortalShellProps {
  children: React.ReactNode;
  roleBadge?: string;
  cooperativeName?: string;
  hideDemoController?: boolean;
}

export function PortalShell({
  children,
  roleBadge,
  cooperativeName = "Kebbi Green Rice Growers Union",
  hideDemoController = false,
}: PortalShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-purple-50/50 flex flex-col font-sans">
      {/* Mobile Top Navigation Bar (< md) */}
      <header className="md:hidden sticky top-0 z-30 h-14 bg-[#0B4D25] text-white border-b border-primary-green-800 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary-green-600 flex items-center justify-center text-white">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white">
            CarbonTensor
          </span>
        </Link>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-1.5 rounded-lg text-primary-green-200 hover:text-white hover:bg-primary-green-800 transition-colors"
          aria-label={isMobileOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer Content */}
      <div
        className={`md:hidden fixed top-0 bottom-0 left-0 z-50 w-72 transition-transform duration-200 transform ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AppSidebar
          isCollapsed={false}
          onToggleCollapse={() => setIsMobileOpen(false)}
          roleBadge={roleBadge}
          cooperativeName={cooperativeName}
        />
      </div>

      {/* Desktop Fixed Sidebar */}
      <div className="hidden md:block">
        <AppSidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          roleBadge={roleBadge}
          cooperativeName={cooperativeName}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ${
          isCollapsed ? "md:pl-20" : "md:pl-64"
        }`}
      >
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
          {children}
        </main>
      </div>

      {/* Global Interactive Demo Controller */}
      {!hideDemoController && <DemoController />}
    </div>
  );
}

