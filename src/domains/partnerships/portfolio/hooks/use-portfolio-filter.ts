/**
 * Portfolio Domain - Portfolio Filter Hook
 */

import { useState, useMemo } from 'react';
import { PortfolioClient, IndustryCategory } from '../types';
import {
  filterClients,
  sortClients,
  searchClients,
  SortOption,
  FilterOptions,
} from '../lib';

export function usePortfolioFilter(initialClients: PortfolioClient[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<IndustryCategory[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filteredClients = useMemo(() => {
    let result = initialClients;

    // Search
    if (searchQuery) {
      result = searchClients(result, searchQuery);
    }

    // Filter
    const filters: FilterOptions = {};
    if (selectedIndustries.length) filters.industries = selectedIndustries;
    if (selectedTech.length) filters.techStack = selectedTech;

    result = filterClients(result, filters);

    // Sort
    result = sortClients(result, sortBy);

    return result;
  }, [initialClients, searchQuery, selectedIndustries, selectedTech, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedIndustries([]);
    setSelectedTech([]);
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedIndustries.length > 0 || selectedTech.length > 0;

  return {
    searchQuery,
    setSearchQuery,
    selectedIndustries,
    setSelectedIndustries,
    selectedTech,
    setSelectedTech,
    sortBy,
    setSortBy,
    filteredClients,
    clearFilters,
    hasActiveFilters,
  };
}
