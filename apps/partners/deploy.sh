#!/bin/bash

echo "🚀 SISO Partnership Portal Deployment Script"
echo "=============================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env file. Please update it with your actual values.${NC}"
    exit 1
fi

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Run build
echo -e "${YELLOW}🔨 Building production version...${NC}"
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed! No dist directory found.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully!${NC}"

# Deployment options
echo ""
echo "Choose deployment method:"
echo "1) Deploy to Vercel"
echo "2) Deploy to Netlify"
echo "3) Deploy to Custom Server"
echo "4) Generate deployment files only"

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo -e "${YELLOW}🚀 Deploying to Vercel...${NC}"
        if ! command -v vercel &> /dev/null; then
            echo -e "${RED}❌ Vercel CLI not found. Install it with: npm i -g vercel${NC}"
            exit 1
        fi
        vercel --prod
        ;;
    2)
        echo -e "${YELLOW}🚀 Deploying to Netlify...${NC}"
        if ! command -v netlify &> /dev/null; then
            echo -e "${RED}❌ Netlify CLI not found. Install it with: npm i -g netlify-cli${NC}"
            exit 1
        fi
        netlify deploy --prod --dir=dist
        ;;
    3)
        echo -e "${YELLOW}📁 Preparing for custom server deployment...${NC}"
        # Create deployment package
        tar -czf siso-partnerships-deploy.tar.gz dist/
        echo -e "${GREEN}✅ Deployment package created: siso-partnerships-deploy.tar.gz${NC}"
        echo ""
        echo "To deploy to your server:"
        echo "1. Upload siso-partnerships-deploy.tar.gz to your server"
        echo "2. Extract: tar -xzf siso-partnerships-deploy.tar.gz"
        echo "3. Point your web server to the 'dist' directory at /partners path"
        echo "4. Configure your domain (siso.agency/partners) to point to your server"
        ;;
    4)
        echo -e "${GREEN}✅ Build files ready in 'dist' directory${NC}"
        echo ""
        echo "You can now:"
        echo "- Upload the 'dist' folder to any static hosting service"
        echo "- Use a CDN like Cloudflare Pages, AWS S3, or Google Cloud Storage"
        echo "- Deploy using GitHub Pages or GitLab Pages"
        ;;
    *)
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Deployment process completed!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure siso.agency/partners subdirectory routing"
echo "2. Configure SSL certificate (automatic with Vercel/Netlify)"
echo "3. Set up environment variables in your hosting platform"
echo "4. Test partnership portal functionality on production"