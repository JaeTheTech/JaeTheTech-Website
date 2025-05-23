import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function usePerformanceOptimizations() {
  const router = useRouter();

  useEffect(() => {
    // Preload critical pages
    const criticalRoutes = ['/', '/about', '/projects', '/store'];
    criticalRoutes.forEach(route => {
      router.prefetch(route);
    });

    // Add intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            observer.unobserve(lazyImage);
          }
        });
      },
      { rootMargin: '50px' }
    );

    // Observe all lazy-loaded images
    document.querySelectorAll('img[data-src]').forEach(img => {
      observer.observe(img);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
          console.error('Service worker registration failed:', err);
        });
      });
    }
  }, []);
}