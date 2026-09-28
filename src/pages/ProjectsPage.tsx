import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { ODO_OTIN_COMMUNITIES, OdoOtinCommunity, ProjectCategory, ProjectStatus } from '../types';
import { AccordBadge } from '../components/common/AccordBadge';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  CheckCircle2,
  Eye,
  RotateCcw,
  Sparkles,
  Building2
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const {
    projects,
    selectedTownFilter,
    setSelectedTownFilter,
    setSelectedProjectDetail,
    setCurrentPage
  } = useCampaign();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');

  const categories = [
    'All',
    'Roads & Infrastructure',
    'Healthcare & Wellness',
    'Education & Schools',
    'Water & Sanitation',
    'Rural Electrification & Solar',
    'Agriculture & Markets',
    'Youth & Women Empowerment'
  ];

  const statuses = ['All', 'Completed', 'Ongoing', 'Planned'];
  const years = ['All', '2023', '2024', '2025', '2026'];

  // Filtering logic
  const filteredProjects = projects.filter((p) => {
    // Community filter
    if (selectedTownFilter !== 'All' && p.community !== selectedTownFilter) {
      return false;
    }
    // Category filter
    if (selectedCategory !== 'All' && p.category !== selectedCategory) {
      return false;
    }
    // Status filter
    if (selectedStatus !== 'All' && p.status !== selectedStatus) {
      return false;
    }
    // Year filter
    if (selectedYear !== 'All' && p.year.toString() !== selectedYear) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchComm = p.community.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchComm) return false;
    }
    return true;
  });

  const handleResetFilters = () => {
    setSelectedTownFilter('All');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSelectedYear('All');
    setSearchQuery('');
  };

  return (
    <div className="py-12 lg:py-16 bg-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-stone-200 pb-10 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <AccordBadge size="md" />
            <span className="text-xs font-semibold text-stone-500">
              Constituency Delivery Archive
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight font-display">
            Constituency Projects & Interventions
          </h1>
          <p className="text-base text-stone-600 mt-2 max-w-3xl">
            Evidence-based documentation of infrastructure, healthcare facilities, schools, 
            water boreholes, and economic empowerments delivered by Rt. Hon. Adewale Egbedun across all 16 communities of Odo-Otin.
          </p>
        </div>

        {/* Filter Controls Box */}
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 shadow-2xs mb-10 space-y-4">
          
          {/* Search bar and Quick Reset */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by title, keyword, or village name..."
                className="w-full text-base sm:text-sm pl-9 pr-4 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <button
              onClick={handleResetFilters}
              className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-xs font-semibold text-stone-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

          {/* Dropdown Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            
            {/* 1. Community Dropdown (all 16 communities!) */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Filter by Community ({ODO_OTIN_COMMUNITIES.length} Towns)
              </label>
              <select
                value={selectedTownFilter}
                onChange={(e) => setSelectedTownFilter(e.target.value as OdoOtinCommunity | 'All')}
                className="w-full px-3 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-300 text-stone-900 text-base sm:text-xs font-medium focus:outline-hidden focus:border-emerald-600"
              >
                <option value="All">All 16 Communities</option>
                {ODO_OTIN_COMMUNITIES.map((comm) => (
                  <option key={comm} value={comm}>
                    {comm}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Project Category Dropdown */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Project Category / Sector
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-300 text-stone-900 text-base sm:text-xs font-medium focus:outline-hidden focus:border-emerald-600"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Status Dropdown */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Execution Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-300 text-stone-900 text-base sm:text-xs font-medium focus:outline-hidden focus:border-emerald-600"
              >
                {statuses.map((stat) => (
                  <option key={stat} value={stat}>
                    {stat === 'All' ? 'All Statuses' : stat}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Year Dropdown */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Budget / Completion Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-300 text-stone-900 text-base sm:text-xs font-medium focus:outline-hidden focus:border-emerald-600"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y === 'All' ? 'All Years (2023 - 2026)' : `Year ${y}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Indicators */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-stone-500">
            <span>Active selection:</span>
            <span className="font-semibold text-stone-800">
              Community: {selectedTownFilter}
            </span>
            <span>·</span>
            <span className="font-semibold text-stone-800">
              Category: {selectedCategory}
            </span>
            <span>·</span>
            <span className="font-semibold text-stone-800">
              Showing {filteredProjects.length} of {projects.length} recorded projects
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-stone-50 rounded-xl overflow-hidden border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo area with community tag */}
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
                    <div
                      className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-sm ${
                        project.status === 'Completed'
                          ? 'bg-emerald-700 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {project.status}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-2.5">
                    <div className="text-xs text-stone-500 font-medium">
                      <span>{project.category}</span>
                      <span className="mx-2">·</span>
                      <span>{project.year}</span>
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

                {/* Footer Action */}
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
        ) : (
          <div className="text-center py-16 px-4 bg-stone-50 rounded-2xl border border-stone-200">
            <Building2 className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-900 font-display">
              No Projects Match the Selected Filters
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Try adjusting the town, sector, or keyword filters to display other verified interventions.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
