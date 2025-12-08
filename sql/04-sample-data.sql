-- PART 4: SAMPLE DATA (OPTIONAL)
-- Run this LAST if you want sample data

-- Sample FAQ
INSERT INTO faq (question_ar, answer_ar, sort_order) VALUES
('What is the shipping time?', 'Shipping takes 7-15 business days depending on the country.', 1),
('Is there a warranty?', 'Yes, all our products have a 2-year warranty against manufacturing defects.', 2),
('What payment methods are available?', 'We accept bank transfer, cash on delivery, and credit cards.', 3),
('Can I order custom sizes?', 'Yes, we offer custom manufacturing service with the sizes you need.', 4);

-- Sample testimonials
INSERT INTO testimonials (customer_name, customer_country, content_ar, rating) VALUES
('Ahmed Mohammed', 'Saudi Arabia', 'Exceptional quality and excellent service.', 5),
('Fatima Ali', 'UAE', 'Best carpet I have ever bought.', 5),
('Mohammed Khaled', 'Kuwait', 'Great quality and competitive prices.', 5);

-- Sample video
INSERT INTO videos (title_ar, url) VALUES
('Factory Tour', 'https://youtube.com/shorts/DSyyQwGNQ-Q');
