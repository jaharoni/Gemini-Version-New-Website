import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { MOCK_GALLERY } from '../lib/constants';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mustard-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-forest-900/40 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-mustard-400 text-sm font-nav uppercase tracking-widest mb-6 animate-fade-in">
            New Collection Available
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-medium text-cream-100 mb-8 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Silence in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mustard-300 to-mustard-500">Golden Pigment</span>
          </h1>
          <p className="text-xl md:text-2xl text-sage-400 max-w-2xl mx-auto mb-12 font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Exploring the quiet spaces between digital chaos and organic form.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/shop">
              <Button size="lg">View Collection</Button>
            </Link>
            <Link to="/gallery">
              <Button variant="secondary" size="lg">Explore Gallery</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-24 bg-charcoal-900/50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-display text-cream-100 mb-2">Selected Works</h2>
              <p className="text-sage-400">Curated pieces from the latest series.</p>
            </div>
            <Link to="/gallery" className="hidden md:flex items-center gap-2 text-mustard-400 hover:text-mustard-300 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_GALLERY.slice(0, 3).map((item, index) => (
              <div 
                key={item.id} 
                className="group relative aspect-[3/4] overflow-hidden rounded-xl glass-card transition-all duration-500 hover:-translate-y-2"
              >
                <img 
                  src={item.public_url} 
                  alt={item.title || ''} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-mustard-400 text-sm font-nav uppercase tracking-wider mb-2">{item.tags?.[0]}</span>
                  <h3 className="text-2xl font-display text-white">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LTO Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-mustard-500/5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="glass border-mustard-500/30 bg-mustard-500/10 rounded-2xl p-12 md:p-20 text-center max-w-4xl mx-auto">
            <Star className="w-12 h-12 text-mustard-400 mx-auto mb-6 fill-mustard-400" />
            <h2 className="text-4xl md:text-5xl font-display text-cream-100 mb-6">Limited Edition Prints</h2>
            <p className="text-xl text-sage-400 mb-8 max-w-xl mx-auto">
              Signed and numbered archival prints available for a limited time. Only 50 copies per edition.
            </p>
            <Link to="/shop">
              <Button size="lg" className="bg-mustard-500 text-charcoal-950 hover:bg-mustard-400 border-none shadow-[0_0_30px_rgba(212,160,23,0.3)]">
                Shop Limited Drops
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};