import { Button } from "@/components/atoms/button";
import { SignInDialog } from "@/components/molecules/Auth/SignInDialog";
import { SignUpDialog } from "@/components/molecules/Auth/SignUpDialog";
import { ForgotPasswordDialog } from "@/components/molecules/Auth/ForgotPasswordDialog";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Navbar = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  // Track active section for navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "resume",
        "abilities",
        "bid-to-hire",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "resume", label: "Resume" },
    { id: "abilities", label: "Abilities" },
    // Bid to Hire link is feature-flagged (disabled by default)
    ...(import.meta.env.VITE_ENABLE_BID === "true"
      ? [{ id: "bid-to-hire", label: "Bid to Hire" }]
      : []),
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h2 className="text-2xl font-bold text-sky-600">Koentjoro</h2>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleSmoothScroll(e, item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeSection === item.id
                        ? "text-sky-600 bg-sky-50"
                        : "text-gray-700 hover:text-sky-600 hover:bg-sky-50"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                {/* Show Sign In only when auth feature flag is enabled */}
                {import.meta.env.VITE_ENABLE_AUTH === "true" && (
                  <Button
                    className="ml-4 bg-sky-500 hover:bg-sky-600 text-white"
                    onClick={() => setIsSignInOpen(true)}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-sky-600 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <div className="hamburger">
                  <span
                    className={`block w-6 h-0.5 bg-current transform transition duration-200 ease-in-out ${
                      isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  ></span>
                  <span
                    className={`block w-6 h-0.5 bg-current mt-1 transform transition duration-200 ease-in-out ${
                      isMenuOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`block w-6 h-0.5 bg-current mt-1 transform transition duration-200 ease-in-out ${
                      isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200 shadow-lg">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleSmoothScroll(e, item.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-sky-600 bg-sky-50"
                      : "text-gray-700 hover:text-sky-600 hover:bg-sky-50"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              {import.meta.env.VITE_ENABLE_AUTH === "true" && (
                <div className="pt-2">
                  <Button
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                    onClick={() => setIsSignInOpen(true)}
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      <SignInDialog
        open={isSignInOpen}
        onOpenChange={setIsSignInOpen}
        onSwitchToSignUp={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}
        onSwitchToForgotPassword={() => {
          setIsSignInOpen(false);
          setIsForgotPasswordOpen(true);
        }}
      />
      <SignUpDialog
        open={isSignUpOpen}
        onOpenChange={setIsSignUpOpen}
        onSwitchToSignIn={() => {
          setIsSignUpOpen(false);
          setIsSignInOpen(true);
        }}
      />
      <ForgotPasswordDialog
        open={isForgotPasswordOpen}
        onOpenChange={setIsForgotPasswordOpen}
        onBackToSignIn={() => {
          setIsForgotPasswordOpen(false);
          setIsSignInOpen(true);
        }}
      />
      <main>{children}</main>
    </>
  );
};

export default Navbar;
