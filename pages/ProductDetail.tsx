import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '../components/Button';
import { useCartStore } from '../lib/store';
import { services } from '../lib/supabase';
import { Product } from '../types';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState<Product | null | undefined>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      if (slug) {
        const data = await services.shop.getBySlug(slug);
        setProduct(data);
      }
      setLoading(false);
    };
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-950 pt-32 flex justify-center">
        <div className="w-8 h-8 border-2 border-mustard-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-charcoal-950 pt-32 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-display text-cream-100 mb-4">Artwork Not Found</h1>
        <Link to="/shop" className="text-mustard-400 hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-charcoal-950">
      <div className="container mx-auto px-6">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sage-400 hover:text-mustard-400 transition-colors mb-8 text-sm font-nav uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Gallery */}
          <div className="space-y-6 animate-fade-in">
            <div className="aspect-square rounded-2xl overflow-hidden glass-card p-2">
              <img 
                src={product.images[selectedImage]} 
                alt={product.title} 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-mustard-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="inline-block px-3 py-1 bg-white/5 text-mustard-400 text-xs font-nav uppercase tracking-widest rounded-full mb-6 border border-white/10">
              {product.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-display text-cream-100 mb-6">{product.title}</h1>
            
            <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-8">
              <span className="text-3xl font-mono text-cream-100">${product.base_price}</span>
              {product.inventory_count !== undefined && product.inventory_count < 10 && (
                <span className="text-xs text-orange-400 font-nav uppercase tracking-wider">
                  Only {product.inventory_count} left
                </span>
              )}
            </div>

            <div className="prose prose-invert text-sage-300 mb-8 font-body">
              <p>{product.description}</p>
            </div>

            <div className="space-y-4 mb-12">
               <div className="flex items-start gap-3 text-sm text-sage-400">
                 <ShieldCheck className="w-5 h-5 text-mustard-500 shrink-0" />
                 <span>Authenticity guaranteed. Signed certificate included with original works.</span>
               </div>
               <div className="flex items-start gap-3 text-sm text-sage-400">
                 <Truck className="w-5 h-5 text-mustard-500 shrink-0" />
                 <span>Free worldwide shipping on orders over $500. Professional crate packing.</span>
               </div>
            </div>

            <Button 
              size="lg" 
              className="w-full md:w-auto min-w-[200px]"
              onClick={() => addItem(product)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
