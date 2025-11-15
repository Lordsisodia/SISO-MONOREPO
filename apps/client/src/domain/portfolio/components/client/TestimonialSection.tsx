/**
 * Testimonial Section Component
 * Displays client testimonial with quote styling
 */

import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface Testimonial {
  text: string;
  author: string;
  role: string;
  company?: string;
}

interface TestimonialSectionProps {
  testimonial: Testimonial;
}

export function TestimonialSection({ testimonial }: TestimonialSectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border border-siso-orange/20 bg-gradient-to-br from-siso-bg-alt to-siso-bg relative overflow-hidden">
        {/* Decorative Quote Icon */}
        <div className="absolute top-4 right-4 opacity-10">
          <Quote className="w-24 h-24 text-siso-orange" />
        </div>

        <CardContent className="p-8 sm:p-12 relative z-10">
          <div className="space-y-6">
            {/* Quote Icon */}
            <div className="flex justify-center sm:justify-start">
              <div className="bg-siso-orange/10 p-3 rounded-full">
                <Quote className="w-6 h-6 text-siso-orange" />
              </div>
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-lg sm:text-xl text-siso-text leading-relaxed italic">
              "{testimonial.text}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-siso-border">
              {/* Avatar Placeholder */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-siso-red to-siso-orange flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {testimonial.author.charAt(0)}
              </div>

              {/* Author Details */}
              <div>
                <div className="font-semibold text-white">
                  {testimonial.author}
                </div>
                <div className="text-sm text-siso-text-muted">
                  {testimonial.role}
                  {testimonial.company && ` at ${testimonial.company}`}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
