-- PIRA migration 002: fix "permission denied for table memberships"
-- Apply after 001_foundation.sql. Safe to rerun.
-- GRANT determines whether the API role can access a table at all.
-- Row Level Security (RLS) continues to restrict which rows it can see/change.

grant usage on schema public to authenticated;

-- Read-only account and workspace metadata
grant select on table
  public.profiles,
  public.workspaces,
  public.memberships
to authenticated;
grant update (display_name) on table public.profiles to authenticated;

-- Workspace records: RLS enforces membership, ownership and allowed writes.
grant select, insert, update, delete on table
  public.inventory_items,
  public.reminders
to authenticated;

-- No client INSERT/UPDATE/DELETE grants on workspaces or memberships.
-- Do not grant access to anon, and never put service_role credentials in a webpage.

-- Optional diagnostics (run as SQL editor administrator):
-- select tablename, rowsecurity
-- from pg_tables where schemaname='public'
-- and tablename in ('profiles','workspaces','memberships','inventory_items','reminders');
