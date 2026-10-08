import { AuthForm } from "@/components/AuthForm";

export const metadata = {
  title: "Sign in — Nariwal API",
  description: "Sign in to your Nariwal API account to manage keys, credits, and usage.",
};

export default function SignInPage() {
  return <AuthForm mode="signin" />;
}
