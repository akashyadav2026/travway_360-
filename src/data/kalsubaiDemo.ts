export type FactSourceType = 'verified' | 'sample';

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

export interface SummitHotspot {
  id: 'summit-viewpoint' | 'surrounding-valley' | 'sunrise-view';
  indexLabel: string;
  title: string;
  subtitle: string;
  description: string;
  spherical: {
    /** Horizontal angle in degrees (-180 to 180; 0 faces initial forward view) */
    yawDeg: number;
    /** Vertical angle in degrees (-60 to 60; positive is above horizon) */
    pitchDeg: number;
  };
}

export interface DestinationDemoData {
  id: 'kalsubai-summit';
  name: string;
  regionLine: string;
  tagline: string;
  intro: string;
  heroImageUrl: string;
  heroImageAlt: string;
  landingHeroImageUrl: string;
  landingHeroImageAlt: string;
  ridgeImageUrl: string;
  ridgeImageAlt: string;
  facts: FactField[];
  overviewParagraphs: string[];
  sampleRouteStages: SampleRouteStage[];
  samplePreparationNotes: string[];
}

export interface SummitExperienceConfig {
  destinationId: 'kalsubai-summit';
  panoramaLabel: 'Illustrative 360° Sample';
  disclaimer: string;
  initialYawDeg: number;
  initialPitchDeg: number;
  defaultFov: number;
  minFov: number;
  maxFov: number;
  hotspots: [SummitHotspot, SummitHotspot, SummitHotspot];
}

export const KALSUBAI_DESTINATION: DestinationDemoData = {
  id: 'kalsubai-summit',
  name: 'Kalsubai Summit',
  regionLine: 'Maharashtra, India · Sahyadri Range (Western Ghats)',
  tagline: 'Standing above the clouds on Maharashtra’s highest mountain crest.',
  intro:
    'Rising to 1,646 meters in the Sahyadri range near Bari village, Kalsubai offers sweeping morning vistas across terraced valleys, volcanic basalt ridges, and the Bhandardara backwaters below.',
  landingHeroImageUrl: '/src/assets/images/hero_sahyadri_sunrise_1795532417756.jpg',
  landingHeroImageAlt:
    'Golden sunrise breaking above layered Sahyadri mountain ridges and morning valley cloud inversion',
  heroImageUrl: '/src/assets/images/kalsubai_summit_plateau_1795532418792.jpg',
  heroImageAlt:
    'Trekker standing on a rocky mountain summit overlooking misty Western Ghats peaks glowing at dawn',
  ridgeImageUrl: '/src/assets/images/kalsubai_trail_ridge_1795532419006.jpg',
  ridgeImageAlt:
    'High-altitude mountain ridge trail flanked by volcanic basalt rock and drifting morning mist',
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
    'Because static photographs rarely convey the openness and vertical scale of a summit ridge, this MyTravWay Phase 1 prototype lets you step into an optional 360° sunrise summit preview before deciding whether the terrain and atmosphere match what you are looking for.',
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
};

export const KALSUBAI_SUMMIT_EXPERIENCE: SummitExperienceConfig = {
  destinationId: 'kalsubai-summit',
  panoramaLabel: 'Illustrative 360° Sample',
  disclaimer:
    'High-resolution illustrative 360° equirectangular summit environment inspired by the Sahyadri range, demonstrating interactive panoramic previewing rather than field-captured survey footage.',
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
};
