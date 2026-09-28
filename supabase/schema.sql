-- ==============================================================================
-- RT. HON. ADEWALE EGBEDUN 2027 RE-ELECTION CAMPAIGN DATABASE SCHEMA (SUPABASE)
-- Target: Supabase (PostgreSQL 15+)
-- Run this entire script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query -> Run)
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. ENUMS & DOMAINS
-- ==============================================================================

DO $$ BEGIN
    CREATE TYPE odo_otin_community AS ENUM (
        'Okuku', 'Inisa', 'Oyan', 'Igbaye', 'Ijabe', 'Ila-Odo', 'Agbeye',
        'Ekosin', 'Iyeku', 'Faji', 'Opete', 'Okua', 'Ekusa', 'Asi Asaba', 'Ore', 'Oba Ojomu'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE project_category AS ENUM (
        'Roads & Infrastructure',
        'Healthcare & Wellness',
        'Education & Schools',
        'Water & Sanitation',
        'Rural Electrification & Solar',
        'Agriculture & Markets',
        'Youth & Women Empowerment'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE project_status AS ENUM ('Completed', 'Ongoing', 'Planned');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE volunteer_status AS ENUM ('new', 'contacted', 'active', 'assigned');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. TABLES
-- ==============================================================================

-- Table: Campaign Settings
CREATE TABLE IF NOT EXISTS public.campaign_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_name TEXT NOT NULL DEFAULT 'Rt. Hon. Adewale Egbedun',
    candidate_title TEXT NOT NULL DEFAULT 'Speaker, Osun State House of Assembly & Member Representing Odo-Otin State Constituency',
    party_name TEXT NOT NULL DEFAULT 'Accord Party',
    party_acronym TEXT NOT NULL DEFAULT 'ACCORD',
    slogan TEXT NOT NULL DEFAULT 'Continuity, Progress, Development',
    campaign_office_address TEXT NOT NULL DEFAULT 'Plot 4, Ikirun-Offa Expressway, Beside Odo-Otin Local Government Secretariat, Okuku, Osun State',
    phone_hotline TEXT NOT NULL DEFAULT '+234 803 456 7890',
    email_address TEXT NOT NULL DEFAULT 'campaign@adewaleegbedun.ng',
    whatsapp_number TEXT NOT NULL DEFAULT '+234 812 345 6789',
    election_date DATE NOT NULL DEFAULT '2027-02-06',
    target_votes INTEGER NOT NULL DEFAULT 48500,
    registered_volunteers_goal INTEGER NOT NULL DEFAULT 2500,
    completed_projects_count INTEGER NOT NULL DEFAULT 42,
    communities_count INTEGER NOT NULL DEFAULT 16,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Projects & Constituency Interventions
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category project_category NOT NULL,
    community odo_otin_community NOT NULL,
    status project_status NOT NULL DEFAULT 'Completed',
    year INTEGER NOT NULL,
    budget TEXT NOT NULL,
    beneficiaries TEXT NOT NULL,
    description TEXT NOT NULL,
    detailed_scope TEXT,
    before_image_url TEXT,
    after_image_url TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    completion_date DATE,
    contractor_or_partner TEXT,
    testimonials JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Volunteer Submissions
CREATE TABLE IF NOT EXISTS public.volunteer_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT,
    age_range TEXT NOT NULL CHECK (age_range IN ('18-24', '25-34', '35-49', '50-64', '65+')),
    gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'Prefer not to say')),
    community odo_otin_community NOT NULL,
    ward TEXT NOT NULL,
    polling_unit TEXT,
    activities TEXT[] DEFAULT '{}',
    availability TEXT NOT NULL CHECK (availability IN ('Weekdays', 'Weekends', 'Evenings only', 'Full-time until election')),
    skills TEXT[] DEFAULT '{}',
    why_support TEXT NOT NULL,
    prior_experience BOOLEAN DEFAULT false,
    referred_by TEXT,
    consent_contact BOOLEAN DEFAULT true,
    consent_updates BOOLEAN DEFAULT true,
    status volunteer_status DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Contact Messages & Civic Inquiries
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    community TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    replied BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Manifesto Pillars
CREATE TABLE IF NOT EXISTS public.manifesto_pillars (
    id TEXT PRIMARY KEY,
    number TEXT NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    summary TEXT NOT NULL,
    budget_estimate TEXT NOT NULL,
    timeline TEXT NOT NULL,
    targets TEXT[] DEFAULT '{}',
    key_deliverables TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: News & Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    author_role TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    read_time TEXT NOT NULL DEFAULT '4 min read',
    featured_image TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    published BOOLEAN DEFAULT true,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Blog Comments
CREATE TABLE IF NOT EXISTS public.blog_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id TEXT REFERENCES public.blog_posts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    comment TEXT NOT NULL,
    approved BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Gallery Items
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    date DATE NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 4. INDEXES FOR HIGH QUERY PERFORMANCE
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_projects_community ON public.projects(community);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_volunteers_community ON public.volunteer_submissions(community);
CREATE INDEX IF NOT EXISTS idx_volunteers_status ON public.volunteer_submissions(status);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.blog_comments(post_id);

-- ==============================================================================
-- 5. SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.campaign_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manifesto_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Campaign Settings: Everyone can read; only authenticated users can update
CREATE POLICY "Public can view campaign settings" ON public.campaign_settings FOR SELECT USING (true);
CREATE POLICY "Admins can update campaign settings" ON public.campaign_settings FOR ALL TO authenticated USING (true);

-- Projects: Everyone can view; only admins can modify
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admins can manage projects" ON public.projects FOR ALL TO authenticated USING (true);

-- Volunteers: Public can submit; only authenticated admins can view & manage
CREATE POLICY "Anyone can register as a volunteer" ON public.volunteer_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view volunteer submissions" ON public.volunteer_submissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can update volunteer status" ON public.volunteer_submissions FOR UPDATE TO authenticated USING (true);

-- Contact Messages: Anyone can submit a message; only authenticated admins can read
CREATE POLICY "Anyone can submit contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contact messages" ON public.contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can update contact messages" ON public.contact_messages FOR UPDATE TO authenticated USING (true);

-- Manifesto & Gallery: Public can view; admins can manage
CREATE POLICY "Public can view manifesto" ON public.manifesto_pillars FOR SELECT USING (true);
CREATE POLICY "Admins can manage manifesto" ON public.manifesto_pillars FOR ALL TO authenticated USING (true);

CREATE POLICY "Public can view gallery" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage gallery" ON public.gallery_items FOR ALL TO authenticated USING (true);

-- Blog Posts & Comments: Public can view published posts & add comments
CREATE POLICY "Public can view published blog posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage all blog posts" ON public.blog_posts FOR ALL TO authenticated USING (true);

CREATE POLICY "Public can view approved comments" ON public.blog_comments FOR SELECT USING (approved = true);
CREATE POLICY "Public can submit comments" ON public.blog_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage comments" ON public.blog_comments FOR ALL TO authenticated USING (true);

-- ==============================================================================
-- 6. INITIAL SEED DATA
-- ==============================================================================

-- Seed Settings (with 6th February 2027 Election Date)
INSERT INTO public.campaign_settings (
    candidate_name,
    candidate_title,
    party_name,
    party_acronym,
    slogan,
    election_date,
    target_votes,
    registered_volunteers_goal,
    completed_projects_count,
    communities_count
) VALUES (
    'Rt. Hon. Adewale Egbedun',
    'Speaker, Osun State House of Assembly & Member Representing Odo-Otin State Constituency',
    'Accord Party',
    'ACCORD',
    'Continuity, Progress, Development',
    '2027-02-06',
    48500,
    2500,
    42,
    16
) ON CONFLICT DO NOTHING;

-- Seed Manifesto Pillars
INSERT INTO public.manifesto_pillars (id, number, title, tagline, icon_name, summary, budget_estimate, timeline, targets, key_deliverables)
VALUES
(
    'pillar-1', '01',
    'Education Revitalization & Digital Literacy',
    'Modern learning environments, free STEM kits, and scholarships for every child',
    'GraduationCap',
    'Transform primary and secondary schools across all 16 Odo-Otin communities with modernized classrooms, digital labs, and direct student bursaries.',
    '₦450,000,000',
    '2027 – 2029',
    ARRAY[
        'Equip 16 public secondary schools with solar-powered e-learning computer centers',
        'Provide 1,000 annual tertiary education bursaries to Odo-Otin indigenes',
        'Distribute free textbooks and notebooks to 15,000 public primary school pupils',
        'Host the annual Odo-Otin Science & Innovation Fair with university scholarship prizes'
    ],
    ARRAY[
        'Modern Science Laboratories in Okuku, Inisa, and Oyan Grammar Schools',
        'Teachers Continuing Professional Development Incentive Fund',
        'Free WAEC and UTME/JAMB Registration Sponsorship for 1,200 indigent students annually'
    ]
),
(
    'pillar-2', '02',
    'Accessible Grassroots Healthcare',
    '24/7 Primary Healthcare Centers, solar cold chains, and free maternal care',
    'HeartPulse',
    'Ensure no constituent travels more than 15 minutes to receive emergency medical care, maternal delivery, or essential prescription medication.',
    '₦380,000,000',
    '2027 – 2030',
    ARRAY[
        'Upgrade 10 Primary Healthcare Centers to fully equipped 24-hour mini-hospitals',
        'Procure 3 dedicated rural mobile ambulances stationed across Okuku, Inisa, and Oyan',
        'Provide 100% free maternal and neonatal care packages for expectant mothers',
        'Quarterly free medical outreach covering hypertension, diabetes, and cataract surgeries'
    ],
    ARRAY[
        'Solar-powered vaccine refrigerators in remote rural wards (Ijabe, Ekosin, Iyeku)',
        'Subsidized health insurance enrollment under the Osun Health Insurance Scheme (OHIS)',
        'Quarterly doctors-on-wheels team reaching farming settlements and hamlets'
    ]
),
(
    'pillar-3', '03',
    'Rural Infrastructure & Road Connectivity',
    'Connecting farm gates to urban markets with all-weather roads and solar lights',
    'Building2',
    'Expand tarred rural feeder roads, construct drainage systems to combat erosion, and illuminate commercial centers with solar street lighting.',
    '₦720,000,000',
    '2027 – 2031',
    ARRAY[
        'Pave 35km of critical agricultural feeder roads connecting farm settlements to town centers',
        'Install 800 commercial-grade solar streetlights across major market arteries and junctions',
        'Construct 14 culverts and concrete drainage channels in flood-prone communities (Inisa, Igbaye)',
        'Renovate community civic centers in Agbeye, Ila-Odo, and Oba Ojomu'
    ],
    ARRAY[
        'Okuku - Ijabe - Ila-Odo link road rehabilitation completion',
        'Oyan to Asi Asaba bypass grading and stone-base asphalt overlay',
        'Solar lighting around all central palaces, mosques, and churches'
    ]
)
ON CONFLICT (id) DO NOTHING;
