import { AuthForm } from "@/components/AuthForm";

export const metadata = {
  title: "Create account — Nariwal API",
  description: "Create a Nariwal API account and get 50 free credits plus your first API key.",
};

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}
