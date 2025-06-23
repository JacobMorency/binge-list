"use client";

import { User, Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "@/app/components/ui/button";
import supabase from "@/app/lib/supabaseClient";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
  const [passwordEmpty, setPasswordEmpty] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailEmpty(false);
    setPasswordEmpty(false);
    setError("");

    let hasError = false;

    if (!email) {
      setEmailEmpty(true);
      hasError = true;
    }

    if (!password) {
      setPasswordEmpty(true);
      hasError = true;
    }

    // Stops for the form from being submitted so the supabase error message does not appear if a field is blank
    if (hasError) {
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user && data.session) {
        router.push("/dashboard");
      } else {
        console.error("Login failed: User or session is null");
      }
    } catch (err) {
      console.error("An unexpected error occurred during login:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl mb-4">Login</h2>
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}
      <form action="" onSubmit={handleLogin}>
        <div className="form-group flex flex-col mb-4 space-y-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="form-control p-2 rounded bg-base-300 border border-neutral-600 focus:border-primary focus:outline-none"
            required
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailEmpty(e.target.value.trim() === "");
            }}
          />
        </div>
        <div className="form-group flex flex-col mb-4 space-y-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="form-control p-2 rounded bg-base-300 border border-neutral-600 focus:border-primary focus:outline-none"
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordEmpty(e.target.value.trim() === "");
            }}
          />
          <a href="#" className="text-primary text-sm">
            Forgot password?
          </a>
        </div>
        <Button className="w-full" type={"submit"}>
          Login
        </Button>
      </form>
    </div>
  );
}
