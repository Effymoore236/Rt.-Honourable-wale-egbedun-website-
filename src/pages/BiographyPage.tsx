import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { AccordBadge } from '../components/common/AccordBadge';
import {
  GraduationCap,
  Award,
  Landmark,
  Heart,
  Scale,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const BiographyPage: React.FC = () => {
  const { setCurrentPage, biography } = useCampaign();

  return (
    <div className="py-12 lg:py-16 bg-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-stone-200 pb-10 mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <AccordBadge size="md" />
            <span className="text-xs font-semibold text-stone-500">Official Biography</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight font-display">
            {biography.fullName}
          </h1>
          <p className="text-lg text-amber-600 font-semibold mt-1">
            {biography.officialTitle} · {biography.subTitle}
          </p>
        </div>

        {/* Top Portrait & Key Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-xl bg-stone-100">
              <img
                src={biography.portraitUrl}
                alt={`${biography.fullName} portrait`}
                className="w-full h-auto object-cover aspect-3/4"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-stone-900 text-stone-300 text-xs">
                <span className="text-amber-400 font-bold">Office:</span> {biography.officeHeld}
                <br />
                <span className="text-amber-400 font-bold">Constituency:</span> {biography.constituencyName}
                <br />
                <span className="text-amber-400 font-bold">Political Platform:</span> {biography.politicalPlatform}
              </div>
            </div>

            {/* Quick Profile Card */}
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4">
              <h2 className="text-sm font-bold text-stone-950 uppercase tracking-wider font-display">
                Profile Snapshot
              </h2>
              <div className="space-y-2.5 text-xs text-stone-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Hometown:</strong> {biography.hometown}</span>
                </div>
                <div className="flex items-start gap-2">
                  <GraduationCap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Education:</strong> {biography.education}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Landmark className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Legislative Focus:</strong> {biography.legislativeFocus}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Faith & Family:</strong> {biography.faithAndFamily}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Biography */}
          <div className="lg:col-span-7 space-y-6 text-stone-700 leading-relaxed text-sm sm:text-base">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-stone-950 font-display">
                {biography.earlyLifeTitle}
              </h2>
              <p>{biography.earlyLifeParagraph1}</p>
              {biography.earlyLifeParagraph2 && <p>{biography.earlyLifeParagraph2}</p>}
            </div>

            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-2xl font-bold text-stone-950 font-display">
                {biography.speakershipTitle}
              </h2>
              <p>{biography.speakershipParagraph1}</p>
              {biography.speakershipParagraph2 && <p>{biography.speakershipParagraph2}</p>}
            </div>

            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-2xl font-bold text-stone-950 font-display">
                {biography.constituentsBondTitle}
              </h2>
              <p>{biography.constituentsBondParagraph1}</p>
              {biography.constituentsBondQuote && (
                <p>
                  His philosophy is simple: <em className="font-semibold text-stone-900">&ldquo;{biography.constituentsBondQuote}&rdquo;</em>
                </p>
              )}
            </div>

            {/* Core Values Box */}
            <div className="p-6 rounded-xl bg-amber-50/80 border border-amber-200 space-y-3 mt-6">
              <h3 className="text-base font-bold text-stone-950 font-display flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-600" />
                <span>The Four Pillars of Egbedun Leadership</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Accessibility:</strong> Always within reach of constituents.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Fiscal Probity:</strong> Maximum project value for every naira.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Youth Inclusion:</strong> Practical tools and tech skills.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Cultural Honor:</strong> High regard for Royal Fathers.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Infographic Section */}
        <div className="pt-12 border-t border-stone-200">
          <div className="mb-10">
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
              Chronology of Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight mt-1 font-display">
              Career & Leadership Milestones
            </h2>
          </div>

          <div className="relative border-l-2 border-amber-300 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10">
            {biography.milestones.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-amber-400 border-4 border-white shadow-xs group-hover:bg-stone-900 transition-colors" />
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.year}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-stone-950 font-display">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to Action */}
        <div className="mt-16 p-8 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              Ready to Support This Proven Leadership?
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Join thousands of Odo-Otin citizens working to secure Rt. Hon. Egbedun’s re-election in 2027.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setCurrentPage('manifesto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-4 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              Read Manifesto
            </button>
            <button
              onClick={() => { setCurrentPage('volunteer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Join Volunteer Movement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
