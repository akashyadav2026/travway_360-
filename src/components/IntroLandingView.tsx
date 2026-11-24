import { ArrowRight, Compass, MapPin } from 'lucide-react';
import {
  DESTINATION_LIST,
  type DestinationId,
  LANDING_HERO_IMAGE,
} from '../data/destinations';
import { ResilientImage } from './ResilientImage';

interface IntroLandingViewProps {
  onExploreDestination: (destinationId: DestinationId) => void;
  onDirectLaunch360: (destinationId: DestinationId) => void;
}

export function IntroLandingView({
  onExploreDestination,
  onDirectLaunch360,
}: IntroLandingViewProps) {
  return (
    <main className="w-full overflow-x-hidden">
      {/* Editorial Hero */}
      <section className="relative bg-[#151B19] text-[#F5F0E7] overflow-hidden">
        <div className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex items-end">
          <ResilientImage
            src={LANDING_HERO_IMAGE.url}
            alt={LANDING_HERO_IMAGE.alt}
            fallbackTitle="Sahyadri Mountain Sunrise"
            priority
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#151B19] via-[#151B19]/60 to-[#151B19]/25"
          />

          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-20 sm:pt-24 pb-12 sm:pb-20">
            <div className="max-w-3xl">
              <p className="text-xs sm:text-sm font-medium tracking-wide text-[#C9B99D] mb-3 sm:mb-4">
                MyTravWay · Interactive Destination Preview Prototype
              </p>
              <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.12] sm:leading-[1.08] text-[#FFFFFF] mb-4 sm:mb-6">
                Experience the destination before you arrive.
              </h1>
              <p className="text-sm sm:text-lg text-[#F5F0E7]/90 leading-relaxed max-w-2xl mb-6 sm:mb-8">
                Calm, optional 360° destination previews layered onto clear trip information—from pre-dawn Sahyadri summits to quiet moonlit beach campsites along the Konkan coast.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('prototype-destinations')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[46px] rounded-lg bg-[#D68A45] text-[#151B19] text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#e19652] active:scale-[0.98] transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F0E7]"
                >
                  <span>Explore Destinations</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Prototype Destination Cards */}
      <section
        id="prototype-destinations"
        className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 lg:py-24 scroll-mt-16"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-[#C9B99D]/50">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#183C32] mb-1.5 sm:mb-2">
              Prototype Destinations
            </p>
            <h2 className="font-editorial text-2xl sm:text-4xl font-normal tracking-tight text-[#151B19]">
              Two distinct landscapes, one calm preview flow
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#151B19]/70 max-w-md">
            Compare a high-altitude Western Ghats sunrise ascent with an overnight coastal beach camp on the Arabian Sea.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {DESTINATION_LIST.map(({ destination, experience }) => (
            <article
              key={destination.id}
              className="bg-[#FFFFFF] rounded-2xl border border-[#C9B99D]/45 overflow-hidden flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="relative aspect-[16/10] bg-[#151B19]">
                  <ResilientImage
                    src={destination.cardImageUrl}
                    alt={destination.cardImageAlt}
                    fallbackTitle={destination.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 sm:p-8 lg:p-9">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-[#183C32] font-medium mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#183C32]/10">
                      <MapPin className="w-3.5 h-3.5 text-[#D68A45] shrink-0" />
                      <span>{destination.cardLocationLabel}</span>
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#183C32]/10">
                      {destination.categoryLabel}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#D68A45]/15 text-[#8A4A10]">
                      {experience.hotspots.length} Viewpoints
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#151B19] tracking-tight mb-2.5 sm:mb-3">
                    {destination.name}
                  </h3>

                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#151B19]/80 mb-5 sm:mb-6">
                    {destination.intro}
                  </p>

                  <dl className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-[#C9B99D]/40 text-xs sm:text-sm">
                    <div>
                      <dt className="text-xs text-[#151B19]/60">
                        {destination.cardHighlightLabel}
                      </dt>
                      <dd className="font-medium text-[#151B19] mt-0.5">
                        {destination.cardHighlightValue}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#151B19]/60">
                        {destination.cardSecondaryLabel}
                      </dt>
                      <dd className="font-medium text-[#151B19] mt-0.5">
                        {destination.cardSecondaryValue}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="px-5 sm:px-9 pb-5 sm:pb-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => onExploreDestination(destination.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-[#183C32] text-[#F5F0E7] text-sm font-medium hover:bg-[#151B19] active:scale-[0.98] transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45]"
                >
                  <span>Explore Destination</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => onDirectLaunch360(destination.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg border border-[#C9B99D] text-[#151B19] text-sm font-medium hover:bg-[#F5F0E7] active:scale-[0.98] transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45]"
                >
                  <Compass className="w-4 h-4 text-[#D68A45] shrink-0" />
                  <span>Quick 360° Preview</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Calm Design Rationale Strip */}
      <section className="border-t border-[#C9B99D]/45 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-14 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          <div className="space-y-1.5">
            <p className="font-mono text-xs text-[#183C32]">01</p>
            <h3 className="font-editorial text-lg sm:text-xl text-[#151B19]">Optional by Design</h3>
            <p className="text-xs sm:text-sm text-[#151B19]/75 leading-relaxed">
              Essential elevation, coastal logistics, route rhythm, and preparation notes remain cleanly readable whether or not you open the 360° experience.
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-mono text-xs text-[#183C32]">02</p>
            <h3 className="font-editorial text-lg sm:text-xl text-[#151B19]">Atmosphere & Sound</h3>
            <p className="text-xs sm:text-sm text-[#151B19]/75 leading-relaxed">
              Built on a reusable Three.js sphere with mouse and touch drag, anchored viewpoints, and opt-in sound controls that stay muted until chosen.
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="font-mono text-xs text-[#183C32]">03</p>
            <h3 className="font-editorial text-lg sm:text-xl text-[#151B19]">Honest Sample Labeling</h3>
            <p className="text-xs sm:text-sm text-[#151B19]/75 leading-relaxed">
              Verified facts are separated from sample trip pacing, and 360° environments and story moments are clearly disclosed as illustrative prototypes.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
