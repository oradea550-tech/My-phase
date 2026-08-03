import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import Button from '../src/components/ui/Button';
import Card from '../src/components/ui/Card';

export default function VerifyEmailPage() {
  const router = useRouter();
  const { email: emailQuery } = router.query;
  const [email, setEmail] = useState('');
  const [checking, setChecking] = useState(true);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState('');
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (typeof emailQuery === 'string') setEmail(emailQuery);
    // try get current user email too
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email && !emailQuery) setEmail(data.user.email);
    })();
  }, [emailQuery]);

  useEffect(() => {
    let mounted = true;
    // Poll for verification status
    const check = async () => {
      try {
        setChecking(true);
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          setMessage('Unable to verify status right now.');
          setChecking(false);
          return;
        }
        const user = data?.user;
        // Supabase user may have `email_confirmed_at` or `confirmed_at`
        const confirmedAt = user?.email_confirmed_at || user?.confirmed_at || null;
        if (confirmedAt) {
          if (mounted) setVerified(true);
          // Navigate home after short delay
          setTimeout(() => router.replace('/'), 800);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setChecking(false);
      }
    };

    // initial check + interval
    check();
    const id = setInterval(check, 4000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [router]);

  const handleResend = async () => {
    setResendLoading(true);
    setMessage('');
    try {
      // Send a magic link so the user can sign in (acts as a resend workaround)
      if (!email) return setMessage('No email available to resend to.');
      const { data, error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        setMessage(error.message || 'Failed to send verification email.');
      } else {
        setMessage('Verification email sent. Check your inbox (and spam).');
      }
    } catch (err) {
      setMessage(err.message || 'Unexpected error while sending.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--bg, #0b0d10)' }}>
      <div style={{ width: '100%', maxWidth: 720 }}>
        <Card>
          <h1 style={{ margin: 0, fontSize: 24, color: 'white' }}>Verify Your Email</h1>
          <p style={{ marginTop: 8, color: 'var(--muted,#9aa0b4)' }}>
            We sent a verification email to <strong>{email}</strong>. Please check your inbox and click the verification link to continue.
          </p>

          <div style={{ marginTop: 14 }}>
            <Button onClick={handleResend} loading={resendLoading}>Resend verification</Button>
          </div>

          {message && <div style={{ marginTop: 12, color: '#9aa0b4' }}>{message}</div>}

          <div style={{ marginTop: 16, color: 'var(--muted,#9aa0b4)' }}>
            While you wait, this page will automatically detect when your email is verified and redirect you to Home.
          </div>
        </Card>
      </div>
    </div>
  );
}
