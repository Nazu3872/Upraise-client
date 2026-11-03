"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { formatDate } from "@/lib/utils";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  CalendarDays
} from "lucide-react";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface JoinedEventRecord {
  _id: string;
  eventId: string;
  userEmail: string;
  userName: string;
  eventTitle: string;
  eventType: string;
  thumbnailUrl: string;
  eventLocation: string;
  eventDate: string;
  joinedAt: string;
}

function JoinedEventsContent() {
  const { user, token } = useAuth();
  const [joinedEvents, setJoinedEvents] = useState<JoinedEventRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      const activeToken = token || (typeof window !== "undefined" ? localStorage.getItem("uprise_token") : null);
      if (!user?.email || !activeToken) return;
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/events/joined/${encodeURIComponent(user.email)}`, {
          headers: {
            Authorization: `Bearer ${activeToken}`
          }
        });

        if (!res.ok) throw new Error("Could not retrieve joined events.");
        const data = await res.json();
        if (data.joinedEvents) {
          const sorted = [...data.joinedEvents].sort(
            (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
          );
          setJoinedEvents(sorted);
        }
      } catch (err: unknown) {
        console.error("Error fetching joined events:", err);
        toast.error("Failed to load your enrolled initiatives.");
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [user?.email, token]);

  return (
    <div className="py-12 sm:py-16 bg-slate-50/50 dark:bg-slate-950 transition-colors duration-200 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-semibold uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Volunteer Commitments</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              My Joined Initiatives
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Events you are enrolled in, sorted chronologically by event date.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all self-start sm:self-auto"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Discover More Events</span>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse flex flex-col sm:flex-row gap-6 items-center"
              >
                <div className="w-full sm:w-48 aspect-video rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="flex-1 space-y-3 w-full">
                  <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : joinedEvents.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-2">
              You haven&apos;t joined any events yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              Browse our upcoming community drives, find a cause you care about, and sign up as a volunteer with one click!
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm"
            >
              <span>Explore Upcoming Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {joinedEvents.map((item) => (
              <div
                key={item._id}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 sm:items-center justify-between"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className="relative w-full sm:w-40 aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                    <Image
                      src={item.thumbnailUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400"}
                      alt={item.eventTitle}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 text-emerald-300">
                        {item.eventType}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Event Date: {formatDate(item.eventDate)}</span>
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white leading-snug">
                      {item.eventTitle}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{item.eventLocation}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 pt-0.5">
                      Enrolled on: {formatDate(item.joinedAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Registered</span>
                  </span>

                  <Link
                    href={`/events/${item.eventId}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <span>View Event</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <ProtectedRoute>
      <JoinedEventsContent />
    </ProtectedRoute>
  );
}
