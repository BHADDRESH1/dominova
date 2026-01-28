-- Modify ambassador_details to allow entries without a linked profile (Auth User)
-- This allows Admin to add ambassadors manually.

ALTER TABLE public.ambassador_details
    ALTER COLUMN profile_id DROP NOT NULL;

ALTER TABLE public.ambassador_details
    ADD COLUMN IF NOT EXISTS full_name text,
    ADD COLUMN IF NOT EXISTS email text,
    ADD COLUMN IF NOT EXISTS phone text;

-- Update the RLS policy to ensure we can insert into it
-- (Already covered by generic "insert for authenticated" policy, but good to double check)
