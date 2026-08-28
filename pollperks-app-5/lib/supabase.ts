import { createClient } from "@supabase/supabase-js";

// Server-only client. Uses the SERVICE ROLE key on purpose: everything
// that touches this client runs in Server Components or Route Handlers
// (never in the browser), and the service role key bypasses Row Level
// Security so lib/data.ts doesn't need RLS policies to function. Never
// import this file from a "use client" component, and never expose
// SUPABASE_SERVICE_ROLE_KEY with a NEXT_PUBLIC_ prefix.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error(
    "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and " +
      "SUPABASE_SERVICE_ROLE_KEY in .env.local (see .env.example) — README.md has the full setup steps."
  );
}

export const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false },
});
