import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'main' | 'simple';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 120,
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'main',
  size = 'md',
  className = '',
  showText = false,
}) => {
  const dimensions = sizeMap[size];
  const logoPath = variant === 'main' ? '/siso-logo.svg' : '/siso-logo-simplified.svg';

  return (
    <div className={cn('logo-container inline-flex items-center gap-2 cursor-pointer transition-transform hover:scale-105', className)}>
      <img
        src={logoPath}
        width={dimensions}
        height={dimensions}
        alt="SISO Logo"
        className="logo-svg block"
      />
      {showText && (
        <span className="logo-text font-bold text-2xl text-primary-black">SISO</span>
      )}
    </div>
  );
};