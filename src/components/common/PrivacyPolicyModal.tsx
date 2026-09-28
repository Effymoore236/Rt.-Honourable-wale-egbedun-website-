import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { X, ShieldCheck, Lock, FileText } from 'lucide-react';

export const PrivacyPolicyModal: React.FC = () => {
  const { isPrivacyPolicyOpen, setIsPrivacyPolicyOpen } = useCampaign();

  if (!isPrivacyPolicyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in no-print">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 text-left flex flex-col relative">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold font-display text-stone-900 uppercase tracking-wider">
              Privacy Policy & NDPR Compliance Notice
            </h3>
          </div>
          <button
            onClick={() => setIsPrivacyPolicyOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5 text-xs text-stone-700 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-stone-950 font-display">
              1. Nigeria Data Protection Regulation (NDPR) Commitment
            </h4>
            <p>
              The Adewale Egbedun Campaign Organization (operating on behalf of Rt. Hon. Adewale Egbedun and Accord Party) 
              is strictly committed to upholding the privacy rights of all citizens and constituents in accordance with the 
              Nigeria Data Protection Act (NDPA) and NDPR guidelines.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm text-stone-950 font-display">
              2. Data Collected from Campaign Volunteers & Constituents
            </h4>
            <p>
              When you register as a volunteer, subscribe to our newsletters, or submit an inquiry, we collect only 
              necessary information including your name, contact phone/WhatsApp, email address, town/ward, and volunteer preferences.
            </p>
            <p>
              <strong>We do not sell, rent, or trade your personal information</strong> with any third-party marketing entities. 
              Data is strictly used for campaign coordination, voter education, and official legislative updates from Speaker Egbedun.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm text-stone-950 font-display">
              3. Electoral Campaign Disclosure
            </h4>
            <p>
              This website is an official campaign communication medium authorized and paid for by the 
              <strong>Adewale Egbedun Campaign Organization</strong>, supporting the re-election of Rt. Hon. Adewale Egbedun 
              for Odo-Otin State Constituency in the Osun State House of Assembly on the platform of Accord Party (ACCORD).
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm text-stone-950 font-display">
              4. Opt-Out & Data Deletion Rights
            </h4>
            <p>
              Any registered constituent or volunteer retains the lawful right to request modification or complete removal 
              of their contact records from our database at any time by contacting our campaign data desk at 
              <span className="font-semibold text-stone-900"> campaign@adewaleegbedun.ng</span>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => setIsPrivacyPolicyOpen(false)}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
