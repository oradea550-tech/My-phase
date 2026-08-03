import React, { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient"; // adjust path if needed

export default function Step1({ init = {}, onContinue }) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(init.first_name || "");
  const [email, setEmail] = useState(init.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!firstName.trim()) return "First name is required.";
    if (!email.trim()) return "Email is required.";
    if (!password || password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) return setError(v);

    try {
      setLoading(true);
      // Create Supabase auth user at Step 1
      const { data, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
        },
        {
          data: { first_name: firstName },
        }
      );

      if (signUpError) {
        setError(signUpError.message || "Sign up failed.");
        setLoading(false);
        return;
      }

      // If signUp returns user object, proceed to step 2 keeping user ID
      onContinue({ first_name: firstName, email, password }, data);
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={card}>
      <h1 style={title}>Welcome to MyPhase</h1>
      <p style={subtitle}>You are not your permanent identity. You are living a phase.</p>

      <form onSubmit={handleContinue} style={{ marginTop: 20 }}>
        <label style={label}>First Name</label>
        <input
          aria-label="First name"
          style={input}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
        />

        <label style={label}>Email</label>
        <input
          aria-label="Email"
          style={input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          type="email"
        />

        <label style={label}>Password</label>
        <input
          aria-label="Password"
          style={input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          type="password"
        />

        <label style={label}>Confirm Password</label>
        <input
          aria-label="Confirm password"
          style={input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          type="password"
        />

        {error && <div style={errorStyle}>{error}</div>}

        <button type="submit" style={{ ...button, opacity: loading ? 0.7 : 1 }} disabled={loading}>
          {loading ? "Creating..." : "Continue →"}
        </button>
      </form>

      <div style={{ marginTop: 16, textAlign: "center", color: "var(--muted, #9aa0b4)" }}>
        Already have an account?{" "}
        <a href="/signin" style={{ color: "var(--accent, #9b6cff)", textDecoration: "underline" }}>
          Sign In
        </a>
      </div>
    </div>
  );
}

/* Styles (inline for easy integration; replace with your design tokens) */
const card = {
  borderRadius: 12,
  padding: 28,
  background: "rgba(255,255,255,0.02)",
  boxShadow: "0 6px 18px rgba(2,8,23,0.5)",
};
const title = { margin: 0, fontSize: 28, color: "white", letterSpacing: "-0.2px" };
const subtitle = { marginTop: 8, color: "var(--muted, #9aa0b4)" };
const label = { display: "block", marginTop: 18, marginBottom: 8, color: "var(--muted, #9aa0b4)" };
const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.04)",
  background: "rgba(255,255,255,0.02)",
  color: "white",
  outline: "none",
  boxSizing: "border-box",
  boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.01)",
};
const button = {
  marginTop: 20,
  width: "100%",
  padding: "12px 16px",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(90deg, #8A6CFF, #6F42C1)",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 6px 18px rgba(111,66,193,0.18)",
};
const errorStyle = { marginTop: 10, color: "#ff6b6b", fontWeight: 500 };
