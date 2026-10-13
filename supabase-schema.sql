-- SIMAS Yayasan — skema Supabase
-- Jalankan di Dashboard Supabase > SQL Editor > New Query > Run

create table if not exists public.assets (
  code text primary key,
  name text not null,
  unit text not null default 'smk',
  room text default 'Gudang',
  cat text default 'Elektronik & TIK',
  value numeric default 0,
  cond text default 'baik',
  fund text default 'Yayasan',
  icon text default 'inventory_2',
  created_at timestamptz default now()
);

create table if not exists public.loans (
  id bigint generated always as identity primary key,
  item text not null,
  borrower text default 'Staf',
  status text default 'Diajukan',
  due text default '3 hari',
  created_at timestamptz default now()
);

create table if not exists public.alerts (
  id bigint generated always as identity primary key,
  code text not null,
  issue text not null,
  vendor text default '',
  due text default '',
  tone text default 'gray',
  action text default 'Proses',
  created_at timestamptz default now()
);

create table if not exists public.activities (
  id bigint generated always as identity primary key,
  title text not null,
  color text default 'primary',
  time text default 'Baru saja',
  detail text default '',
  meta text default '',
  created_at timestamptz default now()
);

create table if not exists public.app_users (
  username text primary key,
  pass text not null default '123456',
  name text not null,
  role text not null default 'pj_ruangan',
  unit text not null default 'smk',
  created_at timestamptz default now()
);

alter table public.assets enable row level security;
alter table public.loans enable row level security;
alter table public.alerts enable row level security;
alter table public.activities enable row level security;
alter table public.app_users enable row level security;

drop policy if exists "public read/write" on public.assets;
create policy "public read/write" on public.assets for all using (true) with check (true);
drop policy if exists "public read/write" on public.loans;
create policy "public read/write" on public.loans for all using (true) with check (true);
drop policy if exists "public read/write" on public.alerts;
create policy "public read/write" on public.alerts for all using (true) with check (true);
drop policy if exists "public read/write" on public.activities;
create policy "public read/write" on public.activities for all using (true) with check (true);
drop policy if exists "public read/write" on public.app_users;
create policy "public read/write" on public.app_users for all using (true) with check (true);
