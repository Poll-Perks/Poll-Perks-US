import Header from "@/components/Header";
import AdminRow from "@/components/AdminRow";
import { getPendingListings } from "@/lib/data";

export const dynamic = "force-dynamic";

// NOTE: this page has no login check yet — see the README's
// "Before this goes live" section before pointing real people at it.
export default async function AdminQueuePage() {
  const pending = await getPendingListings();

  return (
    <main className="min-h-screen bg-paper">
      <Header compact />

      <div className="px-6 py-10 md:px-12">
        <div className="mb-1.5 flex items-baseline justify-between">
          <h1 className="font-display text-2xl font-normal">Review queue</h1>
          <span className="font-mono text-xs text-[#7c8494]">{pending.length} pending</span>
        </div>
        <p className="mb-7 text-sm text-[#7c8494]">
          New listings wait here until approved. Most take under a minute to review.
        </p>

        <div className="overflow-x-auto rounded-[10px] border border-line bg-raised">
          <div className="min-w-[820px]">
            <div className="grid grid-cols-[2fr_1.3fr_2.4fr_1fr_1.6fr] gap-3 border-b border-line px-5 py-3">
              {["Business", "Location", "Offer", "Status", "Action"].map((h) => (
                <span key={h} className="font-mono text-[11px] uppercase tracking-wide text-[#7c8494]">
                  {h}
                </span>
              ))}
            </div>

            {pending.length === 0 ? (
              <p className="px-5 py-8 text-sm text-[#7c8494]">Nothing waiting for review right now.</p>
            ) : (
              pending.map((listing) => <AdminRow key={listing.id} listing={listing} />)
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
