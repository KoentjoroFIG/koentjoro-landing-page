import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { CheckCircle } from "lucide-react";

interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBackToSignIn?: () => void;
}

export function ForgotPasswordDialog({
  open,
  onOpenChange,
  onBackToSignIn,
}: ForgotPasswordDialogProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement forgot password logic
    console.log("Reset password for:", email);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 1000);
  };

  const handleBackToSignIn = () => {
    onOpenChange(false);
    setIsEmailSent(false);
    setEmail("");
    onBackToSignIn?.();
  };

  const handleClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      // Reset state when dialog closes
      setTimeout(() => {
        setIsEmailSent(false);
        setEmail("");
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {!isEmailSent ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Forgot Password?
              </DialogTitle>
              <DialogDescription className="text-center">
                Enter your email and we'll send you a link to reset your
                password
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-sky-600 hover:bg-sky-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              {/* Back to Sign In Link */}
              <div className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <button
                  type="button"
                  className="text-sky-600 hover:text-sky-700 font-medium hover:underline"
                  onClick={handleBackToSignIn}
                >
                  Back to sign in
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <DialogTitle className="text-2xl font-bold text-center">
                Check Your Email
              </DialogTitle>
              <DialogDescription className="text-center">
                We've sent a password reset link to{" "}
                <span className="font-medium text-gray-900">{email}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 text-sm text-gray-700">
                <p className="mb-2">
                  Click the link in the email to reset your password. The link
                  will expire in 24 hours.
                </p>
                <p className="text-gray-600">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    type="button"
                    className="text-sky-600 hover:text-sky-700 font-medium hover:underline"
                    onClick={() => {
                      setIsEmailSent(false);
                      handleSubmit(new Event("submit") as any);
                    }}
                  >
                    resend it
                  </button>
                  .
                </p>
              </div>

              <Button
                type="button"
                className="w-full h-11 bg-sky-600 hover:bg-sky-700 text-white"
                onClick={handleBackToSignIn}
              >
                Back to Sign In
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
