import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getListingById } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function OfferDetailPage({ params }: { params: { id: string } }) {
  const offer = await getListingById(params.id);
  if (!offer || offer.status !== "approved") notFound();

  const rules = offer.rules
    .split(/\.\s*/)
    .map((r) => r.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-paper">
      <Header compact />

      <div className="mx-auto max-w-[760px] px-6 py-12 md:py-16">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wide text-[#7c8494]">
              {offer.county}, {offer.state} &middot; {offer.category}
            </p>
            <h1 className="font-display text-3xl font-normal">{offer.business}</h1>
          </div>
          <span className="flex-none rounded-full bg-good-bg px-2.5 py-1 text-[11px] font-semibold text-good-text">
            Active
          </span>
        </div>

        <div className="my-7 rounded-xl bg-ink p-7 text-paper">
          <p className="mb-2.5 font-mono text-[11.5px] uppercase tracking-wide text-maroon-light">The offer</p>
          <p className="font-display text-xl leading-snug">{offer.offer}</p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-[10px] border border-line bg-raised px-4.5 py-4">
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wide text-[#7c8494]">Redeem by saying</p>
            <p className="text-[14.5px]">&ldquo;I&apos;m here for the PollPerks offer&rdquo;</p>
          </div>
          <div className="rounded-[10px] border border-line bg-raised px-4.5 py-4">
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wide text-[#7c8494]">Submitted</p>
            <p className="text-[14.5px]">{new Date(offer.submittedAt).toLocaleDateString()}</p>
          </div>
        </div>

        <h2 className="mb-3 font-display text-lg font-normal">Rules &amp; exceptions</h2>
        <ul className="mb-8 list-disc pl-5 text-[14.5px] leading-loose text-[#3a4356]">
          {rules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
          <li>Set by {offer.business}, not PollPerks — contact the business directly with questions.</li>
        </ul>

        <h2 className="mb-3 font-display text-lg font-normal">Location</h2>
        <div className="rounded-[10px] border border-line bg-raised px-4.5 py-4">
          <p className="text-[14.5px] font-medium">{offer.address}</p>
        </div>
      </div>
    </main>
  );
}
