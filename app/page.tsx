import { Suspense } from "react";
import Header from "@/components/Header";
import HomeExplainer from "@/components/HomeExplainer";
import CategoryChips from "@/components/CategoryChips";
import OfferCard from "@/components/OfferCard";
import { getApprovedListings } from "@/lib/data";
import type { Category } from "@/lib/types";

export const dynamic = "force-dynamic";

async function Results({
  searchParams,
}: {
  searchParams: { state?: string; county?: string; category?: string };
}) {
  const offers = await getApprovedListings({
    state: searchParams.state,
    county: searchParams.county,
    category: (searchParams.category as Category) ?? "All",
  });

  return (
    <div className="px-6 pb-16 pt-8 md:px-12">
      <div className="mb-5 flex items-baseline justify-between">
        <h1 className="font-display text-2xl font-normal">{offers.length} offers near you</h1>
        <span className="font-mono text-xs text-[#7c8494]">Sorted by: newest</span>
      </div>

      {offers.length === 0 ? (
        <p className="text-sm text-[#7c8494]">
          No live offers match that filter yet. Try a different category, or{" "}
          <a href="/list-your-business" className="text-maroon font-medium">
            be the first to list one
          </a>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BrowsePage({
  searchParams,
}: {
  searchParams: { state?: string; county?: string; category?: string };
}) {
  return (
    <main className="min-h-screen bg-paper">
      <Header />
      <HomeExplainer />

      <div id="offers" className="border-b border-line px-6 py-6 md:px-12 scroll-mt-6">
        <p className="mb-3 font-mono text-[11.5px] uppercase tracking-wide text-[#7c8494]">Browsing offers in</p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-[160px] rounded-lg border border-line bg-raised px-3.5 py-2.5 text-sm font-medium">
            Pennsylvania
          </div>
          <div className="min-w-[180px] rounded-lg border border-line bg-raised px-3.5 py-2.5 text-sm font-medium">
            Chester County
          </div>
          <div className="min-w-[240px] flex-1 rounded-lg border border-line bg-raised px-3.5 py-2.5 text-sm text-[#7c8494]">
            Search businesses or offers (coming soon)
          </div>
        </div>
        <p className="mt-3 text-xs text-[#9aa0ab]">
          State and county are fixed to the Chester County pilot for now — this becomes a real picker once more
          counties are live.
        </p>
      </div>

      <Suspense fallback={null}>
        <CategoryChips />
      </Suspense>

      <Suspense fallback={<div className="px-6 py-16 md:px-12 text-sm text-[#7c8494]">Loading offers…</div>}>
        <Results searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
