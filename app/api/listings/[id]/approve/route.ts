import { NextRequest, NextResponse } from "next/server";
import { reviewListing } from "@/lib/data";

// NOTE: this route has no auth check yet — anyone who can reach it can
// approve a listing. Fine for local development; before this goes
// live, put the /admin section and these two routes behind real
// login (see the README's "Before this goes live" section).
export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  const listing = await reviewListing(params.id, "approved");
  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }
  return NextResponse.json({ listing });
}
