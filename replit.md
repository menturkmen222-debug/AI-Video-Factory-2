# AI Video Uploader - Cloudflare Worker

## Overview
Bu loyiha Cloudflare Worker yordamida videolarni bir nechta ijtimoiy tarmoq platformalariga avtomatik yuklash uchun yaratilgan AI quvvatli tizimdir.

## Loyiha maqsadi
- Videolarni Cloudinary orqali saqlash
- Groq AI yordamida avtomatik metadata (title, description, tags) yaratish
- YouTube, TikTok, Instagram va Facebook platformalariga yuklash
- Har bir kanal uchun kunlik 50 ta limit bilan ishlash
- To'liq logging va monitoring

## Texnologiyalar
- **Runtime**: Cloudflare Workers
- **Language**: TypeScript
- **Storage**: Cloudflare KV (VIDEO_QUEUE, LOGS)
- **Media**: Cloudinary
- **AI**: Groq API (LLaMA 3.1)
- **Platforms**: YouTube, TikTok, Instagram, Facebook APIs

## Loyiha strukturasi
```
/src
  /routes         - API endpointlar
    upload.ts     - Video yuklash
    schedule.ts   - Scheduler va platform upload
    stats.ts      - Loglar va statistika
  /services       - Tashqi xizmatlar
    cloudinary.ts - Cloudinary integratsiyasi
    groq.ts       - AI metadata generatsiyasi
  /platforms      - Platforma uploaderlar
    youtube.ts    - YouTube Data API v3
    tiktok.ts     - TikTok for Developers API
    instagram.ts  - Instagram Graph API (Reels)
    facebook.ts   - Facebook Graph API (Reels)
  /db             - KV database handlers
    queue.ts      - Video queue boshqaruvi
    logs.ts       - Log boshqaruvi
  /utils          - Yordamchi funksiyalar
    logger.ts     - Logging tizimi
    time.ts       - Vaqt utilitlari
  index.ts        - Asosiy entry point
```

## API Endpoints
- `POST /upload-video` - Video yuklash
- `POST /run-schedule` - Schedulerni qo'lda ishga tushirish
- `GET /api/logs` - Loglarni olish
- `POST|GET /api/clear-logs` - Loglarni tozalash
- `POST|GET /api/clear-queue` - Queueni tozalash
- `GET /api/stats` - Queue statistikasi
- `GET /health` - Health check
- `GET /` - API info

## Deploy qilish
1. Cloudflare Dashboard'da KV namespace yarating (VIDEO_QUEUE, LOGS)
2. `wrangler.toml` faylda KV ID larni yangilang
3. Environment variablelarni sozlang
4. `wrangler deploy` buyrug'ini bajaring

## Cron Job
Har 5 daqiqada `/run-schedule` avtomatik ishga tushadi va pending videolarni platformalarga yuklaydi.

## Recent Changes
- 2024-01-XX: Initial project structure created
- All platform uploaders implemented
- AI metadata generation with Groq
- Full logging system
- CORS support enabled
