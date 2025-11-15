import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface CollapsedProjectCardProps {
  projectName: string;
  projectLogo?: string;
  onClick: () => void;
}

export function CollapsedProjectCard({ projectName, projectLogo, onClick }: CollapsedProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between hover:bg-white/10 transition-colors"
    >
      <div className="flex items-center space-x-3">
        {projectLogo ? (
          <img 
            src={projectLogo} 
            alt={projectName}
            className="w-8 h-8 rounded object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-r from-[#ea384c] to-[#d42c47] rounded flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {projectName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <span className="text-white font-medium truncate">{projectName}</span>
      </div>
      <ChevronDownIcon className="w-5 h-5 text-gray-400" />
    </button>
  );
}

export default CollapsedProjectCard;