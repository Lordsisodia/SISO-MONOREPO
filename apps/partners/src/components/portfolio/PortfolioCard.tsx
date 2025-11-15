
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Clock, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Users,
  Award,
  FileText,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface PortfolioProject {
  id: string;
  app_name: string;
  client_name?: string;
  description: string;
  technologies: string[];
  images: string[];
  live_url?: string;
  case_study_url?: string;
  development_status: string;
  estimated_value?: number;
  completion_date?: string;
  duration_months?: number;
  key_features: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
  rating?: number;
}

interface PortfolioCardProps {
  project: PortfolioProject;
  onImageClick?: (imageIndex: number) => void;
  onProjectClick?: () => void;
  loading?: boolean;
}

export const PortfolioCard = ({ project, onImageClick, onProjectClick, loading }: PortfolioCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  
  const images = project.images || ['/placeholder-project.jpg'];
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setImageLoading(true);
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageLoading(true);
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/40';
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'planning':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    }
  };

  if (loading) {
    return (
      <Card className="h-full flex flex-col overflow-hidden border border-siso-border bg-siso-bg-alt">
        <div className="relative h-48">
          <Skeleton className="w-full h-full bg-siso-border" />
        </div>
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-3/4 bg-siso-border" />
          <Skeleton className="h-4 w-1/2 bg-siso-border" />
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
          <Skeleton className="h-4 w-full bg-siso-border" />
          <Skeleton className="h-4 w-5/6 bg-siso-border" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 bg-siso-border rounded-full" />
            <Skeleton className="h-6 w-20 bg-siso-border rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border border-siso-border hover:border-siso-orange/50 bg-siso-bg-alt transition-all duration-300">
        {/* Image Carousel */}
        <div className="relative h-48 overflow-hidden bg-siso-bg">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`${project.app_name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => onImageClick?.(currentImageIndex)}
              onLoad={() => setImageLoading(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoading ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          
          {/* Image Loading State */}
          {imageLoading && (
            <div className="absolute inset-0 bg-siso-bg animate-pulse flex items-center justify-center">
              <Play className="h-8 w-8 text-siso-text-muted" />
            </div>
          )}
          
          {/* Carousel Controls */}
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="icon"
                variant="ghost"
                onClick={prevImage}
                className="h-8 w-8 bg-black/50 text-white hover:bg-black/70"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={nextImage}
                className="h-8 w-8 bg-black/50 text-white hover:bg-black/70"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300 cursor-pointer",
                    index === currentImageIndex 
                      ? "bg-siso-orange scale-125" 
                      : "bg-white/50 hover:bg-white/75"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                    setImageLoading(true);
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge className={cn("text-xs", getStatusColor(project.development_status))}>
              {project.development_status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>

        <CardHeader className="space-y-3 pb-2">
          {/* Title and Rating */}
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-siso-orange transition-colors">
                {project.app_name}
              </h3>
              {project.rating && (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">{project.rating}</span>
                </div>
              )}
            </div>
            
            {/* Client and Duration */}
            <div className="flex items-center justify-between text-sm text-siso-text-muted">
              {project.client_name && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{project.client_name}</span>
                </div>
              )}
              {project.duration_months && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{project.duration_months} months</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow space-y-4">
          {/* Description */}
          <p className="text-sm text-siso-text-muted line-clamp-3">
            {project.description}
          </p>
          
          {/* Key Features */}
          {project.key_features && project.key_features.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-siso-orange" />
                <span className="text-sm font-medium text-white">Key Features</span>
              </div>
              <div className="space-y-1">
                {project.key_features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-siso-text-muted">
                    <div className="h-1 w-1 bg-siso-orange rounded-full" />
                    <span className="line-clamp-1">{feature}</span>
                  </div>
                ))}
                {project.key_features.length > 3 && (
                  <div className="text-xs text-siso-orange">
                    +{project.key_features.length - 3} more features
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="text-xs bg-siso-border/50 text-siso-text hover:bg-siso-orange/20 hover:text-siso-orange transition-colors"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge variant="secondary" className="text-xs bg-siso-border/50 text-siso-text">
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          )}

          {/* Testimonial Preview */}
          {project.testimonial && (
            <div className="p-3 bg-siso-bg/50 rounded-lg border border-siso-border/50">
              <p className="text-xs text-siso-text-muted italic line-clamp-2 mb-2">
                "{project.testimonial.text}"
              </p>
              <div className="text-xs text-siso-orange font-medium">
                — {project.testimonial.author}, {project.testimonial.role}
              </div>
            </div>
          )}
        </CardContent>

        {/* Action Buttons */}
        <CardFooter className="pt-4 space-y-3">
          <div className="flex gap-2 w-full">
            {project.live_url && (
              <Button
                size="sm"
                className="flex-1 bg-siso-orange hover:bg-siso-orange/90 text-white"
                onClick={() => window.open(project.live_url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Live
              </Button>
            )}
            {project.case_study_url && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-siso-border text-siso-text hover:bg-siso-bg hover:text-white"
                onClick={() => window.open(project.case_study_url, '_blank')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Case Study
              </Button>
            )}
            {!project.live_url && !project.case_study_url && (
              <Button
                size="sm"
                variant="outline"
                className="w-full border-siso-border text-siso-text hover:bg-siso-bg hover:text-white"
                onClick={onProjectClick}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            )}
          </div>
          
          {/* Project Value */}
          {project.estimated_value !== undefined && (
            <div className="flex justify-between items-center text-sm pt-2 border-t border-siso-border/50">
              <span className="text-siso-text-muted">Project Value</span>
              <span className="text-siso-orange font-semibold">
                ${project.estimated_value.toLocaleString()}
              </span>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};
