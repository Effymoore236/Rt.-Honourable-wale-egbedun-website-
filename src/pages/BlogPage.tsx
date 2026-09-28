import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { AccordBadge } from '../components/common/AccordBadge';
import { BlogPost } from '../types';
import {
  Search,
  Calendar,
  Clock,
  User,
  MessageSquare,
  Share2,
  ArrowLeft,
  Send,
  BookOpen,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const {
    blogPosts,
    selectedBlogPostDetail,
    setSelectedBlogPostDetail,
    addBlogComment,
    showToast
  } = useCampaign();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Comment form fields
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');

  const categories = [
    'All',
    'Press Releases',
    'Legislative Updates',
    'Project Updates',
    'Community News',
    'Events & Announcements'
  ];

  // Filtering
  const filteredPosts = blogPosts.filter((post) => {
    if (!post.published) return false;
    if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchTag = post.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchExcerpt && !matchTag) return false;
    }
    return true;
  });

  const handleCommentSubmit = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!commentName || !commentEmail || !commentText) {
      showToast('Please fill out all comment fields.', 'error');
      return;
    }
    addBlogComment(postId, {
      name: commentName,
      email: commentEmail,
      comment: commentText
    });
    setCommentName('');
    setCommentEmail('');
    setCommentText('');
  };

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'success');
    }
  };

  // If a post is selected for full reading
  if (selectedBlogPostDetail) {
    const post = selectedBlogPostDetail;
    const approvedComments = (post.comments || []).filter((c) => c.approved);

    return (
      <div className="py-12 lg:py-16 bg-white text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <button
            onClick={() => setSelectedBlogPostDetail(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-950 transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Press Releases</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4 border-b border-stone-200 pb-8 mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
              <span className="font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                {post.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 tracking-tight font-display leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-900 font-bold flex items-center justify-center text-sm font-display">
                  {post.author.charAt(0)}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-stone-900">{post.author}</div>
                  <div className="text-stone-500">{post.authorRole}</div>
                </div>
              </div>

              <button
                onClick={() => handleShare(post)}
                className="p-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-8 border border-stone-200 bg-stone-100 max-h-96">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Body Content */}
          <div
            className="prose prose-stone max-w-none text-sm sm:text-base text-stone-800 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-stone-500">Topics:</span>
            {post.tags.map((tag) => (
              <span key={tag} className="text-stone-700 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                #{tag}
              </span>
            ))}
          </div>

          {/* Comment Section */}
          <div className="mt-12 pt-8 border-t border-stone-200 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-stone-950 font-display flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-600" />
                <span>Constituent Comments ({approvedComments.length})</span>
              </h3>
            </div>

            {/* Comment Form */}
            <form
              onSubmit={(e) => handleCommentSubmit(e, post.id)}
              className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4"
            >
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Leave a Thought or Reaction
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    required
                    placeholder="e.g. Chief Adebayo or Sis. Funke"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Your Email *</label>
                  <input
                    type="email"
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    required
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1 text-xs">Your Message *</label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                  rows={3}
                  placeholder="Share your encouragement, question, or community feedback for Speaker Egbedun..."
                  className="w-full text-xs px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Comment</span>
              </button>
            </form>

            {/* List of comments */}
            <div className="space-y-4">
              {approvedComments.length > 0 ? (
                approvedComments.map((comm) => (
                  <div key={comm.id} className="p-4 rounded-xl bg-white border border-stone-200 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900">{comm.name}</span>
                      <span className="text-stone-400">{comm.createdAt}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {comm.comment}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-stone-500 italic">
                  Be the first constituent to leave a comment on this article.
                </p>
              )}
            </div>

          </div>

        </div>
      </div>
    );
  }

  // Blog overview grid / list view
  return (
    <div className="py-12 lg:py-16 bg-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-stone-200 pb-10 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <AccordBadge size="md" />
            <span className="text-xs font-semibold text-stone-500">Official Media Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight font-display">
            News, Press Releases & Legislative Bulletins
          </h1>
          <p className="text-base text-stone-600 mt-2 max-w-3xl">
            Stay informed with verified reports on assembly proceedings, project progress, 
            town hall communiqués, and the official campaign journey.
          </p>
        </div>

        {/* Filter bar and Search */}
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, keyword, or speaker remarks..."
                className="w-full text-base sm:text-sm pl-9 pr-4 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-stone-200 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`min-w-[36px] min-h-[36px] flex items-center justify-center p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-emerald-700 text-white font-bold' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Grid layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`min-w-[36px] min-h-[36px] flex items-center justify-center p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-emerald-700 text-white font-bold' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="List layout"
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex overflow-x-auto no-scrollbar gap-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 min-h-[38px] text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post (if on All) */}
        {filteredPosts.length > 0 && selectedCategory === 'All' && !searchQuery && (
          <div
            className="mb-12 rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 text-white shadow-xl cursor-pointer group"
            onClick={() => setSelectedBlogPostDetail(filteredPosts[0])}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 p-8 sm:p-10 space-y-4">
                <div className="flex items-center gap-3 text-xs text-amber-400 font-semibold">
                  <span className="bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                    FEATURED STORY
                  </span>
                  <span>·</span>
                  <span>{filteredPosts[0].category}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white group-hover:text-amber-300 transition-colors leading-tight">
                  {filteredPosts[0].title}
                </h2>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3">
                  {filteredPosts[0].excerpt}
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs text-stone-400">
                  <span>{new Date(filteredPosts[0].date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span>·</span>
                  <span>{filteredPosts[0].readTime}</span>
                </div>
              </div>

              <div className="lg:col-span-5 h-64 lg:h-full min-h-[260px] overflow-hidden bg-stone-800">
                <img
                  src={filteredPosts[0].featuredImage}
                  alt={filteredPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Articles List / Grid */}
        {filteredPosts.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }
          >
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedBlogPostDetail(post)}
                className={`bg-stone-50 rounded-xl overflow-hidden border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer ${
                  viewMode === 'list' ? 'sm:flex-row' : ''
                }`}
              >
                <div className={viewMode === 'list' ? 'sm:w-1/3 h-52 sm:h-auto overflow-hidden bg-stone-200 shrink-0' : 'h-48 overflow-hidden bg-stone-200 relative'}>
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-stone-500 font-medium mb-1.5">
                      <span className="font-semibold text-amber-700">{post.category}</span>
                      <span>·</span>
                      <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 font-display group-hover:text-amber-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mt-1">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-600 group-hover:underline flex items-center gap-1">
                      <span>Read Story</span>
                      <BookOpen className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-stone-400 text-[11px]">
                      {(post.comments || []).length} Comments
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200">
            <p className="text-base font-bold text-stone-800">No updates match your search.</p>
            <p className="text-xs text-stone-500 mt-1">Try another keyword or category.</p>
          </div>
        )}

      </div>
    </div>
  );
};
