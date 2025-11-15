import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef, useCallback } from 'react';
import { SidebarSection } from './SidebarSection';
import { NavigationProps } from './types';
import { getMenuSections } from './navigationData';

export const SidebarNavigation = ({ collapsed, onItemClick, visible }: NavigationProps) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuSections = getMenuSections();

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Flatten navigation items for keyboard navigation
  const flattenedItems = useCallback(() => {
    const items: Array<{ href: string; title: string; sectionIndex: number; itemIndex: number }> = [];
    menuSections.forEach((section, sectionIndex) => {
      section.items.forEach((item, itemIndex) => {
        items.push({
          href: item.href,
          title: item.title,
          sectionIndex,
          itemIndex
        });
        if (item.subItems) {
          item.subItems.forEach((subItem, subIndex) => {
            items.push({
              href: subItem.href,
              title: `${item.title} - ${subItem.title}`,
              sectionIndex,
              itemIndex: itemIndex + 0.1 + subIndex * 0.1
            });
          });
        }
      });
    });
    return items;
  }, [menuSections]);

  // Enhanced keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!visible) return;

    const items = flattenedItems();
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => prev <= 0 ? items.length - 1 : prev - 1);
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(items.length - 1);
        break;
      case 'Enter':
      case ' ':
        if (focusedIndex >= 0 && focusedIndex < items.length) {
          e.preventDefault();
          const item = items[focusedIndex];
          // Simulate click on the focused item
          const linkElement = navRef.current?.querySelector(`[href="${item.href}"]`) as HTMLAnchorElement;
          if (linkElement) {
            linkElement.click();
          }
        }
        break;
      case 'Escape':
        setFocusedIndex(-1);
        break;
    }
  }, [visible, focusedIndex, flattenedItems]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // [Analysis] Only use IntersectionObserver for hash-based navigation
  useEffect(() => {
    if (location.hash) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${entry.target.id}`);
            }
          });
        },
        { threshold: 0.5 }
      );

      document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
      });

      return () => observer.disconnect();
    }
  }, [location.hash]);

  // [Analysis] Enhanced debugging for route matching
  useEffect(() => {
    console.log('Current pathname:', location.pathname);
    
    // Test some key routes for debugging
    const testRoutes = ['/economy/leaderboards', '/economy/crypto-exchange', '/economy/earn'];
    testRoutes.forEach(route => {
      const isActive = isItemActive(route);
      console.log(`Route ${route} active?`, isActive);
    });
  }, [location.pathname]);

  if (!visible) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const isItemActive = (href: string, isMainItem = false) => {
    // Always use the URL pathname for matching, not the hash fragment
    if (href.startsWith('#')) {
      return href === activeSection;
    }

    // Perfect match for dashboard items
    if (location.pathname === href) {
      return true;
    }

    // For main items, do a more permissive match
    if (isMainItem) {
      return location.pathname.startsWith(href);
    }

    // For sub-items that are top-level paths with slugs, match the pattern
    if (href.includes(':') && location.pathname.startsWith(href.split(':')[0])) {
      return true;
    }

    // Otherwise, use exact or prefix match depending on the specificity needed
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      ref={navRef}
      initial={reducedMotion ? {} : "hidden"}
      animate="show"
      variants={containerVariants}
      className={cn("px-2 py-4", collapsed && "px-1")}
      role="navigation"
      aria-label="Main navigation"
      tabIndex={0}
      onFocus={() => {
        if (focusedIndex === -1) {
          setFocusedIndex(0);
        }
      }}
    >
      {/* Screen reader instructions */}
      <div className="sr-only">
        Use arrow keys to navigate, Enter to select, Escape to clear focus.
        {collapsed ? "Sidebar is collapsed. Hover to expand." : ""}
      </div>
      
      <div className="space-y-2">
        {menuSections.map((section, index) => (
          <motion.div 
            key={index}
            initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedMotion ? {} : { delay: index * 0.1 }}
            className={cn(
              "space-y-1",
              section.type === 'section' && "border-b border-siso-border pb-2"
            )}
          >
            <SidebarSection
              section={section}
              collapsed={collapsed}
              onItemClick={onItemClick}
              isItemActive={(href) => isItemActive(href, section.type === 'main')}
              focusedIndex={focusedIndex}
              flattenedItems={flattenedItems()}
            />
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
};
