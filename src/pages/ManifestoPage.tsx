import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { AccordBadge } from '../components/common/AccordBadge';
import {
  Download,
  Printer,
  CheckCircle,
  Play,
  Clock,
  Sparkles,
  Target,
  FileText,
  Eye,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export const ManifestoPage: React.FC = () => {
  const { onePageManifesto, setIsPrintManifestoOpen, setCurrentPage } = useCampaign();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);

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
              {onePageManifesto.subtitle || 
                'An evidence-grounded blueprint for rural prosperity, modern learning, maternal health, youth digital careers, and food sovereignty across all 16 communities of Odo-Otin.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
            {onePageManifesto.fileUrl && onePageManifesto.enableDownload && (
              <a
                href={onePageManifesto.fileUrl}
                download={onePageManifesto.fileName || 'Rt_Hon_Adewale_Egbedun_One_Page_Manifesto'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer border border-emerald-900"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Download Manifesto ({onePageManifesto.fileType === 'pdf' ? 'PDF' : 'HD Image'})</span>
              </a>
            )}
            <button
              onClick={() => setIsPrintManifestoOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer border border-stone-800"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print Official Manifesto</span>
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
                Watch the Speaker explain the real commitments and verifiable targets behind our 2027 agenda, 
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
                    className="mt-4 text-xs px-3 py-1 bg-stone-800 rounded border border-stone-700 text-stone-200 hover:text-white cursor-pointer"
                  >
                    Close Player
                  </button>
                </div>
              ) : (
                <div
                  className="relative group cursor-pointer w-full h-full flex flex-col items-center justify-center text-center"
                  onClick={() => setIsVideoPlaying(true)}
                >
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

        {/* The One-Page Manifesto Section */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-600 tracking-wider uppercase flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Official One-Page Policy Document</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight mt-1 font-display">
                {onePageManifesto.title || "The People's One-Page Manifesto"}
              </h2>
              <p className="text-sm text-stone-600 mt-1 max-w-2xl">
                A concise, action-focused policy document outlining our governance priorities for the 2027–2031 legislative term.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                {onePageManifesto.versionDate || 'Active 2027 Blueprint'}
              </span>
            </div>
          </div>

          {/* Main One-Page Display Card */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Manifesto Document Visual Viewer (Left 7 Cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 bg-stone-900 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-800 relative">
                <div className="flex items-center justify-between text-white text-xs mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold">{onePageManifesto.fileName || 'Official One-Page Manifesto Document'}</span>
                  </div>
                  {onePageManifesto.fileUrl && (
                    <button
                      onClick={() => setIsFullscreenPreview(true)}
                      className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-white transition-colors cursor-pointer bg-stone-800 px-2.5 py-1 rounded border border-stone-700"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Zoom View</span>
                    </button>
                  )}
                </div>

                {/* Display File Preview */}
                <div className="relative rounded-xl overflow-hidden bg-black border border-stone-800 flex items-center justify-center min-h-[460px] sm:min-h-[580px] shadow-inner group">
                  {onePageManifesto.fileUrl ? (
                    onePageManifesto.fileType === 'pdf' ? (
                      <div className="w-full h-[580px] flex flex-col items-center justify-center p-6 text-center text-stone-300 space-y-4">
                        <FileText className="w-16 h-16 text-amber-400 animate-pulse" />
                        <div>
                          <h4 className="text-base font-bold text-white">PDF Manifesto Document Loaded</h4>
                          <p className="text-xs text-stone-400 mt-1 max-w-sm">
                            The official PDF is available for viewing and direct high-resolution download.
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                          <a
                            href={onePageManifesto.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 hover:bg-amber-300 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Open PDF in New Window</span>
                          </a>
                          <a
                            href={onePageManifesto.fileUrl}
                            download={onePageManifesto.fileName || 'Manifesto.pdf'}
                            className="px-4 py-2 rounded-lg bg-stone-800 text-white font-semibold text-xs border border-stone-700 hover:bg-stone-700 transition-colors flex items-center gap-2"
                          >
                            <Download className="w-3.5 h-3.5 text-amber-400" />
                            <span>Save PDF</span>
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-stone-950 p-2 sm:p-4">
                        <img
                          src={onePageManifesto.fileUrl}
                          alt="Rt. Hon. Adewale Egbedun One Page Manifesto"
                          className="max-h-[620px] w-auto max-w-full object-contain rounded shadow-2xl cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                          onClick={() => setIsFullscreenPreview(true)}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )
                  ) : (
                    <div className="text-center p-8 text-stone-400 space-y-3">
                      <FileText className="w-12 h-12 text-stone-600 mx-auto" />
                      <p className="text-sm font-semibold text-stone-300">No Manifesto File Uploaded Yet</p>
                      <p className="text-xs text-stone-500 max-w-xs">
                        Use the Campaign Admin Console to upload your one-page manifesto image or PDF.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800">
                  <span>Document Status: Official Verified Release</span>
                  <span>Constituency: Odo-Otin State Constituency</span>
                </div>
              </div>

              {/* Right Side: Key Highlights & Candidate Pledge (Right 5 Cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  <div>
                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest block mb-1">
                      Priority Action Areas
                    </span>
                    <h3 className="text-xl font-extrabold text-stone-950 font-display">
                      Key Governance Commitments
                    </h3>
                    <p className="text-xs text-stone-600 mt-1">
                      Direct focus areas targeted for legislative intervention and grassroots delivery.
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-3">
                    {onePageManifesto.summaryHighlights && onePageManifesto.summaryHighlights.length > 0 ? (
                      onePageManifesto.summaryHighlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs text-xs text-stone-800 leading-relaxed"
                        >
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 shrink-0 mt-0.5 font-bold text-[10px]">
                            {idx + 1}
                          </span>
                          <span>{highlight}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-stone-500 italic">No summary points entered yet.</p>
                    )}
                  </div>

                  {/* Candidate Statement Quote */}
                  {onePageManifesto.candidateStatement && (
                    <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-stone-800 leading-relaxed italic space-y-2">
                      <p>&ldquo;{onePageManifesto.candidateStatement}&rdquo;</p>
                      <div className="text-right font-bold text-stone-900 not-italic text-[11px]">
                        — Rt. Hon. Adewale Egbedun
                      </div>
                    </div>
                  )}
                </div>

                {/* Download and Share CTA */}
                <div className="pt-4 border-t border-stone-200 space-y-3">
                  {onePageManifesto.fileUrl && (
                    <a
                      href={onePageManifesto.fileUrl}
                      download={onePageManifesto.fileName || 'Rt_Hon_Adewale_Egbedun_One_Page_Manifesto'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Full-Resolution Manifesto</span>
                    </a>
                  )}

                  <button
                    onClick={() => {
                      setCurrentPage('volunteer');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Support This Agenda · Join as Volunteer</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>

      </div>

      {/* Fullscreen Zoom Lightbox Modal */}
      {isFullscreenPreview && onePageManifesto.fileUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-5xl flex items-center justify-between text-white pb-3">
            <span className="text-xs font-semibold">{onePageManifesto.title}</span>
            <button
              onClick={() => setIsFullscreenPreview(false)}
              className="px-3 py-1 bg-stone-800 text-stone-200 hover:text-white rounded text-xs border border-stone-700 cursor-pointer"
            >
              Close Preview
            </button>
          </div>
          <div className="relative max-w-5xl max-h-[85vh] overflow-auto rounded-lg bg-stone-950 p-2">
            <img
              src={onePageManifesto.fileUrl}
              alt="Manifesto Document Zoomed"
              className="max-h-[80vh] w-auto mx-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

    </div>
  );
};
