import React, { useState, useEffect } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { AccordBadge } from '../components/common/AccordBadge';
import {
  ODO_OTIN_COMMUNITIES,
  OdoOtinCommunity,
  Project,
  BlogPost,
  VolunteerSubmission,
  GalleryItem,
  BiographyData,
  BiographyTimelineMilestone
} from '../types';
import {
  Lock,
  Unlock,
  Shield,
  LayoutDashboard,
  Users,
  Building2,
  BookOpen,
  Mail,
  Settings,
  Download,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  LogOut,
  RefreshCw,
  Search,
  MessageSquare,
  Sparkles,
  Phone,
  FileSpreadsheet,
  UserCheck,
  Image as ImageIcon,
  Save,
  ExternalLink,
  X,
  Calendar,
  MapPin,
  Tag,
  Check,
  Award,
  GraduationCap,
  Landmark,
  Heart,
  Database,
  FileText,
  Upload
} from 'lucide-react';
import { checkSupabaseConnection, isSupabaseConfigured, supabaseUrl } from '../lib/supabase';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    settings,
    updateSettings,
    biography,
    updateBiography,
    addTimelineMilestone,
    updateTimelineMilestone,
    deleteTimelineMilestone,
    projects,
    addProject,
    updateProject,
    deleteProject,
    galleryItems,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    toggleCommentApproval,
    volunteers,
    updateVolunteerStatus,
    deleteVolunteer,
    exportVolunteersCSV,
    contactMessages,
    markMessageRead,
    deleteContactMessage,
    onePageManifesto,
    updateOnePageManifesto,
    resetToDefaults,
    showToast,
    setCurrentPage
  } = useCampaign();

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('admin');

  // Active admin tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'manifesto' | 'biography' | 'projects' | 'gallery' | 'volunteers' | 'messages' | 'settings'
  >('overview');

  // Biography editable form state
  const [bioForm, setBioForm] = useState<BiographyData>(biography);
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [newMileYear, setNewMileYear] = useState('');
  const [newMileTitle, setNewMileTitle] = useState('');
  const [newMileDesc, setNewMileDesc] = useState('');

  // Supabase Live Connectivity State
  const [supabaseStatus, setSupabaseStatus] = useState<{
    checking: boolean;
    connected: boolean;
    projectUrl: string;
    tables?: { projects: boolean; volunteers: boolean; messages: boolean };
    error?: string;
  }>({
    checking: true,
    connected: false,
    projectUrl: supabaseUrl
  });

  const testSupabase = async () => {
    setSupabaseStatus((prev) => ({ ...prev, checking: true, error: undefined }));
    const res = await checkSupabaseConnection();
    setSupabaseStatus({
      checking: false,
      connected: res.connected,
      projectUrl: res.projectUrl,
      tables: res.tables,
      error: res.error
    });
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      testSupabase();
    }
  }, [isAdminLoggedIn]);

  // Keep bioForm in sync if biography changes externally
  useEffect(() => {
    setBioForm(biography);
  }, [biography]);

  // Manifesto Editor Form State
  const [manifestoForm, setManifestoForm] = useState(onePageManifesto);
  const [newHighlightText, setNewHighlightText] = useState('');

  useEffect(() => {
    setManifestoForm(onePageManifesto);
  }, [onePageManifesto]);

  // Project creation & editing state
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projSearch, setProjSearch] = useState('');
  const [projTownFilter, setProjTownFilter] = useState<string>('All');
  const [projStatusFilter, setProjStatusFilter] = useState<string>('All');

  // Project Form Fields
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCategory, setNewProjCategory] = useState<Project['category']>('Roads & Infrastructure');
  const [newProjCommunity, setNewProjCommunity] = useState<OdoOtinCommunity>('Okuku');
  const [newProjStatus, setNewProjStatus] = useState<Project['status']>('Completed');
  const [newProjYear, setNewProjYear] = useState(2025);
  const [newProjBudget, setNewProjBudget] = useState('₦85,000,000');
  const [newProjBeneficiaries, setNewProjBeneficiaries] = useState('10,000+ residents');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjScope, setNewProjScope] = useState('');
  const [newProjAfterImage, setNewProjAfterImage] = useState('/src/assets/images/infrastructure_project_commissioning_1790568798405.jpg');
  const [newProjFeatured, setNewProjFeatured] = useState(true);

  // Gallery creation & editing state
  const [isAddingGalleryItem, setIsAddingGalleryItem] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [galCategoryFilter, setGalCategoryFilter] = useState<string>('All');
  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalCategory, setNewGalCategory] = useState<GalleryItem['category']>('Community Engagement');
  const [newGalLocation, setNewGalLocation] = useState('Okuku, Odo-Otin Local Government');
  const [newGalDate, setNewGalDate] = useState('September 2026');
  const [newGalUrl, setNewGalUrl] = useState('/src/assets/images/campaign_rally_odon_otin_1790568787984.jpg');
  const [newGalCaption, setNewGalCaption] = useState('');

  // Blog creation & editing state
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<BlogPost['category']>('Press Releases');
  const [newPostExcerpt, setNewPostExcerpt] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('Odo-Otin, Egbedun, 2027');
  const [newPostAuthor, setNewPostAuthor] = useState('Rt. Hon. Adewale Egbedun Media Bureau');
  const [newPostImage, setNewPostImage] = useState('/src/assets/images/campaign_rally_odon_otin_1790568787984.jpg');

  // Volunteer filters
  const [volSearch, setVolSearch] = useState('');
  const [volTownFilter, setVolTownFilter] = useState<string>('All');
  const [volStatusFilter, setVolStatusFilter] = useState<string>('All');

  // Password change state
  const [newPassword, setNewPassword] = useState('');

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(passwordInput);
  };

  // Handle Save Biography
  const handleSaveBiography = (e: React.FormEvent) => {
    e.preventDefault();
    updateBiography(bioForm);
  };

  // Handle Add Milestone
  const handleAddMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMileYear || !newMileTitle || !newMileDesc) {
      showToast('Please fill all milestone fields.', 'error');
      return;
    }
    addTimelineMilestone({
      year: newMileYear,
      title: newMileTitle,
      desc: newMileDesc
    });
    setNewMileYear('');
    setNewMileTitle('');
    setNewMileDesc('');
    setIsAddingMilestone(false);
  };

  // Open Edit Project
  const handleStartEditProject = (proj: Project) => {
    setEditingProject(proj);
    setNewProjTitle(proj.title);
    setNewProjCategory(proj.category);
    setNewProjCommunity(proj.community);
    setNewProjStatus(proj.status);
    setNewProjYear(proj.year);
    setNewProjBudget(proj.budget);
    setNewProjBeneficiaries(proj.beneficiaries);
    setNewProjDesc(proj.description);
    setNewProjScope(proj.detailedScope);
    setNewProjAfterImage(proj.afterImageUrl);
    setNewProjFeatured(proj.featured);
    setIsAddingProject(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Handle Save or Update Project
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle || !newProjDesc) {
      showToast('Please enter project title and description.', 'error');
      return;
    }

    if (editingProject) {
      updateProject(editingProject.id, {
        title: newProjTitle,
        category: newProjCategory,
        community: newProjCommunity,
        status: newProjStatus,
        year: newProjYear,
        budget: newProjBudget,
        beneficiaries: newProjBeneficiaries,
        description: newProjDesc,
        detailedScope: newProjScope,
        afterImageUrl: newProjAfterImage,
        featured: newProjFeatured
      });
      setEditingProject(null);
    } else {
      addProject({
        title: newProjTitle,
        category: newProjCategory,
        community: newProjCommunity,
        status: newProjStatus,
        year: newProjYear,
        budget: newProjBudget,
        beneficiaries: newProjBeneficiaries,
        description: newProjDesc,
        detailedScope: newProjScope,
        afterImageUrl: newProjAfterImage,
        featured: newProjFeatured
      });
    }

    setIsAddingProject(false);
    // Reset form
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjScope('');
  };

  // Open Edit Gallery Item
  const handleStartEditGallery = (item: GalleryItem) => {
    setEditingGalleryItem(item);
    setNewGalTitle(item.title);
    setNewGalCategory(item.category);
    setNewGalLocation(item.location);
    setNewGalDate(item.date);
    setNewGalUrl(item.imageUrl);
    setNewGalCaption(item.caption);
    setIsAddingGalleryItem(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Handle Save Gallery Item
  const handleSaveGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalTitle || !newGalUrl) {
      showToast('Please provide a picture title and image URL.', 'error');
      return;
    }

    if (editingGalleryItem) {
      updateGalleryItem(editingGalleryItem.id, {
        title: newGalTitle,
        category: newGalCategory,
        location: newGalLocation,
        date: newGalDate,
        imageUrl: newGalUrl,
        caption: newGalCaption
      });
      setEditingGalleryItem(null);
    } else {
      addGalleryItem({
        title: newGalTitle,
        category: newGalCategory,
        location: newGalLocation,
        date: newGalDate,
        imageUrl: newGalUrl,
        caption: newGalCaption
      });
    }

    setIsAddingGalleryItem(false);
    setNewGalTitle('');
    setNewGalCaption('');
  };

  // Open Edit Blog Post
  const handleStartEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setNewPostTitle(post.title);
    setNewPostCategory(post.category);
    setNewPostExcerpt(post.excerpt);
    setNewPostContent(post.content.replace(/<[^>]*>/g, '\n\n').trim());
    setNewPostTags(post.tags.join(', '));
    setNewPostAuthor(post.author);
    setNewPostImage(post.featuredImage);
    setIsAddingPost(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Handle Save Blog Post
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle || !newPostExcerpt || !newPostContent) {
      showToast('Please fill in article fields.', 'error');
      return;
    }

    const formattedContent = `<p class="mb-4">${newPostContent.replace(/\n\n/g, '</p><p class="mb-4">')}</p>`;

    if (editingPost) {
      updateBlogPost(editingPost.id, {
        title: newPostTitle,
        category: newPostCategory,
        excerpt: newPostExcerpt,
        content: formattedContent,
        author: newPostAuthor,
        featuredImage: newPostImage,
        tags: newPostTags.split(',').map((t) => t.trim())
      });
      setEditingPost(null);
    } else {
      addBlogPost({
        title: newPostTitle,
        slug: newPostTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        category: newPostCategory,
        excerpt: newPostExcerpt,
        content: formattedContent,
        author: newPostAuthor,
        authorRole: 'Chief Press Secretary',
        date: new Date().toISOString().slice(0, 10),
        readTime: '3 min read',
        featuredImage: newPostImage,
        tags: newPostTags.split(',').map((t) => t.trim()),
        published: true
      });
    }

    setIsAddingPost(false);
    setNewPostTitle('');
    setNewPostExcerpt('');
    setNewPostContent('');
  };

  // Filtered Projects
  const filteredProjects = projects.filter((p) => {
    if (projTownFilter !== 'All' && p.community !== projTownFilter) return false;
    if (projStatusFilter !== 'All' && p.status !== projStatusFilter) return false;
    if (projSearch.trim()) {
      const q = projSearch.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  // Filtered Gallery Items
  const filteredGallery = galleryItems.filter((item) => {
    if (galCategoryFilter !== 'All' && item.category !== galCategoryFilter) return false;
    return true;
  });

  // Filtered Volunteers
  const filteredVolunteers = volunteers.filter((v) => {
    if (volTownFilter !== 'All' && v.community !== volTownFilter) return false;
    if (volStatusFilter !== 'All' && v.status !== volStatusFilter) return false;
    if (volSearch.trim()) {
      const q = volSearch.toLowerCase();
      const matchName = v.fullName.toLowerCase().includes(q);
      const matchPhone = v.phone.includes(q);
      const matchEmail = v.email.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchEmail) return false;
    }
    return true;
  });

  // If not authenticated, render login screen
  if (!isAdminLoggedIn) {
    return (
      <div className="py-16 sm:py-24 bg-stone-100 flex items-center justify-center px-4 min-h-[75vh]">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-stone-300 shadow-xl text-left space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold font-display text-stone-900">
              Campaign Admin Console
            </h1>
            <p className="text-xs text-stone-500">
              Restricted portal for Rt. Hon. Adewale Egbedun Campaign Operations & Secretariat
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Admin Username
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Passcode / Access Key
              </label>
              <input
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-stone-400 border-t border-stone-100">
            For campaign inquiries, contact Secretariat: <strong>{settings.emailAddress}</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-stone-100 min-h-screen text-left text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Admin Header Bar */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-400 text-stone-950 font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold font-display text-stone-950">
                  Welcome, Rt. Hon. Adewale Egbedun & Team
                </h1>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Live Operations
                </span>
                {supabaseStatus.connected ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-2xs"
                    title={`Connected to Supabase PostgreSQL at ${supabaseStatus.projectUrl}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <Database className="w-3 h-3 text-emerald-600" />
                    <span>Supabase: Connected</span>
                  </span>
                ) : supabaseStatus.checking ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                    <span>Supabase: Checking...</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-stone-100 text-stone-600 border border-stone-300 px-2 py-0.5 rounded-full">
                    <span>Supabase: Offline</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500">
                Odo-Otin State Constituency 2027 Re-election Management Console
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-stone-600" />
              <span>View Public Site</span>
            </button>
            <button
              onClick={exportVolunteersCSV}
              className="px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={adminLogout}
              className="px-3 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-rose-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-white rounded-xl border border-stone-200 shadow-xs">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'manifesto', label: 'Edit Manifesto', icon: FileText },
            { id: 'biography', label: 'Edit Biography', icon: UserCheck },
            { id: 'projects', label: `Projects (${projects.length})`, icon: Building2 },
            { id: 'gallery', label: `Pictures (${galleryItems.length})`, icon: ImageIcon },
            { id: 'volunteers', label: `Volunteers (${volunteers.length})`, icon: Users },
            { id: 'messages', label: `Messages (${contactMessages.length})`, icon: Mail },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Registered Mobilizers
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-display text-amber-600 tabular-nums mt-1">
                  {volunteers.length + 420}
                </div>
                <span className="text-[10px] text-emerald-600 font-medium">
                  +18 joined this week
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Documented Projects
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-display text-stone-900 tabular-nums mt-1">
                  {projects.length}
                </div>
                <span className="text-[10px] text-stone-500">
                  Across all 16 communities
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Gallery Photographs
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-display text-emerald-700 tabular-nums mt-1">
                  {galleryItems.length}
                </div>
                <span className="text-[10px] text-stone-500">
                  In official media library
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Total Interventions
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-display text-emerald-700 tabular-nums mt-1">
                  {projects.length}
                </div>
                <span className="text-[10px] text-stone-500">
                  Documented since 2023
                </span>
              </div>
            </div>

            {/* Quick Action Shortcuts */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">
                Quick Content Management Shortcuts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                <button
                  onClick={() => setActiveTab('biography')}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 transition-all cursor-pointer group"
                >
                  <UserCheck className="w-5 h-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-sm text-stone-900">Edit Biography</div>
                  <p className="text-xs text-stone-500 mt-1">Update profile, narrative chapters, and career timeline.</p>
                </button>

                <button
                  onClick={() => { setActiveTab('projects'); setIsAddingProject(true); }}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-emerald-50 hover:border-emerald-300 transition-all cursor-pointer group"
                >
                  <Building2 className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-sm text-stone-900">Add New Project</div>
                  <p className="text-xs text-stone-500 mt-1">Publish a road, healthcare, or school project in Odo-Otin.</p>
                </button>

                <button
                  onClick={() => { setActiveTab('gallery'); setIsAddingGalleryItem(true); }}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-sky-50 hover:border-sky-300 transition-all cursor-pointer group"
                >
                  <ImageIcon className="w-5 h-5 text-sky-600 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-sm text-stone-900">Add Picture</div>
                  <p className="text-xs text-stone-500 mt-1">Add official photographs of Speaker Egbedun in action.</p>
                </button>

                <button
                  onClick={() => { setActiveTab('manifesto'); }}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 transition-all cursor-pointer group"
                >
                  <FileText className="w-5 h-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-sm text-stone-900">Edit Manifesto</div>
                  <p className="text-xs text-stone-500 mt-1">Upload and customize your official one-page manifesto.</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: EDIT MANIFESTO */}
        {activeTab === 'manifesto' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-stone-950 font-display flex items-center gap-2">
                  <span>Edit One-Page Manifesto</span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                    2027–2031 Blueprint
                  </span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Upload your one-page manifesto document (image or PDF), update key commitments, and customize candidate remarks.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setCurrentPage('manifesto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Public Manifesto Page</span>
                </button>
                <button
                  onClick={() => {
                    updateOnePageManifesto(manifestoForm);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-amber-300" />
                  <span>Save Manifesto</span>
                </button>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateOnePageManifesto(manifestoForm);
              }}
              className="space-y-8 text-xs"
            >
              {/* SECTION 1: MANIFESTO FILE UPLOAD & PREVIEW */}
              <div className="p-5 sm:p-6 rounded-xl border border-stone-200 bg-stone-50 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                      <Upload className="w-4 h-4 text-amber-600" />
                      <span>One-Page Manifesto File (Upload or Paste Link)</span>
                    </h3>
                    <p className="text-xs text-stone-500">
                      Upload your high-resolution manifesto image (JPG, PNG) or document PDF to display directly to constituents.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
                  {/* File Upload / URL controls (7 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Direct Local File Picker */}
                    <div className="border-2 border-dashed border-stone-300 hover:border-amber-400 bg-white rounded-xl p-5 text-center transition-colors">
                      <Upload className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                      <p className="text-xs font-bold text-stone-800">
                        Choose a local image or PDF from your device
                      </p>
                      <p className="text-[11px] text-stone-500 mb-3">
                        Recommended: PNG, JPG, or PDF (High Resolution One-Page layout)
                      </p>
                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg cursor-pointer transition-colors shadow-xs">
                        <span>Select File from Computer / Phone</span>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
                              const reader = new FileReader();
                              reader.onload = () => {
                                const result = reader.result as string;
                                setManifestoForm((prev) => ({
                                  ...prev,
                                  fileUrl: result,
                                  fileName: file.name,
                                  fileType: isPdf ? 'pdf' : 'image'
                                }));
                                showToast(`Loaded "${file.name}" ready to save.`, 'info');
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Or URL link input */}
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        Or provide Image / PDF Web URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="https://... or /src/assets/..."
                          value={manifestoForm.fileUrl}
                          onChange={(e) => {
                            const val = e.target.value;
                            const isPdf = val.toLowerCase().endsWith('.pdf');
                            setManifestoForm({
                              ...manifestoForm,
                              fileUrl: val,
                              fileType: isPdf ? 'pdf' : 'image'
                            });
                          }}
                          className="flex-1 px-3 py-2 bg-white rounded-lg border border-stone-300 font-mono text-[11px]"
                        />
                        {manifestoForm.fileUrl && (
                          <button
                            type="button"
                            onClick={() => setManifestoForm({ ...manifestoForm, fileUrl: '', fileName: '', fileType: 'none' })}
                            className="px-3 py-2 bg-stone-200 hover:bg-rose-100 hover:text-rose-700 text-stone-700 font-bold rounded-lg cursor-pointer"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">File Format</label>
                        <select
                          value={manifestoForm.fileType}
                          onChange={(e) => setManifestoForm({ ...manifestoForm, fileType: e.target.value as any })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                        >
                          <option value="image">Image (JPG, PNG, WEBP)</option>
                          <option value="pdf">Document (PDF)</option>
                          <option value="none">No File Uploaded</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">Document File Name</label>
                        <input
                          type="text"
                          value={manifestoForm.fileName || ''}
                          onChange={(e) => setManifestoForm({ ...manifestoForm, fileName: e.target.value })}
                          placeholder="e.g. Egbedun_2027_Manifesto.pdf"
                          className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="enableDownloadCheckbox"
                        checked={manifestoForm.enableDownload}
                        onChange={(e) => setManifestoForm({ ...manifestoForm, enableDownload: e.target.checked })}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                      />
                      <label htmlFor="enableDownloadCheckbox" className="text-stone-700 font-semibold cursor-pointer">
                        Enable direct download button on the public website
                      </label>
                    </div>
                  </div>

                  {/* Live Visual Preview Box (5 cols) */}
                  <div className="lg:col-span-5 bg-stone-900 rounded-xl p-4 text-white text-center flex flex-col justify-between min-h-[340px] border border-stone-800">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block text-left">
                      Live Document Preview
                    </span>

                    <div className="my-auto py-2 flex items-center justify-center">
                      {manifestoForm.fileUrl ? (
                        manifestoForm.fileType === 'pdf' ? (
                          <div className="p-6 text-center space-y-2">
                            <FileText className="w-12 h-12 text-amber-400 mx-auto" />
                            <p className="text-xs font-bold text-white">PDF Document Ready</p>
                            <p className="text-[10px] text-stone-400 break-all">{manifestoForm.fileName || 'Manifesto.pdf'}</p>
                          </div>
                        ) : (
                          <img
                            src={manifestoForm.fileUrl}
                            alt="Manifesto Preview"
                            className="max-h-[260px] w-auto max-w-full rounded shadow-md object-contain mx-auto"
                          />
                        )
                      ) : (
                        <div className="text-stone-500 py-10 space-y-1">
                          <FileText className="w-10 h-10 mx-auto opacity-30" />
                          <p className="text-xs">No document preview available yet.</p>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-stone-400 border-t border-stone-800 pt-2 flex justify-between">
                      <span>Status: {manifestoForm.fileUrl ? 'Ready to publish' : 'Empty'}</span>
                      <span className="capitalize">{manifestoForm.fileType} format</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: HEADLINES & DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Manifesto Page Main Title *
                  </label>
                  <input
                    type="text"
                    value={manifestoForm.title}
                    onChange={(e) => setManifestoForm({ ...manifestoForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Version / Release Tag
                  </label>
                  <input
                    type="text"
                    value={manifestoForm.versionDate}
                    onChange={(e) => setManifestoForm({ ...manifestoForm, versionDate: e.target.value })}
                    placeholder="e.g. November 2026 Edition"
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 font-mono text-[11px]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-semibold mb-1">
                    Manifesto Subtitle & Narrative Summary
                  </label>
                  <textarea
                    rows={2}
                    value={manifestoForm.subtitle}
                    onChange={(e) => setManifestoForm({ ...manifestoForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-semibold mb-1">
                    Candidate Statement / Direct Foreword
                  </label>
                  <textarea
                    rows={3}
                    value={manifestoForm.candidateStatement}
                    onChange={(e) => setManifestoForm({ ...manifestoForm, candidateStatement: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 italic"
                    placeholder="Candidate personal message to the electorate..."
                  />
                </div>
              </div>

              {/* SECTION 3: KEY PRIORITY BULLET HIGHLIGHTS */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                      Key Governance Commitments & Bullet Points ({manifestoForm.summaryHighlights.length})
                    </h3>
                    <p className="text-xs text-stone-500">
                      These points appear alongside your uploaded document on the public page.
                    </p>
                  </div>
                </div>

                {/* Add new point row */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter a new policy priority or commitment..."
                    value={newHighlightText}
                    onChange={(e) => setNewHighlightText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newHighlightText.trim()) {
                          setManifestoForm({
                            ...manifestoForm,
                            summaryHighlights: [...manifestoForm.summaryHighlights, newHighlightText.trim()]
                          });
                          setNewHighlightText('');
                        }
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newHighlightText.trim()) {
                        setManifestoForm({
                          ...manifestoForm,
                          summaryHighlights: [...manifestoForm.summaryHighlights, newHighlightText.trim()]
                        });
                        setNewHighlightText('');
                      }
                    }}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add Item</span>
                  </button>
                </div>

                {/* Existing list */}
                <div className="space-y-2">
                  {manifestoForm.summaryHighlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200"
                    >
                      <div className="flex items-start gap-2.5 flex-1">
                        <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={hl}
                          onChange={(e) => {
                            const updated = [...manifestoForm.summaryHighlights];
                            updated[idx] = e.target.value;
                            setManifestoForm({ ...manifestoForm, summaryHighlights: updated });
                          }}
                          className="flex-1 bg-white px-2.5 py-1 rounded border border-stone-300 text-xs"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = manifestoForm.summaryHighlights.filter((_, i) => i !== idx);
                          setManifestoForm({ ...manifestoForm, summaryHighlights: updated });
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded cursor-pointer"
                        title="Delete highlight"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="pt-6 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setManifestoForm(onePageManifesto);
                    showToast('Manifesto form reset to last saved state.', 'info');
                  }}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl cursor-pointer"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-colors"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>Save & Publish Manifesto</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: BIOGRAPHY */}
        {activeTab === 'biography' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-stone-950 font-display">
                  Edit Candidate Official Biography
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Update personal profile, credentials, narrative sections, and career timeline milestones.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setCurrentPage('biography'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Public Biography</span>
                </button>
                <button
                  onClick={handleSaveBiography}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-amber-300" />
                  <span>Save Biography Changes</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveBiography} className="space-y-8 text-xs">
              {/* SECTION A: Candidate Identity & Offices */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Candidate Identity & Offices</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Full Legal / Political Name *</label>
                    <input
                      type="text"
                      value={bioForm.fullName}
                      onChange={(e) => setBioForm({ ...bioForm, fullName: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Official Title *</label>
                    <input
                      type="text"
                      value={bioForm.officialTitle}
                      onChange={(e) => setBioForm({ ...bioForm, officialTitle: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Sub-title / Representation *</label>
                    <input
                      type="text"
                      value={bioForm.subTitle}
                      onChange={(e) => setBioForm({ ...bioForm, subTitle: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Office Held</label>
                    <input
                      type="text"
                      value={bioForm.officeHeld}
                      onChange={(e) => setBioForm({ ...bioForm, officeHeld: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Constituency Name</label>
                    <input
                      type="text"
                      value={bioForm.constituencyName}
                      onChange={(e) => setBioForm({ ...bioForm, constituencyName: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Political Platform / Party</label>
                    <input
                      type="text"
                      value={bioForm.politicalPlatform}
                      onChange={(e) => setBioForm({ ...bioForm, politicalPlatform: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                    />
                  </div>
                </div>

                {/* Portrait URL with preview */}
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-16 h-20 rounded-lg overflow-hidden border border-stone-300 shrink-0 bg-stone-200">
                    <img
                      src={bioForm.portraitUrl}
                      alt="Portrait Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-stone-700 font-semibold mb-1">Candidate Portrait Image URL *</label>
                    <input
                      type="text"
                      value={bioForm.portraitUrl}
                      onChange={(e) => setBioForm({ ...bioForm, portraitUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 font-mono text-[11px]"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-[10px] text-stone-500">Preset portrait:</span>
                      <button
                        type="button"
                        onClick={() => setBioForm({ ...bioForm, portraitUrl: '/src/assets/images/hon_adewale_egbedun_portrait_1790568774499.jpg' })}
                        className="text-[10px] px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 cursor-pointer font-mono"
                      >
                        Default Official Portrait
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: Profile Snapshot Attributes */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Profile Snapshot Attributes</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Hometown / Origin</label>
                    <input
                      type="text"
                      value={bioForm.hometown}
                      onChange={(e) => setBioForm({ ...bioForm, hometown: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Educational Background</label>
                    <input
                      type="text"
                      value={bioForm.education}
                      onChange={(e) => setBioForm({ ...bioForm, education: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Legislative Core Focus</label>
                    <input
                      type="text"
                      value={bioForm.legislativeFocus}
                      onChange={(e) => setBioForm({ ...bioForm, legislativeFocus: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Faith & Family</label>
                    <input
                      type="text"
                      value={bioForm.faithAndFamily}
                      onChange={(e) => setBioForm({ ...bioForm, faithAndFamily: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION C: Narrative Chapters */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  <span>Narrative Biography Chapters</span>
                </h3>

                {/* Chapter 1: Early Life */}
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Chapter 1 Title</label>
                    <input
                      type="text"
                      value={bioForm.earlyLifeTitle}
                      onChange={(e) => setBioForm({ ...bioForm, earlyLifeTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Paragraph 1</label>
                    <textarea
                      rows={3}
                      value={bioForm.earlyLifeParagraph1}
                      onChange={(e) => setBioForm({ ...bioForm, earlyLifeParagraph1: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Paragraph 2</label>
                    <textarea
                      rows={2}
                      value={bioForm.earlyLifeParagraph2}
                      onChange={(e) => setBioForm({ ...bioForm, earlyLifeParagraph2: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    />
                  </div>
                </div>

                {/* Chapter 2: Speakership */}
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Chapter 2 Title</label>
                    <input
                      type="text"
                      value={bioForm.speakershipTitle}
                      onChange={(e) => setBioForm({ ...bioForm, speakershipTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Paragraph 1</label>
                    <textarea
                      rows={3}
                      value={bioForm.speakershipParagraph1}
                      onChange={(e) => setBioForm({ ...bioForm, speakershipParagraph1: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Paragraph 2</label>
                    <textarea
                      rows={2}
                      value={bioForm.speakershipParagraph2}
                      onChange={(e) => setBioForm({ ...bioForm, speakershipParagraph2: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    />
                  </div>
                </div>

                {/* Chapter 3: Bond with Constituents */}
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Chapter 3 Title</label>
                    <input
                      type="text"
                      value={bioForm.constituentsBondTitle}
                      onChange={(e) => setBioForm({ ...bioForm, constituentsBondTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Paragraph</label>
                    <textarea
                      rows={3}
                      value={bioForm.constituentsBondParagraph1}
                      onChange={(e) => setBioForm({ ...bioForm, constituentsBondParagraph1: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Candidate Direct Leadership Quote</label>
                    <textarea
                      rows={2}
                      value={bioForm.constituentsBondQuote}
                      onChange={(e) => setBioForm({ ...bioForm, constituentsBondQuote: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 italic"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION D: Career Timeline Milestones */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>Career & Leadership Timeline Milestones ({bioForm.milestones.length})</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAddingMilestone(!isAddingMilestone)}
                    className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-md flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAddingMilestone ? 'Cancel' : 'Add Milestone'}</span>
                  </button>
                </div>

                {/* Add Milestone Sub-form */}
                {isAddingMilestone && (
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-300 space-y-3">
                    <h4 className="font-bold text-stone-900">New Timeline Milestone</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">Year / Period *</label>
                        <input
                          type="text"
                          placeholder="e.g. 2027"
                          value={newMileYear}
                          onChange={(e) => setNewMileYear(e.target.value)}
                          className="w-full px-3 py-2 bg-white rounded border border-stone-300 font-bold"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-stone-700 font-semibold mb-1">Milestone Headline *</label>
                        <input
                          type="text"
                          placeholder="e.g. Launch of Rural Electrification & Solar Grid"
                          value={newMileTitle}
                          onChange={(e) => setNewMileTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-white rounded border border-stone-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Milestone Description *</label>
                      <textarea
                        rows={2}
                        placeholder="Detailed impact achieved..."
                        value={newMileDesc}
                        onChange={(e) => setNewMileDesc(e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded border border-stone-300"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddMilestoneSubmit}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg cursor-pointer"
                    >
                      Save Milestone
                    </button>
                  </div>
                )}

                {/* Milestones List */}
                <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-white">
                  {bioForm.milestones.map((m, idx) => (
                    <div key={idx} className="p-4 flex items-start justify-between gap-4 hover:bg-stone-50/80">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                            {m.year}
                          </span>
                          <span className="font-bold text-stone-900 text-sm">{m.title}</span>
                        </div>
                        <p className="text-stone-600 text-xs leading-relaxed">{m.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteTimelineMilestone(idx)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded cursor-pointer shrink-0"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Save Action */}
              <div className="pt-4 border-t border-stone-200 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-colors"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>Save All Biography Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-stone-950 font-display">
                  Constituency Projects Management
                </h2>
                <p className="text-xs text-stone-500">
                  Add, edit, or remove documented projects across all 16 communities of Odo-Otin.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setCurrentPage('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Public Projects</span>
                </button>
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setNewProjTitle('');
                    setNewProjDesc('');
                    setNewProjScope('');
                    setIsAddingProject(!isAddingProject);
                  }}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingProject ? 'Close Form' : 'Add New Project'}</span>
                </button>
              </div>
            </div>

            {/* Add / Edit Project Form */}
            {isAddingProject && (
              <form onSubmit={handleSaveProject} className="p-6 bg-stone-50 rounded-xl border border-stone-300 shadow-inner space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    {editingProject ? `Editing: ${editingProject.title}` : 'Add New Constituency Project'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => { setIsAddingProject(false); setEditingProject(null); }}
                    className="text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Project Title *</label>
                    <input
                      type="text"
                      value={newProjTitle}
                      onChange={(e) => setNewProjTitle(e.target.value)}
                      required
                      placeholder="e.g. Reconstruction of Okuku - Ijabe Asphalt Link Road"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Community (16 Towns) *</label>
                    <select
                      value={newProjCommunity}
                      onChange={(e) => setNewProjCommunity(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 font-semibold"
                    >
                      {ODO_OTIN_COMMUNITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Category</label>
                    <select
                      value={newProjCategory}
                      onChange={(e) => setNewProjCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    >
                      <option value="Roads & Infrastructure">Roads & Infrastructure</option>
                      <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                      <option value="Education & Schools">Education & Schools</option>
                      <option value="Water & Sanitation">Water & Sanitation</option>
                      <option value="Rural Electrification & Solar">Rural Electrification & Solar</option>
                      <option value="Agriculture & Markets">Agriculture & Markets</option>
                      <option value="Youth & Women Empowerment">Youth & Women Empowerment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Execution Status</label>
                    <select
                      value={newProjStatus}
                      onChange={(e) => setNewProjStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 font-semibold"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Planned">Planned</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Year</label>
                    <input
                      type="number"
                      value={newProjYear}
                      onChange={(e) => setNewProjYear(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Budget / Valuation (₦)</label>
                    <input
                      type="text"
                      value={newProjBudget}
                      onChange={(e) => setNewProjBudget(e.target.value)}
                      placeholder="e.g. ₦185,000,000"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Beneficiaries Metric</label>
                    <input
                      type="text"
                      value={newProjBeneficiaries}
                      onChange={(e) => setNewProjBeneficiaries(e.target.value)}
                      placeholder="e.g. 35,000+ residents & commuters"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Project Photograph Image URL</label>
                  <input
                    type="text"
                    value={newProjAfterImage}
                    onChange={(e) => setNewProjAfterImage(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 font-mono text-[11px]"
                  />
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <span className="text-[10px] text-stone-500">Preset photo options:</span>
                    <button
                      type="button"
                      onClick={() => setNewProjAfterImage('/src/assets/images/infrastructure_project_commissioning_1790568798405.jpg')}
                      className="text-[10px] px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 cursor-pointer"
                    >
                      Road Commissioning
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewProjAfterImage('/src/assets/images/empowerment_program_event_1790568809065.jpg')}
                      className="text-[10px] px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 cursor-pointer"
                    >
                      Empowerment & Healthcare
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewProjAfterImage('/src/assets/images/campaign_rally_odon_otin_1790568787984.jpg')}
                      className="text-[10px] px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 cursor-pointer"
                    >
                      Community Hall
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Executive Summary Description *</label>
                  <textarea
                    rows={2}
                    value={newProjDesc}
                    onChange={(e) => setNewProjDesc(e.target.value)}
                    required
                    placeholder="Short description of the problem solved..."
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Detailed Technical Scope</label>
                  <textarea
                    rows={2}
                    value={newProjScope}
                    onChange={(e) => setNewProjScope(e.target.value)}
                    placeholder="Specific engineering parameters, drainage, equipment specs..."
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="projFeatured"
                    checked={newProjFeatured}
                    onChange={(e) => setNewProjFeatured(e.target.checked)}
                    className="rounded border-stone-300 text-amber-500 focus:ring-amber-400"
                  />
                  <label htmlFor="projFeatured" className="text-stone-700 font-semibold cursor-pointer">
                    Feature prominently on the Campaign Homepage
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-stone-900 text-amber-300 hover:text-white font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
                  >
                    {editingProject ? 'Update Project Record' : 'Publish Project Record'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsAddingProject(false); setEditingProject(null); }}
                    className="px-4 py-2.5 bg-stone-200 text-stone-700 font-semibold rounded-lg hover:bg-stone-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 text-xs">
              <div className="relative flex-1 w-full">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search projects by title or description..."
                  value={projSearch}
                  onChange={(e) => setProjSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 bg-stone-50"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={projTownFilter}
                  onChange={(e) => setProjTownFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 font-semibold"
                >
                  <option value="All">All Communities (16)</option>
                  {ODO_OTIN_COMMUNITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select
                  value={projStatusFilter}
                  onChange={(e) => setProjStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 font-semibold"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Planned">Planned</option>
                </select>
              </div>
            </div>

            {/* Existing Projects Table */}
            <div className="overflow-x-auto border border-stone-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                  <tr>
                    <th className="p-3">Project Title</th>
                    <th className="p-3">Community</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Year</th>
                    <th className="p-3">Valuation</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filteredProjects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-stone-50/70">
                      <td className="p-3 font-bold text-stone-900 max-w-xs">
                        <div className="truncate">{proj.title}</div>
                        {proj.featured && (
                          <span className="inline-block text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded mt-0.5">
                            Featured on Home
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-semibold text-stone-800">{proj.community}</td>
                      <td className="p-3 text-stone-600">{proj.category}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          proj.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : proj.status === 'Ongoing'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}>
                          {proj.status}
                        </span>
                      </td>
                      <td className="p-3 text-stone-600">{proj.year}</td>
                      <td className="p-3 text-stone-600 font-mono">{proj.budget}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleStartEditProject(proj)}
                            className="p-1.5 text-stone-500 hover:text-amber-600 rounded hover:bg-stone-100 cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete "${proj.title}"?`)) {
                                deleteProject(proj.id);
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded hover:bg-rose-50 cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PICTURES & GALLERY */}
        {activeTab === 'gallery' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-stone-950 font-display">
                  Official Gallery & Pictures Manager
                </h2>
                <p className="text-xs text-stone-500">
                  Add, update, or remove photographic documentation of Speaker Egbedun in Odo-Otin.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setCurrentPage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Public Gallery</span>
                </button>
                <button
                  onClick={() => {
                    setEditingGalleryItem(null);
                    setNewGalTitle('');
                    setNewGalCaption('');
                    setIsAddingGalleryItem(!isAddingGalleryItem);
                  }}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingGalleryItem ? 'Close Form' : 'Add New Picture'}</span>
                </button>
              </div>
            </div>

            {/* Add / Edit Picture Form */}
            {isAddingGalleryItem && (
              <form onSubmit={handleSaveGalleryItem} className="p-6 bg-stone-50 rounded-xl border border-stone-300 shadow-inner space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    {editingGalleryItem ? `Editing Picture: ${editingGalleryItem.title}` : 'Add New Picture to Gallery'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => { setIsAddingGalleryItem(false); setEditingGalleryItem(null); }}
                    className="text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Picture Title *</label>
                    <input
                      type="text"
                      value={newGalTitle}
                      onChange={(e) => setNewGalTitle(e.target.value)}
                      required
                      placeholder="e.g. Inspection of Solar Mini-Grid Facility in Agbeye"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Category *</label>
                    <select
                      value={newGalCategory}
                      onChange={(e) => setNewGalCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    >
                      <option value="Official Duties as Speaker">Official Duties as Speaker</option>
                      <option value="Community Engagement">Community Engagement</option>
                      <option value="Project Commissioning">Project Commissioning</option>
                      <option value="Constituency Meetings">Constituency Meetings</option>
                      <option value="State House Sessions">State House Sessions</option>
                      <option value="Awards & Recognition">Awards & Recognition</option>
                      <option value="Festive Celebrations">Festive Celebrations</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Location *</label>
                    <input
                      type="text"
                      value={newGalLocation}
                      onChange={(e) => setNewGalLocation(e.target.value)}
                      required
                      placeholder="e.g. Okuku Town Hall, Odo-Otin"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Date / Month *</label>
                    <input
                      type="text"
                      value={newGalDate}
                      onChange={(e) => setNewGalDate(e.target.value)}
                      required
                      placeholder="e.g. September 2026"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Image URL *</label>
                  <input
                    type="text"
                    value={newGalUrl}
                    onChange={(e) => setNewGalUrl(e.target.value)}
                    required
                    placeholder="Enter image URL..."
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 font-mono text-[11px]"
                  />
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <span className="text-[10px] text-stone-500">Preset campaign photos:</span>
                    <button
                      type="button"
                      onClick={() => setNewGalUrl('/src/assets/images/campaign_rally_odon_otin_1790568787984.jpg')}
                      className="text-[10px] px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 cursor-pointer"
                    >
                      Community Rally Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewGalUrl('/src/assets/images/infrastructure_project_commissioning_1790568798405.jpg')}
                      className="text-[10px] px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 cursor-pointer"
                    >
                      Project Commissioning Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewGalUrl('/src/assets/images/empowerment_program_event_1790568809065.jpg')}
                      className="text-[10px] px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 cursor-pointer"
                    >
                      Empowerment Ceremony Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewGalUrl('/src/assets/images/hon_adewale_egbedun_portrait_1790568774499.jpg')}
                      className="text-[10px] px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 cursor-pointer"
                    >
                      Speaker In Assembly Portrait
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Photo Caption & Narrative Description *</label>
                  <textarea
                    rows={2}
                    value={newGalCaption}
                    onChange={(e) => setNewGalCaption(e.target.value)}
                    required
                    placeholder="Explain what was happening, who was present, and why it matters..."
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-stone-900 text-amber-300 hover:text-white font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
                  >
                    {editingGalleryItem ? 'Update Picture Record' : 'Add to Official Gallery'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsAddingGalleryItem(false); setEditingGalleryItem(null); }}
                    className="px-4 py-2.5 bg-stone-200 text-stone-700 font-semibold rounded-lg hover:bg-stone-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Filter by Category */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-stone-600">Filter by Category:</span>
              <select
                value={galCategoryFilter}
                onChange={(e) => setGalCategoryFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 font-semibold"
              >
                <option value="All">All Categories ({galleryItems.length})</option>
                <option value="Official Duties as Speaker">Official Duties as Speaker</option>
                <option value="Community Engagement">Community Engagement</option>
                <option value="Project Commissioning">Project Commissioning</option>
                <option value="Constituency Meetings">Constituency Meetings</option>
                <option value="State House Sessions">State House Sessions</option>
                <option value="Festive Celebrations">Festive Celebrations</option>
              </select>
            </div>

            {/* Gallery Visual Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-50 rounded-xl overflow-hidden border border-stone-200 shadow-2xs flex flex-col justify-between"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-200">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between text-xs space-y-2">
                    <div>
                      <h4 className="font-bold text-stone-900 line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">{item.caption}</p>
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
                      <span>{item.date}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStartEditGallery(item)}
                          className="p-1 text-stone-500 hover:text-amber-600 rounded cursor-pointer"
                          title="Edit Picture"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete photo "${item.title}"?`)) {
                              deleteGalleryItem(item.id);
                            }
                          }}
                          className="p-1 text-stone-400 hover:text-rose-600 rounded cursor-pointer"
                          title="Delete Picture"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}



        {/* TAB 6: VOLUNTEERS */}
        {activeTab === 'volunteers' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-stone-950 font-display">
                  Grassroots Volunteers & Mobilizers Database
                </h2>
                <p className="text-xs text-stone-500">
                  Track and assign registered volunteers across wards and polling units.
                </p>
              </div>

              <button
                onClick={exportVolunteersCSV}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download CSV Roster</span>
              </button>
            </div>

            {/* Filter controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or email..."
                  value={volSearch}
                  onChange={(e) => setVolSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 bg-stone-50"
                />
              </div>

              <div>
                <select
                  value={volTownFilter}
                  onChange={(e) => setVolTownFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 font-semibold"
                >
                  <option value="All">All Communities (16)</option>
                  {ODO_OTIN_COMMUNITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={volStatusFilter}
                  onChange={(e) => setVolStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 font-semibold"
                >
                  <option value="All">All Statuses</option>
                  <option value="new">New Pledges</option>
                  <option value="contacted">Contacted</option>
                  <option value="active">Active Mobilizer</option>
                  <option value="assigned">Assigned PU Agent</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-stone-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                  <tr>
                    <th className="p-3">Volunteer</th>
                    <th className="p-3">Community / Ward</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Preferred Roles</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filteredVolunteers.map((vol) => (
                    <tr key={vol.id} className="hover:bg-stone-50/70">
                      <td className="p-3">
                        <div className="font-bold text-stone-900">{vol.fullName}</div>
                        <div className="text-[11px] text-stone-500">Age: {vol.ageRange} · {vol.gender}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-stone-800">{vol.community}</div>
                        <div className="text-[11px] text-stone-500">{vol.ward || 'General'}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-mono text-stone-800">{vol.phone}</div>
                        <div className="text-[11px] text-stone-500">{vol.email}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-stone-700 max-w-xs truncate">
                          {vol.activities.join(', ')}
                        </div>
                        <div className="text-[10px] text-amber-700 font-medium">
                          Avail: {vol.availability}
                        </div>
                      </td>
                      <td className="p-3">
                        <select
                          value={vol.status}
                          onChange={(e) => updateVolunteerStatus(vol.id, e.target.value as any)}
                          className="text-[11px] font-bold px-2 py-1 rounded border border-stone-300 bg-white"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="active">Active</option>
                          <option value="assigned">Assigned</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => deleteVolunteer(vol.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete volunteer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: MESSAGES */}
        {activeTab === 'messages' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-bold text-stone-950 font-display">
                Constituency Messages & Direct Inquiries
              </h2>
              <p className="text-xs text-stone-500">
                Letters, project recommendations, and greetings submitted by constituents.
              </p>
            </div>

            <div className="space-y-4">
              {contactMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-xl border transition-colors text-xs space-y-2 ${
                    msg.read ? 'bg-stone-50 border-stone-200' : 'bg-amber-50/50 border-amber-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/60 pb-2">
                    <div>
                      <span className="font-bold text-stone-900 text-sm">{msg.fullName}</span>
                      <span className="text-stone-500 ml-2">({msg.community})</span>
                      <span className="text-stone-400 ml-2">· {msg.phone} · {msg.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-stone-400 text-[11px]">
                        {new Date(msg.submittedAt).toLocaleDateString()}
                      </span>
                      {!msg.read && (
                        <button
                          onClick={() => markMessageRead(msg.id)}
                          className="px-2 py-1 bg-amber-400 text-stone-950 rounded text-[10px] font-bold cursor-pointer"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteContactMessage(msg.id)}
                        className="p-1 text-stone-400 hover:text-rose-600 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-stone-800">{msg.subject}</h5>
                    <p className="text-stone-600 leading-relaxed mt-1">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-bold text-stone-950 font-display">
                Campaign Platform Settings & Security
              </h2>
              <p className="text-xs text-stone-500">
                Configure campaign contact parameters, election target votes, and administrative security.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Campaign settings updated successfully.', 'success');
              }}
              className="space-y-6 text-xs max-w-2xl"
            >
              {/* Supabase Live Cloud Database Status Card */}
              <div className="p-4 sm:p-5 rounded-xl border border-stone-200 bg-stone-50/80 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${supabaseStatus.connected ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-700'}`}>
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                        <span>Supabase PostgreSQL Cloud Database</span>
                        {supabaseStatus.connected && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                            Live & Synchronized
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] text-stone-500 font-mono mt-0.5 break-all">
                        {supabaseStatus.projectUrl || 'https://shmxekngdxrjsdemjhsj.supabase.co'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={async () => {
                      await testSupabase();
                      showToast('Tested Supabase connection successfully.', 'info');
                    }}
                    disabled={supabaseStatus.checking}
                    className="px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-[11px] font-bold text-stone-800 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <RefreshCw className={`w-3 h-3 ${supabaseStatus.checking ? 'animate-spin text-amber-500' : 'text-stone-600'}`} />
                    <span>{supabaseStatus.checking ? 'Testing...' : 'Test Connection'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-200">
                  <div className="bg-white p-2.5 rounded-lg border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Table</span>
                      <span className="font-mono text-xs font-bold text-stone-800">projects</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Table</span>
                      <span className="font-mono text-xs font-bold text-stone-800">volunteers</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Table</span>
                      <span className="font-mono text-xs font-bold text-stone-800">messages</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  </div>
                </div>

                {supabaseStatus.error && (
                  <p className="text-[11px] text-rose-600 bg-rose-50 p-2 rounded border border-rose-200">
                    Connection notice: {supabaseStatus.error}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Contact Information
                </h3>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Campaign Secretariat Address
                  </label>
                  <input
                    type="text"
                    value={settings.campaignOfficeAddress}
                    onChange={(e) => updateSettings({ campaignOfficeAddress: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Official Hotline Phone</label>
                    <input
                      type="text"
                      value={settings.phoneHotline}
                      onChange={(e) => updateSettings({ phoneHotline: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Official Campaign Email</label>
                    <input
                      type="email"
                      value={settings.emailAddress}
                      onChange={(e) => updateSettings({ emailAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Campaign Slogan</label>
                  <input
                    type="text"
                    value={settings.slogan}
                    onChange={(e) => updateSettings({ slogan: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 rounded-lg border border-stone-300 font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-200">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Security: Change Admin Password
                </h3>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="Enter new admin password..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="flex-1 px-3 py-2 bg-stone-50 rounded-lg border border-stone-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newPassword || newPassword.length < 6) {
                        showToast('Password must be at least 6 characters.', 'error');
                        return;
                      }
                      updateSettings({ adminPasswordHash: newPassword });
                      setNewPassword('');
                      showToast('Admin password changed successfully.', 'success');
                    }}
                    className="px-4 py-2 bg-stone-900 text-white font-bold rounded-lg cursor-pointer"
                  >
                    Update Password
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={resetToDefaults}
                  className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Factory Campaign Seed Data</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
