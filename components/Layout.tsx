import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ChatWidget } from './ChatWidget';
import { CartDrawer } from './CartDrawer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-charcoal-950 min-h-screen text-cream-100 selection:bg-mustard-500 selection:text-charcoal-950">
      <Navbar />
      <CartDrawer />
      <main className="animate-fade-in">
        {children}
      </main>
      <ChatWidget />
      <Footer />
    </div>
  );
};
