import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { resolveBackgroundsForPage } from '../../lib/bg/resolveBackgrounds';
import { backgroundService } from '../../lib/bg/BackgroundService';

export function BackgroundRoot() {
  const location = useLocation();
  const [currentImage, setCurrentImage] = useState<string>('');
  const [nextImage, setNextImage] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentPageRef = useRef<string>('');
  const currentUrlsRef = useRef<string[]>([]);
  const currentIndexRef = useRef<number>(0);
  const carouselEnabledRef = useRef<boolean>(false);
  const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselIntervalMsRef = useRef<number>(7000);
  const abortControllerRef = useRef<AbortController | null>(null);

  const transitionToImage = (url: string) => {
    if (url === currentImage || url === nextImage) return;

    backgroundService.preload(url).catch(() => {});

    if (abortControllerRef.current?.signal.aborted) return;

    setNextImage(url);
    setIsTransitioning(true);
  };

  const handleTransitionEnd = () => {
    if (isTransitioning && nextImage) {
      setCurrentImage(nextImage);
      setIsTransitioning(false);
      setNextImage('');
    }
  };

  const navigateToNext = async () => {
    if (currentUrlsRef.current.length <= 1) return;

    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
      carouselIntervalRef.current = null;
    }

    currentIndexRef.current = (currentIndexRef.current + 1) % currentUrlsRef.current.length;
    const nextUrl = currentUrlsRef.current[currentIndexRef.current];

    transitionToImage(nextUrl);

    if (carouselEnabledRef.current) {
      startCarousel();
    }
  };

  const startCarousel = () => {
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }

    carouselIntervalRef.current = setInterval(async () => {
      if (currentUrlsRef.current.length <= 1) return;

      currentIndexRef.current = (currentIndexRef.current + 1) % currentUrlsRef.current.length;
      const nextUrl = currentUrlsRef.current[currentIndexRef.current];

      transitionToImage(nextUrl);
    }, carouselIntervalMsRef.current);
  };

  useEffect(() => {
    const pageKey = location.pathname.slice(1) || 'home';
    const pageName = pageKey.split('/')[0];
    const pageChanged = pageName !== currentPageRef.current;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const loadPageBackground = async () => {
      try {
        if (carouselIntervalRef.current) {
          clearInterval(carouselIntervalRef.current);
          carouselIntervalRef.current = null;
        }

        const resolved = await resolveBackgroundsForPage(pageName);

        if (abortControllerRef.current?.signal.aborted) {
          return;
        }

        if (resolved.urls.length === 0) {
          console.warn('[BackgroundRoot] No background images found for page:', pageName);
          setHasError(true);
          return;
        }

        setHasError(false);

        currentUrlsRef.current = resolved.urls;
        carouselEnabledRef.current = resolved.carouselEnabled;
        carouselIntervalMsRef.current = resolved.carouselIntervalMs;

        const randomIndex = Math.floor(Math.random() * resolved.urls.length);
        currentIndexRef.current = randomIndex;
        const selectedUrl = resolved.urls[randomIndex];

        if (selectedUrl === currentImage && !pageChanged) {
          return;
        }

        if (!currentImage || pageChanged) {
          const isPreloaded = backgroundService.isPreloaded(selectedUrl);

          if (isPreloaded) {
            setCurrentImage(selectedUrl);
            setIsLoading(false);
          } else {
            backgroundService.preload(selectedUrl).catch(() => {});

            if (currentImage) {
              transitionToImage(selectedUrl);
            } else {
              setCurrentImage(selectedUrl);
              setIsLoading(false);
            }
          }
        } else {
          transitionToImage(selectedUrl);
        }

        if (resolved.urls.length > 1) {
          backgroundService.preloadMultiple(resolved.urls.slice(0, 3));
        }

        if (resolved.carouselEnabled && resolved.urls.length > 1) {
          setTimeout(() => {
            if (!abortControllerRef.current?.signal.aborted) {
              startCarousel();
            }
          }, 1500);
        }
      } catch (error) {
        if (abortControllerRef.current?.signal.aborted) {
          return;
        }
        console.error('[BackgroundRoot] Error loading background:', error);
        setHasError(true);
      } finally {
        currentPageRef.current = pageName;
      }
    };

    loadPageBackground();

    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
        carouselIntervalRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [location.pathname]);

  const handleImageError = (url: string) => {
    console.error('[BackgroundRoot] Failed to load image:', url);
    if (currentUrlsRef.current.length > 1) {
      navigateToNext();
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!currentImage && !nextImage) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white/20 border-t-white/80 rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="w-8 h-8 border-4 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}
      {currentImage && (
        <img
          src={currentImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out"
          style={{
            opacity: isTransitioning ? 0 : 1,
            willChange: isTransitioning ? 'opacity' : 'auto',
            transform: 'translateZ(0)',
          }}
          onLoad={handleImageLoad}
          onError={() => handleImageError(currentImage)}
          loading="eager"
          decoding="async"
        />
      )}
      {nextImage && (
        <img
          src={nextImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out"
          style={{
            opacity: isTransitioning ? 1 : 0,
            willChange: isTransitioning ? 'opacity' : 'auto',
            transform: 'translateZ(0)',
          }}
          onTransitionEnd={handleTransitionEnd}
          onError={() => handleImageError(nextImage)}
          loading="eager"
          decoding="async"
        />
      )}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
