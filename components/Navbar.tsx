import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '../lib/store';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleCart, items } = useCartStore();
  const location = useLocation();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Gallery', path: '/gallery' },
    { name: 'Essays', path: '/essays' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="container mx-auto px-6">
        <div className={`glass rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-charcoal-950/80' : ''}`}>
          
          <Link to="/" className="text-2xl font-display font-semibold tracking-tight text-mustard-500">
            J.D. ARTIST
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`font-nav uppercase text-sm tracking-wider hover:text-mustard-400 transition-colors ${isActive(link.path) ? 'text-mustard-400' : 'text-cream-200'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleCart}
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 text-cream-100 group-hover:text-mustard-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-mustard-500 text-charcoal-950 text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button 
              className="md:hidden p-2 hover:bg-white/10 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 p-6">
          <div className="glass rounded-xl p-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-nav text-lg py-2 border-b border-white/10 ${isActive(link.path) ? 'text-mustard-400' : 'text-cream-200'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
