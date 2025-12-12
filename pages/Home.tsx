import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, PenTool, ShoppingBag } from 'lucide-react';

export const Home: React.FC = () => {
  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Gallery',
      description: 'Visual stories captured through the lens',
      link: '/gallery',
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: 'Essays',
      description: 'Thoughts and narratives on photography and life',
      link: '/essays',
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: 'Shop',
      description: 'Limited edition prints and collections',
      link: '/shop',
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-forest-950" />
        <div className="relative z-10 text-center max-w-5xl mx-auto animate-fade-in">
          <span className="inline-block text-mustard-400 font-nav text-sm tracking-widest uppercase mb-6 animate-slide-up">
            Visual Storyteller
          </span>
          <h1 className="text-hero text-cream-100 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Capturing Moments That Matter
          </h1>
          <p className="text-xl md:text-2xl text-sage-300 font-body leading-relaxed mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Where every frame tells a story, every light captures emotion, and every click preserves a memory worth reliving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Link to="/gallery" className="btn-large">
              View Gallery
            </Link>
            <Link to="/contact" className="btn-section">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-section-title text-cream-100 mb-4">Explore My Work</h2>
            <p className="text-sage-300 text-lg font-body">Discover stories through different lenses</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Link
                key={feature.title}
                to={feature.link}
                className="glass-card p-8 group hover:scale-105 transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-mustard-400 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display text-cream-100 mb-3">{feature.title}</h3>
                <p className="text-sage-300 font-body mb-6">{feature.description}</p>
                <span className="inline-flex items-center gap-2 text-mustard-400 font-nav text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
