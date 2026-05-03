-- LogiFlow Database Schema
-- Execute this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (linked to Supabase Auth users)
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  name text,
  role text default 'operator', -- 'admin', 'operator', 'stockist'
  created_at timestamptz default now()
);

-- Products table
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  sku text unique not null,
  name text not null,
  description text,
  created_at timestamptz default now()
);

-- SKUs table (variations)
create table if not exists public.skus (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products on delete cascade,
  sku_variation text not null, -- ex: 'Preta M'
  quantity int default 0,
  location text, -- ex: 'A-01-02'
  created_at timestamptz default now()
);

-- Orders table
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  customer_name text not null,
  address text,
  total_amount numeric(10,2),
  payment_method text,
  status text default 'Pendente',
  created_at timestamptz default now()
);

-- Order items table
create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders on delete cascade,
  sku_id uuid references public.skus,
  quantity int not null,
  price_at_order numeric(10,2),
  created_at timestamptz default now()
);

-- Invoices table
create table if not exists public.invoices (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders on delete cascade,
  invoice_number text unique,
  xml_data jsonb,
  danfe_url text,
  status text default 'Pendente',
  created_at timestamptz default now()
);

-- Shipments table
create table if not exists public.shipments (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders on delete cascade,
  tracking_code text unique,
  carrier text,
  status text default 'Pendente',
  created_at timestamptz default now()
);

-- Logs table
create table if not exists public.logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users,
  action text not null,
  details jsonb,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.skus enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.invoices enable row level security;
alter table public.shipments enable row level security;
alter table public.logs enable row level security;

-- RLS Policies: Admin has full access, users see their own data
-- Profiles: users can see their own profile, admin sees all
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Admin full access profiles" on public.profiles
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Products: all authenticated users can view, admin/operator can modify
create policy "Authenticated can view products" on public.products
  for select using (auth.role() = 'authenticated');

create policy "Admin/operator can modify products" on public.products
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'operator'))
  );

-- SKUs
create policy "Authenticated can view skus" on public.skus
  for select using (auth.role() = 'authenticated');

create policy "Admin/operator/stockist can modify skus" on public.skus
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'operator', 'stockist'))
  );

-- Orders
create policy "Authenticated can view orders" on public.orders
  for select using (auth.role() = 'authenticated');

create policy "Admin/operator can modify orders" on public.orders
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'operator'))
  );

-- Order items
create policy "Authenticated can view order items" on public.order_items
  for select using (auth.role() = 'authenticated');

create policy "Admin/operator can modify order items" on public.order_items
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'operator'))
  );

-- Invoices
create policy "Authenticated can view invoices" on public.invoices
  for select using (auth.role() = 'authenticated');

create policy "Admin/operator can modify invoices" on public.invoices
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'operator'))
  );

-- Shipments
create policy "Authenticated can view shipments" on public.shipments
  for select using (auth.role() = 'authenticated');

create policy "Admin/operator can modify shipments" on public.shipments
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'operator'))
  );

-- Logs
create policy "Users can view own logs" on public.logs
  for select using (user_id = auth.uid());

create policy "Admin can view all logs" on public.logs
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "System can insert logs" on public.logs
  for insert with check (true);

-- Indexes for performance
create index if not exists idx_skus_product_id on public.skus(product_id);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_logs_user_id on public.logs(user_id);
create index if not exists idx_logs_created_at on public.logs(created_at desc);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, role)
  values (new.id, new.raw_user_meta_data->>'name', 'operator');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
