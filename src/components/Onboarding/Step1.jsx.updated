import React, { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient"; // adjust path if needed
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";
import NavLink from "../ui/NavLink";

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
    <Card>
      <h1 style={{ margin: 0, fontSize: 28, color: 'white', letterSpacing: '-0.2px' }}>Welcome to MyPhase</h1>
      <p style={{ marginTop: 8, color: 'var(--muted, #9aa0b4)' }}>You are not your permanent identity. You are living a phase.</p>

      <form onSubmit={handleContinue} style={{ marginTop: 20 }}>
        <label style={{ display: 'block', marginTop: 18, marginBottom: 8, color: 'var(--muted, #9aa0b4)' }}>First Name</label>
        <Input
          aria-label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
        />

        <label style={{ display: 'block', marginTop: 18, marginBottom: 8, color: 'var(--muted, #9aa0b4)' }}>Email</label>
        <Input
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          type="email"
        />

        <label style={{ display: 'block', marginTop: 18, marginBottom: 8, color: 'var(--muted, #9aa0b4)' }}>Password</label>
        <Input
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          type="password"
        />

        <label style={{ display: 'block', marginTop: 18, marginBottom: 8, color: 'var(--muted, #9aa0b4)' }}>Confirm Password</label>
        <Input
          aria-label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          type="password"
        />

        {error && <div style={{ marginTop: 10, color: '#ff6b6b', fontWeight: 500 }}>{error}</div>}

        <Button type="submit" loading={loading}>{loading ? 'Creating...' : 'Continue →'}</Button>
      </form>

      <div style={{ marginTop: 16, textAlign: 'center', color: 'var(--muted, #9aa0b4)' }}>
        Already have an account? <NavLink href="/signin">Sign In</NavLink>
      </div>
    </Card>
  );
}
