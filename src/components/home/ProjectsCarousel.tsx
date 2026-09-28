import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { ArrowRight, MapPin, CheckCircle2, Eye, Sparkles } from 'lucide-react';
import { Project } from '../../types';

export const ProjectsCarousel: React.FC = () => {
  const { projects, setCurrentPage, setSelectedProjectDetail } = useCampaign();
  const [activeTab, setActiveTab] = useState<'All' | 'Roads' | 'Health' | 'Agric'>('All');

  const featuredList = projects.filter((p) => {
    if (!p.featured) return false;
    if (activeTab === 'Roads') return p.category.includes('Roads');
    if (activeTab === 'Health') return p.category.includes('Health');
    if (activeTab === 'Agric') return p.category.includes('Agric') || p.category.includes('Water');
    return true;
  });

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Interactive Segmented Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 text-left">
          <div>
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
              Verifiable Track Record
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 tracking-tight mt-1 font-display">
              Completed & Ongoing Projects
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Tangible infrastructure transforming Odo-Otin lives daily. Real locations, real impact.
            </p>
          </div>

          {/* Interactive filter tabs (allowed per anti-slop guidelines) */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 shrink-0">
            {(['All', 'Roads', 'Health', 'Agric'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab === 'All' ? 'All Featured' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {featuredList.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="bg-stone-50 rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image showcase */}
                <div className="relative h-52 bg-stone-200 overflow-hidden">
                  <img
                    src={project.afterImageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{project.community}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-700/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    {project.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="text-xs text-stone-500 font-medium">
                    <span>{project.category}</span>
                    <span className="mx-2">·</span>
                    <span>Year {project.year}</span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 font-display group-hover:text-amber-600 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-2 text-xs text-stone-700 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-stone-900">{project.beneficiaries}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedProjectDetail(project)}
                  className="w-full py-2.5 px-4 rounded-lg bg-white border border-stone-300 hover:border-amber-400 hover:bg-amber-50 text-stone-900 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  <span>View Project Evidence & Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => { setCurrentPage('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <span>Explore All 42+ Constituency Projects & Filter by Community</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
