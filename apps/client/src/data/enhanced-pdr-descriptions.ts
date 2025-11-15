// Enhanced PDR Timeline Step Descriptions
// Provides detailed, actionable descriptions for each step in the 75-step timeline

export interface EnhancedStepDescription {
  stepId: number;
  detailedDescription: string;
  keyActivities: string[];
  expectedOutcomes: string[];
  clientInvolvement: string;
  successCriteria: string[];
  estimatedDuration: {
    optimistic: number;
    realistic: number;
    pessimistic: number;
  };
  riskFactors?: string[];
  prerequisites?: string[];
}

export const ENHANCED_PDR_DESCRIPTIONS: Record<number, EnhancedStepDescription> = {
  // DISCOVERY & RESEARCH PHASE (1-15)
  1: {
    stepId: 1,
    detailedDescription: "The initial consultation sets the foundation for the entire project. This comprehensive meeting explores your business vision, challenges, and digital transformation goals. We'll discuss your current operations, pain points, and desired outcomes to ensure perfect alignment from day one.",
    keyActivities: [
      "Conduct comprehensive business overview discussion",
      "Identify primary business objectives and KPIs",
      "Document current challenges and pain points",
      "Establish communication protocols and project cadence",
      "Review existing digital assets and infrastructure"
    ],
    expectedOutcomes: [
      "Clear understanding of business goals and vision",
      "Documented project scope and initial requirements",
      "Established project timeline and milestones",
      "Agreed-upon communication channels and meeting schedule"
    ],
    clientInvolvement: "High - Key stakeholders required for full session",
    successCriteria: [
      "All key stakeholders participated in the meeting",
      "Business goals are clearly documented and agreed upon",
      "Initial project scope is defined and approved",
      "Next steps and timeline are established"
    ],
    estimatedDuration: {
      optimistic: 2,
      realistic: 3,
      pessimistic: 4
    },
    prerequisites: [
      "Signed project agreement",
      "Key stakeholder availability confirmed",
      "Basic business information provided"
    ]
  },

  2: {
    stepId: 2,
    detailedDescription: "A thorough analysis of your business model, operations, and market position. We examine revenue streams, cost structures, value propositions, and operational workflows to ensure the digital solution perfectly aligns with your business strategy.",
    keyActivities: [
      "Analyze current business model and revenue streams",
      "Map operational workflows and processes",
      "Identify efficiency opportunities and bottlenecks",
      "Conduct SWOT analysis (Strengths, Weaknesses, Opportunities, Threats)",
      "Review financial goals and growth projections"
    ],
    expectedOutcomes: [
      "Comprehensive business model canvas",
      "Detailed SWOT analysis report",
      "Process flow diagrams for key operations",
      "Identified opportunities for digital optimization"
    ],
    clientInvolvement: "Medium - Periodic input and validation required",
    successCriteria: [
      "Complete business model documented",
      "All revenue streams identified and analyzed",
      "Key processes mapped and validated",
      "Growth opportunities clearly identified"
    ],
    estimatedDuration: {
      optimistic: 3,
      realistic: 4,
      pessimistic: 6
    },
    riskFactors: [
      "Incomplete business information",
      "Complex organizational structure",
      "Multiple revenue streams requiring analysis"
    ]
  },

  3: {
    stepId: 3,
    detailedDescription: "Comprehensive market research to understand industry trends, market dynamics, and positioning opportunities. We analyze market size, growth potential, regulatory environment, and emerging technologies that could impact your business.",
    keyActivities: [
      "Conduct industry analysis and trend research",
      "Analyze market size and growth projections",
      "Research regulatory requirements and compliance needs",
      "Identify emerging technologies and disruptions",
      "Benchmark industry best practices"
    ],
    expectedOutcomes: [
      "Market analysis report with size and growth data",
      "Industry trends and opportunities document",
      "Regulatory compliance checklist",
      "Technology trend analysis relevant to your industry"
    ],
    clientInvolvement: "Low - Mainly validation of findings",
    successCriteria: [
      "Market size and opportunity quantified",
      "Key industry trends identified and documented",
      "Regulatory requirements clearly understood",
      "Positioning opportunities identified"
    ],
    estimatedDuration: {
      optimistic: 4,
      realistic: 5,
      pessimistic: 7
    }
  },

  // ... Continue for all 75 steps

  26: {
    stepId: 26,
    detailedDescription: "Creation of the visual brand identity for the digital product. This includes developing color schemes, typography, iconography, and overall visual language that resonates with your target audience while maintaining brand consistency.",
    keyActivities: [
      "Develop color palette and visual hierarchy",
      "Select and customize typography system",
      "Create custom iconography and illustrations",
      "Design UI component library foundations",
      "Establish visual design principles and guidelines"
    ],
    expectedOutcomes: [
      "Complete brand style guide",
      "Color palette with primary, secondary, and accent colors",
      "Typography scale and usage guidelines",
      "Icon library and illustration style",
      "Visual design system documentation"
    ],
    clientInvolvement: "High - Multiple review and feedback sessions",
    successCriteria: [
      "Brand identity approved by stakeholders",
      "Visual system tested across different contexts",
      "Accessibility standards met (WCAG 2.1 AA)",
      "Design system is scalable and maintainable"
    ],
    estimatedDuration: {
      optimistic: 6,
      realistic: 8,
      pessimistic: 10
    },
    prerequisites: [
      "Brand strategy approved",
      "Target audience research completed",
      "Competitor analysis reviewed"
    ]
  },

  41: {
    stepId: 41,
    detailedDescription: "Setting up the development environment with all necessary tools, frameworks, and infrastructure. This includes configuring version control, CI/CD pipelines, development servers, and establishing coding standards for the team.",
    keyActivities: [
      "Set up version control repository and branching strategy",
      "Configure development, staging, and production environments",
      "Install and configure development frameworks and tools",
      "Set up continuous integration and deployment pipelines",
      "Establish coding standards and review processes"
    ],
    expectedOutcomes: [
      "Fully configured development environment",
      "CI/CD pipeline operational",
      "Development team onboarded and productive",
      "Code quality tools integrated",
      "Documentation for development processes"
    ],
    clientInvolvement: "Low - Technical setup with minimal client input",
    successCriteria: [
      "All developers can successfully run the project locally",
      "Automated tests and builds are running",
      "Deployment pipeline successfully tested",
      "Code review process established"
    ],
    estimatedDuration: {
      optimistic: 3,
      realistic: 4,
      pessimistic: 5
    },
    riskFactors: [
      "Complex technology stack requirements",
      "Integration with existing systems",
      "Security and compliance requirements"
    ]
  },

  69: {
    stepId: 69,
    detailedDescription: "Final production deployment preparation including security hardening, performance optimization, and deployment checklist completion. This critical step ensures the application is ready for real-world usage at scale.",
    keyActivities: [
      "Complete security audit and penetration testing",
      "Optimize application performance and load times",
      "Configure production servers and CDN",
      "Set up monitoring and alerting systems",
      "Prepare rollback procedures and disaster recovery"
    ],
    expectedOutcomes: [
      "Production-ready application deployment",
      "Security audit report and fixes implemented",
      "Performance benchmarks met or exceeded",
      "Monitoring dashboard configured",
      "Deployment and rollback procedures documented"
    ],
    clientInvolvement: "Medium - Final approval and go-live decision",
    successCriteria: [
      "All security vulnerabilities addressed",
      "Performance targets achieved (< 3s load time)",
      "Monitoring showing stable system metrics",
      "Successful deployment dry run completed",
      "Client approval for go-live received"
    ],
    estimatedDuration: {
      optimistic: 4,
      realistic: 6,
      pessimistic: 8
    },
    prerequisites: [
      "All testing phases completed",
      "Final UAT sign-off received",
      "Production infrastructure provisioned",
      "SSL certificates and domains configured"
    ]
  },

  75: {
    stepId: 75,
    detailedDescription: "Comprehensive training and knowledge transfer to ensure your team can effectively manage and grow the platform. Includes hands-on training sessions, documentation review, and establishing ongoing support channels.",
    keyActivities: [
      "Conduct admin user training sessions",
      "Deliver technical documentation and guides",
      "Perform code walkthrough for technical team",
      "Set up support ticketing system",
      "Establish maintenance and update procedures"
    ],
    expectedOutcomes: [
      "Trained admin users confident in platform management",
      "Complete documentation package delivered",
      "Support channels established and tested",
      "Maintenance schedule agreed upon",
      "Knowledge transfer certified complete"
    ],
    clientInvolvement: "High - Full team participation in training",
    successCriteria: [
      "All designated users completed training",
      "Documentation accepted and understood",
      "Support system operational",
      "Client team can perform basic maintenance tasks",
      "Handover checklist fully completed"
    ],
    estimatedDuration: {
      optimistic: 3,
      realistic: 5,
      pessimistic: 7
    },
    riskFactors: [
      "Team availability for training",
      "Technical complexity requiring extended training",
      "Documentation completeness"
    ]
  }
};

// Helper function to get enhanced description for a step
export function getEnhancedDescription(stepId: number): EnhancedStepDescription | null {
  return ENHANCED_PDR_DESCRIPTIONS[stepId] || null;
}

// Helper function to calculate realistic timeline
export function calculateRealisticDuration(stepId: number): number {
  const description = ENHANCED_PDR_DESCRIPTIONS[stepId];
  return description ? description.estimatedDuration.realistic : 4; // Default 4 hours
}

// Helper function to format client involvement level
export function getClientInvolvementBadge(level: string): { color: string; text: string } {
  const lowercaseLevel = level.toLowerCase();
  if (lowercaseLevel.includes('high')) {
    return { color: 'bg-red-500/20 text-red-400 border-red-500/30', text: 'High Involvement' };
  } else if (lowercaseLevel.includes('medium')) {
    return { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', text: 'Medium Involvement' };
  } else {
    return { color: 'bg-green-500/20 text-green-400 border-green-500/30', text: 'Low Involvement' };
  }
}