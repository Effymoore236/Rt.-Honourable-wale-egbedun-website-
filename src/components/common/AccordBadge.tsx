import React from 'react';
import { ACCORD_LOGO_URL, ACCORD_LOGO_FALLBACK } from './CampaignLogos';

export const AccordBadge: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = ''
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-300 bg-gradient-to-r from-amber-50 via-white to-amber-100/60 shadow-xs ${className}`}
    >
      {/* Official Accord Party Logo Emblem */}
      <div
        className={`relative flex items-center justify-center rounded-sm bg-white shadow-xs border border-amber-400 overflow-hidden shrink-0 ${
          isSm ? 'w-6 h-6 p-0.5' : isLg ? 'w-10 h-10 p-0.5' : 'w-8 h-8 p-0.5'
        }`}
        title="Accord Party - Oneness and Progress"
      >
        <img
          src={ACCORD_LOGO_URL}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = ACCORD_LOGO_FALLBACK;
          }}
          alt="Accord Party"
          className="w-full h-full object-contain"
          loading="eager"
        />
      </div>
      <div className="flex flex-col text-left leading-tight">
        <span
          className={`font-bold tracking-wider uppercase text-stone-900 ${
            isSm ? 'text-[10px]' : isLg ? 'text-xs' : 'text-[11px]'
          }`}
        >
          ACCORD
        </span>
        <span
          className={`text-stone-500 font-medium ${
            isSm ? 'text-[8px]' : 'text-[9px]'
          }`}
        >
          Party of Progress
        </span>
      </div>
    </div>
  );
};
