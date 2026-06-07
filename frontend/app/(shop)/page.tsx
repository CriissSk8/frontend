'use client';

import { useCallback, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import ProductsGrid from '@/components/ProductsGrid';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategorySelect = useCallback((categoryId: string | null) => {
    setSelectedCategory(categoryId);
  }, []);

  return (
    <>
      <Header onSearch={handleSearch} />
      <Hero />
      <Categories
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <ProductsGrid searchQuery={searchQuery} selectedCategory={selectedCategory} />
    </>
  );
}
