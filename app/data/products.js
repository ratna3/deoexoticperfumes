// Product data for Deo Exotic Attar & Perfume
// Connects with Neon DB when configured, or provides immediate high-fidelity data
export const products = [
  {
    id: 'royal-oud-attar',
    name: 'Royal Oud Attar',
    category: 'Attar',
    price: 2499,
    originalPrice: 3499,
    image: '/images/Royal-bottle.png',
    gallery: [
      '/images/Royal-bottle.png',
      '/images/exotic-box.png',
      '/images/Treasure-box.png'
    ],
    badge: 'Bestseller',
    featured: true,
    inStock: true,
    size: '12ml',
    sizes: [
      { size: '3ml', price: 999, label: '3ml Sample Vial' },
      { size: '6ml', price: 1699, label: '6ml Crystal Flask' },
      { size: '12ml', price: 2499, label: '12ml Royal Decanter (Recommended)' }
    ],
    tagline: 'Aged Cambodian agarwood crowned with saffron and Kashmiri damask rose.',
    description: 'A majestic blend of aged Cambodian oud, infused with crimson saffron threads and fresh Kashmiri damask rose. This pure concentrated perfume oil captures the prestige of Mughal royal courts. Hand-distilled using the sacred deg-bhapka copper hydro-distillation method, matured in aged camel-hide kupis to achieve sublime depth.',
    story: 'Extracted from resinous heartwood aged for over 25 years, our Royal Oud is harvested responsibly from wild groves in Pursat. It develops a rich, leathery warmth when warmed by your pulse, lingering gracefully from dawn until twilight.',
    notes: {
      top: 'Kashmiri Saffron, Bergamot Zest, Sweet Cardamom',
      heart: 'Cambodian Oud (Heartwood), Rosa Damascena, Geranium',
      base: 'Mysore Sandalwood, Rare Black Ambergris, Deer-free Natural Musk'
    },
    longevity: '16+ hours on skin, 48 hours on natural fabrics',
    sillage: 'Moderate to Intimate — creates an intoxicating personal aura',
    distillation: 'Traditional deg-bhapka hydro-distillation in solid copper stills',
    origin: 'Kannauj & Pursat (Cambodia)',
    alcoholFree: true,
    reviews: [
      { author: 'Farhan A.', rating: 5, date: '12 Oct 2026', comment: 'The depth of oud here is astonishing. Zero alcohol harshness, pure warm honeyed woods and rose. Truly royal.' },
      { author: 'Meera S.', rating: 5, date: '28 Sep 2026', comment: 'Bought the 12ml for my wedding reception. Guests were constantly asking what fragrance I wore.' }
    ]
  },
  {
    id: 'exotic-collection-box',
    name: 'Exotic Collection Coffret',
    category: 'Gift Sets',
    price: 4999,
    originalPrice: 6999,
    image: '/images/exotic-box.png',
    gallery: [
      '/images/exotic-box.png',
      '/images/Treasure-box.png',
      '/images/perfume-mastery-box.png'
    ],
    badge: 'Gift Set',
    featured: true,
    inStock: true,
    size: '5 × 3ml',
    sizes: [
      { size: '5 × 3ml', price: 4999, label: 'Standard 5 × 3ml Coffret' },
      { size: '5 × 6ml', price: 8499, label: 'Grand 5 × 6ml Heritage Edition' }
    ],
    tagline: 'Five signature attars curated in an artisanal gold-embossed keepsake coffret.',
    description: 'An exceptional curation of five distinct olfactory moods, presented in a velvet-lined marbleized keepsake box. Includes Royal Oud, Ruh Gulab, Shamama Al-Amber, Jannat-ul-Firdaus, and White Musk. Designed for connoisseurs seeking the breadth of Indian artisanal perfumery.',
    story: 'Created as a masterwork tribute to Indian fragrance heritage, this coffret allows you to journey through regal woods, ethereal floral valleys, and spicy ancient resins. Each vial is sealed with traditional red lac wax.',
    notes: {
      top: 'Damask Rose petals, Persian Saffron, Lemon Verbena',
      heart: 'Rare Agarwood, Jasmine Sambac, Spiced Shamama',
      base: 'Aged Sandalwood oil, Earthy Vetiver (Khus), Amber'
    },
    longevity: '14+ hours per application',
    sillage: 'Subtle to Radiating',
    distillation: 'Slow slow-fire copper distillation',
    origin: 'Kannauj, Uttar Pradesh',
    alcoholFree: true,
    reviews: [
      { author: 'Karan M.', rating: 5, date: '04 Oct 2026', comment: 'The craftsmanship of the box alone makes it feel like an heirloom. Every single attar inside is a gem.' }
    ]
  },
  {
    id: 'treasure-chest',
    name: 'Imperial Treasure Chest',
    category: 'Gift Sets',
    price: 7999,
    originalPrice: 10999,
    image: '/images/Treasure-box.png',
    gallery: [
      '/images/Treasure-box.png',
      '/images/Royal-bottle.png',
      '/images/exotic-box.png'
    ],
    badge: 'Signature',
    featured: true,
    inStock: true,
    size: '3 × 6ml',
    sizes: [
      { size: '3 × 6ml', price: 7999, label: 'Solid Teak Wood Chest (3 × 6ml)' }
    ],
    tagline: 'Hand-carved brass filigree chest housing three crystal cut flacons of reserve attars.',
    description: 'An ornate handcrafted treasure chest housing three cut-crystal decanters with brass dipsticks. Filled with our most prized reserve distillations: 30-Year Vintage Assam Oud, Dehn Al Oudh Qadeem, and Pure Ruh Khus distilled over Mysore sandalwood.',
    story: 'Handcrafted by master woodworkers in Saharanpur with solid brass corners and velvet cushioning. A centerpiece that transforms fragrance into a ceremonial daily ritual.',
    notes: {
      top: 'Crisp Vetiver Root, Wild Orange Blossom',
      heart: 'Aged Assam Oud, Black Rose, Sacred Frankincense',
      base: 'Vintage Sandalwood 1998, Golden Amber, Labdanum'
    },
    longevity: '24+ hours',
    sillage: 'Regal, enveloping and serene',
    distillation: 'Reserved 1998 & 2012 deg distillations',
    origin: 'Kannauj & Upper Assam',
    alcoholFree: true,
    reviews: [
      { author: 'Rajiv V.', rating: 5, date: '18 Sep 2026', comment: 'An unbelievable presentation. The Assam Oud vintage has the deepest balsamic leather profile I have ever smelled.' }
    ]
  },
  {
    id: 'perfume-mastery-set',
    name: 'Perfume Mastery Coffret',
    category: 'Gift Sets',
    price: 3999,
    originalPrice: 5499,
    image: '/images/perfume-mastery-box.png',
    gallery: [
      '/images/perfume-mastery-box.png',
      '/images/smallround-box.png'
    ],
    badge: 'Artisan Choice',
    featured: true,
    inStock: true,
    size: '5 × 3ml',
    sizes: [
      { size: '5 × 3ml', price: 3999, label: 'Curated 5 × 3ml Collector Box' }
    ],
    tagline: 'Hand-carved rosewood keepsake box with five concentrated attar vials.',
    description: 'A curated rosewood keepsake box displaying five concentrated attar vials with precision glass applicators. Hand-carved floral jali latticework on polished Sheesham wood ensures each box is a singular work of decorative art.',
    story: 'Curated specifically for fragrance blending and layering. Includes individual pairing cards explaining how to combine floral headnotes over resinous oud bases for a bespoke personal signature.',
    notes: {
      top: 'Sparkling Bergamot, White Jasmine, Neroli',
      heart: 'Taif Rose, Kashmiri Cardamom, Clove Bud',
      base: 'Indian Vetiver, Australian Sandalwood, Cashmere Wood'
    },
    longevity: '12 to 14 hours',
    sillage: 'Refined and intimate',
    distillation: 'Copper deg hydro-distillation',
    origin: 'Kannauj & Saharanpur',
    alcoholFree: true,
    reviews: [
      { author: 'Ananya D.', rating: 5, date: '01 Oct 2026', comment: 'The layering guide included was so helpful. Layering the Jasmine with the Sandalwood is sheer heaven.' }
    ]
  },
  {
    id: 'golden-round-attar',
    name: 'Golden Round Vintage Attar',
    category: 'Attar',
    price: 1999,
    originalPrice: 2799,
    image: '/images/smallround-box.png',
    gallery: [
      '/images/smallround-box.png',
      '/images/Royal-bottle.png'
    ],
    badge: 'Heritage',
    featured: true,
    inStock: true,
    size: '6ml',
    sizes: [
      { size: '3ml', price: 1199, label: '3ml Purse Flask' },
      { size: '6ml', price: 1999, label: '6ml Velvet Casket' },
      { size: '12ml', price: 3499, label: '12ml Crystal Vial' }
    ],
    tagline: 'Encased in a burgundy velvet casket with an ornate antique brass clasp.',
    description: 'Presented in a burgundy wood case with ornate brass clasp, this golden round attar bottle holds our signature blend of sweet honeyed amber, dark woods, and night-blooming jasmine that warms and deepens on your skin throughout the day.',
    story: 'Inspired by 18th-century royal travel vials designed to keep precious oils safe from light and ambient temperature swings. Each flacon is individually filled and inspected.',
    notes: {
      top: 'Golden Amber Resin, Sicilian Bergamot',
      heart: 'Night-blooming Jasmine, Turkish Rose, Nutmeg',
      base: 'Smoky Cedarwood, White Patchouli, Bourbon Vanilla'
    },
    longevity: '14+ hours',
    sillage: 'Medium warmth aura',
    distillation: 'Direct wood-fire alembic still',
    origin: 'Kannauj, India',
    alcoholFree: true,
    reviews: [
      { author: 'Tariq H.', rating: 5, date: '22 Aug 2026', comment: 'Warm, comforting, and wonderfully rich. The amber and vanilla drydown is intoxicating.' }
    ]
  },
  {
    id: 'premium-dhoop-cones',
    name: 'Artisanal Natural Dhoop Cones',
    category: 'Dhoop',
    price: 499,
    originalPrice: 699,
    image: '/images/dhoop-cones.jpg',
    gallery: [
      '/images/dhoop-cones.jpg',
      '/images/exotic-box.png'
    ],
    badge: 'Bestseller',
    featured: true,
    inStock: true,
    size: '20 Cones',
    sizes: [
      { size: '20 Cones', price: 499, label: '20 Cones Standard Tin' },
      { size: '50 Cones', price: 999, label: '50 Cones Heritage Wooden Jar' }
    ],
    tagline: '100% charcoal-free cones hand-kneaded with pure sandalwood, guggal, and natural herbs.',
    description: 'Slow-burning, 100% natural and charcoal-free dhoop cones hand-kneaded with dried flower petals, pure sandalwood powder, raw guggal resin, and essential attar extracts. Releases thick, soothing, sacred aromatics without any chemical smoke or choking odor.',
    story: 'Crafted according to classical Vedic Dhoop formulations used in temples for sanctification, meditation, and purification. Each cone burns evenly for approximately 45 minutes.',
    notes: {
      top: 'Camphor, Sweet Basil, Tulsi leaves',
      heart: 'Pure Mysore Sandalwood powder, Rose Petals',
      base: 'Natural Guggal, Loban (Frankincense), Benzoin Resin'
    },
    longevity: '45 mins burn time, lingering aroma for 6+ hours',
    sillage: 'Room-filling, meditative and peaceful',
    distillation: 'Sun-dried raw botanical paste',
    origin: 'Varanasi & Kannauj',
    alcoholFree: true,
    reviews: [
      { author: 'Sunita P.', rating: 5, date: '14 Oct 2026', comment: 'Completely chemical free! Unlike commercial incense, this does not irritate eyes or lungs. Pure divinity.' }
    ]
  },
  {
    id: 'jannat-ul-firdaus',
    name: 'Jannat-ul-Firdaus Pure Attar',
    category: 'Attar',
    price: 1499,
    originalPrice: 1999,
    image: '/images/Royal-bottle.png',
    gallery: [
      '/images/Royal-bottle.png',
      '/images/smallround-box.png'
    ],
    badge: 'Classic',
    featured: false,
    inStock: true,
    size: '12ml',
    sizes: [
      { size: '6ml', price: 899, label: '6ml Traditional Vial' },
      { size: '12ml', price: 1499, label: '12ml Signature Bottle' }
    ],
    tagline: 'The timeless emerald celestial garden blend: fresh herbs, blooming jasmine, and musks.',
    description: 'The legendary green floral attar meaning "Garden of Paradise". A masterwork harmony of crisp green botanical notes, white lilies, blooming jasmine sambac, and a velvety clean white musk base that revitalizes the spirit.',
    story: 'Worn across royal courts of Lucknow and Hyderabad, Jannat-ul-Firdaus remains one of the most beloved traditional fragrances for its uplifting, cooling, and serene character.',
    notes: {
      top: 'Green herbs, Wild Fern, Mint Crisp',
      heart: 'White Lily of the Valley, Jasmine Sambac, Carnation',
      base: 'Clean White Musk, Sandalwood Base, Earth Moss'
    },
    longevity: '12+ hours',
    sillage: 'Fresh, airy and uplifting',
    distillation: 'Traditional hydro-distillation',
    origin: 'Kannauj, India',
    alcoholFree: true,
    reviews: [
      { author: 'Zubair K.', rating: 5, date: '08 Oct 2026', comment: 'Crisp, refreshing, and clean. Perfect for morning prayers and warm sunny days.' }
    ]
  },
  {
    id: 'shamama-blend',
    name: 'Vintage Shamama Tul Amber',
    category: 'Attar',
    price: 3499,
    originalPrice: 4499,
    image: '/images/smallround-box.png',
    gallery: [
      '/images/smallround-box.png',
      '/images/Royal-bottle.png'
    ],
    badge: 'Rare Reserve',
    featured: false,
    inStock: true,
    size: '6ml',
    sizes: [
      { size: '3ml', price: 1999, label: '3ml Rare Tasting Flacon' },
      { size: '6ml', price: 3499, label: '6ml Velvet Lined Vial' },
      { size: '12ml', price: 6299, label: '12ml Master Distiller Decanter' }
    ],
    tagline: 'Over 40 rare botanicals, wild herbs, and spices distilled over sandalwood for 30 continuous days.',
    description: 'The crown jewel of Indian perfumery science. Over 40 wild mountain herbs, roots, saffron, and spices are distilled in successive layers into pure sandalwood oil over an entire month. Warm, spicy, earthy, and profound.',
    story: 'Only three families in Kannauj still possess the ancestral formula and copper apparatus to produce authentic Shamama. It changes continuously on the skin over 12 hours.',
    notes: {
      top: 'Nutmeg, Black Pepper, Himalayan Juniper',
      heart: 'Saffron, Clove, Damask Rose, Sugandh Mantri',
      base: 'Mysore Sandalwood, Dark Amber, Patchouli, Nagarmotha'
    },
    longevity: '24+ hours',
    sillage: 'Profound and sacred warmth',
    distillation: '30-day continuous Deg hydro-distillation',
    origin: 'Kannauj, Uttar Pradesh',
    alcoholFree: true,
    reviews: [
      { author: 'Vikramaditya R.', rating: 5, date: '29 Sep 2026', comment: 'A collector’s dream. The complexity here is unmatched by any European niche perfume.' }
    ]
  }
];

export function getProductById(id) {
  return products.find(p => p.id === id) || null;
}

export function getProductsByCategory(category) {
  if (!category || category === 'All') return products;
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

export function getCategories() {
  return ['All', ...new Set(products.map(p => p.category))];
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}
