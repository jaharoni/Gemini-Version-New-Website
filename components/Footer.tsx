import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-charcoal-950 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-display text-2xl text-mustard-500 mb-4">J.D. ARTIST</h3>
            <p className="text-sage-400 max-w-sm mb-6">
              Exploring the boundaries between digital noise and organic silence through oil and pixels.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-2 glass rounded-full hover:bg-white/10 transition-colors">
                  <Icon className="w-5 h-5 text-cream-200" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-nav text-sm uppercase tracking-wider text-white/50 mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/gallery" className="text-sage-400 hover:text-mustard-400 transition-colors">Gallery</Link></li>
              <li><Link to="/essays" className="text-sage-400 hover:text-mustard-400 transition-colors">Essays</Link></li>
              <li><Link to="/shop" className="text-sage-400 hover:text-mustard-400 transition-colors">Shop</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-nav text-sm uppercase tracking-wider text-white/50 mb-6">Admin</h4>
            <ul className="space-y-4">
              <li><Link to="/admin" className="text-sage-400 hover:text-mustard-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-white/5 text-sage-500 text-sm">
          © {new Date().getFullYear()} J.D. Artist. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
