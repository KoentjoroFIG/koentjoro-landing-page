import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/atoms/button";

interface ContactSectionProps {
  className?: string;
}

export function ContactSection({ className = "" }: ContactSectionProps) {
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactFormData);
    alert("Thank you for your message! I will get back to you soon.");
    setContactFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className={`bg-gray-50 py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Me</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Have questions or want to connect? Use the form below or reach out
            via social media.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 md:p-8 lg:p-10 shadow-lg">
              <form
                onSubmit={handleContactSubmit}
                className="space-y-5 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={contactFormData.name}
                    onChange={(e) =>
                      setContactFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={contactFormData.email}
                    onChange={(e) =>
                      setContactFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={contactFormData.message}
                    onChange={(e) =>
                      setContactFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 md:py-4 text-lg font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 md:mb-8">
                Connect with me
              </h3>
              <div className="space-y-3 md:space-y-4">
                <a
                  href="https://www.linkedin.com/in/koentjoro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/KoentjoroFIG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 md:mb-8">
                Location
              </h3>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-6 h-6 text-sky-500" />
                <span className="text-lg">Pekalongan, Indonesia</span>
              </div>
            </div>

            <div className="bg-sky-50 rounded-xl p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-sky-800 mb-4 md:mb-5">
                Let's Connect!
              </h3>
              <p className="text-gray-700 leading-relaxed">
                I'm always interested in discussing new opportunities,
                collaborations, or just connecting with fellow professionals in
                the tech industry. Don't hesitate to reach out!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
