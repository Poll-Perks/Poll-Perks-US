import { promises as fs } from "fs";
import path from "path";
import type { Listing, NewListingInput, Category } from "./types";

// --- Data layer -------------------------------------------------------
// Everything below reads and writes a single JSON file (data/seed.json)
// so the app runs with zero setup and zero cost. It's a stand-in for a
// real database, not a design decision: every function here has a
// narrow, obvious job, so swapping the body of each one for a Supabase
// query later is a small, mechanical change — nothing that calls these
// functions (the pages, the API routes) needs to change at all.
//
// Known limitation: writing to a JSON file only works reliably on a
// single, persistent server (e.g. `npm run dev`, or a traditional
// Node host). It will NOT persist writes on Vercel's serverless
// functions, because each request can run on a fresh, read-only
// filesystem. That's the trigger to do the Supabase swap described in
// the README — this file is deliberately structured to make that swap
// easy, not to be a permanent database.

const DATA_FILE = path.join(process.cwd(), "data", "seed.json");

async function readAll(): Promise<Listing[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Listing[];
}

async function writeAll(listings: Listing[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(listings, null, 2) + "\n", "utf-8");
}

function slugify(business: string): string {
  const base = business
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base}-${Date.now().toString(36)}`;
}

export const CATEGORIES: Category[] = [
  "Food & Drink",
  "Retail",
  "Services",
  "Entertainment",
  "Health & Wellness",
  "Home & Auto",
];

export async function getApprovedListings(filters?: {
  state?: string;
  county?: string;
  category?: Category | "All";
}): Promise<Listing[]> {
  const all = await readAll();
  return all.filter((listing) => {
    if (listing.status !== "approved") return false;
    if (filters?.state && listing.state !== filters.state) return false;
    if (filters?.county && listing.county !== filters.county) return false;
    if (filters?.category && filters.category !== "All" && listing.category !== filters.category) return false;
    return true;
  });
}

export async function getListingById(id: string): Promise<Listing | undefined> {
  const all = await readAll();
  return all.find((listing) => listing.id === id);
}

export async function getPendingListings(): Promise<Listing[]> {
  const all = await readAll();
  return all
    .filter((listing) => listing.status === "pending")
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

export async function createListing(input: NewListingInput): Promise<Listing> {
  const all = await readAll();
  const listing: Listing = {
    ...input,
    id: slugify(input.business),
    status: "pending",
    submittedAt: new Date().toISOString(),
  };
  all.push(listing);
  await writeAll(all);
  return listing;
}

export async function reviewListing(id: string, decision: "approved" | "rejected"): Promise<Listing | undefined> {
  const all = await readAll();
  const listing = all.find((l) => l.id === id);
  if (!listing) return undefined;
  listing.status = decision;
  listing.reviewedAt = new Date().toISOString();
  await writeAll(all);
  return listing;
}
