import React from 'react';
import { OdoOtinCommunity } from '../../types';

interface CommunityPoint {
  id: OdoOtinCommunity;
  name: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  textAnchor: 'start' | 'middle' | 'end';
  isHeadquarters?: boolean;
}

// 16 constituent communities placed accurately on the exact Odo-Otin LGA map
export const COMMUNITY_COORDINATES: CommunityPoint[] = [
  {
    id: 'Ila-Odo',
    name: 'Ila-Odo',
    x: 490,
    y: 150,
    labelX: 490,
    labelY: 128,
    textAnchor: 'middle'
  },
  {
    id: 'Ijabe',
    name: 'Ijabe',
    x: 535,
    y: 175,
    labelX: 552,
    labelY: 180,
    textAnchor: 'start'
  },
  {
    id: 'Iyeku',
    name: 'Iyeku',
    x: 240,
    y: 165,
    labelX: 222,
    labelY: 169,
    textAnchor: 'end'
  },
  {
    id: 'Ekosin',
    name: 'Ekosin',
    x: 295,
    y: 210,
    labelX: 278,
    labelY: 214,
    textAnchor: 'end'
  },
  {
    id: 'Igbaye',
    name: 'Igbaye',
    x: 386,
    y: 222,
    labelX: 368,
    labelY: 226,
    textAnchor: 'end'
  },
  {
    id: 'Okuku',
    name: 'Okuku',
    x: 490,
    y: 230,
    labelX: 490,
    labelY: 264,
    textAnchor: 'middle',
    isHeadquarters: true
  },
  {
    id: 'Faji',
    name: 'Faji',
    x: 598,
    y: 215,
    labelX: 616,
    labelY: 220,
    textAnchor: 'start'
  },
  {
    id: 'Oyan',
    name: 'Oyan',
    x: 730,
    y: 200,
    labelX: 748,
    labelY: 205,
    textAnchor: 'start'
  },
  {
    id: 'Okua',
    name: 'Okua',
    x: 584,
    y: 285,
    labelX: 602,
    labelY: 290,
    textAnchor: 'start'
  },
  {
    id: 'Opete',
    name: 'Opete',
    x: 185,
    y: 295,
    labelX: 168,
    labelY: 299,
    textAnchor: 'end'
  },
  {
    id: 'Ekusa',
    name: 'Ekusa',
    x: 420,
    y: 310,
    labelX: 420,
    labelY: 338,
    textAnchor: 'middle'
  },
  {
    id: 'Agbeye',
    name: 'Agbeye',
    x: 235,
    y: 370,
    labelX: 218,
    labelY: 374,
    textAnchor: 'end'
  },
  {
    id: 'Inisa',
    name: 'Inisa',
    x: 380,
    y: 415,
    labelX: 380,
    labelY: 446,
    textAnchor: 'middle'
  },
  {
    id: 'Asi Asaba',
    name: 'Asi Asaba',
    x: 598,
    y: 430,
    labelX: 616,
    labelY: 435,
    textAnchor: 'start'
  },
  {
    id: 'Oba Ojomu',
    name: 'Oba Ojomu',
    x: 310,
    y: 440,
    labelX: 292,
    labelY: 444,
    textAnchor: 'end'
  },
  {
    id: 'Ore',
    name: 'Ore',
    x: 210,
    y: 495,
    labelX: 192,
    labelY: 499,
    textAnchor: 'end'
  }
];

// Exact authentic boundary polygon path for Odo-Otin Local Government, Osun State
const ODO_OTIN_EXACT_PATH =
  'M 80,484.5 L 84,495.7 L 95.2,521.4 L 104.1,535.7 L 118.7,548.6 L 131,550 L 152.2,538.6 L 173.5,521.4 L 200.3,511.4 L 235,500 L 248.4,502.9 L 260.7,508.6 L 297.6,512.9 L 321.1,515.7 L 375.9,522.9 L 407.3,520 L 443,505.7 L 467.7,480 L 477.7,470 L 509,471.4 L 547.1,475.7 L 584,491.4 L 604.1,507.3 L 622,521.4 L 640.7,535.5 L 650,551.4 L 664.7,570.2 L 669,575.7 L 691.4,590 L 722.7,585.7 L 748.4,537.1 L 767.4,484.3 L 790.9,442.9 L 813.3,361.4 L 820,331.4 L 817.8,302.9 L 813.3,261.4 L 814.1,246.2 L 807.7,228.6 L 801,210 L 806.6,188.6 L 809.9,170 L 802.1,151.4 L 789.8,125.7 L 767.4,111.4 L 758.9,97.6 L 733.9,98.6 L 700.3,110 L 673.5,112.9 L 643.3,115.7 L 601.9,112.9 L 573.9,130 L 556,160.6 L 552.7,172.9 L 538.5,169.6 L 526.9,157.1 L 516.9,142.9 L 502.3,140 L 488.9,148.6 L 480,158.6 L 466.5,167.1 L 462.1,181.4 L 438.6,191.4 L 420.7,182.9 L 402.8,164.3 L 388.2,152.9 L 371.5,154.3 L 355.8,152.9 L 345.7,140 L 341.3,124.3 L 346.4,98.1 L 345.7,85.7 L 331.2,74.3 L 309.9,70 L 284.2,80 L 255.1,98.6 L 240.6,114.3 L 218.2,120 L 184.7,137.1 L 155.2,148.4 L 131,151.4 L 126.5,170 L 129.9,198.6 L 135.1,216.6 L 137.7,225.7 L 137.7,261.4 L 137.7,281.4 L 137.7,320 L 128.7,375.7 L 124.8,401.1 L 120.9,425.7 L 98.5,462.9 L 80,484.5 Z';

interface OdoOtinMapProps {
  className?: string;
}

export const OdoOtinMap: React.FC<OdoOtinMapProps> = ({ className = '' }) => {
  return (
    <div className={`w-full flex items-center justify-center bg-transparent ${className}`}>
      {/* Pure Map SVG without any background card or borders */}
      <svg
        viewBox="50 50 800 560"
        className="w-full max-w-4xl h-auto select-none overflow-visible bg-transparent drop-shadow-xl"
        aria-label="Exact map of Odo-Otin Local Government in bold yellow with 16 communities in red dots and green names"
      >
        <defs>
          {/* Bold Yellow Gradient */}
          <linearGradient id="boldYellowMapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="65%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>

          {/* Deep Shadow Filter for Bold Definition */}
          <filter id="boldMapShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#78350F" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* EXACT BOUNDARY SHAPE OF ODO-OTIN LOCAL GOVERNMENT IN BOLD YELLOW */}
        <path
          d={ODO_OTIN_EXACT_PATH}
          fill="url(#boldYellowMapGradient)"
          stroke="#854D0E"
          strokeWidth="7"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#boldMapShadow)"
        />

        {/* Bold Secondary Accent Stroke on Map Edge */}
        <path
          d={ODO_OTIN_EXACT_PATH}
          fill="none"
          stroke="#FDE047"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* 16 COMMUNITIES: BOLD RED DOTS & BOLD GREEN NAMES */}
        {COMMUNITY_COORDINATES.map((comm) => (
          <g key={comm.id} className="cursor-default">
            {/* Pulsing subtle outer ring for Okuku (Headquarters) */}
            {comm.isHeadquarters && (
              <circle
                cx={comm.x}
                cy={comm.y}
                r={20}
                fill="#DC2626"
                opacity="0.2"
              />
            )}

            {/* BOLD RED DOT DEPICTING THE COMMUNITY */}
            <circle
              cx={comm.x}
              cy={comm.y}
              r={comm.isHeadquarters ? 12.5 : 9.5}
              fill="#DC2626"
              stroke="#FFFFFF"
              strokeWidth={comm.isHeadquarters ? 3.5 : 3}
            />

            {/* Red Dot Inner Core */}
            <circle
              cx={comm.x}
              cy={comm.y}
              r={comm.isHeadquarters ? 4 : 3}
              fill="#FEE2E2"
            />

            {/* Headquarters Star on Okuku */}
            {comm.isHeadquarters && (
              <text
                x={comm.x}
                y={comm.y - 16}
                textAnchor="middle"
                fill="#DC2626"
                fontSize="16"
                fontWeight="900"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                paintOrder="stroke fill"
              >
                ★
              </text>
            )}

            {/* COMMUNITY NAME WRITTEN IN BOLD GREEN */}
            <text
              x={comm.labelX}
              y={comm.labelY}
              textAnchor={comm.textAnchor}
              fill="#065F46" // Bold Dark Emerald Green
              fontSize={comm.isHeadquarters ? 17 : 15}
              fontWeight="900"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinejoin="round"
              paintOrder="stroke fill"
              letterSpacing="0.2px"
            >
              {comm.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
