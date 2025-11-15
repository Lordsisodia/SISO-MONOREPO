#!/bin/bash
# SISO-PARTNERSHIPS Production Deployment Setup Script

set -e

echo "🚀 SISO-PARTNERSHIPS Deployment Setup"
echo "======================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel. Please run 'vercel login' first."
    exit 1
fi

echo "✅ Vercel authentication verified"

# Run build to ensure everything works
echo "🔨 Testing build process..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

# Deploy to production
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Configure custom domain in Vercel dashboard"
echo "2. Set up environment variables for production"
echo "3. Configure Supabase project for partnerships"
echo "4. Test all partnership workflows"
echo ""
echo "Deployment URL will be shown above ☝️"