/**
 * Timeline Visualization Component
 * Displays project timeline with phases
 */

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimelinePhase {
  name: string;
  description: string;
  duration: string;
}

interface TimelineVisualizationProps {
  timeline: {
    phases: TimelinePhase[];
  };
}

export function TimelineVisualization({ timeline }: TimelineVisualizationProps) {
  return (
    <div className="relative max-w-4xl">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-siso-border hidden md:block" />

      <div className="space-y-8">
        {timeline.phases.map((phase, index) => (
          <motion.div
            key={phase.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-0 md:pl-12"
          >
            {/* Timeline dot */}
            <div className="absolute left-2 top-1.5 w-4 h-4 rounded-full bg-siso-orange border-4 border-siso-bg hidden md:block" />

            {/* Phase content */}
            <div className="bg-siso-bg-alt border border-siso-border rounded-lg p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h4 className="text-lg font-semibold text-white">
                  {phase.name}
                </h4>
                <div className="flex items-center gap-2 text-siso-text-muted flex-shrink-0">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{phase.duration}</span>
                </div>
              </div>
              <p className="text-siso-text leading-relaxed">
                {phase.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
