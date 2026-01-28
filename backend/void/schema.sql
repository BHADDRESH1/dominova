-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Users)
-- Links to auth.users. Handles specific user roles (owner, admin, ambassador).
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  role text check (role in ('owner', 'admin', 'ambassador', 'employee')) not null default 'ambassador',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- EMPLOYEES
-- Details for internal staff (Admin, HR, etc.)
create table public.employees (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id), -- Optional link if they have a login
  employee_id_code text not null unique, -- e.g. EMP001
  full_name text not null,
  designation text not null, -- HR, Trainer, Developer...
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
-- Monthly salary records
create table public.salaries (
  id uuid primary key default uuid_generate_v4(),
  employee_id uuid references public.employees(id) not null,
  amount decimal(10, 2) not null,
  base_salary decimal(10, 2),
  bonuses decimal(10, 2) default 0,
  deductions decimal(10, 2) default 0,
  payment_status text check (payment_status in ('paid', 'pending', 'processing')) default 'pending',
  payment_date date,
  month text not null, -- e.g. "January"
  year int not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PERFORMANCE REVIEWS
-- Monthly performance tracking
create table public.performance_reviews (
  id uuid primary key default uuid_generate_v4(),
  employee_id uuid references public.employees(id) not null,
  review_date date not null, -- usually end of month
  rating text check (rating in ('Excellent', 'Good', 'Needs Improvement')) not null,
  remarks text,
  goals_met boolean,
  created_by uuid references public.profiles(id), -- Admin/Owner who reviewed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- AMBASSADOR DETAILS
-- Specific details for student ambassadors
create table public.ambassador_details (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) not null unique,
  college_name text,
  course text,
  year_of_study text,
  referral_code text unique,
  status text check (status in ('active', 'inactive')) default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- STUDENTS (Leads/Referrals by Ambassadors)
create table public.students (
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

-- ROW LEVEL SECURITY (RLS) POLICIES

-- Profiles: 
-- Owner can View/Edit All. 
-- Admin can View All, Edit Ambassadors/Employees.
-- Users can View/Edit specific fields of their own profile.
alter table public.profiles enable row level security;

-- Employees:
-- Owner: Full Access
-- Admin: View All, Edit some fields
alter table public.employees enable row level security;

-- Salaries:
-- Owner: Full Access
-- Admin: No Access (or View Only if allowed, prompt says "Owner Access Only")
alter table public.salaries enable row level security;

-- Performance:
-- Owner/Admin: Full Access
alter table public.performance_reviews enable row level security;

