import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import {
  GraduationCap,
  HeartPulse,
  Building2,
  Cpu,
  ShoppingBag,
  Wheat,
  ShieldCheck,
  Crown,
  ArrowRight,
  Download
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  HeartPulse,
  Building2,
  Cpu,
  ShoppingBag,
  Wheat,
  ShieldCheck,
  Crown
};

export const ManifestoTeaser: React.FC = () => {
  const { manifestoPillars, setCurrentPage, setIsPrintManifestoOpen } = useCampaign();

  return (
    <section className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
              The 2027 – 2031 Blueprint
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 tracking-tight mt-1 font-display">
              8 Pillars of Sustained Growth for Odo-Otin
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              A comprehensive, funded, and actionable legislative and grassroots agenda 
              designed to elevate livelihoods in every ward.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPrintManifestoOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-stone-300 hover:border-stone-400 text-stone-800 shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-600" />
              <span>Printable Manifesto</span>
            </button>
            <button
              onClick={() => { setCurrentPage('manifesto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 transition-colors cursor-pointer"
            >
              <span>Explore All 8 Pillars</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 8 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {manifestoPillars.map((pillar) => {
            const Icon = iconMap[pillar.iconName] || Building2;
            return (
              <div
                key={pillar.id}
                className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs hover:border-amber-400 transition-all text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-amber-600 tracking-wider">
                      PILLAR {pillar.number}
                    </span>
                    <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-400 group-hover:text-stone-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 font-display group-hover:text-amber-600 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                    {pillar.summary}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                      Key Deliverables
                    </span>
                    <ul className="text-xs text-stone-700 space-y-1">
                      {pillar.targets.slice(0, 2).map((tgt, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold">›</span>
                          <span className="line-clamp-2">{tgt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">Budget: {pillar.budgetEstimate}</span>
                  <button
                    onClick={() => { setCurrentPage('manifesto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="font-bold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
                  >
                    Details &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
