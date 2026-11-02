-- PIRA 003: scheduled and recurring reminders
-- Run AFTER 001_foundation.sql and 002_api_permissions.sql.
-- Does not delete or replace existing reminders.
alter table public.reminders
 add column if not exists repeat_rule text not null default 'none'
 check (repeat_rule in ('none','daily','weekly','monthly','yearly'));
alter table public.reminders
 add column if not exists due_time time without time zone;
-- Only authenticated members with RLS write access can complete their reminder.
-- The invoker's RLS policies remain authoritative. For repeating reminders,
-- advance to the next future occurrence so a task never repeats in the past.
create or replace function public.pira_complete_reminder(p_id uuid, p_workspace_id uuid)
returns void
language plpgsql security invoker set search_path = ''
as $$
declare r public.reminders%rowtype; next_due date; n integer:=0;
begin
 select * into r from public.reminders
 where id=p_id and workspace_id=p_workspace_id for update;
 if not found then raise exception 'Reminder not found or access denied'; end if;
 if r.repeat_rule='none' then
   update public.reminders set done=true where id=p_id and workspace_id=p_workspace_id;
 else
   next_due:=r.due;
   loop
     next_due:=case r.repeat_rule
       when 'daily' then next_due+1
       when 'weekly' then next_due+7
       when 'monthly' then (next_due+interval '1 month')::date
       when 'yearly' then (next_due+interval '1 year')::date
       else next_due+1 end;
     n:=n+1;
     exit when next_due>current_date or n>=5000;
   end loop;
   update public.reminders set due=next_due,done=false
   where id=p_id and workspace_id=p_workspace_id;
 end if;
end; $$;
revoke all on function public.pira_complete_reminder(uuid,uuid) from public;
grant execute on function public.pira_complete_reminder(uuid,uuid) to authenticated;
