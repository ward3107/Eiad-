import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ArrowRight, X, Calendar, User, Tag, Home } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useNavigate } from 'react-router-dom';

export const BlogPage = ({ t, lang }: { t: any; lang: string }) => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const posts = t.blog?.posts || [];
  const categories = ['all', ...new Set(posts.flatMap((p: any) => p.categories || []))];

  const filteredPosts = filterCategory === 'all'
    ? posts
    : posts.filter((p: any) => p.categories?.includes(filterCategory));

  const selectedPostData = posts.find((p: any) => p.id === selectedPost);

  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-gray-900 transition-colors duration-500" dir={t.dir}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-white/5 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className={`flex items-center gap-2 text-[#1E4D92] dark:text-[#4B9CD3] font-bold hover:text-[#4B9CD3] dark:hover:text-white transition-colors ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}
          >
            <Home size={20} />
            <span>{t.dir === 'rtl' ? 'דף הבית' : 'Home'}</span>
          </motion.button>
          <h1 className="text-2xl font-bold text-[#1A1A1A] dark:text-white font-serif">
            {t.blog?.title}
          </h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-24 bg-[#F9F9F9] dark:bg-gray-800 transition-colors duration-500 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h3 className="text-[#1E4D92] dark:text-[#4B9CD3] uppercase tracking-widest font-bold text-sm mb-4">{t.blog?.tag}</h3>
              <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] dark:text-white font-serif">
                {t.blog?.title} <span className="font-bold italic">{t.blog?.accent}</span>
              </h2>
              <p className="mt-6 text-lg text-[#4A4A4A] dark:text-gray-300 max-w-2xl mx-auto">
                {t.blog?.description}
              </p>
            </motion.div>
          </ScrollReveal>

          {/* Category Filter */}
          <ScrollReveal delay={0.1}>
            <div className={`flex flex-wrap justify-center gap-3 mb-12 ${t.dir === 'rtl' ? 'space-x-reverse' : ''}`}>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterCategory(category)}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                    filterCategory === category
                      ? 'bg-[#1E4D92] dark:bg-[#4B9CD3] text-white dark:text-gray-900'
                      : 'bg-white dark:bg-gray-700 text-[#6B7280] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {category === 'all' ? (t.dir === 'rtl' ? 'הכל' : 'All') : category}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: any, index: number) => (
              <ScrollReveal key={post.id} delay={index * 0.1}>
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedPost(post.id)}
                  className="bg-white dark:bg-gray-700 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.color || 'from-[#1E4D92] to-[#4B9CD3]'} group-hover:scale-110 transition-transform duration-500`}>
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/30">
                          <span className="text-6xl font-serif font-bold">{post.title?.[0]}</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      {post.categories?.slice(0, 2).map((cat: string) => (
                        <span key={cat} className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-xs font-bold text-[#1E4D92] dark:text-[#4B9CD3]">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className={`flex items-center gap-4 text-xs text-[#6B7280] dark:text-gray-400 mb-3 ${t.dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-2 line-clamp-2 group-hover:text-[#1E4D92] dark:group-hover:text-[#4B9CD3] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] dark:text-gray-400 line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className={`flex items-center gap-2 text-[#1E4D92] dark:text-[#4B9CD3] font-bold text-sm ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      <span>{t.dir === 'rtl' ? 'קרא עוד' : 'Read More'}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>

          {/* No posts message */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-[#6B7280] dark:text-gray-400">
                {t.dir === 'rtl' ? 'אין פוסטים בקטגוריה זו' : 'No posts in this category'}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && selectedPostData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-700 rounded-[2rem] max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <div className={`h-64 rounded-t-[2rem] bg-gradient-to-br ${selectedPostData.color || 'from-[#1E4D92] to-[#4B9CD3]'} relative overflow-hidden`}>
                  {selectedPostData.image ? (
                    <img src={selectedPostData.image} alt={selectedPostData.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                      <span className="text-8xl font-serif font-bold">{selectedPostData.title?.[0]}</span>
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-8">
                  <div className={`flex items-center gap-4 text-sm text-[#6B7280] dark:text-gray-400 mb-4 ${t.dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {selectedPostData.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={16} />
                      {selectedPostData.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {selectedPostData.readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-[#1A1A1A] dark:text-white mb-4 font-serif">
                    {selectedPostData.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedPostData.categories?.map((cat: string) => (
                      <span key={cat} className="px-3 py-1 bg-[#1E4D92]/10 dark:bg-[#4B9CD3]/10 rounded-full text-xs font-bold text-[#1E4D92] dark:text-[#4B9CD3] flex items-center gap-1">
                        <Tag size={12} />
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="prose prose-lg dark:prose-invert max-w-none text-[#4A4A4A] dark:text-gray-300">
                    {selectedPostData.content}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
