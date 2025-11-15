import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioCard } from './PortfolioCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  SortAsc, 
  Grid3X3, 
  Lightbulb,
  X,
  Eye,
  ExternalLink,
  Calendar,
  Code,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  estimated_value: number;
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

interface PortfolioGridProps {
  projects: PortfolioProject[];
  onProjectSelect?: (project: PortfolioProject) => void;
}

const categoryFilters = [
  { value: 'all', label: 'All Projects', icon: Grid3X3 },
  { value: 'web-app', label: 'Web Apps', icon: Code },
  { value: 'mobile', label: 'Mobile Apps', icon: Award },
  { value: 'ecommerce', label: 'E-commerce', icon: Lightbulb },
  { value: 'saas', label: 'SaaS Platforms', icon: ExternalLink }
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'value-high', label: 'Highest Value' },
  { value: 'value-low', label: 'Lowest Value' },
  { value: 'rating', label: 'Highest Rated' }
];

export function PortfolioGrid({ projects, onProjectSelect }: PortfolioGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [lightboxProject, setLightboxProject] = useState<PortfolioProject | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter projects based on search and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.app_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           project.technologies.some(tech => 
                             tech.toLowerCase().includes(selectedCategory.replace('-', ''))
                           );
    
    return matchesSearch && matchesCategory;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.completion_date || '').getTime() - new Date(a.completion_date || '').getTime();
      case 'oldest':
        return new Date(a.completion_date || '').getTime() - new Date(b.completion_date || '').getTime();
      case 'value-high':
        return b.estimated_value - a.estimated_value;
      case 'value-low':
        return a.estimated_value - b.estimated_value;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  // Masonry layout effect
  useEffect(() => {
    const resizeGridItem = (item: HTMLElement) => {
      const grid = gridRef.current;
      if (!grid) return;
      
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      const rowSpan = Math.ceil((item.querySelector('.portfolio-card-content')?.scrollHeight || 0 + rowGap) / (rowHeight + rowGap));
      
      item.style.gridRowEnd = `span ${rowSpan}`;
    };

    const resizeAllGridItems = () => {
      const allItems = gridRef.current?.querySelectorAll('.portfolio-grid-item');
      allItems?.forEach((item) => resizeGridItem(item as HTMLElement));
    };

    const resizeObserver = new ResizeObserver(resizeAllGridItems);
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }

    // Initial resize
    setTimeout(resizeAllGridItems, 100);

    return () => {
      resizeObserver.disconnect();
    };
  }, [sortedProjects]);

  const openLightbox = (project: PortfolioProject, imageIndex: number = 0) => {
    setLightboxProject(project);
    setLightboxImageIndex(imageIndex);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxProject(null);
    setLightboxImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (lightboxProject && lightboxImageIndex < lightboxProject.images.length - 1) {
      setLightboxImageIndex(lightboxImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (lightboxImageIndex > 0) {
      setLightboxImageIndex(lightboxImageIndex - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-siso-text-muted h-5 w-5" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-siso-bg-alt border-siso-border text-white placeholder:text-siso-text-muted"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className={cn(
                    "flex items-center gap-2",
                    selectedCategory === category.value
                      ? "bg-siso-orange text-white"
                      : "border-siso-border text-siso-text hover:bg-siso-bg-alt hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-siso-border text-siso-text hover:bg-siso-bg-alt">
                <SortAsc className="mr-2 h-4 w-4" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-siso-bg-alt border-siso-border">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className="text-siso-text hover:bg-siso-bg hover:text-white"
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-siso-text-muted">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="bg-siso-orange/20 text-siso-orange">
                Search: {searchQuery}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => setSearchQuery('')}
                />
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="bg-siso-orange/20 text-siso-orange">
                Category: {categoryFilters.find(c => c.value === selectedCategory)?.label}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => setSelectedCategory('all')}
                />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Masonry Grid */}
      <div
        ref={gridRef}
        className="portfolio-masonry-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gridAutoRows: '10px',
          gridGap: '20px'
        }}
      >
        <AnimatePresence>
          {sortedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="portfolio-grid-item"
            >
              <div className="portfolio-card-content">
                <PortfolioCard
                  project={project}
                  onImageClick={(imageIndex) => openLightbox(project, imageIndex)}
                  onProjectClick={() => onProjectSelect?.(project)}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {sortedProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-siso-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-siso-orange" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No projects found
          </h3>
          <p className="text-siso-text-muted mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="border-siso-border text-siso-text hover:bg-siso-bg-alt hover:text-white"
          >
            Clear all filters
          </Button>
        </motion.div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation Buttons */}
              {lightboxProject.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    disabled={lightboxImageIndex === 0}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 disabled:opacity-30"
                  >
                    ←
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    disabled={lightboxImageIndex === lightboxProject.images.length - 1}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 disabled:opacity-30"
                  >
                    →
                  </Button>
                </>
              )}

              {/* Image */}
              <img
                src={lightboxProject.images[lightboxImageIndex]}
                alt={`${lightboxProject.app_name} - Image ${lightboxImageIndex + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />

              {/* Image Counter */}
              {lightboxProject.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {lightboxImageIndex + 1} / {lightboxProject.images.length}
                </div>
              )}

              {/* Project Info */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white p-4 rounded-lg max-w-xs">
                <h3 className="font-semibold text-lg mb-1">{lightboxProject.app_name}</h3>
                <p className="text-sm text-gray-300 mb-2">{lightboxProject.client_name}</p>
                <div className="flex gap-2">
                  {lightboxProject.live_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => window.open(lightboxProject.live_url, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Live
                    </Button>
                  )}
                  {lightboxProject.case_study_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => window.open(lightboxProject.case_study_url, '_blank')}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Case Study
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .portfolio-masonry-grid .portfolio-grid-item {
          break-inside: avoid;
        }
      `}</style>
    </div>
  );
}