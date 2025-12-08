-- PART 2: ROW LEVEL SECURITY
-- Run this SECOND (after tables are created)

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- DROP existing policies if any (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read products" ON products;
DROP POLICY IF EXISTS "Allow public insert products" ON products;
DROP POLICY IF EXISTS "Allow public update products" ON products;
DROP POLICY IF EXISTS "Allow public delete products" ON products;

DROP POLICY IF EXISTS "Allow public read product_images" ON product_images;
DROP POLICY IF EXISTS "Allow public insert product_images" ON product_images;
DROP POLICY IF EXISTS "Allow public update product_images" ON product_images;
DROP POLICY IF EXISTS "Allow public delete product_images" ON product_images;

DROP POLICY IF EXISTS "Allow public read gallery" ON gallery;
DROP POLICY IF EXISTS "Allow public insert gallery" ON gallery;
DROP POLICY IF EXISTS "Allow public update gallery" ON gallery;
DROP POLICY IF EXISTS "Allow public delete gallery" ON gallery;

DROP POLICY IF EXISTS "Allow public read videos" ON videos;
DROP POLICY IF EXISTS "Allow public insert videos" ON videos;
DROP POLICY IF EXISTS "Allow public update videos" ON videos;
DROP POLICY IF EXISTS "Allow public delete videos" ON videos;

DROP POLICY IF EXISTS "Allow public read testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow public insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow public update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow public delete testimonials" ON testimonials;

DROP POLICY IF EXISTS "Allow public read faq" ON faq;
DROP POLICY IF EXISTS "Allow public insert faq" ON faq;
DROP POLICY IF EXISTS "Allow public update faq" ON faq;
DROP POLICY IF EXISTS "Allow public delete faq" ON faq;

DROP POLICY IF EXISTS "Allow public read contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public insert contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public update contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public delete contact_messages" ON contact_messages;

DROP POLICY IF EXISTS "Allow public read site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public insert site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public update site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public delete site_settings" ON site_settings;

-- Products policies
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete products" ON products FOR DELETE USING (true);

-- Product images policies
CREATE POLICY "Allow public read product_images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Allow public insert product_images" ON product_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update product_images" ON product_images FOR UPDATE USING (true);
CREATE POLICY "Allow public delete product_images" ON product_images FOR DELETE USING (true);

-- Gallery policies
CREATE POLICY "Allow public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public insert gallery" ON gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update gallery" ON gallery FOR UPDATE USING (true);
CREATE POLICY "Allow public delete gallery" ON gallery FOR DELETE USING (true);

-- Videos policies
CREATE POLICY "Allow public read videos" ON videos FOR SELECT USING (true);
CREATE POLICY "Allow public insert videos" ON videos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update videos" ON videos FOR UPDATE USING (true);
CREATE POLICY "Allow public delete videos" ON videos FOR DELETE USING (true);

-- Testimonials policies
CREATE POLICY "Allow public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public insert testimonials" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update testimonials" ON testimonials FOR UPDATE USING (true);
CREATE POLICY "Allow public delete testimonials" ON testimonials FOR DELETE USING (true);

-- FAQ policies
CREATE POLICY "Allow public read faq" ON faq FOR SELECT USING (true);
CREATE POLICY "Allow public insert faq" ON faq FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update faq" ON faq FOR UPDATE USING (true);
CREATE POLICY "Allow public delete faq" ON faq FOR DELETE USING (true);

-- Contact messages policies
CREATE POLICY "Allow public read contact_messages" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update contact_messages" ON contact_messages FOR UPDATE USING (true);
CREATE POLICY "Allow public delete contact_messages" ON contact_messages FOR DELETE USING (true);

-- Site settings policies
CREATE POLICY "Allow public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public insert site_settings" ON site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update site_settings" ON site_settings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete site_settings" ON site_settings FOR DELETE USING (true);
