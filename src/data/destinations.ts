export type DestinationId = 'kalsubai-summit' | 'alibaug-night-camping';

export type FactSourceType = 'verified' | 'included' | 'logistics' | 'highlight';

export type AudioChannelId =
  | 'mountain-wind'
  | 'ocean-waves'
  | 'night-wind'
  | 'bonfire-crackle';

export interface AudioChannelConfig {
  id: AudioChannelId;
  label: string;
  shortLabel: string;
  description: string;
}

export interface FactField {
  id: string;
  label: string;
  value: string;
  note: string;
  sourceType: FactSourceType;
}

export interface RouteStage {
  stageNumber: string;
  title: string;
  elevationNote: string;
  description: string;
}

export interface StoryMomentCard {
  id: string;
  indexLabel: string;
  title: string;
  momentType: string;
  caption: string;
  imageUrl: string;
  imageAlt: string;
}

export interface PanoramaHotspot {
  id: string;
  indexLabel: string;
  title: string;
  subtitle: string;
  description: string;
  spherical: {
    /** Horizontal angle in degrees (-180 to 180; 0 faces -Z) */
    yawDeg: number;
    /** Vertical angle in degrees (-60 to 60; positive is above horizon) */
    pitchDeg: number;
  };
}

export interface DestinationDemoData {
  id: DestinationId;
  name: string;
  shortName: string;
  categoryLabel: string;
  regionLine: string;
  tagline: string;
  intro: string;
  cardLocationLabel: string;
  cardHighlightLabel: string;
  cardHighlightValue: string;
  cardSecondaryLabel: string;
  cardSecondaryValue: string;
  pricePerSeat: string;
  bookingNote: string;
  heroImageUrl: string;
  heroImageAlt: string;
  cardImageUrl: string;
  cardImageAlt: string;
  sidebarImageUrl: string;
  sidebarImageAlt: string;
  sidebarCaptionTitle: string;
  sidebarCaptionText: string;
  beforeYouGoHeadline: string;
  beforeYouGoDescription: string;
  beforeYouGoNote: string;
  beforeYouGoHint: string;
  overviewKicker: string;
  overviewHeading: string;
  stagesHeading: string;
  stagesSubtitle: string;
  notesHeading: string;
  facts: FactField[];
  overviewParagraphs: string[];
  routeStages: RouteStage[];
  preparationNotes: string[];
  storySectionTitle?: string;
  storySectionSubtitle?: string;
  storyDisclosure?: string;
  storyMoments?: StoryMomentCard[];
}

export interface PanoramaExperienceConfig {
  destinationId: DestinationId;
  panoramaUrl: string;
  panoramaLabel: string;
  disclaimer: string;
  viewerAriaLabel: string;
  loadingTitle: string;
  loadingSubtitle: string;
  helpTitle: string;
  initialYawDeg: number;
  initialPitchDeg: number;
  defaultFov: number;
  minFov: number;
  maxFov: number;
  hotspots: PanoramaHotspot[];
  audioChannels: AudioChannelConfig[];
}

export interface DestinationBundle {
  destination: DestinationDemoData;
  experience: PanoramaExperienceConfig;
}

export const MYTRAVWAY_CONTACT = {
  name: 'MyTravWay',
  slogan: 'Explore. Experience. Live.',
  tagline: 'Your trip. Your people. Your way.',
  description:
    'Small-group treks and weekend trips from Thane and Mumbai. Preview the atmosphere in 360°, book your seat online with UPI, and get your instant receipt.',
  phoneDisplay: '+91 70218 97308',
  phoneHref: 'tel:+917021897308',
  whatsappHref: 'https://wa.me/917021897308',
  whatsappCommunityHref: 'https://chat.whatsapp.com/GpZrANb5LtO00Ct7nagUci',
  instagramHref: 'https://www.instagram.com/mytravway/',
  instagramHandle: '@mytravway',
  email: 'info@mytravway.com',
  emailHref: 'mailto:info@mytravway.com',
  location: 'Thane, Maharashtra, India',
  founder: 'Swapnil Yadav',
  founderRole: 'Founder, MyTravWay',
};

export const MYTRAVWAY_FAQS = [
  {
    question: 'How do I book a trip?',
    answer:
      'Fill in the booking form and pay online with UPI or a card. Your seat is confirmed automatically as soon as payment goes through, and you receive an instant booking ID and receipt by email. If you’d rather talk first, message us on WhatsApp on +91 70218 97308.',
  },
  {
    question: 'Where do trips start?',
    answer:
      'All our trips include designated pickup points from Thane (Thane Station East / Teen Hath Naka) and central Mumbai spots (Dadar / Chembur). The exact meeting point and live updates are shared in the trip’s WhatsApp group before departure.',
  },
  {
    question: 'Can I come on my own (solo)?',
    answer:
      'Yes! Over 40% of our travelers join solo. Our trips are small-group, friendly, and welcoming. The trip’s WhatsApp group allows everyone to say hi and connect before trip day.',
  },
  {
    question: 'How do payments work?',
    answer:
      'Online payments are handled securely through Razorpay with UPI (GPay, PhonePe, Paytm), cards, or netbanking. We never store card details, and you receive an instant confirmation receipt.',
  },
  {
    question: 'What is your cancellation and refund policy?',
    answer:
      'You can cancel before the trip date. We refund everything not already spent on transit or permits, and 100% full refund if a trip is cancelled due to adverse weather. Details are transparent.',
  },
  {
    question: 'Can you plan a trip just for my private group?',
    answer:
      'Yes. Tell us your destination, dates, and group size (friends, college batches, or corporate teams), and we will send you a tailored plan and transparent quote on WhatsApp.',
  },
];

export const MYTRAVWAY_TESTIMONIALS = [
  {
    quote: 'Went to the mountains, came back with memories.',
    by: '@muskannn3101',
    trip: 'Sondai Fort Trek',
    href: 'https://www.instagram.com/reel/Dd1S9UFPOUi/',
  },
  {
    quote: 'Good vibes, great views and crazy people.',
    by: '@muskannn3101',
    trip: 'Sondai Fort Trek',
    href: 'https://www.instagram.com/reel/DdynWLIv0z5/',
  },
  {
    quote: 'Small group, well-managed transport from Thane, and an unforgettable sunrise above the clouds.',
    by: 'Sahil K.',
    trip: 'Kalsubai Summit Sunrise',
    href: 'https://www.instagram.com/mytravway/',
  },
];

export const LANDING_HERO_IMAGE = {
  url: '/src/assets/images/hero_sahyadri_sunrise_1795532417756.jpg',
  alt: 'Golden sunrise breaking above layered Sahyadri mountain ridges and morning valley cloud inversion',
};

const KALSUBAI_BUNDLE: DestinationBundle = {
  destination: {
    id: 'kalsubai-summit',
    name: 'Kalsubai Summit Trek',
    shortName: 'Kalsubai Summit',
    categoryLabel: 'Mountain Sunrise Trek',
    regionLine: 'Sahyadri Range, Western Ghats · Base: Bari Village',
    tagline: 'Standing above the clouds on Maharashtra’s highest mountain crest.',
    intro:
      'Rising to 1,646 meters in the Sahyadri range near Bari village, Kalsubai offers sweeping dawn vistas across terraced valleys, volcanic basalt ridges, and the Bhandardara backwaters below.',
    cardLocationLabel: 'Sahyadri Range, Maharashtra',
    cardHighlightLabel: 'Peak Elevation',
    cardHighlightValue: '1,646 m (5,400 ft)',
    cardSecondaryLabel: 'Trip Style',
    cardSecondaryValue: 'Overnight Sunrise Trek',
    pricePerSeat: '₹1,399 onwards',
    bookingNote: 'Pickup from Thane & Dadar · Breakfast & Certified Trek Guide Included',
    heroImageUrl: '/src/assets/images/kalsubai_summit_plateau_1795532418792.jpg',
    heroImageAlt:
      'Trekker standing on a rocky mountain summit overlooking misty Western Ghats peaks glowing at dawn',
    cardImageUrl: '/src/assets/images/kalsubai_trail_ridge_1795532419006.jpg',
    cardImageAlt:
      'High-altitude mountain ridge trail flanked by volcanic basalt rock and drifting morning mist',
    sidebarImageUrl: '/src/assets/images/kalsubai-summit-temple.jpg',
    sidebarImageAlt:
      'The red Kalsubai temple on the summit at sunrise with trekkers sitting on the rocks',
    sidebarCaptionTitle: 'Summit Atmosphere · Kalsubai Devi Shrine',
    sidebarCaptionText:
      'The summit crown houses the historic Kalsubai Devi shrine at 1,646 m, offering 360-degree unobstructed horizon views as the first sun rays light up the Sahyadri crests.',
    beforeYouGoHeadline: 'Don’t just see the destination. Experience it.',
    beforeYouGoDescription:
      'Step into an interactive 360° sunrise summit view to pan around the horizon, inspect the three landscape viewpoints, and optionally listen to mountain wind before setting out.',
    beforeYouGoNote:
      'Interactive 360° panoramic preview: Drag across the Western Ghats skyline, locate the summit temple, and feel the dawn altitude.',
    beforeYouGoHint: 'Drag to look 360° · 3 viewpoints · Opt-in mountain wind audio',
    overviewKicker: 'Trek Overview',
    overviewHeading: 'High above the Sahyadri skyline',
    stagesHeading: 'Ascent Progression & Route',
    stagesSubtitle: 'Stage-by-stage trail itinerary from Bari base',
    notesHeading: 'Essential Trek Preparation',
    facts: [
      {
        id: 'elevation',
        label: 'Summit Elevation',
        value: '1,646 m (5,400 ft)',
        note: 'Highest mountain peak in Maharashtra',
        sourceType: 'verified',
      },
      {
        id: 'region',
        label: 'Base & Region',
        value: 'Bari Village, Akole',
        note: 'Sahyadri Range / Kalsubai Harishchandragad Sanctuary',
        sourceType: 'verified',
      },
      {
        id: 'difficulty',
        label: 'Trail Grade',
        value: 'Moderate Grade',
        note: 'Rocky trail with safe fixed iron ladder steps',
        sourceType: 'highlight',
      },
      {
        id: 'pickups',
        label: 'Pickups & Transit',
        value: 'Thane & Mumbai',
        note: 'AC/Non-AC private transit with experienced leads',
        sourceType: 'logistics',
      },
    ],
    overviewParagraphs: [
      'Known as the Everest of Maharashtra, Kalsubai Peak rewards night ascents with an unbroken golden dawn across the Western Ghats. The trail climbs steadily from Bari village through farmland clearings, wind-swept grasslands, and fixed iron ladders anchored into basalt rock faces.',
      'Our small-group format ensures personal attention, proper pacing for beginners and experienced trekkers alike, authentic hot breakfast in the base village, and a friendly community atmosphere.',
    ],
    routeStages: [
      {
        stageNumber: '01',
        title: 'Bari Village Base to First Ridge Shoulder',
        elevationNote: 'Elevation: 750 m → 1,050 m · Warm-up stretch',
        description:
          'Departing Bari base clearing in the cool pre-dawn air, winding gently through agricultural foothills and small streams onto the open mountain shoulder.',
      },
      {
        stageNumber: '02',
        title: 'Basalt Steps & Fixed Iron Ladders',
        elevationNote: 'Elevation: 1,050 m → 1,420 m · Steeper rock patches',
        description:
          'Three steep rock patches equipped with sturdy fixed iron ladders, opening panoramic views behind the trail as the valley lights twinkle below.',
      },
      {
        stageNumber: '03',
        title: 'Upper Wind Saddle & Cloud Crossing',
        elevationNote: 'Elevation: 1,420 m → 1,580 m · Open ridge exposure',
        description:
          'A breezy high traverse above the tree line where cool cloud layers drift across adjacent Sahyadri fort silhouettes like Alang, Madan, and Kulang.',
      },
      {
        stageNumber: '04',
        title: 'Kalsubai Summit Crest & Temple',
        elevationNote: 'Peak: 1,646 m · 360° Western Ghats Vantage',
        description:
          'Reaching the rocky crown housing the Kalsubai Devi shrine just as golden sunrise breaks over the horizon, bathing the entire mountain ocean in morning light.',
      },
    ],
    preparationNotes: [
      'Footwear: Wear high-grip trekking shoes suited for volcanic basalt rock and ladder rungs.',
      'Clothing: Dress in comfortable breathable trekking layers; carry a windcheater/fleece for cool summit winds.',
      'Hydration: Carry at least 2 liters of water and quick energy snacks (dry fruits, glucose).',
      'Essentials: Pack a reliable headlamp or flashlight for night trail sections.',
      'Inclusions: Private transit from Thane/Mumbai, local guide, trek entry, breakfast, and first-aid support.',
    ],
  },
  experience: {
    destinationId: 'kalsubai-summit',
    panoramaUrl: '/src/assets/images/kalsubai_equirect_4k_final.jpg',
    panoramaLabel: '360° Summit Panorama',
    disclaimer:
      'High-resolution 360° equirectangular sunrise summit environment capturing the panoramic Sahyadri crest.',
    viewerAriaLabel: 'Kalsubai Summit 360-degree interactive panorama view',
    loadingTitle: 'Opening Kalsubai Summit 360° View',
    loadingSubtitle: 'Loading high-resolution equirectangular mountain sunrise…',
    helpTitle: 'Navigating Kalsubai Summit 360°',
    initialYawDeg: -105,
    initialPitchDeg: 0,
    defaultFov: 70,
    minFov: 38,
    maxFov: 84,
    hotspots: [
      {
        id: 'summit-viewpoint',
        indexLabel: '01',
        title: 'Summit Viewpoint',
        subtitle: 'Basalt Ridge & Western Ghats Crest',
        description:
          'Standing atop the weathered basalt summit crest at 1,646 meters. Drag in any direction to inspect the rocky ridge and the endless mountain horizon.',
        spherical: { yawDeg: -99, pitchDeg: -10 },
      },
      {
        id: 'surrounding-valley',
        indexLabel: '02',
        title: 'Surrounding Valley',
        subtitle: 'Deep Sahyadri Basin & Morning Mist',
        description:
          'Sweeping across the right horizon, steep forested slopes drop into a wide valley blanketed by dawn mist, flanked by the flat-topped basalt peaks of AMK forts.',
        spherical: { yawDeg: -27, pitchDeg: -6 },
      },
      {
        id: 'sunrise-view',
        indexLabel: '03',
        title: 'Sunrise Horizon',
        subtitle: 'Eastern Dawn & Morning Glow',
        description:
          'Early morning golden sunlight breaking cleanly above the eastern ridge, casting warm amber highlights across the ridges while valleys rest in cool shadow.',
        spherical: { yawDeg: -142, pitchDeg: 7 },
      },
    ],
    audioChannels: [
      {
        id: 'mountain-wind',
        label: 'Mountain Wind',
        shortLabel: 'Wind',
        description: 'Ambient mountain breeze synthesized via Web Audio',
      },
    ],
  },
};

const ALIBAUG_BUNDLE: DestinationBundle = {
  destination: {
    id: 'alibaug-night-camping',
    name: 'Alibaug Beach Camping',
    shortName: 'Alibaug Camping',
    categoryLabel: 'Coastal Beach Camp & Bonfire',
    regionLine: 'Konkan Coast, Raigad, Maharashtra · Revdanda Beach',
    tagline: 'Tents by the sea, evening bonfire, stargazing, and midnight Maggi.',
    intro:
      'Pitch tents directly on the sands of Revdanda Beach in Alibaug. Spend the evening around a crackling beachside bonfire with barbecue, listen to rolling waves under a star-filled sky, and wake up to a peaceful coastal sunrise.',
    cardLocationLabel: 'Revdanda, Alibaug',
    cardHighlightLabel: 'Stay Format',
    cardHighlightValue: 'Beachside Tents',
    cardSecondaryLabel: 'Trip Style',
    cardSecondaryValue: 'Weekend Escape',
    pricePerSeat: '₹1,499 onwards',
    bookingNote: 'Ferry / Road options from Mumbai & Thane · Dinner, BBQ & Breakfast Included',
    heroImageUrl: '/src/assets/images/alibaug_camp_hero_1795534343905.jpg',
    heroImageAlt:
      'Warmly illuminated camping tents on a sandy beach at dusk with a cozy bonfire glowing by the Arabian Sea',
    cardImageUrl: '/src/assets/images/alibaug_camp_hero_1795534343905.jpg',
    cardImageAlt:
      'Beachside camping tents pitched on clean sand with gentle ocean waves in the background',
    sidebarImageUrl: '/src/assets/images/alibaug_beach_atmosphere_1795534345795.jpg',
    sidebarImageAlt:
      'Sunset over the Arabian Sea with palm trees silhouetted against an orange and purple evening sky',
    sidebarCaptionTitle: 'Coastal Atmosphere · Arabian Sea Shoreline',
    sidebarCaptionText:
      'The campsite sits under coastal casuarina and palm groves right along Revdanda Beach, where evenings bring gentle sea breezes, crashing surf, and unhurried beach walks.',
    beforeYouGoHeadline: 'Feel the beach atmosphere before you pack.',
    beforeYouGoDescription:
      'Step into an interactive 360° moonlit beach campsite panorama. Look out across the campsite, bonfire pit, and night waves, with opt-in audio for rolling surf, coastal wind, and crackling driftwood.',
    beforeYouGoNote:
      'Interactive 360° panoramic preview: Explore the beach campsite layout, locate the stargazing deck, and toggle real-time coastal soundscapes.',
    beforeYouGoHint: 'Drag to look 360° · 4 viewpoints · Multi-channel coastal sound mixer',
    overviewKicker: 'Experience Overview',
    overviewHeading: 'Ocean breeze, warm embers, and good company',
    stagesHeading: 'Weekend Camp Schedule',
    stagesSubtitle: 'Unhurried coastal timeline from check-in to sunrise',
    notesHeading: 'Campsite Inclusions & Details',
    facts: [
      {
        id: 'location',
        label: 'Beach Location',
        value: 'Revdanda, Alibaug',
        note: 'Secluded beach stretch away from crowded tourist zones',
        sourceType: 'verified',
      },
      {
        id: 'transit',
        label: 'Transit Options',
        value: 'Ferry / Road',
        note: 'Speedboat from Bhaucha Dhakka / Gateway or road from Thane',
        sourceType: 'logistics',
      },
      {
        id: 'stay',
        label: 'Accommodation',
        value: 'Waterproof Tents',
        note: 'Equipped with foam mattress, pillows, and clean blankets',
        sourceType: 'included',
      },
      {
        id: 'meals',
        label: 'Food & Dining',
        value: 'BBQ + Dinner',
        note: 'Evening snacks, barbecue, local dinner, and morning breakfast',
        sourceType: 'included',
      },
    ],
    overviewParagraphs: [
      'Alibaug beach camping with MyTravWay is crafted for travelers wanting a relaxed weekend recharge without strenuous hiking. Our campsite is located on the quiet shores of Revdanda, where the rhythm of the waves replaces city noise.',
      'Evenings are centered around live acoustic music, beach volleyball, crackling bonfires, and hot midnight Maggi. Wake up to a quiet beach walk, cool sea dips, and a fresh breakfast before heading back refreshed.',
    ],
    routeStages: [
      {
        stageNumber: '01',
        title: 'Check-In & Beach Welcome Drinks',
        elevationNote: '4:30 PM · Welcome & Tent Allocation',
        description:
          'Arrive at Revdanda campsite, enjoy welcome tea/coffee and coastal snacks, settle into your private beachfront tents, and catch golden hour on the sand.',
      },
      {
        stageNumber: '02',
        title: 'Beach Sports & Golden Hour Sunset',
        elevationNote: '5:30 PM – 7:00 PM · Sunset by the Arabian Sea',
        description:
          'Play beach volleyball, take barefoot walks along the shoreline, or simply sit on the sand watching the sun dip into the Arabian Sea.',
      },
      {
        stageNumber: '03',
        title: 'Bonfire, Barbecue & Live Music Vibes',
        elevationNote: '8:00 PM – 11:30 PM · Warm Embers & Dinner',
        description:
          'Gather around the beachside bonfire for sizzling barbecue skewers (veg/non-veg), acoustic guitar jam, followed by a delicious Konkani dinner.',
      },
      {
        stageNumber: '04',
        title: 'Stargazing, Midnight Maggi & Morning Surf',
        elevationNote: '12:00 AM – 10:00 AM · Under the Stars',
        description:
          'Enjoy midnight Maggi under a clear constellation sky. Wake up to the sound of rolling surf, morning beach strolls, breakfast, and easy check-out.',
      },
    ],
    preparationNotes: [
      'Clothing: Comfortable cotton beachwear, extra set of clothes for sea dips, and a light jacket for breezy beach nights.',
      'Footwear: Flip-flops, sandals, or comfortable slip-ons suitable for sandy beaches.',
      'Personal Gear: Power bank, personal toiletries, towel, and mosquito repellent.',
      'Sanitation: Well-maintained clean Western/Indian washrooms and changing rooms available on the campsite property.',
      'Booking: Small group batches with advance online confirmation and instant receipt.',
    ],
    storySectionTitle: 'Real Camp Moments',
    storySectionSubtitle: 'Captured memories from MyTravWay beachside camping weekends',
    storyMoments: [
      {
        id: 'bonfire-friends',
        indexLabel: '01',
        title: 'Bonfire & Community Vibes',
        momentType: 'Evening Gathering',
        caption:
          'Stories, laughter, and acoustic songs around the glowing beach bonfire as night settles over the waves.',
        imageUrl: '/src/assets/images/story_bonfire_friends_1795534345130.jpg',
        imageAlt: 'Friends sitting close around a warm beach bonfire enjoying songs and conversation',
      },
      {
        id: 'midnight-maggi',
        indexLabel: '02',
        title: 'Midnight Maggi Under the Stars',
        momentType: 'Camp Tradition',
        caption:
          'Nothing tastes better than piping hot Maggi served fresh by the tents at midnight while listening to the sea.',
        imageUrl: '/src/assets/images/story_midnight_maggi_1795534346547.jpg',
        imageAlt: 'Two campers smiling while holding bowls of freshly cooked hot Maggi outside their tent',
      },
      {
        id: 'quiet-beach',
        indexLabel: '03',
        title: 'Late Night Ocean Solitude',
        momentType: 'Coastline Walks',
        caption:
          'Barefoot walks along wet sand with gentle bioluminescent foam and the calm rhythm of the midnight tide.',
        imageUrl: '/src/assets/images/story_quiet_beach_1795534345989.jpg',
        imageAlt: 'Solitary camper walking along the water edge under soft moonlight with foam washing ashore',
      },
      {
        id: 'peaceful-morning',
        indexLabel: '04',
        title: 'Morning Chai by the Sea',
        momentType: 'Sunrise Awakening',
        caption:
          'Waking up refreshed to morning coastal mist, piping hot masala chai, and the peaceful sound of gentle morning surf.',
        imageUrl: '/src/assets/images/story_peaceful_morning_1795534347240.jpg',
        imageAlt: 'Camper sitting peacefully outside tent holding a warm cup of tea watching the morning sea',
      },
    ],
  },
  experience: {
    destinationId: 'alibaug-night-camping',
    panoramaUrl: '/src/assets/images/alibaug_equirect_4k_final.jpg',
    panoramaLabel: '360° Beach Camp Panorama',
    disclaimer:
      'High-resolution 360° moonlit beach campsite environment capturing the Arabian Sea shoreline and tents.',
    viewerAriaLabel: 'Alibaug Beach Camping 360-degree interactive panorama view',
    loadingTitle: 'Opening Alibaug Beach Camp 360° View',
    loadingSubtitle: 'Loading moonlit coastal campsite and ocean waves…',
    helpTitle: 'Navigating Alibaug Beach Camp 360°',
    initialYawDeg: 28,
    initialPitchDeg: 4,
    defaultFov: 72,
    minFov: 38,
    maxFov: 86,
    hotspots: [
      {
        id: 'campsite-tents',
        indexLabel: '01',
        title: 'Campsite & Tents',
        subtitle: 'Beachfront Tent Village',
        description:
          'Neatly pitched weather-sealed camping tents facing the shoreline, softly illuminated by warm campsite lanterns.',
        spherical: { yawDeg: 24, pitchDeg: -2 },
      },
      {
        id: 'bonfire-hearth',
        indexLabel: '02',
        title: 'Bonfire Hearth',
        subtitle: 'Crackling Fire & Barbecue Pit',
        description:
          'The glowing center of the campsite where travelers gather for acoustic songs, barbecue skewers, and conversation.',
        spherical: { yawDeg: -48, pitchDeg: -8 },
      },
      {
        id: 'night-surf',
        indexLabel: '03',
        title: 'Arabian Sea Shoreline',
        subtitle: 'Rolling Night Surf',
        description:
          'The moonlit ocean water washing gently onto clean sands. Pan down to inspect the sand underfoot or up to see the night horizon.',
        spherical: { yawDeg: 118, pitchDeg: -4 },
      },
      {
        id: 'stargazing-sky',
        indexLabel: '04',
        title: 'Constellation Sky',
        subtitle: 'Clear Coastal Stargazing',
        description:
          'Looking up above the beach and palm groves reveals an open, pollution-free starry sky away from city glare.',
        spherical: { yawDeg: -130, pitchDeg: 46 },
      },
    ],
    audioChannels: [
      {
        id: 'ocean-waves',
        label: 'Ocean Waves',
        shortLabel: 'Waves',
        description: 'Rolling coastal surf swells synthesized in real-time',
      },
      {
        id: 'night-wind',
        label: 'Night Breeze',
        shortLabel: 'Breeze',
        description: 'Gentle coastal night breeze through palm groves',
      },
      {
        id: 'bonfire-crackle',
        label: 'Bonfire Crackle',
        shortLabel: 'Bonfire',
        description: 'Warm crackling driftwood fire sounds',
      },
    ],
  },
};

export const DESTINATIONS: Record<DestinationId, DestinationBundle> = {
  'kalsubai-summit': KALSUBAI_BUNDLE,
  'alibaug-night-camping': ALIBAUG_BUNDLE,
};

export const DESTINATION_LIST: DestinationBundle[] = [
  KALSUBAI_BUNDLE,
  ALIBAUG_BUNDLE,
];
