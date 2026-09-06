import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { pageTransition } from './lib/animations';

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
);

const ProductsPage = lazy(() =>
  import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })),
);

const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })),
);

const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })),
);

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <span className="inline-block w-8 h-8 border-2 border-[#E5E3DF] border-t-[#1A1A1A] rounded-full animate-spin" />
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/tentang-kami" element={<AboutPage />} />
            <Route path="/koleksi-produk" element={<ProductsPage />} />
            <Route path="/koleksi-produk/:productId" element={<ProductDetailPage />} />
            <Route path="/layanan" element={<ServicesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  // Prefetch route chunks early so the page transition never flashes a loader
  useEffect(() => {
    const t = window.setTimeout(() => {
      void import('./pages/AboutPage');
      void import('./pages/ProductsPage');
      void import('./pages/ProductDetailPage');
      void import('./pages/ServicesPage');
    }, 300);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <PageLayout>
      <AnimatedRoutes />
    </PageLayout>
  );
}