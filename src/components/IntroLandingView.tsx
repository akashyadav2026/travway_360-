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
    <main>
      {/* Editorial Hero */}
      <section className="relative bg-[#151B19] text-[#F5F0E7] overflow-hidden">
        <div className="relative min-h-[540px] lg:min-h-[620px] flex items-end">
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

          <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-24 pb-14 sm:pb-20">
            <div className="max-w-3xl">
              <p className="text-xs sm:text-sm font-medium tracking-wide text-[#C9B99D] mb-4">
                MyTravWay · Interactive Destination Preview Prototype
              </p>
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.08] text-[#FFFFFF] mb-6">
                Experience the destination before you arrive.
              </h1>
              <p className="text-base sm:text-lg text-[#F5F0E7]/90 leading-relaxed max-w-2xl mb-8">
                Calm, optional 360° destination previews layered onto clear trip information—from pre-dawn Sahyadri summits to quiet moonlit beach campsites along the Konkan coast.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('prototype-destinations')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#D68A45] text-[#151B19] text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#e19652] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F0E7]"
                >
                  <span>Explore Destinations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Prototype Destination Cards */}
      <section
        id="prototype-destinations"
        className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 scroll-mt-16"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#C9B99D]/50">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#183C32] mb-2">
              Prototype Destinations
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-[#151B19]">
              Two distinct landscapes, one calm preview flow
            </h2>
          </div>
          <p className="text-sm text-[#151B19]/70 max-w-md">
            Compare a high-altitude Western Ghats sunrise ascent with an overnight coastal beach camp on the Arabian Sea.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {DESTINATION_LIST.map(({ destination, experience }) => (
            <article
              key={destination.id}
              className="bg-[#FFFFFF] rounded-2xl border border-[#C9B99D]/45 overflow-hidden flex flex-col justify-between"
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

                <div className="p-7 sm:p-9">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#183C32] font-medium mb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D68A45]" />
                      {destination.cardLocationLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{destination.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{experience.hotspots.length} Viewpoints</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#151B19] tracking-tight mb-3">
                    {destination.name}
                  </h3>

                  <p className="text-[15px] leading-relaxed text-[#151B19]/80 mb-6">
                    {destination.intro}
                  </p>

                  <dl className="grid grid-cols-2 gap-4 pt-5 border-t border-[#C9B99D]/40 text-sm">
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

              <div className="px-7 sm:px-9 pb-7 sm:pb-9 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onExploreDestination(destination.id)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#183C32] text-[#F5F0E7] text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#151B19] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45]"
                >
                  <span>Explore Destination</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onDirectLaunch360(destination.id)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#C9B99D] text-[#151B19] text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#F5F0E7] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45]"
                >
                  <Compass className="w-4 h-4 text-[#D68A45]" />
                  <span>Quick 360° Preview</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Calm Design Rationale Strip */}
      <section className="border-t border-[#C9B99D]/45 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-mono text-xs text-[#183C32] mb-2">01</p>
            <h3 className="font-editorial text-xl text-[#151B19] mb-2">Optional by Design</h3>
            <p className="text-sm text-[#151B19]/75 leading-relaxed">
              Essential elevation, coastal logistics, route rhythm, and preparation notes remain cleanly readable whether or not you open the 360° experience.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-[#183C32] mb-2">02</p>
            <h3 className="font-editorial text-xl text-[#151B19] mb-2">Atmosphere & Sound</h3>
            <p className="text-sm text-[#151B19]/75 leading-relaxed">
              Built on a reusable Three.js sphere with mouse and touch drag, anchored viewpoints, and opt-in sound controls that stay muted until chosen.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-[#183C32] mb-2">03</p>
            <h3 className="font-editorial text-xl text-[#151B19] mb-2">Honest Sample Labeling</h3>
            <p className="text-sm text-[#151B19]/75 leading-relaxed">
              Verified geographic facts are separated from sample pacing and optional storytelling moments, and generated 360° scenes are labeled illustrative.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
