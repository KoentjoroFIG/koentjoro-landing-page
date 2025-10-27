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
import { GoogleIcon } from "@/components/atoms/Icons/google";

interface SignUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignIn?: () => void;
}

export function SignUpDialog({
  open,
  onOpenChange,
  onSwitchToSignIn,
}: SignUpDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsLoading(true);

    // TODO: Implement email/password sign up logic
    console.log("Sign up with:", { name, email, password });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Close dialog on success
      // onOpenChange(false);
    }, 1000);
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);

    // TODO: Implement Google OAuth sign up logic
    console.log("Sign up with Google");

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Close dialog on success
      // onOpenChange(false);
    }, 1000);
  };

  const handleSwitchToSignIn = () => {
    onOpenChange(false);
    onSwitchToSignIn?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Create Account
          </DialogTitle>
          <DialogDescription className="text-center">
            Sign up to get started
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Google Sign Up Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 text-base font-medium"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            <GoogleIcon className="w-5 h-5" />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">
                Must be at least 8 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-sky-600 hover:bg-sky-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              className="text-sky-600 hover:text-sky-700 font-medium hover:underline"
              onClick={handleSwitchToSignIn}
            >
              Sign in
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
