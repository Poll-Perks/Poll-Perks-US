-- PollPerks — Supabase schema
-- Run this once in your Supabase project's SQL Editor (Database → SQL Editor → New query)
-- before pointing the app at Supabase. It creates the listings table and
-- seeds it with the same demo data the app shipped with, so the live
-- site looks identical to what you've been testing locally.

create table if not exists listings (
  id text primary key,
  business text not null,
  address text not null,
  county text not null,
  state text not null,
  category text not null,
  offer text not null,
  rules text not null default '',
  contact_email text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz
);

-- Row Level Security is on by default for new Supabase projects. The app
-- talks to Supabase using the SERVICE ROLE key (server-side only, never
-- shipped to the browser), which bypasses RLS entirely — so no policies
-- are required for the app itself to work. Turn RLS policies on here
-- only if you later let the browser query Supabase directly with the
-- public anon key (e.g. for real-time updates); that's not needed yet.
alter table listings enable row level security;

-- Seed data — matches data/seed.json from the original JSON-file version.
insert into listings (id, business, address, county, state, category, offer, rules, contact_email, status, submitted_at, reviewed_at) values
  ('kennett-creamery', 'Kennett Creamery', '114 State St, Kennett Square, PA 19348', 'Chester County', 'PA', 'Food & Drink', 'Free scoop with any purchase for anyone who shows up to vote today.', 'Limit one free scoop per customer. In-store only, not valid for delivery. Can''t be combined with other offers.', 'owner@kennettcreamery.example', 'approved', '2026-08-01T12:00:00Z', '2026-08-01T15:00:00Z'),
  ('west-chester-coffee-roasters', 'West Chester Coffee Roasters', '22 High St, West Chester, PA 19380', 'Chester County', 'PA', 'Food & Drink', '15% off all bags of beans, all day on Election Day.', 'No blackout dates.', 'hello@wccoffee.example', 'approved', '2026-08-02T09:00:00Z', '2026-08-02T10:00:00Z'),
  ('main-street-hardware', 'Main Street Hardware', '301 Main St, Downingtown, PA 19335', 'Chester County', 'PA', 'Retail', '10% off any single item, storewide.', 'Excludes power tools.', 'info@mainstreethardware.example', 'approved', '2026-08-03T09:00:00Z', '2026-08-03T11:00:00Z'),
  ('downingtown-fitness-co', 'Downingtown Fitness Co.', '88 Wallace Ave, Downingtown, PA 19335', 'Chester County', 'PA', 'Health & Wellness', 'One free guest class, any time this week.', 'New visitors only.', 'team@downingtownfitness.example', 'approved', '2026-08-03T14:00:00Z', '2026-08-03T16:00:00Z'),
  ('phoenixville-print-frame', 'Phoenixville Print & Frame', '410 Bridge St, Phoenixville, PA 19460', 'Chester County', 'PA', 'Services', '$5 off custom framing orders over $40.', 'Valid through Sunday.', 'orders@phoenixvilleframe.example', 'approved', '2026-08-04T09:00:00Z', '2026-08-04T09:30:00Z'),
  ('chester-springs-cinema', 'Chester Springs Cinema', '1 Cinema Way, Chester Springs, PA 19425', 'Chester County', 'PA', 'Entertainment', '$2 off any matinee ticket, every showtime today.', 'Matinee showings only.', 'boxoffice@chesterspringscinema.example', 'approved', '2026-08-04T12:00:00Z', '2026-08-04T13:00:00Z'),
  ('boot-and-barrel-tavern', 'Boot & Barrel Tavern', '55 Gay St, West Chester, PA 19380', 'Chester County', 'PA', 'Food & Drink', '$5 off any entree, dine-in only.', 'Dine-in only, one per table.', 'manager@bootandbarrel.example', 'pending', '2026-08-27T18:00:00Z', null),
  ('sunrise-auto-repair', 'Sunrise Auto Repair', '700 Lincoln Hwy, Coatesville, PA 19320', 'Chester County', 'PA', 'Home & Auto', 'Free tire rotation with any service.', 'Must have an existing service appointment.', 'service@sunriseauto.example', 'pending', '2026-08-27T15:00:00Z', null),
  ('riverbend-books', 'Riverbend Books', '9 Media Ave, Media, PA 19063', 'Delaware County', 'PA', 'Retail', '10% off any single title.', 'In-store only.', 'shop@riverbendbooks.example', 'pending', '2026-08-26T13:00:00Z', null),
  ('franklin-st-bakery', 'Franklin St. Bakery', '12 Franklin St, Columbus, OH 43215', 'Franklin County', 'OH', 'Food & Drink', 'Free coffee with any pastry.', 'One per customer.', 'hello@franklinstbakery.example', 'pending', '2026-08-26T09:00:00Z', null)
on conflict (id) do nothing;
