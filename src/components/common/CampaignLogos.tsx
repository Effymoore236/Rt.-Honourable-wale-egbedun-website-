import React from 'react';
import accordLogoAsset from '../../assets/images/accord_party_logo_trimmed.png';
import candidateLogoAsset from '../../assets/images/candidate_campaign_logo_trimmed.png';
import campaignBadgeAsset from '../../assets/images/campaign_badge_support_trimmed.png';

// Authentic asset paths and reliable CDN fallbacks provided by user
export const ACCORD_LOGO_URL = accordLogoAsset;
export const ACCORD_LOGO_FALLBACK = 'https://i.ibb.co/LH4mpcy/accord-logo.jpg';

export const CANDIDATE_LOGO_URL = candidateLogoAsset;
export const CANDIDATE_LOGO_FALLBACK = 'https://i.ibb.co/ccxSfcxN/oglogo-new.png';

export const CAMPAIGN_SUPPORT_BADGE_URL = campaignBadgeAsset;
export const CAMPAIGN_SUPPORT_BADGE_FALLBACK = 'https://i.ibb.co/r2dMyyb0/support-egbedun-2-0-2.png';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  title?: string;
}

/**
 * Official Accord Party Logo
 * Authentic canary yellow with cockerel & thumb emblem.
 * Clean, transparent, unmasked presentation (NO circular crop, NO white box).
 */
export const AccordLogo: React.FC<LogoProps> = ({ className = '', size = 'md', title = 'Accord Party Official Logo' }) => {
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
    '2xl': 'w-24 h-24 sm:w-28 sm:h-28',
    hero: 'w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32'
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      title={title}
    >
      <img
        src={ACCORD_LOGO_URL}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = ACCORD_LOGO_FALLBACK;
        }}
        alt="Accord Party Official Logo"
        className={`${sizeClasses} object-contain`}
        loading="eager"
      />
    </div>
  );
};

/**
 * Candidate's Personal Campaign Logo (Rt. Hon. Adewale Egbedun)
 * High-definition transparent campaign insignia.
 * Exact same dimensions and visual weight as the Accord Party logo.
 * Clean, transparent, unmasked presentation (NO circular crop, NO white box).
 */
export const CandidateLogo: React.FC<LogoProps> = ({ className = '', size = 'md', title = 'Rt. Hon. Adewale Egbedun Personal Campaign Logo' }) => {
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
    '2xl': 'w-24 h-24 sm:w-28 sm:h-28',
    hero: 'w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32'
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      title={title}
    >
      <img
        src={CANDIDATE_LOGO_URL}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = CANDIDATE_LOGO_FALLBACK;
        }}
        alt="Rt. Hon. Adewale Egbedun Personal Campaign Logo"
        className={`${sizeClasses} object-contain drop-shadow-sm`}
        loading="eager"
      />
    </div>
  );
};

/**
 * Official Campaign Supporter Badge / Twibbon:
 * "I Support Adewale Egbedun 2027" (https://ibb.co/QvDnmm8Q)
 * High-resolution transparent trimmed PNG with expansive sizing.
 */
export const CampaignSupportBadge: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'hero-lg' | 'hero-xl';
  title?: string;
}> = ({
  className = '',
  size = 'md',
  title = 'I Support Rt. Hon. Adewale Egbedun 2027 Campaign Badge'
}) => {
  const sizeClasses = {
    sm: 'w-20 h-auto',
    md: 'w-32 h-auto',
    lg: 'w-48 h-auto',
    xl: 'w-60 h-auto',
    hero: 'w-56 sm:w-64 md:w-72 lg:w-80 h-auto',
    'hero-lg': 'w-72 sm:w-84 md:w-96 lg:w-[420px] h-auto',
    'hero-xl': 'w-80 sm:w-96 lg:w-[480px] h-auto'
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      title={title}
    >
      <img
        src={CAMPAIGN_SUPPORT_BADGE_URL}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = CAMPAIGN_SUPPORT_BADGE_FALLBACK;
        }}
        alt="I Support Rt. Hon. Adewale Egbedun 2027 Official Campaign Badge"
        className={`${sizeClasses} object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer`}
        loading="eager"
      />
    </div>
  );
};

/**
 * HeroLogosBanner:
 * Displays BOTH the Candidate's Personal Logo and the Accord Party Logo side-by-side,
 * EXACT SAME SIZE, WITHOUT circular containers, and WITHOUT any white background box.
 */
export const HeroLogosBanner: React.FC<{ className?: string; showBadge?: boolean }> = ({
  className = '',
  showBadge = false
}) => {
  return (
    <div className={`inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 ${className}`}>
      {/* Both logos side-by-side with NO white background box */}
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        {/* Accord Party Logo */}
        <AccordLogo size="hero" className="transition-transform hover:scale-105 duration-200" />

        {/* Campaign tricolor accent divider: Emerald Green, Yellow, Red */}
        <div className="h-16 sm:h-20 w-1 rounded-full bg-gradient-to-b from-emerald-600 via-amber-400 to-red-600" aria-hidden="true" />

        {/* Candidate Personal Campaign Logo (Exact same size) */}
        <CandidateLogo size="hero" className="transition-transform hover:scale-105 duration-200" />
      </div>

      {/* Optional badge (default false, moved to right-hand side of hero) */}
      {showBadge && (
        <div className="flex items-center justify-center">
          <CampaignSupportBadge size="hero" />
        </div>
      )}
    </div>
  );
};

