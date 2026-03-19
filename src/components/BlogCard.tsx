import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BlogPost } from '../data/blogData';
import './BlogCard.css';

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

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  index?: number;
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false, index = 0 }) => {
  return (
    <motion.div
      className={`blog-card ${featured ? 'blog-card--featured' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/blog/${post.slug}`} className="blog-card__link">
        <div className="blog-card__image-wrap">
          <img
            src={post.image}
            alt={post.title}
            className="blog-card__image"
            loading="lazy"
          />
          <div className="blog-card__image-overlay" />
          {post.featured && (
            <span className="blog-card__featured-badge">Featured</span>
          )}
        </div>

        <div className="blog-card__content">
          <div className="blog-card__tags">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="blog-card__tag"
                style={{ '--tag-color': TAG_COLORS[tag] || '#8892b0' } as React.CSSProperties}
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="blog-card__title">{post.title}</h3>
          <p className="blog-card__excerpt">{post.excerpt}</p>

          <div className="blog-card__meta">
            <div className="blog-card__author">
              <div className="blog-card__avatar">{post.author.initials}</div>
              <div>
                <span className="blog-card__author-name">{post.author.name}</span>
                <span className="blog-card__author-role">{post.author.role}</span>
              </div>
            </div>
            <div className="blog-card__info">
              <span className="blog-card__date">{formatDate(post.date)}</span>
              <span className="blog-card__dot">·</span>
              <span className="blog-card__read-time">{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
