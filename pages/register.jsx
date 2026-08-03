import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RegisterRedirect() {
  const router = useRouter();
  useEffect(() => {
    // Replace the register route with the new onboarding flow
    router.replace('/onboarding');
  }, [router]);

  return null;
}
