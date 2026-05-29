import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ArrowRight, X, Calendar, User, Tag } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Blog = ({ t, lang }: { t: any; lang: string }) => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const posts = t.blog?.posts || [];
  const categories = ['all', ...new Set(posts.flatMap((p: any) => p.categories || []))];

  const filteredPosts = filterCategory === 'all'
    ? posts
    : posts.filter((p: any) => p.categories?.includes(filterCategory));

  const selectedPostData = posts.find((p: any) => p.id === selectedPost);

  return (
    <section id="blog" className="py-24 bg-[#F9F9F9] dark:bg-gray-800 transition-colors duration-500" dir={t.dir}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                    : 'bg-white dark:bg-gray-700 text-[#1A1A1A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? (t.blog?.allCategories || 'All') : category}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post: any, index: number) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedPost(post.id)}
                className="bg-white dark:bg-gray-700 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {post.categories?.slice(0, 2).map((cat: string) => (
                      <span key={cat} className="px-3 py-1 bg-[#4B9CD3]/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6" dir={t.dir}>
                  <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-3 line-clamp-2 group-hover:text-[#1E4D92] dark:group-hover:text-[#4B9CD3] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className={`flex items-center gap-4 text-xs text-[#9CA3AF] dark:text-gray-500 pb-4 border-b border-gray-100 dark:border-gray-600`}>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 mt-4 text-[#1E4D92] dark:text-[#4B9CD3] font-bold text-sm group-hover:gap-3 transition-all`}>
                    <span>{t.blog?.readMore || 'Read More'}</span>
                    <ArrowRight size={16} className={t.dir === 'rtl' ? 'rotate-180' : ''} />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && selectedPostData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-[2rem] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              dir={t.dir}
            >
              {/* Header Image */}
              <div className="relative aspect-[21/9] overflow-hidden">
                <img
                  src={selectedPostData.image}
                  alt={selectedPostData.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                  aria-label={t.blog?.close || 'Close'}
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedPostData.categories?.map((cat: string) => (
                      <span key={cat} className="px-3 py-1 bg-[#4B9CD3] rounded-full text-xs font-bold text-white uppercase tracking-wider">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">{selectedPostData.title}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Meta */}
                <div className={`flex flex-wrap items-center gap-6 pb-6 mb-6 border-b border-gray-200 dark:border-gray-700 text-sm`}>
                  <div className="flex items-center gap-2 text-[#6B7280] dark:text-gray-400">
                    <User size={16} />
                    <span>{selectedPostData.author || t.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B7280] dark:text-gray-400">
                    <Calendar size={16} />
                    <span>{selectedPostData.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B7280] dark:text-gray-400">
                    <Clock size={16} />
                    <span>{selectedPostData.readTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {selectedPostData.content?.map((paragraph: string, idx: number) => (
                    <p key={idx} className="text-[#1A1A1A] dark:text-gray-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                {selectedPostData.tags && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-3 text-[#9CA3AF] dark:text-gray-500">
                      <Tag size={16} />
                      <span className="text-sm font-bold uppercase">{t.blog?.tags || 'Tags'}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedPostData.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-[#1A1A1A] dark:text-gray-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
