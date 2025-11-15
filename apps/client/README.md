# SISO Core - Clean Agency Onboarding Platform

A clean, working version of the SISO Agency Onboarding Platform without dev tool dependencies.

## 🚀 Features

- **Client Management**: Complete client onboarding and management system
- **Task Tracking**: Advanced task management with categories and priorities  
- **Admin Dashboard**: Comprehensive admin interface with stats and insights
- **User Authentication**: Secure Supabase-based authentication
- **Responsive Design**: Mobile-first responsive interface

## 🛠️ Tech Stack

- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Supabase with comprehensive schema
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## 🏃‍♂️ Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase credentials to .env

# Start development server
npm run dev
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔧 Environment Setup

Required environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utilities and helpers
├── types/         # TypeScript definitions
└── integrations/  # External service integrations
```

## 🎯 Core Components

- **AdminDashboard**: Main admin interface with tabs for overview, tasks, and reports
- **Task Management**: Complete task system with categories and priorities
- **Client System**: Client onboarding and management workflows
- **Authentication**: Secure user auth with role-based access

This is a clean, production-ready version of the SISO Agency platform focused on core functionality without development tool dependencies.