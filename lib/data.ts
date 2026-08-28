import { supabase } from "./supabase";
import type { Listing, NewListingInput, Category } from "./types";
import { CATEGORIES } from "./types";

export { CATEGORIES };

interface ListingRow {
  id: string;
  business: string;
  address: string;
  county: string;
  state: string;
  category: string;
  offer: string;
  rules: string;
  contact_email: string;
  status: Listing["status"];
  submitted_at: string;
  reviewed_at: string | null;
}

function rowToListing(row: ListingRow): Listing {
  return {
    id: row.id,
    business: row.business,
    address: row.address,
    county: row.county,
    state: row.state,
    category: row.category as Category,
    offer: row.offer,
    rules: row.rules,
    contactEmail: row.contact_email,
    status: row.status,
    submittedAt: row.submitted_at,
    reviewedAt: row.reviewed_at ?? undefined,
  };
}

function slugify(business: string): string {
  const base = business
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base}-${Date.now().toString(36)}`;
}

export async function getApprovedListings(filters?: {
  state?: string;
  county?: string;
  category?: Category | "All";
}): Promise<Listing[]> {
  let query = supabase.from("listings").select("*").eq("status", "approved");

  if (filters?.state) query = query.eq("state", filters.state);
  if (filters?.county) query = query.eq("county", filters.county);
  if (filters?.category && filters.category !== "All") query = query.eq("category", filters.category);

  const { data, error } = await query.order("submitted_at", { ascending: false });
  if (error) throw new Error(`Failed to load offers: ${error.message}`);
  return (data as ListingRow[]).map(rowToListing);
}

export async function getListingById(id: string): Promise<Listing | undefined> {
  const { data, error } = await supabase.from("listings").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`Failed to load listing: ${error.message}`);
  return data ? rowToListing(data as ListingRow) : undefined;
}

export async function getPendingListings(): Promise<Listing[]> {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("status", "pending")
    .order("submitted_at", { ascending: false });
  if (error) throw new Error(`Failed to load pending listings: ${error.message}`);
  return (data as ListingRow[]).map(rowToListing);
}

export async function createListing(input: NewListingInput): Promise<Listing> {
  const row = {
    id: slugify(input.business),
    business: input.business,
    address: input.address,
    county: input.county,
    state: input.state,
    category: input.category,
    offer: input.offer,
    rules: input.rules,
    contact_email: input.contactEmail,
    status: "pending" as const,
    submitted_at: new Date().toISOString(),
  };

  const { data, error } = await supabase.from("listings").insert(row).select().single();
  if (error) throw new Error(`Failed to create listing: ${error.message}`);
  return rowToListing(data as ListingRow);
}

export async function reviewListing(id: string, decision: "approved" | "rejected"): Promise<Listing | undefined> {
  const { data, error } = await supabase
    .from("listings")
    .update({ status: decision, reviewed_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw new Error(`Failed to update listing: ${error.message}`);
  return data ? rowToListing(data as ListingRow) : undefined;
}
