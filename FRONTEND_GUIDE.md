# 🎨 FRONTEND USER GUIDE

## Overview

The AI Video Uploader features a complete, modern dashboard for managing video distribution across 14+ social media platforms. The interface is built with a responsive design, multi-language support (Uzbek & Turkmen), and real-time status monitoring.

**Key Features:**
- 📊 Real-time dashboard with upload statistics
- 📤 Video upload and queue management
- 📋 Comprehensive logging and monitoring
- 🤖 AI prompt management and optimization
- ⚙️ Platform and AI settings configuration
- 🌐 Multi-language support (Uzbek, Turkmen)
- 📱 Fully responsive design (desktop & mobile)

---

## 🏠 Dashboard (Boshqaruv paneli)

The dashboard is your main control center showing real-time statistics:

### Stats Cards
```
Kutilayotgan videolar (Pending Videos)
├─ Shows: Number of videos waiting to be processed
└─ Color: Orange icon

Qayta ishlanmoqda (Processing)
├─ Shows: Videos currently being processed
└─ Color: Blue icon

Bajarilgan (Completed)
├─ Shows: Successfully uploaded videos
└─ Color: Green checkmark

Muvaffaqiyatsiz (Failed)
├─ Shows: Failed uploads needing retry
└─ Color: Red X
```

### Platform Status
Shows all 14+ platforms with status:
- **YouTube** - Ready to upload
- **TikTok** - Ready to upload
- **Instagram** - Ready to upload
- **Facebook** - Ready to upload
- **Snapchat** - Ready to upload
- And 9+ more platforms...

### Recent Activity
- Last 10 uploads shown
- Status of each video
- Timestamp of processing

---

## 📤 Video Upload (Video yuklash)

Upload videos for distribution across all platforms.

### Upload Form Fields

**1. Channel Selection (Kanal)**
```
Dropdown showing all 10 animal channels:
├─ channel1: Qoyin (Rabbit)
├─ channel2: Panda
├─ channel3: Pingvin (Penguin)
├─ channel4: Yenot (Raccoon)
├─ channel5: Bo'ri (Wolf)
├─ channel6: Begemot (Hippo) - Russian
├─ channel7: Boyo'g'li (Owl) - German
├─ channel8: Timsoh (Crocodile) - Spanish
├─ channel9: Koala
└─ channel10: Lenivets (Sloth) - Russian
```

**2. Video File (Wideo fayli)**
- Click "Choose File" or drag-and-drop
- Supported: MP4, WebM, MKV, AVI
- Max size: 100MB (per file)
- Resolution: 1080p+ recommended
- Duration: 10-15 seconds optimal

**3. Video Title (Sarlavha)**
- Optional - AI will generate if not provided
- Max: 100 characters for most platforms
- Support: Multi-language (system auto-detects from channel)

**4. Video Description (Tavsif)**
- Optional - AI will generate if not provided
- Include context about the video
- Max: 500 characters

**5. AI Prompt/Context (Kontekst)**
- Highly recommended for better AI generation
- Example: "Cute rabbit doing cute things in the snow"
- Max: 300 characters
- Helps AI generate better metadata

### Upload Process

1. **Select Channel** - Choose which animal channel this video is for
2. **Upload Video** - Select video file (or drag-drop)
3. **Add Context** - Enter what the video is about
4. **Click Upload** - Submit to system
5. **AI Generates Metadata**:
   - Titles (in 5 languages)
   - Descriptions (platform-optimized)
   - Hashtags (trending + relevant)
   - CTAs (calls-to-action)
6. **Auto-Queue** - Video enters queue for distribution
7. **Smart Scheduling** - System picks optimal posting times

### Response

After upload, you'll see:
```json
{
  "success": true,
  "message": "Video added to queue",
  "taskId": "task_123456",
  "stats": {
    "pending": 30,
    "queued": 150,
    "platforms": 14
  }
}
```

---

## 📋 Queue (Navbat)

Monitor and manage the upload queue.

### Queue Status
Shows all pending uploads:

| Video | Channel | Platform | Status | Scheduled | Retry |
|-------|---------|----------|--------|-----------|-------|
| video_1 | Hippo | YouTube | Pending | 19:00 | - |
| video_2 | Panda | TikTok | Pending | 20:00 | - |
| video_3 | Owl | Instagram | Failed | - | ✓ |

### Queue Statistics
```
Total Pending: 30 videos
High Priority: 5 videos
Normal Priority: 20 videos
Low Priority: 5 videos

Total Queued: 150 uploads across 14 platforms
Expected to Complete: 2 hours
```

### Queue Actions

**Retry Failed Videos**
```
POST /api/queue/retry
{ "taskId": "task_123456" }
```

**Immediate Upload (Priority)**
```
POST /api/queue/retry-immediate
{ "taskId": "task_123456" }
```

**Clear Queue**
```
POST /api/clear-queue
→ Removes all pending uploads
⚠️ Action: Irreversible
```

### Queue Filtering

Filter by:
- Status (pending, processing, completed, failed)
- Channel (all 10 animal channels)
- Platform (all 14 platforms)
- Date range (last 7/30/90 days)

---

## 📊 Logs (Jurnallar)

Complete system logging and monitoring.

### Log Types

**Info Logs** (ℹ️ Blue)
```
- Video uploaded successfully
- Queue processed
- AI metadata generated
- Platform API connected
```

**Warning Logs** (⚠️ Orange)
```
- Rate limit approaching
- Slow API response
- Retry attempt #2
- Quota approaching limit
```

**Error Logs** (❌ Red)
```
- Upload failed
- API authentication error
- File processing error
- Platform unavailable
```

**Debug Logs** (🔧 Gray)
```
- Function called
- Parameter passed
- Processing step completed
```

### Log Information

Each log entry shows:
```
[2025-12-20 04:40:52]  [INFO]  [system/router]
GET /api/logs/paginated 200 OK (95ms)

Timestamp │ Level │ Component │ Message
```

### Log Actions

**View Logs**
```
GET /api/logs
→ Returns all logs (paginated)
```

**Clear All Logs**
```
POST /api/clear-logs
⚠️ Irreversible action
```

**Export Logs**
```
GET /api/logs/export
→ Downloads as JSON
```

**Search Logs**
```
Filter by:
- Level (info, warning, error, debug)
- Component (router, service, database)
- Time range
- Keyword search
```

---

## 🤖 Prompts (Promptlar)

Manage AI generation prompts for metadata.

### Prompt Types

**Channel Prompts**
- Specific to each animal channel
- Example: "Create cute, funny titles for rabbit videos"
- Used by AI for title/description generation

**Platform Prompts**
- Optimize for specific platforms
- Example: "TikTok titles: 35 chars max, trending sounds, hook in first 3 words"
- Ensures platform-specific compliance

**Language Prompts**
- Language-specific guidelines
- Example: "Russian: Use diminutive forms for cuteness, hashtags with кот/зайка"

### Prompt Management

**View All Prompts**
```
GET /api/prompts
→ Lists all active prompts
```

**View Channel Prompts**
```
GET /api/prompts/channel?channelId=channel1
→ Shows prompts for specific channel
```

**Validate Prompts**
```
POST /api/prompts/validate
{ "prompt": "Your prompt here" }
→ Checks for quality and compliance
```

**Improve Prompt**
```
POST /api/prompts/improve
{ "prompt": "Your prompt here" }
→ AI-enhanced version
→ Better: More specific, tested, optimized
```

**Update Prompt**
```
PUT /api/prompts/:id
{ "content": "Updated prompt" }
→ Save changes to database
```

### Prompt Best Practices

✅ **DO:**
- Be specific about tone and style
- Include constraints (length, hashtags, format)
- Mention target audience
- Include brand guidelines
- Test with sample videos

❌ **DON'T:**
- Too generic (avoid: "write a title")
- Contradictory instructions
- Too long (keep under 300 chars)
- Platform-specific in general prompts
- Include profanity or offensive content

### Example Prompts

**For Cute/Funny Videos:**
```
Create engaging, cute titles that make people smile. 
Use diminutives and soft language. 
Keep under 80 characters for compatibility.
Include at least one emoji for visual appeal.
```

**For TikTok:**
```
TikTok titles: 35 chars max, must start with hook.
Use trending sounds. Capitalize FIRST WORD to stand out.
Include relevant hashtags (max 3). No special characters.
```

**For Multi-Language:**
```
Generate in Russian using diminutive forms (зайка, котик).
Add cultural references familiar to Russian audience.
Use Cyrillic only, no Latin characters or Emoji.
```

---

## ⚙️ Settings (Sozlamalar)

Configure system and AI settings.

### AI Provider Settings

**Current Provider: Groq (LLaMA 3.1)**
```
✓ Active
✓ Metadata Generation: ENABLED
✓ Prompt Validation: ENABLED
✓ Improvement: ENABLED
```

**Alternative Providers:**
- **OpenRouter** - Fallback AI service
- **Auto Mode** - Switch between providers

### AI Settings

**Metadata Generation**
```
□ Enable titles
□ Enable descriptions
□ Enable hashtags
□ Enable CTAs
□ Language: Multi-language (5 langs)
```

**Quality Settings**
```
Tone: [Friendly/Professional/Casual]
Length: [Short/Medium/Long]
Emojis: [Always/Sometimes/Never]
Hashtags: [Trending/Relevant/Both]
```

### Platform Configuration

**YouTube Settings**
```
Client ID: [Configured]
Upload Quality: 1080p
Max Title Length: 100 chars
Allow Comments: Yes
Allow Embedding: Yes
```

**TikTok Settings**
```
Access Token: [Configured]
Video Duration: 10-60 seconds
Watermark: No
Sound: Auto
```

**Per-Channel Configuration**
```
Override global settings for specific channels:
- Channel 6 (Hippo): Russian language, Moscow timezone
- Channel 7 (Owl): German language, Berlin timezone
- Channel 8 (Crocodile): Spanish language, Mexico City timezone
- etc.
```

### System Settings

**Daily Limits**
```
Videos per channel: 3/day
Max queue size: 1000 uploads
Max retry attempts: 3
Retry backoff: Exponential
```

**Timezone Settings**
```
Auto-detect: Enabled
Override: [Timezone dropdown]
Affects: Optimal posting times
```

**Logging**
```
Log Level: [Debug/Info/Warning/Error]
Log Retention: 30 days
Auto-archive: After 30 days
```

---

## 🌐 Language Support

### Available Languages

**Uzbek (O'zbekcha)**
- Default language
- Full interface translation
- Turkmen script support

**Turkmen (Türkmençe)**
- Complete translation
- Turkmen-specific terminology
- Regional customization

### Language Switching

1. **Via Dropdown** (bottom-left sidebar)
   - Select "O'zbekcha" or "Türkmençe"
   - Changes immediately

2. **Automatic Detection**
   - Based on browser language
   - Respects browser settings

3. **Remember Preference**
   - Saved in local storage
   - Persists across sessions

### Translation Keys

All interface elements use translation keys:
```
dashboard.title → "Boshqaruv paneli"
nav.upload → "Video yuklash"
nav.queue → "Navbat"
toast.success → "Üstünlik"
```

---

## 📱 Interface Elements

### Sidebar Navigation

**Active Section**
- Highlighted in blue
- Shows current page
- Click to navigate

**Navigation Items**
```
📊 Boshqaruv paneli (Dashboard)
📤 Video yuklash (Upload)
📋 Navbat (Queue)
📄 Jurnallar (Logs)
📝 Promptlar (Prompts)
⚙️ Sozlamalar (Settings)
```

### Top Header

**Left Side:**
- Menu toggle (mobile)
- Page title
- Current section name

**Right Side:**
- 🔄 Refresh button
- 🔔 Notifications
- Notification badge (count)

### Status Indicators

**Health Status** (bottom-left)
```
🟢 Connected - System running normally
🟡 Warning - Issues detected
🔴 Error - Critical issues
⚫ Checking - Verifying connection
```

### Modals & Dialogs

**Confirmation Dialog**
- Used for destructive actions
- Clear message about what's happening
- Cancel or Confirm options

**Loading Spinner**
- During upload
- During AI generation
- During API calls

**Toast Notifications**
- Bottom-right corner
- Auto-dismiss after 3 seconds
- Types: success, error, warning, info

---

## 🎯 Common Workflows

### Upload & Distribute Video

```
1. Click "Video yuklash" (Upload)
2. Select channel (e.g., Hippo)
3. Upload video file
4. Add optional title/description
5. Add context/prompt
6. Click "Yuklash" (Upload)
7. AI generates metadata (30 seconds)
8. Video queued for distribution
9. System schedules optimal posting times
10. Videos uploaded to 14 platforms
```

### Monitor Queue

```
1. Click "Navbat" (Queue)
2. View pending uploads
3. See scheduled times
4. Check platform status
5. Retry failed uploads if needed
6. Monitor progress in real-time
```

### Check Logs

```
1. Click "Jurnallar" (Logs)
2. Filter by level (info/warning/error)
3. Search for specific events
4. Check timestamps
5. Export if needed
```

### Optimize Prompts

```
1. Click "Promptlar" (Prompts)
2. View current prompts
3. Validate prompt quality
4. Use AI to improve
5. Test with sample videos
6. Update in settings
```

---

## 🔧 Troubleshooting

### Videos Not Uploading

**Check:**
1. File size (max 100MB)
2. File format (MP4/WebM/MKV)
3. Queue status (not full?)
4. Platform credentials (Settings)
5. API keys (Environment variables)

**Solution:**
- Retry failed uploads
- Check logs for errors
- Verify credentials
- Contact support

### Slow Performance

**Check:**
1. Network connection
2. Browser console (errors?)
3. Queue size (too many?)
4. API response time
5. Server load

**Solution:**
- Clear browser cache
- Refresh page
- Clear old logs
- Reduce queue size
- Check server status

### Wrong Metadata

**Check:**
1. Prompt quality
2. AI provider settings
3. Language detection
4. Platform-specific rules

**Solution:**
- Improve prompt (use Improve button)
- Add more context
- Check language settings
- Validate prompt quality

### Platform Upload Failed

**Check:**
1. Platform credentials (Settings)
2. API key expiration
3. Rate limiting
4. Platform API status
5. Video format (platform-specific)

**Solution:**
- Refresh credentials
- Retry upload
- Check platform API docs
- Verify video format
- Contact platform support

---

## 📞 Support & Resources

### Quick Links

- **Documentation:** [SETUP.md](./SETUP.md)
- **Workflow Guide:** [WORKFLOW_GUIDE.md](./WORKFLOW_GUIDE.md)
- **API Endpoints:** See WORKFLOW_GUIDE.md
- **Environment Setup:** [.env.example](./.env.example)

### Getting Help

1. **Check Logs** - Most errors are logged with solutions
2. **Read Documentation** - Comprehensive guides available
3. **Test Endpoints** - Use Postman or curl
4. **Contact Support** - GitHub Issues

### System Status

- Health indicator (bottom-left)
- API status in logs
- Platform connectivity shown in dashboard

---

## 🚀 Tips & Tricks

**Pro Tips:**
- ✓ Add detailed prompts for better AI metadata
- ✓ Use specific language for each channel
- ✓ Monitor logs to catch issues early
- ✓ Test prompts before using in production
- ✓ Keep API keys secure in environment variables
- ✓ Use language switcher to check translations
- ✓ Enable notifications for queue alerts

**Best Practices:**
1. Always add video context/prompt
2. Use animal channel personalities
3. Monitor queue regularly
4. Check logs daily
5. Update prompts monthly
6. Keep platform credentials fresh
7. Test with sample videos

---

**Frontend Version:** 1.0.0  
**Last Updated:** 2025-12-20  
**Status:** ✅ Production Ready
