'use client';

import { useMemo, useState, Dispatch, SetStateAction } from 'react';
import { BrandCard } from './components/BrandCard';
import { FilterGroup } from './components/FilterGroup';
import { inspirationRecords, PostFormat } from './data/brands';

const allFormats = Array.from(
  new Set<PostFormat>(inspirationRecords.map((record) => record.postFormat))
);
const allNiches = Array.from(new Set(inspirationRecords.map((record) => record.niche))).sort();
const allTags = Array.from(new Set(inspirationRecords.flatMap((record) => record.tags))).sort();

export default function Page() {
  const [query, setQuery] = useState('');
  const [formats, setFormats] = useState<Set<string>>(new Set());
  const [niches, setNiches] = useState<Set<string>>(new Set());
  const [tags, setTags] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return inspirationRecords.filter((record) => {
      const matchesQuery =
        !q ||
        [
          record.brand,
          record.brandOneLiner,
          record.niche,
          record.location,
          record.standoutIdea,
          record.tags.join(' ')
        ]
          .join(' ')
          .toLowerCase()
          .includes(q);

      const matchesFormats = formats.size === 0 || formats.has(record.postFormat);
      const matchesNiches = niches.size === 0 || niches.has(record.niche);
      const matchesTags =
        tags.size === 0 || record.tags.some((tag) => tags.has(tag));

      return matchesQuery && matchesFormats && matchesNiches && matchesTags;
    });
  }, [formats, niches, tags, query]);

  const handleToggle = (
    setter: Dispatch<SetStateAction<Set<string>>>,
    value: string
  ) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  const hasActiveFilters = formats.size > 0 || niches.size > 0 || tags.size > 0 || query.trim();

  return (
    <main>
      <section className="hero">
        <div className="hero__badge">Micro-brand swipe file</div>
        <h1>Indian Micro Brand Inspiration Index</h1>
        <p>
          12+ swipe-worthy carousels from under-the-radar Indian founders. Each entry is vetted for
          creative storytelling, clever formatting and context so you can reverse engineer the next
          deck, carousel or pitch.
        </p>
      </section>

      <section className="filters">
        <label htmlFor="search" className="visually-hidden">
          Search brands and posts
        </label>
        <div className="filters__search-wrapper">
          <svg
            aria-hidden
            focusable="false"
            viewBox="0 0 24 24"
            className="filters__search-icon"
          >
            <path
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
          <input
            id="search"
            type="search"
            placeholder="Search by brand, niche or idea"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button type="button" className="filters__clear" onClick={() => setQuery('')}>
              Clear
            </button>
          )}
        </div>

        <div className="filters__groups">
          <FilterGroup
            title="Format"
            options={allFormats.map((format) => ({ id: format, label: format }))}
            selected={formats}
            onToggle={(value) => handleToggle(setFormats, value)}
          />
          <FilterGroup
            title="Niche"
            options={allNiches.map((niche) => ({ id: niche, label: niche }))}
            selected={niches}
            onToggle={(value) => handleToggle(setNiches, value)}
          />
          <FilterGroup
            title="Tags"
            options={allTags.map((tag) => ({ id: tag, label: tag }))}
            selected={tags}
            onToggle={(value) => handleToggle(setTags, value)}
          />
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            className="filters__reset"
            onClick={() => {
              setFormats(new Set());
              setNiches(new Set());
              setTags(new Set());
              setQuery('');
            }}
          >
            Reset filters
          </button>
        )}
      </section>

      <section className="results-meta">
        <p>
          Showing <strong>{filtered.length}</strong> of {inspirationRecords.length} inspiration drops.
        </p>
        <p className="results-meta__hint">
          Tip: open posts on desktop to screenshot slides, or paste URLs into your favourite swipe file tool.
        </p>
      </section>

      <section className="brand-grid">
        {filtered.map((record) => (
          <BrandCard key={record.id} record={record} />
        ))}
        {filtered.length === 0 && (
          <div className="brand-grid__empty">
            <h3>No matches yet</h3>
            <p>Try clearing a filter or using a broader search term.</p>
          </div>
        )}
      </section>
    </main>
  );
}
