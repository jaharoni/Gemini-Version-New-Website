import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-mustard-400 font-nav uppercase tracking-widest text-xs mb-4 block">Get In Touch</span>
          <h1 className="text-5xl md:text-7xl font-display text-cream-100 mb-6">Let's Create Together</h1>
          <p className="text-sage-300 text-lg font-body max-w-2xl mx-auto">
            Have a project in mind? Want to collaborate? Just want to say hello? Drop me a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="glass-card p-6 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-mustard-500/20 text-mustard-400 mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-nav text-cream-100 uppercase tracking-wider text-sm mb-2">Email</h3>
            <p className="text-sage-300 text-sm">hello@justinaharoni.com</p>
          </div>

          <div className="glass-card p-6 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-mustard-500/20 text-mustard-400 mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-nav text-cream-100 uppercase tracking-wider text-sm mb-2">Location</h3>
            <p className="text-sage-300 text-sm">Available Worldwide</p>
          </div>

          <div className="glass-card p-6 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-mustard-500/20 text-mustard-400 mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-nav text-cream-100 uppercase tracking-wider text-sm mb-2">Response Time</h3>
            <p className="text-sage-300 text-sm">Within 24 hours</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-card p-8 md:p-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-cream-100 font-nav text-sm uppercase tracking-wider mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-charcoal-900/50 border border-white/10 rounded-lg px-4 py-3 text-cream-100 focus:border-mustard-400 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-cream-100 font-nav text-sm uppercase tracking-wider mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-charcoal-900/50 border border-white/10 rounded-lg px-4 py-3 text-cream-100 focus:border-mustard-400 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-cream-100 font-nav text-sm uppercase tracking-wider mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-charcoal-900/50 border border-white/10 rounded-lg px-4 py-3 text-cream-100 focus:border-mustard-400 focus:outline-none transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-cream-100 font-nav text-sm uppercase tracking-wider mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full bg-charcoal-900/50 border border-white/10 rounded-lg px-4 py-3 text-cream-100 focus:border-mustard-400 focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your project or idea..."
              />
            </div>

            <button
              type="submit"
              className="glass-yellow px-8 py-4 text-charcoal-950 font-nav uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-all mx-auto"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
