"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle, Shield } from "lucide-react";
import { toast } from "sonner";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please provide a valid email address to subscribe.");
      return;
    }

    setIsSubscribed(true);
    toast.success("Thank you for subscribing! You will receive weekly social initiative updates.");
    setEmail("");
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>Newsletter</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Get updates on new volunteer drives
            </h2>

            <p className="text-base text-blue-100/90 leading-relaxed max-w-xl mx-auto">
              Never miss a chance to help. We send a friendly weekly email with upcoming events in your area.
            </p>

            {isSubscribed ? (
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-400/40 inline-flex items-center gap-2 text-emerald-300 font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>You are subscribed to the UpRaise newsletter!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                <div className="relative flex-1">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white placeholder:text-slate-400 border border-white/30 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 text-sm shadow-inner"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm shadow-md shadow-emerald-900/30 active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-blue-200/70 pt-2">
              <Shield className="w-3.5 h-3.5 text-emerald-300" />
              <span>Zero spam. Unsubscribe anytime with one click.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
