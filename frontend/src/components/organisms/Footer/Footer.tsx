import { FooterBrand } from "@/components/molecules/Footer/FooterBrand";
import { FooterLinks } from "@/components/molecules/Footer/FooterLinks";
import { FooterSocial } from "@/components/molecules/Footer/FooterSocial";
import { FooterCopyright } from "@/components/molecules/Footer/FooterCopyright";
import { PrivacyPolicyDialog } from "@/components/molecules/Legal/PrivacyPolicyDialog";
import { TermsOfServiceDialog } from "@/components/molecules/Legal/TermsOfServiceDialog";
import { useState } from "react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);

  const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#resume", label: "Resume" },
    { href: "#abilities", label: "Abilities" },
    // Bid to Hire link is feature-flagged
    ...(import.meta.env.VITE_ENABLE_BID === "true"
      ? [{ href: "#bid-to-hire", label: "Bid to Hire" }]
      : []),
    { href: "#contact", label: "Contact" },
  ];

  const legalLinks = [
    {
      href: "#privacy-policy",
      label: "Privacy Policy",
      onClick: () => setIsPrivacyPolicyOpen(true),
    },
    {
      href: "#terms-of-service",
      label: "Terms of Service",
      onClick: () => setIsTermsOfServiceOpen(true),
    },
  ];

  return (
    <footer className={`bg-gray-900 text-white pt-12 pb-6 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-10">
          <FooterBrand />
          <FooterLinks title="Quick Links" links={quickLinks} twoColumns />
          <FooterLinks title="Legal" links={legalLinks} />
          <FooterSocial />
        </div>
        <FooterCopyright />
      </div>
      <PrivacyPolicyDialog
        open={isPrivacyPolicyOpen}
        onOpenChange={setIsPrivacyPolicyOpen}
      />
      <TermsOfServiceDialog
        open={isTermsOfServiceOpen}
        onOpenChange={setIsTermsOfServiceOpen}
      />
    </footer>
  );
};

export default Footer;
