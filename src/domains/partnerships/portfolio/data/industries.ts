/**
 * Portfolio Domain - Industry Definitions
 */

import { Industry, IndustryCategory } from '../types';
import { 
  Palmtree,
  Wallet,
  HeartPulse,
  HardHat,
  GraduationCap,
  BookOpen,
  Dumbbell,
  Car,
  UtensilsCrossed,
  Rocket
} from 'lucide-react';

export const industries: Industry[] = [
  {
    id: 'tourism-activities',
    name: 'Tourism & Activities',
    slug: 'tourism-activities',
    description:
      'Booking platforms, rental systems, and tour management apps for tourism businesses.',
    icon: Palmtree,
    color: 'bg-cyan-500',
    headerImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=400&fit=crop',
    templateShowcase: {
      description: 'Pre-built booking flows, calendar systems, and payment integration',
      reusableComponents: [
        'Activity Calendar',
        'Booking System',
        'Payment Processing',
        'Admin Dashboard',
      ],
    },
    seoMetadata: {
      title: 'Tourism & Activities App Development | SISO Agency',
      description:
        'Build your tourism, rental, or activity booking app in 48 hours. See our work with Mayorker Activities.',
      keywords: ['tourism app', 'booking platform', 'rental system', 'activity booking'],
    },
  },
  {
    id: 'fintech-crypto',
    name: 'Fintech & Crypto',
    slug: 'fintech-crypto',
    description: 'Secure financial applications, crypto wallets, and trading platforms.',
    icon: Wallet,
    color: 'bg-green-500',
    headerImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=400&fit=crop',
    templateShowcase: {
      description: 'Financial dashboards, secure authentication, and real-time data',
      reusableComponents: [
        'Crypto Wallet',
        'Trading Interface',
        'Portfolio Tracker',
        'Security Systems',
      ],
    },
    seoMetadata: {
      title: 'Fintech & Crypto App Development | SISO Agency',
      description:
        'Launch your fintech or crypto app in 48-72 hours. See our work with Uber Crypt.',
      keywords: ['fintech app', 'crypto wallet', 'trading platform', 'blockchain app'],
    },
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    slug: 'health-wellness',
    description: 'Health tracking, habit formation, and wellness management applications.',
    icon: HeartPulse,
    color: 'bg-pink-500',
    headerImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop',
    templateShowcase: {
      description: 'Habit tracking, health metrics, and user engagement systems',
      reusableComponents: [
        'Daily Habit Tracker',
        'Streak Management',
        'Progress Analytics',
        'Notification System',
      ],
    },
    seoMetadata: {
      title: 'Health & Wellness App Development | SISO Agency',
      description: 'Build your health and wellness tracking app in 48 hours. See our work with Shout.',
      keywords: ['health app', 'wellness tracker', 'habit formation', 'fitness app'],
    },
  },
  {
    id: 'construction',
    name: 'Construction & Maintenance',
    slug: 'construction',
    description:
      'Project management, scheduling, and client portal systems for construction companies.',
    icon: HardHat,
    color: 'bg-orange-500',
    headerImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=400&fit=crop',
    templateShowcase: {
      description: 'Job tracking, resource management, and client communication tools',
      reusableComponents: [
        'Project Scheduler',
        'Job Tracking',
        'Resource Management',
        'Client Portal',
      ],
    },
    seoMetadata: {
      title: 'Construction Management Software | SISO Agency',
      description:
        'Build your construction management system in 48-72 hours. See our work with Optimal and NM Construction.',
      keywords: [
        'construction software',
        'project management',
        'contractor app',
        'job tracking',
      ],
    },
  },
  {
    id: 'saas',
    name: 'SaaS Platforms',
    slug: 'saas',
    description: 'Software-as-a-Service platforms with subscription management, user onboarding, and team collaboration features.',
    icon: Rocket,
    color: 'bg-blue-500',
    headerImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=400&fit=crop',
    templateShowcase: {
      description: 'User onboarding, subscription management, and collaborative features',
      reusableComponents: [
        'User Matching System',
        'Messaging Platform',
        'Profile Management',
        'Admin Dashboard',
      ],
    },
    seoMetadata: {
      title: 'SaaS Platform Development | SISO Agency',
      description:
        'Build your SaaS platform in 48-72 hours. See our work with SISO Internal and other collaborative platforms.',
      keywords: ['saas development', 'subscription software', 'team collaboration', 'platform development'],
    },
  },
  {
    id: 'elearning',
    name: 'E-Learning & Courses',
    slug: 'elearning',
    description: 'Online course platforms, learning management systems, and educational marketplaces.',
    icon: BookOpen,
    color: 'bg-purple-500',
    headerImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=400&fit=crop',
    templateShowcase: {
      description: 'Course catalogs, payment processing, and student portals',
      reusableComponents: [
        'Course Catalog',
        'Payment Integration',
        'Student Portal',
        'Progress Tracking',
      ],
    },
    seoMetadata: {
      title: 'E-Learning Platform Development | SISO Agency',
      description:
        'Build your online course platform in 48-72 hours. See our work with Mooshin.',
      keywords: ['e-learning platform', 'online courses', 'LMS', 'course marketplace'],
    },
  },
  {
    id: 'fitness-sports',
    name: 'Fitness & Sports',
    slug: 'fitness-sports',
    description: 'Gym management, class booking, and sports facility applications.',
    icon: Dumbbell,
    color: 'bg-red-500',
    headerImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=400&fit=crop',
    templateShowcase: {
      description: 'Class scheduling, membership management, and workout tracking',
      reusableComponents: [
        'Class Booking System',
        'Membership Management',
        'Workout Tracker',
        'Instructor Profiles',
      ],
    },
    seoMetadata: {
      title: 'Fitness & Sports App Development | SISO Agency',
      description:
        'Build your gym or sports facility app in 48 hours. See our work with Gritness Gym and Trojan MMA.',
      keywords: ['gym app', 'fitness software', 'class booking', 'sports management'],
    },
  },
  {
    id: 'transportation',
    name: 'Transportation & Rental',
    slug: 'transportation',
    description: 'Vehicle rental, booking systems, and fleet management applications.',
    icon: Car,
    color: 'bg-slate-500',
    headerImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=400&fit=crop',
    templateShowcase: {
      description: 'Vehicle catalogs, booking systems, and pricing calculators',
      reusableComponents: [
        'Vehicle Catalog',
        'Booking System',
        'Pricing Calculator',
        'Availability Management',
      ],
    },
    seoMetadata: {
      title: 'Transportation & Rental App Development | SISO Agency',
      description:
        'Build your vehicle rental or transportation app in 48 hours. See our work with Five Star Car Hire.',
      keywords: ['rental app', 'car hire software', 'booking system', 'fleet management'],
    },
  },
  {
    id: 'food-beverage',
    name: 'Food & Beverage',
    slug: 'food-beverage',
    description: 'Restaurant websites, reservation systems, and food service applications.',
    icon: UtensilsCrossed,
    color: 'bg-amber-500',
    headerImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop',
    templateShowcase: {
      description: 'Menu showcases, online reservations, and contact systems',
      reusableComponents: [
        'Menu Showcase',
        'Table Reservations',
        'Online Ordering',
        'Contact System',
      ],
    },
    seoMetadata: {
      title: 'Restaurant & Food Service App Development | SISO Agency',
      description:
        'Build your restaurant website or food service app in 48 hours. See our work with Elementary.',
      keywords: ['restaurant website', 'reservation system', 'food app', 'menu showcase'],
    },
  },
  {
    id: 'internal-tools',
    name: 'Internal Tools & R&D',
    slug: 'internal-tools',
    description: 'Custom internal tools, team collaboration platforms, and R&D projects.',
    icon: Rocket,
    color: 'bg-gray-500',
    headerImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop',
    templateShowcase: {
      description: 'Task management, team coordination, and productivity tools',
      reusableComponents: [
        'Task Management',
        'Team Coordination',
        'Analytics Dashboard',
        'Custom Workflows',
      ],
    },
    seoMetadata: {
      title: 'Internal Tools & Custom Software | SISO Agency',
      description:
        'Build custom internal tools and collaboration platforms in 48-72 hours. See our work with SISO Internal and Team Apollo.',
      keywords: ['internal tools', 'custom software', 'team collaboration', 'productivity app'],
    },
  },
];

// Helper functions
export const getIndustryBySlug = (slug: string): Industry | undefined =>
  industries.find((i) => i.slug === slug);

export const getIndustryById = (id: IndustryCategory): Industry | undefined =>
  industries.find((i) => i.id === id);
