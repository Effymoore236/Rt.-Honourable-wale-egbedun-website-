import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { AccordBadge } from '../components/common/AccordBadge';
import { GalleryItem } from '../types';
import {
  Maximize2,
  Calendar,
  MapPin,
  X,
  Share2,
  Download,
  Image as ImageIcon
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { galleryItems, selectedLightboxImage, setSelectedLightboxImage, showToast } = useCampaign();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Official Duties as Speaker',
    'Community Engagement',
    'Project Commissioning',
    'Constituency Meetings',
    'State House Sessions',
    'Festive Celebrations'
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handleShare = (item: GalleryItem) => {
    if (navigator.share) {
      navigator
        .share({
          title: item.title,
          text: `${item.title} - Rt. Hon. Adewale Egbedun Gallery`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Image link copied to clipboard!', 'success');
    }
  };

  const handleDownload = (item: GalleryItem) => {
    const link = document.createElement('a');
    link.href = item.imageUrl;
    link.download = `Adewale_Egbedun_${item.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Starting high-resolution image download...', 'info');
  };

  return (
    <div className="py-12 lg:py-16 bg-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-stone-200 pb-10 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <AccordBadge size="md" />
            <span className="text-xs font-semibold text-stone-500">Photographic Archives</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight font-display">
            Campaign & Legislative Gallery
          </h1>
          <p className="text-base text-stone-600 mt-2 max-w-3xl">
            A visual chronicle of parliamentary leadership, grassroots consultations, project inaugurations, 
            and cultural celebrations with the good people of Odo-Otin State Constituency.
          </p>
        </div>

        {/* Category Filter Tabs (allowed as interactive filter control) */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 p-1.5 bg-stone-100 rounded-xl border border-stone-200 -mx-4 px-4 sm:mx-0 sm:px-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-stone-50 rounded-xl overflow-hidden border border-stone-200 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div
                className="relative h-64 overflow-hidden bg-stone-200 cursor-pointer"
                onClick={() => setSelectedLightboxImage(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white/90 text-stone-900 shadow-md">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.category}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    <span>{item.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-stone-900 font-display group-hover:text-amber-600 transition-colors line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-stone-200/60 text-xs">
                  <button
                    onClick={() => setSelectedLightboxImage(item)}
                    className="text-amber-600 font-bold hover:underline cursor-pointer"
                  >
                    View Enlarged
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(item)}
                      className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
                      title="Download image"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleShare(item)}
                      className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
                      title="Share image"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedLightboxImage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in no-print">
          <div className="bg-stone-950 text-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-800 flex flex-col relative">
            
            {/* Lightbox Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {selectedLightboxImage.category}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownload(selectedLightboxImage)}
                  className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                  title="Download High-Res"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare(selectedLightboxImage)}
                  className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedLightboxImage(null)}
                  className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image Frame */}
            <div className="relative bg-black max-h-[65vh] flex items-center justify-center p-2">
              <img
                src={selectedLightboxImage.imageUrl}
                alt={selectedLightboxImage.title}
                className="max-h-[60vh] w-auto max-w-full object-contain rounded-md"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Lightbox Caption & Details */}
            <div className="p-6 bg-stone-900 border-t border-stone-800 space-y-2">
              <div className="flex items-center gap-4 text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedLightboxImage.location}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>{selectedLightboxImage.date}</span>
                </span>
              </div>
              <h2 className="text-lg font-bold text-white font-display">
                {selectedLightboxImage.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {selectedLightboxImage.caption}
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
