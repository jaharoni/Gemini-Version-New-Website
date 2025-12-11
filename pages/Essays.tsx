
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { services } from '../lib/supabase';
import { Essay } from '../types';

export const Essays: React.FC = () => {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEssays = async () => {
      const data = await services.essays.getAll();
      setEssays(data);
      setLoading(false);
    };
    loadEssays();
  }, []);

  if (loading) {
     return (
      <div className="min-h-screen bg-charcoal-950 pt-32 flex justify-center">
        <div className="w-8 h-8 border-2 border-mustard-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-charcoal-950">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-16 animate-fade-in">
          <span className="text-mustard-400 font-nav uppercase tracking-widest text-xs mb-4 block">Journal</span>
          <h1 className="text-5xl md:text-7xl font-display text-cream-100">Essays & Thoughts</h1>
        </div>
        
        <div className="space-y-16">
          {essays.map((essay, idx) => (
            <article 
              key={essay.id} 
              className="glass-card p-8 md:p-12 hover:bg-white/5 transition-colors group animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4">
                  {(essay.media_items?.public_url || essay.featured_image_url) && (
                    <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6 border border-white/10 shadow-lg">
                      <img 
                        src={essay.media_items?.public_url || essay.featured_image_url} 
                        alt={essay.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {essay.tags?.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-[10px] font-nav text-sage-400 border border-white/10 px-2 py-1 rounded-full uppercase tracking-wider">
                        <Tag className="w-3 h-3" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-8">
                  <div className="flex items-center gap-4 text-xs font-nav text-mustard-500 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(essay.published_at || essay.created_at).toLocaleDateString()}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {essay.read_time_minutes || 5} min read</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-display text-cream-100 mb-2 group-hover:text-mustard-300 transition-colors">
                    {essay.title}
                  </h2>
                  {essay.subtitle && (
                    <h3 className="text-xl font-display text-sage-400 mb-4 italic font-light">{essay.subtitle}</h3>
                  )}
                  
                  <p className="text-sage-300 leading-relaxed mb-8 font-body text-lg border-l-2 border-white/10 pl-4">
                    {essay.excerpt}
                  </p>
                  
                  <button className="flex items-center gap-2 text-cream-100 font-nav uppercase text-xs tracking-widest group-hover:text-mustard-400 transition-colors border-b border-transparent group-hover:border-mustard-400 pb-1">
                    Read Essay <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
