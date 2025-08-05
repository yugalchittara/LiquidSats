import { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface TableFiltersProps {
  filters: {
    duration?: FilterOption[];
    ltv?: FilterOption[];
    status?: FilterOption[];
    currency?: FilterOption[];
  };
  sortOptions?: FilterOption[];
  onFilterChange?: (filterType: string, value: string) => void;
  onSortChange?: (value: string) => void;
  activeFilters?: Record<string, string[]>;
}

export function TableFilters({ 
  filters, 
  sortOptions, 
  onFilterChange, 
  onSortChange,
  activeFilters = {}
}: TableFiltersProps) {
  const [selectedSort, setSelectedSort] = useState("");

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    onSortChange?.(value);
  };

  const removeFilter = (filterType: string, value: string) => {
    // Implementation for removing specific filter
    console.log(`Remove filter ${filterType}: ${value}`);
  };

  const clearAllFilters = () => {
    // Implementation for clearing all filters
    console.log("Clear all filters");
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        {filters.duration && (
          <Select onValueChange={(value) => onFilterChange?.('duration', value)}>
            <SelectTrigger className="w-40 bg-card border-border">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              {filters.duration.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filters.ltv && (
          <Select onValueChange={(value) => onFilterChange?.('ltv', value)}>
            <SelectTrigger className="w-32 bg-card border-border">
              <SelectValue placeholder="LTV" />
            </SelectTrigger>
            <SelectContent>
              {filters.ltv.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filters.status && (
          <Select onValueChange={(value) => onFilterChange?.('status', value)}>
            <SelectTrigger className="w-36 bg-card border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {filters.status.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filters.currency && (
          <Select onValueChange={(value) => onFilterChange?.('currency', value)}>
            <SelectTrigger className="w-32 bg-card border-border">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              {filters.currency.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {sortOptions && (
          <Select value={selectedSort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-44 bg-card border-border">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Active Filters Display */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-body text-neutral-medium">Filters:</span>
          {Object.entries(activeFilters).map(([filterType, values]) =>
            values.map((value) => (
              <Badge 
                key={`${filterType}-${value}`}
                variant="secondary"
                className="bg-secondary text-secondary-foreground border border-border"
              >
                {value}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => removeFilter(filterType, value)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-neutral-medium hover:text-neutral-dark text-body"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}