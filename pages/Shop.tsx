import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '../components/Button';
import { useCartStore } from '../lib/store';
import { services } from '../lib/supabase';
import { Product } from '../types';

export const Shop: React.FC = () => {
  const { addItem } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await services.shop.getAll();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
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
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <span className="text-mustard-400 font-nav uppercase tracking-widest text-xs mb-4 block">Store</span>
          <h1 className="text-5xl md:text-6xl font-display text-cream-100 mb-6">Collect Art</h1>
          <p className="text-sage-400 text-lg font-light leading-relaxed">
            Own a piece of the silence. Original oil paintings and high-fidelity archival prints shipped worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <div 
              key={product.id} 
              className="group glass-card rounded-2xl overflow-hidden flex flex-col h-full hover:border-mustard-500/30 transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <Link to={`/shop/${product.slug}`}>
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                </Link>
                <button className="absolute top-4 right-4 p-2 bg-charcoal-950/60 backdrop-blur rounded-full text-white/70 hover:text-red-400 hover:bg-charcoal-950 transition-colors z-10">
                  <Heart className="w-4 h-4" />
                </button>
                {product.category === 'Originals' && (
                  <span className="absolute bottom-4 left-4 px-3 py-1 bg-mustard-500 text-charcoal-950 text-xs font-bold uppercase tracking-wider rounded-sm shadow-lg pointer-events-none">
                    Original
                  </span>
                )}
                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                   <div className="pointer-events-auto">
                     <Button size="sm" onClick={() => addItem(product)}>Quick Add</Button>
                   </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1 bg-charcoal-950/40">
                <div className="mb-4">
                  <Link to={`/shop/${product.slug}`}>
                    <h3 className="text-xl font-display text-cream-100 mb-1 group-hover:text-mustard-300 transition-colors">{product.title}</h3>
                  </Link>
                  <p className="text-sage-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                </div>
                
                <div className="mt-auto flex items-end justify-between border-t border-white/5 pt-4">
                  <div>
                    <span className="text-xs text-sage-500 uppercase tracking-wider block mb-1">Price</span>
                    <span className="text-xl font-nav text-mustard-400">${product.base_price}</span>
                  </div>
                  <span className="text-xs text-sage-600 font-mono border border-white/10 px-2 py-1 rounded">
                     {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
