import { NextRequest, NextResponse } from "next/server";
import { createListing } from "@/lib/data";
import type { NewListingInput } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<NewListingInput>;

  const required: (keyof NewListingInput)[] = [
    "business",
    "address",
    "county",
    "state",
    "category",
    "offer",
    "contactEmail",
  ];
  const missing = required.filter((key) => !body[key]);
  if (missing.length > 0) {
    return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });
  }

  try {
    const listing = await createListing({
      business: body.business!,
      address: body.address!,
      county: body.county!,
      state: body.state!,
      category: body.category!,
      offer: body.offer!,
      rules: body.rules ?? "",
      contactEmail: body.contactEmail!,
    });

    return NextResponse.json({ listing }, { status: 201 });
  } catch (err) {
    // Without this catch, a Supabase failure here crashes the route
    // handler outright and the browser only ever sees a generic,
    // undiagnosable error. Logging the real message server-side (visible
    // in Vercel's Function Logs) and returning it in the response is
    // what makes a failure here actually debuggable.
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("POST /api/listings failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
