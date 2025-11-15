"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
  description?: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  maxVisible?: number;
  className?: string;
  disabled?: boolean;
  allowCustom?: boolean;
}

export function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchable = true,
  maxVisible = 5,
  className = "",
  disabled = false,
  allowCustom = true,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find(option => option.value === value || option.label === value);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleOptions = maxVisible > 0
    ? filteredOptions.slice(0, maxVisible)
    : filteredOptions;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleSelect = (optionValue: string) => {
    if (allowCustom && optionValue === "custom") {
      setIsOpen(true);
      setSearchQuery("");
      setHighlightedIndex(-1);
      // Keep dropdown open and focus the search field so the user can type their value
      requestAnimationFrame(() => searchInputRef.current?.focus());
      return;
    }
    onChange(optionValue);
    setIsOpen(false);
    setSearchQuery("");
    setHighlightedIndex(-1);
  };

  const canCreateCustom = allowCustom && searchable && searchQuery.trim().length > 0 && !options.some(o => o.label.toLowerCase() === searchQuery.trim().toLowerCase() || o.value.toLowerCase() === searchQuery.trim().toLowerCase());

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault();
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < visibleOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : visibleOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && visibleOptions[highlightedIndex]) {
          handleSelect(visibleOptions[highlightedIndex].value);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative ${className}`}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full rounded-lg border border-siso-border/60 bg-siso-bg-secondary/50
          px-3 py-2 text-left text-siso-text-primary
          transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-siso-orange/50'}
          ${isOpen ? 'border-siso-orange/80 shadow-lg shadow-siso-orange/20' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption || value ? 'text-siso-text-primary' : 'text-siso-text-muted'}>
            {selectedOption ? selectedOption.label : (value || placeholder)}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-siso-text-muted transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
        {selectedOption?.description && (
          <div className="mt-1 text-xs text-siso-text-muted">
            {selectedOption.description}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-siso-border/60 bg-siso-bg-secondary shadow-xl">
          {searchable && (
            <div className="border-b border-siso-border/40 p-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-siso-text-muted" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-md border border-siso-border/40 bg-siso-bg-primary/50
                           pl-7 pr-2 py-1.5 text-xs text-siso-text-primary
                           placeholder:text-siso-text-muted
                           focus:outline-none focus:ring-1 focus:ring-siso-orange/50"
                />
              </div>
            </div>
          )}

          <div className="max-h-60 overflow-y-auto">
            {visibleOptions.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-siso-text-muted">
                No options found
              </div>
            ) : (
              <div>
                {visibleOptions.map((option, index) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`
                      w-full px-3 py-2 text-left text-xs transition-colors
                      ${option.value === value
                        ? 'bg-siso-orange/20 text-siso-orange border-l-2 border-siso-orange'
                        : 'text-siso-text-primary hover:bg-siso-bg-primary/50'
                      }
                      ${index === highlightedIndex
                        ? 'bg-siso-orange/10'
                        : ''
                      }
                    `}
                  >
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="mt-0.5 text-xs text-siso-text-muted">
                        {option.description}
                      </div>
                    )}
                  </button>
                ))}
                {maxVisible > 0 && filteredOptions.length > maxVisible && (
                  <div className="px-3 py-2 text-center text-xs text-siso-text-muted border-t border-siso-border/40">
                    {filteredOptions.length - maxVisible} more options...
                  </div>
                )}
                {canCreateCustom && (
                  <button
                    type="button"
                    onClick={() => handleSelect(searchQuery.trim())}
                    className="w-full border-t border-siso-border/40 px-3 py-2 text-left text-xs text-siso-orange hover:bg-siso-orange/10"
                  >
                    Use “{searchQuery.trim()}”
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
