#!/bin/bash

# Legal Pages Test Script
echo "🔍 Testing Legal Pages for AlphaPebble"
echo "======================================"

BASE_URL="https://alphapebble.io"

# Test Privacy Policy
echo ""
echo "📄 Testing Privacy Policy..."
PRIVACY_STATUS=$(curl -L -s -o /dev/null -w "%{http_code}" "$BASE_URL/privacy-policy")
if [ "$PRIVACY_STATUS" = "200" ]; then
    echo "✅ Privacy Policy: WORKING ($PRIVACY_STATUS)"
    # Check if content contains key sections
    PRIVACY_CONTENT=$(curl -s "$BASE_URL/privacy-policy" | grep -c "Information We Collect\|Data Security\|Your Rights")
    if [ "$PRIVACY_CONTENT" -gt 2 ]; then
        echo "   ✅ Content includes key sections"
    else
        echo "   ⚠️  Content may be incomplete"
    fi
else
    echo "❌ Privacy Policy: FAILED ($PRIVACY_STATUS)"
fi

# Test Terms of Service
echo ""
echo "📄 Testing Terms of Service..."
TERMS_STATUS=$(curl -L -s -o /dev/null -w "%{http_code}" "$BASE_URL/terms-of-service")
if [ "$TERMS_STATUS" = "200" ]; then
    echo "✅ Terms of Service: WORKING ($TERMS_STATUS)"
    # Check if content contains key sections
    TERMS_CONTENT=$(curl -s "$BASE_URL/terms-of-service" | grep -c "Acceptance of Terms\|Use of Services\|Intellectual Property")
    if [ "$TERMS_CONTENT" -gt 2 ]; then
        echo "   ✅ Content includes key sections"
    else
        echo "   ⚠️  Content may be incomplete"
    fi
else
    echo "❌ Terms of Service: FAILED ($TERMS_STATUS)"
fi

# Test Footer Links
echo ""
echo "🔗 Testing Footer Links..."
HOMEPAGE_LINKS=$(curl -s "$BASE_URL" | grep -c 'href="/')
if [ "$HOMEPAGE_LINKS" -gt 0 ]; then
    echo "✅ Footer contains legal links ($HOMEPAGE_LINKS found)"
else
    echo "❌ Footer missing legal links"
fi

echo ""
echo "📊 Summary:"
if [ "$PRIVACY_STATUS" = "200" ] && [ "$TERMS_STATUS" = "200" ] && [ "$HOMEPAGE_LINKS" -gt 0 ]; then
    echo "🎉 All legal pages are working correctly!"
else
    echo "⚠️  Some issues found. Check the output above."
fi

echo ""
echo "🌐 Legal Page URLs:"
echo "   Privacy Policy: $BASE_URL/privacy-policy"
echo "   Terms of Service: $BASE_URL/terms-of-service"