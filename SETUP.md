# 🚀 SETUP GUIDE

## Qo'llik Bo'limlar

### 📖 Documentation
1. **[WORKFLOW_GUIDE.md](./WORKFLOW_GUIDE.md)** - To'liq tafsir (USER, AI, SISTEMA)
2. **[replit.md](./replit.md)** - Technical architecture
3. **[.env.example](./.env.example)** - All environment variables
4. **[SETUP.md](./SETUP.md)** - This file

---

## 1️⃣ Quick Start (Development)

### A. Clone & Install
```bash
git clone <repo>
cd ai-video-uploader
npm install
```

### B. Setup Environment
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### C. Get Credentials (5 minutes)
```
1. Cloudinary: https://cloudinary.com/console
   - Get CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET

2. Groq AI: https://console.groq.com/keys
   - Get GROQ_API_KEY

3. YouTube: https://console.cloud.google.com/
   - Create project
   - Enable YouTube Data API v3
   - Create OAuth 2.0 credentials
   - Get CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN

4. TikTok: https://developers.tiktok.com/
   - Register and get ACCESS_TOKEN, OPEN_ID

5. Instagram/Facebook: https://developers.facebook.com/
   - Create app
   - Get ACCESS_TOKEN, USER_ID
```

### D. Start Development
```bash
npm run dev
# Server: http://0.0.0.0:5000
```

---

## 2️⃣ Environment Variables

### Required
```
CLOUDINARY_CLOUD_NAME       # Video storage
CLOUDINARY_API_KEY          # Video storage
CLOUDINARY_API_SECRET       # Video storage
GROQ_API_KEY                # AI metadata generation
```

### Optional
```
OPENROUTER_API_KEY          # Fallback AI provider
```

### Platforms (Global Fallback)
```
YOUTUBE_CLIENT_ID           # YouTube upload
YOUTUBE_CLIENT_SECRET       # YouTube upload
YOUTUBE_REFRESH_TOKEN       # YouTube upload
TIKTOK_ACCESS_TOKEN         # TikTok upload
TIKTOK_OPEN_ID              # TikTok upload
INSTAGRAM_ACCESS_TOKEN      # Instagram upload
INSTAGRAM_USER_ID           # Instagram upload
FACEBOOK_ACCESS_TOKEN       # Facebook upload
FACEBOOK_PAGE_ID            # Facebook upload
... (14 platforms total)
```

### Channel-Specific (Optional)
```
CHANNEL6_YOUTUBE_CLIENT_ID          # Override for channel6
CHANNEL6_YOUTUBE_CLIENT_SECRET
CHANNEL6_YOUTUBE_REFRESH_TOKEN
... (one set per platform per channel)
```

---

## 3️⃣ Project Structure

```
/
├── src/
│   ├── config/           # Channels, platforms, languages
│   ├── services/         # Core services (FFmpeg, Queue, AI, etc)
│   ├── routes/           # API endpoints
│   ├── db/               # Database layer (KV)
│   ├── models/           # Data models
│   └── platforms/        # Platform-specific handlers
├── WORKFLOW_GUIDE.md     # Complete workflow explanation
├── replit.md             # Technical docs
├── .env.example          # Environment template
├── SETUP.md              # This file
└── wrangler.toml         # Cloudflare config
```

---

## 4️⃣ API Endpoints

### Upload Video
```bash
POST /api/upload-video
{ "title": "...", "videoFile": "...", "channelId": "..." }
```

### Process Video (Auto Language + Time)
```bash
POST /api/video/process
{ "channel": "channel1", "platform": "youtube", "videoFile": "..." }
```

### Get Queue Status
```bash
GET /api/video/queue-status
```

### Run Scheduler
```bash
POST /api/run-schedule
{ "channelId": "channel1" }
```

### More Endpoints
See WORKFLOW_GUIDE.md for complete API reference

---

## 5️⃣ 10 Channels + Configuration

| # | Name | Default Lang | Timezone | Personality |
|---|------|--------------|----------|-------------|
| 1 | Qoyin (Rabbit) | English | UTC | Fast & Energetic |
| 2 | Panda | English | UTC | Cute & Clumsy |
| 3 | Pingvin (Penguin) | English | UTC | Funny & Slippery |
| 4 | Yenot (Raccoon) | English | UTC | Night Life & Mischief |
| 5 | Bo'ri (Wolf) | English | UTC | Cool & Mysterious |
| 6 | Begemot (Hippo) | Russian | Europe/Moscow | Heavy & Bold |
| 7 | Boyo'g'li (Owl) | German | Europe/Berlin | Wise & Funny |
| 8 | Timsoh (Crocodile) | Spanish | America/Mexico_City | Scary Yet Cute |
| 9 | Koala | English | Australia/Sydney | Sleepy & Lazy |
| 10 | Lenivets (Sloth) | Russian | Asia/Tashkent | Slowmo & Chill |

---

## 6️⃣ 14 Platforms (Priority)

### HIGH Priority (Upload First)
- YouTube (peak: 18:00-22:00)
- TikTok (peak: 18:00-23:00)

### NORMAL Priority
- Instagram (peak: 19:00-22:00)
- Facebook (peak: 20:00-22:00)

### LOW Priority
- Snapchat, Pinterest, X, Reddit, LinkedIn, Twitch, Kwai, Likee, Dzen, Rumble, Odysee, Dailymotion

---

## 7️⃣ Workflow Summary

```
USER                  AI (Groq)           SYSTEM
│                     │                   │
├─ Upload video ──→   │                   │
│                     ├─ Generate title   ├─ Save to Cloudinary
│                     ├─ Generate desc    ├─ Auto-detect language
│                     ├─ Generate tags    ├─ Auto-detect time
│                     ├─ Translate (5)    ├─ FFmpeg process
│                     └─ Validate         ├─ Create queue task
│                                         └─ Track status
```

---

## 8️⃣ Daily Workflow (3 Videos × 10 Channels)

```
30 Videos Uploaded
    ↓
AI Generates 2,100 Metadata Variants
(30 videos × 14 platforms × 5 languages)
    ↓
System Queues 2,100 Tasks
(With optimal posting times)
    ↓
Manual: Upload to Platforms
(Or integrate real APIs)
    ↓
Track Performance
```

---

## 9️⃣ Deployment (Production)

### Cloudflare Workers
```bash
# Build
npm run build

# Deploy
npm run deploy
```

### Environment Setup (Cloudflare Dashboard)
```
Workers → Your Worker → Settings → Variables
```

### Secrets Management
```bash
# Set secrets via CLI
npx wrangler secret put GROQ_API_KEY
npx wrangler secret put CLOUDINARY_API_SECRET
npx wrangler secret put YOUTUBE_CLIENT_SECRET
# ... (for all sensitive values)
```

---

## 🔟 Monitoring

### Logs
```
GET /api/logs
GET /api/logs/paginated
```

### Statistics
```
GET /api/stats
GET /api/video/queue-status
```

### Clear Logs (if needed)
```
POST /api/clear-logs
```

---

## 1️⃣1️⃣ Troubleshooting

### AI Not Generating Metadata
```
Check: GROQ_API_KEY in .env.local
Run: GET /api/ai-settings
```

### Videos Not Processing
```
Check: CLOUDINARY credentials
Check: FFmpeg processor logs
```

### Queue Stuck
```
Check: GET /api/video/queue-status
Clear: POST /api/clear-queue
```

### Platform Upload Failing
```
Check: Platform-specific credentials
Check: API key expiration
Review: Logs at /api/logs
```

---

## 1️⃣2️⃣ Next Steps

✅ Development Setup Complete

👉 Next:
1. Integrate real platform APIs (YouTube, TikTok, etc.)
2. Test with real videos
3. Deploy to Cloudflare Workers
4. Set up monitoring & analytics
5. Scale to production

---

**For complete workflow explanation, read [WORKFLOW_GUIDE.md](./WORKFLOW_GUIDE.md)** 🚀
