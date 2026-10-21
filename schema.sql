-- ====================================================================
-- DEO EXOTIC ATTAR & PERFUME — Neon Database Schema
-- Ready to run directly in Neon SQL Editor (PostgreSQL)
-- ====================================================================

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    image VARCHAR(500) NOT NULL,
    badge VARCHAR(50),
    featured BOOLEAN DEFAULT false,
    in_stock BOOLEAN DEFAULT true,
    size VARCHAR(50) NOT NULL,
    tagline TEXT,
    description TEXT,
    story TEXT,
    notes_top TEXT,
    notes_heart TEXT,
    notes_base TEXT,
    longevity VARCHAR(100),
    sillage VARCHAR(100),
    distillation VARCHAR(255),
    origin VARCHAR(255),
    alcohol_free BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    shipping_address TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    items_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial products
INSERT INTO products (id, name, category, price, original_price, image, badge, featured, in_stock, size, tagline, description, notes_top, notes_heart, notes_base)
VALUES 
('royal-oud-attar', 'Royal Oud Attar', 'Attar', 2499, 3499, '/images/Royal-bottle.png', 'Bestseller', true, true, '12ml', 'Aged Cambodian agarwood crowned with saffron and Kashmiri damask rose.', 'A majestic blend of aged Cambodian oud, infused with saffron and rose.', 'Kashmiri Saffron, Bergamot Zest', 'Cambodian Oud, Rosa Damascena', 'Mysore Sandalwood, Natural Musk'),
('exotic-collection-box', 'Exotic Collection Coffret', 'Gift Sets', 4999, 6999, '/images/exotic-box.png', 'Gift Set', true, true, '5 × 3ml', 'Five signature attars curated in an artisanal gold-embossed keepsake coffret.', 'An exceptional curation of five distinct olfactory moods.', 'Damask Rose, Persian Saffron', 'Rare Agarwood, Jasmine Sambac', 'Aged Sandalwood oil, Earthy Vetiver'),
('treasure-chest', 'Imperial Treasure Chest', 'Gift Sets', 7999, 10999, '/images/Treasure-box.png', 'Signature', true, true, '3 × 6ml', 'Hand-carved brass filigree chest housing three crystal cut flacons of reserve attars.', 'An ornate handcrafted treasure chest housing three cut-crystal decanters.', 'Crisp Vetiver Root', 'Aged Assam Oud, Black Rose', 'Vintage Sandalwood 1998, Golden Amber'),
('perfume-mastery-set', 'Perfume Mastery Coffret', 'Gift Sets', 3999, 5499, '/images/perfume-mastery-box.png', 'Artisan Choice', true, true, '5 × 3ml', 'Hand-carved rosewood keepsake box with five concentrated attar vials.', 'Curated rosewood keepsake box displaying five concentrated attar vials.', 'Sparkling Bergamot, White Jasmine', 'Taif Rose, Kashmiri Cardamom', 'Indian Vetiver, Australian Sandalwood'),
('golden-round-attar', 'Golden Round Vintage Attar', 'Attar', 1999, 2799, '/images/smallround-box.png', 'Heritage', true, true, '6ml', 'Encased in a burgundy velvet casket with an ornate antique brass clasp.', 'Presented in a burgundy wood case with ornate brass clasp.', 'Golden Amber Resin, Bergamot', 'Night-blooming Jasmine, Turkish Rose', 'Smoky Cedarwood, White Patchouli'),
('premium-dhoop-cones', 'Artisanal Natural Dhoop Cones', 'Dhoop', 499, 699, '/images/dhoop-cones.jpg', 'Bestseller', true, true, '20 Cones', '100% charcoal-free cones hand-kneaded with pure sandalwood and guggal.', 'Slow-burning, 100% natural and charcoal-free dhoop cones.', 'Camphor, Sweet Basil, Tulsi', 'Pure Mysore Sandalwood powder', 'Natural Guggal, Loban Resin'),
('jannat-ul-firdaus', 'Jannat-ul-Firdaus Pure Attar', 'Attar', 1499, 1999, '/images/Royal-bottle.png', 'Classic', false, true, '12ml', 'The timeless emerald celestial garden blend: fresh herbs, blooming jasmine, and musks.', 'The legendary green floral attar meaning Garden of Paradise.', 'Green herbs, Wild Fern', 'White Lily, Jasmine Sambac', 'Clean White Musk, Sandalwood Base'),
('shamama-blend', 'Vintage Shamama Tul Amber', 'Attar', 3499, 4499, '/images/smallround-box.png', 'Rare Reserve', false, true, '6ml', 'Over 40 rare botanicals, wild herbs, and spices distilled over sandalwood.', 'Crown jewel of Indian perfumery science.', 'Nutmeg, Black Pepper', 'Saffron, Clove, Damask Rose', 'Mysore Sandalwood, Dark Amber')
ON CONFLICT (id) DO NOTHING;
