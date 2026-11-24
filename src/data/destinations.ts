export type DestinationId = 'kalsubai-summit' | 'alibaug-night-camping';

export type FactSourceType = 'verified' | 'sample';

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

export interface SampleRouteStage {
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
  sampleRouteStages: SampleRouteStage[];
  samplePreparationNotes: string[];
  storySectionTitle?: string;
  storySectionSubtitle?: string;
  storyDisclosure?: string;
  storyMoments?: StoryMomentCard[];
}

export interface PanoramaExperienceConfig {
  destinationId: DestinationId;
  panoramaUrl: string;
  panoramaLabel: 'Illustrative 360° Sample';
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

export const LANDING_HERO_IMAGE = {
  url: '/src/assets/images/hero_sahyadri_sunrise_1795532417756.jpg',
  alt: 'Golden sunrise breaking above layered Sahyadri mountain ridges and morning valley cloud inversion',
};

const KALSUBAI_BUNDLE: DestinationBundle = {
  destination: {
    id: 'kalsubai-summit',
    name: 'Kalsubai Summit',
    shortName: 'Kalsubai Summit',
    categoryLabel: 'Mountain Sunrise Trek',
    regionLine: 'Maharashtra, India · Sahyadri Range (Western Ghats)',
    tagline: 'Standing above the clouds on Maharashtra’s highest mountain crest.',
    intro:
      'Rising to 1,646 meters in the Sahyadri range near Bari village, Kalsubai offers sweeping morning vistas across terraced valleys, volcanic basalt ridges, and the Bhandardara backwaters below.',
    cardLocationLabel: 'Sahyadri Range',
    cardHighlightLabel: 'Base Village',
    cardHighlightValue: 'Bari, Igatpuri–Akole',
    cardSecondaryLabel: 'Sample Grade',
    cardSecondaryValue: 'Moderate (Sample)',
    heroImageUrl: '/src/assets/images/kalsubai_summit_plateau_1795532418792.jpg',
    heroImageAlt:
      'Trekker standing on a rocky mountain summit overlooking misty Western Ghats peaks glowing at dawn',
    cardImageUrl: '/src/assets/images/kalsubai_trail_ridge_1795532419006.jpg',
    cardImageAlt:
      'High-altitude mountain ridge trail flanked by volcanic basalt rock and drifting morning mist',
    sidebarImageUrl: '/src/assets/images/kalsubai_trail_ridge_1795532419006.jpg',
    sidebarImageAlt:
      'High-altitude mountain ridge trail flanked by volcanic basalt rock and drifting morning mist',
    sidebarCaptionTitle: 'Atmosphere Preview · Editorial Photography',
    sidebarCaptionText:
      'Morning mist frequently pools inside the valleys below the ridge, creating clear cloud layers when viewed from above 1,400 meters.',
    beforeYouGoHeadline: 'Don’t just see the destination. Experience it.',
    beforeYouGoDescription:
      'Step into an interactive 360° sunrise summit environment to drag around the horizon, inspect three landscape viewpoints, and optionally listen to mountain wind—then return directly to your exact reading position below.',
    beforeYouGoNote:
      'Transparency note: This viewer renders an illustrative 2:1 equirectangular Sahyadri-inspired sunrise sample environment rather than field-captured Kalsubai survey footage.',
    beforeYouGoHint: 'Drag to look · 3 interactive viewpoints · Audio muted by default',
    overviewKicker: 'Destination Overview',
    overviewHeading: 'High above the Sahyadri skyline',
    stagesHeading: 'Sample Ascent Progression',
    stagesSubtitle: 'Illustrative prototype stages',
    notesHeading: 'Sample Preparation Notes',
    facts: [
      {
        id: 'elevation',
        label: 'Summit Elevation',
        value: '1,646 m (5,400 ft)',
        note: 'Verified · Highest peak in Maharashtra',
        sourceType: 'verified',
      },
      {
        id: 'region',
        label: 'Region & Base',
        value: 'Bari Village, Akole',
        note: 'Verified · Sahyadri / Western Ghats',
        sourceType: 'verified',
      },
      {
        id: 'difficulty',
        label: 'Trail Grade',
        value: 'Moderate',
        note: 'Sample · Steep sections with iron ladders',
        sourceType: 'sample',
      },
      {
        id: 'duration',
        label: 'Typical Ascent Window',
        value: '6–8 hrs round trip',
        note: 'Sample · Illustrative prototype pacing',
        sourceType: 'sample',
      },
    ],
    overviewParagraphs: [
      'Known locally as the Everest of Maharashtra, Kalsubai Peak rewards early-morning ascents with an unbroken horizon across the Western Ghats. The trail climbs steadily from Bari village through farmland clearings, wind-swept grasslands, and fixed iron ladders anchored into basalt rock faces.',
      'Because static photographs rarely convey the openness and vertical scale of a summit ridge, this MyTravWay prototype lets you step into an optional 360° sunrise summit preview before deciding whether the terrain and atmosphere match what you are looking for.',
    ],
    sampleRouteStages: [
      {
        stageNumber: '01',
        title: 'Bari Base Clearing to First Plateau',
        elevationNote: 'Sample stage · Gentle incline',
        description:
          'A gradual warm-up stretch winding out of agricultural foothills onto the lower ridge shoulder as pre-dawn air cools.',
      },
      {
        stageNumber: '02',
        title: 'Basalt Ridge & Iron Ladder Sections',
        elevationNote: 'Sample stage · Exposed rock steps',
        description:
          'Three steep rock patches assisted by fixed iron ladders where footing slows and valley views open behind the trail.',
      },
      {
        stageNumber: '03',
        title: 'Upper Wind Saddle',
        elevationNote: 'Sample stage · Open ridge exposure',
        description:
          'A breezy traverse above the tree line where low cloud banks drift across adjacent Sahyadri fort silhouettes.',
      },
      {
        stageNumber: '04',
        title: 'Kalsubai Summit Crest',
        elevationNote: 'Verified peak · 1,646 m',
        description:
          'The compact rocky crown housing the Kalsubai Devi shrine and a 360-degree vantage over surrounding ranges and valleys.',
      },
    ],
    samplePreparationNotes: [
      'Sample note: Wear high-grip trekking footwear suited for uneven volcanic basalt steps.',
      'Sample note: Carry a lightweight windproof layer—summit gusts drop temperatures sharply before sunrise.',
      'Sample note: Pack a headlamp and at least 2 liters of water for pre-dawn starts.',
      'Prototype disclosure: Sample route pacing and packing notes are illustrative only and do not represent a live MyTravWay itinerary or booking schedule.',
    ],
  },
  experience: {
    destinationId: 'kalsubai-summit',
    panoramaUrl: '/src/assets/images/kalsubai_equirect_4k_final.jpg',
    panoramaLabel: 'Illustrative 360° Sample',
    disclaimer:
      'High-resolution illustrative 360° equirectangular summit environment inspired by the Sahyadri range, demonstrating interactive panoramic previewing rather than field-captured survey footage.',
    viewerAriaLabel: 'Kalsubai Summit 360-degree immersive preview',
    loadingTitle: 'Loading 360° Summit Panorama',
    loadingSubtitle: 'Preparing high-resolution equirectangular mountain view…',
    helpTitle: 'Exploring the 360° Summit View',
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
        subtitle: 'Weathered Basalt Crest & Mountain Spur',
        description:
          'Standing directly atop fractured weathered basalt rock at the summit crest, a narrow ridge spur extends outward into the Western Ghats. Drag in any direction to inspect both the rocky ground underfoot and the full 360° skyline.',
        spherical: { yawDeg: -99, pitchDeg: -10 },
      },
      {
        id: 'surrounding-valley',
        indexLabel: '02',
        title: 'Surrounding Valley',
        subtitle: 'Deep Sahyadri Basin & Morning Mist',
        description:
          'Sweeping across the right horizon, steep forested slopes drop into a wide Sahyadri valley blanketed by early-morning mist and flanked by flat-topped basalt mountain ranges fading into atmospheric haze.',
        spherical: { yawDeg: -27, pitchDeg: -6 },
      },
      {
        id: 'sunrise-view',
        indexLabel: '03',
        title: 'Sunrise View',
        subtitle: 'Eastern Dawn Horizon & Soft Cloud Light',
        description:
          'Early-morning sunlight breaks cleanly above the distant eastern ridge on the left horizon, casting warm golden highlights across terraced mountain crests while keeping the deep valleys below in cool dawn shadow.',
        spherical: { yawDeg: -142, pitchDeg: 7 },
      },
    ],
    audioChannels: [
      {
        id: 'mountain-wind',
        label: 'Mountain Wind',
        shortLabel: 'Wind',
        description: 'Synthesized ridge breeze gusts',
      },
    ],
  },
};

const ALIBAUG_BUNDLE: DestinationBundle = {
  destination: {
    id: 'alibaug-night-camping',
    name: 'Alibaug Night Camping',
    shortName: 'Alibaug Camping',
    categoryLabel: 'Coastal Beach Overnight',
    regionLine: 'Maharashtra, India · Konkan Coast (Raigad District)',
    tagline: 'Settling into a quiet Arabian Sea shoreline between bonfire glow and starlight.',
    intro:
      'Along the Konkan coast roughly 95 km south of Mumbai, Alibaug’s palm-lined beaches trade steep mountain ascents for open dark sand, gentle Arabian Sea surf, warm evening bonfires, and unhurried coastal nights.',
    cardLocationLabel: 'Konkan Coast, Raigad',
    cardHighlightLabel: 'Coastal Setting',
    cardHighlightValue: 'Arabian Sea Shoreline',
    cardSecondaryLabel: 'Sample Format',
    cardSecondaryValue: 'Overnight Tent Camp (Sample)',
    heroImageUrl: '/src/assets/images/alibaug_camp_hero_1795534343905.jpg',
    heroImageAlt:
      'Beachfront canvas camping tents lit by warm lanterns beside a small driftwood bonfire facing calm moonlit Arabian Sea waves',
    cardImageUrl: '/src/assets/images/alibaug_camp_hero_1795534343905.jpg',
    cardImageAlt:
      'Beachfront canvas camping tents lit by warm lanterns beside a small driftwood bonfire facing calm moonlit Arabian Sea waves',
    sidebarImageUrl: '/src/assets/images/alibaug_beach_atmosphere_1795534345795.jpg',
    sidebarImageAlt:
      'Moonlit Arabian Sea waves washing across dark wet Alibaug sand beneath coconut palm silhouettes and starry sky',
    sidebarCaptionTitle: 'Night Coastline · Editorial Photography',
    sidebarCaptionText:
      'Once evening shore breezes settle, open beach stretches grow remarkably quiet—leaving only tide rhythm, distant coastal lights, and clear night horizons.',
    beforeYouGoHeadline: 'Feel the coastal night before you pack.',
    beforeYouGoDescription:
      'Step inside an interactive 360° beach campsite after sunset. Look between lantern-lit tents, the warm bonfire ring, moonlit Arabian Sea waves, and the starry sky—and optionally mix ocean waves, night breeze, and crackling fire.',
    beforeYouGoNote:
      'Transparency note: Generated 360° scenery is illustrative until authentic Alibaug field footage is acquired, and does not depict a specific commercial campsite operator.',
    beforeYouGoHint: 'Drag to look · 4 viewpoints · 3 optional sound layers (muted by default)',
    overviewKicker: 'Destination Overview',
    overviewHeading: 'Salt air, driftwood firelight, and an open sea horizon',
    stagesHeading: 'Sample Overnight Rhythm',
    stagesSubtitle: 'Illustrative prototype evening-to-morning flow',
    notesHeading: 'Sample Camp Preparation Notes',
    facts: [
      {
        id: 'coastline',
        label: 'Coastal Region',
        value: 'Alibaug, Raigad',
        note: 'Verified · Konkan Coast, Arabian Sea',
        sourceType: 'verified',
      },
      {
        id: 'access',
        label: 'Typical Approach',
        value: 'Mandwa Ferry / Road',
        note: 'Verified · South of Mumbai Harbor',
        sourceType: 'verified',
      },
      {
        id: 'pace',
        label: 'Activity Intensity',
        value: 'Easy / Relaxed',
        note: 'Sample · Level beach terrain, no trekking',
        sourceType: 'sample',
      },
      {
        id: 'stay',
        label: 'Typical Stay Window',
        value: 'Late afternoon – 10 AM',
        note: 'Sample · Illustrative overnight cadence',
        sourceType: 'sample',
      },
    ],
    overviewParagraphs: [
      'Unlike pre-dawn Sahyadri summit climbs, Alibaug night camping revolves around slow coastal stillness. Pitched tents sit just above the high-tide sand line beneath coconut palms and casuarina trees, facing out over the Arabian Sea.',
      'This Phase 2 MyTravWay demonstration lets you preview how the night environment feels spatially and acoustically—balancing the warm contrast of a camp bonfire against dark shoreline surf and open night sky.',
    ],
    sampleRouteStages: [
      {
        stageNumber: '01',
        title: 'Late Afternoon Arrival & Tent Check-In',
        elevationNote: 'Sample rhythm · Golden hour setup',
        description:
          'Arrive near sunset to settle into pitched shoreline tents, watch the Arabian Sea shift from amber to indigo, and orient yourself along the beach.',
      },
      {
        stageNumber: '02',
        title: 'Bonfire Lighting & Evening Gathering',
        elevationNote: 'Sample rhythm · Warm sand circle',
        description:
          'As sea air cools after dusk, campers gather around a small driftwood fire pit for conversation, acoustic songs, or quiet warmth.',
      },
      {
        stageNumber: '03',
        title: 'Late-Night Tide Walks & Stargazing',
        elevationNote: 'Sample rhythm · Low ambient light',
        description:
          'Step away from camp lanterns toward the wet waterline to listen to steady ocean swells and trace constellations above the dark sea horizon.',
      },
      {
        stageNumber: '04',
        title: 'Calm Coastal Morning & Chai',
        elevationNote: 'Sample rhythm · Early sea light',
        description:
          'Wake to pastel dawn reflections on glassy morning surf, cool sand underfoot, and an unhurried breakfast before departing.',
      },
    ],
    samplePreparationNotes: [
      'Sample note: Pack a light cotton hoodie or windcheater—coastal humidity drops noticeably after midnight.',
      'Sample note: Bring sandals easy to rinse of fine beach sand and a small torch or headlamp for late shoreline walks.',
      'Sample note: Store electronics in zip pouches to protect against fine sea mist and sand grains.',
      'Prototype disclosure: Sample overnight pacing, activities, and packing suggestions are illustrative only and do not represent guaranteed inclusions or a live MyTravWay booking.',
    ],
    storySectionTitle: 'Sample Camp Moments',
    storySectionSubtitle:
      'Optional visual stories illustrating how an overnight coastal stay often unfolds outside the 360° environment.',
    storyDisclosure:
      'Illustrative storytelling moments only: bonfire sessions, late-night snacks, quiet shoreline time, and morning tea vary by camp host, tide conditions, weather, and itinerary, and are not guaranteed in every trip package.',
    storyMoments: [
      {
        id: 'bonfire-friends',
        indexLabel: '01',
        title: 'Friends sitting around a bonfire',
        momentType: 'Evening · Illustrative moment',
        caption:
          'Shared warmth and unhurried conversation around glowing driftwood logs while waves break steadily behind the sand dune.',
        imageUrl: '/src/assets/images/story_bonfire_friends_1795534345130.jpg',
        imageAlt:
          'Four friends sitting around a glowing beach bonfire on dark sand at night with a canvas tent and ocean waves behind',
      },
      {
        id: 'midnight-maggi',
        indexLabel: '02',
        title: 'People enjoying midnight Maggi',
        momentType: 'Late night · Illustrative moment',
        caption:
          'Steaming steel bowls of hot noodles shared beside a warm camp lantern long after the beach grows quiet.',
        imageUrl: '/src/assets/images/story_midnight_maggi_1795534346547.jpg',
        imageAlt:
          'Two campers enjoying steaming bowls of hot Maggi noodles beside a warm lantern outside a canvas beach tent at night',
      },
      {
        id: 'quiet-beach',
        indexLabel: '03',
        title: 'Quiet beachside moments',
        momentType: 'After midnight · Illustrative moment',
        caption:
          'Stepping away from the group circle to sit facing the moonlit Arabian Sea, listening only to surf and breeze.',
        imageUrl: '/src/assets/images/story_quiet_beach_1795534345989.jpg',
        imageAlt:
          'Camper sitting quietly in a canvas chair on dark beach sand looking out at moonlit waves under a starry sky',
      },
      {
        id: 'peaceful-morning',
        indexLabel: '04',
        title: 'A peaceful morning after camping',
        momentType: 'Early morning · Illustrative moment',
        caption:
          'Unzipping the tent doorway to pastel dawn light, glassy low-tide ripples, and warm cups of morning chai on the sand.',
        imageUrl: '/src/assets/images/story_peaceful_morning_1795534347240.jpg',
        imageAlt:
          'Open canvas tent doorway looking out over calm early morning ocean waves with two steaming cups of chai on a wooden crate',
      },
    ],
  },
  experience: {
    destinationId: 'alibaug-night-camping',
    panoramaUrl: '/src/assets/images/alibaug_equirect_4k_final.jpg',
    panoramaLabel: 'Illustrative 360° Sample',
    disclaimer:
      'Illustrative 360° equirectangular night beach-camping scenery inspired by Alibaug’s Konkan coastline, shown until authentic field-captured Alibaug footage is acquired.',
    viewerAriaLabel: 'Alibaug Night Camping 360-degree immersive preview',
    loadingTitle: 'Loading 360° Night Camp Panorama',
    loadingSubtitle: 'Preparing high-resolution equirectangular coastal night view…',
    helpTitle: 'Exploring the 360° Night Camp',
    initialYawDeg: -119,
    initialPitchDeg: -4,
    defaultFov: 72,
    minFov: 38,
    maxFov: 86,
    hotspots: [
      {
        id: 'campsite',
        indexLabel: '01',
        title: 'Campsite',
        subtitle: 'Bell Tents & Coastal Palms',
        description:
          'Spacious canvas bell tents rest beneath dark coconut palms and coastal dune grass, softly lit from inside by warm lanterns and delicate string lights over a woven sand mat.',
        spherical: { yawDeg: 166, pitchDeg: -3 },
      },
      {
        id: 'bonfire',
        indexLabel: '02',
        title: 'Bonfire',
        subtitle: 'Driftwood Fire & Wooden Chairs',
        description:
          'At the heart of the clearing, visible driftwood logs burn with a steady amber glow while wooden-frame canvas chairs gather naturally on footprint-textured beach sand.',
        spherical: { yawDeg: -106, pitchDeg: -22 },
      },
      {
        id: 'beach-at-night',
        indexLabel: '03',
        title: 'Beach at Night',
        subtitle: 'Arabian Sea Surf & Moonlit Horizon',
        description:
          'Cool moonlit sand slopes gently toward calm Arabian Sea ripples, reflecting silver light along the shoreline with distant fishing boats and faint Konkan headland lights.',
        spherical: { yawDeg: 0, pitchDeg: -4 },
      },
      {
        id: 'under-the-stars',
        indexLabel: '04',
        title: 'Under the Stars',
        subtitle: 'Midnight Navy Sky & Moonlight',
        description:
          'Above the dark ocean horizon, natural moonlight illuminates drifting coastal clouds beneath a deep midnight navy sky dotted with crisp stars.',
        spherical: { yawDeg: -5, pitchDeg: 34 },
      },
    ],
    audioChannels: [
      {
        id: 'ocean-waves',
        label: 'Ocean Waves',
        shortLabel: 'Waves',
        description: 'Rhythmic Arabian Sea shore swells',
      },
      {
        id: 'night-wind',
        label: 'Gentle Night Wind',
        shortLabel: 'Breeze',
        description: 'Soft coastal night air',
      },
      {
        id: 'bonfire-crackle',
        label: 'Bonfire Crackling',
        shortLabel: 'Bonfire',
        description: 'Warm driftwood embers and pops',
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
