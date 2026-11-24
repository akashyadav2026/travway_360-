import { ArrowRight, Compass, MapPin } from 'lucide-react';
import { KALSUBAI_DESTINATION } from '../data/kalsubaiDemo';
import { ResilientImage } from './ResilientImage';

interface IntroLandingViewProps {
  onExploreDestination: () => void;
  onDirectLaunch360: () => void;
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
            src={KALSUBAI_DESTINATION.landingHeroImageUrl}
            alt={KALSUBAI_DESTINATION.landingHeroImageAlt}
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
                MyTravWay · Phase 1 Destination Preview Prototype
              </p>
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.08] text-[#FFFFFF] mb-6">
                Experience the destination before you arrive.
              </h1>
              <p className="text-base sm:text-lg text-[#F5F0E7]/90 leading-relaxed max-w-2xl mb-8">
                A calm, optional 360° summit preview layered gently onto clear trek information—helping travelers feel the elevation, valley scale, and dawn atmosphere before setting out.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onExploreDestination}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#D68A45] text-[#151B19] text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#e19652] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F0E7]"
                >
                  <span>Explore Destination</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Kalsubai Destination Card */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#C9B99D]/50">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#183C32] mb-2">
              Featured Prototype Destination
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-[#151B19]">
              Kalsubai Summit, Maharashtra
            </h2>
          </div>
          <p className="text-sm text-[#151B19]/70 max-w-md">
            Single-destination demonstration showcasing verified peak facts alongside clearly marked sample details and an optional 360° viewpoint.
          </p>
        </div>

        <article className="bg-[#FFFFFF] rounded-2xl border border-[#C9B99D]/45 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px]">
            <ResilientImage
              src={KALSUBAI_DESTINATION.ridgeImageUrl}
              alt={KALSUBAI_DESTINATION.ridgeImageAlt}
              fallbackTitle="Kalsubai Ridge Trail"
              className="w-full h-full lg:absolute lg:inset-0 object-cover"
            />
          </div>

          <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between gap-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#183C32] font-medium mb-4">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D68A45]" />
                  Sahyadri Range
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">1,646 m (Verified)</span>
                <span aria-hidden="true">·</span>
                <span>Illustrative 360° Preview</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#151B19] tracking-tight mb-4">
                {KALSUBAI_DESTINATION.name}
              </h3>

              <p className="text-[15px] leading-relaxed text-[#151B19]/80 mb-6">
                {KALSUBAI_DESTINATION.intro}
              </p>

              <dl className="grid grid-cols-2 gap-4 pt-5 border-t border-[#C9B99D]/40 text-sm">
                <div>
                  <dt className="text-xs text-[#151B19]/60">Base Village</dt>
                  <dd className="font-medium text-[#151B19] mt-0.5">Bari, Igatpuri–Akole</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#151B19]/60">Sample Grade</dt>
                  <dd className="font-medium text-[#151B19] mt-0.5">Moderate (Sample)</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreDestination}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#183C32] text-[#F5F0E7] text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#151B19] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45]"
              >
                <span>Explore Destination</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onDirectLaunch360}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#C9B99D] text-[#151B19] text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#F5F0E7] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45]"
              >
                <Compass className="w-4 h-4 text-[#D68A45]" />
                <span>Quick 360° Preview</span>
              </button>
            </div>
          </div>
        </article>
      </section>

      {/* Calm Design Rationale Strip */}
      <section className="border-t border-[#C9B99D]/45 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-mono text-xs text-[#183C32] mb-2">01</p>
            <h3 className="font-editorial text-xl text-[#151B19] mb-2">Optional by Design</h3>
            <p className="text-sm text-[#151B19]/75 leading-relaxed">
              Essential elevation, route stages, and preparation notes remain cleanly readable whether or not you open the 360° experience.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-[#183C32] mb-2">02</p>
            <h3 className="font-editorial text-xl text-[#151B19] mb-2">Look Around Naturally</h3>
            <p className="text-sm text-[#151B19]/75 leading-relaxed">
              Built on an inward-facing Three.js sphere with mouse and touch drag—letting you inspect the horizon at your own pace without forced intro animations.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-[#183C32] mb-2">03</p>
            <h3 className="font-editorial text-xl text-[#151B19] mb-2">Honest Sample Labeling</h3>
            <p className="text-sm text-[#151B19]/75 leading-relaxed">
              Verified geographic facts are distinguished from sample trip pacing, and the 360° summit scene is clearly marked as an illustrative sample.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
