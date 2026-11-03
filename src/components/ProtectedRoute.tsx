"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-950 border-t-blue-600 rounded-full animate-spin" />
          <Loader2 className="w-6 h-6 text-blue-600 absolute animate-pulse" />
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
          Verifying your session...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
