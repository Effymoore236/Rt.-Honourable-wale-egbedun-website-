import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { HeartHandshake, CheckCircle2, ArrowRight, Shield } from 'lucide-react';

export const VolunteerCta: React.FC = () => {
  const { setCurrentPage } = useCampaign();

  return (
    <section className="py-8 sm:py-10 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white border-b-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-950 text-white rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-left border-2 border-emerald-600/60">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-300 text-xs font-semibold border border-red-500/40">
              <Shield className="w-3.5 h-3.5 text-red-400" />
              <span>Odo-Otin Grassroots Mobilization Vanguard</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display leading-tight">
              Be the Engine of Continuity. Volunteer for Rt. Hon. Adewale Egbedun Today.
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Elections are won at the polling units and on the doorsteps of everyday constituents. 
              Whether you can dedicate 2 hours on weekends or mobilize your community full-time, 
              your voice and energy matter in building a brighter Odo-Otin.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Receive Official Campaign Volunteer Badge</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Access to Campaign Strategy Briefings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Wards & Polling Unit Agent Coordination</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Training in Voter Engagement & Mobilization</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => { setCurrentPage('volunteer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer border border-red-700"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-300" />
                <span>Register as Campaign Volunteer</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-stone-400">
                Takes less than 2 minutes · Over 500 volunteers registered
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
