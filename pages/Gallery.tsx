import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { services } from '../lib/supabase';
import { Media } from '../types';

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<Media[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await services.gallery.getAll();
      setImages(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Extract unique tags
  const filters = ['All', ...Array.from(new Set(images.flatMap(img => img.tags || [])))];
  
  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(item => item.tags?.includes(filter));

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal-950 pt-32 flex justify-center">
        <div className="w-8 h-8 border-2 border-mustard-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-charcoal-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 animate-fade-in">
          <div>
            <span className="text-mustard-400 font-nav text-xs tracking-widest uppercase mb-2 block">Portfolio</span>
            <h1 className="text-5xl md:text-7xl font-display text-cream-100">Visual Works</h1>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full font-nav text-xs tracking-widest uppercase transition-all border ${
                  filter === f 
                    ? 'bg-mustard-500 text-charcoal-950 border-mustard-500 shadow-glow' 
                    : 'glass-button text-sage-400 hover:text-cream-100 border-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredImages.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="break-inside-avoid glass-card rounded-2xl overflow-hidden cursor-zoom-in group relative animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.public_url} 
                  alt={item.title || ''} 
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <Maximize2 className="text-white w-8 h-8 opacity-80" />
                </div>
              </div>
              
              <div className="p-5 bg-charcoal-950/80 backdrop-blur-md absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-white/10">
                <h3 className="font-display text-xl text-cream-100">{item.title}</h3>
                <p className="text-xs font-nav text-mustard-500 uppercase tracking-wider mt-1">{item.tags?.[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-charcoal-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors z-20"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-cream-100" />
          </button>

          <button 
            className="absolute left-4 md:left-8 p-4 hover:text-mustard-400 transition-colors hidden md:block z-20"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div 
            className="relative w-full max-w-7xl max-h-[90vh] flex flex-col md:flex-row glass rounded-xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex-1 bg-black/50 flex items-center justify-center relative">
              <img 
                src={selectedImage.public_url} 
                alt={selectedImage.title || ''} 
                className="max-h-[50vh] md:max-h-[90vh] w-auto object-contain"
              />
            </div>
            
            <div className="md:w-96 bg-charcoal-900/90 backdrop-blur-xl p-8 flex flex-col justify-center border-l border-white/10">
              <span className="text-mustard-400 font-nav text-xs tracking-widest uppercase mb-4">{selectedImage.tags?.join(', ')}</span>
              <h2 className="text-4xl font-display text-cream-100 mb-6">{selectedImage.title}</h2>
              <p className="text-sage-400 font-body leading-relaxed mb-8">
                {selectedImage.description || "No description available for this piece."}
              </p>
              
              <div className="mt-auto pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono text-sage-500">
                <div>
                  <span className="block text-white/40 uppercase mb-1">Dimensions</span>
                  {selectedImage.width ? `${selectedImage.width}px` : 'N/A'}
                </div>
                <div>
                  <span className="block text-white/40 uppercase mb-1">Created</span>
                  {new Date(selectedImage.created_at || Date.now()).getFullYear()}
                </div>
              </div>
            </div>
          </div>

          <button 
            className="absolute right-4 md:right-8 p-4 hover:text-mustard-400 transition-colors hidden md:block z-20"
            onClick={handleNext}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </div>
  );
};
