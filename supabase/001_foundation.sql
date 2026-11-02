-- PIRA foundation migration: run in a NEW Supabase project's SQL editor.
-- Public clients MUST NOT receive service_role or secret keys.
create extension if not exists pgcrypto;
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  created_at timestamptz not null default now()
);
create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('personal','business')),
  name text not null check (length(trim(name)) between 1 and 120),
  verification_status text not null default 'not_required'
    check ((kind='personal' and verification_status='not_required') or (kind='business' and verification_status in ('pending','verified','rejected'))),
  created_at timestamptz not null default now()
);
create table if not exists public.memberships (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','admin','member','viewer')),
  created_at timestamptz not null default now(),
  primary key (workspace_id,user_id)
);
create table if not exists public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null check (length(trim(name)) between 1 and 200),
  category text not null default '',
  quantity numeric(16,3) not null default 0 check (quantity >= 0),
  minimum numeric(16,3) not null default 0 check (minimum >= 0),
  location text not null default '',
  price numeric(16,2) not null default 0 check (price >= 0),
  created_at timestamptz not null default now()
);
create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null check (length(trim(title)) between 1 and 200),
  due date not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists inventory_workspace_idx on public.inventory_items(workspace_id);
create index if not exists reminders_workspace_idx on public.reminders(workspace_id,due);
create index if not exists memberships_user_idx on public.memberships(user_id);

-- This trigger is the ONLY client-accessible path for creating a Personal workspace.
create or replace function public.create_personal_workspace()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare ws uuid;
begin
 insert into public.profiles(user_id,display_name) values(new.id,coalesce(left(new.raw_user_meta_data->>'display_name',100),''));
 insert into public.workspaces(kind,name,verification_status) values ('personal','Personal Workspace','not_required') returning id into ws;
 insert into public.memberships(workspace_id,user_id,role) values(ws,new.id,'owner');
 return new;
end; $$;
drop trigger if exists on_pira_user_created on auth.users;
create trigger on_pira_user_created after insert on auth.users for each row execute function public.create_personal_workspace();

-- Membership checks use a definer function to avoid recursive RLS on memberships.
create or replace function public.pira_can_access(ws uuid, write_access boolean default false)
returns boolean language sql stable security definer set search_path = ''
as $$
 select exists (
  select 1 from public.memberships m
  join public.workspaces w on w.id=m.workspace_id
  where m.workspace_id=ws and m.user_id=(select auth.uid())
    and (not write_access or m.role in ('owner','admin','member'))
    and (w.kind='personal' or w.verification_status='verified')
 );
$$;
revoke all on function public.pira_can_access(uuid,boolean) from public;
grant execute on function public.pira_can_access(uuid,boolean) to authenticated;
alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.memberships enable row level security;
alter table public.inventory_items enable row level security;
alter table public.reminders enable row level security;
create policy "read own profile" on public.profiles for select to authenticated using (user_id=(select auth.uid()));
create policy "update own profile" on public.profiles for update to authenticated using (user_id=(select auth.uid())) with check (user_id=(select auth.uid()));
create policy "read associated workspaces" on public.workspaces for select to authenticated using (public.pira_can_access(id,false));
create policy "read own memberships" on public.memberships for select to authenticated using (user_id=(select auth.uid()) and public.pira_can_access(workspace_id,false));
create policy "read allowed inventory" on public.inventory_items for select to authenticated using (public.pira_can_access(workspace_id,false));
create policy "insert allowed inventory" on public.inventory_items for insert to authenticated with check (public.pira_can_access(workspace_id,true));
create policy "update allowed inventory" on public.inventory_items for update to authenticated using (public.pira_can_access(workspace_id,true)) with check (public.pira_can_access(workspace_id,true));
create policy "delete allowed inventory" on public.inventory_items for delete to authenticated using (public.pira_can_access(workspace_id,true));
create policy "read allowed reminders" on public.reminders for select to authenticated using (public.pira_can_access(workspace_id,false));
create policy "insert allowed reminders" on public.reminders for insert to authenticated with check (public.pira_can_access(workspace_id,true));
create policy "update allowed reminders" on public.reminders for update to authenticated using (public.pira_can_access(workspace_id,true)) with check (public.pira_can_access(workspace_id,true));
create policy "delete allowed reminders" on public.reminders for delete to authenticated using (public.pira_can_access(workspace_id,true));
-- No direct insert/update/delete policies for workspaces or memberships.
-- Business onboarding and role grants must be implemented through authenticated privileged server operations.
