'use client';

import { useEffect, useRef, useState } from 'react';
import { getCategories } from '@/lib/api';
import { getCategoryEmojiByName } from '@/lib/constants';
import type { Category } from '@/lib/types';

interface CategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function Categories({ selectedCategory, onSelectCategory }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  function updateScrollState() {
    const element = scrollRef.current;
    if (!element) return;
    setCanScrollLeft(element.scrollLeft > 0);
    setCanScrollRight(element.scrollLeft < element.scrollWidth - element.clientWidth - 1);
  }

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [categories]);

  function scroll(direction: 'left' | 'right') {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  }

  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-slate-950" id="categories-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Categorías
          </h2>

          <div className="hidden sm:flex gap-2">
            <ScrollButton direction="left" disabled={!canScrollLeft} onClick={() => scroll('left')} />
            <ScrollButton direction="right" disabled={!canScrollRight} onClick={() => scroll('right')} />
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 pb-2"
        >
          <CategoryButton
            label="Todos"
            emoji="🏪"
            isActive={selectedCategory === null}
            onClick={() => onSelectCategory(null)}
          />

          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              label={category.name}
              emoji={getCategoryEmojiByName(category.name)}
              isActive={selectedCategory === category.id}
              onClick={() =>
                onSelectCategory(selectedCategory === category.id ? null : category.id)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CategoryButtonProps {
  label: string;
  emoji: string;
  isActive: boolean;
  onClick: () => void;
}

function CategoryButton({ label, emoji, isActive, onClick }: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 border font-medium text-sm transition-all ${
        isActive
          ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-sm'
          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-[#2E7D32] hover:text-[#2E7D32] dark:hover:border-[#2E7D32]'
      }`}
    >
      <span className="text-base" aria-hidden="true">{emoji}</span>
      {label}
    </button>
  );
}

function ScrollButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      aria-label={direction === 'left' ? 'Categorías anteriores' : 'Siguientes categorías'}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
        />
      </svg>
    </button>
  );
}
