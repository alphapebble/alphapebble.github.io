# Cloudflare Workers Deployment Guide

## 🚀 Deployment Status

✅ **Successfully deployed to Cloudflare Workers!**

- **Production URL**: https://alphapebble.io
- **Alternative URL**: https://www.alphapebble.io
- **Health Check**: https://alphapebble.io/api/health

## 📋 Deployment Information

### Current Configuration
- **Worker Name**: alphapebble
- **R2 Bucket**: alphapebble-opennext-cache (for ISR cache)
- **Routes**: 
  - alphapebble.io/*
  - www.alphapebble.io/*

### Build & Deployment Commands

#### Quick Deploy
```bash
npm run deploy
```

#### Manual Build & Deploy
```bash
# Build the application
npm run build

# Deploy to Cloudflare Workers
wrangler deploy
```

#### Preview Deployment
```bash
npm run deploy:preview
```

### Development Commands

#### Local Development with Wrangler
```bash
npm run dev
```

#### Local Development with Next.js
```bash
npm run dev:next
```

## 🔧 Configuration Files

### Key Files
- `wrangler.toml` - Cloudflare Workers configuration
- `open-next.config.ts` - OpenNext configuration for Cloudflare
- `next.config.mjs` - Next.js configuration with Cloudflare optimizations

### Environment Setup
- R2 bucket for incremental static regeneration cache
- Service bindings for self-reference
- Custom routes for domain routing

## 📊 Performance Features

### Enabled Optimizations
- ✅ Static asset caching with R2
- ✅ Incremental Static Regeneration (ISR)
- ✅ Edge caching with appropriate headers
- ✅ Gzip compression
- ✅ Image optimization (unoptimized for Workers compatibility)
- ✅ Service Worker for offline support

### Security Features
- ✅ Content Security Policy (CSP)
- ✅ Security headers (XSS, CSRF protection)
- ✅ Frame protection
- ✅ HTTPS enforcement

## 🏥 Health Monitoring

### Health Check Endpoint
```bash
curl https://alphapebble.io/api/health
```

### Security Headers Check
```bash
curl https://alphapebble.io/api/security/headers
```

### Performance Monitoring
```bash
# Run Lighthouse audit
npm run lighthouse

# Analyze bundle size
npm run analyze
```

## 🔄 Deployment History

### Version: 05e58a8e-5036-4fd6-afb2-b42b0676f5f8
- **Deployed**: October 15, 2025
- **Status**: ✅ Active
- **Features**: Full Next.js 15 app with OpenNext Cloudflare adapter

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   npm run clean
   npm run build
   ```

2. **Cache Issues**
   ```bash
   wrangler r2 object delete alphapebble-opennext-cache --recursive
   ```

3. **Route Issues**
   - Check `wrangler.toml` route configuration
   - Verify DNS settings in Cloudflare dashboard

### Useful Commands

```bash
# Check deployment status
wrangler deployments list

# View logs
wrangler tail

# Check R2 bucket
wrangler r2 bucket list

# Update Wrangler
npm install -g wrangler@latest
```

## 📈 Next Steps

1. **Set up CI/CD**: Automate deployments via GitHub Actions
2. **Custom Domain**: Configure custom domain in Cloudflare dashboard
3. **Analytics**: Set up Cloudflare Analytics or external monitoring
4. **Performance**: Monitor Core Web Vitals and optimize further

---

*Generated on: October 15, 2025*
*Worker ID: 05e58a8e-5036-4fd6-afb2-b42b0676f5f8*