# 🎬 COMPLETE WORKFLOW GUIDE
## Ko'lam: Siz → AI → Sistema

---

# 📋 PART 1: SIZNING VAZIFALARINGIZ (USER)

## QADAM 1️⃣: VIDEO YUKLASH
**Siz qilishingiz kerak:**
```
POST /api/upload-video
{
  "title": "Video sarlavhasi (inglizcha yoki qaysi til bo'lsa)",
  "videoFile": "video.mp4 (fayl)",
  "channelId": "channel1" (Qaysi kanal uchun?)
}
```

**Natija:**
- Video Cloudinary'ga saqlanadi (cloud storage)
- VideoTemplate yaratiladi (asosiy shablon)
- Metadata generation uchun queue'ga qo'yiladi

---

## QADAM 2️⃣: AI'DAN METADATA YARATISH
**Siz qilishingiz kerak:**
```
POST /api/run-schedule
{
  "channelId": "channel1"
}
```

**Natija:**
- AI (Groq) avtomatik metadata yaratadi
- Har bir platform uchun
- Har bir til uchun
- Qayta qaytadigan (retry) xususiyati

---

## QADAM 3️⃣: PLATFORMAGA YUKLASH (MANUAL)
**Hozir:** Sistema hali platformalarga avtomatik yuklamaydi
**Siz qilishingiz kerak:**
1. Har bir platform uchun API key olish (YouTube, TikTok, Instagram...)
2. Credentials'ni qo'shish (environment variables)
3. System platformalarga yuklashi uchun code yozish (manual integration)

**Yoki:**
- Mock endpoint chaqirish: `POST /api/video/upload-mock`
- Metadata console'ga chop bo'ladi (qayd olish uchun)
- Manually har bir platformaga yuklash

---

# 🤖 PART 2: AI NIMA QILADI (GROQ AI)

## AI TASK 1: METADATA GENERATION
**Groq qiladi:**
```
Input: 
├─ Video title (siz bergan)
├─ Channel topic (sistema dan - masalan "Fast & Energetic")
├─ Platform specific requirements
├─ Language (auto-detected)
└─ Cultural context

Process (AI):
├─ Title yaratish (platform-specific: YouTube max 100, TikTok max 150...)
├─ Description yaratish (platform-specific limits)
├─ Hashtags yaratish (platform-specific, culturally relevant)
├─ CTA yaratish (Call-to-Action, "Subscribe!", "Follow!", etc)
└─ Thumbnail recommendations

Output:
{
  "title": "Platform uchun title",
  "description": "Platform uchun description",
  "tags": ["hashtag1", "hashtag2", ...],
  "cta": "Subscribe va ring icon'ni bosing!",
  "thumbnail_keywords": "energetic, fast, action"
}
```

## AI TASK 2: MULTI-LANGUAGE ADAPTATION
**Groq qiladi:**
```
Har bir til uchun:
├─ Matnni til'ga tarjima qilish
├─ Emoji'larni til'ga mos qilish (masalan: 🎉 barcha tilga mos)
├─ Cultural references o'zgartirish
├─ Hashtags til'ga mos qilish
├─ Local memes/trends hisobga olish
└─ Tone'ni til'ga mos qilish

Masalan:
- English: "Check out this amazing rabbit action!"
- Russian: "Посмотрите, как быстро прыгает кролик!"
- German: "Schau dieses energische Kaninchen-Abenteuer!"
- Spanish: "¡Mira a este conejo saltador increíble!"
- Arabic: "شاهد هذا الأرنب السريع المذهل!"
```

## AI TASK 3: PROMPT VALIDATION & IMPROVEMENT
**Groq qiladi:**
```
Har har qanday prompt uchun:
├─ Syntax tekshirish
├─ Clarity tekshirish
├─ Completeness tekshirish
├─ Improvement suggestions berish
└─ Auto-improve qilish (optional)

Masalan:
- Input prompt: "Make funny video about animals"
- AI feedback: "Too vague, needs channel, topic, language"
- Improved: "Make funny 15s video about Rabbit (energetic, fast) for YouTube with English"
```

---

# ⚙️ PART 3: SISTEMA NIMA QILADI (AUTOMATION)

## SISTEM STEP 1: AUTO LANGUAGE DETECTION
```
Siz: Video yuklaysiz → "channel1" bilan
Sistema:
├─ Channel1 sozlamalarini o'qiydi
├─ defaultLanguage: 'en' topadi
├─ Timezone: 'UTC' topadi
├─ Automatic barcha tillar uchun metadata yaratish
│  ├─ English (default)
│  ├─ Russian (ru)
│  ├─ German (de)
│  ├─ Spanish (es)
│  └─ Arabic (ar)
└─ User override qilish mumkin: "language": "de"
```

## SISTEM STEP 2: AUTO TIME SCHEDULING
```
Siz: Video beraysiz → Platform: "youtube"
Sistema:
├─ Platform peak hours'ini o'qiydi
│  └─ YouTube: 18:00-22:00 (optimal watch time)
├─ Channel timezone'ni o'qiydi
│  └─ Channel6: Europe/Moscow (Russia uchun)
├─ Next available peak hour'ni hisoblaydi
│  └─ "2025-02-20T19:00:00Z" (Moscow time'da 19:00)
├─ Queue'ga optimal time bilan qo'shadi
└─ User override qilish mumkin: "scheduledTime": "..."
```

## SISTEM STEP 3: VIDEO PROCESSING
```
Sistema (FFmpeg):
├─ Video range adjust:
│  ├─ Color: hue=s=1.02:b=0.005 (vibrant bo'lishi)
│  ├─ Pitch: 1.01 (audio natural sounding)
│  ├─ Speed: 0.999*PTS (sekin motion uchun)
│  └─ Logo: top-right, 0.15 scale (branding)
├─ File organization:
│  └─ output/{platform}/{language}/{filename}.mp4
│  └─ Masalan: output/youtube/en/Rabbit_English_YouTube_20250220_143022.mp4
└─ Metadata security:
   └─ -map_metadata -1 (exif/creator info olib tashash)
   └─ -fflags +bitexact (forensic analysis qilib bo'lmasligi)
```

## SISTEM STEP 4: QUEUE MANAGEMENT
```
Sistema (QueueManager):
├─ Task ID yaratish: task_1734123456_abc123
├─ Priority qo'yish:
│  ├─ HIGH: YouTube, TikTok (eng muhim)
│  ├─ NORMAL: Instagram, Facebook
│  └─ LOW: Boshqa platformalar
├─ Scheduling:
│  ├─ Next peak hour'da upload
│  ├─ Exponential backoff agar fail bo'lsa (2s, 4s, 8s)
│  └─ Max 3 retry attempt
├─ task_list.json'ga saqlash (persistence)
└─ Statistics:
   ├─ Total pending: 25
   ├─ By platform: YouTube (10), TikTok (8)...
   └─ By channel: Rabbit (5), Panda (4)...
```

## SISTEM STEP 5: PLATFORM UPLOAD (Ready but not automated)
```
Sistema QUYIDAGILARNI TAYYORLAYDI:
├─ Mock upload endpoint: /api/video/upload-mock
│  └─ Metadata console'ga chop bo'ladi
├─ API prepared (API SDK structure)
├─ Credentials placeholder'i qo'yilgan
└─ Error handling va retry logic

Siz QUYIDAGILARNI QILISHINGIZ KERAK:
├─ YouTube Data API v3 integrate qilish
├─ TikTok Open API integrate qilish
├─ Instagram Graph API integrate qilish
├─ Facebook Video Upload API integrate qilish
├─ 10+ boshqa platform uchun
└─ Each platform uchun specific upload logic yozish
```

---

# 🔄 COMPLETE WORKFLOW EXAMPLE

## Scenario: Channel1 (Rabbit) uchun video yuklash

### SIZNING HARAKATLARI:
```
1. Video tayyor: "rabbit_jumping.mp4"
2. Upload qilasiz:
   POST /api/upload-video
   {
     "title": "Qoyin tez yugurayapti!",
     "videoFile": "rabbit_jumping.mp4",
     "channelId": "channel1"
   }
```

### SISTEMA AVTOMATIK QILADI:
```
Step 1: Language auto-detect
├─ Channel1 → English (en) default
└─ Barcha 5 til uchun metadata yaratish uchun tayyorlash

Step 2: Time auto-detect
├─ Platform: YouTube → Peak: 18:00-22:00
├─ Timezone: UTC
└─ Next: 2025-02-20T19:00:00Z

Step 3: Video processing
├─ Color adjustment: hue=s=1.02:b=0.005
├─ Audio pitch: 1.01
├─ Logo overlay: topright
└─ Save: output/youtube/en/Rabbit_English_YouTube_...mp4

Step 4: Queue addition
├─ taskId: task_1734123456_abc123
├─ Priority: HIGH (YouTube)
├─ scheduledTime: 2025-02-20T19:00:00Z
└─ Status: pending
```

### AI QILADI (Groq):
```
Step 1: Metadata generation
├─ Title: "Watch This Lightning-Fast Rabbit!"
├─ Description: "Meet our energetic rabbit doing incredible speed tricks..."
├─ Tags: ["rabbit", "action", "fast", "energy", "animals"]
└─ CTA: "Subscribe for more amazing animal videos!"

Step 2: Language adaptation (4 til uchun)
├─ Russian: "Посмотрите этого молниеносно быстрого кролика!"
├─ German: "Sehen Sie dieses blitzschnelle Kaninchen!"
├─ Spanish: "¡Mira a este conejo ultra rápido!"
└─ Arabic: "شاهد هذا الأرنب سريع البرق!"

Step 3: Platform adaptation
├─ YouTube: Full 100-char title, 5000-char description
├─ TikTok: Short 150-char title, snappy description
├─ Instagram: Square format, hashtags at end
└─ Facebook: Longer form, CTA prominent
```

### NATIJA:
```
Queue status:
├─ Total videos: 1
├─ Pending: 1 (English)
├─ Status: waiting_for_manual_upload
├─ Metadata ready: ✅ (5 til × 14 platform = 70 variants)
└─ Manual action required: Upload to YouTube, TikTok, Instagram...
```

---

# 📊 FULL 660-PROFILE SYSTEM

## SCALE:
```
10 Channels × 14 Platforms × 5 Languages = 700+ variants

Daily workflow (3 videos × 10 channels):
├─ 30 source videos yuklash (30 click)
├─ AI 2,100 metadata variant yaratish (automatic)
├─ Queue 2,100 task qo'shish (automatic)
├─ 2,100 upload timing schedule qilish (automatic)
└─ Manual: 2,100 platformaga upload qilish (or integrate APIs)
```

## CHANNELS:
```
1. Qoyin (Rabbit) → English, UTC
2. Panda → English, UTC
3. Pingvin (Penguin) → English, UTC
4. Yenot (Raccoon) → English, UTC
5. Bo'ri (Wolf) → English, UTC
6. Begemot (Hippo) → Russian, Europe/Moscow ✅
7. Boyo'g'li (Owl) → German, Europe/Berlin ✅
8. Timsoh (Crocodile) → Spanish, America/Mexico_City ✅
9. Koala → English, Australia/Sydney
10. Lenivets (Sloth) → Russian, Asia/Tashkent ✅
```

## PLATFORMS (priority):
```
HIGH (Upload first):
├─ YouTube (peak: 18:00-22:00)
└─ TikTok (peak: 18:00-23:00)

NORMAL:
├─ Instagram (peak: 19:00-22:00)
└─ Facebook (peak: 20:00-22:00)

LOW:
├─ Snapchat, Pinterest, X, Reddit
├─ LinkedIn, Twitch, Kwai, Likee
├─ Dzen, Rumble, Odysee, Dailymotion
└─ (11 ta boshqa)
```

---

# 🎯 SUMMARY: KIM NIMA QILADI?

## SIZA VAZIFALAR (Manual):
```
1. Video yaratish + yuklash (30 ta/kun)
2. Metadata prompt optimize qilish (optional)
3. Platform API keys setup qilish (one-time)
4. Platform API integration yozish (each platform uchun)
5. Monitor queue va upload results
```

## AI VAZIFALAR (Groq - Automatic):
```
1. Metadata generation (title, description, tags, CTA)
2. Multi-language adaptation (20+ tiller)
3. Platform-specific formatting
4. Prompt validation va improvement
5. Cultural context consideration
```

## SISTEMA VAZIFALAR (Automation):
```
1. Language auto-detection (channel-based)
2. Time auto-scheduling (platform + timezone)
3. Video processing (FFmpeg: color, pitch, logo, metadata)
4. Queue management (priority, retry, persistence)
5. Storage organization (660 profiles structured)
6. Logging va monitoring
7. Error handling va recovery
```

---

# 🚀 NEXT STEPS

## HOZIR TAYYOR:
```
✅ Video processing pipeline
✅ Metadata generation (AI)
✅ Queue management
✅ Auto language detection
✅ Auto time scheduling
✅ Mock upload (for testing)
✅ Full logging
```

## QILISH QOLDI:
```
1. Real platform API integration (YouTube, TikTok, etc.)
   - Each platform uchun SDK/API
   - OAuth flow
   - Upload function
   - Error handling

2. Dashboard (optional)
   - 660 profile stats view
   - Video performance tracking
   - Upload history
   - Error logs

3. Optimization (optional)
   - Batch upload
   - Concurrent uploads
   - Rate limiting handling
   - Analytics integration
```

---

# 📞 API ENDPOINTS REFERENCE

## Video Upload:
```
POST /api/upload-video
Body: { title, videoFile, channelId }
→ Video saved, template created, queued for metadata
```

## Run Scheduler:
```
POST /api/run-schedule
Body: { channelId }
→ AI generates metadata, queues tasks
```

## Video Processing:
```
POST /api/video/process
Body: { channel, platform, videoFile, title, description, tags }
Optional: { language, scheduledTime } (auto-detected if omitted)
→ FFmpeg processing, queued for upload
```

## Get Queue Status:
```
GET /api/video/queue-status
→ Returns: total, pending, processing, completed, failed, by platform, by channel
```

## Mock Upload:
```
POST /api/video/upload-mock
Body: { taskId }
→ Prints metadata to console (manual upload reference)
```

## Platform Uploads (To be implemented):
```
POST /api/upload/{platform}
Body: { taskId, credentials }
→ Upload to specific platform
```

---

**XULOSA: Siz content yaratishni, AI metadata generat qilishni, Sistema avtomatsiya qilishni qilasiz! 🎬✨**
