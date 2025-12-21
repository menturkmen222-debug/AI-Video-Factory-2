## Overview

This project is an AI-powered system built with Cloudflare Workers for automating video uploads to multiple social media platforms. Its primary purpose is to streamline the content distribution process by leveraging AI for metadata generation and handling multi-platform, multi-language, and timezone-aware scheduling.

**Key Capabilities:**
- Store videos via Cloudinary.
- Generate metadata (title, description, tags) automatically using Groq AI.
- Upload to 16+ social media platforms (YouTube, TikTok, Instagram, Facebook, Snapchat, Pinterest, X, Reddit, LinkedIn, Twitch, Kwai, Likee, Dzen, Rumble, Odysee, Dailymotion).
- Manage daily upload limits per channel.
- Provide multi-language adaptation (20+ languages) and timezone-aware scheduling.
- Maintain comprehensive logging and monitoring.

## User Preferences

I prefer detailed explanations.
Do not make changes to the folder Z.
Do not make changes to the file Y.

## System Architecture

The system utilizes Cloudflare Workers (TypeScript) as its runtime environment, employing a stateless architecture with Cloudflare KV for state management across `VIDEO_QUEUE`, `LOGS`, and `PROMPTS`.

**UI/UX Decisions:**
- Responsive UI designed for both desktop and mobile.
- Internationalization (i18n) support with translation files for various languages (e.g., Uzbek, Turkmen) and a language switcher.

**Technical Implementations:**
- **Core Video Model (VideoTemplate):** A single base video serves as the content item, with language-agnostic base prompts and automatic metadata generation per language, avoiding video file duplication.
- **Language Auto-Adapt System:** Automatically detects assigned language for each channel and adapts titles, descriptions, hashtags, and CTAs for 20+ supported languages. No mixed languages are allowed.
- **Platform Auto-Adapt System:** Applies platform-specific rules (aspect ratio, duration, metadata limits) while using the same video content, adjusting only formatting, not content meaning.
- **Scheduling & Time Logic:** Automates timezone calculation per language/region to determine optimal posting times for each platform, eliminating manual scheduling and avoiding collisions.
- **Channel Structure:** Enforces a strict structure of 5 channels per language, with 5 videos per channel per day, totaling 25 videos per day per language.
- **AI Integration:** Uses Groq API (LLaMA 3.1) for intelligent metadata generation and prompt validation/improvement.
- **Backend-Frontend Sync:** All critical frontend features have corresponding backend endpoints, maintaining excellent synchronization, with polling for updates every 5 seconds.
- **Error Handling:** Implements exponential backoff retry logic, static fallback metadata if AI fails, graceful degradation on API failures, and auto-detection of the best Groq model.
- **KV Database Optimization:** Utilizes TTL-based expiration, batch operations to prevent rate limiting, cursor-based pagination, and separate namespaces for different data types.

**Feature Specifications:**
- **Prompt Management:** CRUD operations, validation, and AI-powered improvement for prompts.
- **Video Processing Pipeline:** Includes color adjustment, slow motion, audio pitch adjustment, logo overlay, and metadata cleaning using FFmpeg.
- **File System Manager:** Organizes videos, logos, and audio files with a structured directory for 660 profiles (channel, language, platform combinations).
- **Queue Manager:** Manages tasks with priority (High, Normal, Low), persistence using `task_list.json`, exponential backoff retry, and scheduled time awareness.
- **AI Provider Switching:** Allows switching between Groq, OpenRouter, or an auto-mode for AI metadata generation.

## External Dependencies

- **Runtime:** Cloudflare Workers
- **Storage:** Cloudflare KV (for `VIDEO_QUEUE`, `LOGS`, `PROMPTS` namespaces)
- **Media Management:** Cloudinary
- **AI Services:**
    - Groq API (LLaMA 3.1 for metadata generation)
    - OpenRouter (as an alternative AI provider, integrating with various models like GPT-4, Claude)
- **Social Media Platforms (Integrated via APIs):**
    - YouTube Data API v3
    - TikTok for Developers API
    - Instagram Graph API
    - Facebook Graph API
    - Snapchat Business API
    - Pinterest Video Pins API
    - X (Twitter) API
    - Reddit API
    - LinkedIn API
    - Twitch Clips API
    - Kwai Open Platform API
    - Likee Creator API
    - Dzen (Yandex) API
    - Rumble API
    - Odysee/LBRY API
    - Dailymotion Partner API
## Frontend Documentation

**Complete Frontend Guide Available:** [FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)

The frontend is a modern, responsive dashboard with:
- Multi-language support (Uzbek & Turkmen)
- Real-time statistics and monitoring
- Video upload with AI metadata generation
- Queue management with scheduling
- Comprehensive logging system
- Prompt management and optimization
- Settings and configuration panel

**Key Pages:**
- Dashboard (Boshqaruv paneli) - Statistics and platform status
- Upload (Video yuklash) - Upload videos and add metadata
- Queue (Navbat) - Monitor pending uploads and schedules
- Logs (Jurnallar) - View system logs and errors
- Prompts (Promptlar) - Manage AI generation prompts
- Settings (Sozlamalar) - Configure AI providers and platforms

**Features:**
- ✅ Real-time dashboard with live stats
- ✅ Responsive design (desktop & mobile)
- ✅ Multi-language interface (Uzbek, Turkmen)
- ✅ AI-powered metadata generation
- ✅ Automatic queue management
- ✅ Comprehensive logging and monitoring
- ✅ Platform-specific optimization
- ✅ Health status indicator
- ✅ Toast notifications
- ✅ Keyboard shortcuts support

## Cloudinary Cleanup Function

**Guide:** [CLEANUP_GUIDE.md](./CLEANUP_GUIDE.md)

Automatic temporary file cleanup after successful uploads:
- Deletes Cloudinary temp files after all platform uploads succeed
- Saves storage space on free tier accounts
- Non-blocking, asynchronous operation
- Proper error handling and logging
- Tracked via `cloudinaryPublicId` in queue entries

**Implementation:**
- `CloudinaryService.deleteResource()` - Delete single file
- `CloudinaryService.cleanupTemporaryFiles()` - Batch delete
- Integrated into `schedule.ts` after successful uploads
- Errors logged as warnings (non-critical)
