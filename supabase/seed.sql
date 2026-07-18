insert into site_settings (key, value)
values
  ('brand', '{
    "name": "DİES BUNGALOV",
    "logoUrl": "/insta/posts/18047115356088151.jpg",
    "location": "Sapanca, Sakarya",
    "slogan": "Sapanca’da Size Özel Premium Bungalov Deneyimi",
    "description": "DİES BUNGALOV; Sapanca’da özel havuz, jakuzi, ateş çukuru, barbekü ve doğa manzarasıyla çiftler, özel günler ve sakin kaçamaklar için premium bungalov deneyimi sunar."
  }'::jsonb),
  ('contact', '{
    "phone": "",
    "whatsappPhone": "905403040054",
    "email": "",
    "instagramUrl": "https://www.instagram.com/diesbungalovsapanca",
    "mapsUrl": ""
  }'::jsonb),
  ('seo', '{
    "title": "DİES BUNGALOV Sapanca | Isıtmalı Havuzlu ve Jakuzili Premium Bungalov",
    "description": "DİES BUNGALOV Sapanca’da ısıtmalı havuz, jakuzi, ateş çukuru, barbekü ve doğa manzarasıyla premium bungalov konaklama deneyimi sunar. Müsaitlik ve fiyat için WhatsApp’tan bilgi alın.",
    "keywords": ["Sapanca bungalov", "Sapanca jakuzili bungalov", "Sapanca ısıtmalı havuzlu bungalov"],
    "ogImage": "/media/fallback/dies-hero-fallback.png"
  }'::jsonb)
on conflict (key) do update set value = excluded.value;

insert into features (title, description, icon, is_active, is_featured, sort_order)
values
  ('Isıtmalı Havuz', 'Soğuk havalarda bile konforlu havuz keyfi. Gündüz doğa manzarası, gece ışıklarla özel atmosfer.', 'Waves', true, true, 1),
  ('Jakuzi', 'Günün yorgunluğunu atacağınız, tamamen size özel rahatlama alanı.', 'Bath', true, true, 2),
  ('Ateş Çukuru', 'Akşam saatlerinde kahvenizi alıp ateş başında sakin bir Sapanca gecesi.', 'Flame', true, true, 3),
  ('Barbekü', 'Konaklamanızı keyifli bir akşam yemeği deneyimine dönüştüren özel alan.', 'Utensils', true, false, 4),
  ('Yerden Isıtma', 'Kış aylarında sıcak ve konforlu iç mekân deneyimi.', 'ThermometerSun', true, false, 5),
  ('Doğa / Vadi Manzarası', 'Kalabalıktan uzak, doğaya bakan huzurlu bir atmosfer.', 'Trees', true, true, 6),
  ('Wi-Fi & TV', 'Doğanın içinde kalırken temel konforlardan uzak kalmayın.', 'Wifi', true, false, 7),
  ('Otopark', 'Konaklama boyunca aracınız için rahat park imkânı.', 'ParkingCircle', true, false, 8);

insert into faqs (question, answer, category, is_active, sort_order)
values
  ('Giriş saati kaç?', 'Giriş saati rezervasyon sırasında misafire yazılı olarak iletilir.', 'Rezervasyon', true, 1),
  ('Çıkış saati kaç?', 'Çıkış saati rezervasyon sırasında misafire yazılı olarak iletilir.', 'Rezervasyon', true, 2),
  ('Havuz ısıtmalı mı?', 'DİES BUNGALOV’da havuz kullanımı ve ısıtma durumu dönemsel koşullara göre rezervasyon öncesinde net olarak iletilir.', 'Konaklama', true, 3),
  ('Kahvaltı dahil mi?', 'Kahvaltı bilgisi ve varsa ek hizmetler rezervasyon öncesinde WhatsApp üzerinden yazılı olarak netleştirilir.', 'Rezervasyon', true, 4),
  ('Evcil hayvan kabul ediliyor mu?', 'Evcil hayvan kabul durumu seçilen tarih ve tesis koşullarına göre rezervasyon öncesinde net olarak iletilir.', 'Rezervasyon', true, 5),
  ('Kaç kişi konaklayabilir?', 'Kapasite bilgisi seçilen tarih ve konaklama düzenine göre WhatsApp üzerinden netleştirilir.', 'Rezervasyon', true, 6),
  ('WiFi var mı?', 'Konaklama alanında Wi-Fi ve TV imkânı bulunmaktadır.', 'Konaklama', true, 7),
  ('Jakuzi özel mi?', 'Jakuzi konaklama alanı içinde misafirlerin özel kullanımına yönelik olarak sunulur.', 'Konaklama', true, 8),
  ('Barbekü kullanılabiliyor mu?', 'Uygun hava ve tesis kuralları çerçevesinde barbekü alanı kullanılabilir.', 'Konaklama', true, 9),
  ('Otopark var mı?', 'Misafirler için otopark imkânı bulunmaktadır.', 'Ulaşım', true, 10),
  ('Rezervasyon nasıl yapılır?', 'Tarih ve kişi sayınızı WhatsApp üzerinden ilettiğinizde müsaitlik, fiyat ve rezervasyon koşulları size yazılı olarak aktarılır.', 'Rezervasyon', true, 11),
  ('Kapora / ödeme süreci nasıl ilerliyor?', 'Ödeme ve kapora bilgileri rezervasyon öncesinde resmi iletişim hattı üzerinden net ve yazılı şekilde paylaşılır.', 'Rezervasyon', true, 12),
  ('Konum bilgisi ne zaman paylaşılır?', 'Genel lokasyon bilgisi web sitesinde yer alır. Detaylı konum bilgisi rezervasyon sürecinde paylaşılır.', 'Ulaşım', true, 13);
