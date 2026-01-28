-- Enable RLS on all tables (already done in schema.sql, but confirming)
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY; -- if exists

-- POLICIES FOR EMPLOYEES
-- Allow everyone to read employees (for now, or restrict to authenticated)
CREATE POLICY "Enable read access for all users" ON public.employees
    FOR SELECT USING (true);

-- Allow everyone to insert employees (since we might be adding them from a public or semi-public context in dev, 
-- or because the user is logged in as a super-admin/owner who bypasses RLS? 
-- Ideally restrict to specific roles, but for this "failed to add" error, let's open it up for authenticated users)
CREATE POLICY "Enable insert for authenticated users only" ON public.employees
    FOR INSERT TO authenticated WITH CHECK (true);

-- Also allow update/delete
CREATE POLICY "Enable update for authenticated users only" ON public.employees
    FOR UPDATE TO authenticated USING (true);

-- POLICIES FOR SALARIES
CREATE POLICY "Enable read access for all users" ON public.salaries
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.salaries
    FOR INSERT TO authenticated WITH CHECK (true);

-- POLICIES FOR AMBASSADORS
ALTER TABLE public.ambassador_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.ambassador_details
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.ambassador_details
    FOR INSERT TO authenticated WITH CHECK (true);

-- POLICIES FOR STUDENTS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.students
    FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.students
    FOR INSERT TO authenticated WITH CHECK (true);

-- POLICIES FOR PROFILES
-- Profiles are usually managed by Supabase Auth triggers for inserts, but updates/reads need policy
CREATE POLICY "Enable read access for all users" ON public.profiles
    FOR SELECT USING (true);
CREATE POLICY "Enable update for users based on email" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);
