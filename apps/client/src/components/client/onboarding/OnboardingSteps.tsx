// Comprehensive onboarding steps configuration
export interface OnboardingStepData {
  id: string;
  title: string;
  question: string;
  type: 'text' | 'select' | 'multiselect' | 'range' | 'boolean' | 'date';
  placeholder?: string;
  options?: { value: string; label: string; description?: string }[];
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
  };
  helpText?: string;
  skipCondition?: (answers: Record<string, any>) => boolean;
}

export const onboardingSteps: OnboardingStepData[] = [
  // Business Information
  {
    id: 'company_name',
    title: 'Company Name',
    question: "What's your company name?",
    type: 'text',
    placeholder: 'e.g., Acme Corporation',
    validation: {
      required: true,
      minLength: 2,
      message: 'Company name must be at least 2 characters'
    }
  },
  {
    id: 'business_type',
    title: 'Business Type',
    question: 'What type of business are you?',
    type: 'select',
    options: [
      { value: 'restaurant', label: 'Restaurant & Food Service', description: 'Restaurants, cafes, food delivery' },
      { value: 'retail', label: 'Retail & E-commerce', description: 'Online stores, physical retail' },
      { value: 'healthcare', label: 'Healthcare & Wellness', description: 'Medical, dental, wellness services' },
      { value: 'professional', label: 'Professional Services', description: 'Consulting, legal, accounting' },
      { value: 'technology', label: 'Technology & Software', description: 'SaaS, tech products, IT services' },
      { value: 'education', label: 'Education & Training', description: 'Schools, courses, training programs' },
      { value: 'realestate', label: 'Real Estate', description: 'Property, rentals, development' },
      { value: 'fitness', label: 'Fitness & Sports', description: 'Gyms, sports facilities, wellness' },
      { value: 'beauty', label: 'Beauty & Personal Care', description: 'Salons, spas, beauty services' },
      { value: 'other', label: 'Other', description: 'Something else' }
    ],
    validation: { required: true }
  },
  {
    id: 'business_description',
    title: 'Business Description',
    question: 'In one sentence, what does your business do?',
    type: 'text',
    placeholder: 'e.g., We provide organic meal delivery services to health-conscious consumers',
    validation: {
      required: true,
      minLength: 10,
      maxLength: 200,
      message: 'Please provide a brief description (10-200 characters)'
    },
    helpText: 'This helps us understand your core business'
  },
  
  // Online Presence
  {
    id: 'has_website',
    title: 'Online Presence',
    question: 'Do you have an existing website or social media presence?',
    type: 'select',
    options: [
      { value: 'website', label: 'Yes, I have a website' },
      { value: 'social', label: 'Yes, I have social media' },
      { value: 'both', label: 'I have both' },
      { value: 'none', label: 'No online presence yet' }
    ],
    validation: { required: true }
  },
  {
    id: 'website_url',
    title: 'Website URL',
    question: 'What\'s your website URL?',
    type: 'text',
    placeholder: 'https://www.example.com',
    skipCondition: (answers) => answers.has_website === 'none' || answers.has_website === 'social',
    validation: {
      pattern: '^https?://.+',
      message: 'Please enter a valid URL starting with http:// or https://'
    }
  },
  {
    id: 'social_handles',
    title: 'Social Media',
    question: 'What are your main social media handles?',
    type: 'text',
    placeholder: 'e.g., @yourbusiness on Instagram',
    skipCondition: (answers) => answers.has_website === 'none' || answers.has_website === 'website',
    helpText: 'We\'ll analyze your social presence to understand your brand'
  },
  
  // Project Goals
  {
    id: 'primary_goal',
    title: 'Primary Goal',
    question: 'What\'s your primary goal with this app?',
    type: 'select',
    options: [
      { value: 'increase_sales', label: 'Increase Sales', description: 'Drive more revenue' },
      { value: 'improve_efficiency', label: 'Improve Efficiency', description: 'Streamline operations' },
      { value: 'enhance_experience', label: 'Enhance Customer Experience', description: 'Better user satisfaction' },
      { value: 'expand_reach', label: 'Expand Market Reach', description: 'Reach new customers' },
      { value: 'automate_processes', label: 'Automate Processes', description: 'Reduce manual work' },
      { value: 'data_insights', label: 'Gain Data Insights', description: 'Better decision making' }
    ],
    validation: { required: true }
  },
  {
    id: 'target_audience',
    title: 'Target Audience',
    question: 'Who is your primary target audience?',
    type: 'multiselect',
    options: [
      { value: 'consumers', label: 'General Consumers' },
      { value: 'businesses', label: 'Other Businesses (B2B)' },
      { value: 'professionals', label: 'Industry Professionals' },
      { value: 'students', label: 'Students/Learners' },
      { value: 'seniors', label: 'Seniors' },
      { value: 'parents', label: 'Parents/Families' },
      { value: 'tech_savvy', label: 'Tech-Savvy Users' },
      { value: 'local', label: 'Local Community' }
    ],
    validation: { required: true },
    helpText: 'Select all that apply'
  },
  
  // Budget & Timeline
  {
    id: 'budget_range',
    title: 'Budget Range',
    question: 'What\'s your budget range for this project?',
    type: 'select',
    options: [
      { value: 'starter', label: '£5,000 - £15,000', description: 'Basic features, MVP' },
      { value: 'growth', label: '£15,000 - £30,000', description: 'Full-featured app' },
      { value: 'professional', label: '£30,000 - £50,000', description: 'Advanced features' },
      { value: 'enterprise', label: '£50,000+', description: 'Complex, scalable solution' },
      { value: 'unsure', label: 'Not sure yet', description: 'Need guidance' }
    ],
    validation: { required: true }
  },
  {
    id: 'timeline_preference',
    title: 'Timeline',
    question: 'When do you need the app completed?',
    type: 'select',
    options: [
      { value: 'asap', label: 'ASAP (4-6 weeks)', description: 'Rush delivery' },
      { value: 'standard', label: 'Standard (8-12 weeks)', description: 'Recommended timeline' },
      { value: 'relaxed', label: 'Flexible (3-4 months)', description: 'No rush' },
      { value: 'planning', label: 'Just planning', description: 'Exploring options' }
    ],
    validation: { required: true }
  },
  
  // Feature Preferences
  {
    id: 'must_have_features',
    title: 'Must-Have Features',
    question: 'Which features are absolutely essential for your app?',
    type: 'multiselect',
    options: [
      { value: 'user_accounts', label: 'User Accounts & Login' },
      { value: 'payments', label: 'Payment Processing' },
      { value: 'booking', label: 'Booking/Scheduling' },
      { value: 'inventory', label: 'Inventory Management' },
      { value: 'analytics', label: 'Analytics & Reports' },
      { value: 'notifications', label: 'Push Notifications' },
      { value: 'social_integration', label: 'Social Media Integration' },
      { value: 'offline_mode', label: 'Offline Functionality' },
      { value: 'multi_language', label: 'Multiple Languages' },
      { value: 'admin_panel', label: 'Admin Dashboard' }
    ],
    validation: { required: true },
    helpText: 'Select your top priorities'
  },
  {
    id: 'design_preference',
    title: 'Design Style',
    question: 'What design style do you prefer?',
    type: 'select',
    options: [
      { value: 'modern_minimal', label: 'Modern & Minimal', description: 'Clean, simple, elegant' },
      { value: 'bold_colorful', label: 'Bold & Colorful', description: 'Vibrant, energetic' },
      { value: 'professional', label: 'Professional', description: 'Corporate, trustworthy' },
      { value: 'playful', label: 'Playful & Fun', description: 'Casual, friendly' },
      { value: 'luxury', label: 'Luxury & Premium', description: 'High-end, sophisticated' },
      { value: 'match_brand', label: 'Match My Brand', description: 'Consistent with existing' }
    ],
    validation: { required: true }
  },
  
  // Contact & Next Steps
  {
    id: 'decision_maker',
    title: 'Decision Making',
    question: 'Are you the primary decision maker for this project?',
    type: 'boolean',
    validation: { required: true }
  },
  {
    id: 'team_size',
    title: 'Team Size',
    question: 'How many people will be involved in this project from your side?',
    type: 'select',
    options: [
      { value: 'solo', label: 'Just me' },
      { value: 'small', label: '2-3 people' },
      { value: 'medium', label: '4-6 people' },
      { value: 'large', label: '7+ people' }
    ],
    validation: { required: true },
    skipCondition: (answers) => !answers.decision_maker
  },
  {
    id: 'preferred_communication',
    title: 'Communication',
    question: 'How do you prefer to communicate during the project?',
    type: 'multiselect',
    options: [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone Calls' },
      { value: 'video', label: 'Video Meetings' },
      { value: 'chat', label: 'Chat/Messaging' },
      { value: 'in_person', label: 'In-Person Meetings' }
    ],
    validation: { required: true }
  },
  {
    id: 'additional_info',
    title: 'Additional Information',
    question: 'Anything else you\'d like us to know?',
    type: 'text',
    placeholder: 'Special requirements, concerns, or questions...',
    validation: { maxLength: 500 },
    helpText: 'Optional - share any other details'
  }
];

// Group steps into logical sections for progress display
export const onboardingStepGroups = [
  {
    id: 'business',
    title: 'Business',
    subtitle: 'Basic info',
    steps: ['company_name', 'business_type', 'business_description']
  },
  {
    id: 'online',
    title: 'Presence',
    subtitle: 'Online presence',
    steps: ['has_website', 'website_url', 'social_handles']
  },
  {
    id: 'goals',
    title: 'Goals',
    subtitle: 'Project goals',
    steps: ['primary_goal', 'target_audience']
  },
  {
    id: 'budget',
    title: 'Budget',
    subtitle: 'Budget & timeline',
    steps: ['budget_range', 'timeline_preference']
  },
  {
    id: 'features',
    title: 'Features',
    subtitle: 'Preferences',
    steps: ['must_have_features', 'design_preference']
  },
  {
    id: 'contact',
    title: 'Next Steps',
    subtitle: 'Final details',
    steps: ['decision_maker', 'team_size', 'preferred_communication', 'additional_info']
  }
];