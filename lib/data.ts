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
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: 'architectural' | 'interior' | 'decorative' | 'commercial' | 'retail' | 'exterior' | 'facade' | 'landscape' | 'led-solutions';
  environment: 'Indoor' | 'Outdoor' | 'Indoor / Outdoor';
  image: string;
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
    id: 'proj-1',
    title: 'Nishat Emporium Luxury Boutique',
    location: 'Lahore, Pakistan',
    category: 'Retail & Commercial',
    categorySlug: 'retail',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    client: 'Nishat Group',
    year: '2023',
    challenge: 'Highlight intricate textile textures and vibrant hues while minimizing heat production and preserving visual comfort across high-traffic retail aisles.',
    approach: 'Deployed high-CRI (97+) narrow-beam linear tracking spotlights with recessed anti-glare downlights to sculpt depth and focus customer attention on key apparel displays.',
    solution: 'Engineered a multi-tiered DALI dimmable control system that shifts lighting scenes automatically from daylight vibrant shopping to intimate evening boutique atmosphere.',
    luminairesUsed: ['Aura Track Spot 24W CRI98', 'Starlight Recessed Micro Downlight', 'Linear Accent Seamless LED Strip'],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'proj-2',
    title: 'The Amber Horizon Private Residence',
    location: 'Islamabad, Pakistan',
    category: 'Residential',
    categorySlug: 'residential',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    client: 'Private Owner',
    year: '2024',
    challenge: 'Illuminate a 14,000 sq ft modern architectural villa featuring double-height marble foyers without creating harsh ceiling clutter or glare.',
    approach: 'Integrated hidden cove wall-washers, warm low-voltage magnetic track channels, and accent glare-free pin-spots tailored specifically for art collections.',
    solution: 'Delivered an ultra-smooth circadian rhythm lighting scheme with 2700K to 1800K warm-dim technology that harmonizes natural travertine stone surfaces.',
    luminairesUsed: ['Linear Architectural Wall Washer 3000K', 'PinSpot Mini Adjustable Downlight', 'Custom Hand-Blown Brass Pendant'],
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'proj-3',
    title: 'Generation Flagship Concept Store',
    location: 'Karachi, Pakistan',
    category: 'Retail',
    categorySlug: 'retail',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    client: 'Generation Pakistan',
    year: '2023',
    challenge: 'Express the brand’s heritage and artisanal roots through dramatic interplay of shadow and focused illumination within an industrial raw concrete shell.',
    approach: 'Used suspended micro-louvers and architectural floodlights designed with honey-comb anti-glare lenses.',
    solution: 'Achieved an eco-efficient 6.8W/m² lighting power density while exceeding luxury retail lux standards.',
    luminairesUsed: ['Honeycomb Architectural Spot 30W', 'Industrial Linear Tube Pendant'],
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'proj-4',
    title: 'State Capital Civic Complex & Facade',
    location: 'Islamabad, Pakistan',
    category: 'Government & Institutional',
    categorySlug: 'government',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
    client: 'Government Infrastructure Directorate',
    year: '2022',
    challenge: 'Illuminate a monumental stone structure with dynamic IP67 exterior architectural grazing lights engineered to withstand harsh weather conditions.',
    approach: 'Precision narrow 8° beam optical floodlights positioned along column pedestals to cast dramatic vertical light columns into night sky.',
    solution: 'Turnkey supply and electrical installation of marine-grade stainless steel IP68 exterior floodlights with centralized DMX lighting management.',
    luminairesUsed: ['FacadeGraze High Output IP67', 'Column Uplight Stainless Steel 48W'],
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'proj-5',
    title: 'Metro Shoes Nationwide Flagship Stores',
    location: 'Multan & Rawalpindi, Pakistan',
    category: 'Commercial & Retail',
    categorySlug: 'commercial',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80',
    client: 'Metro Shoes',
    year: '2023',
    challenge: 'Develop a standardized, energy-efficient lighting blueprint easily reproducible across 25+ retail branches nationwide.',
    approach: 'Designed modular plug-and-play magnetic track lighting bars paired with ultra-high lifespan driver units.',
    solution: 'Reduced ongoing energy maintenance costs by 45% while establishing a signature bright, premium shopping ambiance.',
    luminairesUsed: ['Metro Custom Track Bar 30W', 'Seamless Perimeter Slot Light'],
    gallery: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'proj-6',
    title: 'Shaukat Khanum Memorial Specialty Wing',
    location: 'Peshawar, Pakistan',
    category: 'Healthcare',
    categorySlug: 'healthcare',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    client: 'SKMCH Trust',
    year: '2023',
    challenge: 'Deliver clean, flicker-free anti-microbial illumination in critical clinical zones and soothing, low-glare ambient lighting in patient recovery wards.',
    approach: 'Utilized cleanroom-rated IP65 sealed downlights with UGR < 16 optical diffusers and emergency backup battery integration.',
    solution: 'Full compliance with international medical lighting safety protocols, enhancing caregiver precision and patient recovery visual comfort.',
    luminairesUsed: ['MediClean IP65 UGR<16 Panel', 'Circadian Ward Cove Light'],
    gallery: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'proj-7',
    title: 'Uni Worth Menswear Flagship',
    location: 'Lahore, Pakistan',
    category: 'Retail',
    categorySlug: 'retail',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=80',
    client: 'Uni Worth Dress Company',
    year: '2024',
    challenge: 'Highlight subtle fabric textures, formal suiting weave, and rich leather goods with warm, refined color rendering.',
    approach: 'Precision adjustable 15°–45° zoom spotlights set into dark acoustic ceiling slots.',
    solution: 'Enhanced product appeal resulting in elevated customer dwell times across luxury retail zones.',
    luminairesUsed: ['ZoomSpot Adjustable 28W', 'Dark Light Recessed Downlight'],
    gallery: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'proj-8',
    title: 'Raya Golf & Country Club Landscape',
    location: 'Lahore, Pakistan',
    category: 'Landscape & Outdoor',
    categorySlug: 'outdoor',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    client: 'Defense Housing Authority',
    year: '2023',
    challenge: 'Illuminate sprawling botanical gardens, tree canopies, and water features for night ambience without causing light pollution or dark spots.',
    approach: 'Low-glare in-ground brass uplights, anti-corrosive garden bollards, and submersible IP68 fountain projectors.',
    solution: 'Created an enchanting nighttime oasis while meeting strict outdoor environmental dark-sky standards.',
    luminairesUsed: ['AquaLed Submersible IP68', 'Garden Path Bollard 12W', 'Tree Grazer Spike Light'],
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
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
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Aura Spot Architectural Zoom Downlight',
    category: 'Architectural Lighting',
    categorySlug: 'architectural',
    environment: 'Indoor',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-refined recessed architectural spotlight with continuous mechanical beam angle adjustment from 15° to 50°, UGR<13 anti-glare baffle, and high CRI 98 LED engine.',
    applications: ['Art Galleries', 'Luxury Residences', 'High-End Retail', 'Executive Boardrooms'],
    specs: {
      wattage: '18W / 24W',
      lumenOutput: '1,980 lm',
      colorTemp: '2700K / 3000K / Warm Dim (3000K-1800K)',
      dimensions: 'Ø 95mm x H 115mm (Cutout: Ø 85mm)',
      ipRating: 'IP44',
      optics: 'German Precision Optical Glass Lens',
      material: 'Die-cast Aircraft Grade Aluminum'
    }
  },
  {
    id: 'prod-2',
    name: 'Lumina Linear Wall Washer',
    category: 'Architectural Lighting',
    categorySlug: 'architectural',
    environment: 'Indoor',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    description: 'Seamless ceiling-recessed linear luminaire engineered to cast exceptionally uniform vertical illumination down wall surfaces up to 4.5 meters in height.',
    applications: ['Hotel Lobbies', 'Museum Walls', 'Corridors', 'Feature Marble Walls'],
    specs: {
      wattage: '32W / Meter',
      lumenOutput: '3,200 lm/m',
      colorTemp: '3000K / 4000K',
      dimensions: 'W 55mm x H 75mm (Custom Lengths up to 3m)',
      ipRating: 'IP40',
      optics: 'Asymmetric Optical Reflector',
      material: 'Extruded Anodized Aluminum'
    }
  },
  {
    id: 'prod-3',
    name: 'Vanguard Magnetic Track Profile System',
    category: 'Interior Lighting',
    categorySlug: 'interior',
    environment: 'Indoor',
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80',
    description: 'Low-voltage 48V magnetic track system offering tool-free click-and-lock positioning of accent spotlights, linear frosted modules, and mini pendant lights.',
    applications: ['Modern Living Rooms', 'Boutiques', 'Architectural Studios', 'Showrooms'],
    specs: {
      wattage: '48V DC System (up to 150W total line)',
      lumenOutput: 'Varies by inserted light module',
      colorTemp: '2700K / 3000K / 4000K Tunable White',
      dimensions: 'W 38mm x H 50mm Track Channel',
      ipRating: 'IP20',
      optics: 'Tool-free modular optics',
      material: 'Sleek Matte Black / White Powder Coated Aluminum'
    }
  },
  {
    id: 'prod-4',
    name: 'FacadeGraze IP67 Exterior Projector',
    category: 'Exterior & Facade',
    categorySlug: 'facade',
    environment: 'Outdoor',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy-duty linear exterior floodlight built for architectural facade grazing, highlight columns, historical stone structures, and urban monuments.',
    applications: ['Building Facades', 'Government Monuments', 'Bridge Architecture', 'Hotel Towers'],
    specs: {
      wattage: '48W / 72W',
      lumenOutput: '6,400 lm',
      colorTemp: '3000K / 4000K / RGBW DMX Controllable',
      dimensions: 'L 1000mm x W 65mm x H 80mm',
      ipRating: 'IP67 / IK09 Impact Rated',
      optics: '10° x 60° Elliptical Grazing Optics',
      material: 'Corrosion-Resistant Marine Grade Stainless Steel Bracket'
    }
  },
  {
    id: 'prod-5',
    name: 'Terra Bollard Outdoor Path Luminaire',
    category: 'Landscape & Outdoor',
    categorySlug: 'landscape',
    environment: 'Outdoor',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'Architectural outdoor path bollard casting glare-free downward light onto walkways, gardens, and resort grounds with ZERO light spill into upper sky.',
    applications: ['Resort Gardens', 'Residential Villa Paths', 'Golf Clubs', 'Parks'],
    specs: {
      wattage: '12W CREE LED',
      lumenOutput: '960 lm',
      colorTemp: '2700K / 3000K',
      dimensions: 'Ø 120mm x H 800mm',
      ipRating: 'IP65',
      optics: '180° Downward Louvered Optic',
      material: 'Solid Brass Top / Anodized Bronze Aluminum Post'
    }
  },
  {
    id: 'prod-6',
    name: 'MediClean UGR<16 Anti-Microbial Panel',
    category: 'Commercial & Healthcare',
    categorySlug: 'commercial',
    environment: 'Indoor',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    description: 'Sealed IP65 healthcare and cleanroom panel luminaire with anti-glare micro-prismatic lens, high CRI 95+, and anti-microbial outer frame coating.',
    applications: ['Hospitals', 'Surgical Suites', 'Laboratories', 'Pharmaceutical Plants'],
    specs: {
      wattage: '36W / 45W',
      lumenOutput: '4,950 lm',
      colorTemp: '4000K / 5000K Natural Daylight',
      dimensions: '600mm x 600mm x H 45mm',
      ipRating: 'IP65 Cleanroom Certified',
      optics: 'Micro-prismatic UGR < 16 Glare Baffle',
      material: 'Seamless Anti-Microbial Coated Steel Frame'
    }
  },
  {
    id: 'prod-7',
    name: 'Starlight Crystal Chandelier Collection',
    category: 'Decorative Lighting',
    categorySlug: 'decorative',
    environment: 'Indoor',
    image: 'https://images.unsplash.com/photo-1543198181-e6193202979d?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-assembled statement chandelier featuring precision-cut optical lead crystals integrated with warm low-voltage dimmable LED warm filaments.',
    applications: ['Double-Height Foyers', 'Ballrooms', 'Private Villas', 'Luxury Hotels'],
    specs: {
      wattage: '60W Total (Replaceable G9 LED)',
      lumenOutput: '5,800 lm',
      colorTemp: '2700K Soft Warm Ambient',
      dimensions: 'Ø 1100mm x H 1400mm (Adjustable Drop Cable)',
      ipRating: 'IP20',
      optics: '30% PbO Optical Lead Crystal Elements',
      material: 'Hand-Polished Electroplated Gold Brass'
    }
  },
  {
    id: 'prod-8',
    name: 'AquaLed Submersible IP68 Pool Light',
    category: 'Landscape & Outdoor',
    categorySlug: 'landscape',
    environment: 'Outdoor',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    description: 'Fully underwater rated stainless steel spot projector engineered for swimming pools, water fountains, and luxury outdoor reflective ponds.',
    applications: ['Swimming Pools', 'Water Fountains', 'Resort Water Features'],
    specs: {
      wattage: '18W 24V Low Voltage Safe',
      lumenOutput: '1,800 lm',
      colorTemp: '3000K / RGBW Color Changing',
      dimensions: 'Ø 160mm x Depth 80mm',
      ipRating: 'IP68 Underwater 3 Meters',
      optics: 'Tempered Safety Glass 10mm Lens',
      material: '316L Marine Stainless Steel'
    }
  }
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
  { name: 'Generation', category: 'Fashion Retail', highlight: 'Nationwide Boutiques' },
  { name: 'Metro Shoes', category: 'Commercial Footwear', highlight: '25+ Nationwide Branches' },
  { name: 'Uni Worth', category: 'Menswear Flagships', highlight: 'Luxury Suiting Outlets' },
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
