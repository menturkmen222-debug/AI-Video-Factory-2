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
- 2024-12-13: Updated queue system to store videoContext (prompt) with each video entry
- 2024-12-13: Enhanced AI metadata generation to use both prompt and channel name
- 2024-12-13: Single queue entry now uploads to all 4 platforms with the same AI-generated metadata
- 2024-12-14: Added i18n (internationalization) support with Uzbek (uz) and Turkmen (tk) languages
- 2024-12-14: Fixed dashboard stats and queue display issues:
  - Added `getAllVideos()` method to QueueManager
  - Updated `handleGetStats()` to return `stats` object with `completed` field (mapped from `uploaded`)
  - Added `videos` array to stats response for queue display
- 2024-12-16: Enhanced Queue Management system:
  - Added 17 new i18n translation keys for queue section (both Uzbek and Turkmen)
  - Scheduled time display for videos (scheduledAt)
  - Enhanced error display with error reason, error code, and retry button
  - Analytics section with views, likes, comments, shares, and revenue
  - Clear messaging when analytics/revenue not supported by platform API
  - Fixed JavaScript null reference error in updateQueueUI function
- 2024-12-16: Implemented complete System Logs module with:
  - Cursor-based pagination loading exactly 100 logs per batch
  - Comprehensive log display (timestamp, level, source, step, message, stack traces)
  - Complete filtering (level, source, date range, search)
  - Error handling with retry functionality
  - Load More button with loading states and log count display
  - Added 13 new i18n translation keys for logs section (both Uzbek and Turkmen)
  - Backend: `getPaginatedLogs` in `src/db/logs.ts` with key-based cursor pagination
  - API: `GET /api/logs/paginated` endpoint with query params (cursor, limit, level, source, startDate, endDate, search)

## Internationalization (i18n)
The frontend supports multiple languages:
- **Translation files**: `frontend/i18n/uz.json` (Uzbek), `frontend/i18n/tk.json` (Turkmen)
- **i18n helper**: `frontend/js/i18n.js` - handles language loading, switching, and translation lookups
- **Language switcher**: Dropdown in the header to switch between languages
- All user-facing strings use `i18n.t('key.path')` for translations
- Translations cover: navigation, modals, toasts, queue status, logs, settings, time formatting

## Video Upload Flow
1. User sends video + prompt + channel name to `/upload-video`
2. Single queue entry is created with video URL, prompt, and target platforms
3. When `/run-schedule` runs, AI generates title/description/tags using the prompt and channel name
4. Same video is uploaded to all 4 platforms (YouTube, TikTok, Instagram, Facebook) with identical metadata
