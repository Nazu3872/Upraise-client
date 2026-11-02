import React from "react";
import { Compass, Users2, ShieldAlert, Award } from "lucide-react";

export const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <Compass className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      badge: "Local First",
      title: "Find Nearby Events",
      description: "Discover donation drives, cleanups, and tree plantation events happening right in your area."
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      badge: "Verified",
      title: "Trusted Organizers",
      description: "Connect with real community members and verified organizers who care about making a difference."
    },
    {
      icon: <Users2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      badge: "One Click",
      title: "Join in Seconds",
      description: "Sign up with a single click, track your joined events, and show up when it matters."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      badge: "Always Fresh",
      title: "Active Events Only",
      description: "We automatically filter out expired dates so you only see events that are currently taking volunteers."
    }
  ];

  return (
    <section className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-semibold uppercase tracking-wider mb-3">
            Why UpRaise
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-3">
            Simple tools to help your community grow
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            We make it easy to find local charity drives, volunteer your time, or organize your own events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center mb-5">
                {feat.icon}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {feat.badge}
              </span>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mt-1 mb-2">
                {feat.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
