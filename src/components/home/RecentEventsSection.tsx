"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { EventCard, EventCardSkeleton, type EventItem } from "@/components/events/EventCard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const RecentEventsSection: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/events?limit=6`);
        if (!res.ok) {
          throw new Error("Failed to fetch recent events");
        }
        const data = await res.json();
        if (data.events) {
          setEvents(data.events);
        }
      } catch (err: unknown) {
        console.error("Error fetching recent events:", err);
        setError("Could not load recent events at this moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Upcoming Drives</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Upcoming Community Events
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              Find an event happening near you and join your neighbors in lending a helping hand.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-blue-600 dark:text-blue-400 hover:text-white dark:hover:text-white bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-600 dark:hover:bg-blue-600 border border-blue-200/60 dark:border-blue-800/60 transition-all duration-200 group self-start md:self-auto cursor-pointer"
          >
            <span>View All Upcoming Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : error && events.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
            <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              Browse Event Directory
            </Link>
          </div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 max-w-xl mx-auto">
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">
              No upcoming events right now
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              There are no events scheduled yet. Be the first to start a drive in your area!
            </p>
            <Link
              href="/create-event"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
            >
              Create an Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
