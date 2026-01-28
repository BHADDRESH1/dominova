-- CRITICAL FIX FOR DEMO MODE
-- Since you are logging in as "Demo User" (Mock Admin), you are not actually authenticated with Supabase.
-- We must allow "Anonymous" (public) users to Insert/Update data for the app to work in this mode.

-- 1. Drop existing strict policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.employees;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.employees;

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.salaries;

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.ambassador_details;

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.students;

-- 2. Create Open/Public Policies (Allowing anon access)

-- EMPLOYEES
CREATE POLICY "Enable insert for all users" ON public.employees
    FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.employees
    FOR UPDATE TO public USING (true);

-- SALARIES
CREATE POLICY "Enable insert for all users" ON public.salaries
    FOR INSERT TO public WITH CHECK (true);

-- AMBASSADORS
CREATE POLICY "Enable insert for all users" ON public.ambassador_details
    FOR INSERT TO public WITH CHECK (true);

-- STUDENTS
CREATE POLICY "Enable insert for all users" ON public.students
    FOR INSERT TO public WITH CHECK (true);

-- Note: Select/Read policies were likely already "TO public" or "USING (true)" from previous script, 
-- but if not, ensure read access is open too.
