# AutoOZ - AI Video Uploader Dashboard

A Cloudflare Worker-based automated video publishing system that uploads videos to multiple social media platforms with AI-generated metadata.

## Features

- **Multi-Platform Upload**: Automatically publish videos to YouTube, TikTok, Instagram, and Facebook
- **AI-Powered Metadata**: Uses Groq AI (LLaMA 3.1) to generate optimized titles, descriptions, and tags
- **Cloud Storage**: Videos stored via Cloudinary for reliable delivery
- **Queue Management**: Built-in queue system with status tracking
- **Rate Limiting**: 50 uploads per channel per day limit
- **Full Logging**: Comprehensive logging and monitoring
- **Multi-Language**: Supports Uzbek and Turkmen languages

## Tech Stack

- **Runtime**: Cloudflare Workers
- **Language**: TypeScript
- **Storage**: Cloudflare KV (VIDEO_QUEUE, LOGS)
- **Media**: Cloudinary
- **AI**: Groq API (LLaMA 3.1)
- **Platforms**: YouTube Data API v3, TikTok, Instagram Graph API, Facebook Graph API

## Project Structure

```
/src
  /routes         - API endpoints
    upload.ts     - Video upload handling
    schedule.ts   - Scheduler and platform upload
    stats.ts      - Logs and statistics
    frontend.ts   - Frontend asset serving
  /services       - External services
    cloudinary.ts - Cloudinary integration
    groq.ts       - AI metadata generation
  /platforms      - Platform uploaders
    youtube.ts    - YouTube Data API v3
    tiktok.ts     - TikTok for Developers API
    instagram.ts  - Instagram Graph API (Reels)
    facebook.ts   - Facebook Graph API (Reels)
  /db             - KV database handlers
    queue.ts      - Video queue management
    logs.ts       - Log management
  /utils          - Utility functions
    logger.ts     - Logging system
    time.ts       - Time utilities
  /frontend       - Frontend assets
    assets.ts     - HTML, CSS, JS content
  index.ts        - Main entry point
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload-video` | Upload a new video to the queue |
| POST | `/run-schedule` | Manually trigger the scheduler |
| GET | `/api/logs` | Retrieve system logs |
| POST/GET | `/api/clear-logs` | Clear all logs |
| POST/GET | `/api/clear-queue` | Clear the video queue |
| GET | `/api/stats` | Get queue statistics and videos |
| GET | `/health` | Health check endpoint |
| GET | `/` | Dashboard UI |

## Environment Variables

Configure the following environment variables in your Cloudflare Worker:

| Variable | Description |
|----------|-------------|
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `GROQ_API_KEY` | Groq API key for AI |
| `YOUTUBE_API_KEY` | YouTube Data API key |
| `TIKTOK_CLIENT_KEY` | TikTok API client key |
| `INSTAGRAM_ACCESS_TOKEN` | Instagram Graph API token |
| `FACEBOOK_ACCESS_TOKEN` | Facebook Graph API token |

## KV Namespaces

Create these KV namespaces in Cloudflare Dashboard:

- `VIDEO_QUEUE` - Stores video queue entries
- `LOGS` - Stores system logs

## Deployment

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `wrangler.toml` with your KV namespace IDs
4. Set environment variables in Cloudflare Dashboard
5. Deploy:
   ```bash
   wrangler deploy
   ```

## Development

Run locally with Miniflare:

```bash
npx wrangler dev --port 5000 --ip 0.0.0.0 --local
```

## Video Upload Flow

1. User uploads video with prompt and channel selection
2. Video is stored in Cloudinary
3. Queue entry is created with video URL and metadata
4. Scheduler processes pending videos
5. AI generates title, description, and tags using the prompt
6. Video is uploaded to all selected platforms with identical metadata

## Cron Job

The scheduler (`/run-schedule`) runs automatically every 5 minutes to process pending videos. You can also trigger it manually from the dashboard.

## License

MIT
