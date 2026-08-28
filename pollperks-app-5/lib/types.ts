export type ListingStatus = "pending" | "approved" | "rejected";

export type Category =
  | "Food & Drink"
  | "Retail"
  | "Services"
  | "Entertainment"
  | "Health & Wellness"
  | "Home & Auto";

export interface Listing {
  id: string;
  business: string;
  address: string;
  county: string;
  state: string;
  category: Category;
  offer: string;
  rules: string;
  contactEmail: string;
  status: ListingStatus;
  submittedAt: string;
  reviewedAt?: string;
}

export interface NewListingInput {
  business: string;
  address: string;
  county: string;
  state: string;
  category: Category;
  offer: string;
  rules: string;
  contactEmail: string;
}

// Lives here, not in lib/data.ts, on purpose: this list is safe to use
// in browser-side components (like the signup form), and lib/data.ts
// also imports lib/supabase.ts, which would otherwise drag the Supabase
// client — and the requirement for a secret key that only exists on
// the server — into the browser bundle of anything that imports it.
export const CATEGORIES: Category[] = [
  "Food & Drink",
  "Retail",
  "Services",
  "Entertainment",
  "Health & Wellness",
  "Home & Auto",
];
