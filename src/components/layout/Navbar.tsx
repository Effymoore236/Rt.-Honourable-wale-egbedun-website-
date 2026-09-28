import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import {
  Menu,
  X,
  Shield,
  Lock,
  HeartHandshake,
  Home,
  User,
  FileText,
  Building2,
  Image as ImageIcon,
  Newspaper,
  Share2,
  Phone
} from 'lucide-react';
import { MobileBottomNav } from './MobileBottomNav';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, isAdminLoggedIn, showToast } = useCampaign();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'biography', label: 'Biography', icon: User },
    { id: 'manifesto', label: 'Manifesto', icon: FileText },
    { id: 'projects', label: 'Projects', icon: Building2 },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'blog', label: 'News & Updates', icon: Newspaper },
    { id: 'volunteer', label: 'Volunteer', icon: HeartHandshake }
  ] as const;

  const navigateTo = (page: typeof currentPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareCampaign = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Rt. Hon. Adewale Egbedun Campaign | Odo-Otin 2027',
          text: 'Support the re-election of Rt. Hon. Adewale Egbedun for Odo-Otin State Constituency on Accord Party. Continuity, Progress, Development.',
          url: window.location.origin
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin);
      showToast('Campaign website link copied to clipboard!', 'success');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs no-print">
        {/* Campaign Brand Colors Top Trim: Emerald Green, Yellow, Crimson Red */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-amber-400 to-red-600" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
          {/* Mobile menu toggle (visible on mobile only) - Min 44px touch target */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-stone-700 hover:bg-stone-100 active:bg-stone-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer flex items-center justify-center transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-stone-700">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`relative py-1 cursor-pointer transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-emerald-950 font-bold'
                      : 'text-stone-600 hover:text-emerald-700'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Join Campaign + discreet Admin Portal */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <button
              onClick={() => navigateTo('volunteer')}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-all hover:shadow-md cursor-pointer whitespace-nowrap active:scale-98 border border-emerald-900 min-h-[40px]"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>Join Campaign</span>
            </button>

            {/* Discreet Admin Portal Access Button in Header */}
            <button
              onClick={() => navigateTo('admin')}
              className="min-w-[40px] min-h-[40px] p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
              title={isAdminLoggedIn ? 'Admin Portal Active' : 'Admin Portal'}
              aria-label="Admin Portal"
            >
              {isAdminLoggedIn ? (
                <Shield className="w-4 h-4 text-emerald-600" />
              ) : (
                <Lock className="w-4 h-4 text-stone-500 hover:text-stone-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer with backdrop */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[65px] bottom-0 z-40 bg-stone-900/60 backdrop-blur-xs flex flex-col justify-start animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
            <div
              className="bg-white px-4 pt-3 pb-8 space-y-1.5 shadow-2xl border-b border-stone-200 max-h-[calc(100vh-80px)] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-2 text-xs font-bold text-stone-500 uppercase tracking-wider border-b border-stone-100 mb-2 flex items-center justify-between">
                <span>Navigation Menu</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">
                  Odo-Otin 2027
                </span>
              </div>

              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between min-h-[48px] cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-950 font-bold border-l-4 border-emerald-600 shadow-2xs'
                        : 'text-stone-700 hover:bg-stone-50 active:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    )}
                  </button>
                );
              })}

              {/* Mobile Quick Action Buttons */}
              <div className="pt-4 mt-3 border-t border-stone-100 space-y-2">
                <button
                  onClick={handleShareCampaign}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Share2 className="w-4 h-4 text-emerald-700" />
                  <span>Share Campaign with Friends</span>
                </button>

                <div className="flex items-center justify-between pt-2 px-1 text-xs text-stone-500">
                  <button
                    onClick={() => navigateTo('admin')}
                    className="py-2 text-stone-600 hover:text-stone-900 flex items-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-red-600" />
                    <span>Admin Portal</span>
                  </button>
                  <a
                    href="tel:+2348033892700"
                    className="py-2 text-emerald-700 font-medium flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Secretariat Line</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom Navigation Bar on Mobile devices */}
      <MobileBottomNav
        isMenuOpen={mobileMenuOpen}
        onToggleMenu={() => setMobileMenuOpen((prev) => !prev)}
      />
    </>
  );
};

