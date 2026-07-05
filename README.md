# DİES BUNGALOV Web Sitesi

Premium algı, güven veren rezervasyon dili, Instagram medya arşivi ve WhatsApp dönüşümü odaklı Next.js web sitesi.

## Teknoloji

- Next.js App Router
- TypeScript strict
- Tailwind CSS
- Supabase PostgreSQL ve Storage
- Server Actions
- Zod validasyon
- lucide-react ikonları
- `next/image`
- Sitemap, robots, SEO metadata ve JSON-LD

## Kurulum

```bash
npm install
npm run dev
```

Site: `http://localhost:3000`

Admin: `http://localhost:3000/admin`

Development varsayılan admin girişi:

```txt
admin@dies.local
dies-admin
```

Production için `.env` içinde mutlaka `ADMIN_EMAIL`, `ADMIN_PASSWORD` ve `ADMIN_SESSION_SECRET` tanımlayın.

## Env Ayarları

`.env.example` dosyasını `.env.local` olarak kopyalayın.

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
NEXT_PUBLIC_GA_ID=
```

`SUPABASE_SERVICE_ROLE_KEY` sadece server tarafında kullanılır. Client tarafına sızdırmayın.

## Medya

Mevcut Instagram fotoğraf ve videoları lokal hazırlık için şu klasörden okunur:

```txt
public/insta/posts
```

Manifest üretmek için:

```bash
npm run media:manifest
```

Bu komut:

- `src/data/local-media.ts` dosyasını üretir.
- `public/media/manifest.json` dosyasını üretir.
- JPG/PNG/WebP dosyalarını fotoğraf, MP4/MOV dosyalarını video olarak işler.
- İlk videoyu hero medya, ilk 12 medyayı öne çıkan medya yapar.

Admin panelden daha sonra kategori, başlık, alt metin, hero ve öne çıkarma durumları düzenlenebilir.

Canlı ortamda medya dosyaları GitHub/Vercel repo’sunda tutulmaz. İlk yükleme için `.env.local`
Supabase değerleri doluyken şu komutu çalıştırın:

```bash
npm run media:upload
```

Bu komut `dies-media` bucket’ına dosyaları yükler ve `media_items` tablosunu Supabase public
URL’leriyle günceller.

## Supabase Kurulumu

1. Supabase projesi oluşturun.
2. `.env.local` içine URL, anon key ve service role key değerlerini girin.
3. Migration çalıştırın:

```bash
supabase db push
```

veya SQL editor içinde `supabase/migrations/001_initial_schema.sql` dosyasını çalıştırın.

4. Seed verisini isterseniz SQL editor içinde çalıştırın:

```txt
supabase/seed.sql
```

5. Storage bucket:

```txt
dies-media
```

Migration bucket’ı public olarak oluşturmayı dener. Supabase panelinden kontrol edin.

## Admin Panel

Admin panelde:

- Medya ekleme ve düzenleme
- Hero ve öne çıkan medya seçimi
- Site ayarları
- Ana sayfa metinleri
- Özellik yönetimi
- SSS yönetimi
- Misafir yorumu yönetimi

Supabase env yoksa admin kayıtları `.local-data/dies-content.json` dosyasına yazılır. Bu development kolaylığı içindir. Production için Supabase kullanın.

## WhatsApp

WhatsApp URL üretimi `src/lib/whatsapp.ts` içinde merkezidir. Telefon numarası admin ayarlarından yönetilir.

Varsayılan numara placeholder:

```txt
90XXXXXXXXXX
```

Canlıya almadan önce gerçek resmi WhatsApp numarası girilmelidir.

## SEO

Metadata `src/lib/seo.ts` üzerinden üretilir.

Public route’lar:

- `/`
- `/galeri`
- `/bungalov`
- `/deneyimler`
- `/konum`
- `/sss`
- `/iletisim`

Sitemap: `/sitemap.xml`

Robots: `/robots.txt`

## Build

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy

Vercel önerilir.

Vercel ortam değişkenleri:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## Bilinen TODO

- Supabase Auth e-posta/şifre akışı sonraki fazda cookie tabanlı geçici admin auth yerine geçirilebilir.
- Video poster üretimi otomatik değil; admin panelde poster URL manuel girilebilir.
- Instagram medya kategorileri ilk üretimde `details` ağırlıklıdır; admin panelden tek tek düzenlenmelidir.
