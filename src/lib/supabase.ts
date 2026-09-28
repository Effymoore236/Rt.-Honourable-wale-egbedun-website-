import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://shmxekngdxrjsdemjhsj.supabase.co/rest/v1/' &&
  supabaseAnonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNobXhla25nZHhyanNkZW1qaHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1NTczOTYsImV4cCI6MjEwNjEzMzM5Nn0.Avo4BBV4rMoqKbJIfadiLoiucWeHW3kQUxTubMxh9cI'
);

// Create Supabase Client (safe fallback if credentials are not yet set)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient(
      supabaseUrl || 'https://shmxekngdxrjsdemjhsj.supabase.co/rest/v1/',
      supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNobXhla25nZHhyanNkZW1qaHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1NTczOTYsImV4cCI6MjEwNjEzMzM5Nn0.Avo4BBV4rMoqKbJIfadiLoiucWeHW3kQUxTubMxh9cI'
    );

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
