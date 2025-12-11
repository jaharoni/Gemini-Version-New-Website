import React from 'react';
import { X, Minus, Plus, Trash2, Lock } from 'lucide-react';
import { useCartStore } from '../lib/store';
import { Button } from './Button';

export const CartDrawer: React.FC = () => {
  const { isOpen, toggleCart, items, removeItem, updateQuantity, total } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div 
        className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      />
      
      <div className="relative w-full max-w-md h-full bg-charcoal-900 border-l border-white/10 shadow-2xl flex flex-col animate-fade-in">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-charcoal-950/50 backdrop-blur">
          <h2 className="font-display text-2xl text-mustard-500">Your Cart</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X className="w-6 h-6 text-cream-100" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-sage-400 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <Lock className="w-8 h-8 opacity-40" />
              </div>
              <p>Your cart is empty.</p>
              <Button variant="ghost" onClick={toggleCart}>Continue Shopping</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="glass-card p-4 rounded-xl flex gap-4 animate-fade-in">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="font-display text-lg text-cream-100 leading-tight">{item.title}</h3>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-sage-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-mustard-400 text-sm font-mono mb-auto">${item.base_price}</p>
                  
                  <div className="flex items-center gap-3 mt-2 bg-white/5 w-fit rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-white/10 rounded text-cream-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-white/10 rounded text-cream-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-charcoal-950/80 backdrop-blur">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sage-400 font-nav uppercase text-xs tracking-wider">Total</span>
            <span className="text-2xl font-display text-cream-100">${total().toFixed(2)}</span>
          </div>
          <Button className="w-full justify-center" disabled={items.length === 0}>
            Checkout
          </Button>
          <p className="text-center text-xs text-sage-500 mt-4 flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" /> Secure Checkout via Stripe
          </p>
        </div>
      </div>
    </div>
  );
};
