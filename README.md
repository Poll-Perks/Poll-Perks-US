# PollPerks

A nationwide directory of local business offers for anyone who shows up and votes — organized by state, county, and category. Free for businesses to list, forever; the plan is to make money from advertising, never from the businesses themselves.

This is the first working version: a browse page, an offer detail page, a free "list your business" form, and an admin queue to approve or reject new listings before they go public.

## Running it locally

You'll need [Node.js](https://nodejs.org) 18 or newer installed.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. The four screens:

- `/` — browse and filter live offers
- `/offers/[id]` — a single offer's detail page
- `/list-your-business` — the free business signup form
- `/admin` — the review queue (approve or reject new submissions)

## How data works right now

There's no database yet — `data/seed.json` holds every listing, and `lib/data.ts` reads and writes that file directly. That's deliberate: it means the whole app runs with zero setup and zero cost while you're testing the flow. Submitting the business form, or approving/rejecting something in `/admin`, actually edits that file on disk.

**This only works while you're running `npm run dev` (or hosting on a traditional always-on Node server).** It will not persist writes if you deploy to Vercel as-is, because serverless functions there don't share a writable, persistent filesystem — every request can start from a fresh copy of the code. That's fine for showing people the design and flow; it's the signal to do the database swap below before real businesses start submitting real listings.

## Before this goes live

Three things, in order of urgency:

1. **Swap the JSON file for Supabase.** `lib/data.ts` is written so this is a contained change — every function in it (`getApprovedListings`, `createListing`, `reviewListing`, etc.) has one job, and nothing outside that file needs to change when you rewrite their insides to query Supabase's Postgres database instead of the JSON file. This also fixes the serverless-writes problem above.
2. **Put `/admin` and the two `/api/listings/[id]/approve|reject` routes behind real login.** Right now anyone who finds those URLs can approve or reject listings — there's a comment marking this in each of those three files. [NextAuth.js](https://next-auth.js.org) or Supabase Auth are both reasonable, low-cost ways to add a login gate.
3. **Turn on Google AdSense** once there's real traffic, per the monetization plan.

## Deploying

Once the Supabase swap is done, [Vercel](https://vercel.com) has a free tier that comfortably hosts this: push the repo to GitHub, import it in Vercel, add your Supabase connection details as environment variables, and deploy.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS. The color palette and type pairing (Libre Caslon Text for headings, IBM Plex Sans for body text, IBM Plex Mono for labels) match the PollPerks design canvas — see `tailwind.config.ts` for the exact tokens.
