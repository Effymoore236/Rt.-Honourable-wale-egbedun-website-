import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { AccordLogo, CandidateLogo, CampaignSupportBadge } from '../common/CampaignLogos';
import { Mail, Phone, MapPin, Send, Lock, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, addSubscriber, setIsPrivacyPolicyOpen, settings } = useCampaign();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      if (addSubscriber(emailInput)) {
        setEmailInput('');
      }
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 no-print relative">
      {/* Campaign Brand Colors Top Trim: Emerald Green, Yellow, Crimson Red */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-amber-400 to-red-600" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1: Candidate & Accord Party */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <CandidateLogo size="lg" />
              <AccordLogo size="lg" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display leading-tight">
                Rt. Hon. Adewale Egbedun
              </h3>
              <span className="text-[11px] text-amber-400 font-medium block">
                Accord Party · Odo-Otin State Constituency 2027
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Speaker of the Osun State House of Assembly and Member representing Odo-Otin State Constituency. A proven track record of servant leadership, accountability, and transformative infrastructure.
            </p>
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-stone-800/80 border border-stone-700/60">
              <CampaignSupportBadge size="sm" />
              <div className="text-left">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Supporter Badge</span>
                <span className="text-xs text-white font-semibold">I Support Egbedun 2027</span>
              </div>
            </div>
            <div className="text-xs text-amber-400 font-medium">
              Slogan: <span className="text-white italic">&ldquo;{settings.slogan}&rdquo;</span>
            </div>
          </div>

          {/* Column 2: Contact & Campaign Secretariat */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Campaign Secretariat
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.campaignOfficeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${settings.phoneHotline}`} className="hover:text-white transition-colors">
                  {settings.phoneHotline}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${settings.emailAddress}`} className="hover:text-white transition-colors">
                  {settings.emailAddress}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  <span>Chat on Official WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Newsletter & Engagement */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Stay Informed
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe to official campaign bulletins, town hall alerts, and legislative reports from Speaker Egbedun.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full text-xs px-3 py-2.5 rounded-lg bg-stone-800 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-stone-400">
                Protected by NDPR compliance. We never share constituent data.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom bar with legal and admin access */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="text-center sm:text-left">
            <p className="font-medium text-stone-400">
              Paid for by Adewale Egbedun Campaign Organization (Accord Party).
            </p>
            <p className="text-[11px] mt-0.5 text-stone-400">
              &copy; {new Date().getFullYear()} Rt. Hon. Adewale Egbedun. All rights reserved. Odo-Otin State Constituency, Osun State, Nigeria.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsPrivacyPolicyOpen(true)}
              className="hover:text-amber-400 underline cursor-pointer"
            >
              Privacy Policy (NDPR)
            </button>
            <span className="text-stone-700">·</span>
            <button
              onClick={() => setIsPrivacyPolicyOpen(true)}
              className="hover:text-amber-400 underline cursor-pointer"
            >
              Campaign Terms
            </button>
            <span className="text-stone-700">·</span>
            <button
              onClick={() => { setCurrentPage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-400 border border-stone-700/80 transition-colors cursor-pointer text-xs"
              title="Campaign Staff & Admin Dashboard Portal"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
