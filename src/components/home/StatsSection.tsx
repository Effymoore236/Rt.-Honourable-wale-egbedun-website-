import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { Building2, Users, MapPin, CheckCircle } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { projects, volunteers } = useCampaign();

  const stats = [
    {
      label: 'Delivered Projects',
      value: `${projects.length}+`,
      subtext: 'Roads, clinics, water & schools',
      icon: Building2,
      color: 'emerald' as const
    },
    {
      label: 'Communities Covered',
      value: '16 / 16',
      subtext: '100% Odo-Otin towns reached',
      icon: MapPin,
      color: 'red' as const
    },
    {
      label: 'Beneficiaries Empowered',
      value: '25,000+',
      subtext: 'Women, youths, farmers & pupils',
      icon: Users,
      color: 'emerald' as const
    },
    {
      label: 'Registered Volunteers',
      value: `${volunteers.length + 420}+`,
      subtext: 'Grassroots mobilizers active',
      icon: CheckCircle,
      color: 'red' as const
    }
  ];

  return (
    <section className="bg-stone-900 text-white py-12 border-b border-stone-800 relative">
      {/* Campaign Brand Colors Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-amber-400 to-red-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const isEmerald = stat.color === 'emerald';
            return (
              <div
                key={idx}
                className={`p-5 rounded-xl bg-stone-800/60 border text-left transition-all hover:-translate-y-0.5 ${
                  isEmerald
                    ? 'border-emerald-500/30 hover:border-emerald-500/60'
                    : 'border-red-500/30 hover:border-red-500/60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg border ${
                      isEmerald
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-red-500/15 text-red-400 border-red-500/30'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold uppercase tracking-widest ${
                      isEmerald ? 'text-emerald-400/90' : 'text-red-400/90'
                    }`}
                  >
                    Verified
                  </span>
                </div>
                <div
                  className={`text-2xl sm:text-3xl font-extrabold font-display tracking-tight tabular-nums ${
                    isEmerald ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-stone-200 mt-1">
                  {stat.label}
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
