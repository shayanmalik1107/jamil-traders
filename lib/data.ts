export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  categorySlug: 'residential' | 'commercial' | 'retail' | 'institutional' | 'government' | 'healthcare' | 'outdoor';
  image: string;
  logo?: string;
  client?: string;
  year?: string;
  challenge: string;
  approach: string;
  solution: string;
  luminairesUsed: string[];
  gallery: string[];
  youtubeUrl?: string;
  imageFit?: 'cover' | 'contain' | 'fill' | 'blurred';
}

export function getYoutubeEmbedUrl(url?: string): string {
  if (!url) return '';
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch && shortsMatch[1]) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  const beMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (beMatch && beMatch[1]) {
    return `https://www.youtube.com/embed/${beMatch[1]}`;
  }
  if (url.includes('/embed/')) {
    return url;
  }
  return url;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: 'architectural' | 'interior' | 'decorative' | 'commercial' | 'retail' | 'exterior' | 'facade' | 'landscape' | 'led-solutions' | 'outdoor';
  environment: 'Indoor' | 'Outdoor' | 'Indoor / Outdoor';
  image: string;
  gallery?: string[];
  description: string;
  applications: string[];
  specs: {
    wattage: string;
    lumenOutput: string;
    colorTemp: string;
    dimensions: string;
    ipRating: string;
    optics?: string;
    material?: string;
    type?: string;
    effect?: string;
    voltage?: string;
    frequency?: string;
    controlType?: string;
    control?: string;
    beamAngle?: string;
    chipBrand?: string;
    ledDensity?: string;
    projectionDistance?: string;
    operatingTemp?: string;
    lifetime?: string;
    cri?: string;
    powerFactor?: string;
    warranty?: string;
    finishColor?: string;
  };
}

export interface ExpertiseArea {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keyFeatures: string[];
  iconName: string;
  bgClass: string;
  image: string;
}

export interface Industry {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  approach: string;
  recommendedProducts: string[];
  image: string;
}

export interface ClientLogo {
  name: string;
  category: string;
  location?: string;
  highlight?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'proj-19',
    title: 'Box Club',
    location: 'Pine Avenue, Lahore',
    category: 'Landscape & Outdoor',
    categorySlug: 'outdoor',
    image: '/c1.jpeg',
    imageFit: 'blurred',
    client: 'Box Club Hospitality',
    year: '2024',
    challenge: 'Execute turnkey architectural outdoor illumination for Box Club on Pine Avenue, Lahore — a premium open-air hospitality lounge requiring pathway lighting, high-output spike uplights, linear wall-washer lights, and IP67-rated profile lights in the seating area.',
    approach: 'We installed IP65-rated pathway lights to illuminate the walkways and create an attractive ambiance. High-lumen spike lights equipped with Bridgelux LED chips were used to ensure excellent light output and quality. Linear LED wall-washer lights further enhance the pathway ambiance throughout the space.',
    solution: 'IP67-rated linear LED profiles were installed in the seating area for reliable performance and protection against the elements. Safety and long-term dependability are our top priority in every project — every fixture was selected for durability, performance, and aesthetic harmony.',
    luminairesUsed: [
      'Pathway Light — IP65, Cree Chip, 3000K',
      'Spike Light — 12W, 3000K, Bridgelux Chip, PF 0.95',
      'LED Linear Washer Light — 24W, 24V, 3000K, IP65',
      'Linear Profile Light — IP67, 3000K (Seating Area)'
    ],
    gallery: [
      '/c1.jpeg',
      '/c2.jpeg',
      '/c3.jpeg',
      '/c4.jpeg',
      '/c5.jpeg',
      '/c6.jpeg'
    ]
  },
  {
    id: 'proj-15',
    title: 'Generation Multan',
    location: 'Shop 4, Gulgasht Colony, Bosan Road, Multan',
    category: 'Retail',
    categorySlug: 'retail',
    image: '/g1.jpeg',
    logo: '/generation-logo.jpeg',
    client: 'Generation Pakistan',
    year: '2024',
    challenge: 'At Generation\'s Multan outlet, we supplied high-quality lighting products to enhance the store\'s visual appeal while ensuring colour accuracy — reducing the common issue of customers finding product colours look different at home compared to in-store.',
    approach: 'We supplied 30W, 3000K track lights with a CRI of 95 to render clothing colours more naturally. Electroplated linear profile lights operating at 24V were installed, powered by drivers with a power factor of 0.95. To create an attractive starry ceiling effect, we installed lights in four different sizes: 1W mini, 3W medium, 5W large, and 12W extra-large.',
    solution: 'All lighting solutions were selected for reliable long-term performance — every driver runs at PF 0.95 to minimise energy waste and future complaints. The combination of high-CRI track lighting, warm linear profiles, and the multi-size starry ceiling creates a premium boutique atmosphere that elevates the customer experience.',
    luminairesUsed: [
      'Track Light — 30W, 3000K, CRI 95, PF 0.95',
      'Linear Profile Light — Electroplated, 24V, PF 0.95 Driver',
      'Starry Ceiling Light — 1W Mini, 3W Medium, 5W Large, 12W XL (3000K, PF 0.95)'
    ],
    gallery: [
      '/g1.jpeg',
      '/g2.jpeg',
      '/g3.jpeg',
      '/g4.jpeg',
      '/g5.jpeg'
    ]
  },
  {
    id: 'proj-14',
    title: 'The United Mall',
    location: 'Brand Road, near Tehsil Chowk and Bosan Road in Gulgasht Colony, Multan',
    category: 'Commercial',
    categorySlug: 'commercial',
    image: '/un1.jpeg',
    logo: '/united-mall-logo.png',
    client: 'The United Mall Management',
    year: '2024',
    challenge: 'We completed the first branch of United Mall, located in Multan, in 2016. Based on the quality of our work, United Mall later awarded us the lighting project for its second mall, located in Gulgasht.',
    approach: 'For this project, we installed linear LED lights throughout the mall using high-quality LED strips operated at 24V DC to ensure a longer lifespan and reduced heat output. The entire ceiling lighting scheme was designed for uniformity and commercial durability.',
    solution: 'We used power supplies with a high power factor (PF) of 0.95 to ensure reliable electrical performance and minimize the risk of future complaints or failures. This approach guarantees stable output, lower energy waste, and long-term dependability across the entire installation.',
    luminairesUsed: [
      'High-Quality 24V DC LED Strips (linear ceiling lighting)',
      'PF 0.95 Power Supplies (reliable, low-complaint performance)',
      'Seamless Linear Profile Channels',
      'Commercial Ceiling Linear LED System'
    ],
    gallery: [
      '/un1.jpeg',
      '/un2.jpeg',
      '/un3.jpeg',
      '/un4.jpeg',
      '/un5.jpeg',
      '/un6.jpeg'
    ]
  },
  {
    id: 'proj-16',
    title: 'Meezan Group',
    location: 'Headquarters, Islamabad',
    category: 'Commercial',
    categorySlug: 'commercial',
    image: '/M1.jpeg',
    client: 'Meezan Group',
    year: '2024',
    challenge: 'At the Meezan Group Headquarters in Islamabad, we installed high-quality linear hanging lights featuring 24V electroplated LED strips, paired with power factor (PF) 0.95 drivers to ensure reliable performance and long-lasting quality.',
    approach: 'We also installed magnetic lighting systems to enhance the headquarters’ ambiance and create a modern, premium corporate look.',
    solution: 'All products were supplied with a 3-year warranty, providing the client with peace of mind and support for maintenance-related issues throughout the warranty period.',
    luminairesUsed: [
      'Ultra Bright Linear Hanging Lights (24V Electroplated Strip, 0.95 PF Driver)',
      'Magnetic Lights System',
      'Magnetic Linear Lights',
      'Magnetic Laser Lights',
      'Magnetic Track Lights'
    ],
    gallery: [
      '/M1.jpeg',
      '/M2.jpeg',
      '/M3.jpeg',
      '/M4.jpeg'
    ]
  },
  {
    id: 'proj-17',
    title: 'AJ Towers',
    location: 'Block A, Gulberg Expressway, Gulberg Greens, Islamabad',
    category: 'Commercial',
    categorySlug: 'commercial',
    image: '/aj-1.jpeg',
    logo: '/aj-logo.png',
    client: 'AJ Towers Management',
    year: '2024',
    challenge: 'Execute turnkey commercial illumination for AJ Towers, located in Block A on the Gulberg Expressway in Gulberg Greens, Islamabad, requiring continuous flush-mounted architectural ceiling linear lighting, corridor downlights, and atrium circulation fixtures across multiple commercial floors.',
    approach: 'Designed an advanced commercial lighting blueprint combining continuous architectural linear LED slots with wide-angle anti-glare recessed downlights and accent lighting along escalator walkways and glass retail shopfronts.',
    solution: 'Turnkey supply and precision electrical installation of commercial-grade ceiling luminaires, ensuring seamless lux distribution, modern corporate aesthetics, and long-term energy efficiency.',
    luminairesUsed: [
      'Architectural Continuous Ceiling Linear Profile',
      'Commercial Recessed Wide-Beam Downlight',
      'Corridor & Escalator Accent Linear LED',
      'Low-Glare Commercial Downlight'
    ],
    gallery: [
      '/aj-1.jpeg',
      '/aj-2.jpeg',
      '/aj-3.jpeg',
      '/aj-4.jpeg'
    ]
  },
  {
    id: 'proj-18',
    title: '45B Model Town Residence',
    location: '45B, Model Town, Lahore',
    category: 'Landscape & Outdoor',
    categorySlug: 'outdoor',
    image: '/O1.jpeg',
    client: 'Private Residence',
    year: '2024',
    challenge: 'In this project in Model Town, we completed the landscape lighting work. Scope of work: Residence Model Town project, complete landscape lighting.',
    approach: 'Before installing the lights, we carried out proper waterproofing along the entire installation line to minimize the risk of water ingress and other potential issues.',
    solution: 'After completing the waterproofing, our skilled technicians professionally installed the lighting fixtures, ensuring reliable performance and long-term durability.',
    luminairesUsed: [
      '12W Spike Light (Bridgelux Chip, 0.95 PF, CRI 80)',
      'Waterproof Rope Light (High Lumens Chip)'
    ],
    gallery: [
      '/O1.jpeg',
      '/O2.jpeg',
      '/O3.jpeg',
      '/O4.jpeg',
      '/O5.jpeg',
      '/O6.jpeg'
    ]
  },
  {
    id: 'proj-20',
    title: 'A.rehman Jewels',
    location: 'DHA Phase 6, Lahore',
    category: 'Retail',
    categorySlug: 'retail',
    image: '/ar1.jpeg',
    client: 'A.rehman Jewels',
    year: '2024',
    challenge: 'We completed this jewellery shop project in DHA Phase 6. We used ultra-slim COB downlights with narrow-beam spotlights to precisely highlight the jewellery counters and enhance the display of the jewellery. These lights feature a CRI of 90+, ensuring excellent colour rendering and allowing the jewellery to appear more vibrant and natural under the lighting.',
    approach: 'Precision optical illumination engineered to highlight fine gold and diamond collections without harsh glare. Narrow-beam spotlights and rose gold COB downlights maximize gemstone clarity, luster, and color rendering.',
    solution: 'Turnkey architectural lighting execution featuring 12W ultra-slim rose gold COB lights, 12W magnetic track lights, and 20W Bridgelux chip uplighters with high power factor (0.95) and CRI 90+.',
    luminairesUsed: [
      '12W Ultra-Slim Rose Gold COB Lights (CRI 90+, Power Factor 0.95)',
      '12W Magnetic Track Lights (CRI 90+)',
      '20W Uplighter (Bridgelux Chip, 0.95 PF)'
    ],
    gallery: [
      '/ar1.jpeg',
      '/ar2.jpeg',
      '/ar3.jpeg',
      '/ar4.jpeg'
    ]
  },
  {
    id: 'proj-9',
    title: 'Hameed Latif Teaching Hospital (HLTH)',
    location: '2.5 km Haeir Road, Sua-e-Asal, 28 km Main Ferozepur Road, Lahore',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    image: '/hameed1.jpg',
    logo: '/hameed4.png',
    client: 'Hameed Latif Hospital Group',
    year: '2024',
    challenge: 'Execute a complete end-to-end turnkey illumination project for a multi-story medical & teaching hospital complex, requiring non-glare circadian ward lighting, IP65 surgical cleanroom luminaires, and prominent exterior facade lighting.',
    approach: 'Designed a comprehensive lighting architecture using anti-glare recessed panels, continuous warm cove lighting for patient wards, high-output marine grade column grazers for the facade, and uninterrupted emergency battery backup power.',
    solution: 'Turnkey supply and complete installation of healthcare-grade luminaires across all medical wards, ICUs, emergency departments, operation theaters, and building exterior facade.',
    luminairesUsed: ['MediClean IP65 UGR<16 Panel', 'Circadian Ward Cove Light', 'FacadeGraze High Output IP67', 'PinSpot Mini Adjustable Downlight'],
    gallery: [
      '/hameed1.jpg',
      '/hameed2.jpeg',
      '/hameed3.jpeg'
    ]
  },
  {
    id: 'proj-10',
    title: 'Shalamar Hospital',
    location: '2 Shalimar Link Road, Shalimar Larechs Colony, Lahore, 54000',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    image: '/shalamar.jpeg',
    logo: '/shalamar2.png',
    client: 'Shalamar Hospital Trust',
    year: '2024',
    challenge: 'Execute a complete turnkey illumination project for Shalamar Hospital Auditorium, requiring specialized acoustic slot downlighting, stage accent illumination, and multi-scene DALI dimming controls.',
    approach: 'Designed an architectural lighting scheme with high-CRI acoustic recessed downlights, glare-free stage spots, ambient perimeter cove lighting, and intuitive preset scene control keypads.',
    solution: 'Turnkey supply and complete installation of specialized auditorium luminaires delivering flawless visual clarity and atmosphere for medical conferences, lectures, and assemblies.',
    luminairesUsed: ['Aura Spot Architectural Zoom Downlight', 'Lumina Linear Wall Washer', 'Custom Stage Accent Spot', 'DALI Auditorium Scene Controller'],
    gallery: [
      '/shalamar.jpeg'
    ]
  },
  {
    id: 'proj-11',
    title: 'INMOL Cancer Hospital',
    location: 'Khayaban-e-Jamia Punjab, Block D, Muslim Town, Lahore, Punjab, Pakistan',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    image: '/INMOL1.jpeg',
    logo: '/INMOL2.jpeg',
    client: 'INMOL Cancer Hospital Directorate',
    year: '2024',
    challenge: 'Execute turnkey supply and precision installation of specialized counter section lights, architectural reception coves, and glare-free registration desk task lighting for INMOL Cancer Hospital.',
    approach: 'Designed an anti-glare linear LED lighting system featuring high-CRI 97+ color rendering, low-flicker drivers, and seamless recessed counter channels for patient reception.',
    solution: 'Turnkey installation of counter section and reception desk lighting, optimizing visual clarity and administrative efficiency for staff and visitors.',
    luminairesUsed: ['Lumina Linear Wall Washer', 'Aura Spot Architectural Zoom Downlight', 'MediClean IP65 UGR<16 Panel', 'Seamless Slot Task Light'],
    gallery: [
      '/INMOL1.jpeg',
      '/INMOL3.jpeg'
    ]
  },
  {
    id: 'proj-12',
    title: 'Farooq Hospital DHA',
    location: 'Inside Avenue Mall on Main Ghazi Road, DHA, Lahore, Pakistan',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    image: '/farooq3.jpeg',
    logo: '/farooq2.jpeg',
    client: 'Farooq Hospital Group',
    year: '2024',
    challenge: 'Execute turnkey supply and technical installation of specialized Emergency Ward lights, IP65 cleanroom ceiling panels, anti-glare circadian ward coves, and uninterrupted emergency battery backup systems for Farooq Hospital DHA.',
    approach: 'Engineered an ultra-reliable emergency medical lighting layout using low-UGR micro-prismatic panels, fast-response 3-hour battery backup drivers, and soothing circadian 3000K-4000K LED engines.',
    solution: 'Turnkey delivery of emergency ward lighting, ensuring 24/7 illumination resilience, visual comfort for trauma care teams, and full healthcare compliance.',
    luminairesUsed: ['MediClean IP65 UGR<16 Panel', 'Circadian Ward Cove Light', 'Emergency Battery Backup Driver 3H', 'PinSpot Mini Adjustable Downlight'],
    gallery: [
      '/farooq3.jpeg',
      '/farooq1.jpeg'
    ]
  },
  {
    id: 'proj-13',
    title: 'Razia Saeed Hospital',
    location: '17-E, Near Eid Gah Chowk, Officers Colony, Multan',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    image: '/Razia.jpeg',
    logo: '/razia1.png',
    client: 'Razia Saeed Hospital Trust',
    year: '2024',
    challenge: 'Execute turnkey supply and installation of healthcare-grade clinical illumination, anti-microbial IP65 surgical cleanroom panels, non-glare patient ward coves, and emergency lighting systems for Razia Saeed Hospital, Multan.',
    approach: 'Designed a comprehensive medical lighting layout using high-CRI 95+ flicker-free cleanroom panels, circadian warm cove lighting for recovery wards, and low-UGR glare-free downlights.',
    solution: 'Turnkey supply and complete installation of specialized healthcare luminaires across patient wards, OPD clinics, surgical suites, and reception areas.',
    luminairesUsed: ['MediClean IP65 UGR<16 Panel', 'Circadian Ward Cove Light', 'PinSpot Mini Adjustable Downlight', 'Seamless Slot Task Light'],
    gallery: [
      '/Razia.jpeg'
    ]
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-9',
    name: 'Water Ripple Projection Wall Washer',
    category: 'Outdoor Lighting',
    categorySlug: 'outdoor',
    environment: 'Outdoor',
    image: '/water2.jpeg',
    gallery: [
      '/water2.jpeg',
      '/water1.jpeg',
      '/water3.jpeg',
      '/water4.jpeg',
      '/water5.jpeg',
      '/water6.jpeg'
    ],
    description: 'Specialized architectural outdoor linear water wave projector wall washer engineered with an optical high-transparency ripple glass roller and stepper motor. Creates natural, fluid rippling water reflection waves on vertical and horizontal surfaces.',
    applications: [
      'Building Facades',
      'Pool Side & Water Features',
      'Hotels & Luxury Resorts',
      'Bridges & Overpasses',
      'Outdoor Courtyards',
      'Architectural Water Reflection Walls'
    ],
    specs: {
      type: 'Outdoor Linear Water Wave',
      effect: 'Creates fluid, rippling water reflection waves on surface',
      wattage: '60W / 80W / 120W Options',
      voltage: 'AC100–240V 50–60Hz',
      lumenOutput: 'Dynamic Optical Water Wave Projection',
      colorTemp: 'Lake Blue / Flame Light / RGBW',
      dimensions: 'L 1000mm x W 75mm x H 80mm (Weight: 3.35 KG)',
      ipRating: 'IP66 Weatherproof (48h Salt Spray Tested)',
      optics: '120° Beam Angle with Dynamic Water Ripple Optical Glass Roller',
      material: 'All-Aluminium Alloy Housing with Dark Grey Anti-Corrosion Spray + 4mm Tempered Glass',
      controlType: 'ON/OFF / DMX512 (4-Channel Controllable)',
      chipBrand: 'OSRAM High-Performance LED (Ra > 80)',
      projectionDistance: '3–6M / 5–10M',
      operatingTemp: '-40°C to +60°C (RTD Real-Time Temperature Protection)',
      lifetime: '≥ 50,000 Hours (light attenuation < 10%)'
    }
  },
  {
    id: 'prod-10',
    name: 'Adjustable COB Linear Downlight Multi-Head',
    category: 'Interior Lighting',
    categorySlug: 'interior',
    environment: 'Indoor',
    image: '/cob1.png?v=2',
    gallery: [
      '/cob1.png?v=2',
      '/cob2.png',
      '/cob3.png',
      '/cob4.png',
      '/cob5.png?v=2'
    ],
    description: 'Ceiling recessed multi-head adjustable COB linear downlight engineered with independent directional tilt spotlights and deep anti-glare reflectors. Powered by high-efficiency Bridgelux LED chips with superior CRI 95 color fidelity, offering multi-wattage options and precision beam angles for contemporary interior architectural spaces.',
    applications: [
      'Ceiling Recessed Grid & Architectural Slots',
      'Art Galleries & Showcase Illumination',
      'Luxury Residences & Private Villas',
      'High-End Retail Boutiques & Showrooms',
      'Executive Offices & Conference Rooms',
      'Hospitality Lounges & Dining Areas'
    ],
    specs: {
      type: 'Ceiling Article / Recessed Linear Multi-Head',
      wattage: '3W / 6W / 9W / 12W Options',
      chipBrand: 'Bridgelux COB LED',
      cri: '95 (Ultra-High Color Rendering Index)',
      colorTemp: '2700K / 3000K / 3500K / 4000K',
      beamAngle: '15° / 24° / 36° / 50°',
      powerFactor: '0.5 / 0.95',
      ipRating: 'IP44 (Moisture & Dust Resistant)',
      voltage: '58–265V AC',
      warranty: '3 Years Warranty',
      lumenOutput: '100–110 lm/W High Efficiency Output',
      dimensions: 'Multi-Head Modular Extrusion (Independent Adjustable Heads)',
      optics: 'Precision Optical Reflector with Low-Glare Baffle (Rose Gold / White Reflector)',
      material: 'Die-cast Aircraft Aluminum Housing with Electrostatic Finish',
      lifetime: '≥ 50,000 Hours'
    }
  },
  {
    id: 'prod-11',
    name: 'Adjustable LED Jewelry Display Spotlight Stand',
    category: 'Decorative Lighting',
    categorySlug: 'decorative',
    environment: 'Indoor',
    image: '/led-jewelry-spotlight-1.png',
    gallery: [
      '/led-jewelry-spotlight-1.png',
      '/led-jewelry-spotlight-2.png',
    ],
    description: 'Premium adjustable LED spotlight stand engineered for high-end jewelry display cabinets and showcases. Features precision beam focusing with ultra-high CRI optics to faithfully render gemstone brilliance, metal lustre, and fine textile textures. Flexible gooseneck arm with 360° rotation allows pinpoint accent targeting across any display surface.',
    applications: [
      'Jewelry Showrooms & Display Cabinets',
      'Luxury Retail Boutiques',
      'Museum Artifact Showcases',
      'Watch & Accessory Countertops',
      'Fine Art Gallery Accenting',
      'High-End Department Store Displays',
    ],
    specs: {
      type: 'Adjustable Spotlight Stand / Display Accent',
      wattage: '5W / 8W / 10W Options',
      lumenOutput: '500–1100 lm (Efficacy: 110 lm/W)',
      chipBrand: 'High-Power COB LED',
      cri: '97+ (Ultra-High Color Rendering — Gemstone Grade)',
      colorTemp: '2700K / 3000K / 4000K Selectable',
      beamAngle: '15° / 24° Narrow Spot',
      voltage: 'AC100–240V 50–60Hz',
      ipRating: 'IP20 Indoor',
      dimensions: 'H 350mm (Adjustable Arm) | Base Ø 80mm',
      material: 'Anodised Aluminium Alloy + Brushed Nickel Finish',
      control: 'Touch Dimmer (10%–100%) / Plug-In',
      lifetime: '≥ 30,000 Hours',
      warranty: '2 Years Warranty',
    },
  },
  {
    id: 'prod-12',
    name: 'COB Down Light',
    category: 'Interior Lighting',
    categorySlug: 'interior',
    environment: 'Indoor',
    image: '/p1.png',
    gallery: [
      '/p1.png',
      '/p2.png',
      '/p3.png',
      '/p4.jpeg',
      '/p5.jpeg',
    ],
    description: 'Premium recessed COB downlight engineered with a high-performance Bridgelux LED chip for exceptional color fidelity and light quality. Available in 7W and 12W options with an outstanding CRI of 95, this downlight delivers accurate, natural-looking illumination across a wide range of color temperatures — ideal for residential, retail, and commercial interior spaces.',
    applications: [
      'Residential Living Rooms & Bedrooms',
      'Retail Boutiques & Showrooms',
      'Hospitality & Hotel Corridors',
      'Executive Offices & Meeting Rooms',
      'Art Galleries & Museums',
      'Commercial Interiors',
    ],
    specs: {
      type: 'Recessed COB Downlight',
      wattage: '7W / 12W',
      chipBrand: 'Bridgelux',
      cri: '95Ra (Ultra-High Color Rendering)',
      colorTemp: '2700K / 3000K / 3500K / 4000K',
      beamAngle: '24° / 36°',
      powerFactor: '0.95',
      ipRating: 'IP20 Indoor',
      lumenOutput: 'High Efficiency COB Output',
      dimensions: 'Standard Recessed Ceiling Cut-Out',
      optics: 'Precision COB Reflector — Anti-Glare Deep Baffle',
      material: 'Die-Cast Aluminium Housing',
      lifetime: '≥ 50,000 Hours',
      warranty: '3 Years Warranty',
    },
  },
  {
    id: 'prod-13',
    name: 'Pin Hole Down Light',
    category: 'Interior Lighting',
    categorySlug: 'interior',
    environment: 'Indoor',
    image: '/pro1.png',
    gallery: [
      '/pro1.png',
      '/pro2.png',
      '/pro3.png',
      '/pro4.png',
    ],
    description: 'Precision-engineered recessed pin hole downlight featuring a Bridgelux LED chip for superior color rendering at 95Ra. The narrow aperture design conceals the light source entirely, creating a clean, minimalist ceiling aesthetic while delivering focused, glare-free illumination. Available in multiple IP ratings for versatile installation across dry, damp, and wet environments.',
    applications: [
      'Architectural Lighting & Feature Accent',
      'Luxury Residential Interiors & Villas',
      'High-End Retail Boutiques & Showrooms',
      'Hospitality Lobbies & Hotel Suites',
    ],
    specs: {
      type: 'Recessed Pin Hole Downlight',
      wattage: '7W / 12W',
      chipBrand: 'Bridgelux',
      cri: '95Ra (Ultra-High Color Rendering)',
      colorTemp: '2700K / 3000K / 3500K / 4000K',
      beamAngle: '15° / 24° / 38°',
      powerFactor: '0.95',
      voltage: '85–265V AC',
      ipRating: 'IP20 / IP44 / IP65',
      lumenOutput: 'High Efficiency Bridgelux COB Output',
      dimensions: 'Standard Recessed Pin Hole Cut-Out',
      optics: 'Precision Pin Hole Reflector — Ultra-Low Glare Deep Baffle',
      material: 'Die-Cast Aluminium Housing',
      lifetime: '≥ 50,000 Hours',
      warranty: '2.5 Years Warranty',
    },
  },
  {
    id: 'prod-14',
    name: 'Deep COB Spot Light',
    category: 'Interior Lighting',
    categorySlug: 'interior',
    environment: 'Indoor',
    image: '/prod1.png',
    gallery: [
      '/prod1.png',
      '/prod2.png',
      '/prod3.png',
    ],
    description: 'High-performance deep recessed COB spotlight powered by authentic Bridgelux LED chips, engineered for focused architectural accentuation with superior anti-glare visual comfort. Featuring an ultra-high CRI of 95Ra and IP44 moisture resistance, it delivers crisp, true-to-life color rendering across versatile color temperatures — ideal for premium residences, retail showcases, and hospitality spaces.',
    applications: [
      'Architectural Accent & Spotlighting',
      'Luxury Residential Living & Master Suites',
      'Retail Display & Premium Showrooms',
      'Hospitality Lobbies, Hotels & Galleries',
      'Feature Walls, Artwork & Niche Lighting',
    ],
    specs: {
      type: 'Deep Recessed COB Spot Light',
      wattage: '7W / 12W',
      chipBrand: 'Bridgelux',
      cri: '95Ra (Ultra-High Color Rendering)',
      colorTemp: '2700K / 3000K / 3500K / 4000K',
      beamAngle: '24° / 36°',
      powerFactor: '0.95 PF',
      voltage: '85–265V AC',
      ipRating: 'IP44',
      lumenOutput: 'High Output Bridgelux COB Lumens',
      dimensions: 'Standard Deep Recessed Ceiling Cut-Out',
      optics: 'Deep Anti-Glare Baffle — Precision Concentrated Reflector',
      material: 'Die-Cast Aluminium Heat Sink Housing',
      lifetime: '≥ 50,000 Hours',
      warranty: '3 Years Warranty',
    },
  },
  {
    id: 'prod-15',
    name: 'Spike Light',
    category: 'Outdoor Lighting',
    categorySlug: 'outdoor',
    environment: 'Outdoor',
    image: '/spike-light1.jpg',
    gallery: [
      '/spike-light1.jpg',
      '/spike-light2.jpg'
    ],
    description: 'High-performance outdoor landscape LED spike light engineered with genuine CREE LED chips and robust die-cast aluminium construction. Featuring 10W power, a focused 30° beam angle, 3000K warm white illumination, 80 CRI, 0.95 power factor, and IP66 weatherproofing with a 3-year warranty for reliable garden, tree uplighting, and exterior architectural illumination.',
    applications: [
      'Landscape & Garden Illumination',
      'Tree & Palm Uplighting',
      'Pathway & Walkway Accenting',
      'Architectural Facade Grazing',
      'Lawn & Shrub Feature Lighting',
      'Outdoor Courtyards & Private Residences'
    ],
    specs: {
      type: 'Outdoor LED Spike Light',
      wattage: '10W',
      cri: '80',
      beamAngle: '30°',
      chipBrand: 'CREE',
      colorTemp: '3000K / Warm White',
      powerFactor: '0.95 PF',
      voltage: '220–240VAC',
      frequency: '50 Hz',
      ipRating: 'IP66 Weatherproof',
      material: 'Die-Cast Aluminium',
      warranty: '3 Years Warranty',
      lumenOutput: 'High Output CREE LED Lumens',
      dimensions: 'Compact Outdoor Landscape Spike Fixture with Adjustable Bracket',
      optics: '30° Concentrated Optical Lens Array',
      lifetime: '≥ 50,000 Hours'
    }
  },
  {
    id: 'prod-16',
    name: 'Diamond Spike Light',
    category: 'Outdoor Lighting',
    categorySlug: 'outdoor',
    environment: 'Outdoor',
    image: '/diamond-spike.jpeg',
    gallery: [
      '/diamond-spike.jpeg'
    ],
    description: 'Distinctive faceted geometric architectural outdoor spike light featuring a precision diamond-cut die-cast aluminium housing and authentic CREE LED chips. Delivers clean 3000K warm white accent illumination with an 80 CRI, 30° focused beam angle, 0.95 power factor, and IP66 heavy-duty weatherproofing with a 3-year warranty for contemporary landscape and exterior feature illumination.',
    applications: [
      'Architectural & Contemporary Landscape Design',
      'Tree & Specimen Shrub Uplighting',
      'Garden Feature & Sculpture Accentuation',
      'Perimeter Walkways & Courtyard Borders',
      'Luxury Residential Facade Lighting',
      'Modern Hospitality Gardens & Terraces'
    ],
    specs: {
      type: 'Diamond Faceted Outdoor Spike Light',
      wattage: '10W',
      cri: '80',
      beamAngle: '30°',
      chipBrand: 'CREE',
      colorTemp: '3000K / Warm White',
      powerFactor: '0.95 PF',
      voltage: '220–240VAC',
      frequency: '50 Hz',
      ipRating: 'IP66 Weatherproof',
      material: 'Die-Cast Aluminium (Faceted Diamond Design)',
      warranty: '3 Years Warranty',
      lumenOutput: 'High Output CREE LED Lumens',
      dimensions: 'Faceted Diamond Outdoor Landscape Fixture with Directional Bracket',
      optics: '30° Multi-Facet Concentrated Lens Array',
      lifetime: '≥ 50,000 Hours'
    }
  },
  {
    id: 'prod-17',
    name: 'Flexible LED Wall Washer Strip',
    category: 'Outdoor Lighting',
    categorySlug: 'outdoor',
    environment: 'Outdoor',
    image: '/S1.jpg',
    gallery: [
      '/S1.jpg',
      '/S2.jpg',
      '/S3.jpg'
    ],
    description: 'Architectural flexible outdoor LED wall washer strip engineered for seamless linear and contoured facade grazing. Operating at 24V DC with high-performance SMD 2835 LEDs at 42 LEDs/m (24W/m), it features precision 30° optical lenses, 4000K clean neutral white illumination, compact 20 × 10 mm dimensions, and robust IP65 weatherproof encapsulation backed by a 2-year warranty.',
    applications: [
      'Curved & Linear Architectural Facade Grazing',
      'Building Exterior Walls & Textured Cladding',
      'Parapet, Rooflines & Balcony Coves',
      'Perimeter Grazing & Landscape Retaining Walls',
      'Hotel, Commercial & Residential Exterior Highlights',
      'Outdoor Step, Pathway & Canopy Accent Lighting'
    ],
    specs: {
      type: 'Flexible LED Wall Washer Strip',
      wattage: '24W/m',
      voltage: '24V DC',
      chipBrand: 'SMD 2835',
      ledDensity: '42 LEDs/m',
      colorTemp: '4000K (Neutral White)',
      beamAngle: '30° Focused Optical Wall Washer Lens',
      dimensions: '20 × 10 mm',
      ipRating: 'IP65 Weatherproof',
      warranty: '2 Years Warranty',
      lumenOutput: 'High Output Architectural Wall Grazing Lumens',
      optics: '30° Individual Precision Optical Lenses',
      material: 'Flexible UV-Resistant Silicone / Polymer Encapsulation',
      lifetime: '≥ 50,000 Hours'
    }
  },
  {
    id: 'prod-18',
    name: 'Linear Hanging Spot Light',
    category: 'Commercial Lighting',
    categorySlug: 'commercial',
    environment: 'Indoor',
    image: '/H2.jpeg',
    gallery: [
      '/H2.jpeg',
      '/H1.jpeg',
      '/H3.jpeg'
    ],
    description: 'Suspended architectural linear spot light engineered for contemporary commercial spaces, executive offices, and retail showrooms. Equipped with authentic OSRAM LED chips delivering 48W of crisp 4000K neutral white illumination with high 0.95 power factor and 24° low-glare optical spot reflectors. Precision-machined from extruded aluminium and available in both architectural White and Black finishes with a 2-year warranty.',
    applications: [
      'Commercial Offices & Workspaces',
      'Conference Rooms & Boardrooms',
      'Retail Stores & Showrooms',
      'Architectural Design Studios',
      'Reception Desks & Counters',
      'Educational & Institutional Facilities'
    ],
    specs: {
      type: 'Suspended Linear Spot Light',
      wattage: '48W',
      colorTemp: '4000K (Neutral White)',
      chipBrand: 'OSRAM',
      powerFactor: '0.95',
      beamAngle: '24°',
      ipRating: 'IP20',
      voltage: 'AC85–265V',
      dimensions: 'L1145 * W43 * H75mm',
      material: 'Aluminium',
      finishColor: 'White & Black',
      warranty: '2 Years',
      lumenOutput: 'High Output Commercial Spot Lumens',
      optics: '24° Precision Anti-Glare Louvered Reflectors',
      lifetime: '≥ 50,000 Hours'
    }
  },
  {
    id: 'prod-19',
    name: 'Narrow Beam Flood Light',
    category: 'Outdoor Lighting',
    categorySlug: 'outdoor',
    environment: 'Outdoor',
    image: '/N1.jpeg',
    gallery: [
      '/N1.jpeg'
    ],
    description: 'High-performance architectural narrow beam exterior flood light engineered with authentic OSRAM LED chips and rugged die-cast aluminium housing with an anti-glare visor hood. Delivering 27W of high-efficiency 2700K warm white illumination with an ultra-concentrated 5° beam angle (with 5°, 10°, and 15° options), 80 CRI, 0.95 power factor, and IP65 weatherproofing backed by a 3-year warranty for precision facade and building elevation illumination.',
    applications: [
      'Facade Lighting',
      'Building Elevation',
      'Architectural Columns & Pillars',
      'High-Reach Accent Lighting',
      'Monuments & Landmark Structures',
      'Exterior Wall Highlighting'
    ],
    specs: {
      type: 'Narrow Beam Exterior Flood Light',
      wattage: '27W',
      colorTemp: '2700K (Warm White)',
      chipBrand: 'OSRAM',
      beamAngle: '5° (5° / 10° / 15° Options)',
      cri: '80',
      powerFactor: '0.95 PF',
      voltage: 'AC220V',
      ipRating: 'IP65 Weatherproof',
      material: 'Die-Cast Aluminium',
      warranty: '3 Years Warranty',
      lumenOutput: 'High Output OSRAM LED Lumens',
      dimensions: 'Compact Architectural Flood Fixture with Visor & Directional Mounting Bracket',
      optics: '5° / 10° / 15° Precision Concentrated Optical Lens Array',
      lifetime: '≥ 50,000 Hours'
    }
  },
];

export const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    id: 'exp-1',
    number: '01',
    title: 'RESIDENTIAL LIGHTING',
    subtitle: 'Lighting that makes a house feel like home.',
    description: 'We layer light to accentuate architectural flow, elevate natural materials, and create warm, comforting home atmospheres tailored to modern living.',
    keyFeatures: ['Circadian Warm-Dimming', 'Art & Sculpture Accentuation', 'Hidden Cove Wall-Washing', 'Custom Decorative Fittings'],
    iconName: 'Home',
    bgClass: 'bg-expertise-residential',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'exp-2',
    number: '02',
    title: 'COMMERCIAL & RETAIL',
    subtitle: 'Lighting built around attention, movement and experience.',
    description: 'Strategic commercial illumination that guides customer visual navigation, highlights merchandise textures in high CRI, and elevates brand presence.',
    keyFeatures: ['High CRI 97+ Color Rendering', 'Energy Efficient DALI Controls', 'Dynamic Scene Setting', 'Modular Magnetic Tracks'],
    iconName: 'ShoppingBag',
    bgClass: 'bg-expertise-commercial',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'exp-3',
    number: '03',
    title: 'ARCHITECTURAL LIGHTING',
    subtitle: 'Light designed to reveal the architecture itself.',
    description: 'Integrating fixtures into ceiling planes, stone niches, and structural beams so light feels drawn directly from the architecture rather than added fixtures.',
    keyFeatures: ['Zero-Glare Baffles (UGR < 13)', 'Custom Plaster-In Channels', 'Facade Column Grazing', 'Seamless Linear Slots'],
    iconName: 'Building',
    bgClass: 'bg-expertise-architectural',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'exp-4',
    number: '04',
    title: 'LANDSCAPE & FACADE',
    subtitle: 'Extending architecture beyond the walls.',
    description: 'Crafting dramatic nocturnal identities for building exteriors, botanical gardens, and courtyard water features while respecting dark-sky principles.',
    keyFeatures: ['IP67/IP68 Heavy Duty Luminaires', 'In-Ground Heavy Load Uplights', 'Submersible Water Projectors', 'Corrosion-Resistant Marine Finishes'],
    iconName: 'Trees',
    bgClass: 'bg-expertise-landscape',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'exp-5',
    number: '05',
    title: 'ELECTRICAL & INSTALLATION',
    subtitle: 'Technical execution behind every finished experience.',
    description: 'Complete end-to-end technical execution including distribution panel design, precision cable routing, load calculations, and site commissioning across Pakistan.',
    keyFeatures: ['Certified Master Electricians', 'Load Balancing & Surge Protection', 'DALI / DMX Control Wiring', 'On-Site Quality Audits'],
    iconName: 'Zap',
    bgClass: 'bg-expertise-electrical',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'exp-6',
    number: '06',
    title: 'PLANNING & CONSULTANCY',
    subtitle: 'Site inspection, feasibility and lighting planning.',
    description: 'Detailed DIALux photometric simulations, lux level heatmaps, budget planning, and mock-up demonstrations before breaking ground.',
    keyFeatures: ['DIALux 3D Lighting Simulations', 'Lux Level Standards Compliance', 'BOQ Cost Optimization', 'Architectural Drawing Audits'],
    iconName: 'FileText',
    bgClass: 'bg-expertise-planning',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'exp-7',
    number: '07',
    title: 'INSTITUTIONAL & HEALTHCARE',
    subtitle: 'Functional, durable and purpose-driven solutions.',
    description: 'Cleanroom certified anti-microbial sealed luminaires providing flicker-free visual comfort for medical centers, universities, and civic institutions.',
    keyFeatures: ['Flicker-Free Eye Care Drivers', 'IP65 Anti-Microbial Seals', 'Emergency Battery Backups', 'High Reliability 50,000+ Hrs'],
    iconName: 'Cross',
    bgClass: 'bg-expertise-healthcare',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'exp-8',
    number: '08',
    title: 'MAINTENANCE & LONG-TERM SUPPORT',
    subtitle: 'Long-term support after installation.',
    description: 'Proactive maintenance contracts, rapid spare part replacement, driver health diagnostics, and ongoing lighting calibration to ensure timeless performance.',
    keyFeatures: ['Dedicated Support Hotline', 'Original Factory Spare Parts', 'Annual System Audits', 'Driver Repair & Replacement'],
    iconName: 'Shield',
    bgClass: 'bg-expertise-maintenance',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  }
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'ind-homes',
    title: 'HOMES & PRIVATE VILLAS',
    subtitle: 'Personal sanctuaries shaped by intimate light.',
    description: 'Residential spaces demand emotional versatility — from vibrant energizing morning light to warm, tranquil evening scenes.',
    challenge: 'Balancing decorative luxury fixtures with high-performance indirect architectural illumination that reduces glare and highlights stone and wood materials.',
    approach: 'Deploy continuous warm-dimming linear coves, micro pin-spots over artwork, and ambient garden uplighting managed by intuitive keypads.',
    recommendedProducts: ['Aura Spot Architectural Zoom Downlight', 'Lumina Linear Wall Washer', 'Starlight Crystal Chandelier Collection'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'ind-retail',
    title: 'RETAIL & BRAND FLAGSHIPS',
    subtitle: 'Lighting built around attention, movement and sales.',
    description: 'In retail, light is a silent salesman. Accurate color rendering (CRI 97+) makes fabrics pop, leather shine, and customer experiences unforgettable.',
    challenge: 'High heat output and uneven illumination cause product discoloration and visual fatigue in shoppers.',
    approach: 'Flexible 48V magnetic track channels with anti-glare honeycomb optics, allowing rapid layout changes for seasonal merchandise collections.',
    recommendedProducts: ['Vanguard Magnetic Track Profile System', 'Aura Spot Architectural Zoom Downlight'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'ind-commercial',
    title: 'COMMERCIAL CORPORATE TOWERS',
    subtitle: 'Productivity, elegance and energy efficiency.',
    description: 'Corporate headquarters require glare-free lighting for screen viewing combined with memorable architectural lobby lighting.',
    challenge: 'Reducing watts-per-square-meter energy footprint while ensuring strict compliance with ergonomic workplace lux standards.',
    approach: 'Smart daylight harvesting sensors paired with micro-louvers downlights and decorative linear atrium pendants.',
    recommendedProducts: ['Lumina Linear Wall Washer', 'MediClean UGR<16 Anti-Microbial Panel'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'ind-hospitality',
    title: 'HOTELS, RESTAURANTS & LOUNGES',
    subtitle: 'Setting the mood for luxury hospitality.',
    description: 'Creating atmospheric dining and relaxing hotel check-in experiences with warm, deeply dimmed ambient scenes.',
    challenge: 'Maintaining visual intimacy without leaving key architectural features or dining tables in total darkness.',
    approach: 'Low-level footlight step lights, warm cove ambient glows, and pin-point accent spots centered directly onto table floral arrangements.',
    recommendedProducts: ['Aura Spot Architectural Zoom Downlight', 'Starlight Crystal Chandelier Collection'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'ind-healthcare',
    title: 'HEALTHCARE & HOSPITALS',
    subtitle: 'Precision, hygiene and patient comfort.',
    description: 'Hospitals require clean, shadowless task lighting for surgical teams and biological circadian support for recovering patients.',
    challenge: 'Sterile chemical cleaning routines require IP65 sealed fixtures that resist moisture, dust, and bacteriological growth.',
    approach: 'Flicker-free IP65 cleanroom panels with UGR < 16 micro-prismatic optics and emergency backup battery drivers.',
    recommendedProducts: ['MediClean UGR<16 Anti-Microbial Panel'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'ind-government',
    title: 'GOVERNMENT & CIVIC INSTITUTIONS',
    subtitle: 'Monumental presence built for endurance.',
    description: 'Civic buildings require reliable, high-output architectural illumination that withstands heavy weather and expresses civic dignity.',
    challenge: 'Large structural scale requires long-throw optics capable of illuminating multi-story stone columns uniformly.',
    approach: 'Narrow 8° beam marine-grade stainless steel floodlights with centralized DMX scheduling controls.',
    recommendedProducts: ['FacadeGraze IP67 Exterior Projector', 'Terra Bollard Outdoor Path Luminaire'],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1000&q=80'
  }
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Nishat Group', category: 'Retail & Commercial', highlight: 'Emporium Mall Flagship' },
  { name: 'Generation', category: 'Fashion Retail', highlight: 'Multan Flagship & Boutiques', location: 'Shop 4, Gulgasht Colony, Bosan Road, Multan' },
  { name: 'Metro Shoes', category: 'Commercial Footwear', highlight: '25+ Nationwide Branches' },
  { name: 'Uni Worth', category: 'Menswear Flagships', highlight: 'Luxury Suiting Outlets' },
  { name: 'The United Mall', category: 'Commercial Shopping Mall', highlight: 'Full Ceiling Linear Lighting Project', location: 'Brand Road, near Tehsil Chowk and Bosan Road in Gulgasht Colony, Multan' },
  { name: 'Meezan Group', category: 'Corporate Commercial', highlight: 'Headquarters Lighting Project', location: 'Islamabad' },
  { name: 'AJ Towers', category: 'Commercial Complex', highlight: 'Commercial Complex Lighting Project', location: 'Block A, Gulberg Expressway, Gulberg Greens, Islamabad' },
  { name: 'Box Club', category: 'Outdoor Hospitality', highlight: 'Turnkey Pergola & Landscape Lighting', location: 'Pine Avenue, Lahore' },
  { name: 'A.rehman Jewels', category: 'Luxury Jewelry Retail', highlight: 'Complete Indoor & Outdoor Lighting', location: 'DHA Phase 6, Lahore' },
  { name: 'SKMCH Hospital', category: 'Healthcare Institution', highlight: 'Specialty Medical Wings' },
  { name: 'Hameed Latif Teaching Hospital (HLTH)', category: 'Healthcare Institution', highlight: 'Complete Lighting Project', location: '2.5 km Haeir Road, Ferozepur Road, Lahore' },
  { name: 'Shalamar Hospital', category: 'Healthcare Institution', highlight: 'Auditorium Lighting Project', location: 'Shalimar Link Road, Lahore' },
  { name: 'INMOL Cancer Hospital', category: 'Healthcare Institution', highlight: 'Counter Section Lighting Project', location: 'Muslim Town, Lahore' },
  { name: 'Farooq Hospital DHA', category: 'Healthcare Institution', highlight: 'Emergency Ward Lighting Project', location: 'Avenue Mall, Ghazi Road, DHA, Lahore' },
  { name: 'Razia Saeed Hospital', category: 'Healthcare Institution', highlight: 'Specialty Ward Illumination Project', location: 'Officers Colony, Multan' },
  { name: 'Civic Infrastructure', category: 'Government Projects', highlight: 'Facade Illumination' },
  { name: 'Defense Housing Authority', category: 'Housing & Landscaping', highlight: 'Golf & Country Clubs' },
  { name: 'Private Architecture Firms', category: 'Residential Villas', highlight: '100+ Luxury Estates' }
];

export const COMPANY_TIMELINE = [
  {
    year: '2002',
    title: 'THE BEGINNING',
    description: 'Founded with a simple belief: light should do more than help us see — it should define architecture and atmosphere.'
  },
  {
    year: '2008',
    title: 'EARLY LED ADOPTION',
    description: 'Pioneered energy-efficient commercial LED integrations across major retail chains in Pakistan.'
  },
  {
    year: '2015',
    title: 'ARCHITECTURAL & COMMERCIAL EXPANSION',
    description: 'Expanded into comprehensive turnkey lighting design, structural facade illumination, and government projects.'
  },
  {
    year: 'TODAY',
    title: 'LIGHTING PROJECTS ACROSS PAKISTAN',
    description: 'Over two decades of excellence, illuminating prestigious residences, luxury retail flagships, and civic landmarks nationwide.'
  }
];

export const CORE_PRINCIPLES = [
  {
    title: 'QUALITY',
    subtitle: 'Zero compromise on optical grade & heat sink materials.',
    description: 'Every driver, LED array, and optical lens undergoes rigorous testing to guarantee a 50,000+ hour operating lifespan.'
  },
  {
    title: 'CREATIVITY',
    subtitle: 'Light engineered around architectural vision.',
    description: 'We do not start with a fixture catalogue. We analyze spatial proportions, shadow lines, and natural light transition first.'
  },
  {
    title: 'TRUST',
    subtitle: 'Over 20 years of verified execution.',
    description: 'Trusted by Pakistan’s top retailers, government directors, and leading architectural practices since 2002.'
  },
  {
    title: 'PRECISION',
    subtitle: 'Exact beam angles, zero unwanted glare.',
    description: 'From 8° column grazers to UGR<13 deep anti-glare downlights, precision optical control is built into everything we do.'
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'Malik Abdul Jamil',
    role: 'Chief Executive Officer',
    experience: 'Founder & Visionary since 2002',
    image: '/ceo.png'
  },
  {
    name: 'Engr. Haris Jamil',
    role: 'Head of Electrical & Technical Operations',
    experience: 'Specialist in DALI/DMX Control Systems',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Zainab Rashid',
    role: 'Senior Architectural Lighting Designer',
    experience: 'DIALux 3D Photometrics & Spatial Design',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Tariq Mehmood',
    role: 'Project Procurement & Operations Lead',
    experience: 'Turnkey Site Execution across Pakistan',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
  }
];
