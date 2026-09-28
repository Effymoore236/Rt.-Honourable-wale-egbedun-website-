import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';

export const NewsPreview: React.FC = () => {
  const { blogPosts, setCurrentPage, setSelectedBlogPostDetail } = useCampaign();
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 text-left">
          <div>
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
              Campaign & Assembly Dispatch
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 tracking-tight mt-1 font-display">
              Latest News & Legislative Updates
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Official press releases, plenary decisions, and constituency outreach events.
            </p>
          </div>

          <button
            onClick={() => { setCurrentPage('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 transition-colors shrink-0 cursor-pointer"
          >
            <span>All Press Releases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="bg-stone-50 rounded-xl overflow-hidden border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => {
                setSelectedBlogPostDetail(post);
                setCurrentPage('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div>
                <div className="h-48 overflow-hidden bg-stone-200 relative">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/90 text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {post.category}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 font-display group-hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 group-hover:text-amber-700">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Full Article</span>
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
