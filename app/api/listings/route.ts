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
}
