-- Create profiles table for MyPhase onboarding
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid, -- link to auth.users.id (optional)
  first_name text,
  email text,
  country text,
  city text,
  phase text,
  goal text,
  duration text,
  reason text,
  created_at timestamptz DEFAULT now()
);

-- Optional: index on user_id and email
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
