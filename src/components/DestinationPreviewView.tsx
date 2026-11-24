import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Compass,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import {
  MYTRAVWAY_CONTACT,
  type DestinationDemoData,
  type DestinationId,
  type PanoramaExperienceConfig,
} from '../data/destinations';
import { ResilientImage } from './ResilientImage';

interface DestinationPreviewViewProps {
  destination: DestinationDemoData;
  experience: PanoramaExperienceConfig;
  alternateDestination: DestinationDemoData;
  onBackToIntro: () => void;
  onOpen360Viewer: () => void;
  onPrefetch360Viewer: () => void;
  onSwitchDestination: (destinationId: DestinationId) => void;
}

export function DestinationPreviewView({
  destination,
  experience,
  alternateDestination,
  onBackToIntro,
  onOpen360Viewer,
  onPrefetch360Viewer,
  onSwitchDestination,
}: DestinationPreviewViewProps) {
  const [showStories, setShowStories] = useState(true);

  return (
    <main className="w-full overflow-x-hidden">
      {/* Destination Hero */}
      <section className="relative bg-[#151B19] text-[#F5F0E7]">
        <div className="relative min-h-[420px] sm:min-h-[460px] lg:min-h-[540px] flex items-end">
          <ResilientImage
            src={destination.heroImageUrl}
            alt={destination.heroImageAlt}
            fallbackTitle={destination.name}
            priority
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#151B19] via-[#151B19]/60 to-[#151B19]/30"
          />

          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-8 sm:pt-10 pb-10 sm:pb-16">
            <button
              type="button"
              onClick={onBackToIntro}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#F5F0E7]/85 hover:text-[#FFFFFF] mb-5 sm:mb-8 transition-colors duration-150 cursor-pointer min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D68A45]"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>Back to Overview</span>
            </button>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#C9B99D] mb-2.5 sm:mb-3">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D68A45] shrink-0" />
                  <span>{destination.regionLine}</span>
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FFFFFF] mb-3 sm:mb-4">
                {destination.name}
              </h1>

              <p className="text-sm sm:text-lg text-[#F5F0E7]/90 leading-relaxed max-w-2xl mb-6">
                {destination.intro}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpen360Viewer}
                  onMouseEnter={onPrefetch360Viewer}
                  onFocus={onPrefetch360Viewer}
                  className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-[#D68A45] text-[#151B19] text-sm font-semibold hover:bg-[#e19652] active:scale-[0.98] transition-all cursor-pointer shadow-sm"
                >
                  <Compass className="w-4 h-4 shrink-0" />
                  <span>Explore in 360°</span>
                </button>

                <a
                  href={`${MYTRAVWAY_CONTACT.whatsappHref}?text=${encodeURIComponent(
                    `Hi MyTravWay, I'd like to book seats for ${destination.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-[#25D366] text-[#FFFFFF] text-sm font-semibold hover:bg-[#20ba59] active:scale-[0.98] transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Book Seat via WhatsApp ({destination.pricePerSeat})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Key Facts Bar */}
      <section aria-label="Destination facts" className="bg-[#FFFFFF] border-b border-[#C9B99D]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {destination.facts.map((fact) => (
            <div
              key={fact.id}
              className="p-3.5 sm:p-4 rounded-xl bg-[#F5F0E7]/45 sm:bg-transparent border sm:border-0 border-[#C9B99D]/35 space-y-1"
            >
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-[11px] sm:text-xs font-medium text-[#151B19]/65">{fact.label}</span>
                <span
                  className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded ${
                    fact.sourceType === 'verified'
                      ? 'bg-[#183C32]/10 text-[#183C32]'
                      : fact.sourceType === 'included'
                      ? 'bg-[#25D366]/15 text-[#183C32]'
                      : 'bg-[#D68A45]/15 text-[#8A4A10]'
                  }`}
                >
                  {fact.sourceType === 'verified'
                    ? 'Verified'
                    : fact.sourceType === 'included'
                    ? 'Included'
                    : fact.sourceType === 'logistics'
                    ? 'Pickups'
                    : 'Highlight'}
                </span>
              </div>
              <p className="font-editorial text-lg sm:text-2xl font-normal text-[#151B19] tabular-nums">
                {fact.value}
              </p>
              <p className="text-[11px] sm:text-xs text-[#151B19]/70 leading-tight">{fact.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE YOU GO — 360° Interactive Atmosphere Section */}
      <section
        id="before-you-go"
        className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-6 sm:pb-8 scroll-mt-20"
      >
        <div className="rounded-2xl bg-[#183C32] text-[#F5F0E7] p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center shadow-md">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B19]/50 border border-[#C9B99D]/30 text-xs font-medium text-[#C9B99D]">
              <Compass className="w-3.5 h-3.5 text-[#D68A45]" />
              <span>Interactive 360° Atmosphere Preview · {experience.hotspots.length} Viewpoints</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#FFFFFF]">
              {destination.beforeYouGoHeadline}
            </h2>
            <p className="text-sm sm:text-base text-[#F5F0E7]/90 leading-relaxed max-w-2xl">
              {destination.beforeYouGoDescription}
            </p>
            <p className="text-xs text-[#C9B99D] leading-relaxed">
              {destination.beforeYouGoNote}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col items-stretch lg:items-end justify-center gap-3">
            <button
              type="button"
              onClick={onOpen360Viewer}
              onMouseEnter={onPrefetch360Viewer}
              onFocus={onPrefetch360Viewer}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 min-h-[48px] rounded-lg bg-[#D68A45] text-[#151B19] text-sm sm:text-base font-semibold whitespace-nowrap shrink-0 hover:bg-[#e19652] active:scale-[0.98] transition-all duration-150 cursor-pointer shadow-md"
            >
              <Compass className="w-5 h-5 shrink-0" />
              <span>Launch 360° View</span>
            </button>
            <span className="text-xs text-[#F5F0E7]/70 text-center lg:text-right">
              {destination.beforeYouGoHint}
            </span>
          </div>
        </div>
      </section>

      {/* Destination Details & Route Timeline */}
      <section
        id="trip-details"
        className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start"
      >
        {/* Left Narrative & Stages */}
        <div className="lg:col-span-7 space-y-8 sm:space-y-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#183C32] mb-1.5 sm:mb-2">
              {destination.overviewKicker}
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#151B19] mb-4 sm:mb-5">
              {destination.overviewHeading}
            </h2>
            <div className="space-y-3.5 sm:space-y-4 text-sm sm:text-base text-[#151B19]/80 leading-relaxed max-w-prose">
              {destination.overviewParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-[#C9B99D]/50">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2 mb-5 sm:mb-6">
              <h2 className="font-editorial text-xl sm:text-3xl font-normal text-[#151B19]">
                {destination.stagesHeading}
              </h2>
              <span className="text-xs text-[#151B19]/60">{destination.stagesSubtitle}</span>
            </div>

            <div className="divide-y divide-[#C9B99D]/45 border-y border-[#C9B99D]/45">
              {destination.routeStages.map((stage) => (
                <div
                  key={stage.stageNumber}
                  className="py-4 sm:py-6 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6"
                >
                  <div className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#183C32]/10 font-mono text-xs sm:text-sm font-semibold text-[#183C32] shrink-0 tabular-nums">
                    {stage.stageNumber}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="font-editorial text-base sm:text-xl text-[#151B19]">
                        {stage.title}
                      </h3>
                      <span className="text-[11px] sm:text-xs text-[#183C32] font-medium">
                        {stage.elevationNote}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#151B19]/75 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Atmosphere Sidebar & Packing List */}
        <aside className="lg:col-span-5 space-y-6 sm:space-y-8">
          <div className="rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#C9B99D]/45 shadow-sm">
            <div className="aspect-[4/3]">
              <ResilientImage
                src={destination.sidebarImageUrl}
                alt={destination.sidebarImageAlt}
                fallbackTitle={destination.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-6 space-y-1.5 sm:space-y-2">
              <p className="text-xs text-[#183C32] font-semibold uppercase tracking-wide">
                {destination.sidebarCaptionTitle}
              </p>
              <p className="text-xs sm:text-sm text-[#151B19]/75 leading-relaxed">
                {destination.sidebarCaptionText}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#FFFFFF] border border-[#C9B99D]/45 p-5 sm:p-7 space-y-4 sm:space-y-5 shadow-sm">
            <div className="flex items-center gap-2.5">
              <Mountain className="w-4 h-4 text-[#183C32] shrink-0" />
              <h3 className="font-editorial text-lg sm:text-xl text-[#151B19]">
                {destination.notesHeading}
              </h3>
            </div>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-[#151B19]/80 leading-relaxed">
              {destination.preparationNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[#C9B99D]/30 flex flex-col gap-2.5">
              <a
                href={`${MYTRAVWAY_CONTACT.whatsappHref}?text=${encodeURIComponent(
                  `Hi MyTravWay, I have a query about ${destination.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#25D366] text-[#FFFFFF] text-xs font-semibold hover:bg-[#20ba59] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Ask Trip Lead on WhatsApp</span>
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* Real Visual Storytelling Cards */}
      {destination.storyMoments && destination.storyMoments.length > 0 && (
        <section
          id="camp-moments"
          className="border-t border-[#C9B99D]/45 bg-[#FFFFFF]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-[#C9B99D]/45">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#183C32] mb-1.5 sm:mb-2">
                  Real Community Moments
                </p>
                <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#151B19] mb-1.5 sm:mb-2">
                  {destination.storySectionTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#151B19]/75">
                  {destination.storySectionSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowStories((prev) => !prev)}
                aria-expanded={showStories}
                className="self-start md:self-auto px-4 py-2 min-h-[38px] rounded-lg border border-[#C9B99D] text-xs font-medium text-[#151B19] whitespace-nowrap shrink-0 hover:bg-[#F5F0E7] active:scale-95 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D68A45]"
              >
                {showStories ? 'Hide Camp Stories' : 'Show Camp Stories'}
              </button>
            </div>

            {showStories && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
                  {destination.storyMoments.map((moment) => (
                    <article
                      key={moment.id}
                      className="rounded-xl border border-[#C9B99D]/45 bg-[#F5F0E7]/45 overflow-hidden flex flex-col shadow-xs"
                    >
                      <div className="aspect-[4/3] bg-[#151B19]">
                        <ResilientImage
                          src={moment.imageUrl}
                          alt={moment.imageAlt}
                          fallbackTitle={moment.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-1.5 sm:gap-2">
                        <div className="flex items-center gap-2 text-[11px] text-[#183C32] font-semibold">
                          <span className="font-mono tabular-nums">{moment.indexLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{moment.momentType}</span>
                        </div>
                        <h3 className="font-editorial text-base sm:text-lg text-[#151B19] leading-snug">
                          {moment.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#151B19]/75 leading-relaxed">
                          {moment.caption}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Cross-Destination Switch Strip */}
      <section className="border-t border-[#C9B99D]/45 bg-[#F5F0E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#183C32]">Explore Another Journey</p>
            <p className="font-editorial text-lg sm:text-xl text-[#151B19] mt-0.5">
              {alternateDestination.name} · {alternateDestination.categoryLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSwitchDestination(alternateDestination.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[42px] rounded-lg border border-[#183C32] text-sm font-medium text-[#183C32] whitespace-nowrap shrink-0 hover:bg-[#183C32] hover:text-[#F5F0E7] active:scale-95 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D68A45]"
          >
            <span>View {alternateDestination.shortName}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </section>
    </main>
  );
}
