"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types";

const CATEGORIES: (Category | "All")[] = [
  "All",
  "Food & Drink",
  "Retail",
  "Services",
  "Entertainment",
  "Health & Wellness",
  "Home & Auto",
];

export default function CategoryChips() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "All";

  function pick(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 px-6 py-4 md:px-12 border-b border-line">
      {CATEGORIES.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            onClick={() => pick(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
              isActive ? "bg-ink text-paper border-ink" : "bg-raised text-[#3a4356] border-line hover:border-ink"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
