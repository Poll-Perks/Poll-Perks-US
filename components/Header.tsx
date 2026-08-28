import Link from "next/link";

function Mark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="22" height="22" rx="4" stroke="#e2818a" strokeWidth="1.6" />
      <path d="M7.5 13.2l3.4 3.4L18.5 9" stroke="#e2818a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center justify-between px-6 py-5 md:px-12 bg-ink text-paper">
      <Link href="/" className="flex items-center gap-3">
        <Mark />
        <span className="font-display text-xl tracking-tight">PollPerks</span>
      </Link>
      {!compact && (
        <div className="flex items-center gap-8 text-sm">
          <Link href="/" className="text-[#cfd4de] hover:text-paper hidden sm:inline">
            Browse offers
          </Link>
          <Link href="/list-your-business" className="text-[#cfd4de] hover:text-paper">
            List your business
          </Link>
        </div>
      )}
      {compact && (
        <Link href="/" className="text-[#cfd4de] hover:text-paper text-sm">
          &larr; Back to browse
        </Link>
      )}
    </div>
  );
}
