create extension if not exists pgcrypto;

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists media_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('image', 'video')),
  storage_path text not null,
  public_url text not null,
  thumbnail_url text,
  poster_url text,
  category text not null,
  title text not null,
  alt text,
  description text,
  orientation text,
  width int,
  height int,
  is_featured boolean default false,
  is_hero boolean default false,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists features (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text,
  is_active boolean default true,
  is_featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  source text,
  rating int check (rating is null or rating between 1 and 5),
  comment text not null,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists experience_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  cta_label text,
  cta_message text,
  media_id uuid references media_items(id) on delete set null,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists reservation_info (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  value text,
  description text,
  is_public boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists site_settings_updated_at on site_settings;
create trigger site_settings_updated_at before update on site_settings for each row execute procedure set_updated_at();

drop trigger if exists media_items_updated_at on media_items;
create trigger media_items_updated_at before update on media_items for each row execute procedure set_updated_at();

drop trigger if exists features_updated_at on features;
create trigger features_updated_at before update on features for each row execute procedure set_updated_at();

drop trigger if exists faqs_updated_at on faqs;
create trigger faqs_updated_at before update on faqs for each row execute procedure set_updated_at();

drop trigger if exists testimonials_updated_at on testimonials;
create trigger testimonials_updated_at before update on testimonials for each row execute procedure set_updated_at();

drop trigger if exists experience_cards_updated_at on experience_cards;
create trigger experience_cards_updated_at before update on experience_cards for each row execute procedure set_updated_at();

drop trigger if exists reservation_info_updated_at on reservation_info;
create trigger reservation_info_updated_at before update on reservation_info for each row execute procedure set_updated_at();

alter table site_settings enable row level security;
alter table media_items enable row level security;
alter table features enable row level security;
alter table faqs enable row level security;
alter table testimonials enable row level security;
alter table experience_cards enable row level security;
alter table reservation_info enable row level security;

drop policy if exists "Public settings read" on site_settings;
create policy "Public settings read" on site_settings for select using (true);

drop policy if exists "Public active media read" on media_items;
create policy "Public active media read" on media_items for select using (is_active = true);

drop policy if exists "Public active features read" on features;
create policy "Public active features read" on features for select using (is_active = true);

drop policy if exists "Public active faqs read" on faqs;
create policy "Public active faqs read" on faqs for select using (is_active = true);

drop policy if exists "Public active testimonials read" on testimonials;
create policy "Public active testimonials read" on testimonials for select using (is_active = true);

drop policy if exists "Public active experience cards read" on experience_cards;
create policy "Public active experience cards read" on experience_cards for select using (is_active = true);

drop policy if exists "Public reservation info read" on reservation_info;
create policy "Public reservation info read" on reservation_info for select using (is_public = true);

insert into storage.buckets (id, name, public)
values ('dies-media', 'dies-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public dies media read" on storage.objects;
create policy "Public dies media read"
on storage.objects for select
using (bucket_id = 'dies-media');

drop policy if exists "Authenticated dies media upload" on storage.objects;
create policy "Authenticated dies media upload"
on storage.objects for insert
to authenticated
with check (bucket_id = 'dies-media');

create index if not exists media_items_active_sort_idx on media_items (is_active, sort_order);
create index if not exists media_items_category_idx on media_items (category);
create index if not exists features_active_sort_idx on features (is_active, sort_order);
create index if not exists faqs_active_sort_idx on faqs (is_active, sort_order);
create index if not exists testimonials_active_sort_idx on testimonials (is_active, sort_order);
create index if not exists experience_cards_active_sort_idx on experience_cards (is_active, sort_order);
