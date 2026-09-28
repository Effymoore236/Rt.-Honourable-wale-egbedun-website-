import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { AccordBadge } from './AccordBadge';
import { X, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';

export const ManifestoPrintModal: React.FC = () => {
  const { isPrintManifestoOpen, setIsPrintManifestoOpen, manifestoPillars, settings } = useCampaign();

  if (!isPrintManifestoOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-stone-300 text-left flex flex-col relative">
        
        {/* Floating Top Controls (Hidden on print) */}
        <div className="sticky top-0 z-30 bg-stone-900 text-white px-6 py-3.5 flex items-center justify-between no-print border-b border-stone-800">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-amber-400">Official Document:</span>
            <span>2027–2031 Odo-Otin Manifesto (Print / PDF Mode)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={() => setIsPrintManifestoOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-8 sm:p-12 space-y-8 bg-white text-stone-900 font-sans print:p-0">
          
          {/* Official Letterhead */}
          <div className="border-b-4 border-amber-400 pb-6 flex items-start justify-between gap-6">
            <div>
              <div className="text-xs font-mono font-bold text-stone-500 uppercase tracking-widest">
                FEDERAL REPUBLIC OF NIGERIA · OSUN STATE
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-display mt-1">
                RT. HON. ADEWALE EGBEDUN
              </h1>
              <p className="text-xs font-semibold text-amber-600">
                Speaker, Osun State House of Assembly & Member Representing Odo-Otin State Constituency
              </p>
              <p className="text-[11px] text-stone-500 mt-1">
                Platform: Accord Party (Cock Emblem) · Slogan: Continuity, Progress, Development
              </p>
            </div>

            <div className="text-right shrink-0">
              <AccordBadge size="lg" />
              <div className="text-[10px] text-stone-500 font-mono mt-1">
                DOC ID: EG-MANIF-2027
              </div>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-stone-950">
              OFFICIAL 2027 – 2031 CONSTITUENCY MANIFESTO
            </h2>
            <p className="text-xs text-stone-600 italic">
              &ldquo;Consolidating Transformative Governance across All 16 Communities of Odo-Otin&rdquo;
            </p>
          </div>

          {/* Candidate Commitment Foreword */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed italic space-y-2">
            <p>
              &ldquo;My good people of Odo-Otin, this manifesto is not a catalogue of hollow political promises. 
              It is a binding social contract rooted in our verifiable first-term accomplishments. 
              Over the past four years, we proved that Odo-Otin can command state-wide respect and direct developmental capital. 
              With your mandate in February 2027, we shall execute these 8 pillars to completion.&rdquo;
            </p>
            <div className="text-right font-bold text-stone-900 not-italic">
              — Rt. Hon. Adewale Egbedun (Speaker, Osun State House of Assembly)
            </div>
          </div>

          {/* The 8 Pillars Detailed Breakdown */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider border-b border-stone-200 pb-1">
              THE 8 STRATEGIC PILLARS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              {manifestoPillars.map((p) => (
                <div key={p.id} className="p-4 rounded-xl border border-stone-200 space-y-2 bg-stone-50/50">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-amber-700 text-xs">
                      PILLAR {p.number}
                    </span>
                    <span className="text-[10px] font-semibold text-stone-500">
                      Est. {p.budgetEstimate}
                    </span>
                  </div>

                  <h4 className="font-bold text-stone-950 text-sm font-display">
                    {p.title}
                  </h4>

                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {p.summary}
                  </p>

                  <ul className="space-y-1 pt-1 text-stone-700 text-[11px]">
                    {p.targets.slice(0, 3).map((t, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">›</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Constituency Covered */}
          <div className="border-t border-stone-200 pt-4 text-xs text-stone-500">
            <span className="font-bold text-stone-700">Constituency Towns Covered: </span>
            Okuku, Inisa, Oyan, Igbaye, Ijabe, Ila-Odo, Agbeye, Ekosin, Iyeku, Faji, Opete, Okua, Ekusa, Asi Asaba, Ore, and Oba Ojomu.
          </div>

          {/* Official Endorsement & Sign-off Block */}
          <div className="pt-8 border-t-2 border-stone-300 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-stone-900">
                Adewale Egbedun Campaign Organization
              </div>
              <div className="text-stone-500 text-[11px]">
                Accord Party Secretariat, Okuku, Osun State
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif italic text-base text-amber-800 font-bold">
                Adewale Egbedun
              </div>
              <div className="text-[11px] font-mono text-stone-600">
                Official Signature & Seal
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
