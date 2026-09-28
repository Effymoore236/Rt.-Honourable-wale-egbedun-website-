import React, { useState, useEffect } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { HeroLogosBanner, AccordLogo, CampaignSupportBadge } from '../common/CampaignLogos';
import { ArrowRight, CheckCircle2, Calendar, FileText, Sparkles, Vote } from 'lucide-react';
import candidatePortraitAsset from '../../assets/images/wale-egbedun-hero.jpg';

export const HeroSection: React.FC = () => {
  const { setCurrentPage, settings } = useCampaign();

  // Election countdown calculation (Days & Hours only for 6th of February, 2027)
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number }>({
    days: 131,
    hours: 8
  });

  useEffect(() => {
    // Election date: 6th of February, 2027
    const target = new Date('2027-02-06T08:00:00Z').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeLeft({ days, hours });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-amber-50/20 to-white pt-6 pb-8 lg:pt-8 lg:pb-10 border-b border-stone-200">
      {/* Subtle Yoruba cultural geometric background accent with authentic Accord yellow */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#F1E600_1.5px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Uppermost Centralised Fancy Floating Election Day Countdown (No Heavy Background) */}
        <div className="mb-5 sm:mb-6 max-w-2xl mx-auto w-full px-2">
          <div className="flex flex-col items-center justify-center text-center gap-2.5 py-1">
            
            {/* Header: Live Pulsing Red Beacon, Refined Headline & Date Pill */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
              </span>
              
              <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-emerald-950 font-display">
                Election Day Countdown
              </span>

              <span className="text-stone-300 hidden sm:inline">·</span>

              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-emerald-900 bg-emerald-100/70 border border-emerald-300/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                <Calendar className="w-3 h-3 text-red-600" />
                <span>Saturday, 6 February 2027</span>
              </span>
            </div>

            {/* Dials & Vote Accord Badge: Floating Fancy Tiles without Boxy Background */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {/* Days Tile (Fancy Yellow/Gold Ivory Card) */}
              <div className="flex items-center gap-2 bg-gradient-to-b from-amber-50/90 via-white to-amber-100/40 border-2 border-amber-400 px-3.5 py-1.5 rounded-xl shadow-sm hover:shadow-md transition-shadow min-w-[82px] justify-center">
                <span className="text-base sm:text-xl font-black font-mono text-amber-700 tracking-tight leading-none">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                  Days
                </span>
              </div>

              <span className="text-amber-500 font-mono font-black text-base sm:text-lg select-none">:</span>

              {/* Hours Tile (Fancy Emerald Green Ivory Card) */}
              <div className="flex items-center gap-2 bg-gradient-to-b from-emerald-50/90 via-white to-emerald-100/40 border-2 border-emerald-600 px-3.5 py-1.5 rounded-xl shadow-sm hover:shadow-md transition-shadow min-w-[82px] justify-center">
                <span className="text-base sm:text-xl font-black font-mono text-emerald-800 tracking-tight leading-none">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                  Hours
                </span>
              </div>

              {/* Vote Accord Badge (Fancy Crimson Red Action Badge) */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3.5 py-1.5 rounded-xl border border-red-500 shadow-md hover:shadow-lg transition-all ml-0.5">
                <AccordLogo size="sm" />
                <span className="text-xs sm:text-sm font-black text-white tracking-wide whitespace-nowrap">
                  Vote Accord
                </span>
              </div>
            </div>

            {/* Subtle decorative gold-green-red hairline ribbon underline */}
            <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-amber-400 via-emerald-500 to-red-500 rounded-full mt-0.5 opacity-80" />

          </div>
        </div>

        {/* Centralized Campaign Identity: Accord Party Logo, Candidate Personal Logo & Re-Elect Headline */}
        <div className="flex flex-col items-center text-center space-y-3 mb-6 max-w-4xl mx-auto px-2">
          {/* Centralized Accord Party Logo and Personal Logo Side by Side */}
          <div className="flex items-center justify-center">
            <HeroLogosBanner showBadge={false} />
          </div>

          {/* Campaign Tag Badge in Authentic Accord Green & Red - Cock Symbol Removed */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold tracking-wider uppercase bg-white/95 px-3.5 sm:px-4 py-1.5 rounded-full border-2 border-emerald-600 shadow-xs max-w-full">
            <Vote className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span className="text-emerald-900 font-extrabold">Accord Party Candidate</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-700">6 February 2027</span>
          </div>

          {/* Centralized RE-ELECT RT. HON. ADEWALE EGBEDUN with Accord Green & Red Slogan */}
          <div className="space-y-2 max-w-full">
            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-stone-950 tracking-tight leading-[1.15] font-display break-words">
              RE-ELECT RT. HON. <br className="hidden sm:block" />
              <span className="text-white bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 px-3 sm:px-4 py-1 rounded-lg shadow-sm border border-emerald-900 inline-block mt-1 text-xl sm:text-4xl lg:text-5xl max-w-full break-words">
                ADEWALE EGBEDUN
              </span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl font-extrabold text-red-600 italic pt-1 tracking-wide">
              &ldquo;Continuity, Progress, Development&rdquo;
            </p>
          </div>
        </div>

        {/* Hero Section Candidate Picture - Directly Under Campaign Identity Section */}
        <div className="flex flex-col items-center my-6 max-w-lg mx-auto px-4 relative">
          <div className="relative w-full max-w-sm sm:max-w-md">
            {/* Ambient decorative glow around picture */}
            <div className="absolute -inset-2.5 bg-gradient-to-tr from-emerald-600 via-amber-400 to-red-600 rounded-3xl blur-md opacity-60 transform rotate-1" />

            <div className="relative bg-white rounded-2xl overflow-hidden border-4 border-emerald-700 shadow-2xl">
              <img
                src={candidatePortraitAsset}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/HLHw2Dwx/wale-egbedun-5.jpg';
                }}
                alt="Rt. Hon. Adewale Egbedun, Speaker Osun State House of Assembly"
                className="w-full h-auto object-cover object-top"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Candidate title card overlay with Red Accent */}
              <div className="p-3.5 sm:p-4 bg-stone-950 text-white border-t-4 border-red-600 text-center">
                <h2 className="text-sm sm:text-base font-bold font-display text-emerald-400">
                  Rt. Hon. Adewale Egbedun
                </h2>
                <p className="text-[11px] sm:text-xs text-red-200 mt-0.5">
                  Speaker, Osun State House of Assembly · Member Representing Odo-Otin State Constituency
                </p>
              </div>
            </div>

            {/* Floating Yoruba Wisdom Quote */}
            <div className="relative sm:absolute sm:-bottom-4 sm:-left-4 mt-3 sm:mt-0 bg-white/95 backdrop-blur-md p-3 rounded-xl border-l-4 border-emerald-600 border border-stone-200 shadow-lg max-w-xs text-left z-20">
              <p className="text-[11px] font-bold text-emerald-800 italic">
                &ldquo;Àjùmọ̀ṣe ni à ń gbé ilú ró.&rdquo;
              </p>
              <p className="text-[10px] text-stone-500">
                Through collective cooperation, we build a flourishing society.
              </p>
            </div>
          </div>
        </div>

        {/* Vision, Key Trust Points & Action CTAs Section */}
        <div className="max-w-4xl mx-auto space-y-6 text-center pt-2">
          {/* Subtitle / Value Proposition */}
          <p className="text-base sm:text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed">
            Speaker of the Osun State House of Assembly. Championing transformative rural roads, 
            modern healthcare centers, youth innovation hubs, and agricultural revitalization across all 
            16 communities of Odo-Otin.
          </p>

          {/* Key trust bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 max-w-3xl mx-auto text-xs text-stone-800 font-medium text-left">
            <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-stone-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>42+ Projects Completed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-stone-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>16/16 Communities Impacted</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-stone-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero-Tolerance for Absence</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-stone-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Consensus Assembly Speaker</span>
            </div>
          </div>

          {/* Primary Action Buttons with Emerald Green and Crimson Red */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 max-w-xl mx-auto w-full">
            <button
              onClick={() => { setCurrentPage('volunteer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer border border-emerald-900"
            >
              <span>Join Our Campaign</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => { setCurrentPage('manifesto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-colors cursor-pointer border border-red-700"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>Read 2027 Manifesto</span>
            </button>

            <button
              onClick={() => { setCurrentPage('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white border-2 border-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 text-emerald-900 font-semibold text-sm transition-colors cursor-pointer"
            >
              <span>View Projects</span>
            </button>
          </div>

          {/* Supporter Movement Callout */}
          <div className="mt-4 mx-auto max-w-md bg-stone-950 border-2 border-emerald-600 rounded-xl p-3 sm:p-3.5 shadow-md flex flex-col xs:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <CampaignSupportBadge size="sm" />
              <div>
                <span className="text-xs font-bold text-emerald-400 block">#SupportEgbedun2027</span>
                <span className="text-[11px] text-stone-300 block">Official Supporter Movement · Odo-Otin</span>
              </div>
            </div>
            <button
              onClick={() => { setCurrentPage('volunteer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full xs:w-auto text-center shrink-0 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
            >
              Join Movement
            </button>
          </div>

          {/* Civic Pledge */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-stone-600">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Dedicated to grassroots empowerment, unity, and sustainable growth across Odo-Otin.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
