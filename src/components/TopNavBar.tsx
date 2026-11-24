import { useState } from 'react';
import { Compass, Menu, Mountain, Tent, X } from 'lucide-react';
import type { DestinationId } from '../data/destinations';

interface TopNavBarProps {
  activeView: 'intro' | 'destination';
  selectedDestinationId: DestinationId;
  onNavigateIntro: () => void;
  onSelectDestination: (destinationId: DestinationId) => void;
  onJumpToBeforeYouGo: () => void;
  onOpenViewer: () => void;
}

export function TopNavBar({
  activeView,
  selectedDestinationId,
  onNavigateIntro,
  onSelectDestination,
  onJumpToBeforeYouGo,
  onOpenViewer,
}: TopNavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavIntro = () => {
    setMobileMenuOpen(false);
    onNavigateIntro();
  };

  const handleNavDestination = (id: DestinationId) => {
    setMobileMenuOpen(false);
    onSelectDestination(id);
  };

  const handleNavBeforeYouGo = () => {
    setMobileMenuOpen(false);
    onJumpToBeforeYouGo();
  };

  const handleNavOpenViewer = () => {
    setMobileMenuOpen(false);
    onOpenViewer();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F0E7]/95 backdrop-blur-sm border-b border-[#C9B99D]/50 pt-safe transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-3 sm:gap-8">
        <button
          type="button"
          onClick={handleNavIntro}
          className="font-editorial text-xl sm:text-2xl font-semibold tracking-tight text-[#151B19] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68A45] cursor-pointer"
        >
          MyTravWay
        </button>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#151B19]/75"
        >
          <button
            type="button"
            onClick={handleNavIntro}
            className={`whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer hover:text-[#151B19] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68A45] ${
              activeView === 'intro'
                ? 'text-[#183C32] underline underline-offset-8 decoration-[#D68A45] decoration-2'
                : ''
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => handleNavDestination('kalsubai-summit')}
            className={`whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer hover:text-[#151B19] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68A45] ${
              activeView === 'destination' && selectedDestinationId === 'kalsubai-summit'
                ? 'text-[#183C32] underline underline-offset-8 decoration-[#D68A45] decoration-2'
                : ''
            }`}
          >
            Kalsubai Summit
          </button>
          <button
            type="button"
            onClick={() => handleNavDestination('alibaug-night-camping')}
            className={`whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer hover:text-[#151B19] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68A45] ${
              activeView === 'destination' && selectedDestinationId === 'alibaug-night-camping'
                ? 'text-[#183C32] underline underline-offset-8 decoration-[#D68A45] decoration-2'
                : ''
            }`}
          >
            Alibaug Camping
          </button>
          <button
            type="button"
            onClick={handleNavBeforeYouGo}
            className="whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer hover:text-[#151B19] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68A45]"
          >
            Before You Go
          </button>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          {activeView === 'intro' ? (
            <button
              type="button"
              onClick={() => {
                document.getElementById('prototype-destinations')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-3.5 sm:px-4 py-2 min-h-[38px] sm:min-h-[40px] rounded-lg bg-[#183C32] text-[#F5F0E7] text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#151B19] active:scale-95 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45]"
            >
              Explore Destinations
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNavOpenViewer}
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 min-h-[38px] sm:min-h-[40px] rounded-lg bg-[#D68A45] text-[#151B19] text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#c57a37] active:scale-95 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183C32]"
            >
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#151B19]" />
              <span>Explore in 360°</span>
            </button>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#C9B99D]/60 text-[#151B19] hover:bg-[#C9B99D]/20 active:scale-95 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 shrink-0" /> : <Menu className="w-5 h-5 shrink-0" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#C9B99D]/40 bg-[#F5F0E7] px-4 py-4 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            type="button"
            onClick={handleNavIntro}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'intro'
                ? 'bg-[#183C32] text-[#F5F0E7]'
                : 'text-[#151B19] hover:bg-[#C9B99D]/25'
            }`}
          >
            <span>Overview</span>
            {activeView === 'intro' && <span className="text-xs text-[#D68A45]">• Active</span>}
          </button>

          <button
            type="button"
            onClick={() => handleNavDestination('kalsubai-summit')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'destination' && selectedDestinationId === 'kalsubai-summit'
                ? 'bg-[#183C32] text-[#F5F0E7]'
                : 'text-[#151B19] hover:bg-[#C9B99D]/25'
            }`}
          >
            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4 text-[#D68A45] shrink-0" />
              <span>Kalsubai Summit</span>
            </div>
            {activeView === 'destination' && selectedDestinationId === 'kalsubai-summit' && (
              <span className="text-xs text-[#D68A45]">• Active</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNavDestination('alibaug-night-camping')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'destination' && selectedDestinationId === 'alibaug-night-camping'
                ? 'bg-[#183C32] text-[#F5F0E7]'
                : 'text-[#151B19] hover:bg-[#C9B99D]/25'
            }`}
          >
            <div className="flex items-center gap-2">
              <Tent className="w-4 h-4 text-[#D68A45] shrink-0" />
              <span>Alibaug Beach Camping</span>
            </div>
            {activeView === 'destination' && selectedDestinationId === 'alibaug-night-camping' && (
              <span className="text-xs text-[#D68A45]">• Active</span>
            )}
          </button>

          <button
            type="button"
            onClick={handleNavBeforeYouGo}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#151B19] hover:bg-[#C9B99D]/25 transition-colors"
          >
            <span>Before You Go (360° Section)</span>
            <span className="text-xs text-[#183C32]">Jump ↓</span>
          </button>

          <div className="pt-2 border-t border-[#C9B99D]/30">
            <button
              type="button"
              onClick={handleNavOpenViewer}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#D68A45] text-[#151B19] text-sm font-semibold hover:bg-[#c57a37] transition-colors"
            >
              <Compass className="w-4 h-4 shrink-0 text-[#151B19]" />
              <span>Launch 360° Panoramic View</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
