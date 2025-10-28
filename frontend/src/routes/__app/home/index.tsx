import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/pages/home";
import { ResumeSection } from "@/components/pages/resume";
import { AbilitiesSection } from "@/components/pages/abilities";
import { BidToHireSection } from "@/components/pages/bid";
import { ContactSection } from "@/components/pages/contact";
import Footer from "@/components/organisms/Footer/Footer";

export const Route = createFileRoute("/__app/home/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ResumeSection />
      <AbilitiesSection />
      {/* Bid section is behind a feature flag while backend is in progress */}
      {import.meta.env.VITE_ENABLE_BID === "true" && <BidToHireSection />}
      <ContactSection />
      <Footer />
    </div>
  );
}
