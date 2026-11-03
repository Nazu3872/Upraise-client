"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";
import { type EventItem } from "@/components/events/EventCard";
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  Share2,
  ArrowLeft,
  Mail,
  UserCheck,
  Sparkles,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;

  const { user, token } = useAuth();
  const router = useRouter();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [joining, setJoining] = useState<boolean>(false);
  const [participantCount, setParticipantCount] = useState<number>(0);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/events/${eventId}`);
        if (!res.ok) throw new Error("Event details could not be retrieved.");
        const data = await res.json();
        if (data.event) {
          setEvent(data.event);
          setParticipantCount(data.event.participantCount || 0);
        }
      } catch (err: unknown) {
        console.error("Error loading event:", err);
        toast.error("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  useEffect(() => {
    const checkStatus = async () => {
      if (!user || !token || !eventId) return;
      try {
        const res = await fetch(`${API_BASE_URL}/events/${eventId}/join-status`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setHasJoined(data.hasJoined);
        }
      } catch (err) {
        console.warn("Could not check join status:", err);
      }
    };

    checkStatus();
  }, [user, token, eventId]);

  const handleJoinEvent = async () => {
    const activeToken = token || (typeof window !== "undefined" ? localStorage.getItem("uprise_token") : null);

    if (!user || !activeToken) {
      toast.info("Please sign in to join this community event!");
      router.push(`/login?redirect=${encodeURIComponent(`/events/${eventId}`)}`);
      return;
    }

    if (hasJoined) {
      toast.info("You are already enrolled as a participant for this initiative!");
      return;
    }

    try {
      setJoining(true);
      const res = await fetch(`${API_BASE_URL}/events/${eventId}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to join event.");
      }

      setHasJoined(true);
      setParticipantCount((prev) => prev + 1);
      toast.success("Awesome! You have successfully joined this initiative.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error joining event.";
      toast.error(msg);
    } finally {
      setJoining(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="aspect-[16/9] w-full bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-24 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-xl mx-auto my-24 p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white mb-2">Event Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The community event you are searching for might have been concluded or removed.</p>
        <Link href="/events" className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm">
          Return to Events Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16 bg-slate-50/50 dark:bg-slate-950 transition-colors duration-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Upcoming Events</span>
        </Link>

        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          
          <div className="relative w-full aspect-[16/9] bg-slate-100 dark:bg-slate-800">
            <Image
              src={event.thumbnailUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200"}
              alt={event.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/30">
                {event.eventType}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md text-xs sm:text-sm font-medium">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{participantCount} Volunteers Enrolled</span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            
            <div>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.eventDate)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{event.location}</span>
                </div>
              </div>

              <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
                {event.title}
              </h1>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                  Join as a Local Volunteer
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Free to participate. No prior experience required.
                </p>
              </div>

              {hasJoined ? (
                <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Already Enrolled</span>
                </div>
              ) : (
                <button
                  onClick={handleJoinEvent}
                  disabled={joining}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold text-sm shadow-md shadow-blue-500/25 active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  {joining ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enrolling...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-300" />
                      <span>Join This Event</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                About This Initiative
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Lead Organizer
                  </div>
                  <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                    {event.creatorName || "Community Member"}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl">
                <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{event.creatorEmail}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
