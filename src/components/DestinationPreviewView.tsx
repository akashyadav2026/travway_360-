import { ArrowLeft, Compass, MapPin, Mountain } from 'lucide-react';
import { KALSUBAI_DESTINATION } from '../data/kalsubaiDemo';
import { ResilientImage } from './ResilientImage';

interface DestinationPreviewViewProps {
  onBackToIntro: () => void;
  onOpen360Viewer: () => void;
  onPrefetch360Viewer: () => void;
}

export function DestinationPreviewView({
  onBackToIntro,
  onOpen360Viewer,
  onPrefetch360Viewer,
}: DestinationPreviewViewProps) {
  return (
    <main>
      {/* Step 2 Hero */}
      <section className="relative bg-[#151B19] text-[#F5F0E7]">
        <div className="relative min-h-[460px] lg:min-h-[540px] flex items-end">
          <ResilientImage
            src={KALSUBAI_DESTINATION.heroImageUrl}
            alt={KALSUBAI_DESTINATION.heroImageAlt}
            fallbackTitle="Kalsubai Summit Vista"
            priority
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#151B19] via-[#151B19]/55 to-[#151B19]/30"
          />

          <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-10 pb-12 sm:pb-16">
            <button
              type="button"
              onClick={onBackToIntro}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#F5F0E7]/85 hover:text-[#FFFFFF] mb-8 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68A45]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to MyTravWay Overview</span>
            </button>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#C9B99D] mb-3">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D68A45]" />
                  {KALSUBAI_DESTINATION.regionLine}
                </span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FFFFFF] mb-4">
                {KALSUBAI_DESTINATION.name}
              </h1>

              <p className="text-base sm:text-lg text-[#F5F0E7]/90 leading-relaxed max-w-2xl">
                {KALSUBAI_DESTINATION.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Information Bar */}
      <section aria-label="Destination facts" className="bg-[#FFFFFF] border-b border-[#C9B99D]/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {KALSUBAI_DESTINATION.facts.map((fact) => (
            <div key={fact.id} className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#151B19]/60">{fact.label}</span>
                <span
                  className={`text-[11px] font-medium ${
                    fact.sourceType === 'verified' ? 'text-[#183C32]' : 'text-[#151B19]/55'
                  }`}
                >
                  {fact.sourceType === 'verified' ? 'Verified' : 'Sample'}
                </span>
              </div>
              <p className="font-editorial text-2xl font-normal text-[#151B19] tabular-nums">
                {fact.value}
              </p>
              <p className="text-xs text-[#151B19]/65">{fact.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE YOU GO — Optional 360° Launch Section */}
      <section
        id="before-you-go"
        className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-8 scroll-mt-20"
      >
        <div className="rounded-2xl bg-[#183C32] text-[#F5F0E7] p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-medium tracking-wide text-[#C9B99D]">
              Before You Go · Optional Interactive Preview
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-[#FFFFFF]">
              Don’t just see the destination. Experience it.
            </h2>
            <p className="text-[15px] sm:text-base text-[#F5F0E7]/85 leading-relaxed max-w-2xl">
              Step into an interactive 360° sunrise summit environment to drag around the horizon, inspect three landscape viewpoints, and optionally listen to mountain wind—then return directly to your exact reading position below.
            </p>
            <p className="text-xs text-[#C9B99D] leading-relaxed">
              Transparency note: The Phase 1 viewer renders an illustrative 2:1 equirectangular Sahyadri-inspired sunrise sample environment rather than field-captured Kalsubai survey footage.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-4">
            <button
              type="button"
              onClick={onOpen360Viewer}
              onMouseEnter={onPrefetch360Viewer}
              onFocus={onPrefetch360Viewer}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-lg bg-[#D68A45] text-[#151B19] text-sm sm:text-base font-semibold whitespace-nowrap shrink-0 hover:bg-[#e19652] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F0E7]"
            >
              <Compass className="w-5 h-5" />
              <span>Explore in 360°</span>
            </button>
            <span className="text-xs text-[#F5F0E7]/70 lg:text-right">
              Drag to look · 3 interactive viewpoints · Audio muted by default
            </span>
          </div>
        </div>
      </section>

      {/* Normal Accessible Destination Details */}
      <section
        id="trip-details"
        className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
      >
        {/* Left Narrative & Sample Stages */}
        <div className="lg:col-span-7 space-y-12">
          <div>
            <p className="text-xs font-medium text-[#183C32] mb-2">Destination Overview</p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#151B19] mb-5">
              High above the Sahyadri skyline
            </h2>
            <div className="space-y-4 text-[15px] sm:text-base text-[#151B19]/80 leading-relaxed max-w-prose">
              {KALSUBAI_DESTINATION.overviewParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-[#C9B99D]/50">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
              <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#151B19]">
                Sample Ascent Progression
              </h2>
              <span className="text-xs text-[#151B19]/60">Illustrative prototype stages</span>
            </div>

            <div className="divide-y divide-[#C9B99D]/45 border-y border-[#C9B99D]/45">
              {KALSUBAI_DESTINATION.sampleRouteStages.map((stage) => (
                <div key={stage.stageNumber} className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-2 font-mono text-sm text-[#183C32] tabular-nums">
                    {stage.stageNumber}
                  </div>
                  <div className="sm:col-span-10 space-y-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-editorial text-xl text-[#151B19]">{stage.title}</h3>
                      <span className="text-xs text-[#151B19]/60">{stage.elevationNote}</span>
                    </div>
                    <p className="text-sm text-[#151B19]/75 leading-relaxed">{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Trail Context & Sample Notes */}
        <aside className="lg:col-span-5 space-y-8">
          <div className="rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#C9B99D]/45">
            <div className="aspect-[4/3]">
              <ResilientImage
                src={KALSUBAI_DESTINATION.ridgeImageUrl}
                alt={KALSUBAI_DESTINATION.ridgeImageAlt}
                fallbackTitle="Sahyadri Trail Ascent"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-2">
              <p className="text-xs text-[#183C32] font-medium">
                Atmosphere Preview · Editorial Photography
              </p>
              <p className="text-sm text-[#151B19]/75 leading-relaxed">
                Morning mist frequently pools inside the valleys below the ridge, creating clear cloud layers when viewed from above 1,400 meters.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#FFFFFF] border border-[#C9B99D]/45 p-7 space-y-5">
            <div className="flex items-center gap-2.5">
              <Mountain className="w-4 h-4 text-[#183C32]" />
              <h3 className="font-editorial text-xl text-[#151B19]">
                Sample Preparation Notes
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-[#151B19]/80 leading-relaxed">
              {KALSUBAI_DESTINATION.samplePreparationNotes.map((note, idx) => (
                <li
                  key={idx}
                  className={idx === KALSUBAI_DESTINATION.samplePreparationNotes.length - 1 ? 'pt-3 border-t border-[#C9B99D]/40 text-xs text-[#151B19]/60' : ''}
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
