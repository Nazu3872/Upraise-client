import React from "react";
import Image from "next/image";
import { Camera, MapPin } from "lucide-react";

export const GallerySection: React.FC = () => {
  const photos = [
    {
      src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
      title: "Winter Clothes & Warmth Distribution",
      location: "Mirpur 10, Dhaka",
      tag: "Relief Drive"
    },
    {
      src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
      title: "Urban Tree Plantation & Greening",
      location: "Dhanmondi Lake Walkway",
      tag: "Environment"
    },
    {
      src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop",
      title: "Hot Meal Feeding & Ration Packs",
      location: "Sadarghat Riverside Slum",
      tag: "Food Aid"
    },
    {
      src: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop",
      title: "Community Lake & Park Cleanliness",
      location: "Gulshan Youth Club Grounds",
      tag: "Sanitation"
    },
    {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
      title: "Free Healthcare & Eye Screening Camp",
      location: "Khilgaon Community School",
      tag: "Healthcare"
    },
    {
      src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop",
      title: "Emergency Blanket & Shelter Aid",
      location: "Mohammadpur Geneva Camp",
      tag: "Winter Relief"
    }
  ];

  return (
    <section className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Community Gallery</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-3">
            Moments from recent events
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Real photos from winter clothes drives, tree planting, and meal distributions across the city.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-slate-200/80 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 left-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-heading font-bold text-base leading-snug drop-shadow-xs mb-1">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
