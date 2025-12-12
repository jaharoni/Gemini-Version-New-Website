import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';

// Lazy load pages
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Gallery = lazy(() => import('./pages/Gallery').then(module => ({ default: module.Gallery })));
const Shop = lazy(() => import('./pages/Shop').then(module => ({ default: module.Shop })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(module => ({ default: module.ProductDetail })));
const Essays = lazy(() => import('./pages/Essays').then(module => ({ default: module.Essays })));
const EssayDetail = lazy(() => import('./pages/EssayDetail').then(module => ({ default: module.EssayDetail })));
const Admin = lazy(() => import('./pages/Admin').then(module => ({ default: module.Admin })));

const Loading: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-charcoal-950">
    <div className="w-16 h-16 border-4 border-mustard-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:slug" element={<ProductDetail />} />
            
            <Route path="/essays" element={<Essays />} />
            <Route path="/essays/:slug" element={<EssayDetail />} />
            
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  );
};

export default App;
