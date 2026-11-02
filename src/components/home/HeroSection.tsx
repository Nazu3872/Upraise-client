import React from "react";
import Link from "next/link";
import { ArrowRight, Users, CalendarCheck, HeartHandshake, ShieldCheck } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/hero-bg.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-slate-50 dark:from-slate-950/90 dark:via-slate-950/85 dark:to-slate-950" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto">
          Connecting People to{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 bg-clip-text text-transparent">
            Raise Up
          </span>{" "}
          Their Communities
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
          UpRaise brings neighbors together for local charity drives, tree planting, and relief work. Find an event near you, lend a hand, and make a real difference.
        </p>

        <div className="flex items-center justify-center mb-16">
          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <span>Explore Upcoming Events</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xs hover:shadow-md transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-1">
              14,500<span className="text-emerald-600 dark:text-emerald-400">+</span>
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
              Active Volunteers
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Volunteers across Dhaka taking part in local drives.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xs hover:shadow-md transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-1">
              320<span className="text-blue-600 dark:text-blue-400">+</span>
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
              Events Hosted
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Charity and community events organized so far.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xs hover:shadow-md transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-1">
              45,000<span className="text-emerald-600 dark:text-emerald-400">+</span>
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
              People Helped
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Families supported with warmth, food & healthcare.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xs hover:shadow-md transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-1">
              98<span className="text-blue-600 dark:text-blue-400">%</span>
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
              Success Rate
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Events successfully completed by local team leads.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
