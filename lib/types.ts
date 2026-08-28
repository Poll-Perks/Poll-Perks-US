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
