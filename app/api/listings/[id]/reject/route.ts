import { NextRequest, NextResponse } from "next/server";
import { reviewListing } from "@/lib/data";

// See the note in ../approve/route.ts — same missing-auth caveat applies here.
export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  const listing = await reviewListing(params.id, "rejected");
  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }
  return NextResponse.json({ listing });
}
