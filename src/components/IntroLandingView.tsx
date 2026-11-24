import { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Compass,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  DESTINATION_LIST,
  LANDING_HERO_IMAGE,
  MYTRAVWAY_CONTACT,
  MYTRAVWAY_FAQS,
  MYTRAVWAY_TESTIMONIALS,
  type DestinationId,
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <main className="w-full overflow-x-hidden">
      {/* Editorial Hero */}
      <section className="relative bg-[#151B19] text-[#F5F0E7] overflow-hidden">
        <div className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-end">
          <ResilientImage
            src={LANDING_HERO_IMAGE.url}
            alt={LANDING_HERO_IMAGE.alt}
            fallbackTitle="Sahyadri Mountain Sunrise"
            priority
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#151B19] via-[#151B19]/65 to-[#151B19]/30"
          />

          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-20 sm:pt-24 pb-12 sm:pb-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#183C32]/80 border border-[#C9B99D]/30 text-xs font-medium text-[#C9B99D] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span>Small-group treks & weekend escapes from Thane & Mumbai</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] sm:leading-[1.08] text-[#FFFFFF] mb-4 sm:mb-6">
                Your trip. Your people.{' '}
                <span className="italic text-[#D68A45]">Your way.</span>
              </h1>

              <p className="text-sm sm:text-lg text-[#F5F0E7]/90 leading-relaxed max-w-2xl mb-7 sm:mb-9">
                Small-group treks and weekend getaways across Maharashtra. Step inside interactive 360° vistas before setting out, book your seat online with instant UPI, and travel with a friendly community.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('upcoming-trips')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] rounded-lg bg-[#D68A45] text-[#151B19] text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#e19652] active:scale-[0.98] transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F0E7]"
                >
                  <span>Explore Upcoming Trips</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <a
                  href={MYTRAVWAY_CONTACT.whatsappCommunityHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-lg border border-[#C9B99D]/70 bg-[#151B19]/70 text-[#F5F0E7] text-sm font-medium hover:bg-[#183C32] active:scale-[0.98] transition-all duration-150"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Join WhatsApp Community</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <section className="bg-[#183C32] text-[#F5F0E7] py-3.5 border-y border-[#C9B99D]/30 overflow-x-auto scrollbar-none select-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6 whitespace-nowrap text-xs font-medium tracking-wide">
          <span>🏔️ Sahyadri Treks</span>
          <span className="text-[#C9B99D]/50">·</span>
          <span>⛺ Beach Camps</span>
          <span className="text-[#C9B99D]/50">·</span>
          <span>🚆 Thane & Mumbai Pickups</span>
          <span className="text-[#C9B99D]/50">·</span>
          <span>👥 Small Groups</span>
          <span className="text-[#C9B99D]/50">·</span>
          <span>💳 Instant UPI Booking</span>
          <span className="text-[#C9B99D]/50">·</span>
          <span>🌄 360° Previews</span>
          <span className="text-[#C9B99D]/50">·</span>
          <span>🌿 Solo Friendly</span>
        </div>
      </section>

      {/* Featured Trips Section */}
      <section
        id="upcoming-trips"
        className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 lg:py-24 scroll-mt-16"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12 pb-5 sm:pb-6 border-b border-[#C9B99D]/50">
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-[#183C32] mb-1.5 sm:mb-2">
              Featured Adventures
            </p>
            <h2 className="font-editorial text-2xl sm:text-4xl font-normal tracking-tight text-[#151B19]">
              Upcoming Weekend Journeys
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#151B19]/75 max-w-md">
            Compare our upcoming mountain ascents and coastal getaways. Preview the complete 360° horizon before booking your seat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {DESTINATION_LIST.map(({ destination, experience }) => (
            <article
              key={destination.id}
              className="bg-[#FFFFFF] rounded-2xl border border-[#C9B99D]/45 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="relative aspect-[16/10] bg-[#151B19]">
                  <ResilientImage
                    src={destination.cardImageUrl}
                    alt={destination.cardImageAlt}
                    fallbackTitle={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#151B19]/85 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#D68A45] border border-[#C9B99D]/30">
                    {destination.pricePerSeat}
                  </div>
                </div>

                <div className="p-5 sm:p-8 lg:p-9">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-medium mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#183C32]/10 text-[#183C32]">
                      <MapPin className="w-3.5 h-3.5 text-[#D68A45] shrink-0" />
                      <span>{destination.cardLocationLabel}</span>
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#183C32]/10 text-[#183C32]">
                      {destination.categoryLabel}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#D68A45]/15 text-[#8A4A10]">
                      {experience.hotspots.length} 360° Viewpoints
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#151B19] tracking-tight mb-2.5 sm:mb-3">
                    {destination.name}
                  </h3>

                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#151B19]/80 mb-5 sm:mb-6">
                    {destination.intro}
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#F5F0E7]/60 border border-[#C9B99D]/30 mb-6">
                    <p className="text-xs text-[#183C32] font-medium flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#183C32] shrink-0" />
                      <span>{destination.bookingNote}</span>
                    </p>
                  </div>

                  <dl className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-[#C9B99D]/40 text-xs sm:text-sm">
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
                  <span>View Details & Itinerary</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => onDirectLaunch360(destination.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg border border-[#C9B99D] text-[#151B19] text-sm font-medium hover:bg-[#F5F0E7] active:scale-[0.98] transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68A45]"
                >
                  <Compass className="w-4 h-4 text-[#D68A45] shrink-0" />
                  <span>360° Preview</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Community Bento: Slide into our DMs */}
      <section className="bg-[#151B19] text-[#F5F0E7] py-16 sm:py-20 border-t border-[#C9B99D]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#D68A45] mb-2">
              Community & Bookings
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#FFFFFF] mb-3">
              Slide into <span className="italic text-[#D68A45]">our DMs.</span>
            </h2>
            <p className="text-sm text-[#C9B99D]">
              We’re based in Thane, Maharashtra. Pick whichever channel is easiest for you to connect, ask questions, or join upcoming weekend batches.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* WhatsApp Community Card */}
            <a
              href={MYTRAVWAY_CONTACT.whatsappCommunityHref}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#183C32] border border-[#C9B99D]/30 flex flex-col justify-between gap-6 hover:border-[#D68A45] transition-all group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-xl text-[#FFFFFF]">WhatsApp Community</h3>
                <p className="text-xs text-[#C9B99D] leading-relaxed">
                  Trip drops, dates, and member photos. The fastest way to hear about new trek batches.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D68A45] group-hover:underline">
                Join Community →
              </span>
            </a>

            {/* Instagram Card */}
            <a
              href={MYTRAVWAY_CONTACT.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#183C32]/50 border border-[#C9B99D]/20 flex flex-col justify-between gap-6 hover:border-[#D68A45] transition-all group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#E1306C]/20 flex items-center justify-center text-[#E1306C]">
                  <Instagram className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-xl text-[#FFFFFF]">{MYTRAVWAY_CONTACT.instagramHandle}</h3>
                <p className="text-xs text-[#C9B99D] leading-relaxed">
                  Reels, trek stories, and photo updates from every summit and beach camp.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D68A45] group-hover:underline">
                Follow on Instagram →
              </span>
            </a>

            {/* Phone / Direct WhatsApp */}
            <a
              href={MYTRAVWAY_CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#183C32]/50 border border-[#C9B99D]/20 flex flex-col justify-between gap-6 hover:border-[#D68A45] transition-all group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#D68A45]/20 flex items-center justify-center text-[#D68A45]">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-xl text-[#FFFFFF]">{MYTRAVWAY_CONTACT.phoneDisplay}</h3>
                <p className="text-xs text-[#C9B99D] leading-relaxed">
                  Call or WhatsApp our team directly with questions about gear, difficulty, or seats.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D68A45] group-hover:underline">
                Chat on WhatsApp →
              </span>
            </a>

            {/* Email Card */}
            <a
              href={MYTRAVWAY_CONTACT.emailHref}
              className="p-6 rounded-2xl bg-[#183C32]/50 border border-[#C9B99D]/20 flex flex-col justify-between gap-6 hover:border-[#D68A45] transition-all group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#C9B99D]/20 flex items-center justify-center text-[#C9B99D]">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-xl text-[#FFFFFF]">{MYTRAVWAY_CONTACT.email}</h3>
                <p className="text-xs text-[#C9B99D] leading-relaxed">
                  Private group bookings, customized corporate offsites, and college batch queries.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D68A45] group-hover:underline">
                Send an Email →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Traveler Testimonials */}
      <section className="bg-[#FFFFFF] border-t border-[#C9B99D]/45 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-10 pb-5 border-b border-[#C9B99D]/40">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#183C32] mb-1">
                Community Reviews
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#151B19]">
                Stories from Fellow Trekkers
              </h2>
            </div>
            <a
              href={MYTRAVWAY_CONTACT.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#183C32] hover:underline"
            >
              See all reels on Instagram →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MYTRAVWAY_TESTIMONIALS.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-[#F5F0E7]/60 border border-[#C9B99D]/40 flex flex-col justify-between gap-4 hover:border-[#183C32] transition-colors"
              >
                <p className="font-editorial text-lg text-[#151B19] italic leading-snug">
                  “{item.quote}”
                </p>
                <div className="pt-3 border-t border-[#C9B99D]/30 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#183C32]">{item.by}</span>
                  <span className="text-[#151B19]/60">{item.trip}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Official FAQs Accordion */}
      <section className="bg-[#F5F0E7] border-t border-[#C9B99D]/50 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#183C32] mb-1.5">
              Got Questions?
            </p>
            <h2 className="font-editorial text-2xl sm:text-4xl text-[#151B19]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#151B19]/70 mt-2 max-w-lg mx-auto">
              Everything you need to know about joining a MyTravWay trek, payments, cancellations, and pickups from Thane & Mumbai.
            </p>
          </div>

          <div className="space-y-3">
            {MYTRAVWAY_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#C9B99D]/45 bg-[#FFFFFF] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-editorial text-base sm:text-lg text-[#151B19] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#183C32] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#151B19]/80 leading-relaxed border-t border-[#C9B99D]/20 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Host Program CTA */}
      <section className="bg-[#183C32] text-[#F5F0E7] py-12 sm:py-16 border-t border-[#C9B99D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#D68A45] font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Host Program</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#FFFFFF]">
              Love planning trips for your friends?
            </h2>
            <p className="text-xs sm:text-sm text-[#C9B99D] leading-relaxed">
              We’re opening a community host program. You plan the destination and lead the group; we handle all online registrations, payments, and logistics, and your own seat is covered once the batch fills.
            </p>
          </div>

          <a
            href={MYTRAVWAY_CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-lg bg-[#D68A45] text-[#151B19] text-sm font-semibold hover:bg-[#e19652] active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            <span>Apply to Host a Trip</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </section>
    </main>
  );
}
