export type OdoOtinCommunity =
  | 'Okuku'
  | 'Inisa'
  | 'Oyan'
  | 'Igbaye'
  | 'Ijabe'
  | 'Ila-Odo'
  | 'Agbeye'
  | 'Ekosin'
  | 'Iyeku'
  | 'Faji'
  | 'Opete'
  | 'Okua'
  | 'Ekusa'
  | 'Asi Asaba'
  | 'Ore'
  | 'Oba Ojomu';

export const ODO_OTIN_COMMUNITIES: OdoOtinCommunity[] = [
  'Okuku',
  'Inisa',
  'Oyan',
  'Igbaye',
  'Ijabe',
  'Ila-Odo',
  'Agbeye',
  'Ekosin',
  'Iyeku',
  'Faji',
  'Opete',
  'Okua',
  'Ekusa',
  'Asi Asaba',
  'Ore',
  'Oba Ojomu'
];

export type ProjectCategory =
  | 'Roads & Infrastructure'
  | 'Healthcare & Wellness'
  | 'Education & Schools'
  | 'Water & Sanitation'
  | 'Rural Electrification & Solar'
  | 'Agriculture & Markets'
  | 'Youth & Women Empowerment';

export type ProjectStatus = 'Completed' | 'Ongoing' | 'Planned';

export interface ProjectTestimonial {
  name: string;
  role: string;
  community: OdoOtinCommunity;
  comment: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  community: OdoOtinCommunity;
  status: ProjectStatus;
  year: number;
  budget: string;
  beneficiaries: string;
  description: string;
  detailedScope: string;
  beforeImageUrl?: string;
  afterImageUrl: string;
  featured: boolean;
  completionDate?: string;
  contractorOrPartner?: string;
  testimonials?: ProjectTestimonial[];
}

export interface VolunteerSubmission {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  whatsapp?: string;
  ageRange: '18-24' | '25-34' | '35-49' | '50-64' | '65+';
  gender: 'Male' | 'Female' | 'Prefer not to say';
  community: OdoOtinCommunity;
  ward: string;
  pollingUnit?: string;
  activities: string[];
  availability: 'Weekdays' | 'Weekends' | 'Evenings only' | 'Full-time until election';
  skills: string[];
  whySupport: string;
  priorExperience: boolean;
  referredBy?: string;
  consentContact: boolean;
  consentUpdates: boolean;
  registeredAt: string;
  status: 'new' | 'contacted' | 'active' | 'assigned';
  notes?: string;
}

export interface BlogComment {
  id: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
  approved: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Press Releases' | 'Project Updates' | 'Community News' | 'Legislative Updates' | 'Events & Announcements' | 'Opinion Pieces';
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featuredImage: string;
  tags: string[];
  published: boolean;
  views: number;
  comments: BlogComment[];
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  community: OdoOtinCommunity | 'Other';
  subject: string;
  message: string;
  submittedAt: string;
  read: boolean;
  replied: boolean;
}

export interface ManifestoPillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  iconName: string;
  summary: string;
  targets: string[];
  budgetEstimate: string;
  timeline: string;
  keyDeliverables: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category:
    | 'Official Duties as Speaker'
    | 'Community Engagement'
    | 'Project Commissioning'
    | 'Constituency Meetings'
    | 'State House Sessions'
    | 'Awards & Recognition'
    | 'Festive Celebrations';
  location: string;
  date: string;
  imageUrl: string;
  caption: string;
}

export interface BiographyTimelineMilestone {
  year: string;
  title: string;
  desc: string;
}

export interface BiographyData {
  fullName: string;
  officialTitle: string;
  subTitle: string;
  officeHeld: string;
  constituencyName: string;
  politicalPlatform: string;
  portraitUrl: string;
  hometown: string;
  education: string;
  legislativeFocus: string;
  faithAndFamily: string;
  earlyLifeTitle: string;
  earlyLifeParagraph1: string;
  earlyLifeParagraph2: string;
  speakershipTitle: string;
  speakershipParagraph1: string;
  speakershipParagraph2: string;
  constituentsBondTitle: string;
  constituentsBondParagraph1: string;
  constituentsBondQuote: string;
  milestones: BiographyTimelineMilestone[];
}

export interface CampaignSettings {
  candidateName: string;
  candidateTitle: string;
  partyName: string;
  partyAcronym: string;
  slogan: string;
  campaignOfficeAddress: string;
  phoneHotline: string;
  emailAddress: string;
  whatsappNumber: string;
  adminPasswordHash: string; // Default 'Bullet2812$'
  electionDate: string; // e.g. "2027-02-27"
  targetVotes: number;
  registeredVolunteersGoal: number;
  completedProjectsCount: number;
  communitiesCount: number;
}
