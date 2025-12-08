-- PART 3: STORAGE POLICIES
-- Run this THIRD (after buckets are created manually)
-- Make sure you have created these buckets as PUBLIC:
-- 1. product-images
-- 2. gallery

-- Storage policies for product-images bucket
CREATE POLICY "Allow public read product-images" ON storage.objects 
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Allow public upload product-images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public update product-images" ON storage.objects 
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Allow public delete product-images" ON storage.objects 
FOR DELETE USING (bucket_id = 'product-images');

-- Storage policies for gallery bucket
CREATE POLICY "Allow public read gallery-bucket" ON storage.objects 
FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Allow public upload gallery-bucket" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Allow public update gallery-bucket" ON storage.objects 
FOR UPDATE USING (bucket_id = 'gallery');

CREATE POLICY "Allow public delete gallery-bucket" ON storage.objects 
FOR DELETE USING (bucket_id = 'gallery');
