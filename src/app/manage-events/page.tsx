"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { formatDate } from "@/lib/utils";
import { type EventItem } from "@/components/events/EventCard";
import {
  FolderKanban,
  PlusCircle,
  Calendar,
  MapPin,
  Edit3,
  Trash2,
  X,
  Loader2,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const EVENT_TYPES = [
  "Donation",
  "Plantation",
  "Cleanup",
  "Healthcare",
  "Education",
  "Food Aid",
  "Community Welfare"
];

function ManageEventsContent() {
  const { user, token } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMyEvents = async () => {
    const activeToken = token || (typeof window !== "undefined" ? localStorage.getItem("uprise_token") : null);
    if (!user?.email || !activeToken) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/events/user/${encodeURIComponent(user.email)}`, {
        headers: {
          Authorization: `Bearer ${activeToken}`
        }
      });
      if (!res.ok) throw new Error("Could not load your created events.");
      const data = await res.json();
      if (data.events) {
        setEvents(data.events);
      }
    } catch (err: unknown) {
      console.error("Error loading events:", err);
      toast.error("Failed to load your organized events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [user?.email, token]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingEvent) return;
    setEditingEvent({ ...editingEvent, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeToken = token || (typeof window !== "undefined" ? localStorage.getItem("uprise_token") : null);
    if (!editingEvent || !activeToken) return;

    if (!editingEvent.title.trim() || !editingEvent.location.trim() || !editingEvent.thumbnailUrl.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsUpdating(true);
      const res = await fetch(`${API_BASE_URL}/events/${editingEvent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`
        },
        body: JSON.stringify(editingEvent)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update event.");

      toast.success("Event updated successfully!");
      setEditingEvent(null);
      fetchMyEvents();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error updating event.";
      toast.error(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  const confirmDelete = async () => {
    const activeToken = token || (typeof window !== "undefined" ? localStorage.getItem("uprise_token") : null);
    if (!deletingId || !activeToken) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`${API_BASE_URL}/events/${deletingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${activeToken}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete event.");

      toast.success("Event removed successfully.");
      setDeletingId(null);
      setEvents((prev) => prev.filter((e) => e._id !== deletingId));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error deleting event.";
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50/50 dark:bg-slate-950 transition-colors duration-200 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 text-xs font-semibold uppercase tracking-wider mb-3">
              <FolderKanban className="w-3.5 h-3.5 text-emerald-500" />
              <span>Organizer Management Portal</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Manage Your Initiatives
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Review, edit details, and manage the social welfare events you have published.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Event</span>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse h-28" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-2">
              You haven&apos;t created any events yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
              Launch a community initiative in your neighborhood today and rally local volunteers.
            </p>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm"
            >
              <span>Create Your First Event</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 sm:items-center justify-between"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className="relative w-full sm:w-40 aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                    <Image
                      src={event.thumbnailUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400"}
                      alt={event.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 text-emerald-300">
                        {event.eventType}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Date: {formatDate(event.eventDate)}</span>
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white leading-snug">
                      {event.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <Link
                    href={`/events/${event._id}`}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => setEditingEvent(event)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeletingId(event._id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {editingEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                  Update Initiative Details
                </h3>
                <button
                  onClick={() => setEditingEvent(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editingEvent.title}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Event Type
                    </label>
                    <select
                      name="eventType"
                      value={editingEvent.eventType}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      {EVENT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={editingEvent.eventDate}
                      onChange={handleEditChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editingEvent.location}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    name="thumbnailUrl"
                    value={editingEvent.thumbnailUrl}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={editingEvent.description}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setEditingEvent(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm"
                  >
                    {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                Delete This Initiative?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Are you sure you want to permanently delete this event? This action cannot be undone and will cancel all volunteer registrations.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setDeletingId(null)}
                  disabled={isDeleting}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm"
                >
                  {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Yes, Delete Event</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <ProtectedRoute>
      <ManageEventsContent />
    </ProtectedRoute>
  );
}
