import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../lib/store';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/essays', label: 'Essays' },
    { path: '/shop', label: 'Shop' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-2xl border-b border-white/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all">
                <span className="font-display text-charcoal-950 font-bold text-xl">JA</span>
              </div>
              <span className="font-nav text-cream-100 text-lg tracking-wider uppercase hidden md:block group-hover:text-mustard-300 transition-colors">
                Justin Aharoni
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-nav transition-all duration-300 pb-1 border-b-2 ${
                    isActive(link.path)
                      ? 'text-mustard-400 border-mustard-400'
                      : 'text-cream-100/80 border-transparent hover:text-mustard-300 hover:border-mustard-300/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <Link
                to="/shop"
                className="relative glass-button px-4 py-2 text-cream-100 hover:text-mustard-300 transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-mustard-500 text-charcoal-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-glow">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden glass-button p-3 text-cream-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-fade-in">
          <div
            className="absolute inset-0 bg-charcoal-950/95 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative h-full flex flex-col items-center justify-center gap-8 p-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-nav transition-colors ${
                  isActive(link.path)
                    ? 'text-mustard-400'
                    : 'text-cream-100 hover:text-mustard-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="glass-yellow px-8 py-4 text-charcoal-950 font-nav flex items-center gap-3 mt-4"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart ({cartCount})
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
