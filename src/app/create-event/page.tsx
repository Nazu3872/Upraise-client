"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  CalendarPlus,
  Image as ImageIcon,
  MapPin,
  Tag,
  Calendar,
  FileText,
  Loader2,
  Sparkles,
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

function CreateEventContent() {
  const { user, token } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "Donation",
    thumbnailUrl: "",
    location: "",
    eventDate: ""
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter a meaningful event title.");
      return;
    }
    if (!formData.description.trim() || formData.description.trim().length < 20) {
      toast.error("Please provide a detailed description (at least 20 characters).");
      return;
    }
    if (!formData.thumbnailUrl.trim()) {
      toast.error("Please provide a valid image URL for the thumbnail.");
      return;
    }
    if (!formData.location.trim()) {
      toast.error("Please specify the exact event location or ward.");
      return;
    }
    if (!formData.eventDate) {
      toast.error("Please pick a scheduled date for the event.");
      return;
    }

    if (formData.eventDate < today) {
      toast.error("Event date must be in the future. Past dates cannot be added!");
      return;
    }

    try {
      setLoading(true);

      let activeToken = token || (typeof window !== "undefined" ? localStorage.getItem("uprise_token") : null);

      if (!activeToken && user?.email) {
        try {
          const authRes = await fetch(`${API_BASE_URL}/auth/jwt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, name: user.name, photoURL: user.photoURL })
          });
          if (authRes.ok) {
            const authData = await authRes.json();
            if (authData.token) {
              activeToken = authData.token;
              localStorage.setItem("uprise_token", authData.token);
            }
          }
        } catch {
          console.warn("Could not retrieve fresh JWT token before event publish.");
        }
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json"
      };
      if (activeToken) {
        headers["Authorization"] = `Bearer ${activeToken}`;
      }

      const res = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...formData,
          creatorEmail: user?.email,
          creatorName: user?.name
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create event.");
      }

      toast.success("Event created successfully! Redirecting to Upcoming Events...");
      router.push("/events");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error creating event.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50/50 dark:bg-slate-950 transition-colors duration-200 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 text-xs font-semibold uppercase tracking-wider mb-3">
            <CalendarPlus className="w-3.5 h-3.5 text-emerald-500" />
            <span>Community Organizer Suite</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-3">
            Create a Social Development Event
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Host a winter clothes distribution, neighborhood cleanup, or medical camp in your ward. Inspire local volunteers to step forward.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Event Title *
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Event Type *
                </label>
                <div className="relative">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Event Date (Future Date Only) *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    name="eventDate"
                    min={today}
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Event Location *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Town Hall Field, Mohammadpur, Dhaka"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Thumbnail Image URL *
                </label>
                <div className="relative">
                  <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    name="thumbnailUrl"
                    value={formData.thumbnailUrl}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Detailed Event Description *
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the objective, target beneficiaries, supplies needed, and instructions for volunteers..."
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300">
              <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                This event will be published under your authenticated account:{" "}
                <strong>{user?.name}</strong> ({user?.email}).
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold text-sm shadow-md shadow-blue-500/25 active:scale-95 transition-all duration-150 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing Event...</span>
                </>
              ) : (
                <>
                  <span>Publish Community Event</span>
                  <ArrowRight className="w-4 h-4 text-emerald-300" />
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <ProtectedRoute>
      <CreateEventContent />
    </ProtectedRoute>
  );
}
