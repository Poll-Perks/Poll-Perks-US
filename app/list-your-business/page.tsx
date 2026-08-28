"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { CATEGORIES } from "@/lib/data";
import type { Category } from "@/lib/types";

export default function ListYourBusinessPage() {
  const [category, setCategory] = useState<Category>("Food & Drink");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      business: String(form.get("business") ?? ""),
      address: String(form.get("address") ?? ""),
      county: String(form.get("county") ?? ""),
      state: String(form.get("state") ?? ""),
      category,
      offer: String(form.get("offer") ?? ""),
      rules: String(form.get("rules") ?? ""),
      contactEmail: String(form.get("contactEmail") ?? ""),
    };

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-paper">
      <Header compact />

      <div className="mx-auto max-w-[640px] px-6 py-14 md:py-16">
        {submitted ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-good-bg">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M6 13.5l5 5L20 8" stroke="#2c6144" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="mb-3 font-display text-2xl font-normal">Thanks — your listing is in review</h1>
            <p className="mx-auto max-w-[46ch] text-[15px] leading-relaxed text-[#4d5768]">
              A real person checks every new listing before it goes live — usually the same day. We&apos;ll email
              you once it&apos;s approved.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <p className="font-mono text-[11.5px] uppercase tracking-wide text-[#7c8494]">Free, always</p>
            <h1 className="font-display text-3xl font-normal">List your business</h1>
            <p className="mb-2 text-[15px] leading-relaxed text-[#4d5768]">
              PollPerks never charges businesses to list an offer — we make money from ads, not from you. Fill this
              in, and a real person reviews it before it goes public.
            </p>

            <Field label="Business name">
              <input name="business" required placeholder="e.g. Kennett Creamery" className="input" />
            </Field>

            <Field label="Street address">
              <input name="address" required placeholder="Street, city, state, ZIP" className="input" />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="County">
                <input name="county" required placeholder="e.g. Chester County" className="input" />
              </Field>
              <Field label="State">
                <input name="state" required placeholder="e.g. PA" maxLength={2} className="input uppercase" />
              </Field>
            </div>

            <Field label="Category">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                      category === c ? "border-ink bg-ink text-paper" : "border-line bg-white text-[#3a4356]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Your offer">
              <textarea
                name="offer"
                required
                rows={3}
                placeholder="e.g. Free scoop with any purchase for anyone who voted today"
                className="input"
              />
            </Field>

            <Field label="Rules & exceptions (optional — write it however makes sense to you)">
              <textarea
                name="rules"
                rows={3}
                placeholder="e.g. Limit one per customer, in-store only, can't combine with other offers"
                className="input"
              />
            </Field>

            <Field label="Contact email">
              <input
                type="email"
                name="contactEmail"
                required
                placeholder="you@yourbusiness.com"
                className="input"
              />
              <p className="mt-2 font-mono text-xs text-[#7c8494]">
                Only used for approval status — never shown publicly.
              </p>
            </Field>

            {error && <p className="text-sm text-bad-text">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 rounded-lg bg-ink px-5 py-3.5 font-sans text-[15px] font-medium text-paper disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit for review"}
            </button>
            <p className="-mt-1.5 text-center font-mono text-xs text-[#7c8494]">
              No cost now, no cost ever — this offer is free advertising for your business.
            </p>
          </form>
        )}
      </div>

      <style>{`
        .input {
          width: 100%;
          font-family: inherit;
          font-size: 14.5px;
          color: #172136;
          background: #fff;
          border: 1px solid #d3d7de;
          border-radius: 8px;
          padding: 11px 13px;
          outline: none;
        }
        .input:focus { border-color: #8c2f39; }
      `}</style>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-medium text-[#4d5768]">{label}</span>
      {children}
    </label>
  );
}
