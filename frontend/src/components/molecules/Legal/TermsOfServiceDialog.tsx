import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";

interface TermsOfServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TermsOfServiceDialog({
  open,
  onOpenChange,
}: TermsOfServiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Terms of Service
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4 text-sm text-gray-700">
          <p className="text-xs text-gray-500 text-center">
            Last Updated: October 23, 2025
          </p>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              1. Acceptance of Terms
            </h3>
            <p className="leading-relaxed">
              By accessing and using the Koentjoro website and services
              ("Services"), you accept and agree to be bound by these Terms of
              Service ("Terms"). If you do not agree to these Terms, please do
              not use our Services. We reserve the right to modify these Terms
              at any time, and your continued use constitutes acceptance of any
              changes.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              2. Description of Services
            </h3>
            <p className="leading-relaxed">
              Koentjoro provides a platform for professional services, portfolio
              showcase, and client engagement. We reserve the right to modify,
              suspend, or discontinue any aspect of our Services at any time
              without prior notice.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              3. User Accounts
            </h3>
            <p className="leading-relaxed mb-2">
              When you create an account with us, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
            <p className="leading-relaxed mt-3">
              You may not use another person's account or share your account
              with others. We reserve the right to suspend or terminate accounts
              that violate these Terms.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              4. User Conduct
            </h3>
            <p className="leading-relaxed mb-2">You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Use the Services for any illegal or unauthorized purpose</li>
              <li>Violate any laws, regulations, or third-party rights</li>
              <li>Upload or transmit viruses, malware, or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Services or servers</li>
              <li>Impersonate any person or entity</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Collect or harvest user information without consent</li>
              <li>Use automated systems (bots, scrapers) without permission</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              5. Intellectual Property Rights
            </h3>
            <p className="leading-relaxed mb-3">
              All content, features, and functionality of our Services,
              including but not limited to text, graphics, logos, images,
              software, and design, are owned by Koentjoro or our licensors and
              are protected by copyright, trademark, and other intellectual
              property laws.
            </p>
            <p className="leading-relaxed">
              You may not reproduce, distribute, modify, create derivative
              works, publicly display, republish, download, store, or transmit
              any content from our Services without our prior written consent,
              except for your personal, non-commercial use.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              6. User-Generated Content
            </h3>
            <p className="leading-relaxed mb-3">
              By submitting content to our Services, you grant us a worldwide,
              non-exclusive, royalty-free license to use, reproduce, modify,
              distribute, and display such content in connection with our
              Services.
            </p>
            <p className="leading-relaxed">
              You represent and warrant that you own or have the necessary
              rights to any content you submit, and that such content does not
              violate any third-party rights or applicable laws.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              7. Payment Terms
            </h3>
            <p className="leading-relaxed mb-2">
              For paid services, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide accurate and complete payment information</li>
              <li>Pay all fees and charges at the prices in effect</li>
              <li>Authorize us to charge your payment method</li>
              <li>
                Be responsible for all taxes associated with your purchase
              </li>
            </ul>
            <p className="leading-relaxed mt-3">
              All fees are non-refundable unless otherwise stated. We reserve
              the right to change our pricing at any time.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              8. Termination
            </h3>
            <p className="leading-relaxed">
              We may terminate or suspend your account and access to our
              Services immediately, without prior notice, for any reason,
              including breach of these Terms. Upon termination, your right to
              use the Services will cease immediately. All provisions of these
              Terms that should reasonably survive termination shall survive.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              9. Disclaimers
            </h3>
            <p className="leading-relaxed">
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
              WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL
              WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT
              WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR
              SECURE.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              10. Limitation of Liability
            </h3>
            <p className="leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, KOENTJORO SHALL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
              INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE,
              GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF
              THE SERVICES.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              11. Indemnification
            </h3>
            <p className="leading-relaxed">
              You agree to indemnify, defend, and hold harmless Koentjoro and
              its officers, directors, employees, and agents from any claims,
              liabilities, damages, losses, and expenses, including legal fees,
              arising out of your use of the Services or violation of these
              Terms.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              12. Governing Law
            </h3>
            <p className="leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which Koentjoro operates, without
              regard to its conflict of law provisions. Any disputes arising
              from these Terms shall be resolved in the courts of that
              jurisdiction.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              13. Changes to Terms
            </h3>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms at any time. We will
              notify users of material changes by posting the updated Terms on
              our website. Your continued use of our Services after such changes
              constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              14. Contact Information
            </h3>
            <p className="leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-2 p-4 bg-sky-50 rounded-lg">
              <p className="font-medium text-gray-900">Koentjoro</p>
              <p className="text-gray-700">Email: legal@koentjoro.com</p>
              <p className="text-gray-700">Website: www.koentjoro.com</p>
            </div>
          </section>

          <section className="border-t pt-6">
            <p className="text-xs text-gray-600 italic">
              By using our Services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
