import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import {
  FileText,
  ArrowRight,
  Download,
  CheckCircle2,
  Eye,
  Sparkles
} from 'lucide-react';

export const ManifestoTeaser: React.FC = () => {
  const { onePageManifesto, setCurrentPage, setIsPrintManifestoOpen } = useCampaign();

  return (
    <section className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The 2027 – 2031 Blueprint</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 tracking-tight mt-1 font-display">
              {onePageManifesto.title || "The People's One-Page Manifesto"}
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              {onePageManifesto.subtitle || 
                'An action-focused legislative and grassroots agenda designed to elevate livelihoods across all 16 communities.'}
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
              <span>View Full Document</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* One-Page Manifesto Highlight Preview Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Visual Doc Preview Box */}
            <div className="lg:col-span-5 bg-stone-900 p-6 sm:p-8 flex items-center justify-center min-h-[320px] relative">
              {onePageManifesto.fileUrl ? (
                <div 
                  onClick={() => { setCurrentPage('manifesto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="relative group cursor-pointer w-full max-w-xs flex items-center justify-center"
                >
                  <img
                    src={onePageManifesto.fileUrl}
                    alt="One-Page Manifesto Document"
                    className="max-h-[280px] w-auto rounded shadow-xl object-contain border border-stone-700 transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-950/40 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-3 py-1.5 rounded-lg bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Read Document</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 text-stone-400">
                  <FileText className="w-12 h-12 mx-auto text-amber-400 mb-2" />
                  <p className="text-xs font-semibold text-white">One-Page Manifesto</p>
                  <p className="text-[11px] text-stone-400 mt-1">Official Policy Document</p>
                </div>
              )}
            </div>

            {/* Highlights Details */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-600 uppercase tracking-wider block">
                  {onePageManifesto.versionDate || '2027 Policy Agenda'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-stone-950 mt-1">
                  Continuity, Progress & Grassroots Prosperity
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1.5">
                  Direct commitments by Rt. Hon. Adewale Egbedun to improve schools, rural farm roads, clean energy, and health centers.
                </p>
              </div>

              <div className="space-y-2.5">
                {(onePageManifesto.summaryHighlights || []).slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => { setCurrentPage('manifesto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Inspect Official Manifesto Page</span>
                </button>
                {onePageManifesto.fileUrl && (
                  <a
                    href={onePageManifesto.fileUrl}
                    download={onePageManifesto.fileName || 'Manifesto'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800 underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download file</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
