import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";

interface PrivacyPolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyPolicyDialog({
  open,
  onOpenChange,
}: PrivacyPolicyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Privacy Policy
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4 text-sm text-gray-700">
          <p className="text-xs text-gray-500 text-center">
            Last Updated: October 23, 2025
          </p>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              1. Introduction
            </h3>
            <p className="leading-relaxed">
              Welcome to Koentjoro ("we", "our", or "us"). We are committed to
              protecting your personal information and your right to privacy.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website and use our
              services.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              2. Information We Collect
            </h3>
            <p className="leading-relaxed mb-2">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Name and contact information (email address)</li>
              <li>Account credentials (username and password)</li>
              <li>Profile information and preferences</li>
              <li>Communications you send to us</li>
              <li>Payment and billing information</li>
            </ul>
            <p className="leading-relaxed mt-3">
              We also automatically collect certain information when you visit
              our website, including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                Device information (IP address, browser type, operating system)
              </li>
              <li>Usage data (pages visited, time spent, clicks)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              3. How We Use Your Information
            </h3>
            <p className="leading-relaxed mb-2">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>
                Detect, prevent, and address technical issues and security
                threats
              </li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              4. Information Sharing and Disclosure
            </h3>
            <p className="leading-relaxed mb-2">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>With service providers who perform services on our behalf</li>
              <li>
                To comply with legal obligations or respond to legal requests
              </li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>
                In connection with a merger, sale, or acquisition of our
                business
              </li>
              <li>With your consent or at your direction</li>
            </ul>
            <p className="leading-relaxed mt-3">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              5. Data Security
            </h3>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. However, no method
              of transmission over the internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              6. Your Rights and Choices
            </h3>
            <p className="leading-relaxed mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Access and receive a copy of your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              7. Cookies and Tracking Technologies
            </h3>
            <p className="leading-relaxed">
              We use cookies and similar tracking technologies to collect and
              track information about your use of our services. You can control
              cookies through your browser settings. However, disabling cookies
              may affect the functionality of our services.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              8. Third-Party Links
            </h3>
            <p className="leading-relaxed">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of these external sites. We
              encourage you to read their privacy policies before providing any
              information.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              9. Children's Privacy
            </h3>
            <p className="leading-relaxed">
              Our services are not intended for children under 13 years of age.
              We do not knowingly collect personal information from children
              under 13. If you become aware that a child has provided us with
              personal information, please contact us.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              10. Changes to This Privacy Policy
            </h3>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last Updated" date. Your continued use
              of our services after any changes constitutes acceptance of the
              updated policy.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              11. Contact Us
            </h3>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy or our privacy
              practices, please contact us at:
            </p>
            <div className="mt-2 p-4 bg-sky-50 rounded-lg">
              <p className="font-medium text-gray-900">Koentjoro</p>
              <p className="text-gray-700">Email: privacy@koentjoro.com</p>
              <p className="text-gray-700">Website: www.koentjoro.com</p>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
