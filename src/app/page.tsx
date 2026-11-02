import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureSection } from "@/components/home/FeatureSection";
import { RecentEventsSection } from "@/components/home/RecentEventsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeatureSection />
      <RecentEventsSection />
      <GallerySection />
      <NewsletterSection />
    </div>
  );
}
