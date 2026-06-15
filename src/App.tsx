/**
 * App Component (Optimized)
 * Main application with code splitting and error boundaries
 */

import { lazy, Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import ScrollToTop from '@/components/ScrollToTop';

// Code-split routes for better performance
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const WatchDemo = lazy(() => import('./pages/WatchDemo'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Global widgets are heavy (chat + voice/Vapi) and hidden until interacted
// with — load them lazily so they stay out of the initial bundle.
const Chatbot = lazy(() => import('@/components/features/chatbot/Chatbot'));
const VoiceCallButton = lazy(
  () => import('@/components/features/voice-call/VoiceCallButton')
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const GlobalWidgets = () => {
  const location = useLocation();
  if (location.pathname === '/watch-demo') return null;

  return (
    <Suspense fallback={null}>
      <ErrorBoundary
        fallback={
          <div className="fixed bottom-6 right-6 bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-lg text-sm">
            Chat unavailable
          </div>
        }
      >
        <Chatbot />
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <div className="fixed bottom-6 left-6 bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-lg text-sm">
            Voice call unavailable
          </div>
        }
      >
        <VoiceCallButton />
      </ErrorBoundary>
    </Suspense>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/watch-demo" element={<WatchDemo />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          {/* Global Components — hidden on /watch-demo */}
          <GlobalWidgets />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
