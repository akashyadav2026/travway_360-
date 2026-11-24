import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { TopNavBar } from './components/TopNavBar';
import { IntroLandingView } from './components/IntroLandingView';
import { DestinationPreviewView } from './components/DestinationPreviewView';

const loadImmersiveViewer = () => import('./immersive/ImmersiveSummitModal');
const ImmersiveSummitModal = lazy(loadImmersiveViewer);

export default function App() {
  const [activeView, setActiveView] = useState<'intro' | 'destination'>('intro');
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const savedScrollYRef = useRef<number>(0);

  const handleNavigateIntro = useCallback(() => {
    setActiveView('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateDestination = useCallback(() => {
    setActiveView('destination');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleJumpToBeforeYouGo = useCallback(() => {
    if (activeView !== 'destination') {
      setActiveView('destination');
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById('before-you-go')?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      });
    } else {
      document.getElementById('before-you-go')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeView]);

  const handleOpenViewer = useCallback(() => {
    savedScrollYRef.current = window.scrollY;
    if (activeView !== 'destination') {
      setActiveView('destination');
      savedScrollYRef.current = 0;
    }
    setIsViewerOpen(true);
  }, [activeView]);

  const handleCloseViewer = useCallback(() => {
    setIsViewerOpen(false);
    const restoreY = savedScrollYRef.current;
    requestAnimationFrame(() => {
      window.scrollTo({ top: restoreY, behavior: 'instant' });
    });
  }, []);

  const handlePrefetchViewer = useCallback(() => {
    void loadImmersiveViewer();
  }, []);

  // Lock background page scroll while fullscreen 360° viewer is open
  useEffect(() => {
    if (!isViewerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isViewerOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E7] text-[#151B19]">
      <TopNavBar
        activeView={activeView}
        onNavigateIntro={handleNavigateIntro}
        onNavigateDestination={handleNavigateDestination}
        onJumpToBeforeYouGo={handleJumpToBeforeYouGo}
        onOpenViewer={handleOpenViewer}
      />

      <div className="flex-1">
        {activeView === 'intro' ? (
          <IntroLandingView
            onExploreDestination={handleNavigateDestination}
            onDirectLaunch360={handleOpenViewer}
          />
        ) : (
          <DestinationPreviewView
            onBackToIntro={handleNavigateIntro}
            onOpen360Viewer={handleOpenViewer}
            onPrefetch360Viewer={handlePrefetchViewer}
          />
        )}
      </div>

      <footer className="border-t border-[#C9B99D]/50 bg-[#F5F0E7]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#151B19]/70">
          <div className="space-y-1">
            <p className="font-editorial text-sm font-semibold text-[#151B19]">
              MyTravWay · Phase 1 Destination Preview Prototype
            </p>
            <p>
              Demonstration prototype for Kalsubai Summit, Maharashtra. Illustrative 360° environment and sample trip notes are clearly labeled.
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <button
              type="button"
              onClick={handleNavigateIntro}
              className="hover:text-[#151B19] transition-colors cursor-pointer"
            >
              Overview
            </button>
            <button
              type="button"
              onClick={handleNavigateDestination}
              className="hover:text-[#151B19] transition-colors cursor-pointer"
            >
              Kalsubai Summit
            </button>
          </div>
        </div>
      </footer>

      {isViewerOpen && (
        <Suspense
          fallback={
            <div
              role="status"
              aria-live="polite"
              className="fixed inset-0 z-50 bg-[#151B19] text-[#F5F0E7] flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="w-8 h-8 rounded-full border-2 border-[#C9B99D]/30 border-t-[#D68A45] animate-spin mb-4" />
              <p className="font-editorial text-xl text-[#FFFFFF]">
                Preparing 360° Summit View
              </p>
              <p className="text-xs text-[#C9B99D] mt-1">
                Loading Three.js panoramic sphere and viewpoints…
              </p>
              <button
                type="button"
                onClick={handleCloseViewer}
                className="mt-6 px-4 py-2 rounded-lg border border-[#C9B99D]/40 text-xs text-[#F5F0E7] hover:bg-[#183C32] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          }
        >
          <ImmersiveSummitModal onClose={handleCloseViewer} />
        </Suspense>
      )}
    </div>
  );
}
