-- =============================================================================
-- CROSSLIFE CMS - SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY POLICIES
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. PROFILES & ROLES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor')),
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. PAGES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived', 'trash')),
  featured_image TEXT,
  seo JSONB DEFAULT '{
    "title": "",
    "description": "",
    "canonical": "",
    "robots": "index, follow",
    "ogTitle": "",
    "ogDescription": "",
    "ogImage": "",
    "twitterTitle": "",
    "twitterDescription": "",
    "twitterImage": ""
  }'::JSONB,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages (slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON public.pages (status);

-- -----------------------------------------------------------------------------
-- 3. PAGE SECTIONS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.page_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES public.pages (id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'hidden')),
  visibility JSONB DEFAULT '{"desktop": true, "tablet": true, "mobile": true}'::JSONB,
  schedule JSONB DEFAULT '{"publish_from": null, "publish_until": null}'::JSONB,
  data JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sections_page_id ON public.page_sections (page_id);
CREATE INDEX IF NOT EXISTS idx_sections_order ON public.page_sections (page_id, "order");

-- -----------------------------------------------------------------------------
-- 4. MEDIA LIBRARY
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  size BIGINT NOT NULL DEFAULT 0,
  width INTEGER,
  height INTEGER,
  alt_text TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_type ON public.media (type);

-- -----------------------------------------------------------------------------
-- 5. MENUS & MENU ITEMS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.menus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 6. MEGA MENUS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mega_menus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nav_item_id TEXT NOT NULL,
  nav_item_label TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  columns JSONB NOT NULL DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 7. REUSABLE BLOCKS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reusable_blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 8. GLOBAL SETTINGS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.global_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  site_name TEXT NOT NULL DEFAULT 'CrossLife',
  tagline TEXT DEFAULT 'One Life',
  sub_tagline TEXT DEFAULT 'A Conference for Young People',
  logo_url TEXT DEFAULT '/images/crosslife-logo.webp',
  favicon_url TEXT DEFAULT '/favicon.ico',
  default_og_image TEXT DEFAULT '/hero-bg.jpg',
  copyright_text TEXT DEFAULT 'All rights reserved. Organised by Equip Indian Churches.',
  sticky_header BOOLEAN DEFAULT true,
  announcement JSONB DEFAULT '{"enabled": false, "message": "", "link_text": "", "link_url": ""}'::JSONB,
  default_cta JSONB DEFAULT '{"text": "Register Now", "link": "/#pricing", "variant": "amber"}'::JSONB,
  contacts JSONB DEFAULT '{
    "email": "contact@crosslife.in",
    "phones": [
      {"display": "+91 98867 69948", "value": "+919886769948"},
      {"display": "+91 99368 44317", "value": "+919936844317"}
    ],
    "full_address": "Ashirwad Global Learning Centre, Hyderabad, Telangana, India",
    "venue": {
      "name": "Ashirwad Global Learning Centre",
      "city": "Hyderabad",
      "state": "Telangana",
      "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121818.89886861614!2d78.372883!3d17.435777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb974776e0176b%3A0xb35a09b4c0e5a956!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
    }
  }'::JSONB,
  social_links JSONB DEFAULT '{
    "facebook": "https://facebook.com",
    "instagram": "https://instagram.com",
    "youtube": "https://youtube.com",
    "linkedin": "",
    "twitter": ""
  }'::JSONB,
  event JSONB DEFAULT '{
    "dates": "14 - 16 September 2027",
    "days": "Tuesday to Thursday",
    "year": "2027",
    "startDateIso": "2027-09-14T09:00:00+05:30",
    "organiser": "Equip Indian Churches",
    "targetAudience": "18 to 25 years old men and women"
  }'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 9. REDIRECTS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.redirects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_url TEXT UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  status_code INTEGER NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302)),
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 10. REVISIONS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.revisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  data JSONB NOT NULL,
  author TEXT NOT NULL DEFAULT 'Admin',
  note TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_revisions_entity ON public.revisions (entity_type, entity_id);

-- -----------------------------------------------------------------------------
-- 11. ACTIVITY LOGS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name TEXT NOT NULL,
  user_role TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_created_at ON public.activity_logs (created_at DESC);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mega_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reusable_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.global_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Public Read for Published Content
CREATE POLICY "Public read pages" ON public.pages FOR SELECT USING (status = 'published');
CREATE POLICY "Public read page_sections" ON public.page_sections FOR SELECT USING (status = 'published');
CREATE POLICY "Public read media" ON public.media FOR SELECT USING (true);
CREATE POLICY "Public read menus" ON public.menus FOR SELECT USING (true);
CREATE POLICY "Public read mega_menus" ON public.mega_menus FOR SELECT USING (enabled = true);
CREATE POLICY "Public read reusable_blocks" ON public.reusable_blocks FOR SELECT USING (true);
CREATE POLICY "Public read global_settings" ON public.global_settings FOR SELECT USING (true);
CREATE POLICY "Public read redirects" ON public.redirects FOR SELECT USING (enabled = true);

-- Authenticated Full Access for Admin and Editor
CREATE POLICY "Auth full access pages" ON public.pages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth full access sections" ON public.page_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth full access media" ON public.media FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth full access menus" ON public.menus FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth full access mega_menus" ON public.mega_menus FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth full access reusable_blocks" ON public.reusable_blocks FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth full access settings" ON public.global_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth full access redirects" ON public.redirects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth full access revisions" ON public.revisions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth full access activity_logs" ON public.activity_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth read profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth write profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage bucket setup for CMS Media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Media Read" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Auth Media Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');
CREATE POLICY "Auth Media Update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media');
CREATE POLICY "Auth Media Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media');
