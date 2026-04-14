import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Filters } from "../utils/filters";
import { CUISINE_TYPES, DIETARY_OPTIONS, SERVICE_OPTIONS, CATERING_OPTIONS, NEIGHBORHOODS } from "../config";

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (category: keyof Filters, value: string) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export function FilterPanel({ filters, onFilterChange, onClearAll, hasActiveFilters }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // Count active filters per category
  const activeCounts = {
    cuisine: filters.cuisine.length,
    dietary: filters.dietary.length,
    service: filters.service.length,
    catering: filters.catering.length,
    neighborhood: filters.neighborhood.length,
  };

  // Get all active filters for chips display
  const activeFilterChips = [
    ...filters.cuisine.map(c => ({ label: c, category: "cuisine" as const, value: c })),
    ...filters.dietary.map(d => {
      const option = DIETARY_OPTIONS.find(o => o.id === d);
      return { label: `${option?.emoji} ${option?.label}`, category: "dietary" as const, value: d };
    }),
    ...filters.service.map(s => ({ label: s, category: "service" as const, value: s })),
    ...filters.catering.map(c => ({ label: `🎉 ${c}`, category: "catering" as const, value: c })),
    ...filters.neighborhood.map(n => ({ label: `📍 ${n}`, category: "neighborhood" as const, value: n })),
  ];

  // Quick filter presets
  const quickFilters = [
    { label: "🌱 Plant-Based", action: () => onFilterChange("dietary", "vegan") },
    { label: "🎉 Catering", action: () => onFilterChange("catering", "Available") },
    { label: "🥡 Takeout", action: () => onFilterChange("service", "Takeout") },
    { label: "🍕 Pizza", action: () => onFilterChange("cuisine", "Pizza") },
  ];

  const FilterSection = ({ 
    title, 
    section, 
    children, 
    count 
  }: { 
    title: string; 
    section: string; 
    children: React.ReactNode; 
    count: number;
  }) => {
    const isExpanded = expandedSections.has(section);
    
    return (
      <div className="border-b border-[var(--ink)]/20 last:border-b-0">
        <button
          onClick={() => toggleSection(section)}
          className="w-full flex items-center justify-between py-3 px-1 hover:bg-[var(--stone)]/30 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{title}</span>
            {count > 0 && (
              <span className="px-2 py-0.5 bg-[var(--coral)] text-white text-xs rounded-full">
                {count}
              </span>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-[var(--muted)]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[var(--muted)]" />
          )}
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-3 px-1">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Quick Filters */}
      <div>
        <h4 
          className="text-xs uppercase tracking-wide text-[var(--muted)] mb-2" 
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Quick Filters
        </h4>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter, idx) => (
            <button
              key={idx}
              onClick={filter.action}
              className="px-3 py-1.5 text-sm bg-white border-2 border-[var(--ink)] rounded-lg hover:bg-[var(--stone)] transition-colors"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="p-3 bg-[var(--stone)] border-2 border-[var(--ink)] rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 
              className="text-xs uppercase tracking-wide text-[var(--muted)]" 
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Active Filters ({activeFilterChips.length})
            </h4>
            <button
              onClick={onClearAll}
              className="text-xs text-[var(--coral)] hover:underline font-medium"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilterChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => onFilterChange(chip.category, chip.value)}
                className="group flex items-center gap-1 px-2 py-1 bg-white border border-[var(--ink)] rounded-full text-sm hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                <span>{chip.label}</span>
                <X className="w-3 h-3 text-[var(--muted)] group-hover:text-red-500" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Collapsible Filter Sections */}
      <div className="border-2 border-[var(--ink)] rounded-lg overflow-hidden bg-white">
        <FilterSection title="Cuisine Type" section="cuisine" count={activeCounts.cuisine}>
          <div className="flex flex-wrap gap-2">
            {CUISINE_TYPES.map(cuisine => (
              <button
                key={cuisine}
                onClick={() => onFilterChange("cuisine", cuisine)}
                className={`px-3 py-1 text-sm rounded-full border-2 transition-colors ${
                  filters.cuisine.includes(cuisine)
                    ? "bg-[var(--sky)] border-[var(--sky)] text-white"
                    : "bg-white border-[var(--ink)]/30 hover:border-[var(--ink)] hover:bg-[var(--stone)]"
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Dietary Options" section="dietary" count={activeCounts.dietary}>
          <div className="flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map(option => (
              <button
                key={option.id}
                onClick={() => onFilterChange("dietary", option.id)}
                className={`px-3 py-1 text-sm rounded-full border-2 transition-colors ${
                  filters.dietary.includes(option.id)
                    ? "bg-[var(--lime)] border-[var(--lime)] text-[var(--ink)]"
                    : "bg-white border-[var(--ink)]/30 hover:border-[var(--ink)] hover:bg-[var(--stone)]"
                }`}
              >
                {option.emoji} {option.label}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Service Type" section="service" count={activeCounts.service}>
          <div className="flex flex-wrap gap-2">
            {SERVICE_OPTIONS.map(service => (
              <button
                key={service}
                onClick={() => onFilterChange("service", service)}
                className={`px-3 py-1 text-sm rounded-full border-2 transition-colors ${
                  filters.service.includes(service)
                    ? "bg-[var(--coral)] border-[var(--coral)] text-white"
                    : "bg-white border-[var(--ink)]/30 hover:border-[var(--ink)] hover:bg-[var(--stone)]"
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Catering Options" section="catering" count={activeCounts.catering}>
          <div className="flex flex-wrap gap-2">
            {CATERING_OPTIONS.map(option => (
              <button
                key={option}
                onClick={() => onFilterChange("catering", option)}
                className={`px-3 py-1 text-sm rounded-full border-2 transition-colors ${
                  filters.catering.includes(option)
                    ? "bg-[var(--gold)] border-[var(--gold)] text-[var(--ink)]"
                    : "bg-white border-[var(--ink)]/30 hover:border-[var(--ink)] hover:bg-[var(--stone)]"
                }`}
              >
                🎉 {option}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Neighborhood" section="neighborhood" count={activeCounts.neighborhood}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {NEIGHBORHOODS.map(neighborhood => (
              <button
                key={neighborhood}
                onClick={() => onFilterChange("neighborhood", neighborhood)}
                className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-colors text-left ${
                  filters.neighborhood.includes(neighborhood)
                    ? "bg-[var(--ink)] border-[var(--ink)] text-white"
                    : "bg-white border-[var(--ink)]/30 hover:border-[var(--ink)] hover:bg-[var(--stone)]"
                }`}
              >
                {neighborhood}
              </button>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
