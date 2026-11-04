import { createClient } from '@supabase/supabase-js';

// Safe environment variable resolution (works in Vite, Node, and test runners)
const getEnvVar = (key: string, fallback: string = ''): string => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.[key]) {
      return (import.meta as any).env[key];
    }
  } catch {
    // ignore
  }
  try {
    if (typeof process !== 'undefined' && process.env?.[key]) {
      return process.env[key] as string;
    }
  } catch {
    // ignore
  }
  return fallback;
};

const defaultUrl = 'https://shmxekngdxrjsdemjhsj.supabase.co';
const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNobXhla25nZHhyanNkZW1qaHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1NTczOTYsImV4cCI6MjEwNjEzMzM5Nn0.Avo4BBV4rMoqKbJIfadiLoiucWeHW3kQUxTubMxh9cI';

const rawUrl = getEnvVar('VITE_SUPABASE_URL', defaultUrl);
const rawKey = getEnvVar('VITE_SUPABASE_ANON_KEY', defaultKey);

// Normalize URL: Strip any trailing /rest/v1/ or trailing slashes so supabase-js client builds endpoints cleanly
export const supabaseUrl = rawUrl
  ? rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '')
  : '';

export const supabaseAnonKey = rawKey ? rawKey.trim() : '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-anon-key')
);

// Create Supabase Client instance
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

/**
 * Health check to test live connectivity and database tables
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  projectUrl: string;
  tables: {
    projects: boolean;
    volunteers: boolean;
    messages: boolean;
  };
  error?: string;
}> {
  if (!isSupabaseConfigured) {
    return {
      connected: false,
      projectUrl: supabaseUrl,
      tables: { projects: false, volunteers: false, messages: false },
      error: 'Supabase credentials are not configured.'
    };
  }

  try {
    const [projRes, volRes, msgRes] = await Promise.all([
      supabase.from('projects').select('count', { count: 'exact', head: true }),
      supabase.from('volunteer_submissions').select('count', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('count', { count: 'exact', head: true })
    ]);

    const projectsOk = !projRes.error;
    const volunteersOk = !volRes.error;
    const messagesOk = !msgRes.error;
    const isAnyWorking = projectsOk || volunteersOk || messagesOk;

    return {
      connected: isAnyWorking,
      projectUrl: supabaseUrl,
      tables: {
        projects: projectsOk,
        volunteers: volunteersOk,
        messages: messagesOk
      },
      error: !isAnyWorking ? (projRes.error?.message || volRes.error?.message || 'Connection test failed') : undefined
    };
  } catch (err: any) {
    return {
      connected: false,
      projectUrl: supabaseUrl,
      tables: { projects: false, volunteers: false, messages: false },
      error: err.message || 'Network error connecting to Supabase'
    };
  }
}

/**
 * Submit volunteer registration to Supabase table `volunteer_submissions`
 */
export async function submitVolunteerToSupabase(volunteerData: {
  fullName: string;
  phone: string;
  email: string;
  whatsapp?: string;
  ageRange: string;
  gender: string;
  community: string;
  ward: string;
  pollingUnit?: string;
  activities: string[];
  availability: string;
  skills: string[];
  whySupport: string;
  priorExperience?: boolean;
  referredBy?: string;
  consentContact?: boolean;
  consentUpdates?: boolean;
}) {
  if (!isSupabaseConfigured) {
    console.warn('Supabase is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
    return { data: null, error: new Error('Supabase credentials not configured') };
  }

  const { data, error } = await supabase
    .from('volunteer_submissions')
    .insert([
      {
        full_name: volunteerData.fullName,
        phone: volunteerData.phone,
        email: volunteerData.email,
        whatsapp: volunteerData.whatsapp || null,
        age_range: volunteerData.ageRange,
        gender: volunteerData.gender,
        community: volunteerData.community,
        ward: volunteerData.ward,
        polling_unit: volunteerData.pollingUnit || null,
        activities: volunteerData.activities,
        availability: volunteerData.availability,
        skills: volunteerData.skills,
        why_support: volunteerData.whySupport,
        prior_experience: Boolean(volunteerData.priorExperience),
        referred_by: volunteerData.referredBy || null,
        consent_contact: volunteerData.consentContact ?? true,
        consent_updates: volunteerData.consentUpdates ?? true,
        status: 'new'
      }
    ])
    .select();

  return { data, error };
}

/**
 * Submit contact message or inquiry to Supabase table `contact_messages`
 */
export async function submitContactMessageToSupabase(messageData: {
  fullName: string;
  email: string;
  phone: string;
  community: string;
  subject: string;
  message: string;
}) {
  if (!isSupabaseConfigured) {
    console.warn('Supabase is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
    return { data: null, error: new Error('Supabase credentials not configured') };
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .insert([
      {
        full_name: messageData.fullName,
        email: messageData.email,
        phone: messageData.phone,
        community: messageData.community,
        subject: messageData.subject,
        message: messageData.message
      }
    ])
    .select();

  return { data, error };
}

/**
 * Fetch projects from Supabase table `projects`
 */
export async function fetchProjectsFromSupabase() {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase not configured') };
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('year', { ascending: false });

  return { data, error };
}
