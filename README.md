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

## Admin login

`/admin` and the two `/api/listings/[id]/approve|reject` routes are locked behind a simple username + password prompt (your browser's built-in login box — `middleware.ts` checks it before any of those pages/routes run).

To set it up, add two environment variables — in Vercel's project settings (**Settings → Environment Variables**) for the live site, and in `.env.local` if you want to test it locally too:

```
ADMIN_USER=pick-a-username
ADMIN_PASSWORD=pick-a-real-password
```

Pick your own values — anything works, there's no default. If these two variables aren't set, every `/admin` request is blocked outright rather than left open, so the site can't accidentally ship unprotected. After adding or changing them in Vercel, redeploy for the change to take effect (Vercel does this automatically on the next push, or you can trigger a redeploy manually from the Deployments tab).

Once set, visiting `pollperks.us/admin` will pop up a login box — enter the username and password you chose. The browser remembers it for the session, so you won't be asked again until you close the browser.

(Once there's a real login, it's also worth turning on Row Level Security policies in Supabase — `supabase/schema.sql` has a note on why that's not required yet.)

## Turning on Google AdSense

The code is ready for this — it's just waiting on your AdSense account, which only you can create (it's tied to your Google account and your own tax/payment details). Steps:

1. Apply at [adsense.google.com](https://adsense.google.com) with `pollperks.us` as your site.
2. Google will ask you to verify you own the site. The easiest way here is adding your AdSense ID as described in step 3 below and redeploying — Google can detect that script tag automatically. (They may also want a `public/ads.txt` file with a specific line they'll give you; if so, add that file with the exact content Google shows you and redeploy.)
3. Once approved, Google gives you a publisher ID that looks like `ca-pub-1234567890123456`. Add it as an environment variable in Vercel:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-1234567890123456
   ```
   and redeploy. That alone turns on the AdSense script sitewide — Google's system then decides where and when to actually show ads (or you can add specific ad placements later once you see how it looks).

Realistically, AdSense approval usually wants to see some real traffic and original content on the site first — it's common to get rejected on a very new, low-traffic site and need to reapply later. That's fine; nothing else here depends on it, and the toggle above is ready whenever approval comes through.

## Deploying

[Vercel](https://vercel.com) has a free tier that comfortably hosts this: push the repo to GitHub (already done), import it in Vercel, add the same two environment variables from `.env.local` in the Vercel project's settings, and deploy. That's also the point where you'd point pollperks.us's DNS at the deployment — Vercel's domain settings walk you through it once the site is live on a `*.vercel.app` URL.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase (Postgres). The color palette and type pairing (Libre Caslon Text for headings, IBM Plex Sans for body text, IBM Plex Mono for labels) match the PollPerks design canvas — see `tailwind.config.ts` for the exact tokens.

`data/seed.json` is no longer read by the app — it's kept only as the human-readable source the Supabase seed data in `supabase/schema.sql` was generated from.
