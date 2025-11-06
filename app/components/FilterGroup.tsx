'use client';

import clsx from 'clsx';

type Option = {
  id: string;
  label: string;
};

interface FilterGroupProps {
  title: string;
  options: Option[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}

export function FilterGroup({ title, options, selected, onToggle }: FilterGroupProps) {
  return (
    <div className="filter-group">
      <h4>{title}</h4>
      <div className="filter-group__options" role="list">
        {options.map((option) => {
          const isActive = selected.has(option.id);
          return (
            <button
              key={option.id}
              type="button"
              className={clsx('chip', 'chip--selectable', { 'chip--active': isActive })}
              aria-pressed={isActive}
              onClick={() => onToggle(option.id)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
