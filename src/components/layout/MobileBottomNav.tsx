import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { Home, FileText, Building2, HeartHandshake, Menu } from 'lucide-react';

interface MobileBottomNavProps {
  onToggleMenu: () => void;
  isMenuOpen: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onToggleMenu, isMenuOpen }) => {
  const { currentPage, setCurrentPage } = useCampaign();

  const navigateTo = (page: typeof currentPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'manifesto' as const, label: 'Manifesto', icon: FileText },
    { id: 'projects' as const, label: 'Projects', icon: Building2 },
    { id: 'volunteer' as const, label: 'Volunteer', icon: HeartHandshake, highlight: true }
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-stone-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] no-print pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile Navigation Bar"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const isActive = currentPage === item.id && !isMenuOpen;
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className="flex flex-col items-center justify-center h-full cursor-pointer relative group focus-visible:outline-hidden"
              >
                <div
                  className={`flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-[10px] font-bold tracking-tight mt-0.5 leading-none">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className="flex flex-col items-center justify-center h-full cursor-pointer relative py-1 focus-visible:outline-hidden"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-emerald-700' : 'text-stone-500 group-hover:text-stone-900'
                  }`}
                />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-emerald-600" />
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight leading-none ${
                  isActive ? 'font-bold text-emerald-800' : 'font-medium text-stone-600'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* More / Menu Drawer Toggle */}
        <button
          onClick={onToggleMenu}
          className="flex flex-col items-center justify-center h-full cursor-pointer relative py-1 focus-visible:outline-hidden"
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Full Menu'}
        >
          <div className="relative">
            <Menu
              className={`w-5 h-5 transition-colors ${
                isMenuOpen ? 'text-red-600' : 'text-stone-500'
              }`}
            />
            {isMenuOpen && (
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-red-600" />
            )}
          </div>
          <span
            className={`text-[10px] mt-1 tracking-tight leading-none ${
              isMenuOpen ? 'font-bold text-red-600' : 'font-medium text-stone-600'
            }`}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </span>
        </button>
      </div>
    </nav>
  );
};
