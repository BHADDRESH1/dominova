-- FINAL SETUP SCRIPT
-- Run this entire script in Supabase > SQL Editor to fully configure the backend.

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. CREATE TABLES (Idempotent: using IF NOT EXISTS where safe, or relying on errors if table exists is fine)

-- PROFILES
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  role text check (role in ('owner', 'admin', 'ambassador', 'employee')) not null default 'ambassador',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- EMPLOYEES
create table if not exists public.employees (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id),
  employee_id_code text not null unique,
  full_name text not null,
  designation text not null,
  department text not null,
  date_of_joining date not null,
  employment_type text check (employment_type in ('Full-time', 'Part-time', 'Contract')) not null,
  reporting_manager_id uuid references public.employees(id),
  email text not null,
  contact_number text,
  status text check (status in ('active', 'inactive')) default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SALARIES
create table if not exists public.salaries (
  id uuid primary key default uuid_generate_v4(),
  employee_id uuid references public.employees(id) not null,
  amount decimal(10, 2) not null,
  base_salary decimal(10, 2),
  bonuses decimal(10, 2) default 0,
  deductions decimal(10, 2) default 0,
  payment_status text check (payment_status in ('paid', 'pending', 'processing')) default 'pending',
  payment_date date,
  month text not null,
  year int not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- AMBASSADOR DETAILS (With FIXES included)
create table if not exists public.ambassador_details (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id), -- Removed NOT NULL to allow manual creation
  full_name text, -- Added
  email text,     -- Added
  phone text,     -- Added
  college_name text,
  course text,
  year_of_study text,
  referral_code text unique,
  status text check (status in ('active', 'inactive')) default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- If table already existed without new columns, add them now:
alter table public.ambassador_details alter column profile_id drop not null;
alter table public.ambassador_details add column if not exists full_name text;
alter table public.ambassador_details add column if not exists email text;
alter table public.ambassador_details add column if not exists phone text;

-- STUDENTS
create table if not exists public.students (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text,
  phone text,
  course_interested text,
  referred_by_id uuid references public.ambassador_details(id),
  status text check (status in ('pending', 'verified', 'paid', 'offer_letter_sent', 'joined')) default 'pending',
  payment_proof_url text,
  amount_paid decimal(10, 2),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ENABLE RLS
alter table public.profiles enable row level security;
alter table public.employees enable row level security;
alter table public.salaries enable row level security;
alter table public.ambassador_details enable row level security;
alter table public.students enable row level security;

-- 4. OPEN POLICIES (For Demo/Dev Mode functionality)
-- Drop strict policies first to avoid conflicts
drop policy if exists "Enable insert for authenticated users only" on public.employees;
drop policy if exists "Enable insert for authenticated users only" on public.salaries;
drop policy if exists "Enable insert for authenticated users only" on public.ambassador_details;
drop policy if exists "Enable insert for authenticated users only" on public.students;

-- Apply OPEN policies (Public/Anon access allowed)
create policy "Enable full access for all users" on public.profiles for all using (true) with check (true);
create policy "Enable full access for all users" on public.employees for all using (true) with check (true);
create policy "Enable full access for all users" on public.salaries for all using (true) with check (true);
create policy "Enable full access for all users" on public.ambassador_details for all using (true) with check (true);
create policy "Enable full access for all users" on public.students for all using (true) with check (true);

-- 5. STORAGE BUCKET POLICIES (Required for File Uploads)
-- Note: You must manually create a bucket named 'payment_proofs' in the Supabase Dashboard > Storage.
-- These policies allow public upload/read to that bucket.

begin;
  insert into storage.buckets (id, name, public) 
  values ('payment_proofs', 'payment_proofs', true)
  on conflict (id) do nothing;

  -- Allow public access to storage
  create policy "Public Access" on storage.objects for all using ( bucket_id = 'payment_proofs' ) with check ( bucket_id = 'payment_proofs' );
commit;
