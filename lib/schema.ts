export const SCHEMA = `
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);
create table if not exists shipments (
  id uuid primary key default gen_random_uuid(),
  tracking_number text unique not null,
  status text not null default 'PENDING',
  method text not null,
  weight text, description text, eta date,
  sender_name text not null, sender_phone text, sender_email text, sender_address text,
  receiver_name text not null, receiver_phone text, receiver_email text, receiver_address text,
  origin text not null, origin_lat double precision, origin_lng double precision,
  destination text not null, dest_lat double precision, dest_lng double precision,
  current_location text, current_lat double precision, current_lng double precision,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists shipments_status_idx on shipments(status);
create index if not exists shipments_created_idx on shipments(created_at desc);
create table if not exists shipment_events (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid not null references shipments(id) on delete cascade,
  status text not null, location text not null, description text,
  created_at timestamptz not null default now()
);
create index if not exists events_shipment_idx on shipment_events(shipment_id);
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, phone text, subject text,
  message text not null, status text not null default 'NEW',
  created_at timestamptz not null default now()
);
create index if not exists messages_status_idx on contact_messages(status);
alter table shipments add column if not exists packages jsonb not null default '[]'::jsonb;
`
