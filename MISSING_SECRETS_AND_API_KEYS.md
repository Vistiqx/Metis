# Missing Secrets and API Keys

This document lists all API keys and secrets needed for full Metis functionality.

## 🔑 Required for AI Features

### OpenAI (Recommended)
```env
OPENAI_API_KEY=sk-...
```
- Get from: https://platform.openai.com/api-keys
- Cost: Pay per token usage
- Used for: Event summaries, case reports, daily briefings, chat

### Anthropic Claude (Alternative)
```env
ANTHROPIC_API_KEY=sk-ant-...
```
- Get from: https://console.anthropic.com/
- Cost: Pay per token usage
- Used for: Same as OpenAI, different model

## 🔑 Required for Social Ingestion

### Reddit
```env
REDDIT_CLIENT_ID=...
REDDIT_CLIENT_SECRET=...
REDDIT_USER_AGENT=Metis-OSINT/0.1.0
```
- Get from: https://www.reddit.com/prefs/apps
- Cost: Free (with rate limits)
- Used for: Subreddit monitoring, post ingestion

### X (Twitter)
```env
TWITTER_API_KEY=...
TWITTER_API_SECRET=...
TWITTER_BEARER_TOKEN=...
```
- Get from: https://developer.twitter.com/
- Cost: Free tier available, paid for higher limits
- Used for: Tweet monitoring, user tracking

### Telegram
```env
TELEGRAM_API_ID=...
TELEGRAM_API_HASH=...
```
- Get from: https://my.telegram.org/
- Cost: Free
- Used for: Channel monitoring

### YouTube
```env
YOUTUBE_API_KEY=...
```
- Get from: https://console.cloud.google.com/
- Cost: Free tier available
- Used for: Video metadata, comment tracking

## 🔑 Optional External Services

### News APIs
```env
NEWSAPI_KEY=...
```
- Get from: https://newsapi.org/
- Cost: Free tier available
- Used for: News article ingestion

### Geocoding
```env
GOOGLE_MAPS_API_KEY=...
MAPBOX_ACCESS_TOKEN=...
```
- Get from respective provider
- Used for: Location resolution, map display

## 🔐 Security Secrets

### JWT (Already set in .env.example)
```env
JWT_SECRET_KEY=your-super-secret-key
```
- Generate: `openssl rand -hex 32`
- Must be changed for production!

### Database Passwords
```env
POSTGRES_PASSWORD=secure-password
NEO4J_PASSWORD=secure-password
```
- Should be strong, random passwords
- Different for each environment

### Object Storage
```env
S3_ACCESS_KEY=minioadmin  # Change for production
S3_SECRET_KEY=minioadmin   # Change for production
```

## 🔧 Monitoring (Optional)

### Sentry (Error Tracking)
```env
SENTRY_DSN=https://...
```
- Get from: https://sentry.io/
- Cost: Free tier available
- Used for: Error tracking and alerts

## 📋 Configuration Checklist

Copy this into your `.env` file and fill in:

```env
# AI / LLM
OPENAI_API_KEY=                      # Required for AI features
ANTHROPIC_API_KEY=                   # Alternative to OpenAI

# Social Media
TWITTER_BEARER_TOKEN=                # For X/Twitter connector
REDDIT_CLIENT_ID=                    # For Reddit connector
REDDIT_CLIENT_SECRET=                # For Reddit connector
TELEGRAM_API_ID=                     # For Telegram connector
TELEGRAM_API_HASH=                   # For Telegram connector
YOUTUBE_API_KEY=                     # For YouTube connector

# External Services
NEWSAPI_KEY=                         # For news ingestion
GOOGLE_MAPS_API_KEY=                 # For geocoding
MAPBOX_ACCESS_TOKEN=                 # Alternative geocoding

# Security - CHANGE THESE!
JWT_SECRET_KEY=change-me-in-production
POSTGRES_PASSWORD=change-me-in-production
NEO4J_PASSWORD=change-me-in-production
```

## 🎯 Priority Order

1. **JWT_SECRET_KEY** - Required for authentication
2. **Database passwords** - Required for security
3. **OPENAI_API_KEY** - Enables AI analyst features
4. **Social media keys** - Enables social ingestion
5. **External services** - Enhances capabilities

## 📝 Notes

- **Never commit secrets to git!**
- `.env` is in `.gitignore` - keep it local
- Use different keys for dev/staging/production
- Rotate keys regularly
- Monitor API usage and costs
- Some APIs have strict rate limits

## 🚀 Without API Keys

Metis works without external API keys:
- ✅ Core functionality (cases, events, evidence)
- ✅ RSS ingestion
- ✅ Analysis engine
- ✅ Threat modeling
- ✅ Frontend UI

Missing:
- ❌ AI summaries and chat
- ❌ Social media ingestion (Reddit, X, etc.)
- ❌ Advanced geocoding

---

**Minimum viable:** Just JWT and database passwords  
**Recommended:** Add OpenAI for AI features  
**Full functionality:** Add all social media keys
