const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Cast your ballot",
    body: "Vote in any election, anywhere in the country — local, state, or federal. Primaries count too.",
  },
  {
    step: "02",
    title: "Keep your proof",
    body: "Hang on to your “I Voted” sticker, your poll receipt, or a photo of yourself at your polling place.",
  },
  {
    step: "03",
    title: "Show it, save",
    body: "Bring it to any participating business near you and get their offer. Each one sets its own simple rules.",
  },
];

const VOTER_BENEFITS = [
  {
    title: "Free, real savings",
    body: "Every offer is free to redeem — no purchase required to unlock a deal, no coupon codes, no catch.",
  },
  {
    title: "Support your own town",
    body: "Every listing is a local, independently run business near you — not a national chain.",
  },
  {
    title: "Nonpartisan, always",
    body: "PollPerks never asks who or what you voted for. Showing up is the only requirement.",
  },
];

const BUSINESS_BENEFITS = [
  {
    title: "Free to list, forever",
    body: "PollPerks never charges businesses to join or stay listed. We make money from advertising, not from you.",
  },
  {
    title: "You set the rules",
    body: "Pick your own offer, your own exceptions, and your own dates. Change or pause it anytime.",
  },
  {
    title: "New foot traffic",
    body: "Get discovered by engaged neighbors actively looking for a reason to spend local that week.",
  },
];

export default function HomeExplainer() {
  return (
    <div className="border-b border-line bg-ink text-paper">
      <div className="px-6 pb-14 pt-14 md:px-12 md:pb-20 md:pt-20">
        <p className="mb-4 font-mono text-[11.5px] uppercase tracking-wide text-maroon-light">
          Nationwide &middot; County by county
        </p>
        <h1 className="max-w-2xl font-display text-[34px] leading-[1.15] tracking-tight md:text-[46px]">
          Vote. Save your proof. Get rewarded near you.
        </h1>
        <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-[#cfd4de]">
          PollPerks is a free, nonpartisan directory of local businesses offering something back to anyone who
          shows up and votes. No party, no candidate — just a nationwide high-five for participating.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#offers"
            className="rounded-lg bg-maroon px-5 py-3 text-[14px] font-semibold text-paper hover:bg-maroon-deep transition-colors"
          >
            Browse offers
          </a>
          <a
            href="/list-your-business"
            className="rounded-lg border border-[#3a4356] px-5 py-3 text-[14px] font-semibold text-paper hover:border-paper transition-colors"
          >
            List your business — it&rsquo;s free
          </a>
        </div>
      </div>

      <div className="border-t border-[#2a3348] bg-[#131b2c] px-6 py-12 md:px-12 md:py-16">
        <p className="mb-8 font-mono text-[11.5px] uppercase tracking-wide text-[#7c8494]">How it works</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step}>
              <p className="mb-2 font-display text-2xl text-maroon-light">{item.step}</p>
              <p className="mb-1.5 text-[16.5px] font-semibold text-paper">{item.title}</p>
              <p className="text-[14px] leading-relaxed text-[#a6adbb]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#2a3348] px-6 py-12 md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <p className="mb-1 text-[13px] font-semibold uppercase tracking-wide text-maroon-light">For voters</p>
            <p className="mb-6 font-display text-xl text-paper">Show up, then treat yourself.</p>
            <div className="flex flex-col gap-5">
              {VOTER_BENEFITS.map((item) => (
                <div key={item.title} className="border-l-2 border-maroon pl-4">
                  <p className="mb-1 text-[14.5px] font-semibold text-paper">{item.title}</p>
                  <p className="text-[13.5px] leading-relaxed text-[#a6adbb]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1 text-[13px] font-semibold uppercase tracking-wide text-maroon-light">For businesses</p>
            <p className="mb-6 font-display text-xl text-paper">Meet your neighbors halfway.</p>
            <div className="flex flex-col gap-5">
              {BUSINESS_BENEFITS.map((item) => (
                <div key={item.title} className="border-l-2 border-maroon pl-4">
                  <p className="mb-1 text-[14.5px] font-semibold text-paper">{item.title}</p>
                  <p className="text-[13.5px] leading-relaxed text-[#a6adbb]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
