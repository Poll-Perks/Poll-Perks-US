# PollPerks

A nationwide directory of local business offers for anyone who shows up and votes — organized by state, county, and category. Free for businesses to list, forever; the plan is to make money from advertising, never from the businesses themselves.

This is the first working version: a browse page, an offer detail page, a free "list your business" form, and an admin queue to approve or reject new listings before they go public.

## Setting up Supabase (do this first)

The app stores listings in a Supabase Postgres database — Supabase's free tier covers this comfortably.

1. Create a free project at [supabase.com](https://supabase.com).
2. In your new project, go to **SQL Editor → New query**, paste in the contents of `supabase/schema.sql`, and run it. This creates the `listings` table and seeds it with the same demo data the app was built with (Kennett Creamery and friends), so it looks identical to what you've been testing.
3. Go to **Project Settings → API** and copy two values: the **Project URL** and the **service_role** key (not the `anon` key — the service role key is what lets the app write new listings and approvals; keep it secret, never put it in client-side code).
4. Copy `.env.example` to a new file named `.env.local` and paste those two values in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

## Running it locally

You'll need [Node.js](https://nodejs.org) 18 or newer installed, and the Supabase setup above done first.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. The four screens:

- `/` — browse and filter live offers
- `/offers/[id]` — a single offer's detail page
- `/list-your-business` — the free business signup form
- `/admin` — the review queue (approve or reject new submissions)

Submitting the business form, or approving/rejecting something in `/admin`, writes directly to your Supabase database — and because it's a real database rather than a local file, those writes work the same way whether you're running this on your laptop or deployed on Vercel.

## Before this goes live

Two things left, in order of urgency:

1. **Put `/admin` and the two `/api/listings/[id]/approve|reject` routes behind real login.** Right now anyone who finds those URLs can approve or reject listings — there's a comment marking this in each of those three files. [NextAuth.js](https://next-auth.js.org) or Supabase Auth are both reasonable, low-cost ways to add a login gate. (Once you add real auth, it's also worth turning on Row Level Security policies in Supabase — `supabase/schema.sql` has a note on why that's not required yet.)
2. **Turn on Google AdSense** once there's real traffic, per the monetization plan.

## Deploying

[Vercel](https://vercel.com) has a free tier that comfortably hosts this: push the repo to GitHub (already done), import it in Vercel, add the same two environment variables from `.env.local` in the Vercel project's settings, and deploy. That's also the point where you'd point pollperks.us's DNS at the deployment — Vercel's domain settings walk you through it once the site is live on a `*.vercel.app` URL.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase (Postgres). The color palette and type pairing (Libre Caslon Text for headings, IBM Plex Sans for body text, IBM Plex Mono for labels) match the PollPerks design canvas — see `tailwind.config.ts` for the exact tokens.

`data/seed.json` is no longer read by the app — it's kept only as the human-readable source the Supabase seed data in `supabase/schema.sql` was generated from.
