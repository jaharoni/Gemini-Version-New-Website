import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Gallery', path: '/gallery' },
    { label: 'Essays', path: '/essays' },
    { label: 'Shop', path: '/shop' },
    { label: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, href: '/contact', label: 'Email' },
  ];

  return (
    <footer className="relative mt-32 border-t border-white/10">
      <div className="glass-card rounded-t-3xl">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center shadow-glow">
                  <span className="font-display text-charcoal-950 font-bold text-2xl">JA</span>
                </div>
                <div>
                  <h3 className="font-nav text-cream-100 text-lg tracking-wider uppercase">Justin Aharoni</h3>
                  <p className="text-sage-400 text-xs font-nav uppercase tracking-widest">Visual Storyteller</p>
                </div>
              </div>
              <p className="text-sage-300 text-sm leading-relaxed">
                Capturing moments that matter. Creating stories that resonate. Building art that endures.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-nav text-cream-100 uppercase tracking-widest text-sm mb-4">Explore</h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sage-300 hover:text-mustard-300 transition-colors text-sm font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-nav text-cream-100 uppercase tracking-widest text-sm mb-4">Connect</h4>
              <div className="flex gap-3 mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="glass-button p-3 text-sage-300 hover:text-mustard-300 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="text-sage-300 text-sm">
                <a href="mailto:hello@justinaharoni.com" className="hover:text-mustard-300 transition-colors">
                  hello@justinaharoni.com
                </a>
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sage-400 text-xs font-body">
              © {currentYear} Justin Aharoni. All rights reserved.
            </p>
            <p className="text-sage-400 text-xs font-body flex items-center gap-2">
              Made with <Heart className="w-3 h-3 text-mustard-400 fill-mustard-400" /> and coffee
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
