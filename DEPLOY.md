# Deploy checklist for My-phase

This checklist will help you deploy the app to staging/production (Vercel, Netlify, or any Node static host).

1) Environment variables
- NEXT_PUBLIC_SUPABASE_URL — the Supabase project URL (public)
- NEXT_PUBLIC_SUPABASE_ANON_KEY — the Supabase anonymous public key

2) Database
- Run the SQL migration `db/001_create_profiles_table.sql` in your Supabase SQL editor or psql to ensure the `profiles` table exists.

3) Build & deploy
- Install dependencies: `npm install` (or `yarn`)
- Build: `npm run build` (or `yarn build`)
- Start: `npm start` (or use your host's deploy flow)

4) Verify runtime behavior
- Visit `/onboarding` and complete the flow.
- Step 1 creates the auth user (via Supabase auth.signUp).
- Step 2 inserts the profile row into the `profiles` table and then redirects users to `/verify-email` where their email verification status is polled. If you prefer to allow immediate access without verification, Step 2 currently supports both modes (see code). 

5) Optional: Swap to your design-system
- The app will automatically attempt to load components from `src/components/design-system/*` at runtime. To use your design-system components, create these files and export default the components:
  - src/components/design-system/Button.jsx
  - src/components/design-system/Input.jsx
  - src/components/design-system/Textarea.jsx
  - src/components/design-system/Select.jsx
  - src/components/design-system/Card.jsx
  - src/components/design-system/NavLink.jsx

  If these files exist, the onboarding will render your components instead of the built-in primitives.

6) Security & cleanups
- Consider cleaning up auth users who never complete onboarding (auth created at step 1). You can run a periodic job to find users without a profile and email them reminders or delete stale accounts.

7) Monitoring
- Add logging around signUp and profile creation failures.
- Track metrics: onboardingStart, onboardingComplete, profileCreated.

8) Rollout
- Deploy to a staging environment first and test the full flow end-to-end using a test Supabase project.
- Once verified, deploy to production and monitor.

If you want, I can:
- Add a CI workflow (GitHub Actions) to run tests and build on PR.
- Create the design-system stub files for you using your brand tokens if you provide them.

