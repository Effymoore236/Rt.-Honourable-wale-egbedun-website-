import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { ArrowRight, Award, Compass, ShieldCheck } from 'lucide-react';

export const AboutPreview: React.FC = () => {
  const { setCurrentPage } = useCampaign();

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Documentary Action Photo (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-xl bg-stone-100">
                <img
                  src="/src/assets/images/campaign_rally_odon_otin_1790568787984.jpg"
                  alt="Rt. Hon. Adewale Egbedun consulting with constituents in Odo-Otin"
                  className="w-full h-84 sm:h-96 object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-stone-900 text-stone-200 text-xs">
                  <p className="font-semibold text-white">Community First Leadership</p>
                  <p className="text-stone-400 text-[11px] mt-0.5">
                    Town Hall dialogue session in Odo-Otin with youth, women leaders, and elders.
                  </p>
                </div>
              </div>

              {/* Decorative Accent Card */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 bg-amber-400 text-stone-950 p-4 rounded-xl shadow-lg border border-amber-500 max-w-xs text-left">
                <div className="text-xl font-bold font-display">8th Assembly</div>
                <div className="text-xs font-semibold">Honorable Speaker</div>
                <p className="text-[11px] text-stone-800 mt-1">
                  Leading consensus, youth inclusion, and stable governance in Osun State.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Prose & Principles (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
                The Leader We Know & Trust
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 tracking-tight mt-1 font-display">
                Dedicated Servant of Odo-Otin, Champion of Parliamentary Integrity
              </h2>
            </div>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              Rt. Hon. Adewale Egbedun embodies the finest tradition of grassroots responsiveness. 
              Born and rooted in the soil of Odo-Otin, his career is marked by tireless advocacy for our agrarian communities, 
              youth development, and infrastructural expansion.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              As Speaker of the Osun State House of Assembly, he transformed the parliament into an instrument of 
              people-centered development, passing historic legislations for rural agriculture, health insurance, and 
              local government autonomy, while ensuring Odo-Otin reaps direct dividends of democracy.
            </p>

            {/* Core Values Triad */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                <ShieldCheck className="w-5 h-5 text-amber-600 mb-1.5" />
                <h3 className="text-xs font-bold text-stone-900">Unbending Integrity</h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Transparent constituency stewardship and zero tolerance for waste.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                <Compass className="w-5 h-5 text-amber-600 mb-1.5" />
                <h3 className="text-xs font-bold text-stone-900">Grassroots Presence</h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Constant monthly stakeholder town halls across all 11 wards.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                <Award className="w-5 h-5 text-amber-600 mb-1.5" />
                <h3 className="text-xs font-bold text-stone-900">Youth & Women Focus</h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Economic empowerment and sustainable job-creation schemes.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => { setCurrentPage('biography'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer group"
              >
                <span>Read Full Biography & Career Milestones</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
