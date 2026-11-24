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
  return (
    <header className="sticky top-0 z-30 bg-[#F5F0E7]/95 border-b border-[#C9B99D]/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={onNavigateIntro}
          className="font-editorial text-xl sm:text-2xl font-semibold tracking-tight text-[#151B19] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68A45] cursor-pointer"
        >
          MyTravWay
        </button>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#151B19]/75"
        >
          <button
            type="button"
            onClick={onNavigateIntro}
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
            onClick={() => onSelectDestination('kalsubai-summit')}
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
            onClick={() => onSelectDestination('alibaug-night-camping')}
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
            onClick={onJumpToBeforeYouGo}
            className="whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer hover:text-[#151B19] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68A45]"
          >
            Before You Go
          </button>
        </nav>

        <div className="flex items-center shrink-0">
          {activeView === 'intro' ? (
            <button
              type="button"
              onClick={() => {
                document.getElementById('prototype-destinations')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg bg-[#183C32] text-[#F5F0E7] text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#151B19] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45]"
            >
              Explore Destinations
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenViewer}
              className="px-4 py-2 rounded-lg bg-[#D68A45] text-[#151B19] text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#c57a37] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183C32]"
            >
              Explore in 360°
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
