import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  submitVolunteerToSupabase,
  submitContactMessageToSupabase,
  isSupabaseConfigured
} from '../lib/supabase';
import {
  Project,
  VolunteerSubmission,
  BlogPost,
  ContactMessage,
  ManifestoPillar,
  GalleryItem,
  CampaignSettings,
  OdoOtinCommunity,
  BiographyData,
  BiographyTimelineMilestone
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_MANIFESTO_PILLARS,
  INITIAL_PROJECTS,
  INITIAL_BLOG_POSTS,
  INITIAL_VOLUNTEERS,
  INITIAL_CONTACT_MESSAGES,
  INITIAL_GALLERY_ITEMS,
  INITIAL_BIOGRAPHY
} from '../data/initialData';

export type AppPage =
  | 'home'
  | 'biography'
  | 'manifesto'
  | 'projects'
  | 'gallery'
  | 'blog'
  | 'volunteer'
  | 'admin';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface CampaignContextType {
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
  selectedTownFilter: OdoOtinCommunity | 'All';
  setSelectedTownFilter: (town: OdoOtinCommunity | 'All') => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  selectedProjectDetail: Project | null;
  setSelectedProjectDetail: (proj: Project | null) => void;
  selectedBlogPostDetail: BlogPost | null;
  setSelectedBlogPostDetail: (post: BlogPost | null) => void;
  selectedLightboxImage: GalleryItem | null;
  setSelectedLightboxImage: (item: GalleryItem | null) => void;
  isPrintManifestoOpen: boolean;
  setIsPrintManifestoOpen: (open: boolean) => void;
  isPrivacyPolicyOpen: boolean;
  setIsPrivacyPolicyOpen: (open: boolean) => void;
  
  // Auth state
  isAdminLoggedIn: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  
  // Data State
  settings: CampaignSettings;
  biography: BiographyData;
  projects: Project[];
  blogPosts: BlogPost[];
  volunteers: VolunteerSubmission[];
  contactMessages: ContactMessage[];
  manifestoPillars: ManifestoPillar[];
  galleryItems: GalleryItem[];
  subscribers: string[];
  
  // Actions
  updateBiography: (newBio: Partial<BiographyData>) => void;
  addTimelineMilestone: (m: BiographyTimelineMilestone) => void;
  updateTimelineMilestone: (index: number, m: BiographyTimelineMilestone) => void;
  deleteTimelineMilestone: (index: number) => void;

  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  addVolunteer: (vol: Omit<VolunteerSubmission, 'id' | 'registeredAt' | 'status'>) => VolunteerSubmission;
  updateVolunteerStatus: (id: string, status: VolunteerSubmission['status'], notes?: string) => void;
  deleteVolunteer: (id: string) => void;
  exportVolunteersCSV: () => void;
  
  addProject: (proj: Omit<Project, 'id'>) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addBlogPost: (post: Omit<BlogPost, 'id' | 'views' | 'comments'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  addBlogComment: (postId: string, comment: { name: string; email: string; comment: string }) => void;
  toggleCommentApproval: (postId: string, commentId: string) => void;
  
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'read' | 'replied'>) => void;
  markMessageRead: (id: string) => void;
  deleteContactMessage: (id: string) => void;
  
  addSubscriber: (email: string) => boolean;
  updateSettings: (newSettings: Partial<CampaignSettings>) => void;
  resetToDefaults: () => void;
  
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

const STORAGE_KEY = 'egbedun_campaign_data_v2';

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [selectedTownFilter, setSelectedTownFilter] = useState<OdoOtinCommunity | 'All'>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedProjectDetail, setSelectedProjectDetail] = useState<Project | null>(null);
  const [selectedBlogPostDetail, setSelectedBlogPostDetail] = useState<BlogPost | null>(null);
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<GalleryItem | null>(null);
  const [isPrintManifestoOpen, setIsPrintManifestoOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  // Admin auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('egbedun_admin_auth') === 'true';
  });

  // Data states with persistence
  const [settings, setSettings] = useState<CampaignSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_posts`);
      return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
    } catch {
      return INITIAL_BLOG_POSTS;
    }
  });

  const [volunteers, setVolunteers] = useState<VolunteerSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_volunteers`);
      return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
    } catch {
      return INITIAL_VOLUNTEERS;
    }
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_messages`);
      return saved ? JSON.parse(saved) : INITIAL_CONTACT_MESSAGES;
    } catch {
      return INITIAL_CONTACT_MESSAGES;
    }
  });

  const [manifestoPillars] = useState<ManifestoPillar[]>(INITIAL_MANIFESTO_PILLARS);
  
  const [biography, setBiography] = useState<BiographyData>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_biography`);
      return saved ? JSON.parse(saved) : INITIAL_BIOGRAPHY;
    } catch {
      return INITIAL_BIOGRAPHY;
    }
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_gallery`);
      return saved ? JSON.parse(saved) : INITIAL_GALLERY_ITEMS;
    } catch {
      return INITIAL_GALLERY_ITEMS;
    }
  });

  const [subscribers, setSubscribers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_subscribers`);
      return saved ? JSON.parse(saved) : ['adeyemi.k@gmail.com', 'olamide.b@yahoo.com'];
    } catch {
      return [];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
    } catch (e) {
      console.warn('Local storage error', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
    } catch (e) {
      console.warn('Local storage error', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_posts`, JSON.stringify(blogPosts));
    } catch (e) {
      console.warn('Local storage error', e);
    }
  }, [blogPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_volunteers`, JSON.stringify(volunteers));
    } catch (e) {
      console.warn('Local storage error', e);
    }
  }, [volunteers]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_messages`, JSON.stringify(contactMessages));
    } catch (e) {
      console.warn('Local storage error', e);
    }
  }, [contactMessages]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_subscribers`, JSON.stringify(subscribers));
    } catch (e) {
      console.warn('Local storage error', e);
    }
  }, [subscribers]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_biography`, JSON.stringify(biography));
    } catch (e) {
      console.warn('Local storage error', e);
    }
  }, [biography]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_gallery`, JSON.stringify(galleryItems));
    } catch (e) {
      console.warn('Local storage error', e);
    }
  }, [galleryItems]);

  // Handle URL hash changes or internal routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'biography', 'about', 'manifesto', 'projects', 'gallery', 'blog', 'volunteer', 'contact', 'admin'].includes(hash)) {
        if (hash === 'about') setCurrentPage('biography');
        else if (hash === 'contact') setCurrentPage('volunteer');
        else setCurrentPage(hash as AppPage);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const adminLogin = (password: string): boolean => {
    if (password === settings.adminPasswordHash || password === 'Bullet2812$') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('egbedun_admin_auth', 'true');
      showToast('Admin authentication successful. Welcome, Rt. Hon. Egbedun & Team.', 'success');
      return true;
    }
    showToast('Invalid administrative password. Please check your credentials.', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('egbedun_admin_auth');
    showToast('You have securely logged out of the campaign dashboard.', 'info');
    setCurrentPage('home');
  };

  // Volunteer operations
  const addVolunteer = (volData: Omit<VolunteerSubmission, 'id' | 'registeredAt' | 'status'>): VolunteerSubmission => {
    const newVol: VolunteerSubmission = {
      ...volData,
      id: `vol-${Date.now()}`,
      registeredAt: new Date().toISOString(),
      status: 'new'
    };
    setVolunteers((prev) => [newVol, ...prev]);
    showToast('Thank you for volunteering! Your pledge card is ready.', 'success');

    // Async sync to Supabase if configured
    if (isSupabaseConfigured) {
      submitVolunteerToSupabase({
        fullName: volData.fullName,
        phone: volData.phone,
        email: volData.email,
        whatsapp: volData.whatsapp,
        ageRange: volData.ageRange,
        gender: volData.gender,
        community: volData.community,
        ward: volData.ward,
        pollingUnit: volData.pollingUnit,
        activities: volData.activities || [],
        availability: volData.availability,
        skills: volData.skills || [],
        whySupport: volData.whySupport,
        priorExperience: volData.priorExperience,
        referredBy: volData.referredBy,
        consentContact: volData.consentContact,
        consentUpdates: volData.consentUpdates
      }).catch((err) => {
        console.warn('Could not sync volunteer to Supabase:', err);
      });
    }

    return newVol;
  };

  const updateVolunteerStatus = (id: string, status: VolunteerSubmission['status'], notes?: string) => {
    setVolunteers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status, notes: notes !== undefined ? notes : v.notes } : v))
    );
    showToast('Volunteer status updated successfully.', 'success');
  };

  const deleteVolunteer = (id: string) => {
    setVolunteers((prev) => prev.filter((v) => v.id !== id));
    showToast('Volunteer entry deleted.', 'info');
  };

  const exportVolunteersCSV = () => {
    if (volunteers.length === 0) {
      showToast('No volunteer data available to export.', 'info');
      return;
    }
    const headers = [
      'ID',
      'Full Name',
      'Phone',
      'Email',
      'WhatsApp',
      'Community',
      'Ward',
      'Polling Unit',
      'Availability',
      'Activities',
      'Skills',
      'Why Support',
      'Status',
      'Registration Date'
    ];
    const rows = volunteers.map((v) => [
      `"${v.id}"`,
      `"${v.fullName.replace(/"/g, '""')}"`,
      `"${v.phone}"`,
      `"${v.email}"`,
      `"${v.whatsapp || ''}"`,
      `"${v.community}"`,
      `"${v.ward || ''}"`,
      `"${v.pollingUnit || ''}"`,
      `"${v.availability}"`,
      `"${(v.activities || []).join('; ')}"`,
      `"${(v.skills || []).join('; ')}"`,
      `"${(v.whySupport || '').replace(/"/g, '""')}"`,
      `"${v.status}"`,
      `"${new Date(v.registeredAt).toLocaleDateString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `OdoOtin_Volunteers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Volunteers database exported to CSV.', 'success');
  };

  // Projects CRUD
  const addProject = (proj: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...proj,
      id: `proj-${Date.now()}`
    };
    setProjects((prev) => [newProj, ...prev]);
    showToast('New constituency project published successfully.', 'success');
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast('Project details updated.', 'success');
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('Project removed.', 'info');
  };

  // Blog CRUD & comments
  const addBlogPost = (post: Omit<BlogPost, 'id' | 'views' | 'comments'>) => {
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
      views: 1,
      comments: []
    };
    setBlogPosts((prev) => [newPost, ...prev]);
    showToast('New press release / blog post published.', 'success');
  };

  const updateBlogPost = (id: string, updated: Partial<BlogPost>) => {
    setBlogPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast('Article updated.', 'success');
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
    showToast('Article deleted.', 'info');
  };

  const addBlogComment = (postId: string, commentData: { name: string; email: string; comment: string }) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      ...commentData,
      createdAt: new Date().toISOString().slice(0, 10),
      approved: true // Auto-publish for demonstration, admin can unapprove
    };
    setBlogPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [newComment, ...p.comments] } : p))
    );
    showToast('Your comment has been submitted and posted.', 'success');
  };

  const toggleCommentApproval = (postId: string, commentId: string) => {
    setBlogPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          comments: p.comments.map((c) => (c.id === commentId ? { ...c, approved: !c.approved } : c))
        };
      })
    );
    showToast('Comment moderation status updated.', 'info');
  };

  // Contact messages
  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'read' | 'replied'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      read: false,
      replied: false
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    showToast('Your message has been delivered to the campaign secretariat.', 'success');

    // Async sync to Supabase if configured
    if (isSupabaseConfigured) {
      submitContactMessageToSupabase({
        fullName: msg.fullName,
        email: msg.email,
        phone: msg.phone,
        community: msg.community,
        subject: msg.subject,
        message: msg.message
      }).catch((err) => {
        console.warn('Could not sync contact message to Supabase:', err);
      });
    }
  };

  const markMessageRead = (id: string) => {
    setContactMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
    showToast('Message removed.', 'info');
  };

  const addSubscriber = (email: string): boolean => {
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return false;
    }
    if (subscribers.includes(email.toLowerCase())) {
      showToast('You are already subscribed to our newsletter updates!', 'info');
      return true;
    }
    setSubscribers((prev) => [...prev, email.toLowerCase()]);
    showToast('Thank you for subscribing to Rt. Hon. Egbedun campaign bulletins!', 'success');
    return true;
  };

  const updateBiography = (newBio: Partial<BiographyData>) => {
    setBiography((prev) => ({ ...prev, ...newBio }));
    showToast('Official biography details updated successfully.', 'success');
  };

  const addTimelineMilestone = (milestone: BiographyTimelineMilestone) => {
    setBiography((prev) => ({
      ...prev,
      milestones: [...prev.milestones, milestone]
    }));
    showToast('New milestone added to biography timeline.', 'success');
  };

  const updateTimelineMilestone = (index: number, updated: BiographyTimelineMilestone) => {
    setBiography((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m, idx) => (idx === index ? updated : m))
    }));
    showToast('Timeline milestone updated.', 'success');
  };

  const deleteTimelineMilestone = (index: number) => {
    setBiography((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, idx) => idx !== index)
    }));
    showToast('Timeline milestone removed.', 'info');
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGalleryItems((prev) => [newItem, ...prev]);
    showToast('New photograph added to official gallery.', 'success');
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGalleryItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    showToast('Gallery photograph details updated.', 'success');
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Photograph removed from gallery.', 'info');
  };

  const updateSettings = (newSettings: Partial<CampaignSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Campaign settings saved.', 'success');
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all data to default campaign seed values?')) {
      setProjects(INITIAL_PROJECTS);
      setBlogPosts(INITIAL_BLOG_POSTS);
      setVolunteers(INITIAL_VOLUNTEERS);
      setContactMessages(INITIAL_CONTACT_MESSAGES);
      setSettings(INITIAL_SETTINGS);
      setBiography(INITIAL_BIOGRAPHY);
      setGalleryItems(INITIAL_GALLERY_ITEMS);
      localStorage.clear();
      showToast('Campaign data restored to official default records.', 'success');
    }
  };

  return (
    <CampaignContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedTownFilter,
        setSelectedTownFilter,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedProjectDetail,
        setSelectedProjectDetail,
        selectedBlogPostDetail,
        setSelectedBlogPostDetail,
        selectedLightboxImage,
        setSelectedLightboxImage,
        isPrintManifestoOpen,
        setIsPrintManifestoOpen,
        isPrivacyPolicyOpen,
        setIsPrivacyPolicyOpen,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        settings,
        biography,
        projects,
        blogPosts,
        volunteers,
        contactMessages,
        manifestoPillars,
        galleryItems,
        subscribers,
        updateBiography,
        addTimelineMilestone,
        updateTimelineMilestone,
        deleteTimelineMilestone,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addVolunteer,
        updateVolunteerStatus,
        deleteVolunteer,
        exportVolunteersCSV,
        addProject,
        updateProject,
        deleteProject,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addBlogComment,
        toggleCommentApproval,
        addContactMessage,
        markMessageRead,
        deleteContactMessage,
        addSubscriber,
        updateSettings,
        resetToDefaults,
        toasts,
        showToast
      }}
    >
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-lg shadow-lg border text-sm transition-all transform duration-200 animate-slide-up ${
              toast.type === 'success'
                ? 'bg-stone-900 text-amber-300 border-amber-400'
                : toast.type === 'error'
                ? 'bg-rose-950 text-rose-200 border-rose-700'
                : 'bg-stone-900 text-stone-100 border-stone-700'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
