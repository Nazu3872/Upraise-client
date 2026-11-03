"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import {
  CalendarDays,
  PlusCircle,
  FolderKanban,
  CheckCircle2,
  LogOut,
  User,
  Menu,
  X,
  ChevronDown
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          <Link href="/" className="flex items-center gap-3 group focus:outline-hidden">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/logo.png"
                alt="UpRaise Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-200"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white leading-tight">
                Up<span className="text-blue-600 dark:text-blue-500">Raise</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
                Community Events Platform
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive("/")
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50"
                  : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/60 dark:hover:bg-slate-900/60"
              }`}
            >
              Home
            </Link>

            <Link
              href="/events"
              className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all duration-150 ${
                isActive("/events")
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/60 dark:hover:bg-slate-900/60"
              }`}
            >
              <CalendarDays className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Upcoming Events
            </Link>

            {user && (
              <Link
                href="/create-event"
                className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all duration-150 ${
                  isActive("/create-event")
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/60 dark:hover:bg-slate-900/60"
                }`}
              >
                <PlusCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Create Event
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {!user ? (
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 active:scale-95 transition-all duration-150 cursor-pointer"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="relative flex items-center"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 bg-slate-50/60 dark:bg-slate-900/60 transition-all cursor-pointer focus:outline-hidden"
                      aria-expanded={dropdownOpen}
                      aria-label="User menu"
                    >
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/30">
                        <Image
                          src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                          alt={user.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    </button>

                    {showTooltip && !dropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none transition-opacity duration-150">
                        {user.name}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45" />
                      </div>
                    )}
                  </div>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/create-event"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 transition-colors"
                        >
                          <PlusCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span>Create Event</span>
                        </Link>

                        <Link
                          href="/manage-events"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 transition-colors"
                        >
                          <FolderKanban className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Manage Events</span>
                        </Link>

                        <Link
                          href="/joined-events"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span>Joined Events</span>
                        </Link>

                        <Link
                          href="/profile"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 transition-colors"
                        >
                          <User className="w-4 h-4 text-slate-500" />
                          <span>My Profile</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50/60 dark:hover:bg-rose-950/40 transition-colors cursor-pointer text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={logout}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200/60 dark:border-rose-900/40 transition-all cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Upcoming Events
          </Link>

          {user ? (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden">
                  <Image
                    src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                    alt={user.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="truncate">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                </div>
              </div>

              <Link
                href="/create-event"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <PlusCircle className="w-4 h-4 text-blue-600" />
                <span>Create Event</span>
              </Link>
              <Link
                href="/manage-events"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <FolderKanban className="w-4 h-4 text-emerald-600" />
                <span>Manage Events</span>
              </Link>
              <Link
                href="/joined-events"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Joined Events</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>My Profile</span>
              </Link>

              <button
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/login"
                className="block w-full py-2.5 text-center rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
