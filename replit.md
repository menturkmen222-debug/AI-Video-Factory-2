# AI Video Uploader - Cloudflare Worker

## Overview
Bu loyiha Cloudflare Worker yordamida videolarni bir nechta ijtimoiy tarmoq platformalariga avtomatik yuklash uchun yaratilgan AI quvvatli tizimdir.

## Loyiha maqsadi
- Videolarni Cloudinary orqali saqlash
- Groq AI yordamida avtomatik metadata (title, description, tags) yaratish
- 16+ platformaga yuklash (YouTube, TikTok, Instagram, Facebook, Snapchat, Pinterest, X, Reddit, LinkedIn, Twitch, Kwai, Likee, Dzen, Rumble, Odysee, Dailymotion)
- Har bir kanal uchun kunlik limit bilan ishlash
- Multi-language auto-adaptation (20+ tillar)
- Timezone-aware scheduling
- To'liq logging va monitoring

## Texnologiyalar
- **Runtime**: Cloudflare Workers
- **Language**: TypeScript
- **Storage**: Cloudflare KV (VIDEO_QUEUE, LOGS, PROMPTS)
- **Media**: Cloudinary
- **AI**: Groq API (LLaMA 3.1)
- **Platforms**: 16+ social media platforms

## Multi-Platform Architecture

### Core Video Model (VideoTemplate)
- One base video per content item
- Language-agnostic base prompt
- No video file duplication
- Automatic metadata generation per language

### Language Auto-Adapt System
For every channel:
- Detects assigned language
- Automatically adapts: Title, Description, Hashtags, CTA
- 20+ supported languages (en, es, pt, fr, de, it, ru, uz, tr, ar, hi, zh, ja, ko, id, vi, th, pl, nl, uk)
- No mixed languages allowed

### Platform Auto-Adapt System
For each platform:
- Applies platform-specific rules (aspect ratio, duration, metadata limits)
- Uses SAME video content
- Adjusts formatting only, NOT content meaning

### Scheduling & Time Logic
- Each platform has optimal posting times
- Automatic timezone calculation per language/region
- No manual scheduling required
- Collision avoidance

### Channel Structure (Strict)
- 5 channels per language
- 5 videos per channel per day
- Total: 25 videos per day per language
- Validation enforced

## Loyiha strukturasi
```
/src
  /config           - Konfiguratsiya fayllari
    channels.ts     - Kanal sozlamalari va mavzulari
    languages.ts    - 20+ til sozlamalari va timezone
    platforms.ts    - 16+ platform registratsiyasi
  /models           - Data modellari
    videoTemplate.ts - VideoTemplate, VideoAdaptation, PublishTarget
  /routes           - API endpointlar
    upload.ts       - Video yuklash
    schedule.ts     - Scheduler va platform upload
    stats.ts        - Loglar va statistika
    prompts.ts      - Promptlar API (CRUD, validate, improve)
    distribution.ts - Multi-platform distribution API
  /services         - Tashqi xizmatlar
    cloudinary.ts   - Cloudinary integratsiyasi
    groq.ts         - AI metadata generatsiyasi
    promptsAI.ts    - AI prompt validation va improvement
    languageAdapter.ts - Multi-language adaptation service
    multiPlatformScheduler.ts - Timezone-aware scheduling
    videoDistributor.ts - Complete distribution orchestrator
  /platforms        - Platforma uploaderlar
    base.ts         - Base uploader class
    index.ts        - Platform factory and utilities
    youtube.ts      - YouTube Data API v3
    tiktok.ts       - TikTok for Developers API
    instagram.ts    - Instagram Graph API (Reels)
    facebook.ts     - Facebook Graph API (Reels)
    snapchat.ts     - Snapchat API
    pinterest.ts    - Pinterest API
    x.ts            - X (Twitter) API
    reddit.ts       - Reddit API
    linkedin.ts     - LinkedIn API
    twitch.ts       - Twitch Clips API
    kwai.ts         - Kwai API
    likee.ts        - Likee API
    dzen.ts         - Dzen (Yandex) API
    rumble.ts       - Rumble API
    odysee.ts       - Odysee/LBRY API
    dailymotion.ts  - Dailymotion API
  /db               - KV database handlers
    queue.ts        - Video queue boshqaruvi
    logs.ts         - Log boshqaruvi
    prompts.ts      - Promptlar boshqaruvi (dedicated PROMPTS KV)
  /utils            - Yordamchi funksiyalar
    logger.ts       - Logging tizimi
    time.ts         - Vaqt utilitlari
    scheduling.ts   - Scheduling utilities
  /frontend         - Frontend assets
    assets.ts       - HTML, CSS, JS fayllari
  index.ts          - Asosiy entry point
```

## API Endpoints

### Core Endpoints
- `POST /upload-video` - Video yuklash
- `POST /run-schedule` - Schedulerni qo'lda ishga tushirish
- `GET /api/logs` - Loglarni olish
- `POST|GET /api/clear-logs` - Loglarni tozalash
- `POST|GET /api/clear-queue` - Queueni tozalash
- `GET /api/stats` - Queue statistikasi
- `GET /health` - Health check
- `GET /` - API info

### Distribution Endpoints (NEW)
- `POST /api/distribute` - Multi-platform video distribution
- `GET /api/platforms` - Get all supported platforms
- `GET /api/languages` - Get all supported languages
- `GET /api/channels` - Get all channels
- `GET /api/validate-structure` - Validate 5x5 channel structure

### Prompts API Endpoints
- `GET /api/prompts` - Barcha promptlarni olish
- `GET /api/prompts/channel?id=channel1` - Kanal bo'yicha filtrlash
- `GET /api/prompts/stats` - Prompt statistikasi
- `POST /api/prompts/validate` - Bitta promptni AI bilan tekshirish
- `POST /api/prompts/improve` - Promptni AI bilan yaxshilash
- `POST /api/prompts/update` - Prompt matnini yangilash
- `POST /api/prompts/validate-all` - Barcha promptlarni tekshirish
- `POST /api/prompts/reset` - Promptlarni boshlang'ich holatga qaytarish

## Supported Platforms (16)
1. YouTube - Full OAuth2, resumable upload
2. TikTok - OAuth2, video posting API
3. Instagram - Graph API, Reels
4. Facebook - Graph API, Reels
5. Snapchat - Business API
6. Pinterest - Video Pins API
7. X (Twitter) - Media upload + tweet
8. Reddit - Submit links
9. LinkedIn - UGC Posts + video
10. Twitch - Clips API
11. Kwai - Open platform API
12. Likee - Creator API
13. Dzen - Yandex integration
14. Rumble - Upload API
15. Odysee - LBRY protocol
16. Dailymotion - Partner API

## Supported Languages (20)
en (English), es (Spanish), pt (Portuguese), fr (French), de (German), 
it (Italian), ru (Russian), uz (Uzbek), tr (Turkish), ar (Arabic), 
hi (Hindi), zh (Chinese), ja (Japanese), ko (Korean), id (Indonesian),
vi (Vietnamese), th (Thai), pl (Polish), nl (Dutch), uk (Ukrainian)

## Deploy qilish
1. Cloudflare Dashboard'da KV namespace yarating (VIDEO_QUEUE, LOGS, PROMPTS)
2. `wrangler.toml` faylda KV ID larni yangilang
3. Environment variablelarni sozlang
4. `wrangler deploy` buyrug'ini bajaring

## Recent Changes
- 2024-12-18: **MAJOR UPDATE** - Multi-Platform Distribution System
  - Added 12 new platform uploaders (Snapchat, Pinterest, X, Reddit, LinkedIn, Twitch, Kwai, Likee, Dzen, Rumble, Odysee, Dailymotion)
  - Implemented language auto-adapt system with 20 languages
  - Added VideoTemplate model for central video management
  - Created LanguageAdapterService for automatic metadata translation
  - Implemented MultiPlatformSchedulerService with timezone awareness
  - Created VideoDistributorService for complete distribution orchestration
  - Added platform registry with full configuration for all 16 platforms
  - New API endpoints: /api/distribute, /api/platforms, /api/languages, /api/channels, /api/validate-structure
  - 5 channels × 5 videos = 25 videos per day structure enforced
  - Base platform uploader class for consistent implementation

## How It Works

### Language Auto-Adapt
1. System receives base video + prompt in any language
2. For each target language, AI generates:
   - Localized title (respecting platform limits)
   - Localized description with CTA
   - Language-specific hashtags
   - Call-to-action in native language
3. No mixed languages - pure native content

### One Video → Multi-Platform
1. Single base video uploaded once to Cloudinary
2. VideoTemplate created with base prompt
3. For each language: generate VideoAdaptation
4. For each platform: format metadata to platform specs
5. Schedule with timezone-aware optimal times
6. Upload to all platforms with platform-specific formatting

### Why 25 Videos Per Day
- 5 channels × 5 videos each = 25 base videos
- Each video is auto-adapted to all languages
- Each adaptation is published to all platforms
- Result: 25 unique content pieces distributed globally

## Cron Job
Har 2 soatda `/run-schedule` avtomatik ishga tushadi va pending videolarni platformalarga yuklaydi.

## Internationalization (i18n)
The frontend supports multiple languages:
- **Translation files**: `frontend/i18n/uz.json` (Uzbek), `frontend/i18n/tk.json` (Turkmen)
- **i18n helper**: `frontend/js/i18n.js` - handles language loading, switching, and translation lookups
- **Language switcher**: Dropdown in the header to switch between languages
- All user-facing strings use `i18n.t('key.path')` for translations

## Video Upload Flow
1. User sends video + prompt + channel name to `/upload-video`
2. Single queue entry is created with video URL, prompt, and target platforms
3. When `/run-schedule` runs, AI generates title/description/tags using the prompt and channel name
4. Video is uploaded to all configured platforms with language-adapted metadata

## Common Issues & Prevention Guide

### Issue 1: Notification Bell Button Not Responding
**Root Cause**: ID mismatch between HTML and JavaScript
- ❌ WRONG: `getElementById('notificationBtn')` (singular)
- ✅ CORRECT: `getElementById('notificationsBtn')` (plural)
**Prevention**: 
- Always check HTML IDs match JavaScript selectors exactly
- Use browser DevTools Console to verify: `document.getElementById('notificationsBtn')` returns the element

### Issue 2: Platform Selection Not Working in Upload
**Root Cause**: Hardcoded platform list instead of reading user selections
- ❌ WRONG: `const platforms = ['youtube', 'tiktok', 'instagram', ...]`
- ✅ CORRECT: `const platformCheckboxes = document.querySelectorAll('input[name="platforms"]:checked'); const platforms = Array.from(platformCheckboxes).map(cb => cb.value);`
**Prevention**:
- Never hardcode lists that should be dynamic
- Always read form input values from HTML
- Test: Check in browser console that checkboxes have `name="platforms"` attribute

### Issue 3: Takomlashtirish (Enhance) Button Not Working
**Root Cause**: Missing backend endpoint or API call
- ❌ WRONG: Frontend calls `/api/prompts/improve` but endpoint doesn't exist
- ✅ CORRECT: Backend has `POST /api/prompts/improve` endpoint implemented
**Prevention**:
- When adding frontend buttons, always implement backend handler first
- Check router in `src/index.ts` for matching endpoint
- Test API endpoint directly: `curl -X POST http://localhost:5000/api/prompts/improve -d '{"promptId":"test"}'`

### Quick Debug Checklist
1. **Button not responding**: Check HTML ID matches exactly in JS (case-sensitive)
2. **Form data not sent**: Check input `name` attributes in HTML
3. **API call failing**: Check endpoint exists in `src/index.ts` route handler
4. **Changes not visible**: Restart workflow after editing TypeScript files
5. **Silent failures**: Check browser Console (F12) for JavaScript errors

### Development Workflow Checklist
Before committing changes:
1. ✓ Check HTML `id` attributes used in JavaScript
2. ✓ Check HTML `name` attributes for form inputs
3. ✓ Verify backend endpoints exist in `src/index.ts`
4. ✓ Restart workflow to compile TypeScript
5. ✓ Test in browser console for syntax errors
6. ✓ Check network requests (DevTools → Network tab)
