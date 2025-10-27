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

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignUp?: () => void;
  onSwitchToForgotPassword?: () => void;
}

export function SignInDialog({
  open,
  onOpenChange,
  onSwitchToSignUp,
  onSwitchToForgotPassword,
}: SignInDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement email/password sign in logic
    console.log("Sign in with:", { email, password });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Close dialog on success
      // onOpenChange(false);
    }, 1000);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    // TODO: Implement Google OAuth sign in logic
    console.log("Sign in with Google");

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Close dialog on success
      // onOpenChange(false);
    }, 1000);
  };

  const handleSwitchToSignUp = () => {
    onOpenChange(false);
    onSwitchToSignUp?.();
  };

  const handleSwitchToForgotPassword = () => {
    onOpenChange(false);
    onSwitchToForgotPassword?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="text-center">
            Sign in to your account to continue
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Google Sign In Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 text-base font-medium"
            onClick={handleGoogleSignIn}
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
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-xs text-sky-600 hover:text-sky-700 hover:underline"
                  onClick={handleSwitchToForgotPassword}
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-sky-600 hover:bg-sky-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-sky-600 hover:text-sky-700 font-medium hover:underline"
              onClick={handleSwitchToSignUp}
            >
              Sign up
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
