"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  LayoutDashboard,
  ShieldCheck,
  Coins,
  ChevronLeft,
  ChevronRight,
  Building2,
  User,
  Info,
  ArrowLeftRight,
  Check,
  ChevronUp,
} from "lucide-react";
import { DEMO_PERSONAS, getStoredSession, setStoredSession } from "@/lib/mock-data";
import type { PersonaRole, MockUserSession } from "@/types";

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  roleBadge?: string;
  cooperativeName?: string;
}

export function AppSidebar({
  isCollapsed,
  onToggleCollapse,
  roleBadge,
  cooperativeName = "Kebbi Green Rice Growers Union",
}: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [session, setSession] = useState<MockUserSession>(getStoredSession);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  // Sync session with storage and custom event triggers
  useEffect(() => {
    const handleSessionChange = (e: Event) => {
      const customEvent = e as CustomEvent<MockUserSession>;
      if (customEvent.detail) {
        setSession(customEvent.detail);
      } else {
        setSession(getStoredSession());
      }
    };

    window.addEventListener("carbontensor:session-change", handleSessionChange);
    window.addEventListener("storage", handleSessionChange);

    return () => {
      window.removeEventListener("carbontensor:session-change", handleSessionChange);
      window.removeEventListener("storage", handleSessionChange);
    };
  }, []);

  // Close switcher dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setIsSwitcherOpen(false);
      }
    };
    if (isSwitcherOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSwitcherOpen]);

  // Contextual persona details
  const displayName =
    session.role === "staff"
      ? "Bureau Veritas / VVB Lead"
      : session.role === "farmer"
      ? "Usman Bello (Argungu Cluster)"
      : cooperativeName || "Kebbi Green Rice Growers Union";

  const displayBadge =
    roleBadge ||
    (session.role === "staff"
      ? "Auditor (Staff)"
      : session.role === "farmer"
      ? "Smallholder Farmer"
      : "Cooperative Admin");

  const PersonaIcon =
    session.role === "staff"
      ? ShieldCheck
      : session.role === "farmer"
      ? User
      : Building2;

  const handleSwitchPersona = (roleKey: PersonaRole) => {
    const updated = setStoredSession(roleKey);
    setSession(updated);
    setIsSwitcherOpen(false);
    const target = DEMO_PERSONAS[roleKey].destination;
    router.push(target);
  };

  const navItems = [
    {
      label: "Cooperative Dashboard",
      shortLabel: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard" || pathname.startsWith("/dashboard/"),
      badge: "Live",
    },
    {
      label: "MRV Verifier Audit",
      shortLabel: "Verifier",
      href: "/verifier",
      icon: ShieldCheck,
      active: pathname === "/verifier" || pathname.startsWith("/verifier/"),
      badge: "Audit",
    },
    {
      label: "Finance & Payouts",
      shortLabel: "Payouts",
      href: "/finance",
      icon: Coins,
      active: pathname === "/finance" || pathname.startsWith("/finance/"),
      badge: "Sandbox",
    },
  ];

  return (
    <aside
      aria-label="Portal Sidebar Navigation"
      className={`fixed top-0 bottom-0 left-0 z-40 bg-[#0B4D25] text-white border-r border-primary-green-800/80 flex flex-col justify-between transition-all duration-200 select-none ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Brand Header */}
      <div>
        <div
          className={`h-16 flex items-center border-b border-primary-green-800/80 px-4 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 group focus:outline-hidden"
            title="CarbonTensor Ground Verification & Payout Platform"
          >
            <div className="w-9 h-9 rounded-xl bg-primary-green-600 border border-primary-green-400 flex items-center justify-center text-white shadow-xs group-hover:bg-primary-green-500 transition-colors shrink-0">
              <Activity className="w-5 h-5 text-white" />
            </div>

            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-base tracking-tight text-white leading-tight">
                  CarbonTensor
                </span>
                <span className="text-[10px] font-mono text-primary-green-200 tracking-wider uppercase font-semibold">
                  MRV & Payout
                </span>
              </div>
            )}
          </Link>

          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg text-primary-green-200 hover:text-white hover:bg-primary-green-800 transition-colors"
              title="Collapse sidebar (w-20)"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Collapsed expand toggle button */}
        {isCollapsed && (
          <div className="py-2 flex justify-center border-b border-primary-green-800/60">
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg text-primary-green-200 hover:text-white hover:bg-primary-green-800 transition-colors"
              title="Expand sidebar (w-64)"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Item List */}
        <nav className="p-3 space-y-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.active;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group relative ${
                  isActive
                    ? "bg-primary-green-600 text-white shadow-xs font-bold"
                    : "text-primary-green-100 hover:bg-primary-green-800 hover:text-white"
                } ${isCollapsed ? "justify-center px-0" : ""}`}
                title={isCollapsed ? item.label : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? "text-white" : "text-primary-green-300 group-hover:text-white"
                  }`}
                />

                {!isCollapsed && (
                  <div className="flex-1 min-w-0 flex items-center justify-between">
                    <span className="truncate">{item.label}</span>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border ${
                        isActive
                          ? "bg-primary-green-800/70 text-primary-green-100 border-primary-green-400"
                          : "bg-primary-green-900/60 text-primary-green-300 border-primary-green-800"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer: User/Coop Card, Persona Switcher & Discreet Sandbox Indicator */}
      <div className="p-3 border-t border-primary-green-800/80 space-y-2 bg-primary-green-950/40 relative">
        {/* Contextual User Card */}
        {!isCollapsed ? (
          <div className="bg-primary-green-900/80 rounded-xl p-2.5 border border-primary-green-800 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-green-700 border border-primary-green-500/50 flex items-center justify-center text-white shrink-0">
              <PersonaIcon className="w-4 h-4 text-primary-green-200" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold text-white truncate" title={displayName}>
                {displayName}
              </div>
              <div className="text-[10px] text-primary-green-300 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F8851]" />
                <span className="truncate">{displayBadge}</span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex justify-center py-1"
            title={`${displayName} • ${displayBadge}`}
          >
            <div className="w-8 h-8 rounded-lg bg-primary-green-700 border border-primary-green-500/50 flex items-center justify-center text-white shrink-0">
              <PersonaIcon className="w-4 h-4 text-primary-green-200" />
            </div>
          </div>
        )}

        {/* Discreet Persona Switcher Dropdown */}
        <div ref={switcherRef} className="relative">
          {/* Persona Switcher Menu Popup */}
          {isSwitcherOpen && (
            <div
              className={`absolute bottom-full mb-2 bg-[#062612] border border-primary-green-700 rounded-xl p-1.5 shadow-2xl z-50 text-xs backdrop-blur-md ${
                isCollapsed ? "left-0 w-60" : "left-0 right-0"
              }`}
            >
              <div className="px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-primary-green-300 border-b border-primary-green-800/80 mb-1 flex items-center justify-between">
                <span>Switch Persona</span>
                <span className="text-[9px] text-primary-green-400">1-click demo</span>
              </div>
              <div className="space-y-1">
                {(Object.keys(DEMO_PERSONAS) as PersonaRole[]).map((roleKey) => {
                  const p = DEMO_PERSONAS[roleKey];
                  const isCurrent = session.role === roleKey;
                  return (
                    <button
                      key={roleKey}
                      type="button"
                      onClick={() => handleSwitchPersona(roleKey)}
                      className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                        isCurrent
                          ? "bg-primary-green-700 text-white font-bold"
                          : "text-primary-green-200 hover:bg-primary-green-900/90 hover:text-white"
                      }`}
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="text-[11px] font-semibold leading-tight">{p.badge}</div>
                        <div className="text-[10px] text-primary-green-300 truncate">
                          {p.organization}
                        </div>
                      </div>
                      {isCurrent && (
                        <Check className="w-3.5 h-3.5 text-accent-orange-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Trigger Button */}
          <button
            type="button"
            onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
            className={`w-full flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary-green-900/70 hover:bg-primary-green-800 border border-primary-green-700/70 text-primary-green-200 hover:text-white text-[11px] font-medium transition-colors ${
              isCollapsed ? "justify-center px-1" : ""
            }`}
            title="Switch Persona: Cooperative Admin, Field Verifier, Farmer (Mock)"
          >
            <div className="flex items-center gap-1.5 truncate">
              <ArrowLeftRight className="w-3.5 h-3.5 text-primary-green-300 shrink-0" />
              {!isCollapsed && <span className="truncate">Switch Persona</span>}
            </div>
            {!isCollapsed && (
              <ChevronUp
                className={`w-3 h-3 text-primary-green-300 transition-transform duration-150 ${
                  isSwitcherOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
        </div>

        {/* Discreet Sandbox Indicator */}
        <div
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-primary-green-900/50 border border-primary-green-800/70 text-[11px] text-primary-green-200 font-mono ${
            isCollapsed ? "justify-center px-1" : ""
          }`}
          title="Access Bank Sandbox & Simulated Telemetry"
        >
          <span className="w-2 h-2 rounded-full bg-[#3F8851] shrink-0" />
          {!isCollapsed && (
            <div className="flex items-center justify-between w-full min-w-0">
              <span className="font-semibold text-primary-green-100">Sandbox Mode</span>
              <span title="Access Bank Sandbox & Simulated Telemetry">
                <Info className="w-3 h-3 text-primary-green-400 shrink-0 ml-1 hover:text-white" />
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
