"use client";

import { useState } from "react";
import type { Listing, ListingStatus } from "@/lib/types";

const STATUS_STYLES: Record<ListingStatus, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-amber-bg", text: "text-amber-text", label: "Pending" },
  approved: { bg: "bg-good-bg", text: "text-good-text", label: "Approved" },
  rejected: { bg: "bg-bad-bg", text: "text-bad-text", label: "Rejected" },
};

export default function AdminRow({ listing }: { listing: Listing }) {
  const [status, setStatus] = useState<ListingStatus>(listing.status);
  const [working, setWorking] = useState(false);

  async function review(decision: "approve" | "reject") {
    setWorking(true);
    try {
      const res = await fetch(`/api/listings/${listing.id}/${decision}`, { method: "POST" });
      if (res.ok) {
        setStatus(decision === "approve" ? "approved" : "rejected");
      }
    } finally {
      setWorking(false);
    }
  }

  const style = STATUS_STYLES[status];

  return (
    <div className="grid grid-cols-[2fr_1.3fr_2.4fr_1fr_1.6fr] items-center gap-3 border-b border-[#e2e5ea] px-5 py-4 text-sm">
      <div>
        <p className="font-medium">{listing.business}</p>
        <p className="mt-0.5 font-mono text-[11.5px] text-[#9aa0ab]">
          {new Date(listing.submittedAt).toLocaleString()}
        </p>
      </div>
      <span className="text-[13.5px] text-[#4d5768]">
        {listing.county}, {listing.state}
      </span>
      <span className="text-[13.5px] text-[#4d5768]">{listing.offer}</span>
      <span
        className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${style.bg} ${style.text}`}
      >
        {style.label}
      </span>
      {status === "pending" ? (
        <div className="flex gap-2">
          <button
            onClick={() => review("approve")}
            disabled={working}
            className="rounded-md bg-good-text px-3 py-1.5 text-[12.5px] font-medium text-white disabled:opacity-60"
          >
            Approve
          </button>
          <button
            onClick={() => review("reject")}
            disabled={working}
            className="rounded-md border border-line bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#4d5768] disabled:opacity-60"
          >
            Reject
          </button>
        </div>
      ) : (
        <span className="font-mono text-xs text-[#9aa0ab]">Reviewed by you</span>
      )}
    </div>
  );
}
