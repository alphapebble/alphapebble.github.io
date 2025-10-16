#!/bin/bash

# CSP Test Script for Alpha Pebble Website
# Tests if the Content Security Policy allows necessary scripts

echo "🔍 Testing CSP Configuration for alphapebble.io"
echo "================================================="

# Test main page
echo "📄 Testing main page..."
curl -s -I https://alphapebble.io | grep -i "content-security-policy" | head -1

echo ""
echo "✅ Key CSP directives that should be present:"
echo "- script-src-elem 'self' 'unsafe-inline' (for Next.js inline scripts)"
echo "- script-src 'self' 'unsafe-inline' 'unsafe-eval' (for Next.js)"
echo "- style-src 'self' 'unsafe-inline' (for styles)"

echo ""
echo "🌐 Testing website functionality..."

# Test if the page loads without errors
response=$(curl -s -o /dev/null -w "%{http_code}" https://alphapebble.io)
if [ "$response" = "200" ]; then
    echo "✅ Website loads successfully (HTTP 200)"
else
    echo "❌ Website failed to load (HTTP $response)"
fi

# Test API endpoint
api_response=$(curl -s -o /dev/null -w "%{http_code}" https://alphapebble.io/api/health)
if [ "$api_response" = "200" ]; then
    echo "✅ API endpoint works (HTTP 200)"
else
    echo "❌ API endpoint failed (HTTP $api_response)"
fi

echo ""
echo "🛡️ Security headers check:"
curl -s -I https://alphapebble.io | grep -E "(x-frame-options|x-content-type-options|x-xss-protection|strict-transport-security)"

echo ""
echo "📝 To check for CSP violations in browser:"
echo "1. Open https://alphapebble.io in your browser"
echo "2. Open Developer Tools (F12)"
echo "3. Check Console for CSP errors"
echo "4. All scripts should load without 'Refused to execute' errors"

echo ""
echo "🔧 If you still see CSP errors, the issue might be:"
echo "- Browser cache (try hard refresh: Ctrl+Shift+R)"
echo "- CDN cache (wait 5-10 minutes for propagation)"