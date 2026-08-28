import Link from "next/link";
import type { Listing } from "@/lib/types";

export default function OfferCard({ offer }: { offer: Listing }) {
  return (
    <Link
      href={`/offers/${offer.id}`}
      className="flex flex-col gap-3 rounded-[10px] border border-line bg-raised p-5 hover:border-ink transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-[16.5px] font-semibold text-ink">{offer.business}</p>
          <p className="font-mono text-[11.5px] uppercase tracking-wide text-[#7c8494]">
            {offer.county}, {offer.state}
          </p>
        </div>
        <span className="whitespace-nowrap rounded-full bg-maroon-tint px-2.5 py-1 text-[11px] font-semibold text-maroon-deep">
          {offer.category}
        </span>
      </div>
      <p className="text-[14.5px] leading-relaxed text-[#3a4356]">{offer.offer}</p>
      <div className="mt-auto flex items-center justify-between border-t border-[#e2e5ea] pt-2.5">
        <span className="font-mono text-[11.5px] text-[#7c8494] truncate pr-2">{offer.rules}</span>
        <span className="text-[13.5px] font-medium text-maroon whitespace-nowrap">View offer &rarr;</span>
      </div>
    </Link>
  );
}
