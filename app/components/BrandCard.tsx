'use client';

import { InspirationRecord } from '@/app/data/brands';
import clsx from 'clsx';

interface BrandCardProps {
  record: InspirationRecord;
}

const badgeColors: Record<string, string> = {
  Carousel: 'var(--badge-magenta)',
  'Static Post': 'var(--badge-slate)',
  Reel: 'var(--badge-emerald)'
};

export function BrandCard({ record }: BrandCardProps) {
  const {
    brand,
    brandUrl,
    location,
    niche,
    brandOneLiner,
    postUrl,
    platform,
    postFormat,
    postLabel,
    standoutIdea,
    visualHooks,
    swipeNotes,
    tags,
    postedOn
  } = record;

  return (
    <article className="brand-card" aria-labelledby={`${record.id}-title`}>
      <header className="brand-card__header">
        <div>
          <h3 id={`${record.id}-title`}>{brand}</h3>
          <p className="brand-card__subtitle">{location} · {niche}</p>
        </div>
        <div className="brand-card__platform">
          <span className="chip chip--outline">{platform}</span>
          <span
            className="chip"
            style={{
              background: badgeColors[postFormat] ?? 'var(--badge-slate)',
              color: 'var(--text-on-badge)'
            }}
          >
            {postFormat}
          </span>
        </div>
      </header>

      <p className="brand-card__one-liner">{brandOneLiner}</p>

      <p className="brand-card__standout">
        <span className="brand-card__eyebrow">Why it works:</span> {standoutIdea}
      </p>

      <div className="brand-card__lists">
        <div>
          <span className="brand-card__eyebrow">Visual hooks</span>
          <ul>
            {visualHooks.map((hook) => (
              <li key={hook}>{hook}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className="brand-card__eyebrow">Swipe structure</span>
          <ul>
            {swipeNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="brand-card__footer">
        <div className="brand-card__links">
          <a href={brandUrl} target="_blank" rel="noreferrer" className="brand-card__link">
            Visit brand
          </a>
          <span aria-hidden="true">•</span>
          <a href={postUrl} target="_blank" rel="noreferrer" className="brand-card__link">
            Open post
          </a>
        </div>
        <div className="brand-card__meta">
          {postLabel && <span>{postLabel}</span>}
          {postedOn && <span>{new Date(postedOn).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
        </div>
        <div className="brand-card__tags">
          {tags.map((tag) => (
            <span key={tag} className={clsx('chip', 'chip--subtle')}>
              {tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
