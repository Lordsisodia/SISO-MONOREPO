import { LucideIcon, ShoppingCart, Clock, Users, TrendingUp, CreditCard, Bell, Shield, Palette, MessageCircle, Calendar, Star, BarChart3, Smartphone, Zap, Heart, Activity, Package, Wrench, Scissors, Dumbbell, Car, Home, Camera, Briefcase, GraduationCap, MapPin, PawPrint, Building, Sparkles, Plane, Hammer, Brush, Eye, Target, Search, Video, FileText, Megaphone, Edit, TrendingUp as Growth, Monitor, Cog, Mail, DollarSign, Utensils, BookOpen, Music, Laptop, Factory, TreePine, Truck, Zap as Power, Globe } from 'lucide-react';

export interface IndustryConfig {
  industry: string;
  route: string;
  headerImage?: string;
  heroTitles: string[];
  heroDescription: string;
  benefits: Array<{
    icon: LucideIcon;
    text: string;
  }>;
  topFeatures: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
    stats: string;
    highlight: string;
    category: string;
  }>;
  additionalFeatures: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
    stats: string;
    highlight: string;
    category: string;
  }>;
  showcaseTypes: Array<{
    type: string;
    emoji: string;
    features: string[];
    bgColor: string;
    preview: string;
  }>;
  testimonials: Array<{
    name: string;
    business: string;
    location: string;
    quote: string;
    metric: string;
    avatar: string;
  }>;
  metrics: Array<{
    title: string;
    value: string;
    change: string;
    color: string;
    bgColor: string;
  }>;
  beforeAfter: Array<{
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }>;
  colorScheme: {
    primary: string;
    secondary: string;
    gradient: string;
  };
}

export const industryConfigs: Record<string, IndustryConfig> = {
  restaurants: {
    industry: "Restaurants",
    route: "restaurant",
    heroTitles: ["Take Orders Online", "Boost Table Turnover", "Increase Revenue 3x"],
    heroDescription: "Transform your restaurant with AI-powered ordering, reservations, and customer engagement. Join 200+ restaurants already growing with SISO.",
    benefits: [
      { icon: ShoppingCart, text: "Online Ordering" },
      { icon: Clock, text: "48hr App Launch" },
      { icon: Smartphone, text: "Mobile-First Design" },
      { icon: TrendingUp, text: "Revenue Analytics" }
    ],
    topFeatures: [
      {
        icon: ShoppingCart,
        title: "Smart Online Ordering",
        description: "AI-powered ordering system with menu management, upselling, and real-time kitchen integration",
        stats: "40% Order Increase",
        highlight: "Most Popular",
        category: "Revenue"
      },
      {
        icon: Clock,
        title: "Table Management Pro",
        description: "Advanced reservation system with waitlist automation, table optimization, and guest notifications",
        stats: "2x Table Turnover",
        highlight: "Efficiency Boost",
        category: "Operations"
      },
      {
        icon: Users,
        title: "Customer Loyalty Engine",
        description: "Built-in rewards program with push notifications, personalized offers, and retention analytics",
        stats: "60% Return Rate",
        highlight: "Customer Retention",
        category: "Growth"
      },
      {
        icon: TrendingUp,
        title: "Real-Time Analytics",
        description: "Live insights on sales, popular items, peak hours, staff performance, and customer behavior",
        stats: "Data-Driven Growth",
        highlight: "Smart Insights",
        category: "Analytics"
      },
      {
        icon: CreditCard,
        title: "Unified Payment Hub",
        description: "Accept all payment methods with split bills, tips management, and automatic reconciliation",
        stats: "Seamless Payments",
        highlight: "Zero Friction",
        category: "Payments"
      }
    ],
    additionalFeatures: [
      {
        icon: Bell,
        title: "Smart Notifications",
        description: "Automated customer updates, staff alerts, and marketing campaigns",
        stats: "Real-Time Updates",
        highlight: "Stay Connected",
        category: "Communication"
      },
      {
        icon: Shield,
        title: "Security & Compliance",
        description: "PCI DSS compliance, data encryption, and health regulation management",
        stats: "100% Secure",
        highlight: "Peace of Mind",
        category: "Security"
      },
      {
        icon: Palette,
        title: "Custom Branding",
        description: "Your restaurant's colors, logo, and style throughout the entire app experience",
        stats: "Brand Consistency",
        highlight: "Your Identity",
        category: "Branding"
      }
    ],
    showcaseTypes: [
      {
        type: "Fine Dining",
        emoji: "🍷",
        features: ["Reservation System", "Wine Pairing", "Premium Experience"],
        bgColor: "from-purple-500/20 to-pink-500/20",
        preview: "🖼️ Elegant dark theme with gold accents"
      },
      {
        type: "Fast Casual",
        emoji: "🍔",
        features: ["Quick Order", "Loyalty Rewards", "Mobile Pickup"],
        bgColor: "from-orange-500/20 to-red-500/20",
        preview: "🖼️ Bright, energetic design with quick actions"
      },
      {
        type: "Coffee Shop",
        emoji: "☕",
        features: ["Pre-Order", "Subscription", "Social Hub"],
        bgColor: "from-amber-500/20 to-orange-500/20",
        preview: "🖼️ Warm, cozy design with community features"
      }
    ],
    testimonials: [
      {
        name: "Maria Rodriguez",
        business: "Taco Libre",
        location: "Austin, TX",
        quote: "Orders increased 40% in the first month. The app paid for itself immediately.",
        metric: "+40% Orders",
        avatar: "🌮"
      },
      {
        name: "David Chen",
        business: "Golden Dragon",
        location: "San Francisco, CA",
        quote: "Table turnover doubled. Customers love the seamless reservation system.",
        metric: "2x Turnover",
        avatar: "🥡"
      },
      {
        name: "Sarah Johnson",
        business: "Farm & Table",
        location: "Denver, CO",
        quote: "Best investment we made. Customer loyalty program brings them back weekly.",
        metric: "60% Return Rate",
        avatar: "🥗"
      }
    ],
    metrics: [
      {
        title: "Average Revenue Increase",
        value: "147%",
        change: "+47% vs industry",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Order Volume Growth",
        value: "280%",
        change: "within 90 days",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Customer Retention",
        value: "68%",
        change: "+23% improvement",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Daily Orders",
        before: "45",
        after: "127",
        improvement: "+182%"
      },
      {
        metric: "Table Turnover",
        before: "3.2x",
        after: "5.8x",
        improvement: "+81%"
      },
      {
        metric: "Customer Rating",
        before: "4.1★",
        after: "4.8★",
        improvement: "+17%"
      }
    ],
    colorScheme: {
      primary: "siso-red",
      secondary: "siso-orange",
      gradient: "from-siso-red to-siso-orange"
    }
  },

  fitness: {
    industry: "Fitness Studios",
    route: "fitness",
    heroTitles: ["Book Classes Instantly", "Track Member Progress", "Boost Retention 3x"],
    heroDescription: "Transform your fitness studio with AI-powered class booking, member management, and progress tracking. Join 150+ studios growing with SISO.",
    benefits: [
      { icon: Calendar, text: "Class Scheduling" },
      { icon: Clock, text: "48hr App Launch" },
      { icon: Activity, text: "Progress Tracking" },
      { icon: TrendingUp, text: "Member Analytics" }
    ],
    topFeatures: [
      {
        icon: Calendar,
        title: "Smart Class Booking",
        description: "AI-powered scheduling system with waitlists, automatic reminders, and capacity optimization",
        stats: "95% Class Utilization",
        highlight: "Maximize Revenue",
        category: "Scheduling"
      },
      {
        icon: Users,
        title: "Member Management",
        description: "Complete member profiles with progress tracking, goals, and personalized workout plans",
        stats: "40% Better Retention",
        highlight: "Keep Members",
        category: "Members"
      },
      {
        icon: Activity,
        title: "Progress Analytics",
        description: "Track workouts, measurements, goals with visual progress reports and achievement badges",
        stats: "3x Engagement",
        highlight: "Motivation Boost",
        category: "Progress"
      },
      {
        icon: CreditCard,
        title: "Flexible Payments",
        description: "Memberships, class packages, personal training with automatic billing and payment plans",
        stats: "Seamless Billing",
        highlight: "Zero Hassle",
        category: "Payments"
      },
      {
        icon: TrendingUp,
        title: "Studio Analytics",
        description: "Live insights on class popularity, member retention, revenue trends, and trainer performance",
        stats: "Data-Driven Growth",
        highlight: "Smart Decisions",
        category: "Analytics"
      }
    ],
    additionalFeatures: [
      {
        icon: Bell,
        title: "Smart Reminders",
        description: "Automated class reminders, workout notifications, and membership renewal alerts",
        stats: "50% Less No-Shows",
        highlight: "Better Attendance",
        category: "Communication"
      },
      {
        icon: Smartphone,
        title: "Trainer Mobile App",
        description: "Dedicated app for trainers with client management, scheduling, and communication tools",
        stats: "Trainer Efficiency",
        highlight: "Happy Staff",
        category: "Staff"
      },
      {
        icon: Star,
        title: "Challenge System",
        description: "Fitness challenges, leaderboards, and social features to boost member engagement",
        stats: "90% Participation",
        highlight: "Community Building",
        category: "Engagement"
      }
    ],
    showcaseTypes: [
      {
        type: "Yoga Studio",
        emoji: "🧘",
        features: ["Meditation Classes", "Retreat Booking", "Mindfulness Tracking"],
        bgColor: "from-green-500/20 to-teal-500/20",
        preview: "🖼️ Calm, zen design with peaceful colors"
      },
      {
        type: "CrossFit Box",
        emoji: "🏋️",
        features: ["WOD Tracking", "Competition Events", "Performance Metrics"],
        bgColor: "from-red-500/20 to-orange-500/20",
        preview: "🖼️ Bold, energetic design with performance focus"
      },
      {
        type: "Pilates Studio",
        emoji: "🤸",
        features: ["Equipment Booking", "Form Analysis", "Flexibility Tracking"],
        bgColor: "from-purple-500/20 to-pink-500/20",
        preview: "🖼️ Clean, modern design with movement focus"
      }
    ],
    testimonials: [
      {
        name: "Jennifer Smith",
        business: "Zen Yoga Studio",
        location: "Portland, OR",
        quote: "Member retention improved 45% since launching. The progress tracking keeps everyone motivated.",
        metric: "+45% Retention",
        avatar: "🧘"
      },
      {
        name: "Mike Johnson",
        business: "Iron CrossFit",
        location: "Dallas, TX",
        quote: "Class bookings are up 60%. Members love seeing their progress and competing with friends.",
        metric: "+60% Bookings",
        avatar: "🏋️"
      },
      {
        name: "Lisa Chen",
        business: "Pure Pilates",
        location: "Los Angeles, CA",
        quote: "Best investment for our studio. The app handles everything while we focus on training.",
        metric: "5-Star Reviews",
        avatar: "🤸"
      }
    ],
    metrics: [
      {
        title: "Member Retention Rate",
        value: "85%",
        change: "+45% improvement",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Class Booking Increase",
        value: "190%",
        change: "within 60 days",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Member Engagement",
        value: "78%",
        change: "+35% vs average",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Class Utilization",
        before: "65%",
        after: "95%",
        improvement: "+46%"
      },
      {
        metric: "Member Retention",
        before: "58%",
        after: "85%",
        improvement: "+47%"
      },
      {
        metric: "No-Show Rate",
        before: "25%",
        after: "8%",
        improvement: "-68%"
      }
    ],
    colorScheme: {
      primary: "emerald-600",
      secondary: "teal-500",
      gradient: "from-emerald-600 to-teal-500"
    }
  },

  healthcare: {
    industry: "Healthcare Practices",
    route: "healthcare",
    heroTitles: ["Streamline Appointments", "Enhance Patient Care", "Boost Efficiency 3x"],
    heroDescription: "Transform your medical practice with AI-powered scheduling, patient management, and telehealth capabilities. Join 100+ practices improving patient care with SISO.",
    benefits: [
      { icon: Calendar, text: "Smart Scheduling" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Heart, text: "Patient Care" },
      { icon: Shield, text: "HIPAA Compliant" }
    ],
    topFeatures: [
      {
        icon: Calendar,
        title: "Intelligent Scheduling",
        description: "AI-powered appointment booking with automated reminders, waitlist management, and optimal scheduling",
        stats: "40% Less No-Shows",
        highlight: "Efficiency Boost",
        category: "Scheduling"
      },
      {
        icon: Heart,
        title: "Patient Portal",
        description: "Secure patient access to records, test results, messaging, and appointment management",
        stats: "95% Patient Satisfaction",
        highlight: "Better Care",
        category: "Patient Care"
      },
      {
        icon: Activity,
        title: "Telehealth Platform",
        description: "Built-in video consultations with secure messaging, prescription management, and follow-ups",
        stats: "3x More Consultations",
        highlight: "Remote Care",
        category: "Telehealth"
      },
      {
        icon: Shield,
        title: "HIPAA Compliance",
        description: "Enterprise-grade security with encrypted data, audit trails, and complete compliance management",
        stats: "100% Compliant",
        highlight: "Peace of Mind",
        category: "Security"
      },
      {
        icon: BarChart3,
        title: "Practice Analytics",
        description: "Insights on patient flow, appointment efficiency, revenue trends, and staff performance",
        stats: "Data-Driven Care",
        highlight: "Smart Decisions",
        category: "Analytics"
      }
    ],
    additionalFeatures: [
      {
        icon: Bell,
        title: "Automated Reminders",
        description: "Smart appointment reminders, medication alerts, and follow-up notifications",
        stats: "50% Less Missed Appointments",
        highlight: "Better Attendance",
        category: "Communication"
      },
      {
        icon: CreditCard,
        title: "Payment Processing",
        description: "Secure payment handling with insurance claims, co-pay collection, and billing automation",
        stats: "Faster Payments",
        highlight: "Cash Flow",
        category: "Billing"
      },
      {
        icon: Users,
        title: "Staff Management",
        description: "Role-based access, scheduling tools, and performance tracking for medical staff",
        stats: "Team Efficiency",
        highlight: "Happy Staff",
        category: "Staff"
      }
    ],
    showcaseTypes: [
      {
        type: "Family Practice",
        emoji: "👨‍⚕️",
        features: ["General Care", "Wellness Checkups", "Family Records"],
        bgColor: "from-blue-500/20 to-cyan-500/20",
        preview: "🖼️ Clean, professional design with care focus"
      },
      {
        type: "Dental Office",
        emoji: "🦷",
        features: ["Dental Records", "Treatment Plans", "Appointment Reminders"],
        bgColor: "from-teal-500/20 to-blue-500/20",
        preview: "🖼️ Bright, welcoming design with dental focus"
      },
      {
        type: "Specialist Clinic",
        emoji: "🏥",
        features: ["Specialized Care", "Referral Management", "Complex Scheduling"],
        bgColor: "from-purple-500/20 to-blue-500/20",
        preview: "🖼️ Professional design with specialty focus"
      }
    ],
    testimonials: [
      {
        name: "Dr. Emily Rodriguez",
        business: "Family Health Center",
        location: "Phoenix, AZ",
        quote: "Patient no-shows dropped 40% and satisfaction scores are at an all-time high.",
        metric: "+40% Efficiency",
        avatar: "👩‍⚕️"
      },
      {
        name: "Dr. James Wilson",
        business: "Wilson Dental Care",
        location: "Seattle, WA",
        quote: "The patient portal transformed our practice. Patients love the convenience and transparency.",
        metric: "+95% Satisfaction",
        avatar: "🦷"
      },
      {
        name: "Dr. Sarah Kim",
        business: "Metro Cardiology",
        location: "Boston, MA",
        quote: "Telehealth integration allowed us to see 3x more patients while maintaining quality care.",
        metric: "3x More Patients",
        avatar: "❤️"
      }
    ],
    metrics: [
      {
        title: "Appointment Efficiency",
        value: "89%",
        change: "+40% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Patient Satisfaction",
        value: "96%",
        change: "+25% increase",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "No-Show Reduction",
        value: "67%",
        change: "vs industry average",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Daily Patients",
        before: "35",
        after: "52",
        improvement: "+49%"
      },
      {
        metric: "No-Show Rate",
        before: "18%",
        after: "6%",
        improvement: "-67%"
      },
      {
        metric: "Patient Satisfaction",
        before: "3.8★",
        after: "4.8★",
        improvement: "+26%"
      }
    ],
    colorScheme: {
      primary: "blue-600",
      secondary: "teal-500",
      gradient: "from-blue-600 to-teal-500"
    }
  },

  barbershops: {
    industry: "Barbershops & Salons",
    route: "barbershop",
    heroTitles: ["Book Appointments Instantly", "Manage Client Records", "Boost Revenue 2x"],
    heroDescription: "Transform your barbershop or salon with AI-powered booking, client management, and business growth tools. Join 100+ salons growing with SISO.",
    benefits: [
      { icon: Scissors, text: "Smart Booking" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Users, text: "Client Management" },
      { icon: TrendingUp, text: "Growth Analytics" }
    ],
    topFeatures: [
      {
        icon: Calendar,
        title: "Smart Appointment Booking",
        description: "AI-powered scheduling with automatic reminders, waitlists, and staff optimization",
        stats: "90% Booking Efficiency",
        highlight: "Never Miss Appointments",
        category: "Scheduling"
      },
      {
        icon: Users,
        title: "Client Profile System",
        description: "Complete client history, preferences, photos, and service tracking for personalized care",
        stats: "5-Star Service",
        highlight: "Personal Touch",
        category: "Clients"
      },
      {
        icon: Scissors,
        title: "Service Menu Management",
        description: "Dynamic pricing, package deals, and upselling with staff performance tracking",
        stats: "30% Revenue Boost",
        highlight: "Smart Pricing",
        category: "Services"
      },
      {
        icon: CreditCard,
        title: "Payment & Tips",
        description: "Contactless payments with automatic tip suggestions and commission tracking",
        stats: "Cashless Operations",
        highlight: "Easy Payments",
        category: "Payments"
      },
      {
        icon: TrendingUp,
        title: "Business Analytics",
        description: "Track revenue, popular services, client retention, and staff performance insights",
        stats: "Data-Driven Growth",
        highlight: "Smart Decisions",
        category: "Analytics"
      }
    ],
    additionalFeatures: [
      {
        icon: Bell,
        title: "Automated Reminders",
        description: "SMS and email reminders with rescheduling options and no-show prevention",
        stats: "80% Less No-Shows",
        highlight: "Better Attendance",
        category: "Communication"
      },
      {
        icon: Star,
        title: "Loyalty Program",
        description: "Points-based rewards, referral bonuses, and birthday specials for client retention",
        stats: "60% Repeat Clients",
        highlight: "Customer Loyalty",
        category: "Retention"
      },
      {
        icon: Smartphone,
        title: "Staff Mobile App",
        description: "Stylists can manage schedules, view client notes, and process payments on mobile",
        stats: "Team Efficiency",
        highlight: "Mobile Freedom",
        category: "Staff"
      }
    ],
    showcaseTypes: [
      {
        type: "Modern Barbershop",
        emoji: "💈",
        features: ["Classic Cuts", "Beard Styling", "Hot Towel Service"],
        bgColor: "from-gray-500/20 to-blue-500/20",
        preview: "🖼️ Classic design with modern booking"
      },
      {
        type: "Hair Salon",
        emoji: "💇",
        features: ["Hair Styling", "Color Services", "Wedding Packages"],
        bgColor: "from-pink-500/20 to-purple-500/20",
        preview: "🖼️ Elegant design with service gallery"
      },
      {
        type: "Nail Studio",
        emoji: "💅",
        features: ["Manicures", "Pedicures", "Nail Art"],
        bgColor: "from-rose-500/20 to-pink-500/20",
        preview: "🖼️ Beautiful design with nail art showcase"
      }
    ],
    testimonials: [
      {
        name: "Marcus Johnson",
        business: "Classic Cuts Barbershop",
        location: "Chicago, IL",
        quote: "Appointments are always full now. The app books clients even when I'm cutting hair.",
        metric: "+85% Bookings",
        avatar: "💈"
      },
      {
        name: "Sofia Martinez",
        business: "Bella Hair Studio",
        location: "Miami, FL",
        quote: "Client retention improved dramatically. They love the personalized service tracking.",
        metric: "+70% Retention",
        avatar: "💇"
      },
      {
        name: "Jessica Chen",
        business: "Zen Nail Studio",
        location: "San Diego, CA",
        quote: "Revenue doubled in 3 months. The loyalty program keeps clients coming back.",
        metric: "2x Revenue",
        avatar: "💅"
      }
    ],
    metrics: [
      {
        title: "Booking Efficiency",
        value: "92%",
        change: "+50% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Client Retention",
        value: "78%",
        change: "+45% increase",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      },
      {
        title: "Revenue Growth",
        value: "156%",
        change: "within 6 months",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Daily Appointments",
        before: "12",
        after: "22",
        improvement: "+83%"
      },
      {
        metric: "No-Show Rate",
        before: "25%",
        after: "5%",
        improvement: "-80%"
      },
      {
        metric: "Client Satisfaction",
        before: "4.0★",
        after: "4.9★",
        improvement: "+23%"
      }
    ],
    colorScheme: {
      primary: "slate-600",
      secondary: "blue-500",
      gradient: "from-slate-600 to-blue-500"
    }
  },

  autorepair: {
    industry: "Auto Repair Shops",
    route: "auto-repair",
    heroTitles: ["Schedule Service Online", "Track Vehicle History", "Boost Shop Revenue"],
    heroDescription: "Transform your auto repair shop with AI-powered scheduling, customer management, and service tracking. Join 80+ shops growing with SISO.",
    benefits: [
      { icon: Car, text: "Service Scheduling" },
      { icon: Clock, text: "48hr Launch" },
      { icon: Wrench, text: "Work Order System" },
      { icon: TrendingUp, text: "Shop Analytics" }
    ],
    topFeatures: [
      {
        icon: Calendar,
        title: "Smart Service Booking",
        description: "Online appointment scheduling with service type selection and availability optimization",
        stats: "60% More Bookings",
        highlight: "Always Booked",
        category: "Scheduling"
      },
      {
        icon: Car,
        title: "Vehicle History Tracking",
        description: "Complete service records, maintenance reminders, and customer communication history",
        stats: "Perfect Records",
        highlight: "Professional Service",
        category: "Records"
      },
      {
        icon: Wrench,
        title: "Digital Work Orders",
        description: "Mobile work order management with photo documentation and progress updates",
        stats: "50% Faster Service",
        highlight: "Efficiency Boost",
        category: "Operations"
      },
      {
        icon: CreditCard,
        title: "Estimate & Billing",
        description: "Digital estimates, approval workflow, and integrated payment processing",
        stats: "Faster Payments",
        highlight: "Cash Flow",
        category: "Billing"
      },
      {
        icon: Users,
        title: "Customer Portal",
        description: "Customers can view service history, schedule appointments, and receive updates",
        stats: "5-Star Reviews",
        highlight: "Happy Customers",
        category: "Experience"
      }
    ],
    additionalFeatures: [
      {
        icon: Bell,
        title: "Service Reminders",
        description: "Automated maintenance reminders based on mileage and service intervals",
        stats: "30% Return Rate",
        highlight: "Recurring Revenue",
        category: "Retention"
      },
      {
        icon: Camera,
        title: "Photo Documentation",
        description: "Before/after photos, damage documentation, and visual work progress",
        stats: "Trust & Transparency",
        highlight: "Visual Proof",
        category: "Documentation"
      },
      {
        icon: BarChart3,
        title: "Inventory Management",
        description: "Parts tracking, supplier integration, and automatic reorder points",
        stats: "Cost Control",
        highlight: "Smart Inventory",
        category: "Inventory"
      }
    ],
    showcaseTypes: [
      {
        type: "General Auto Repair",
        emoji: "🔧",
        features: ["Oil Changes", "Brake Service", "Engine Repair"],
        bgColor: "from-orange-500/20 to-red-500/20",
        preview: "🖼️ Professional shop management system"
      },
      {
        type: "Tire & Alignment",
        emoji: "🚗",
        features: ["Tire Installation", "Wheel Alignment", "Balancing"],
        bgColor: "from-gray-500/20 to-slate-500/20",
        preview: "🖼️ Specialized tire service tracking"
      },
      {
        type: "Transmission Shop",
        emoji: "⚙️",
        features: ["Transmission Repair", "Fluid Changes", "Diagnostics"],
        bgColor: "from-blue-500/20 to-indigo-500/20",
        preview: "🖼️ Specialized transmission service system"
      }
    ],
    testimonials: [
      {
        name: "Mike Thompson",
        business: "Thompson Auto Repair",
        location: "Detroit, MI",
        quote: "Online booking filled our schedule. Customers love seeing their service history.",
        metric: "+60% Bookings",
        avatar: "🔧"
      },
      {
        name: "Carlos Rivera",
        business: "Rivera's Garage",
        location: "Phoenix, AZ",
        quote: "Work orders are so much easier now. Everything is digital and organized.",
        metric: "50% Faster",
        avatar: "🚗"
      },
      {
        name: "Dave Miller",
        business: "Main Street Motors",
        location: "Nashville, TN",
        quote: "Revenue increased 40% in 4 months. The reminder system brings customers back.",
        metric: "+40% Revenue",
        avatar: "⚙️"
      }
    ],
    metrics: [
      {
        title: "Service Bookings",
        value: "165%",
        change: "+65% increase",
        color: "text-orange-400",
        bgColor: "from-orange-500/20 to-red-500/20"
      },
      {
        title: "Customer Retention",
        value: "71%",
        change: "+30% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Shop Efficiency",
        value: "85%",
        change: "+40% productivity",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Daily Services",
        before: "8",
        after: "15",
        improvement: "+88%"
      },
      {
        metric: "Estimate Approval",
        before: "65%",
        after: "89%",
        improvement: "+37%"
      },
      {
        metric: "Customer Rating",
        before: "3.9★",
        after: "4.7★",
        improvement: "+21%"
      }
    ],
    colorScheme: {
      primary: "orange-600",
      secondary: "red-500",
      gradient: "from-orange-600 to-red-500"
    }
  },

  realestate: {
    industry: "Real Estate Agents",
    route: "real-estate",
    heroTitles: ["Generate More Leads", "Manage Clients Better", "Close More Deals"],
    heroDescription: "Transform your real estate business with AI-powered lead management, client tracking, and listing showcase tools. Join 120+ agents growing with SISO.",
    benefits: [
      { icon: Home, text: "Lead Generation" },
      { icon: Clock, text: "48hr Launch" },
      { icon: Users, text: "Client Management" },
      { icon: TrendingUp, text: "Deal Analytics" }
    ],
    topFeatures: [
      {
        icon: Home,
        title: "Smart Listing Showcase",
        description: "Beautiful property galleries with virtual tours, scheduling, and lead capture",
        stats: "3x More Inquiries",
        highlight: "Lead Magnet",
        category: "Listings"
      },
      {
        icon: Users,
        title: "Client Relationship Hub",
        description: "Complete client profiles, communication history, and automated follow-ups",
        stats: "90% Follow-up Rate",
        highlight: "Never Miss Leads",
        category: "CRM"
      },
      {
        icon: Calendar,
        title: "Showing Scheduler",
        description: "Online showing appointments with automatic reminders and feedback collection",
        stats: "50% More Showings",
        highlight: "Easy Scheduling",
        category: "Scheduling"
      },
      {
        icon: TrendingUp,
        title: "Market Analytics",
        description: "Local market trends, price analysis, and competitive intelligence dashboard",
        stats: "Data-Driven Pricing",
        highlight: "Market Expert",
        category: "Analytics"
      },
      {
        icon: MessageCircle,
        title: "Lead Communication",
        description: "Automated lead nurturing campaigns with personalized property recommendations",
        stats: "40% Conversion Rate",
        highlight: "Convert More",
        category: "Marketing"
      }
    ],
    additionalFeatures: [
      {
        icon: Camera,
        title: "Virtual Tour Creator",
        description: "Create immersive property tours with 360° photos and interactive features",
        stats: "Premium Experience",
        highlight: "Stand Out",
        category: "Marketing"
      },
      {
        icon: FileText,
        title: "Document Management",
        description: "Digital contracts, e-signatures, and document sharing with clients",
        stats: "Paperless Process",
        highlight: "Professional",
        category: "Documents"
      },
      {
        icon: Star,
        title: "Review & Referral System",
        description: "Automated review requests and referral tracking for business growth",
        stats: "5-Star Reputation",
        highlight: "Trust Building",
        category: "Reputation"
      }
    ],
    showcaseTypes: [
      {
        type: "Residential Sales",
        emoji: "🏠",
        features: ["Home Listings", "Buyer Matching", "Market Analysis"],
        bgColor: "from-blue-500/20 to-teal-500/20",
        preview: "🖼️ Beautiful home listing showcase"
      },
      {
        type: "Commercial Real Estate",
        emoji: "🏢",
        features: ["Office Spaces", "Investment Properties", "Lease Management"],
        bgColor: "from-gray-500/20 to-blue-500/20",
        preview: "🖼️ Professional commercial property system"
      },
      {
        type: "Luxury Properties",
        emoji: "🏖️",
        features: ["Luxury Homes", "Exclusive Listings", "High-End Marketing"],
        bgColor: "from-purple-500/20 to-pink-500/20",
        preview: "🖼️ Elegant luxury property presentation"
      }
    ],
    testimonials: [
      {
        name: "Sarah Mitchell",
        business: "Mitchell Realty Group",
        location: "Austin, TX",
        quote: "Lead generation tripled. The virtual tours help properties sell faster.",
        metric: "3x More Leads",
        avatar: "🏠"
      },
      {
        name: "Robert Chen",
        business: "Chen Commercial Properties",
        location: "San Francisco, CA",
        quote: "Client management is seamless now. I never miss a follow-up or important date.",
        metric: "40% More Closings",
        avatar: "🏢"
      },
      {
        name: "Amanda Rodriguez",
        business: "Luxury Home Specialists",
        location: "Miami, FL",
        quote: "The listing showcase is beautiful. Clients are impressed with the professional presentation.",
        metric: "5-Star Reviews",
        avatar: "🏖️"
      }
    ],
    metrics: [
      {
        title: "Lead Generation",
        value: "245%",
        change: "+145% increase",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Conversion Rate",
        value: "38%",
        change: "+18% improvement",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Client Satisfaction",
        value: "96%",
        change: "+25% increase",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Monthly Leads",
        before: "15",
        after: "52",
        improvement: "+247%"
      },
      {
        metric: "Showing Rate",
        before: "35%",
        after: "68%",
        improvement: "+94%"
      },
      {
        metric: "Deal Closings",
        before: "2.5/month",
        after: "4.8/month",
        improvement: "+92%"
      }
    ],
    colorScheme: {
      primary: "blue-600",
      secondary: "teal-500",
      gradient: "from-blue-600 to-teal-500"
    }
  },

  lawfirms: {
    industry: "Law Firms",
    route: "law-firm",
    heroTitles: ["Manage Cases Efficiently", "Client Portal Access", "Boost Legal Practice"],
    heroDescription: "Transform your law practice with AI-powered case management, client communication, and legal document automation. Join 60+ firms growing with SISO.",
    benefits: [
      { icon: Briefcase, text: "Case Management" },
      { icon: Clock, text: "48hr Setup" },
      { icon: FileText, text: "Document Automation" },
      { icon: Shield, text: "Secure & Compliant" }
    ],
    topFeatures: [
      {
        icon: Briefcase,
        title: "Smart Case Management",
        description: "AI-powered case tracking with deadlines, court dates, and automated status updates",
        stats: "50% Faster Case Processing",
        highlight: "Efficiency Boost",
        category: "Cases"
      },
      {
        icon: Users,
        title: "Client Portal System",
        description: "Secure client access to case updates, documents, billing, and communication history",
        stats: "95% Client Satisfaction",
        highlight: "Premium Service",
        category: "Clients"
      },
      {
        icon: FileText,
        title: "Document Automation",
        description: "AI-generated legal documents, contracts, and forms with custom templates",
        stats: "80% Time Savings",
        highlight: "Smart Automation",
        category: "Documents"
      },
      {
        icon: Calendar,
        title: "Legal Calendar System",
        description: "Court dates, deadlines, appointments with conflict checking and reminders",
        stats: "Zero Missed Deadlines",
        highlight: "Never Miss",
        category: "Scheduling"
      },
      {
        icon: CreditCard,
        title: "Legal Billing & Time",
        description: "Time tracking, billing automation, trust accounting, and payment processing",
        stats: "Faster Collections",
        highlight: "Cash Flow",
        category: "Billing"
      }
    ],
    additionalFeatures: [
      {
        icon: Shield,
        title: "Security & Compliance",
        description: "Bank-level security with attorney-client privilege protection and HIPAA compliance",
        stats: "100% Secure",
        highlight: "Peace of Mind",
        category: "Security"
      },
      {
        icon: Search,
        title: "Legal Research Tools",
        description: "Integrated legal research with case law, statutes, and document precedents",
        stats: "Research Efficiency",
        highlight: "Smart Research",
        category: "Research"
      },
      {
        icon: MessageCircle,
        title: "Client Communication",
        description: "Secure messaging, video calls, and automated client updates with case progress",
        stats: "Better Communication",
        highlight: "Stay Connected",
        category: "Communication"
      }
    ],
    showcaseTypes: [
      {
        type: "Personal Injury",
        emoji: "⚖️",
        features: ["Case Tracking", "Medical Records", "Settlement Calculator"],
        bgColor: "from-blue-500/20 to-indigo-500/20",
        preview: "🖼️ Professional case management system"
      },
      {
        type: "Family Law",
        emoji: "👨‍👩‍👧‍👦",
        features: ["Custody Tracking", "Financial Planning", "Court Calendars"],
        bgColor: "from-purple-500/20 to-pink-500/20",
        preview: "🖼️ Sensitive family law case handling"
      },
      {
        type: "Corporate Law",
        emoji: "🏢",
        features: ["Contract Management", "Compliance Tracking", "Entity Management"],
        bgColor: "from-gray-500/20 to-blue-500/20",
        preview: "🖼️ Corporate legal matter management"
      }
    ],
    testimonials: [
      {
        name: "Attorney Sarah Williams",
        business: "Williams Law Group",
        location: "New York, NY",
        quote: "Case management is seamless now. Clients love the transparency and communication.",
        metric: "+50% Efficiency",
        avatar: "⚖️"
      },
      {
        name: "Attorney Michael Brown",
        business: "Brown Family Law",
        location: "Los Angeles, CA",
        quote: "Document automation saved us 20 hours per week. More time for clients.",
        metric: "20hrs/week Saved",
        avatar: "👨‍👩‍👧‍👦"
      },
      {
        name: "Attorney Lisa Chen",
        business: "Chen Corporate Law",
        location: "Chicago, IL",
        quote: "The client portal transformed our practice. Professional and efficient.",
        metric: "95% Client Satisfaction",
        avatar: "🏢"
      }
    ],
    metrics: [
      {
        title: "Case Processing Speed",
        value: "150%",
        change: "+50% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Client Satisfaction",
        value: "94%",
        change: "+30% increase",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Time Savings",
        value: "35%",
        change: "on administrative tasks",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Case Processing Time",
        before: "8 days",
        after: "3.2 days",
        improvement: "-60%"
      },
      {
        metric: "Document Creation",
        before: "4 hours",
        after: "45 minutes",
        improvement: "-81%"
      },
      {
        metric: "Client Response Time",
        before: "2 days",
        after: "4 hours",
        improvement: "-83%"
      }
    ],
    colorScheme: {
      primary: "blue-700",
      secondary: "indigo-600",
      gradient: "from-blue-700 to-indigo-600"
    }
  },

  beauty: {
    industry: "Beauty & Spa Services",
    route: "beauty",
    heroTitles: ["Book Beauty Services", "Manage Client Profiles", "Grow Your Spa Business"],
    heroDescription: "Transform your beauty business with AI-powered booking, client management, and service tracking. Join 150+ spas and salons growing with SISO.",
    benefits: [
      { icon: Sparkles, text: "Beauty Booking" },
      { icon: Clock, text: "48hr Launch" },
      { icon: Users, text: "Client Profiles" },
      { icon: Star, text: "Service Tracking" }
    ],
    topFeatures: [
      {
        icon: Calendar,
        title: "Beauty Service Booking",
        description: "AI-powered scheduling for facials, massages, treatments with staff and room optimization",
        stats: "95% Booking Rate",
        highlight: "Always Booked",
        category: "Scheduling"
      },
      {
        icon: Users,
        title: "Client Beauty Profiles",
        description: "Complete skin analysis, treatment history, allergies, and personalized care tracking",
        stats: "Personalized Care",
        highlight: "Individual Touch",
        category: "Clients"
      },
      {
        icon: Sparkles,
        title: "Treatment Menu System",
        description: "Dynamic service menus with packages, add-ons, and automated upselling suggestions",
        stats: "40% Higher Revenue",
        highlight: "Smart Upselling",
        category: "Services"
      },
      {
        icon: Star,
        title: "Membership & Packages",
        description: "Monthly memberships, treatment packages, and loyalty rewards with automatic billing",
        stats: "70% Retention Rate",
        highlight: "Customer Loyalty",
        category: "Membership"
      },
      {
        icon: Activity,
        title: "Spa Analytics Dashboard",
        description: "Track popular treatments, therapist performance, client retention, and revenue trends",
        stats: "Data-Driven Growth",
        highlight: "Smart Insights",
        category: "Analytics"
      }
    ],
    additionalFeatures: [
      {
        icon: Bell,
        title: "Treatment Reminders",
        description: "Automated appointment reminders, aftercare instructions, and follow-up scheduling",
        stats: "90% Show Rate",
        highlight: "Better Attendance",
        category: "Communication"
      },
      {
        icon: Camera,
        title: "Before/After Gallery",
        description: "Treatment progress photos, skin analysis tracking, and client transformation galleries",
        stats: "Visual Progress",
        highlight: "See Results",
        category: "Documentation"
      },
      {
        icon: Package,
        title: "Product Sales Integration",
        description: "Retail product recommendations, inventory tracking, and online store integration",
        stats: "Extra Revenue",
        highlight: "Boost Sales",
        category: "Retail"
      }
    ],
    showcaseTypes: [
      {
        type: "Day Spa",
        emoji: "🧖‍♀️",
        features: ["Facials", "Massages", "Body Treatments"],
        bgColor: "from-pink-500/20 to-rose-500/20",
        preview: "🖼️ Relaxing spa booking experience"
      },
      {
        type: "Medical Spa",
        emoji: "💆‍♀️",
        features: ["Botox", "Laser Treatments", "Chemical Peels"],
        bgColor: "from-blue-500/20 to-teal-500/20",
        preview: "🖼️ Professional medical spa system"
      },
      {
        type: "Nail Salon",
        emoji: "💅",
        features: ["Manicures", "Pedicures", "Nail Art"],
        bgColor: "from-purple-500/20 to-pink-500/20",
        preview: "🖼️ Beautiful nail service booking"
      }
    ],
    testimonials: [
      {
        name: "Maria Gonzalez",
        business: "Serenity Day Spa",
        location: "Miami, FL",
        quote: "Bookings tripled and clients love the personalized treatment tracking.",
        metric: "3x Bookings",
        avatar: "🧖‍♀️"
      },
      {
        name: "Dr. Jennifer Kim",
        business: "Elite Medical Spa",
        location: "Beverly Hills, CA",
        quote: "The before/after gallery helps clients see their progress. Professional and impressive.",
        metric: "50% More Treatments",
        avatar: "💆‍♀️"
      },
      {
        name: "Jessica Martinez",
        business: "Luxury Nails Studio",
        location: "New York, NY",
        quote: "Revenue doubled with the membership program. Clients book treatments monthly now.",
        metric: "2x Revenue",
        avatar: "💅"
      }
    ],
    metrics: [
      {
        title: "Booking Efficiency",
        value: "88%",
        change: "+40% improvement",
        color: "text-pink-400",
        bgColor: "from-pink-500/20 to-rose-500/20"
      },
      {
        title: "Client Retention",
        value: "82%",
        change: "+35% increase",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      },
      {
        title: "Revenue Growth",
        value: "165%",
        change: "within 4 months",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Daily Appointments",
        before: "18",
        after: "32",
        improvement: "+78%"
      },
      {
        metric: "Treatment Packages Sold",
        before: "5/month",
        after: "28/month",
        improvement: "+460%"
      },
      {
        metric: "Client Satisfaction",
        before: "4.2★",
        after: "4.9★",
        improvement: "+17%"
      }
    ],
    colorScheme: {
      primary: "pink-600",
      secondary: "rose-500",
      gradient: "from-pink-600 to-rose-500"
    }
  },

  digitalmarketing: {
    industry: "Digital Marketing Agencies",
    route: "digital-marketing",
    heroTitles: ["Scale Client Campaigns", "Automate Reporting", "Grow Agency Revenue"],
    heroDescription: "Transform your digital marketing agency with AI-powered campaign management, client reporting, and lead generation tools. Join 80+ agencies growing with SISO.",
    benefits: [
      { icon: Target, text: "Campaign Management" },
      { icon: Clock, text: "48hr Setup" },
      { icon: BarChart3, text: "Analytics Dashboard" },
      { icon: Users, text: "Client Portal" }
    ],
    topFeatures: [
      {
        icon: Target,
        title: "Campaign Management Hub",
        description: "Multi-platform campaign tracking with performance optimization and budget management",
        stats: "3x Campaign Efficiency",
        highlight: "Performance Boost",
        category: "Campaigns"
      },
      {
        icon: BarChart3,
        title: "Automated Reporting",
        description: "White-label reports with real-time metrics, ROI analysis, and client-branded dashboards",
        stats: "80% Time Savings",
        highlight: "Smart Automation",
        category: "Reporting"
      },
      {
        icon: Users,
        title: "Client Management System",
        description: "Complete client profiles, project tracking, communication history, and contract management",
        stats: "95% Client Satisfaction",
        highlight: "Happy Clients",
        category: "Clients"
      },
      {
        icon: Growth,
        title: "Lead Generation Tools",
        description: "Landing page builder, form automation, lead scoring, and nurture sequence management",
        stats: "5x Lead Generation",
        highlight: "More Leads",
        category: "Leads"
      },
      {
        icon: CreditCard,
        title: "Agency Billing System",
        description: "Automated invoicing, retainer management, project billing, and payment processing",
        stats: "Faster Payments",
        highlight: "Cash Flow",
        category: "Billing"
      }
    ],
    additionalFeatures: [
      {
        icon: Calendar,
        title: "Content Calendar",
        description: "Social media scheduling, content planning, and approval workflows with team collaboration",
        stats: "Organized Content",
        highlight: "Never Miss Posts",
        category: "Content"
      },
      {
        icon: Smartphone,
        title: "Team Collaboration",
        description: "Project management, task assignment, time tracking, and team communication tools",
        stats: "Team Efficiency",
        highlight: "Better Teamwork",
        category: "Team"
      },
      {
        icon: Star,
        title: "White-Label Branding",
        description: "Custom agency branding throughout client portals, reports, and communication materials",
        stats: "Professional Brand",
        highlight: "Your Identity",
        category: "Branding"
      }
    ],
    showcaseTypes: [
      {
        type: "Performance Marketing",
        emoji: "📊",
        features: ["PPC Management", "ROI Tracking", "Performance Reports"],
        bgColor: "from-blue-500/20 to-cyan-500/20",
        preview: "🖼️ Performance-focused dashboard system"
      },
      {
        type: "Social Media Agency",
        emoji: "📱",
        features: ["Content Calendar", "Engagement Tracking", "Influencer Management"],
        bgColor: "from-purple-500/20 to-pink-500/20",
        preview: "🖼️ Social media management platform"
      },
      {
        type: "SEO Agency",
        emoji: "🔍",
        features: ["Keyword Tracking", "Site Audits", "Ranking Reports"],
        bgColor: "from-green-500/20 to-emerald-500/20",
        preview: "🖼️ SEO tracking and reporting system"
      }
    ],
    testimonials: [
      {
        name: "Alex Rodriguez",
        business: "Digital Growth Agency",
        location: "Austin, TX",
        quote: "Client reporting automation saved us 20 hours per week. Clients love the dashboards.",
        metric: "20hrs/week Saved",
        avatar: "📊"
      },
      {
        name: "Sarah Kim",
        business: "Social Buzz Marketing",
        location: "Los Angeles, CA",
        quote: "Lead generation tripled with the automated funnels. Best investment we've made.",
        metric: "3x More Leads",
        avatar: "📱"
      },
      {
        name: "Mike Johnson",
        business: "Apex SEO Solutions",
        location: "New York, NY",
        quote: "Campaign management is so much easier. We're scaling faster than ever.",
        metric: "5x Campaign Scale",
        avatar: "🔍"
      }
    ],
    metrics: [
      {
        title: "Campaign Efficiency",
        value: "280%",
        change: "+180% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Client Retention",
        value: "91%",
        change: "+40% increase",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Agency Revenue",
        value: "215%",
        change: "within 6 months",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Active Campaigns",
        before: "25",
        after: "85",
        improvement: "+240%"
      },
      {
        metric: "Reporting Time",
        before: "8 hours",
        after: "1.5 hours",
        improvement: "-81%"
      },
      {
        metric: "Client Acquisition",
        before: "3/month",
        after: "12/month",
        improvement: "+300%"
      }
    ],
    colorScheme: {
      primary: "blue-600",
      secondary: "cyan-500",
      gradient: "from-blue-600 to-cyan-500"
    }
  },

  accounting: {
    industry: "Accounting & Tax Services",
    route: "accounting",
    heroTitles: ["Streamline Tax Services", "Automate Client Management", "Grow Your Practice"],
    heroDescription: "Transform your accounting practice with AI-powered client management, tax automation, and business growth tools. Join 90+ firms growing with SISO.",
    benefits: [
      { icon: FileText, text: "Tax Automation" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Users, text: "Client Portal" },
      { icon: Shield, text: "Secure & Compliant" }
    ],
    topFeatures: [
      {
        icon: FileText,
        title: "Tax Document Automation",
        description: "AI-powered tax preparation with automated form generation and compliance checking",
        stats: "70% Faster Processing",
        highlight: "Time Saver",
        category: "Automation"
      },
      {
        icon: Users,
        title: "Client Management Hub",
        description: "Complete client profiles with document storage, communication, and project tracking",
        stats: "95% Client Satisfaction",
        highlight: "Happy Clients",
        category: "Management"
      },
      {
        icon: Calendar,
        title: "Appointment Scheduling",
        description: "Online booking for consultations, tax appointments, and quarterly reviews",
        stats: "60% More Bookings",
        highlight: "Always Booked",
        category: "Scheduling"
      },
      {
        icon: CreditCard,
        title: "Billing & Payments",
        description: "Automated invoicing, payment processing, and retainer management",
        stats: "Faster Collections",
        highlight: "Cash Flow",
        category: "Billing"
      },
      {
        icon: Shield,
        title: "Security & Compliance",
        description: "Bank-level security with IRS compliance, data encryption, and audit trails",
        stats: "100% Compliant",
        highlight: "Peace of Mind",
        category: "Security"
      }
    ],
    additionalFeatures: [
      {
        icon: Bell,
        title: "Deadline Reminders",
        description: "Automated tax deadline alerts and client notification system",
        stats: "Never Miss Deadlines",
        highlight: "Stay Organized",
        category: "Organization"
      },
      {
        icon: BarChart3,
        title: "Financial Analytics",
        description: "Client financial insights, tax optimization recommendations, and business intelligence",
        stats: "Data-Driven Advice",
        highlight: "Smart Insights",
        category: "Analytics"
      },
      {
        icon: Smartphone,
        title: "Mobile Access",
        description: "Full mobile app for accountants and clients with document scanning",
        stats: "Work Anywhere",
        highlight: "Mobile Freedom",
        category: "Mobile"
      }
    ],
    showcaseTypes: [
      {
        type: "Tax Preparation",
        emoji: "📊",
        features: ["Individual Returns", "Business Tax", "Multi-State Filing"],
        bgColor: "from-green-500/20 to-emerald-500/20",
        preview: "🖼️ Professional tax preparation system"
      },
      {
        type: "Small Business Accounting",
        emoji: "💼",
        features: ["Bookkeeping", "Payroll", "Financial Statements"],
        bgColor: "from-blue-500/20 to-cyan-500/20",
        preview: "🖼️ Complete business accounting solution"
      },
      {
        type: "CPA Practice",
        emoji: "🎓",
        features: ["Audit Services", "Advisory", "Compliance"],
        bgColor: "from-purple-500/20 to-indigo-500/20",
        preview: "🖼️ Full-service CPA practice management"
      }
    ],
    testimonials: [
      {
        name: "CPA Jennifer Walsh",
        business: "Walsh Tax Services",
        location: "Denver, CO",
        quote: "Tax season is so much easier now. Clients love the portal and I save 20 hours per week.",
        metric: "20hrs/week Saved",
        avatar: "📊"
      },
      {
        name: "Mike Rodriguez CPA",
        business: "Rodriguez & Associates",
        location: "Houston, TX",
        quote: "Client retention improved 40%. The automated workflows are incredible.",
        metric: "+40% Retention",
        avatar: "💼"
      },
      {
        name: "CPA Sarah Kim",
        business: "Kim CPA Group",
        location: "San Francisco, CA",
        quote: "Revenue doubled in 6 months. Best investment I've made for my practice.",
        metric: "2x Revenue",
        avatar: "🎓"
      }
    ],
    metrics: [
      {
        title: "Tax Processing Speed",
        value: "170%",
        change: "+70% improvement",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Client Satisfaction",
        value: "96%",
        change: "+35% increase",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Practice Revenue",
        value: "185%",
        change: "within 8 months",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Tax Return Processing",
        before: "6 hours",
        after: "2 hours",
        improvement: "-67%"
      },
      {
        metric: "Client Communication",
        before: "3 days",
        after: "2 hours",
        improvement: "-94%"
      },
      {
        metric: "Monthly Revenue",
        before: "$12K",
        after: "$22K",
        improvement: "+83%"
      }
    ],
    colorScheme: {
      primary: "green-600",
      secondary: "emerald-500",
      gradient: "from-green-600 to-emerald-500"
    }
  },

  homeservices: {
    industry: "Home Services",
    route: "home-services",
    heroTitles: ["Schedule Service Calls", "Manage Work Orders", "Grow Your Business"],
    heroDescription: "Transform your home service business with AI-powered scheduling, work order management, and customer communication. Join 200+ contractors growing with SISO.",
    benefits: [
      { icon: Home, text: "Service Scheduling" },
      { icon: Clock, text: "48hr Launch" },
      { icon: Wrench, text: "Work Orders" },
      { icon: TrendingUp, text: "Business Growth" }
    ],
    topFeatures: [
      {
        icon: Calendar,
        title: "Smart Service Scheduling",
        description: "AI-powered appointment booking with route optimization and technician availability",
        stats: "40% More Jobs Daily",
        highlight: "Efficiency Boost",
        category: "Scheduling"
      },
      {
        icon: Wrench,
        title: "Digital Work Orders",
        description: "Mobile work order management with photos, signatures, and real-time updates",
        stats: "50% Faster Completion",
        highlight: "Speed Up Work",
        category: "Operations"
      },
      {
        icon: Users,
        title: "Customer Management",
        description: "Complete customer profiles with service history, preferences, and communication logs",
        stats: "95% Customer Satisfaction",
        highlight: "Happy Customers",
        category: "Customers"
      },
      {
        icon: CreditCard,
        title: "Estimates & Billing",
        description: "Digital estimates, approval workflow, and instant payment processing",
        stats: "Faster Payments",
        highlight: "Cash Flow",
        category: "Billing"
      },
      {
        icon: MapPin,
        title: "Route Optimization",
        description: "AI-powered route planning to minimize travel time and maximize daily jobs",
        stats: "30% More Efficient",
        highlight: "Save Time & Gas",
        category: "Logistics"
      }
    ],
    additionalFeatures: [
      {
        icon: Bell,
        title: "Service Reminders",
        description: "Automated maintenance reminders and follow-up scheduling for recurring services",
        stats: "40% Repeat Business",
        highlight: "Recurring Revenue",
        category: "Retention"
      },
      {
        icon: Camera,
        title: "Photo Documentation",
        description: "Before/after photos, progress updates, and damage documentation with timestamps",
        stats: "Trust & Transparency",
        highlight: "Visual Proof",
        category: "Documentation"
      },
      {
        icon: Star,
        title: "Review Management",
        description: "Automated review requests and reputation management across all platforms",
        stats: "5-Star Reputation",
        highlight: "Trust Building",
        category: "Reputation"
      }
    ],
    showcaseTypes: [
      {
        type: "Plumbing Services",
        emoji: "🔧",
        features: ["Emergency Calls", "Pipe Repair", "Installation"],
        bgColor: "from-blue-500/20 to-cyan-500/20",
        preview: "🖼️ Professional plumbing service management"
      },
      {
        type: "HVAC Services",
        emoji: "🌡️",
        features: ["AC Repair", "Heating", "Maintenance"],
        bgColor: "from-orange-500/20 to-red-500/20",
        preview: "🖼️ Complete HVAC service tracking"
      },
      {
        type: "Electrical Services",
        emoji: "⚡",
        features: ["Wiring", "Panel Upgrades", "Troubleshooting"],
        bgColor: "from-yellow-500/20 to-orange-500/20",
        preview: "🖼️ Electrical service management system"
      }
    ],
    testimonials: [
      {
        name: "Tom Martinez",
        business: "Martinez Plumbing",
        location: "Phoenix, AZ",
        quote: "Scheduling is automatic now. I can fit 40% more jobs in each day with route optimization.",
        metric: "+40% More Jobs",
        avatar: "🔧"
      },
      {
        name: "Lisa Johnson",
        business: "Johnson HVAC",
        location: "Dallas, TX",
        quote: "Customer satisfaction skyrocketed. They love getting photo updates and digital invoices.",
        metric: "95% Satisfaction",
        avatar: "🌡️"
      },
      {
        name: "Mike Chen",
        business: "Chen Electric",
        location: "Seattle, WA",
        quote: "Revenue increased 60% in 4 months. The reminder system brings customers back.",
        metric: "+60% Revenue",
        avatar: "⚡"
      }
    ],
    metrics: [
      {
        title: "Daily Job Capacity",
        value: "140%",
        change: "+40% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Customer Retention",
        value: "85%",
        change: "+40% increase",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Business Revenue",
        value: "175%",
        change: "within 6 months",
        color: "text-orange-400",
        bgColor: "from-orange-500/20 to-red-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Daily Jobs",
        before: "5",
        after: "8",
        improvement: "+60%"
      },
      {
        metric: "Payment Time",
        before: "21 days",
        after: "3 days",
        improvement: "-86%"
      },
      {
        metric: "Customer Rating",
        before: "3.8★",
        after: "4.8★",
        improvement: "+26%"
      }
    ],
    colorScheme: {
      primary: "blue-600",
      secondary: "cyan-500",
      gradient: "from-blue-600 to-cyan-500"
    }
  },

  retail: {
    industry: "Retail Stores",
    route: "retail",
    heroTitles: ["Boost Online Sales", "Manage Inventory Smart", "Grow Retail Revenue"],
    heroDescription: "Transform your retail business with AI-powered e-commerce, inventory management, and customer engagement tools. Join 150+ stores growing with SISO.",
    benefits: [
      { icon: Package, text: "Inventory Management" },
      { icon: Clock, text: "48hr Launch" },
      { icon: ShoppingCart, text: "Online Store" },
      { icon: Users, text: "Customer Analytics" }
    ],
    topFeatures: [
      {
        icon: ShoppingCart,
        title: "AI-Powered E-Commerce",
        description: "Smart online store with product recommendations, upselling, and mobile optimization",
        stats: "3x Online Sales",
        highlight: "Revenue Boost",
        category: "E-Commerce"
      },
      {
        icon: Package,
        title: "Smart Inventory Management",
        description: "Real-time inventory tracking with auto-reorder points and supplier integration",
        stats: "50% Less Stockouts",
        highlight: "Always In Stock",
        category: "Inventory"
      },
      {
        icon: Users,
        title: "Customer Analytics Hub",
        description: "Customer behavior insights, purchase patterns, and personalized marketing campaigns",
        stats: "60% Higher LTV",
        highlight: "Know Your Customers",
        category: "Analytics"
      },
      {
        icon: CreditCard,
        title: "Unified POS System",
        description: "Integrated point-of-sale with online/offline sync and multiple payment methods",
        stats: "Seamless Experience",
        highlight: "One System",
        category: "POS"
      },
      {
        icon: Star,
        title: "Loyalty & Rewards",
        description: "Customer loyalty program with points, rewards, and automated marketing campaigns",
        stats: "70% Repeat Customers",
        highlight: "Customer Retention",
        category: "Loyalty"
      }
    ],
    additionalFeatures: [
      {
        icon: Bell,
        title: "Marketing Automation",
        description: "Abandoned cart recovery, promotional campaigns, and customer segmentation",
        stats: "40% More Conversions",
        highlight: "Smart Marketing",
        category: "Marketing"
      },
      {
        icon: BarChart3,
        title: "Sales Analytics",
        description: "Real-time sales reports, profit margins, and trend analysis with forecasting",
        stats: "Data-Driven Decisions",
        highlight: "Smart Insights",
        category: "Analytics"
      },
      {
        icon: Smartphone,
        title: "Mobile Shopping App",
        description: "Custom mobile app for customers with push notifications and exclusive deals",
        stats: "Mobile Experience",
        highlight: "Always Accessible",
        category: "Mobile"
      }
    ],
    showcaseTypes: [
      {
        type: "Fashion Boutique",
        emoji: "👗",
        features: ["Style Recommendations", "Size Finder", "Trend Alerts"],
        bgColor: "from-pink-500/20 to-purple-500/20",
        preview: "🖼️ Stylish fashion e-commerce platform"
      },
      {
        type: "Electronics Store",
        emoji: "📱",
        features: ["Product Comparisons", "Tech Support", "Warranty Tracking"],
        bgColor: "from-blue-500/20 to-indigo-500/20",
        preview: "🖼️ Advanced electronics retail system"
      },
      {
        type: "Home & Garden",
        emoji: "🏡",
        features: ["Project Ideas", "Tool Rental", "Seasonal Promotions"],
        bgColor: "from-green-500/20 to-emerald-500/20",
        preview: "🖼️ Complete home improvement store"
      }
    ],
    testimonials: [
      {
        name: "Sarah Wilson",
        business: "Bella Fashion Boutique",
        location: "Los Angeles, CA",
        quote: "Online sales tripled in 3 months. The AI recommendations are spot on.",
        metric: "3x Online Sales",
        avatar: "👗"
      },
      {
        name: "David Kim",
        business: "Tech Plus Electronics",
        location: "Austin, TX",
        quote: "Inventory management is effortless now. Never run out of popular items.",
        metric: "50% Less Stockouts",
        avatar: "📱"
      },
      {
        name: "Maria Rodriguez",
        business: "Garden Paradise",
        location: "Miami, FL",
        quote: "Customer loyalty program brought back 70% of customers. Amazing results!",
        metric: "70% Repeat Rate",
        avatar: "🏡"
      }
    ],
    metrics: [
      {
        title: "Online Sales Growth",
        value: "285%",
        change: "+185% increase",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      },
      {
        title: "Customer Lifetime Value",
        value: "160%",
        change: "+60% improvement",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Inventory Efficiency",
        value: "92%",
        change: "+42% optimization",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Monthly Online Sales",
        before: "$8K",
        after: "$28K",
        improvement: "+250%"
      },
      {
        metric: "Inventory Turnover",
        before: "4x/year",
        after: "8x/year",
        improvement: "+100%"
      },
      {
        metric: "Customer Retention",
        before: "45%",
        after: "78%",
        improvement: "+73%"
      }
    ],
    colorScheme: {
      primary: "purple-600",
      secondary: "pink-500",
      gradient: "from-purple-600 to-pink-500"
    }
  },

  photography: {
    industry: "Photography Studios",
    route: "photography",
    heroTitles: ["Book Photo Sessions", "Manage Client Galleries", "Grow Studio Business"],
    heroDescription: "Transform your photography business with AI-powered booking, client galleries, and business management tools. Join 100+ photographers growing with SISO.",
    benefits: [
      { icon: Camera, text: "Session Booking" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Users, text: "Client Galleries" },
      { icon: CreditCard, text: "Easy Payments" }
    ],
    topFeatures: [
      {
        icon: Calendar,
        title: "Session Booking System",
        description: "AI-powered scheduling with package selection, location management, and availability optimization",
        stats: "60% More Bookings",
        highlight: "Always Booked",
        category: "Booking"
      },
      {
        icon: Camera,
        title: "Client Gallery Management",
        description: "Beautiful online galleries with download options, favorites, and sharing capabilities",
        stats: "5-Star Experience",
        highlight: "Wow Clients",
        category: "Galleries"
      },
      {
        icon: Package,
        title: "Photography Packages",
        description: "Customizable packages with add-ons, print options, and automatic upselling",
        stats: "40% Higher Revenue",
        highlight: "Smart Upselling",
        category: "Packages"
      },
      {
        icon: CreditCard,
        title: "Payment & Contracts",
        description: "Digital contracts, deposit collection, and automated payment processing",
        stats: "Faster Collections",
        highlight: "Secure Payments",
        category: "Payments"
      },
      {
        icon: Users,
        title: "Client Communication",
        description: "Automated updates, session reminders, and delivery notifications with branding",
        stats: "Professional Touch",
        highlight: "Stay Connected",
        category: "Communication"
      }
    ],
    additionalFeatures: [
      {
        icon: Star,
        title: "Portfolio Showcase",
        description: "Stunning portfolio website with SEO optimization and lead capture forms",
        stats: "More Inquiries",
        highlight: "Get Discovered",
        category: "Marketing"
      },
      {
        icon: Palette,
        title: "Custom Branding",
        description: "Full brand customization across galleries, contracts, and client communications",
        stats: "Brand Consistency",
        highlight: "Your Style",
        category: "Branding"
      },
      {
        icon: BarChart3,
        title: "Business Analytics",
        description: "Revenue tracking, popular packages, and client acquisition insights",
        stats: "Data-Driven Growth",
        highlight: "Smart Decisions",
        category: "Analytics"
      }
    ],
    showcaseTypes: [
      {
        type: "Wedding Photography",
        emoji: "💒",
        features: ["Engagement Sessions", "Wedding Day", "Album Design"],
        bgColor: "from-rose-500/20 to-pink-500/20",
        preview: "🖼️ Romantic wedding photography platform"
      },
      {
        type: "Portrait Studio",
        emoji: "📸",
        features: ["Family Portraits", "Headshots", "Senior Photos"],
        bgColor: "from-blue-500/20 to-purple-500/20",
        preview: "🖼️ Professional portrait session management"
      },
      {
        type: "Event Photography",
        emoji: "🎉",
        features: ["Corporate Events", "Parties", "Live Galleries"],
        bgColor: "from-orange-500/20 to-red-500/20",
        preview: "🖼️ Dynamic event photography system"
      }
    ],
    testimonials: [
      {
        name: "Emily Rodriguez",
        business: "Emily Rose Photography",
        location: "San Diego, CA",
        quote: "Bookings doubled and clients love the instant galleries. Best investment for my business.",
        metric: "2x Bookings",
        avatar: "💒"
      },
      {
        name: "Michael Brown",
        business: "Brown Portrait Studio",
        location: "Chicago, IL",
        quote: "Client communication is seamless. The automated workflows save me 15 hours per week.",
        metric: "15hrs/week Saved",
        avatar: "📸"
      },
      {
        name: "Sarah Kim",
        business: "Kim Event Photography",
        location: "New York, NY",
        quote: "Revenue increased 50% with package upselling. The system sells for me!",
        metric: "+50% Revenue",
        avatar: "🎉"
      }
    ],
    metrics: [
      {
        title: "Session Bookings",
        value: "175%",
        change: "+75% increase",
        color: "text-pink-400",
        bgColor: "from-pink-500/20 to-rose-500/20"
      },
      {
        title: "Client Satisfaction",
        value: "98%",
        change: "+30% improvement",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      },
      {
        title: "Average Package Value",
        value: "145%",
        change: "+45% increase",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Monthly Sessions",
        before: "12",
        after: "28",
        improvement: "+133%"
      },
      {
        metric: "Client Communication Time",
        before: "8 hours",
        after: "2 hours",
        improvement: "-75%"
      },
      {
        metric: "Package Upgrade Rate",
        before: "20%",
        after: "55%",
        improvement: "+175%"
      }
    ],
    colorScheme: {
      primary: "pink-600",
      secondary: "purple-500",
      gradient: "from-pink-600 to-purple-500"
    }
  },

  petservices: {
    industry: "Pet Services & Veterinary",
    route: "pet-services",
    heroTitles: ["Book Pet Appointments", "Manage Pet Records", "Grow Your Practice"],
    heroDescription: "Transform your pet service business with AI-powered scheduling, pet records, and client communication tools. Join 80+ veterinary practices growing with SISO.",
    benefits: [
      { icon: PawPrint, text: "Pet Scheduling" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Heart, text: "Pet Records" },
      { icon: Users, text: "Client Portal" }
    ],
    topFeatures: [
      {
        icon: Calendar,
        title: "Pet Appointment Booking",
        description: "AI-powered scheduling with service type selection, pet profiles, and reminder system",
        stats: "50% More Appointments",
        highlight: "Always Booked",
        category: "Scheduling"
      },
      {
        icon: PawPrint,
        title: "Pet Records Management",
        description: "Complete pet profiles with medical history, vaccinations, and treatment tracking",
        stats: "Perfect Records",
        highlight: "Professional Care",
        category: "Records"
      },
      {
        icon: Heart,
        title: "Health Monitoring",
        description: "Vaccination reminders, health alerts, and preventive care scheduling",
        stats: "Healthier Pets",
        highlight: "Proactive Care",
        category: "Health"
      },
      {
        icon: Users,
        title: "Client Communication",
        description: "Automated updates, appointment reminders, and health report sharing",
        stats: "95% Client Satisfaction",
        highlight: "Happy Pet Parents",
        category: "Communication"
      },
      {
        icon: CreditCard,
        title: "Service Billing",
        description: "Digital invoicing, treatment plans, and pet insurance integration",
        stats: "Faster Payments",
        highlight: "Easy Billing",
        category: "Billing"
      }
    ],
    additionalFeatures: [
      {
        icon: Bell,
        title: "Vaccination Reminders",
        description: "Automated vaccination and checkup reminders with scheduling links",
        stats: "Never Miss Shots",
        highlight: "Healthy Pets",
        category: "Prevention"
      },
      {
        icon: Camera,
        title: "Pet Photo Gallery",
        description: "Before/after treatment photos and happy pet moment galleries",
        stats: "Visual Progress",
        highlight: "See Results",
        category: "Documentation"
      },
      {
        icon: Package,
        title: "Pet Care Packages",
        description: "Wellness packages, grooming bundles, and loyalty programs for pets",
        stats: "Recurring Revenue",
        highlight: "Package Deals",
        category: "Packages"
      }
    ],
    showcaseTypes: [
      {
        type: "Veterinary Clinic",
        emoji: "🏥",
        features: ["Medical Records", "Surgery Scheduling", "Emergency Alerts"],
        bgColor: "from-blue-500/20 to-cyan-500/20",
        preview: "🖼️ Complete veterinary practice management"
      },
      {
        type: "Pet Grooming",
        emoji: "✂️",
        features: ["Grooming Appointments", "Style Gallery", "Before/After Photos"],
        bgColor: "from-pink-500/20 to-purple-500/20",
        preview: "🖼️ Professional pet grooming system"
      },
      {
        type: "Pet Boarding",
        emoji: "🏠",
        features: ["Boarding Reservations", "Daily Updates", "Pet Cam Access"],
        bgColor: "from-green-500/20 to-emerald-500/20",
        preview: "🖼️ Pet boarding management platform"
      }
    ],
    testimonials: [
      {
        name: "Dr. Jessica Martinez",
        business: "Paws Veterinary Clinic",
        location: "Austin, TX",
        quote: "Appointment scheduling is seamless. Pet parents love the health reminders and updates.",
        metric: "+50% Appointments",
        avatar: "🏥"
      },
      {
        name: "Lisa Chen",
        business: "Pampered Paws Grooming",
        location: "Seattle, WA",
        quote: "Client retention increased 60%. The photo galleries show off our work beautifully.",
        metric: "+60% Retention",
        avatar: "✂️"
      },
      {
        name: "Mike Johnson",
        business: "Happy Tails Boarding",
        location: "Denver, CO",
        quote: "Bookings tripled with online scheduling. Pet parents feel secure with daily updates.",
        metric: "3x Bookings",
        avatar: "🏠"
      }
    ],
    metrics: [
      {
        title: "Appointment Efficiency",
        value: "165%",
        change: "+65% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Client Retention",
        value: "88%",
        change: "+45% increase",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Prevention Compliance",
        value: "92%",
        change: "+40% improvement",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Daily Appointments",
        before: "15",
        after: "25",
        improvement: "+67%"
      },
      {
        metric: "Vaccination Compliance",
        before: "65%",
        after: "92%",
        improvement: "+42%"
      },
      {
        metric: "Client Satisfaction",
        before: "4.1★",
        after: "4.9★",
        improvement: "+20%"
      }
    ],
    colorScheme: {
      primary: "blue-600",
      secondary: "cyan-500",
      gradient: "from-blue-600 to-cyan-500"
    }
  },

  construction: {
    industry: "Construction & Contractors",
    route: "construction",
    heroTitles: ["Manage Projects Better", "Track Jobs Efficiently", "Grow Construction Business"],
    heroDescription: "Transform your construction business with AI-powered project management, job tracking, and client communication tools. Join 120+ contractors growing with SISO.",
    benefits: [
      { icon: Hammer, text: "Project Management" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Users, text: "Client Portal" },
      { icon: BarChart3, text: "Job Tracking" }
    ],
    topFeatures: [
      {
        icon: Building,
        title: "Project Management Hub",
        description: "Complete project tracking with timelines, milestones, and team coordination",
        stats: "40% Faster Completion",
        highlight: "Efficiency Boost",
        category: "Projects"
      },
      {
        icon: Users,
        title: "Client Communication",
        description: "Real-time project updates, photo sharing, and approval workflows",
        stats: "95% Client Satisfaction",
        highlight: "Happy Clients",
        category: "Communication"
      },
      {
        icon: CreditCard,
        title: "Estimates & Billing",
        description: "Professional estimates, progress billing, and payment tracking",
        stats: "Faster Payments",
        highlight: "Cash Flow",
        category: "Billing"
      },
      {
        icon: Calendar,
        title: "Scheduling & Crews",
        description: "Crew scheduling, resource allocation, and timeline management",
        stats: "30% Better Utilization",
        highlight: "Team Efficiency",
        category: "Scheduling"
      },
      {
        icon: Camera,
        title: "Progress Documentation",
        description: "Photo documentation, daily reports, and milestone tracking",
        stats: "Visual Progress",
        highlight: "Transparency",
        category: "Documentation"
      }
    ],
    additionalFeatures: [
      {
        icon: Package,
        title: "Material Management",
        description: "Track materials, deliveries, and inventory with cost monitoring",
        stats: "Cost Control",
        highlight: "Budget Management",
        category: "Materials"
      },
      {
        icon: Shield,
        title: "Safety & Compliance",
        description: "Safety protocols, compliance tracking, and incident reporting",
        stats: "Zero Incidents",
        highlight: "Safe Jobsites",
        category: "Safety"
      },
      {
        icon: BarChart3,
        title: "Job Analytics",
        description: "Profit margins, project performance, and team productivity insights",
        stats: "Data-Driven Decisions",
        highlight: "Smart Insights",
        category: "Analytics"
      }
    ],
    showcaseTypes: [
      {
        type: "Home Building",
        emoji: "🏠",
        features: ["Custom Homes", "Renovations", "Timeline Tracking"],
        bgColor: "from-orange-500/20 to-red-500/20",
        preview: "🖼️ Complete home building management"
      },
      {
        type: "Commercial Construction",
        emoji: "🏢",
        features: ["Office Buildings", "Retail Spaces", "Project Coordination"],
        bgColor: "from-blue-500/20 to-indigo-500/20",
        preview: "🖼️ Large-scale commercial projects"
      },
      {
        type: "Specialty Contractors",
        emoji: "🔧",
        features: ["Electrical", "Plumbing", "HVAC"],
        bgColor: "from-green-500/20 to-emerald-500/20",
        preview: "🖼️ Specialized construction services"
      }
    ],
    testimonials: [
      {
        name: "John Martinez",
        business: "Martinez Construction",
        location: "Phoenix, AZ",
        quote: "Project completion time improved 40%. Clients love the real-time updates.",
        metric: "+40% Faster",
        avatar: "🏠"
      },
      {
        name: "Sarah Johnson",
        business: "Johnson Commercial",
        location: "Denver, CO",
        quote: "Cash flow improved dramatically with progress billing. Game changer for our business.",
        metric: "Better Cash Flow",
        avatar: "🏢"
      },
      {
        name: "Mike Chen",
        business: "Chen Electric",
        location: "Seattle, WA",
        quote: "Team coordination is seamless. We finish jobs 30% faster now.",
        metric: "+30% Efficiency",
        avatar: "🔧"
      }
    ],
    metrics: [
      {
        title: "Project Completion",
        value: "140%",
        change: "+40% improvement",
        color: "text-orange-400",
        bgColor: "from-orange-500/20 to-red-500/20"
      },
      {
        title: "Client Satisfaction",
        value: "94%",
        change: "+35% increase",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Profit Margins",
        value: "125%",
        change: "+25% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Project Timeline",
        before: "120 days",
        after: "85 days",
        improvement: "-29%"
      },
      {
        metric: "Communication Issues",
        before: "15/project",
        after: "3/project",
        improvement: "-80%"
      },
      {
        metric: "Payment Collection",
        before: "45 days",
        after: "15 days",
        improvement: "-67%"
      }
    ],
    colorScheme: {
      primary: "orange-600",
      secondary: "red-500",
      gradient: "from-orange-600 to-red-500"
    }
  },

  cleaning: {
    industry: "Cleaning Services",
    route: "cleaning",
    heroTitles: ["Schedule Cleaning Jobs", "Manage Teams Efficiently", "Grow Cleaning Business"],
    heroDescription: "Transform your cleaning business with AI-powered scheduling, team management, and customer communication tools. Join 180+ cleaning companies growing with SISO.",
    benefits: [
      { icon: Sparkles, text: "Smart Scheduling" },
      { icon: Clock, text: "48hr Launch" },
      { icon: Users, text: "Team Management" },
      { icon: Star, text: "Quality Control" }
    ],
    topFeatures: [
      {
        icon: Calendar,
        title: "Smart Job Scheduling",
        description: "AI-powered scheduling with route optimization and recurring service management",
        stats: "50% More Jobs Daily",
        highlight: "Efficiency Boost",
        category: "Scheduling"
      },
      {
        icon: Users,
        title: "Team Management",
        description: "Crew assignments, performance tracking, and mobile team communication",
        stats: "30% Better Productivity",
        highlight: "Team Efficiency",
        category: "Teams"
      },
      {
        icon: Star,
        title: "Quality Control System",
        description: "Checklists, photo verification, and customer feedback collection",
        stats: "5-Star Service",
        highlight: "Perfect Quality",
        category: "Quality"
      },
      {
        icon: CreditCard,
        title: "Billing & Payments",
        description: "Automated invoicing, recurring billing, and instant payment processing",
        stats: "Faster Collections",
        highlight: "Cash Flow",
        category: "Billing"
      },
      {
        icon: MapPin,
        title: "Route Optimization",
        description: "Smart routing to minimize travel time and maximize daily cleaning capacity",
        stats: "40% Less Travel",
        highlight: "Save Time & Gas",
        category: "Logistics"
      }
    ],
    additionalFeatures: [
      {
        icon: Bell,
        title: "Service Reminders",
        description: "Automated reminders for recurring cleans and customer notifications",
        stats: "Never Miss Cleans",
        highlight: "Reliable Service",
        category: "Communication"
      },
      {
        icon: Camera,
        title: "Before/After Photos",
        description: "Photo documentation and progress tracking for quality assurance",
        stats: "Visual Proof",
        highlight: "Show Quality",
        category: "Documentation"
      },
      {
        icon: Package,
        title: "Supply Management",
        description: "Track cleaning supplies, inventory levels, and automatic reordering",
        stats: "Cost Control",
        highlight: "Smart Inventory",
        category: "Supplies"
      }
    ],
    showcaseTypes: [
      {
        type: "Residential Cleaning",
        emoji: "🏠",
        features: ["House Cleaning", "Deep Cleans", "Recurring Service"],
        bgColor: "from-blue-500/20 to-cyan-500/20",
        preview: "🖼️ Home cleaning service management"
      },
      {
        type: "Commercial Cleaning",
        emoji: "🏢",
        features: ["Office Cleaning", "Medical Facilities", "Retail Spaces"],
        bgColor: "from-green-500/20 to-emerald-500/20",
        preview: "🖼️ Commercial cleaning operations"
      },
      {
        type: "Specialty Cleaning",
        emoji: "✨",
        features: ["Carpet Cleaning", "Window Cleaning", "Post-Construction"],
        bgColor: "from-purple-500/20 to-pink-500/20",
        preview: "🖼️ Specialized cleaning services"
      }
    ],
    testimonials: [
      {
        name: "Maria Rodriguez",
        business: "Sparkle Clean Services",
        location: "Miami, FL",
        quote: "We can handle 50% more clients now with better scheduling. Revenue doubled!",
        metric: "2x Revenue",
        avatar: "🏠"
      },
      {
        name: "David Kim",
        business: "Professional Office Cleaning",
        location: "Los Angeles, CA",
        quote: "Quality control improved dramatically. Clients love the photo updates.",
        metric: "5-Star Reviews",
        avatar: "🏢"
      },
      {
        name: "Lisa Johnson",
        business: "Elite Cleaning Solutions",
        location: "Chicago, IL",
        quote: "Team productivity increased 30%. The mobile app is a game changer.",
        metric: "+30% Productivity",
        avatar: "✨"
      }
    ],
    metrics: [
      {
        title: "Daily Job Capacity",
        value: "150%",
        change: "+50% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Customer Satisfaction",
        value: "96%",
        change: "+40% increase",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Team Productivity",
        value: "130%",
        change: "+30% improvement",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Daily Cleans",
        before: "8",
        after: "14",
        improvement: "+75%"
      },
      {
        metric: "Travel Time",
        before: "4 hours",
        after: "2.5 hours",
        improvement: "-38%"
      },
      {
        metric: "Customer Rating",
        before: "4.1★",
        after: "4.8★",
        improvement: "+17%"
      }
    ],
    colorScheme: {
      primary: "cyan-600",
      secondary: "blue-500",
      gradient: "from-cyan-600 to-blue-500"
    }
  },

  consulting: {
    industry: "Consulting Services",
    route: "consulting",
    heroTitles: ["Manage Client Projects", "Track Billable Hours", "Grow Consulting Practice"],
    heroDescription: "Transform your consulting practice with AI-powered project management, time tracking, and client communication tools. Join 90+ consultants growing with SISO.",
    benefits: [
      { icon: Briefcase, text: "Project Management" },
      { icon: Clock, text: "Time Tracking" },
      { icon: Users, text: "Client Portal" },
      { icon: BarChart3, text: "Business Analytics" }
    ],
    topFeatures: [
      {
        icon: Briefcase,
        title: "Project Management Hub",
        description: "Complete project tracking with deliverables, timelines, and client collaboration",
        stats: "40% Faster Delivery",
        highlight: "Efficiency Boost",
        category: "Projects"
      },
      {
        icon: Clock,
        title: "Time Tracking & Billing",
        description: "Accurate time tracking with automated invoicing and hourly rate management",
        stats: "95% Time Accuracy",
        highlight: "Precise Billing",
        category: "Time"
      },
      {
        icon: Users,
        title: "Client Collaboration",
        description: "Secure client portals with document sharing, progress updates, and communication",
        stats: "5-Star Client Experience",
        highlight: "Happy Clients",
        category: "Collaboration"
      },
      {
        icon: FileText,
        title: "Proposal & Contract",
        description: "Professional proposals, digital contracts, and e-signature workflows",
        stats: "60% Faster Closure",
        highlight: "Win More Business",
        category: "Sales"
      },
      {
        icon: BarChart3,
        title: "Business Analytics",
        description: "Revenue tracking, utilization rates, and client profitability analysis",
        stats: "Data-Driven Growth",
        highlight: "Smart Decisions",
        category: "Analytics"
      }
    ],
    additionalFeatures: [
      {
        icon: Calendar,
        title: "Meeting Scheduling",
        description: "Client meeting booking, calendar sync, and automated reminders",
        stats: "Never Miss Meetings",
        highlight: "Stay Organized",
        category: "Scheduling"
      },
      {
        icon: Package,
        title: "Knowledge Management",
        description: "Document libraries, templates, and best practice repositories",
        stats: "Faster Delivery",
        highlight: "Reuse Expertise",
        category: "Knowledge"
      },
      {
        icon: Star,
        title: "Performance Tracking",
        description: "KPI monitoring, milestone tracking, and success metrics",
        stats: "Measurable Results",
        highlight: "Prove Value",
        category: "Performance"
      }
    ],
    showcaseTypes: [
      {
        type: "Management Consulting",
        emoji: "📈",
        features: ["Strategic Planning", "Process Improvement", "Change Management"],
        bgColor: "from-blue-500/20 to-indigo-500/20",
        preview: "🖼️ Executive consulting platform"
      },
      {
        type: "IT Consulting",
        emoji: "💻",
        features: ["System Implementation", "Digital Transformation", "Technical Architecture"],
        bgColor: "from-green-500/20 to-emerald-500/20",
        preview: "🖼️ Technology consulting system"
      },
      {
        type: "Financial Consulting",
        emoji: "💰",
        features: ["Financial Planning", "Investment Strategy", "Risk Management"],
        bgColor: "from-purple-500/20 to-pink-500/20",
        preview: "🖼️ Financial advisory platform"
      }
    ],
    testimonials: [
      {
        name: "Sarah Wilson",
        business: "Strategic Growth Consulting",
        location: "New York, NY",
        quote: "Project delivery improved 40%. Clients love the transparency and collaboration.",
        metric: "+40% Faster",
        avatar: "📈"
      },
      {
        name: "Michael Brown",
        business: "TechTransform Consulting",
        location: "San Francisco, CA",
        quote: "Time tracking is seamless. Billing accuracy improved and clients trust our hours.",
        metric: "95% Accuracy",
        avatar: "💻"
      },
      {
        name: "Jennifer Kim",
        business: "Capital Advisory Partners",
        location: "Chicago, IL",
        quote: "Won 60% more proposals with professional presentations. ROI is incredible.",
        metric: "+60% Win Rate",
        avatar: "💰"
      }
    ],
    metrics: [
      {
        title: "Project Delivery Speed",
        value: "140%",
        change: "+40% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Billing Accuracy",
        value: "96%",
        change: "+25% improvement",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Client Satisfaction",
        value: "93%",
        change: "+30% increase",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Project Timeline",
        before: "12 weeks",
        after: "8 weeks",
        improvement: "-33%"
      },
      {
        metric: "Proposal Win Rate",
        before: "35%",
        after: "60%",
        improvement: "+71%"
      },
      {
        metric: "Billable Hours Accuracy",
        before: "78%",
        after: "96%",
        improvement: "+23%"
      }
    ],
    colorScheme: {
      primary: "indigo-600",
      secondary: "blue-500",
      gradient: "from-indigo-600 to-blue-500"
    }
  },

  videoproduction: {
    industry: "Video Production",
    route: "video-production",
    heroTitles: ["Manage Video Projects", "Streamline Production", "Grow Studio Business"],
    heroDescription: "Transform your video production business with AI-powered project management, client collaboration, and delivery systems. Join 70+ studios growing with SISO.",
    benefits: [
      { icon: Video, text: "Project Management" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Users, text: "Client Collaboration" },
      { icon: Camera, text: "Asset Management" }
    ],
    topFeatures: [
      {
        icon: Video,
        title: "Production Management",
        description: "Complete project tracking from pre-production through final delivery",
        stats: "30% Faster Production",
        highlight: "Efficiency Boost",
        category: "Production"
      },
      {
        icon: Users,
        title: "Client Collaboration Hub",
        description: "Secure client portals for feedback, approvals, and real-time project updates",
        stats: "5-Star Client Experience",
        highlight: "Happy Clients",
        category: "Collaboration"
      },
      {
        icon: Camera,
        title: "Asset Management System",
        description: "Organize footage, graphics, audio files with version control and team access",
        stats: "50% Faster Editing",
        highlight: "Organized Workflow",
        category: "Assets"
      },
      {
        icon: Calendar,
        title: "Production Scheduling",
        description: "Crew scheduling, equipment booking, and location management",
        stats: "Zero Conflicts",
        highlight: "Perfect Planning",
        category: "Scheduling"
      },
      {
        icon: CreditCard,
        title: "Project Billing",
        description: "Milestone billing, expense tracking, and client payment processing",
        stats: "Faster Payments",
        highlight: "Cash Flow",
        category: "Billing"
      }
    ],
    additionalFeatures: [
      {
        icon: Star,
        title: "Review & Approval",
        description: "Video review tools with timestamped feedback and approval workflows",
        stats: "Streamlined Reviews",
        highlight: "Clear Feedback",
        category: "Reviews"
      },
      {
        icon: Package,
        title: "Delivery Management",
        description: "Automated delivery notifications with download links and usage rights",
        stats: "Professional Delivery",
        highlight: "Client Delight",
        category: "Delivery"
      },
      {
        icon: BarChart3,
        title: "Studio Analytics",
        description: "Project profitability, team utilization, and client acquisition insights",
        stats: "Data-Driven Growth",
        highlight: "Smart Decisions",
        category: "Analytics"
      }
    ],
    showcaseTypes: [
      {
        type: "Corporate Video",
        emoji: "🎬",
        features: ["Brand Videos", "Training Content", "Event Coverage"],
        bgColor: "from-blue-500/20 to-indigo-500/20",
        preview: "🖼️ Professional corporate video production"
      },
      {
        type: "Marketing Video",
        emoji: "📺",
        features: ["Commercial Ads", "Social Media", "Product Demos"],
        bgColor: "from-purple-500/20 to-pink-500/20",
        preview: "🖼️ Creative marketing video platform"
      },
      {
        type: "Event Production",
        emoji: "🎪",
        features: ["Live Streaming", "Event Coverage", "Multi-Camera Setup"],
        bgColor: "from-orange-500/20 to-red-500/20",
        preview: "🖼️ Live event production management"
      }
    ],
    testimonials: [
      {
        name: "Alex Rodriguez",
        business: "Visionary Video Productions",
        location: "Los Angeles, CA",
        quote: "Production time decreased 30%. Client collaboration is seamless with the portal.",
        metric: "+30% Faster",
        avatar: "🎬"
      },
      {
        name: "Sarah Kim",
        business: "Creative Media Studio",
        location: "Austin, TX",
        quote: "Asset management saved us hours daily. Everything is organized and accessible.",
        metric: "Hours Saved Daily",
        avatar: "📺"
      },
      {
        name: "Mike Johnson",
        business: "Event Pro Video",
        location: "Chicago, IL",
        quote: "Booking more events with professional client experience. Revenue up 45%.",
        metric: "+45% Revenue",
        avatar: "🎪"
      }
    ],
    metrics: [
      {
        title: "Production Efficiency",
        value: "130%",
        change: "+30% improvement",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      },
      {
        title: "Client Satisfaction",
        value: "97%",
        change: "+35% increase",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Project Profitability",
        value: "125%",
        change: "+25% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Project Timeline",
        before: "6 weeks",
        after: "4 weeks",
        improvement: "-33%"
      },
      {
        metric: "Asset Search Time",
        before: "30 min",
        after: "5 min",
        improvement: "-83%"
      },
      {
        metric: "Client Approval Time",
        before: "1 week",
        after: "2 days",
        improvement: "-71%"
      }
    ],
    colorScheme: {
      primary: "purple-600",
      secondary: "pink-500",
      gradient: "from-purple-600 to-pink-500"
    }
  },

  // New Industries - 10 Additional High-Quality Configurations
  financialservices: {
    industry: "Financial Services",
    route: "financial-services",
    headerImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1920&h=1080&fit=crop",
    heroTitles: ["Automate Financial Operations", "Streamline Client Management", "Scale Your Practice 3x"],
    heroDescription: "Transform your financial services practice with AI-powered client management, automated reporting, and intelligent portfolio management. Join 150+ financial advisors already growing with SISO.",
    benefits: [
      { icon: DollarSign, text: "Portfolio Automation" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Shield, text: "SEC Compliant" },
      { icon: Users, text: "Client Portal" }
    ],
    topFeatures: [
      {
        icon: BarChart3,
        title: "Automated Portfolio Reporting",
        description: "Generate comprehensive portfolio reports automatically with real-time data integration and customizable templates.",
        stats: "85% faster reporting",
        highlight: "Real-time data sync",
        category: "Automation"
      },
      {
        icon: Users,
        title: "Client Relationship Management",
        description: "Manage client relationships with automated follow-ups, meeting scheduling, and personalized communication workflows.",
        stats: "60% more client engagement",
        highlight: "Automated touchpoints",
        category: "Client Management"
      },
      {
        icon: Shield,
        title: "Compliance Management",
        description: "Stay compliant with automated regulatory reporting, document management, and audit trail generation.",
        stats: "100% compliance tracking",
        highlight: "Automated audits",
        category: "Compliance"
      },
      {
        icon: TrendingUp,
        title: "Performance Analytics",
        description: "Track portfolio performance, client satisfaction, and business metrics with advanced analytics dashboards.",
        stats: "40% better insights",
        highlight: "Predictive analytics",
        category: "Analytics"
      },
      {
        icon: Bell,
        title: "Smart Notifications",
        description: "Get intelligent alerts for market changes, client opportunities, and compliance requirements.",
        stats: "90% faster responses",
        highlight: "AI-powered alerts",
        category: "Intelligence"
      }
    ],
    additionalFeatures: [
      {
        icon: FileText,
        title: "Document Automation",
        description: "Automate client onboarding documents, compliance forms, and regulatory filings with smart templates.",
        stats: "70% less paperwork",
        highlight: "Smart templates",
        category: "Documentation"
      },
      {
        icon: Calendar,
        title: "Meeting Coordination",
        description: "Streamline client meetings with automated scheduling, agenda creation, and follow-up task management.",
        stats: "50% more meetings",
        highlight: "Auto scheduling",
        category: "Productivity"
      },
      {
        icon: Target,
        title: "Goal Tracking",
        description: "Monitor client financial goals with automated progress tracking and milestone notifications.",
        stats: "35% better outcomes",
        highlight: "Goal monitoring",
        category: "Client Success"
      }
    ],
    showcaseTypes: [
      {
        type: "Wealth Management",
        emoji: "💰",
        features: ["Portfolio tracking", "Client reporting", "Risk assessment"],
        bgColor: "from-emerald-500/20 to-green-500/20",
        preview: "Comprehensive wealth management platform"
      },
      {
        type: "Financial Planning",
        emoji: "📊",
        features: ["Retirement planning", "Tax optimization", "Estate planning"],
        bgColor: "from-blue-500/20 to-cyan-500/20",
        preview: "Complete financial planning suite"
      },
      {
        type: "Investment Advisory",
        emoji: "📈",
        features: ["Market analysis", "Portfolio optimization", "Risk management"],
        bgColor: "from-purple-500/20 to-pink-500/20",
        preview: "Advanced investment advisory tools"
      }
    ],
    testimonials: [
      {
        name: "Sarah Mitchell",
        business: "Mitchell Wealth Advisors",
        location: "New York, NY",
        quote: "SISO transformed our practice. We're now managing 3x more clients with the same team size.",
        metric: "+300% AUM",
        avatar: "👩‍💼"
      },
      {
        name: "David Chen",
        business: "Chen Financial Group",
        location: "San Francisco, CA",
        quote: "The automated reporting saved us 20 hours per week. Our clients love the real-time updates.",
        metric: "+150% efficiency",
        avatar: "👨‍💼"
      },
      {
        name: "Jennifer Rodriguez",
        business: "Rodriguez Investment Services",
        location: "Miami, FL",
        quote: "Compliance tracking is now effortless. We passed our last audit with flying colors.",
        metric: "100% compliant",
        avatar: "👩‍💻"
      }
    ],
    metrics: [
      {
        title: "Assets Under Management",
        value: "+285%",
        change: "+185% average increase",
        color: "text-emerald-400",
        bgColor: "from-emerald-500/20 to-green-500/20"
      },
      {
        title: "Client Satisfaction",
        value: "98%",
        change: "+25% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Operational Efficiency",
        value: "180%",
        change: "+80% improvement",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Report Generation Time",
        before: "8 hours",
        after: "1 hour",
        improvement: "-88%"
      },
      {
        metric: "Client Onboarding",
        before: "2 weeks",
        after: "3 days",
        improvement: "-79%"
      },
      {
        metric: "Compliance Checks",
        before: "Manual weekly",
        after: "Automated daily",
        improvement: "+600%"
      }
    ],
    colorScheme: {
      primary: "emerald-600",
      secondary: "green-500",
      gradient: "from-emerald-600 to-green-500"
    }
  },

  education: {
    industry: "Education & Tutoring",
    route: "education",
    heroTitles: ["Modernize Education Delivery", "Scale Learning Programs", "Engage Students Effectively"],
    heroDescription: "Transform your educational practice with AI-powered learning management, automated progress tracking, and intelligent content delivery. Join 200+ educators already growing with SISO.",
    benefits: [
      { icon: BookOpen, text: "Learning Management" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Users, text: "Student Portal" },
      { icon: BarChart3, text: "Progress Tracking" }
    ],
    topFeatures: [
      {
        icon: BookOpen,
        title: "Intelligent Learning Paths",
        description: "Create personalized learning experiences with AI-driven curriculum adaptation and progress-based content delivery.",
        stats: "70% better outcomes",
        highlight: "Adaptive learning",
        category: "Education"
      },
      {
        icon: Users,
        title: "Student Management System",
        description: "Track student progress, manage enrollments, and automate communication with parents and administrators.",
        stats: "80% less admin work",
        highlight: "Automated tracking",
        category: "Management"
      },
      {
        icon: BarChart3,
        title: "Performance Analytics",
        description: "Monitor student performance, identify learning gaps, and optimize teaching strategies with detailed analytics.",
        stats: "60% better insights",
        highlight: "Learning analytics",
        category: "Analytics"
      },
      {
        icon: Calendar,
        title: "Class Scheduling",
        description: "Automate class scheduling, resource allocation, and attendance tracking with intelligent optimization.",
        stats: "90% scheduling efficiency",
        highlight: "Smart scheduling",
        category: "Operations"
      },
      {
        icon: MessageCircle,
        title: "Parent Communication",
        description: "Keep parents informed with automated progress reports, achievement notifications, and two-way messaging.",
        stats: "95% parent satisfaction",
        highlight: "Automated updates",
        category: "Communication"
      }
    ],
    additionalFeatures: [
      {
        icon: Target,
        title: "Assessment Tools",
        description: "Create and grade assessments automatically with intelligent scoring and feedback generation.",
        stats: "75% faster grading",
        highlight: "Auto-grading",
        category: "Assessment"
      },
      {
        icon: Video,
        title: "Virtual Classrooms",
        description: "Deliver engaging online lessons with interactive tools, recording capabilities, and attendance tracking.",
        stats: "85% engagement rate",
        highlight: "Interactive learning",
        category: "Digital Learning"
      },
      {
        icon: FileText,
        title: "Curriculum Management",
        description: "Organize and deliver curriculum content with version control, standards alignment, and resource sharing.",
        stats: "60% content efficiency",
        highlight: "Standards aligned",
        category: "Content"
      }
    ],
    showcaseTypes: [
      {
        type: "K-12 Schools",
        emoji: "🏫",
        features: ["Grade management", "Parent portals", "Curriculum tracking"],
        bgColor: "from-blue-500/20 to-indigo-500/20",
        preview: "Complete K-12 school management"
      },
      {
        type: "Tutoring Centers",
        emoji: "📚",
        features: ["Session scheduling", "Progress tracking", "Payment processing"],
        bgColor: "from-green-500/20 to-emerald-500/20",
        preview: "Professional tutoring management"
      },
      {
        type: "Online Learning",
        emoji: "💻",
        features: ["Course delivery", "Student engagement", "Progress analytics"],
        bgColor: "from-purple-500/20 to-violet-500/20",
        preview: "Modern online education platform"
      }
    ],
    testimonials: [
      {
        name: "Maria Gonzalez",
        business: "Sunshine Elementary",
        location: "Austin, TX",
        quote: "Student engagement increased dramatically. Parents love getting real-time updates on their child's progress.",
        metric: "+85% engagement",
        avatar: "👩‍🏫"
      },
      {
        name: "Robert Kim",
        business: "Excel Learning Center",
        location: "Seattle, WA",
        quote: "We've scaled from 50 to 200 students without adding staff. The automation is incredible.",
        metric: "+300% growth",
        avatar: "👨‍🏫"
      },
      {
        name: "Dr. Lisa Thompson",
        business: "Advanced STEM Academy",
        location: "Boston, MA",
        quote: "The analytics help us identify struggling students early and provide targeted support.",
        metric: "+40% success rate",
        avatar: "👩‍🔬"
      }
    ],
    metrics: [
      {
        title: "Student Performance",
        value: "+65%",
        change: "+40% average improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-indigo-500/20"
      },
      {
        title: "Parent Satisfaction",
        value: "96%",
        change: "+30% improvement",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Administrative Efficiency",
        value: "210%",
        change: "+110% improvement",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-violet-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Grading Time",
        before: "6 hours/week",
        after: "1 hour/week",
        improvement: "-83%"
      },
      {
        metric: "Parent Communication",
        before: "Monthly reports",
        after: "Real-time updates",
        improvement: "+400%"
      },
      {
        metric: "Student Tracking",
        before: "Manual spreadsheets",
        after: "Automated analytics",
        improvement: "+500%"
      }
    ],
    colorScheme: {
      primary: "blue-600",
      secondary: "indigo-500",
      gradient: "from-blue-600 to-indigo-500"
    }
  },

  travel: {
    industry: "Travel & Tourism",
    route: "travel",
    heroTitles: ["Automate Travel Operations", "Enhance Guest Experiences", "Scale Tourism Business"],
    heroDescription: "Transform your travel business with AI-powered booking management, automated customer service, and intelligent itinerary planning. Join 180+ travel professionals already growing with SISO.",
    benefits: [
      { icon: Plane, text: "Booking Automation" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Users, text: "Guest Portal" },
      { icon: Globe, text: "Global Support" }
    ],
    topFeatures: [
      {
        icon: Calendar,
        title: "Smart Booking Management",
        description: "Automate bookings, cancellations, and modifications with intelligent pricing and availability management.",
        stats: "90% booking efficiency",
        highlight: "Dynamic pricing",
        category: "Bookings"
      },
      {
        icon: Users,
        title: "Guest Experience Management",
        description: "Deliver personalized experiences with automated check-ins, concierge services, and preference tracking.",
        stats: "95% guest satisfaction",
        highlight: "Personalized service",
        category: "Experience"
      },
      {
        icon: MapPin,
        title: "Itinerary Planning",
        description: "Create intelligent itineraries with local recommendations, activity booking, and real-time adjustments.",
        stats: "80% planning efficiency",
        highlight: "AI recommendations",
        category: "Planning"
      },
      {
        icon: MessageCircle,
        title: "Multi-Channel Communication",
        description: "Engage guests across all channels with automated responses, booking confirmations, and travel updates.",
        stats: "24/7 availability",
        highlight: "Instant responses",
        category: "Communication"
      },
      {
        icon: BarChart3,
        title: "Business Intelligence",
        description: "Track revenue, occupancy rates, and guest preferences with comprehensive analytics dashboards.",
        stats: "45% revenue increase",
        highlight: "Revenue optimization",
        category: "Analytics"
      }
    ],
    additionalFeatures: [
      {
        icon: CreditCard,
        title: "Payment Processing",
        description: "Handle payments, deposits, and refunds automatically with integrated payment systems and fraud protection.",
        stats: "99.9% payment success",
        highlight: "Secure processing",
        category: "Payments"
      },
      {
        icon: Bell,
        title: "Travel Alerts",
        description: "Send automated flight updates, weather alerts, and local information to keep travelers informed.",
        stats: "98% delivery rate",
        highlight: "Real-time alerts",
        category: "Notifications"
      },
      {
        icon: Star,
        title: "Review Management",
        description: "Monitor and respond to reviews automatically while gathering feedback to improve services.",
        stats: "4.8/5 avg rating",
        highlight: "Reputation management",
        category: "Reviews"
      }
    ],
    showcaseTypes: [
      {
        type: "Hotels & Resorts",
        emoji: "🏨",
        features: ["Reservation system", "Guest services", "Revenue management"],
        bgColor: "from-cyan-500/20 to-blue-500/20",
        preview: "Complete hospitality management"
      },
      {
        type: "Travel Agencies",
        emoji: "✈️",
        features: ["Trip planning", "Booking management", "Customer support"],
        bgColor: "from-emerald-500/20 to-teal-500/20",
        preview: "Professional travel agency platform"
      },
      {
        type: "Tour Operators",
        emoji: "🗺️",
        features: ["Tour scheduling", "Group management", "Activity booking"],
        bgColor: "from-orange-500/20 to-amber-500/20",
        preview: "Advanced tour operation system"
      }
    ],
    testimonials: [
      {
        name: "Elena Rodriguez",
        business: "Paradise Resort",
        location: "Cancun, Mexico",
        quote: "Guest satisfaction scores increased 40% since implementing SISO. The automation handles everything seamlessly.",
        metric: "+40% satisfaction",
        avatar: "👩‍💼"
      },
      {
        name: "James Wilson",
        business: "Adventure Travel Co",
        location: "Denver, CO",
        quote: "We've doubled our booking capacity without adding staff. The AI itinerary planner is incredible.",
        metric: "+200% capacity",
        avatar: "👨‍🏔️"
      },
      {
        name: "Sophie Chen",
        business: "Urban Explorer Tours",
        location: "San Francisco, CA",
        quote: "Revenue increased 60% through dynamic pricing and better customer targeting. Game changer!",
        metric: "+60% revenue",
        avatar: "👩‍🦳"
      }
    ],
    metrics: [
      {
        title: "Booking Conversion",
        value: "+155%",
        change: "+85% improvement",
        color: "text-cyan-400",
        bgColor: "from-cyan-500/20 to-blue-500/20"
      },
      {
        title: "Guest Satisfaction",
        value: "94%",
        change: "+35% improvement",
        color: "text-emerald-400",
        bgColor: "from-emerald-500/20 to-teal-500/20"
      },
      {
        title: "Revenue Per Guest",
        value: "+78%",
        change: "+45% improvement",
        color: "text-orange-400",
        bgColor: "from-orange-500/20 to-amber-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Booking Processing",
        before: "15 minutes",
        after: "2 minutes",
        improvement: "-87%"
      },
      {
        metric: "Guest Response Time",
        before: "4 hours",
        after: "Instant",
        improvement: "-100%"
      },
      {
        metric: "Revenue Management",
        before: "Weekly pricing",
        after: "Dynamic pricing",
        improvement: "+300%"
      }
    ],
    colorScheme: {
      primary: "cyan-600",
      secondary: "blue-500",
      gradient: "from-cyan-600 to-blue-500"
    }
  },

  food: {
    industry: "Food Services",
    route: "food",
    heroTitles: ["Streamline Food Operations", "Optimize Kitchen Workflow", "Scale Food Business"],
    heroDescription: "Transform your food service operation with AI-powered ordering, inventory management, and customer engagement. Join 250+ food businesses already growing with SISO.",
    benefits: [
      { icon: Utensils, text: "Order Management" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Package, text: "Inventory Control" },
      { icon: Users, text: "Customer Portal" }
    ],
    topFeatures: [
      {
        icon: ShoppingCart,
        title: "Smart Order Processing",
        description: "Automate order taking, kitchen routing, and delivery coordination with intelligent workflow optimization.",
        stats: "95% order accuracy",
        highlight: "Zero-error processing",
        category: "Orders"
      },
      {
        icon: Package,
        title: "Inventory Management",
        description: "Track ingredients, predict demand, and automate purchasing with AI-powered inventory optimization.",
        stats: "40% cost reduction",
        highlight: "Predictive ordering",
        category: "Inventory"
      },
      {
        icon: Users,
        title: "Customer Engagement",
        description: "Build loyalty with personalized recommendations, order history, and automated marketing campaigns.",
        stats: "85% retention rate",
        highlight: "Smart recommendations",
        category: "Customer"
      },
      {
        icon: BarChart3,
        title: "Performance Analytics",
        description: "Monitor sales, food costs, and customer preferences with comprehensive business intelligence.",
        stats: "60% profit increase",
        highlight: "Data-driven decisions",
        category: "Analytics"
      },
      {
        icon: Truck,
        title: "Delivery Optimization",
        description: "Optimize delivery routes, track drivers, and provide real-time updates to customers.",
        stats: "30% faster delivery",
        highlight: "Route optimization",
        category: "Delivery"
      }
    ],
    additionalFeatures: [
      {
        icon: Calendar,
        title: "Staff Scheduling",
        description: "Automate staff scheduling based on demand forecasting and labor cost optimization.",
        stats: "25% labor savings",
        highlight: "Demand-based scheduling",
        category: "Operations"
      },
      {
        icon: Star,
        title: "Quality Control",
        description: "Monitor food quality, track preparation times, and ensure consistency across all orders.",
        stats: "98% quality score",
        highlight: "Consistent quality",
        category: "Quality"
      },
      {
        icon: CreditCard,
        title: "Payment Integration",
        description: "Accept payments across all channels with integrated POS, online ordering, and mobile payments.",
        stats: "99.9% uptime",
        highlight: "Seamless payments",
        category: "Payments"
      }
    ],
    showcaseTypes: [
      {
        type: "Quick Service",
        emoji: "🍔",
        features: ["Fast ordering", "Kitchen display", "Drive-thru integration"],
        bgColor: "from-red-500/20 to-orange-500/20",
        preview: "Efficient quick service operations"
      },
      {
        type: "Food Delivery",
        emoji: "🚗",
        features: ["Online ordering", "Delivery tracking", "Driver management"],
        bgColor: "from-blue-500/20 to-indigo-500/20",
        preview: "Complete delivery platform"
      },
      {
        type: "Fine Dining",
        emoji: "🍷",
        features: ["Reservation system", "Table management", "Wine pairing"],
        bgColor: "from-purple-500/20 to-pink-500/20",
        preview: "Elegant dining experience"
      }
    ],
    testimonials: [
      {
        name: "Marco Antonio",
        business: "Tony's Italian Kitchen",
        location: "Chicago, IL",
        quote: "Food costs dropped 35% and customer satisfaction is at an all-time high. SISO optimized everything.",
        metric: "-35% food costs",
        avatar: "👨‍🍳"
      },
      {
        name: "Sarah Kim",
        business: "Fresh Bowl Express",
        location: "Los Angeles, CA",
        quote: "We handle 3x more orders with the same kitchen staff. The AI ordering system is phenomenal.",
        metric: "+300% capacity",
        avatar: "👩‍🍳"
      },
      {
        name: "Ahmed Hassan",
        business: "Mediterranean Delights",
        location: "New York, NY",
        quote: "Delivery times improved 40% and we have zero order mix-ups. Customers love the tracking.",
        metric: "+40% faster delivery",
        avatar: "👨‍💼"
      }
    ],
    metrics: [
      {
        title: "Order Accuracy",
        value: "99.2%",
        change: "+15% improvement",
        color: "text-red-400",
        bgColor: "from-red-500/20 to-orange-500/20"
      },
      {
        title: "Food Cost Savings",
        value: "35%",
        change: "Average reduction",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Customer Satisfaction",
        value: "96%",
        change: "+25% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-indigo-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Order Processing",
        before: "8 minutes",
        after: "3 minutes",
        improvement: "-63%"
      },
      {
        metric: "Inventory Waste",
        before: "20%",
        after: "5%",
        improvement: "-75%"
      },
      {
        metric: "Customer Wait Time",
        before: "25 minutes",
        after: "12 minutes",
        improvement: "-52%"
      }
    ],
    colorScheme: {
      primary: "red-600",
      secondary: "orange-500",
      gradient: "from-red-600 to-orange-500"
    }
  },

  technology: {
    industry: "Technology Services",
    route: "technology",
    heroTitles: ["Scale Tech Operations", "Automate Development Workflow", "Optimize Client Delivery"],
    heroDescription: "Transform your technology services with AI-powered project management, automated development workflows, and intelligent client communication. Join 120+ tech companies already growing with SISO.",
    benefits: [
      { icon: Laptop, text: "Dev Automation" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Users, text: "Client Portal" },
      { icon: Monitor, text: "Project Tracking" }
    ],
    topFeatures: [
      {
        icon: Laptop,
        title: "Development Workflow Automation",
        description: "Automate code deployment, testing, and project management with integrated CI/CD and project tracking.",
        stats: "70% faster delivery",
        highlight: "Automated pipelines",
        category: "Development"
      },
      {
        icon: Users,
        title: "Client Project Management",
        description: "Keep clients informed with real-time project updates, milestone tracking, and transparent communication.",
        stats: "95% client satisfaction",
        highlight: "Real-time visibility",
        category: "Client Management"
      },
      {
        icon: BarChart3,
        title: "Resource Optimization",
        description: "Optimize team allocation, track utilization, and predict project timelines with intelligent analytics.",
        stats: "85% utilization rate",
        highlight: "Smart allocation",
        category: "Resources"
      },
      {
        icon: Shield,
        title: "Security & Compliance",
        description: "Ensure security compliance with automated scans, vulnerability tracking, and compliance reporting.",
        stats: "100% security score",
        highlight: "Automated security",
        category: "Security"
      },
      {
        icon: TrendingUp,
        title: "Performance Analytics",
        description: "Track development velocity, code quality, and team performance with comprehensive dashboards.",
        stats: "50% velocity increase",
        highlight: "Performance insights",
        category: "Analytics"
      }
    ],
    additionalFeatures: [
      {
        icon: MessageCircle,
        title: "Team Collaboration",
        description: "Enhance team collaboration with automated standups, code reviews, and knowledge sharing.",
        stats: "90% team efficiency",
        highlight: "Seamless collaboration",
        category: "Collaboration"
      },
      {
        icon: FileText,
        title: "Documentation Automation",
        description: "Generate and maintain documentation automatically from code comments and project specifications.",
        stats: "80% doc coverage",
        highlight: "Auto-generation",
        category: "Documentation"
      },
      {
        icon: Zap,
        title: "Bug Tracking & Resolution",
        description: "Track bugs, automate triaging, and predict resolution times with intelligent issue management.",
        stats: "60% faster resolution",
        highlight: "Smart triaging",
        category: "Quality"
      }
    ],
    showcaseTypes: [
      {
        type: "Software Development",
        emoji: "💻",
        features: ["Code management", "CI/CD pipelines", "Quality assurance"],
        bgColor: "from-blue-500/20 to-cyan-500/20",
        preview: "Complete development platform"
      },
      {
        type: "IT Consulting",
        emoji: "🏢",
        features: ["Project tracking", "Client reporting", "Resource planning"],
        bgColor: "from-green-500/20 to-emerald-500/20",
        preview: "Professional consulting management"
      },
      {
        type: "Digital Agencies",
        emoji: "🎨",
        features: ["Creative workflows", "Client collaboration", "Asset management"],
        bgColor: "from-purple-500/20 to-pink-500/20",
        preview: "Creative agency operations"
      }
    ],
    testimonials: [
      {
        name: "Alex Rodriguez",
        business: "CodeCraft Solutions",
        location: "Austin, TX",
        quote: "Development velocity increased 65% and client satisfaction is through the roof. The automation is incredible.",
        metric: "+65% velocity",
        avatar: "👨‍💻"
      },
      {
        name: "Emma Chen",
        business: "Digital Innovations Lab",
        location: "San Francisco, CA",
        quote: "We deliver projects 40% faster now. Clients love the real-time visibility into their projects.",
        metric: "+40% faster delivery",
        avatar: "👩‍💻"
      },
      {
        name: "Michael Johnson",
        business: "TechFlow Consulting",
        location: "Seattle, WA",
        quote: "Team productivity improved dramatically. The automated workflows save us 20 hours per week.",
        metric: "+20 hours/week saved",
        avatar: "👨‍💼"
      }
    ],
    metrics: [
      {
        title: "Development Velocity",
        value: "+175%",
        change: "+95% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Code Quality Score",
        value: "96%",
        change: "+40% improvement",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Client Satisfaction",
        value: "98%",
        change: "+30% improvement",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-pink-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Code Deployment",
        before: "2 hours",
        after: "15 minutes",
        improvement: "-88%"
      },
      {
        metric: "Bug Resolution",
        before: "3 days",
        after: "8 hours",
        improvement: "-89%"
      },
      {
        metric: "Project Visibility",
        before: "Weekly reports",
        after: "Real-time tracking",
        improvement: "+500%"
      }
    ],
    colorScheme: {
      primary: "blue-600",
      secondary: "cyan-500",
      gradient: "from-blue-600 to-cyan-500"
    }
  },

  manufacturing: {
    industry: "Manufacturing",
    route: "manufacturing",
    heroTitles: ["Optimize Production Lines", "Automate Quality Control", "Scale Manufacturing Operations"],
    heroDescription: "Transform your manufacturing operations with AI-powered production planning, automated quality assurance, and intelligent supply chain management. Join 85+ manufacturers already growing with SISO.",
    benefits: [
      { icon: Factory, text: "Production Automation" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Shield, text: "Quality Control" },
      { icon: BarChart3, text: "Performance Tracking" }
    ],
    topFeatures: [
      {
        icon: Factory,
        title: "Production Optimization",
        description: "Optimize production schedules, machine utilization, and workflow efficiency with AI-powered planning.",
        stats: "85% efficiency gain",
        highlight: "Smart scheduling",
        category: "Production"
      },
      {
        icon: Shield,
        title: "Quality Assurance",
        description: "Automate quality control with AI vision systems, defect detection, and compliance tracking.",
        stats: "99.5% quality rate",
        highlight: "AI-powered QC",
        category: "Quality"
      },
      {
        icon: Package,
        title: "Supply Chain Management",
        description: "Optimize inventory levels, supplier relationships, and delivery schedules with predictive analytics.",
        stats: "40% cost reduction",
        highlight: "Predictive planning",
        category: "Supply Chain"
      },
      {
        icon: BarChart3,
        title: "Performance Analytics",
        description: "Monitor OEE, track KPIs, and identify bottlenecks with comprehensive manufacturing intelligence.",
        stats: "95% OEE improvement",
        highlight: "Real-time insights",
        category: "Analytics"
      },
      {
        icon: Wrench,
        title: "Maintenance Optimization",
        description: "Predict maintenance needs, schedule repairs, and minimize downtime with intelligent asset management.",
        stats: "60% less downtime",
        highlight: "Predictive maintenance",
        category: "Maintenance"
      }
    ],
    additionalFeatures: [
      {
        icon: Users,
        title: "Workforce Management",
        description: "Optimize labor scheduling, track productivity, and ensure safety compliance across all operations.",
        stats: "75% labor efficiency",
        highlight: "Smart scheduling",
        category: "Workforce"
      },
      {
        icon: TrendingUp,
        title: "Demand Forecasting",
        description: "Predict demand patterns, optimize production capacity, and reduce waste with AI forecasting.",
        stats: "90% forecast accuracy",
        highlight: "AI predictions",
        category: "Planning"
      },
      {
        icon: Bell,
        title: "Alert Systems",
        description: "Get instant notifications for quality issues, machine failures, and production anomalies.",
        stats: "Real-time alerts",
        highlight: "Instant response",
        category: "Monitoring"
      }
    ],
    showcaseTypes: [
      {
        type: "Automotive Manufacturing",
        emoji: "🚗",
        features: ["Assembly line optimization", "Quality control", "Just-in-time production"],
        bgColor: "from-gray-500/20 to-slate-500/20",
        preview: "Advanced automotive production"
      },
      {
        type: "Electronics Manufacturing",
        emoji: "📱",
        features: ["Precision assembly", "Component tracking", "Testing automation"],
        bgColor: "from-blue-500/20 to-indigo-500/20",
        preview: "High-tech electronics production"
      },
      {
        type: "Food Manufacturing",
        emoji: "🏭",
        features: ["Safety compliance", "Batch tracking", "Quality assurance"],
        bgColor: "from-green-500/20 to-emerald-500/20",
        preview: "Food safety manufacturing"
      }
    ],
    testimonials: [
      {
        name: "Robert Martinez",
        business: "Precision Parts Manufacturing",
        location: "Detroit, MI",
        quote: "Production efficiency increased 80% and defect rates dropped to near zero. SISO transformed our operations.",
        metric: "+80% efficiency",
        avatar: "👨‍🔧"
      },
      {
        name: "Linda Chang",
        business: "Advanced Electronics Corp",
        location: "Portland, OR",
        quote: "Predictive maintenance saved us $2M in downtime costs. The AI insights are incredibly accurate.",
        metric: "$2M saved",
        avatar: "👩‍🔬"
      },
      {
        name: "Carlos Silva",
        business: "Industrial Solutions Inc",
        location: "Houston, TX",
        quote: "Supply chain optimization reduced costs 45%. Our delivery times improved dramatically.",
        metric: "-45% costs",
        avatar: "👨‍💼"
      }
    ],
    metrics: [
      {
        title: "Overall Equipment Effectiveness",
        value: "94%",
        change: "+35% improvement",
        color: "text-gray-400",
        bgColor: "from-gray-500/20 to-slate-500/20"
      },
      {
        title: "Quality Rate",
        value: "99.7%",
        change: "+12% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-indigo-500/20"
      },
      {
        title: "Production Cost",
        value: "-42%",
        change: "Cost reduction",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Setup Time",
        before: "4 hours",
        after: "30 minutes",
        improvement: "-88%"
      },
      {
        metric: "Defect Rate",
        before: "2.5%",
        after: "0.3%",
        improvement: "-88%"
      },
      {
        metric: "Machine Downtime",
        before: "15%",
        after: "3%",
        improvement: "-80%"
      }
    ],
    colorScheme: {
      primary: "gray-600",
      secondary: "slate-500",
      gradient: "from-gray-600 to-slate-500"
    }
  },

  nonprofit: {
    industry: "Non-Profit Organizations",
    route: "nonprofit",
    heroTitles: ["Maximize Mission Impact", "Streamline Donor Relations", "Scale Social Good"],
    heroDescription: "Transform your non-profit operations with AI-powered donor management, automated fundraising campaigns, and intelligent volunteer coordination. Join 150+ organizations already growing with SISO.",
    benefits: [
      { icon: Heart, text: "Mission Focus" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Users, text: "Donor Portal" },
      { icon: TreePine, text: "Impact Tracking" }
    ],
    topFeatures: [
      {
        icon: Heart,
        title: "Donor Relationship Management",
        description: "Build lasting relationships with automated donor communication, gift tracking, and personalized engagement.",
        stats: "85% donor retention",
        highlight: "Personalized engagement",
        category: "Fundraising"
      },
      {
        icon: Users,
        title: "Volunteer Management",
        description: "Coordinate volunteers with automated scheduling, skill matching, and engagement tracking.",
        stats: "90% volunteer satisfaction",
        highlight: "Smart matching",
        category: "Volunteers"
      },
      {
        icon: BarChart3,
        title: "Impact Measurement",
        description: "Track program outcomes, measure social impact, and generate compelling reports for stakeholders.",
        stats: "200% impact visibility",
        highlight: "Data-driven impact",
        category: "Impact"
      },
      {
        icon: DollarSign,
        title: "Grant Management",
        description: "Streamline grant applications, track funding, and ensure compliance with automated reporting.",
        stats: "75% grant success rate",
        highlight: "Compliance tracking",
        category: "Grants"
      },
      {
        icon: MessageCircle,
        title: "Community Engagement",
        description: "Engage supporters with multi-channel communication, event management, and social media integration.",
        stats: "60% engagement increase",
        highlight: "Multi-channel reach",
        category: "Engagement"
      }
    ],
    additionalFeatures: [
      {
        icon: Calendar,
        title: "Event Management",
        description: "Plan and execute successful fundraising events with automated registration, communication, and follow-up.",
        stats: "95% event success",
        highlight: "Automated workflows",
        category: "Events"
      },
      {
        icon: FileText,
        title: "Compliance Reporting",
        description: "Generate required reports automatically and maintain compliance with regulatory requirements.",
        stats: "100% compliance",
        highlight: "Automated reporting",
        category: "Compliance"
      },
      {
        icon: Target,
        title: "Campaign Management",
        description: "Run effective fundraising campaigns with A/B testing, segmentation, and performance tracking.",
        stats: "45% campaign improvement",
        highlight: "Data-driven campaigns",
        category: "Campaigns"
      }
    ],
    showcaseTypes: [
      {
        type: "Education Non-Profits",
        emoji: "📚",
        features: ["Student tracking", "Program management", "Scholarship administration"],
        bgColor: "from-blue-500/20 to-indigo-500/20",
        preview: "Educational mission management"
      },
      {
        type: "Healthcare Non-Profits",
        emoji: "🏥",
        features: ["Patient outreach", "Health programs", "Medical assistance"],
        bgColor: "from-green-500/20 to-emerald-500/20",
        preview: "Healthcare mission operations"
      },
      {
        type: "Environmental Organizations",
        emoji: "🌱",
        features: ["Conservation tracking", "Volunteer coordination", "Impact measurement"],
        bgColor: "from-emerald-500/20 to-teal-500/20",
        preview: "Environmental impact tracking"
      }
    ],
    testimonials: [
      {
        name: "Diana Foster",
        business: "Children's Education Fund",
        location: "Denver, CO",
        quote: "Donor engagement improved 70% and we raised 50% more funds. SISO helps us focus on our mission.",
        metric: "+50% fundraising",
        avatar: "👩‍🏫"
      },
      {
        name: "Marcus Williams",
        business: "Community Health Initiative",
        location: "Atlanta, GA",
        quote: "Volunteer coordination is now effortless. We serve 3x more families with the same resources.",
        metric: "+300% reach",
        avatar: "👨‍⚕️"
      },
      {
        name: "Rebecca Johnson",
        business: "Green Earth Alliance",
        location: "Portland, OR",
        quote: "Impact tracking helps us show real results to donors. Grant applications are 80% more successful.",
        metric: "+80% grant success",
        avatar: "👩‍🌾"
      }
    ],
    metrics: [
      {
        title: "Donor Retention",
        value: "89%",
        change: "+45% improvement",
        color: "text-red-400",
        bgColor: "from-red-500/20 to-pink-500/20"
      },
      {
        title: "Fundraising Efficiency",
        value: "+165%",
        change: "+85% improvement",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Program Impact",
        value: "+240%",
        change: "Measurable outcomes",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-indigo-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Donor Communication",
        before: "Quarterly newsletters",
        after: "Personalized updates",
        improvement: "+400%"
      },
      {
        metric: "Grant Applications",
        before: "2 weeks each",
        after: "3 days each",
        improvement: "-79%"
      },
      {
        metric: "Volunteer Coordination",
        before: "Manual scheduling",
        after: "Automated matching",
        improvement: "+500%"
      }
    ],
    colorScheme: {
      primary: "red-600",
      secondary: "pink-500",
      gradient: "from-red-600 to-pink-500"
    }
  },

  events: {
    industry: "Event Planning",
    route: "events",
    heroTitles: ["Streamline Event Operations", "Automate Guest Management", "Scale Event Business"],
    heroDescription: "Transform your event planning business with AI-powered venue management, automated guest coordination, and intelligent vendor relationships. Join 140+ event professionals already growing with SISO.",
    benefits: [
      { icon: Calendar, text: "Event Automation" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Users, text: "Guest Portal" },
      { icon: Sparkles, text: "Experience Design" }
    ],
    topFeatures: [
      {
        icon: Calendar,
        title: "Event Lifecycle Management",
        description: "Manage every aspect of event planning from initial consultation to post-event follow-up with automated workflows.",
        stats: "90% planning efficiency",
        highlight: "End-to-end automation",
        category: "Planning"
      },
      {
        icon: Users,
        title: "Guest Experience Platform",
        description: "Create exceptional guest experiences with personalized invitations, seamless check-ins, and real-time updates.",
        stats: "95% guest satisfaction",
        highlight: "Personalized experiences",
        category: "Guest Experience"
      },
      {
        icon: MapPin,
        title: "Venue & Vendor Coordination",
        description: "Coordinate with venues and vendors through integrated communication, contract management, and timeline tracking.",
        stats: "80% vendor efficiency",
        highlight: "Unified coordination",
        category: "Coordination"
      },
      {
        icon: BarChart3,
        title: "Event Analytics",
        description: "Track attendance, engagement, ROI, and guest feedback with comprehensive event performance analytics.",
        stats: "60% ROI improvement",
        highlight: "Data-driven insights",
        category: "Analytics"
      },
      {
        icon: DollarSign,
        title: "Budget Management",
        description: "Track expenses, manage payments, and optimize costs with intelligent budget planning and monitoring.",
        stats: "40% cost optimization",
        highlight: "Smart budgeting",
        category: "Finance"
      }
    ],
    additionalFeatures: [
      {
        icon: Smartphone,
        title: "Mobile Event App",
        description: "Provide guests with a branded mobile app for schedules, networking, and real-time event updates.",
        stats: "85% app adoption",
        highlight: "Branded experience",
        category: "Technology"
      },
      {
        icon: MessageCircle,
        title: "Communication Hub",
        description: "Centralize all event communication with automated updates, reminders, and multi-channel messaging.",
        stats: "98% message delivery",
        highlight: "Multi-channel reach",
        category: "Communication"
      },
      {
        icon: Star,
        title: "Feedback & Reviews",
        description: "Collect and analyze feedback automatically to improve future events and build reputation.",
        stats: "4.9/5 avg rating",
        highlight: "Continuous improvement",
        category: "Quality"
      }
    ],
    showcaseTypes: [
      {
        type: "Corporate Events",
        emoji: "🏢",
        features: ["Conference management", "Team building", "Product launches"],
        bgColor: "from-blue-500/20 to-indigo-500/20",
        preview: "Professional corporate events"
      },
      {
        type: "Weddings",
        emoji: "💒",
        features: ["Wedding planning", "Guest coordination", "Vendor management"],
        bgColor: "from-pink-500/20 to-rose-500/20",
        preview: "Dream wedding coordination"
      },
      {
        type: "Social Events",
        emoji: "🎉",
        features: ["Party planning", "Entertainment booking", "Catering coordination"],
        bgColor: "from-purple-500/20 to-violet-500/20",
        preview: "Memorable social celebrations"
      }
    ],
    testimonials: [
      {
        name: "Isabella Martinez",
        business: "Elegant Events Co",
        location: "Miami, FL",
        quote: "Client satisfaction increased 85% and we handle 4x more events. The automation is life-changing.",
        metric: "+400% capacity",
        avatar: "👰‍♀️"
      },
      {
        name: "Jonathan Davis",
        business: "Corporate Gatherings",
        location: "Chicago, IL",
        quote: "Event ROI improved 65% through better planning and cost optimization. Clients are amazed.",
        metric: "+65% ROI",
        avatar: "👨‍💼"
      },
      {
        name: "Sophia Anderson",
        business: "Dream Day Weddings",
        location: "Nashville, TN",
        quote: "Guest experiences are flawless now. We've become the most sought-after wedding planners in the city.",
        metric: "100% referral rate",
        avatar: "👩‍💼"
      }
    ],
    metrics: [
      {
        title: "Event Success Rate",
        value: "98%",
        change: "+25% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-indigo-500/20"
      },
      {
        title: "Guest Satisfaction",
        value: "96%",
        change: "+35% improvement",
        color: "text-pink-400",
        bgColor: "from-pink-500/20 to-rose-500/20"
      },
      {
        title: "Planning Efficiency",
        value: "+185%",
        change: "+95% improvement",
        color: "text-purple-400",
        bgColor: "from-purple-500/20 to-violet-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Event Planning Time",
        before: "12 weeks",
        after: "6 weeks",
        improvement: "-50%"
      },
      {
        metric: "Guest Check-in",
        before: "45 minutes",
        after: "5 minutes",
        improvement: "-89%"
      },
      {
        metric: "Vendor Coordination",
        before: "Daily calls",
        after: "Automated updates",
        improvement: "+300%"
      }
    ],
    colorScheme: {
      primary: "purple-600",
      secondary: "violet-500",
      gradient: "from-purple-600 to-violet-500"
    }
  },

  logistics: {
    industry: "Logistics & Transportation",
    route: "logistics",
    heroTitles: ["Optimize Supply Chain", "Automate Fleet Management", "Scale Logistics Operations"],
    heroDescription: "Transform your logistics operations with AI-powered route optimization, automated inventory tracking, and intelligent fleet management. Join 95+ logistics companies already growing with SISO.",
    benefits: [
      { icon: Truck, text: "Fleet Management" },
      { icon: Clock, text: "48hr Setup" },
      { icon: Package, text: "Inventory Tracking" },
      { icon: MapPin, text: "Route Optimization" }
    ],
    topFeatures: [
      {
        icon: MapPin,
        title: "Route Optimization",
        description: "Optimize delivery routes in real-time with AI-powered planning that considers traffic, weather, and priorities.",
        stats: "35% fuel savings",
        highlight: "AI-powered routing",
        category: "Optimization"
      },
      {
        icon: Truck,
        title: "Fleet Management",
        description: "Monitor vehicle health, track driver performance, and schedule maintenance with comprehensive fleet intelligence.",
        stats: "90% fleet utilization",
        highlight: "Predictive maintenance",
        category: "Fleet"
      },
      {
        icon: Package,
        title: "Inventory Tracking",
        description: "Track inventory across warehouses with real-time visibility, automated reordering, and demand forecasting.",
        stats: "99.8% accuracy",
        highlight: "Real-time visibility",
        category: "Inventory"
      },
      {
        icon: BarChart3,
        title: "Performance Analytics",
        description: "Monitor KPIs, track delivery performance, and identify optimization opportunities with advanced analytics.",
        stats: "85% efficiency gain",
        highlight: "Performance insights",
        category: "Analytics"
      },
      {
        icon: Users,
        title: "Customer Portal",
        description: "Provide customers with real-time tracking, delivery updates, and self-service options for better experience.",
        stats: "92% customer satisfaction",
        highlight: "Real-time tracking",
        category: "Customer Service"
      }
    ],
    additionalFeatures: [
      {
        icon: Shield,
        title: "Compliance Management",
        description: "Ensure regulatory compliance with automated reporting, driver hour tracking, and safety monitoring.",
        stats: "100% compliance",
        highlight: "Automated reporting",
        category: "Compliance"
      },
      {
        icon: DollarSign,
        title: "Cost Optimization",
        description: "Reduce operational costs through fuel optimization, efficient routing, and predictive maintenance.",
        stats: "40% cost reduction",
        highlight: "Smart optimization",
        category: "Cost Management"
      },
      {
        icon: Bell,
        title: "Alert Systems",
        description: "Get instant notifications for delays, vehicle issues, and delivery exceptions with smart alerting.",
        stats: "Real-time alerts",
        highlight: "Proactive notifications",
        category: "Monitoring"
      }
    ],
    showcaseTypes: [
      {
        type: "Delivery Services",
        emoji: "📦",
        features: ["Last-mile delivery", "Package tracking", "Customer notifications"],
        bgColor: "from-blue-500/20 to-cyan-500/20",
        preview: "Efficient delivery operations"
      },
      {
        type: "Freight & Shipping",
        emoji: "🚛",
        features: ["Load planning", "Route optimization", "Fleet tracking"],
        bgColor: "from-green-500/20 to-emerald-500/20",
        preview: "Large-scale freight management"
      },
      {
        type: "Warehousing",
        emoji: "🏭",
        features: ["Inventory management", "Order fulfillment", "Space optimization"],
        bgColor: "from-orange-500/20 to-amber-500/20",
        preview: "Smart warehouse operations"
      }
    ],
    testimonials: [
      {
        name: "David Thompson",
        business: "Swift Delivery Solutions",
        location: "Dallas, TX",
        quote: "Delivery efficiency improved 60% and fuel costs dropped 40%. Our customers love the real-time tracking.",
        metric: "+60% efficiency",
        avatar: "👨‍🚛"
      },
      {
        name: "Maria Santos",
        business: "Global Freight Corp",
        location: "Los Angeles, CA",
        quote: "Route optimization saved us $500K annually. Fleet utilization is at an all-time high.",
        metric: "$500K saved",
        avatar: "👩‍💼"
      },
      {
        name: "James Liu",
        business: "Metro Logistics",
        location: "New York, NY",
        quote: "Customer complaints dropped 80% thanks to proactive notifications and accurate tracking.",
        metric: "-80% complaints",
        avatar: "👨‍💼"
      }
    ],
    metrics: [
      {
        title: "Delivery Efficiency",
        value: "+165%",
        change: "+85% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      },
      {
        title: "Fuel Cost Savings",
        value: "42%",
        change: "Average reduction",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Customer Satisfaction",
        value: "94%",
        change: "+30% improvement",
        color: "text-orange-400",
        bgColor: "from-orange-500/20 to-amber-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Route Planning",
        before: "2 hours daily",
        after: "5 minutes",
        improvement: "-96%"
      },
      {
        metric: "Delivery Accuracy",
        before: "85%",
        after: "98%",
        improvement: "+15%"
      },
      {
        metric: "Fleet Downtime",
        before: "20%",
        after: "5%",
        improvement: "-75%"
      }
    ],
    colorScheme: {
      primary: "blue-600",
      secondary: "cyan-500",
      gradient: "from-blue-600 to-cyan-500"
    }
  },

  energy: {
    industry: "Energy & Utilities",
    route: "energy",
    heroTitles: ["Optimize Energy Operations", "Automate Grid Management", "Scale Utility Services"],
    heroDescription: "Transform your energy operations with AI-powered grid optimization, automated meter reading, and intelligent demand forecasting. Join 75+ energy companies already growing with SISO.",
    benefits: [
      { icon: Power, text: "Grid Optimization" },
      { icon: Clock, text: "48hr Setup" },
      { icon: BarChart3, text: "Demand Forecasting" },
      { icon: Shield, text: "Safety Monitoring" }
    ],
    topFeatures: [
      {
        icon: Power,
        title: "Smart Grid Management",
        description: "Optimize energy distribution with AI-powered grid management, load balancing, and outage prevention.",
        stats: "95% grid efficiency",
        highlight: "Intelligent distribution",
        category: "Grid Management"
      },
      {
        icon: BarChart3,
        title: "Demand Forecasting",
        description: "Predict energy demand with machine learning models that consider weather, seasonality, and consumption patterns.",
        stats: "92% forecast accuracy",
        highlight: "AI-powered predictions",
        category: "Forecasting"
      },
      {
        icon: Users,
        title: "Customer Management",
        description: "Manage customer accounts, billing, and service requests with automated customer service and self-help portals.",
        stats: "88% customer satisfaction",
        highlight: "Automated service",
        category: "Customer Service"
      },
      {
        icon: Shield,
        title: "Safety & Compliance",
        description: "Monitor safety conditions, ensure regulatory compliance, and predict maintenance needs with IoT sensors.",
        stats: "100% safety compliance",
        highlight: "Predictive monitoring",
        category: "Safety"
      },
      {
        icon: TreePine,
        title: "Sustainability Tracking",
        description: "Track renewable energy usage, carbon emissions, and sustainability metrics with environmental reporting.",
        stats: "45% carbon reduction",
        highlight: "Green initiatives",
        category: "Sustainability"
      }
    ],
    additionalFeatures: [
      {
        icon: Wrench,
        title: "Asset Management",
        description: "Monitor equipment health, schedule maintenance, and extend asset life with predictive analytics.",
        stats: "70% maintenance efficiency",
        highlight: "Predictive maintenance",
        category: "Asset Management"
      },
      {
        icon: DollarSign,
        title: "Cost Optimization",
        description: "Optimize operational costs through efficient resource allocation and energy trading strategies.",
        stats: "35% cost reduction",
        highlight: "Resource optimization",
        category: "Cost Management"
      },
      {
        icon: Bell,
        title: "Outage Management",
        description: "Detect and respond to outages faster with automated detection, crew dispatch, and customer notifications.",
        stats: "60% faster restoration",
        highlight: "Rapid response",
        category: "Outage Management"
      }
    ],
    showcaseTypes: [
      {
        type: "Electric Utilities",
        emoji: "⚡",
        features: ["Grid management", "Meter reading", "Billing automation"],
        bgColor: "from-yellow-500/20 to-orange-500/20",
        preview: "Modern electric utility operations"
      },
      {
        type: "Renewable Energy",
        emoji: "🌱",
        features: ["Solar/wind monitoring", "Energy storage", "Grid integration"],
        bgColor: "from-green-500/20 to-emerald-500/20",
        preview: "Sustainable energy management"
      },
      {
        type: "Smart Cities",
        emoji: "🏙️",
        features: ["Street lighting", "Traffic optimization", "Environmental monitoring"],
        bgColor: "from-blue-500/20 to-cyan-500/20",
        preview: "Intelligent city infrastructure"
      }
    ],
    testimonials: [
      {
        name: "Patricia Williams",
        business: "Metro Power Company",
        location: "Phoenix, AZ",
        quote: "Grid efficiency improved 40% and outage duration decreased 65%. Customer satisfaction is at record highs.",
        metric: "+40% efficiency",
        avatar: "👩‍🔧"
      },
      {
        name: "Robert Lee",
        business: "Green Energy Solutions",
        location: "San Diego, CA",
        quote: "Renewable integration increased 80% while maintaining grid stability. The AI forecasting is incredible.",
        metric: "+80% renewables",
        avatar: "👨‍🔬"
      },
      {
        name: "Jennifer Brown",
        business: "City Utilities Department",
        location: "Austin, TX",
        quote: "Operational costs reduced 45% through smart optimization. We're leading in sustainability metrics.",
        metric: "-45% costs",
        avatar: "👩‍💼"
      }
    ],
    metrics: [
      {
        title: "Grid Efficiency",
        value: "97%",
        change: "+25% improvement",
        color: "text-yellow-400",
        bgColor: "from-yellow-500/20 to-orange-500/20"
      },
      {
        title: "Renewable Integration",
        value: "+180%",
        change: "+120% increase",
        color: "text-green-400",
        bgColor: "from-green-500/20 to-emerald-500/20"
      },
      {
        title: "Customer Satisfaction",
        value: "91%",
        change: "+28% improvement",
        color: "text-blue-400",
        bgColor: "from-blue-500/20 to-cyan-500/20"
      }
    ],
    beforeAfter: [
      {
        metric: "Outage Duration",
        before: "4.5 hours",
        after: "1.5 hours",
        improvement: "-67%"
      },
      {
        metric: "Meter Reading",
        before: "Monthly manual",
        after: "Real-time automated",
        improvement: "+3000%"
      },
      {
        metric: "Energy Waste",
        before: "15%",
        after: "3%",
        improvement: "-80%"
      }
    ],
    colorScheme: {
      primary: "yellow-600",
      secondary: "orange-500",
      gradient: "from-yellow-600 to-orange-500"
    }
  },

  ecommerce: {
    industry: "E-commerce & Retail",
    route: "ecommerce",
    heroTitles: ["Shopify Who? Build Better E-commerce in 20 Hours", "Sell More with Custom Design", "Launch Your Store Fast"],
    heroDescription: "Custom e-commerce apps that convert better than Shopify templates. No monthly fees, unlimited customization, lightning-fast performance. Join 250+ stores growing with SISO.",
    benefits: [
      { icon: ShoppingCart, text: "Custom E-commerce" },
      { icon: Clock, text: "20hr Launch" },
      { icon: Smartphone, text: "Mobile Optimized" },
      { icon: TrendingUp, text: "High Conversion" }
    ],
    topFeatures: [
      {
        icon: ShoppingCart,
        title: "Smart Shopping Cart",
        description: "AI-powered cart with upselling, abandoned cart recovery, and personalized product recommendations",
        stats: "45% Higher Conversion",
        highlight: "Revenue Booster",
        category: "Sales"
      },
      {
        icon: Package,
        title: "Inventory Management Pro",
        description: "Real-time stock tracking, low inventory alerts, and automatic supplier integration",
        stats: "Zero Stockouts",
        highlight: "Smart Inventory",
        category: "Operations"
      },
      {
        icon: CreditCard,
        title: "Payment Gateway Suite",
        description: "Multiple payment options, one-click checkout, and fraud protection with analytics",
        stats: "99.9% Success Rate",
        highlight: "Secure Payments",
        category: "Payments"
      },
      {
        icon: Users,
        title: "Customer Analytics",
        description: "Advanced customer behavior tracking, lifetime value analysis, and personalization engine",
        stats: "3x Customer Retention",
        highlight: "Know Your Customers",
        category: "Analytics"
      },
      {
        icon: Zap,
        title: "Lightning Performance",
        description: "Sub-2 second load times, image optimization, and CDN delivery for global speed",
        stats: "2x Faster Loading",
        highlight: "Speed Advantage",
        category: "Performance"
      }
    ],
    additionalFeatures: [
      { icon: Search, title: "Smart Search", description: "AI-powered product search with filters", stats: "Instant Results", highlight: "Find Anything", category: "Search" },
      { icon: Heart, title: "Wishlist & Favorites", description: "Customer wishlist with sharing capabilities", stats: "Engagement Boost", highlight: "Save for Later", category: "Engagement" },
      { icon: Mail, title: "Email Marketing", description: "Automated email campaigns and newsletters", stats: "35% Open Rate", highlight: "Stay Connected", category: "Marketing" }
    ],
    showcaseTypes: [
      { type: "Fashion Store", emoji: "👗", features: ["Size charts", "Color variants", "Style recommendations"], bgColor: "from-pink-500 to-purple-600", preview: "🛍️ Trendy fashion e-commerce with style" },
      { type: "Electronics Shop", emoji: "📱", features: ["Tech specs", "Comparison tools", "Warranty tracking"], bgColor: "from-blue-500 to-cyan-600", preview: "⚡ High-tech electronics marketplace" },
      { type: "Home & Garden", emoji: "🏡", features: ["Room visualizer", "Bulk ordering", "Seasonal catalogs"], bgColor: "from-green-500 to-teal-600", preview: "🌿 Beautiful home improvement store" }
    ],
    testimonials: [
      { name: "Sarah Chen", business: "StyleCraft Boutique", location: "Los Angeles, CA", quote: "Revenue doubled in 3 months. The custom design sets us apart from cookie-cutter stores.", metric: "+180% Revenue", avatar: "SC" },
      { name: "Mike Rodriguez", business: "TechHub Electronics", location: "Austin, TX", quote: "Shopify was limiting our growth. Now we have unlimited customization and zero monthly fees.", metric: "Saved $5,400/year", avatar: "MR" },
      { name: "Emma Thompson", business: "Green Living Co", location: "Portland, OR", quote: "Customer conversion rate tripled with our new store. Mobile experience is incredible.", metric: "+340% Conversions", avatar: "ET" }
    ],
    metrics: [
      { title: "Conversion Rate", value: "8.4%", change: "+180% improvement", color: "text-green-400", bgColor: "from-green-500/20 to-emerald-500/20" },
      { title: "Page Load Speed", value: "1.2s", change: "3x faster", color: "text-blue-400", bgColor: "from-blue-500/20 to-cyan-500/20" },
      { title: "Cart Abandonment", value: "32%", change: "-45% reduction", color: "text-purple-400", bgColor: "from-purple-500/20 to-pink-500/20" }
    ],
    beforeAfter: [
      { metric: "Monthly Sales", before: "$12,000", after: "$34,000", improvement: "+183%" },
      { metric: "Conversion Rate", before: "2.1%", after: "8.4%", improvement: "+300%" },
      { metric: "Page Speed", before: "4.2s", after: "1.2s", improvement: "+250%" }
    ],
    colorScheme: {
      primary: "purple-600",
      secondary: "pink-500",
      gradient: "from-purple-600 to-pink-500"
    }
  },

  professional: {
    industry: "Professional Services",
    route: "professional",
    heroTitles: ["Client Portals That Impress", "Automate Your Service Business", "Professional Apps in 20 Hours"],
    heroDescription: "Transform your professional service with AI-powered client portals, appointment booking, and automated workflows. Join 180+ professionals growing with SISO.",
    benefits: [
      { icon: Briefcase, text: "Client Portals" },
      { icon: Calendar, text: "Smart Booking" },
      { icon: Clock, text: "Workflow Automation" },
      { icon: BarChart3, text: "Business Analytics" }
    ],
    topFeatures: [
      {
        icon: Briefcase,
        title: "Professional Client Portal",
        description: "Branded client dashboard with project tracking, document sharing, and secure communication",
        stats: "95% Client Satisfaction",
        highlight: "Premium Experience",
        category: "Client Management"
      },
      {
        icon: Calendar,
        title: "Smart Appointment System",
        description: "AI-powered scheduling with calendar sync, automated reminders, and buffer time management",
        stats: "Zero Double Bookings",
        highlight: "Perfect Scheduling",
        category: "Booking"
      },
      {
        icon: FileText,
        title: "Document Automation",
        description: "Auto-generate contracts, invoices, and reports with electronic signature integration",
        stats: "80% Time Savings",
        highlight: "Paperless Office",
        category: "Automation"
      },
      {
        icon: CreditCard,
        title: "Payment & Invoicing",
        description: "Automated billing, payment tracking, and client payment portal with multiple payment methods",
        stats: "Faster Payments",
        highlight: "Cash Flow Boost",
        category: "Finance"
      },
      {
        icon: BarChart3,
        title: "Business Intelligence",
        description: "Client acquisition cost, lifetime value, and service profitability analytics dashboard",
        stats: "Data-Driven Growth",
        highlight: "Smart Insights",
        category: "Analytics"
      }
    ],
    additionalFeatures: [
      { icon: MessageCircle, title: "Client Communication", description: "Secure messaging with project updates", stats: "Instant Connection", highlight: "Stay in Touch", category: "Communication" },
      { icon: Shield, title: "Compliance Tools", description: "Industry compliance tracking and reporting", stats: "100% Compliant", highlight: "Risk-Free", category: "Compliance" },
      { icon: Target, title: "Lead Management", description: "Lead capture and conversion tracking", stats: "Higher Conversion", highlight: "Grow Business", category: "Sales" }
    ],
    showcaseTypes: [
      { type: "Law Firm", emoji: "⚖️", features: ["Case management", "Time tracking", "Legal documents"], bgColor: "from-blue-600 to-indigo-700", preview: "🏛️ Professional legal practice portal" },
      { type: "Consulting", emoji: "📊", features: ["Project tracking", "Client reports", "Billing automation"], bgColor: "from-green-600 to-teal-700", preview: "💼 Strategic consulting platform" },
      { type: "Accounting", emoji: "💰", features: ["Tax preparation", "Financial reports", "Client vault"], bgColor: "from-purple-600 to-violet-700", preview: "📈 Comprehensive accounting solution" }
    ],
    testimonials: [
      { name: "David Wilson", business: "Wilson & Associates Law", location: "Chicago, IL", quote: "Client satisfaction scores increased 40%. The portal makes us look like a Fortune 500 firm.", metric: "+40% Satisfaction", avatar: "DW" },
      { name: "Lisa Martinez", business: "Strategic Growth Consulting", location: "Denver, CO", quote: "Automated so many manual tasks. Now I focus on clients instead of paperwork.", metric: "20 hrs/week saved", avatar: "LM" },
      { name: "Robert Kim", business: "Kim CPA Services", location: "Seattle, WA", quote: "Clients love the secure document portal. Professional image boosted our referrals significantly.", metric: "+65% Referrals", avatar: "RK" }
    ],
    metrics: [
      { title: "Client Satisfaction", value: "96%", change: "+35% improvement", color: "text-green-400", bgColor: "from-green-500/20 to-emerald-500/20" },
      { title: "Time Savings", value: "15hrs", change: "per week average", color: "text-blue-400", bgColor: "from-blue-500/20 to-cyan-500/20" },
      { title: "Revenue Growth", value: "+42%", change: "within 6 months", color: "text-purple-400", bgColor: "from-purple-500/20 to-pink-500/20" }
    ],
    beforeAfter: [
      { metric: "Client Onboarding", before: "5 days", after: "30 minutes", improvement: "+1500%" },
      { metric: "Document Processing", before: "Manual filing", after: "Auto-organized", improvement: "+800%" },
      { metric: "Payment Collection", before: "45 days average", after: "12 days average", improvement: "+275%" }
    ],
    colorScheme: {
      primary: "blue-600",
      secondary: "indigo-500",
      gradient: "from-blue-600 to-indigo-500"
    }
  },

  agency: {
    industry: "Creative Agencies",
    route: "agency",
    heroTitles: ["Portfolio That Wins Clients", "Showcase Your Creative Work", "Agency Platform in 20 Hours"],
    heroDescription: "Transform your creative agency with AI-powered portfolio showcase, client management, and project tracking. Join 120+ agencies growing with SISO.",
    benefits: [
      { icon: Palette, text: "Portfolio Showcase" },
      { icon: Eye, text: "Visual Storytelling" },
      { icon: Users, text: "Client Management" },
      { icon: TrendingUp, text: "Project Analytics" }
    ],
    topFeatures: [
      {
        icon: Palette,
        title: "Dynamic Portfolio Showcase",
        description: "Stunning visual portfolio with case studies, before/after comparisons, and interactive galleries",
        stats: "3x More Inquiries",
        highlight: "Visual Impact",
        category: "Portfolio"
      },
      {
        icon: Eye,
        title: "Visual Project Tracking",
        description: "Client-facing project dashboards with progress visualization and milestone celebrations",
        stats: "95% Client Approval",
        highlight: "Transparency",
        category: "Projects"
      },
      {
        icon: Users,
        title: "Client Collaboration Hub",
        description: "Real-time feedback tools, approval workflows, and collaborative design review system",
        stats: "50% Faster Approval",
        highlight: "Smooth Process",
        category: "Collaboration"
      },
      {
        icon: FileText,
        title: "Proposal Generator",
        description: "Beautiful, customizable proposals with interactive pricing and instant client signatures",
        stats: "60% Win Rate",
        highlight: "Close More Deals",
        category: "Sales"
      },
      {
        icon: BarChart3,
        title: "Creative Analytics",
        description: "Track project profitability, team productivity, and client satisfaction metrics",
        stats: "Data-Driven Creativity",
        highlight: "Smart Decisions",
        category: "Analytics"
      }
    ],
    additionalFeatures: [
      { icon: Video, title: "Video Showcases", description: "Embedded video case studies and reels", stats: "Engaging Content", highlight: "Tell Stories", category: "Media" },
      { icon: Calendar, title: "Creative Planning", description: "Campaign calendars and creative briefs", stats: "Organized Creativity", highlight: "Plan Better", category: "Planning" },
      { icon: Target, title: "Lead Capture", description: "Portfolio-integrated contact forms", stats: "Quality Leads", highlight: "Grow Agency", category: "Growth" }
    ],
    showcaseTypes: [
      { type: "Design Agency", emoji: "🎨", features: ["Brand portfolios", "Design systems", "Case studies"], bgColor: "from-pink-500 to-rose-600", preview: "✨ Creative design showcase platform" },
      { type: "Marketing Agency", emoji: "📢", features: ["Campaign results", "ROI tracking", "Client testimonials"], bgColor: "from-orange-500 to-red-600", preview: "🚀 Results-driven marketing hub" },
      { type: "Video Production", emoji: "🎬", features: ["Video galleries", "Client reviews", "Production timeline"], bgColor: "from-purple-500 to-indigo-600", preview: "🎥 Professional video production showcase" }
    ],
    testimonials: [
      { name: "Alex Rivera", business: "Creative Minds Studio", location: "New York, NY", quote: "Won 60% more proposals with professional presentations. ROI is incredible.", metric: "+60% Proposals Won", avatar: "AR" },
      { name: "Taylor Brooks", business: "Brand Evolution Agency", location: "San Francisco, CA", quote: "Clients love seeing real-time project progress. Trust and satisfaction through the roof.", metric: "+85% Client Retention", avatar: "TB" },
      { name: "Jordan Lee", business: "Visual Impact Creative", location: "Miami, FL", quote: "Portfolio generates leads while we sleep. Best investment we've made for the agency.", metric: "+120% Inquiries", avatar: "JL" }
    ],
    metrics: [
      { title: "Portfolio Views", value: "2,400", change: "+320% increase", color: "text-green-400", bgColor: "from-green-500/20 to-emerald-500/20" },
      { title: "Proposal Win Rate", value: "68%", change: "+45% improvement", color: "text-blue-400", bgColor: "from-blue-500/20 to-cyan-500/20" },
      { title: "Client Satisfaction", value: "94%", change: "+38% improvement", color: "text-purple-400", bgColor: "from-purple-500/20 to-pink-500/20" }
    ],
    beforeAfter: [
      { metric: "Lead Quality", before: "Mixed quality", after: "Premium leads only", improvement: "+200%" },
      { metric: "Project Approval", before: "Multiple revisions", after: "First-time approval", improvement: "+150%" },
      { metric: "Client Onboarding", before: "2 weeks", after: "2 days", improvement: "+600%" }
    ],
    colorScheme: {
      primary: "pink-600",
      secondary: "purple-500",
      gradient: "from-pink-600 to-purple-500"
    }
  }
};

export function getIndustryConfig(industry: string): IndustryConfig {
  return industryConfigs[industry] || industryConfigs.restaurants;
}