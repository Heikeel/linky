-- Tabla de analytics: visitas al perfil y clicks en links

create table public.analytics (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  link_id uuid references public.links(id) on delete set null,
  type text not null check (type in ('view', 'click')),
  created_at timestamptz default now()
);

-- Índice para consultas rápidas por perfil y fecha
create index analytics_profile_created on public.analytics (profile_id, created_at desc);

-- RLS
alter table public.analytics enable row level security;

-- Cualquiera puede insertar (visitantes anónimos)
create policy "Insertar analytics"
  on public.analytics for insert
  with check (true);

-- Solo el dueño puede leer sus propios datos
create policy "Leer propios analytics"
  on public.analytics for select
  using (profile_id = auth.uid());
