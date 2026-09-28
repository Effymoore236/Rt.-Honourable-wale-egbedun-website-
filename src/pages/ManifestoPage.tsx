import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { AccordBadge } from '../components/common/AccordBadge';
import {
  GraduationCap,
  HeartPulse,
  Building2,
  Cpu,
  ShoppingBag,
  Wheat,
  ShieldCheck,
  Crown,
  Download,
  Printer,
  CheckCircle,
  Play,
  Clock,
  Sparkles,
  Target
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

export const ManifestoPage: React.FC = () => {
  const { manifestoPillars, setIsPrintManifestoOpen } = useCampaign();
  const [selectedPillarId, setSelectedPillarId] = useState<string>(manifestoPillars[0]?.id || 'pillar-1');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const currentPillar = manifestoPillars.find((p) => p.id === selectedPillarId) || manifestoPillars[0];
  const CurrentIcon = currentPillar ? iconMap[currentPillar.iconName] || Building2 : Building2;

  return (
    <div className="py-12 lg:py-16 bg-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header with Action Buttons */}
        <div className="border-b border-stone-200 pb-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <AccordBadge size="md" />
              <span className="text-xs font-semibold text-stone-500">2027 – 2031 Policy Blueprint</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight font-display">
              The People&apos;s Manifesto: Continuity & Progress
            </h1>
            <p className="text-base text-stone-600 mt-2 max-w-3xl">
              An evidence-grounded blueprint for rural prosperity, modern learning, maternal health, 
              youth digital careers, and food sovereignty across all 16 communities of Odo-Otin.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setIsPrintManifestoOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer border border-emerald-900"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Download & Print Full Manifesto PDF</span>
            </button>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-amber-50/80 border border-amber-200/90 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Sparkles className="w-24 h-24 text-amber-600" />
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest block mb-2">
              Our Vision
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-950 font-display mb-3">
              An Interconnected, Self-Sustaining & Educated Odo-Otin
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              &ldquo;To transform Odo-Otin State Constituency into the agricultural capital, 
              healthcare model, and digital skill incubator of Osun State, where every child has access to quality schools, 
              every farmer earns rewarding income from connected roads, and every mother is protected by accessible healthcare.&rdquo;
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-stone-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Target className="w-24 h-24 text-white" />
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-2">
              Our Mission
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display mb-3">
              Hands-On Stewardship & High-Impact Legislation
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              &ldquo;To utilize legislative authority, budget appropriations, and direct community interventions 
              to attract maximum capital development into our 16 communities, ensuring transparent execution, 
              zero-waste governance, and uninterrupted progress through 2027 and beyond.&rdquo;
            </p>
          </div>
        </div>

        {/* Video Candidate Message Banner */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-stone-200 bg-stone-950 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-8 sm:p-10 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Video Address by Rt. Hon. Adewale Egbedun
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                &ldquo;Why Continuity in 2027 Matters for Every Home in Odo-Otin&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Watch the Speaker explain the arithmetic and verifiable targets behind each manifesto pillar, 
                sharing personal commitments to market women, young innovators, and farmers across our constituency.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Length: 3 mins 45 secs</span>
                </span>
                <span>·</span>
                <span>Language: Yoruba & English Subtitles</span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-stone-900 p-6 flex items-center justify-center min-h-[260px] relative">
              {isVideoPlaying ? (
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden flex flex-col items-center justify-center text-center p-4">
                  <p className="text-xs text-amber-400 font-semibold mb-2">
                    Playing: Official Candidate Address
                  </p>
                  <p className="text-[11px] text-stone-400 max-w-xs">
                    (Official broadcast audio/video stream loaded from campaign archives)
                  </p>
                  <button
                    onClick={() => setIsVideoPlaying(false)}
                    className="mt-4 text-xs px-3 py-1 bg-stone-800 rounded border border-stone-700 text-stone-200 hover:text-white"
                  >
                    Close Player
                  </button>
                </div>
              ) : (
                <div className="relative group cursor-pointer w-full h-full flex flex-col items-center justify-center text-center" onClick={() => setIsVideoPlaying(true)}>
                  <img
                    src="/src/assets/images/hon_adewale_egbedun_portrait_1790568774499.jpg"
                    alt="Speaker Egbedun Candidate Address"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10 w-16 h-16 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                  <span className="relative z-10 mt-3 text-xs font-bold text-white tracking-wide uppercase">
                    Play Candidate Manifesto Message
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive 8 Pillars Explorer */}
        <div className="space-y-8">
          <div className="text-left">
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
              Interactive Policy Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight mt-1 font-display">
              Examine the 8 Pillars in Detail
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Select a pillar below to inspect specific timelines, budget projections, and village-by-village deliverables.
            </p>
          </div>

          {/* Interactive Tab Bar (allowed as interactive filter control) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 p-1.5 bg-stone-100 rounded-xl border border-stone-200">
            {manifestoPillars.map((p) => {
              const Icon = iconMap[p.iconName] || Building2;
              const isSelected = p.id === selectedPillarId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPillarId(p.id)}
                  className={`p-3 rounded-lg text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white shadow-xs border border-amber-300 text-stone-950'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-amber-700">
                      {p.number}
                    </span>
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-600' : 'text-stone-400'}`} />
                  </div>
                  <span className="text-[11px] font-bold leading-tight line-clamp-2">
                    {p.title.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Pillar Presentation */}
          {currentPillar && (
            <div className="p-5 sm:p-10 rounded-2xl bg-stone-50 border border-stone-200 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left side: Overview & Key Numbers */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-amber-400 text-stone-950">
                      <CurrentIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-700">
                        PILLAR {currentPillar.number}
                      </span>
                      <h3 className="text-2xl font-extrabold text-stone-950 font-display">
                        {currentPillar.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-medium text-stone-800 italic">
                    &ldquo;{currentPillar.tagline}&rdquo;
                  </p>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {currentPillar.summary}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                      Specific Measurable Targets (2027–2031)
                    </h4>
                    <div className="space-y-2">
                      {currentPillar.targets.map((target, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{target}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Budget & Key Deliverables */}
                <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-stone-200 shadow-2xs space-y-5">
                  <div className="border-b border-stone-100 pb-4">
                    <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                      Estimated Capital Commitment
                    </span>
                    <div className="text-2xl font-extrabold text-amber-600 font-display tabular-nums mt-0.5">
                      {currentPillar.budgetEstimate}
                    </div>
                    <span className="text-[11px] text-stone-500">
                      Timeline: {currentPillar.timeline} (Phased Appropriation)
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
                      Priority Deliverables
                    </h5>
                    <ul className="space-y-2.5 text-xs text-stone-700">
                      {currentPillar.keyDeliverables.map((deliv, i) => (
                        <li key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsPrintManifestoOpen(true)}
                      className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-amber-400" />
                      <span>Print Document with Official Seal</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
