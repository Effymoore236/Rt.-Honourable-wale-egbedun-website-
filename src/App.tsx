import React from 'react';
import { CampaignProvider, useCampaign } from './context/CampaignContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { BiographyPage } from './pages/BiographyPage';
import { ManifestoPage } from './pages/ManifestoPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { GalleryPage } from './pages/GalleryPage';
import { VolunteerContactPage } from './pages/VolunteerContactPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProjectDetailModal } from './components/common/ProjectDetailModal';
import { ManifestoPrintModal } from './components/common/ManifestoPrintModal';
import { PrivacyPolicyModal } from './components/common/PrivacyPolicyModal';

const AppContent: React.FC = () => {
  const { currentPage } = useCampaign();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-300 selection:text-stone-950">
      <Navbar />

      <main className="flex-1 w-full pb-20 md:pb-0">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'biography' && <BiographyPage />}
        {currentPage === 'manifesto' && <ManifestoPage />}
        {currentPage === 'projects' && <ProjectsPage />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'volunteer' && <VolunteerContactPage />}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>

      <Footer />

      {/* Global Modals */}
      <ProjectDetailModal />
      <ManifestoPrintModal />
      <PrivacyPolicyModal />
    </div>
  );
};

export default function App() {
  return (
    <CampaignProvider>
      <AppContent />
    </CampaignProvider>
  );
}
