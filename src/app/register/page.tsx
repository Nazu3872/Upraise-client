"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Image as ImageIcon, Lock, UserPlus, Loader2, Check, X, ArrowRight } from "lucide-react";
import { toast } from "sonner";

function RegisterForm() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const { register, loginWithGithub, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleGithubLogin = async () => {
    setSubmitting(true);
    await loginWithGithub(redirectPath);
    setSubmitting(false);
  };

  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasLowercase = /[a-z]/.test(formData.password);
  const hasMinLength = formData.password.length >= 6;
  const isPasswordValid = hasUppercase && hasLowercase && hasMinLength;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please provide your full display name.");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please provide a valid email address.");
      return;
    }

    if (!hasUppercase) {
      toast.error("Password must contain at least one uppercase letter (A-Z)!");
      return;
    }
    if (!hasLowercase) {
      toast.error("Password must contain at least one lowercase letter (a-z)!");
      return;
    }
    if (!hasMinLength) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    const finalPhotoURL =
      formData.photoURL.trim() ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.name)}`;

    setSubmitting(true);
    await register(formData.name, formData.email, finalPhotoURL, formData.password, redirectPath);
    setSubmitting(false);
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50/50 dark:bg-slate-950 transition-colors duration-200 min-h-[85vh] flex items-center justify-center">
      <div className="w-full max-w-md px-4 sm:px-6">
        
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-8 sm:p-10 space-y-6">
          
          <div className="text-center space-y-3">
            <div className="relative w-16 h-16 mx-auto">
              <Image
                src="/logo.png"
                alt="UpRaise Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
              Join the UpRaise Community
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Create an account to join and organize local volunteer events.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGithubLogin}
              disabled={submitting || isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Quick Sign Up with GitHub</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            <span className="absolute px-3 bg-white dark:bg-slate-900 text-xs text-slate-400 font-medium">
              or register with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Ahmed"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Profile Photo URL (Optional)
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Password Requirements:
                </span>
                <div className={`flex items-center gap-1.5 ${hasUppercase ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
                  {hasUppercase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-slate-300" />}
                  <span>At least one uppercase letter (A-Z)</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasLowercase ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
                  {hasLowercase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-slate-300" />}
                  <span>At least one lowercase letter (a-z)</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasMinLength ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
                  {hasMinLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-slate-300" />}
                  <span>Minimum 6 characters in length</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || isLoading || !isPasswordValid}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm shadow-md shadow-blue-500/25 active:scale-95 transition-all duration-150 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create UpRaise Account</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href={`/login?redirect=${encodeURIComponent(redirectPath)}`}
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5"
            >
              <span>Log in here</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
