'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/api';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  searchQuery: string;
  selectedCategory: string | null;
}

const SKELETON_COUNT = 10;

export default function ProductsGrid({ searchQuery, selectedCategory }: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    getProducts(searchQuery || undefined, selectedCategory || undefined)
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchQuery, selectedCategory]);

  const title = searchQuery
    ? `Resultados para "${searchQuery}"`
    : 'Productos destacados';

  const countLabel = isLoading
    ? 'Cargando...'
    : `${products.length} ${products.length === 1 ? 'producto' : 'productos'}`;

  return (
    <section className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-900" id="products-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{countLabel}</p>
        </header>

        {isLoading ? (
          <ProductSkeletonGrid />
        ) : products.length === 0 ? (
          <EmptyProducts />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <div className="aspect-square bg-slate-100 dark:bg-slate-700 animate-shimmer" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-slate-100 dark:bg-slate-700 animate-shimmer" />
            <div className="h-3 bg-slate-100 dark:bg-slate-700 w-2/3 animate-shimmer" />
            <div className="h-6 bg-slate-100 dark:bg-slate-700 w-1/2 animate-shimmer" />
            <div className="h-10 bg-slate-100 dark:bg-slate-700 animate-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyProducts() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
        <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        No encontramos productos
      </h3>
      <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
        Intenta con otra búsqueda o explora nuestras categorías
      </p>
    </div>
  );
}
