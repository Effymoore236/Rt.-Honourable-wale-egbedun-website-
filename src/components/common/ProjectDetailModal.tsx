import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { X, MapPin, Calendar, CheckCircle2, Share2, Quote, ArrowRight, Building2 } from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const { selectedProjectDetail, setSelectedProjectDetail, showToast } = useCampaign();
  const [photoMode, setPhotoMode] = useState<'after' | 'before'>('after');

  if (!selectedProjectDetail) return null;

  const project = selectedProjectDetail;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: project.title,
          text: `Check out this project delivered by Rt. Hon. Adewale Egbedun in ${project.community}, Odo-Otin.`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Project link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in no-print">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 text-left relative flex flex-col">
        
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Verified Project Record
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs font-mono text-stone-500">
              Ref: {project.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="Share Project"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedProjectDetail(null)}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Title & Metadata */}
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-2">
              <span className="inline-flex items-center gap-1 font-semibold text-stone-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>{project.community} Community</span>
              </span>
              <span>·</span>
              <span className="font-medium text-stone-700">{project.category}</span>
              <span>·</span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {project.status}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-display">
              {project.title}
            </h2>
          </div>

          {/* Interactive Before / After Image Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Photographic Evidence
              </span>
              {project.beforeImageUrl && (
                <div className="inline-flex items-center p-0.5 bg-stone-100 rounded-lg border border-stone-200 text-xs">
                  <button
                    onClick={() => setPhotoMode('after')}
                    className={`px-3 py-1 rounded-md transition-colors font-medium cursor-pointer ${
                      photoMode === 'after' ? 'bg-amber-400 text-stone-950 font-bold' : 'text-stone-600'
                    }`}
                  >
                    Current State (Delivered)
                  </button>
                  <button
                    onClick={() => setPhotoMode('before')}
                    className={`px-3 py-1 rounded-md transition-colors font-medium cursor-pointer ${
                      photoMode === 'before' ? 'bg-stone-900 text-white font-bold' : 'text-stone-600'
                    }`}
                  >
                    Previous Condition
                  </button>
                </div>
              )}
            </div>

            <div className="relative rounded-xl overflow-hidden bg-stone-200 h-64 sm:h-80 border border-stone-200">
              <img
                src={photoMode === 'after' ? project.afterImageUrl : (project.beforeImageUrl || project.afterImageUrl)}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-md">
                {photoMode === 'after' ? 'Commissioned / Operational' : 'Historical Baseline'}
              </div>
            </div>
          </div>

          {/* Metrics Triad */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
            <div>
              <span className="text-stone-500 block">Appropriation / Budget</span>
              <span className="text-base font-bold text-stone-900 font-mono mt-0.5 block">
                {project.budget}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Direct Beneficiaries</span>
              <span className="text-base font-bold text-stone-900 mt-0.5 block">
                {project.beneficiaries}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Execution Year / Date</span>
              <span className="text-base font-bold text-stone-900 mt-0.5 block">
                {project.completionDate || `Year ${project.year}`}
              </span>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <h3 className="text-sm font-bold text-stone-950 uppercase tracking-wider font-display">
              Scope of Work & Execution Details
            </h3>
            <p>{project.description}</p>
            <p className="bg-amber-50/60 p-4 rounded-lg border-l-4 border-amber-400 text-stone-800">
              {project.detailedScope}
            </p>
          </div>

          {/* Partner / Agency info */}
          {project.contractorOrPartner && (
            <div className="text-xs text-stone-500 pt-1">
              <span className="font-semibold text-stone-700">Implementing Partner / Fund:</span> {project.contractorOrPartner}
            </div>
          )}

          {/* Beneficiary Testimonial */}
          {project.testimonials && project.testimonials.length > 0 && (
            <div className="p-4 rounded-xl bg-stone-900 text-white space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <Quote className="w-3.5 h-3.5" />
                <span>Beneficiary Community Reflection</span>
              </div>
              <p className="text-xs sm:text-sm italic text-stone-200">
                &ldquo;{project.testimonials[0].comment}&rdquo;
              </p>
              <div className="text-xs text-stone-400">
                — <strong>{project.testimonials[0].name}</strong>, {project.testimonials[0].role} ({project.testimonials[0].community})
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-20 bg-stone-50 px-6 py-4 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Odo-Otin State Constituency Development Archive
          </span>
          <button
            onClick={() => setSelectedProjectDetail(null)}
            className="px-5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
