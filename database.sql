-- =====================================================
-- CARPET HOME - DATABASE SCHEMA FOR SUPABASE
-- قم بنسخ هذا الكود ولصقه في SQL Editor في Supabase
-- =====================================================

-- 1. جدول المنتجات
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  category VARCHAR(100),
  description_ar TEXT,
  description_en TEXT,
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. جدول صور المنتجات
CREATE TABLE IF NOT EXISTS product_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. جدول المعرض
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar VARCHAR(255),
  title_en VARCHAR(255),
  image_url TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'عام',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. جدول الفيديوهات
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar VARCHAR(255) NOT NULL,
  title_en VARCHAR(255),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. جدول آراء العملاء
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_country VARCHAR(100),
  customer_image TEXT,
  content_ar TEXT NOT NULL,
  content_en TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. جدول الأسئلة الشائعة
CREATE TABLE IF NOT EXISTS faq (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_ar TEXT NOT NULL,
  question_en TEXT,
  answer_ar TEXT NOT NULL,
  answer_en TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. جدول رسائل التواصل
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. جدول إعدادات الموقع
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) - أمان البيانات
-- =====================================================

-- تفعيل RLS لجميع الجداول
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- سياسات القراءة للجميع
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read product_images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Allow public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read videos" ON videos FOR SELECT USING (true);
CREATE POLICY "Allow public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read faq" ON faq FOR SELECT USING (true);
CREATE POLICY "Allow public read site_settings" ON site_settings FOR SELECT USING (true);

-- سياسات الإدراج للجميع (للأدمن)
CREATE POLICY "Allow public insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert product_images" ON product_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert gallery" ON gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert videos" ON videos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert testimonials" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert faq" ON faq FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert site_settings" ON site_settings FOR INSERT WITH CHECK (true);

-- سياسات التحديث للجميع
CREATE POLICY "Allow public update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow public update product_images" ON product_images FOR UPDATE USING (true);
CREATE POLICY "Allow public update gallery" ON gallery FOR UPDATE USING (true);
CREATE POLICY "Allow public update videos" ON videos FOR UPDATE USING (true);
CREATE POLICY "Allow public update testimonials" ON testimonials FOR UPDATE USING (true);
CREATE POLICY "Allow public update faq" ON faq FOR UPDATE USING (true);
CREATE POLICY "Allow public update contact_messages" ON contact_messages FOR UPDATE USING (true);
CREATE POLICY "Allow public update site_settings" ON site_settings FOR UPDATE USING (true);

-- سياسات الحذف للجميع
CREATE POLICY "Allow public delete products" ON products FOR DELETE USING (true);
CREATE POLICY "Allow public delete product_images" ON product_images FOR DELETE USING (true);
CREATE POLICY "Allow public delete gallery" ON gallery FOR DELETE USING (true);
CREATE POLICY "Allow public delete videos" ON videos FOR DELETE USING (true);
CREATE POLICY "Allow public delete testimonials" ON testimonials FOR DELETE USING (true);
CREATE POLICY "Allow public delete faq" ON faq FOR DELETE USING (true);
CREATE POLICY "Allow public delete contact_messages" ON contact_messages FOR DELETE USING (true);
CREATE POLICY "Allow public delete site_settings" ON site_settings FOR DELETE USING (true);

-- =====================================================
-- STORAGE BUCKETS - تخزين الملفات
-- =====================================================
-- ملاحظة: قم بإنشاء هذه الـ buckets يدوياً من لوحة تحكم Supabase
-- Storage > New Bucket
-- 1. product-images (Public)
-- 2. gallery (Public)
-- اجعلها Public عند الإنشاء

-- =====================================================
-- بيانات تجريبية (اختياري)
-- =====================================================

-- إضافة بعض الأسئلة الشائعة
INSERT INTO faq (question_ar, answer_ar, sort_order) VALUES
('ما هي مدة الشحن؟', 'الشحن يستغرق من 7-15 يوم عمل حسب الدولة.', 1),
('هل يوجد ضمان على المنتجات؟', 'نعم، جميع منتجاتنا مضمونة لمدة سنتين ضد عيوب الصناعة.', 2),
('ما هي طرق الدفع المتاحة؟', 'نقبل التحويل البنكي، الدفع عند الاستلام، وبطاقات الائتمان.', 3),
('هل يمكن طلب مقاسات خاصة؟', 'نعم، نوفر خدمة التصنيع حسب الطلب بالمقاسات التي تحتاجها.', 4);

-- إضافة بعض آراء العملاء
INSERT INTO testimonials (customer_name, customer_country, content_ar, rating) VALUES
('أحمد محمد', 'السعودية', 'جودة استثنائية وخدمة ممتازة. السجاد وصل بحالة ممتازة وبالضبط كما في الصور.', 5),
('فاطمة علي', 'الإمارات', 'أفضل سجاد اشتريته. الألوان رائعة والجودة عالية جداً.', 5),
('محمد خالد', 'الكويت', 'تعامل راقي وأسعار منافسة. أنصح بالتعامل معهم بشدة.', 5);

-- إضافة فيديو
INSERT INTO videos (title_ar, url) VALUES
('جولة في معمل الإنتاج', 'https://youtube.com/shorts/DSyyQwGNQ-Q');

-- =====================================================
-- انتهى! 
-- تأكد من إنشاء Storage Buckets يدوياً:
-- 1. product-images (Public bucket)
-- 2. gallery (Public bucket)
-- =====================================================
