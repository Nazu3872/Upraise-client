import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

const XLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74V9.92H5.06v8.58h2.8z" />
  </svg>
);

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group focus:outline-hidden inline-flex">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/logo.png"
                  alt="UpRaise Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-200"
                />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                Up<span className="text-blue-600 dark:text-blue-500">Raise</span>
              </span>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Connecting volunteers and local organizers to create meaningful change in neighborhoods across Dhaka.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center hover:text-black dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-all shadow-xs"
                aria-label="X (formerly Twitter)"
              >
                <XLogo className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center hover:text-blue-600 hover:border-blue-400 transition-all shadow-xs"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center hover:text-blue-600 hover:border-blue-400 transition-all shadow-xs"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center hover:text-slate-900 dark:hover:text-white hover:border-slate-400 transition-all shadow-xs"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Create Event
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Joined Events
                </Link>
              </li>
              <li>
                <Link href="/manage-events" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Manage Events
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
              Initiatives
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/events?type=Donation" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Winter Relief & Clothes
                </Link>
              </li>
              <li>
                <Link href="/events?type=Plantation" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Tree Plantation
                </Link>
              </li>
              <li>
                <Link href="/events?type=Cleanup" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Neighborhood Cleanups
                </Link>
              </li>
              <li>
                <Link href="/events?type=Healthcare" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Free Medical Camps
                </Link>
              </li>
              <li>
                <Link href="/events?type=Education" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Education & Youth Aid
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
              Community Hub
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>House 42, Road 11, Dhanmondi, Dhaka 1209</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <a href="mailto:support@upraise.org" className="hover:underline">
                  support@upraise.org
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>+880 1800-123456</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} UpRaise. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/events" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Explore Events
            </Link>
            <span>•</span>
            <Link href="/login" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Sign In
            </Link>
            <span>•</span>
            <Link href="/register" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
