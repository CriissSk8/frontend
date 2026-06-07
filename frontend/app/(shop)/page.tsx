/**
 * Shop Home Page - New Era Supermercado
 * 
 * Landing page principal de la tienda con:
 * - Banner de promociones activas
 * - Header con búsqueda
 * - Hero carousel
 * - Categorías
 * - Grid de productos
 * 
 * @module app/(shop)/page
 */

'use client';

import { useCallback, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import ProductsGrid from '@/components/ProductsGrid';
import PromotionModal from '@/components/PromotionModal';

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
      {/* Modal de promociones (aparece automáticamente) */}
      <PromotionModal />
      
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
