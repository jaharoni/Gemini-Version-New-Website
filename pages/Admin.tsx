import React, { useState } from 'react';
import { LayoutDashboard, Image as ImageIcon, ShoppingBag, FileText, Settings, Plus, Search, Edit2, Trash2, Save, Clock, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { MOCK_GALLERY, MOCK_PRODUCTS, MOCK_LTO } from '../lib/constants';

type AdminView = 'overview' | 'media' | 'essays' | 'products' | 'lto' | 'settings';

export const Admin: React.FC = () => {
  const [currentView, setCurrentView] = useState<AdminView>('overview');

  const navItems: { id: AdminView; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'essays', label: 'Essays', icon: FileText },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'lto', label: 'LTO Campaigns', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Views', value: '12.5k', change: '+14%' },
          { label: 'Product Sales', value: '$3,420', change: '+8%' },
          { label: 'Active LTOs', value: '1', change: 'Ending soon' },
          { label: 'Subscribers', value: '892', change: '+32' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-xl">
            <p className="text-xs text-sage-400 font-nav uppercase tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display text-cream-100">{stat.value}</span>
              <span className="text-xs text-mustard-400 bg-mustard-500/10 px-2 py-1 rounded border border-mustard-500/20">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chart Placeholder */}
      <div className="glass-card p-8 h-64 flex items-center justify-center text-sage-500">
        <p>Analytics Chart Placeholder</p>
      </div>
    </div>
  );

  const renderMedia = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display">Media Library</h2>
        <Button size="sm"><Plus className="w-4 h-4 mr-2" /> Upload</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {MOCK_GALLERY.map((item) => (
          <div key={item.id} className="group relative aspect-square glass-card rounded-xl overflow-hidden">
            <img src={item.public_url} alt={item.title || ''} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-charcoal-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 border border-white/20"><Edit2 className="w-4 h-4" /></button>
              <button className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/40 border border-red-500/30"><Trash2 className="w-4 h-4" /></button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-charcoal-950/90 backdrop-blur text-xs truncate border-t border-white/10">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display">Products</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-cream-100 focus:outline-none focus:border-mustard-400"
            />
          </div>
          <Button size="sm"><Plus className="w-4 h-4 mr-2" /> Add Product</Button>
        </div>
      </div>
      
      <div className="glass-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-sage-400 text-xs uppercase font-nav tracking-wider">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_PRODUCTS.map((product) => (
              <tr key={product.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={product.images[0]} alt="" className="w-10 h-10 rounded object-cover" />
                  <span className="font-medium text-cream-100">{product.title}</span>
                </td>
                <td className="p-4 text-sage-400">{product.category}</td>
                <td className="p-4 font-mono text-mustard-400">${product.base_price}</td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs border ${product.is_active ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'bg-red-500/20 text-red-400 border-red-500/20'}`}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-sage-400 hover:text-white transition-colors p-2"><Edit2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderLTO = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display">LTO Campaigns</h2>
        <Button size="sm"><Plus className="w-4 h-4 mr-2" /> New Campaign</Button>
      </div>

      <div className="grid gap-6">
        {MOCK_LTO.map(campaign => (
          <div key={campaign.id} className="glass-card p-6 flex flex-col md:flex-row gap-6 items-center">
             <img src={campaign.image_url || ''} className="w-24 h-24 object-cover rounded-lg" alt="" />
             <div className="flex-1">
               <div className="flex items-center gap-2 mb-2">
                 <h3 className="text-xl font-display">{campaign.title}</h3>
                 <span className="px-2 py-0.5 rounded text-xs bg-mustard-500 text-charcoal-950 font-bold uppercase">Active</span>
               </div>
               <p className="text-sage-400 text-sm mb-4">{campaign.description}</p>
               
               <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                 <div 
                   className="bg-mustard-500 h-2 rounded-full" 
                   style={{ width: `${(campaign.current_quantity / (campaign.max_quantity || 1)) * 100}%` }} 
                 />
               </div>
               <div className="flex justify-between text-xs font-mono text-sage-500">
                 <span>{campaign.current_quantity} sold</span>
                 <span>{campaign.max_quantity} total</span>
               </div>
             </div>
             <div className="flex gap-2">
               <Button variant="secondary" size="sm">Edit</Button>
               <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4" /></Button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h2 className="text-2xl font-display">Site Settings</h2>
      <div className="glass-card p-8 space-y-6">
        <div className="space-y-2">
          <label className="block text-xs font-nav uppercase tracking-wider text-sage-400">Site Title</label>
          <input type="text" defaultValue="J.D. ARTIST" className="w-full bg-charcoal-950/50 border border-white/10 rounded-lg p-3 text-cream-100 focus:border-mustard-400 outline-none focus:ring-1 focus:ring-mustard-400" />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-nav uppercase tracking-wider text-sage-400">Contact Email</label>
          <input type="email" defaultValue="hello@jdartist.com" className="w-full bg-charcoal-950/50 border border-white/10 rounded-lg p-3 text-cream-100 focus:border-mustard-400 outline-none focus:ring-1 focus:ring-mustard-400" />
        </div>
        <div className="pt-4 flex justify-end">
          <Button size="sm"><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-20 min-h-screen bg-charcoal-950">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-display text-cream-100">Dashboard</h1>
          <div className="flex items-center gap-3">
             <div className="text-right hidden md:block">
               <p className="text-sm font-medium text-cream-100">Admin User</p>
               <p className="text-xs text-sage-400">admin@jdartist.com</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-mustard-500 text-charcoal-950 flex items-center justify-center font-bold text-lg shadow-glow">JD</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="glass-card p-4 h-fit sticky top-24">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    currentView === item.id
                      ? 'bg-mustard-500/10 text-mustard-400 border border-mustard-500/20 shadow-glow' 
                      : 'text-sage-400 hover:bg-white/5 hover:text-cream-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {currentView === 'overview' && renderOverview()}
            {currentView === 'media' && renderMedia()}
            {currentView === 'products' && renderProducts()}
            {currentView === 'settings' && renderSettings()}
            {currentView === 'lto' && renderLTO()}
            {currentView === 'essays' && (
              <div className="glass-card p-12 text-center text-sage-400 flex flex-col items-center">
                <FileText className="w-16 h-16 mb-4 opacity-20" />
                <h3 className="text-xl font-display text-cream-100 mb-2">Essays Manager</h3>
                <p className="max-w-md mx-auto">This module will feature a rich-text editor using TipTap integration for writing and publishing essays.</p>
                <Button className="mt-6" size="sm">Create Draft</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
