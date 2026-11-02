import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnailUrl: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  creatorName?: string;
  participantCount?: number;
}

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const getBadgeStyle = (type: string) => {
    switch (type?.toLowerCase()) {
      case "donation":
        return "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/80";
      case "plantation":
        return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/80";
      case "cleanup":
        return "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/80";
      case "healthcare":
        return "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/80";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={event.thumbnailUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800"}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute top-3 left-3">
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg border backdrop-blur-md shadow-xs ${getBadgeStyle(event.eventType)}`}>
            {event.eventType}
          </span>
        </div>

        {typeof event.participantCount === "number" && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-medium">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>{event.participantCount} joined</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>{formatDate(event.eventDate)}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            By <span className="font-medium text-slate-700 dark:text-slate-300">{event.creatorName || "Organizer"}</span>
          </div>
          <Link
            href={`/events/${event._id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group/btn"
          >
            <span>View Event</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const EventCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden animate-pulse">
      <div className="w-full aspect-[16/10] bg-slate-200 dark:bg-slate-800" />
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-3">
          <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-6 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
          <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
      </div>
    </div>
  );
};
