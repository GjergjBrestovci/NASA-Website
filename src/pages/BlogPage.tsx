import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import BlogCard from '../components/BlogCard';
import { blogPosts, getAllTags, getPostBySlug, BlogPost } from '../data/blogData';
import './BlogPage.css';

const TAG_COLORS: Record<string, string> = {
  Habitation: '#00d4ff',
  Science: '#10b981',
  Agriculture: '#10b981',
  Engineering: '#7c3aed',
  Energy: '#fbbf24',
  Observation: '#f472b6',
  Astronomy: '#f472b6',
  Team: '#f59e0b',
  Simulation: '#6366f1',
  Operations: '#6366f1',
  Robotics: '#7c3aed',
  Experiments: '#10b981',
  Design: '#00d4ff',
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

// Article detail view
const ArticleView: React.FC<{ post: BlogPost }> = ({ post }) => (
  <PageTransition>
    <div className="article-view">
      <div className="article-view__hero">
        <img src={post.image} alt={post.title} className="article-view__image" />
        <div className="article-view__image-overlay" />
        <div className="article-view__hero-content">
          <div className="article-view__tags">
            {post.tags.map(tag => (
              <span key={tag} className="blog-card__tag" style={{ '--tag-color': TAG_COLORS[tag] || '#8892b0' } as React.CSSProperties}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="article-view__title">{post.title}</h1>
          <div className="article-view__meta">
            <div className="blog-card__avatar">{post.author.initials}</div>
            <div>
              <span className="article-view__author">{post.author.name}</span>
              <span className="article-view__author-role"> · {post.author.role}</span>
            </div>
            <span className="article-view__sep">·</span>
            <span className="article-view__date">{formatDate(post.date)}</span>
            <span className="article-view__sep">·</span>
            <span className="article-view__read-time">{post.readTime} min read</span>
          </div>
        </div>
      </div>

      <div className="article-view__body">
        <div className="article-view__content" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="article-view__footer">
          <Link to="/blog" className="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Mission Logs
          </Link>
        </div>
      </div>
    </div>
  </PageTransition>
);

// Main blog listing
const BlogPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const allTags = getAllTags();

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (slug) {
    const post = getPostBySlug(slug);
    if (post) return <ArticleView post={post} />;
  }

  const filtered = blogPosts.filter(post => {
    const matchTag = !activeTag || post.tags.includes(activeTag);
    const matchSearch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="blog-hero">
        <div className="blog-hero__bg" />
        <div className="blog-hero__content">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Moonshot Blog
          </motion.p>
          <motion.h1
            className="blog-hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Mission <span className="gradient-text">Logs</span>
          </motion.h1>
          <motion.p
            className="blog-hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
          >
            Research findings, experiment updates, and field reports from the Moonshot team.
          </motion.p>

          {/* Search */}
          <motion.div
            className="blog-hero__search-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <svg className="blog-hero__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="blog-hero__search"
              type="text"
              placeholder="Search mission logs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search blog posts"
            />
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="blog-filters">
        <div className="blog-filters__inner">
          <button
            className={`blog-filter-btn ${!activeTag ? 'blog-filter-btn--active' : ''}`}
            onClick={() => setActiveTag(null)}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`blog-filter-btn ${activeTag === tag ? 'blog-filter-btn--active' : ''}`}
              style={{ '--tag-color': TAG_COLORS[tag] || '#8892b0' } as React.CSSProperties}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="blog-content">
        <div className="blog-content__inner">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                className="blog-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>No mission logs found for your search.</p>
                <button className="btn-secondary" onClick={() => { setSearch(''); setActiveTag(null); }}>
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Featured */}
                {featured && !search && !activeTag && (
                  <div className="blog-featured">
                    <BlogCard post={featured} featured index={0} />
                  </div>
                )}

                {/* Grid */}
                {(search || activeTag ? filtered : rest).length > 0 && (
                  <div className="blog-grid">
                    {(search || activeTag ? filtered : rest).map((post, i) => (
                      <BlogCard key={post.id} post={post} index={i} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default BlogPage;
