import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { services } from '../lib/supabase';
import { Essay } from '../types';

export const EssayDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [essay, setEssay] = useState<Essay | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEssay = async () => {
      if (slug) {
        const data = await services.essays.getBySlug(slug);
        setEssay(data);
      }
      setLoading(false);
    };
    loadEssay();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-950 pt-32 flex justify-center">
        <div className="w-8 h-8 border-2 border-mustard-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!essay) {
    return (
      <div className="min-h-screen bg-charcoal-950 pt-32 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-display text-cream-100 mb-4">Essay Not Found</h1>
        <Link to="/essays" className="text-mustard-400 hover:underline">Return to Journal</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-charcoal-950">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link to="/essays" className="inline-flex items-center gap-2 text-sage-400 hover:text-mustard-400 transition-colors mb-8 text-sm font-nav uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Essays
        </Link>

        <header className="mb-12 animate-fade-in">
          <div className="flex items-center gap-4 text-xs font-nav text-mustard-500 uppercase tracking-widest mb-6">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(essay.published_at || essay.created_at).toLocaleDateString()}</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {essay.read_time_minutes || 5} min read</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display text-cream-100 mb-6 leading-tight">
            {essay.title}
          </h1>
          
          {essay.subtitle && (
            <p className="text-xl md:text-2xl text-sage-400 font-display italic font-light leading-relaxed">
              {essay.subtitle}
            </p>
          )}
        </header>

        {(essay.media_items?.public_url || essay.featured_image_url) && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-2xl border border-white/10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
             <img 
               src={essay.media_items?.public_url || essay.featured_image_url} 
               alt={essay.title} 
               className="w-full h-full object-cover" 
             />
          </div>
        )}

        <div className="glass-card p-8 md:p-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div 
            className="prose prose-invert prose-lg max-w-none font-body text-sage-200 leading-relaxed
              prose-headings:font-display prose-headings:text-cream-100 
              prose-a:text-mustard-400 prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-mustard-500 prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
              prose-img:rounded-xl prose-img:border prose-img:border-white/10"
            dangerouslySetInnerHTML={{ __html: essay.content }}
          />

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-2">
              {essay.tags?.map(tag => (
                <span key={tag} className="text-xs font-nav text-sage-400 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <button className="flex items-center gap-2 text-sage-400 hover:text-white transition-colors">
              <Share2 className="w-4 h-4" /> <span className="text-xs font-nav uppercase tracking-wider">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
