-- Create Categories Table
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  cover_image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Photos Table
create table public.photos (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.categories on delete cascade not null,
  image_url text not null,
  title text,
  description text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Contacts Table (for messages)
create table public.contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.categories enable row level security;
alter table public.photos enable row level security;
alter table public.contacts enable row level security;

-- Policies for public reading
create policy "Public can view categories" on public.categories for select using (true);
create policy "Public can view photos" on public.photos for select using (true);

-- Policies for testing (full access to everyone)
create policy "Full access to categories" on public.categories for all using (true);
create policy "Full access to photos" on public.photos for all using (true);
create policy "Full access to contacts" on public.contacts for all using (true);
