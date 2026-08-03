import React, { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient"; // adjust path if needed

const PHASE_OPTIONS = [
  "Career Change",
  "Starting a Startup",
  "Learning Programming",
  "Learning English",
  "University / College",
  "Financial Goal",
  "Fitness Journey",
  "Health Recovery",
  "Mental Health",
  "Breaking a Habit",
  "Relationship",
  "Divorce Recovery",
  "New Parent",
  "Moving to a New City",
  "Immigration",
  "Grief Recovery",
  "Creative Project",
  "Business Growth",
  "Personal Development",
  "Travel Preparation",
  "Other...",
];

const DURATION_OPTIONS = [
  "1 Month",
  "3 Months",
  "6 Months",
  "9 Months",
  "12 Months",
  "More than 12 Months",
];

export default function Step2({ init = {}, onBack }) {
  const router = useRouter();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phase, setPhase] = useState(PHASE_OPTIONS[0]);
  const [otherPhase, setOtherPhase] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState(DURATION_OPTIONS[0]);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!country.trim()) return setError("Please enter your country.");
    if (!city.trim()) return setError("Please enter your city.");
    if (!goal.trim()) return setError("Please describe your goal.");

    const finalPhase = phase === "Other..." ? (otherPhase.trim() || "Other") : phase;
    setLoading(true);

    try {
      // Gather profile
      // If init.user_id exists link to user_id, otherwise just store email
      const payload = {
        user_id: init.user_id || null,
        first_name: init.first_name || null,
        email: init.email || null,
        country,
        city,
        phase: finalPhase,
        goal,
        duration,
        reason: reason || null,
        created_at: new Date().toISOString(),
      };

      const { error: insertError } = await supabase.from("profiles").insert([payload]);

      if (insertError) {
        setError(insertError.message || "Failed to create profile.");
        setLoading(false);
        return;
      }

      // Success: navigate to Home
      router.push("/");
    } catch (err) {
      setError(err.message || "Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={card}>
      <button onClick={onBack} style={backButton}>← Back</button>

      <h1 style={title}>Tell us about your current phase</h1>

      <form onSubmit={submit}>
        <label style={label}>Country</label>
        <input style={input} value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />

        <label style={label}>City</label>
        <input style={input} value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />

        <label style={label}>Current Phase</label>
        <select style={select} value={phase} onChange={(e) => setPhase(e.target.value)}>
          {PHASE_OPTIONS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {phase === "Other..." && (
          <>
            <label style={label}>Enter your phase</label>
            <input style={input} value={otherPhase} onChange={(e) => setOtherPhase(e.target.value)} placeholder="Enter your phase" />
          </>
        )}

        <label style={label}>My Goal</label>
        <textarea
          style={textarea}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Describe what you want to achieve during this phase..."
        />

        <label style={label}>Expected Duration</label>
        <select style={select} value={duration} onChange={(e) => setDuration(e.target.value)}>
          {DURATION_OPTIONS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <label style={{ ...label, marginTop: 14 }}>Why did you join MyPhase? (optional)</label>
        <textarea style={textarea} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Write a few words..." />

        {error && <div style={errorStyle}>{error}</div>}

        <button type="submit" style={{ ...button, opacity: loading ? 0.8 : 1 }} disabled={loading}>
          {loading ? "Creating account..." : "Create MyPhase Account"}
        </button>
      </form>
    </div>
  );
}

/* Styles — keep consistent visual style with Step1 */
const card = {
  borderRadius: 12,
  padding: 28,
  background: "rgba(255,255,255,0.02)",
  boxShadow: "0 6px 18px rgba(2,8,23,0.5)",
};
const backButton = { background: "transparent", color: "var(--muted,#9aa0b4)", border: "none", cursor: "pointer", marginBottom: 8 };
const title = { margin: 0, fontSize: 22, color: "white" };
const label = { display: "block", marginTop: 14, marginBottom: 8, color: "var(--muted, #9aa0b4)" };
const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.04)",
  background: "rgba(255,255,255,0.02)",
  color: "white",
  outline: "none",
};
const textarea = { ...input, minHeight: 100, resize: "vertical" };
const select = { ...input, appearance: "none" };
const button = {
  marginTop: 18,
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
