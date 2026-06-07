/**
 * Header Component - New Era Supermercado
 * 
 * Barra de navegación principal con:
 * - Logo del supermercado
 * - Barra de búsqueda con debounce
 * - Botón de carrito con contador de items
 * - Links de autenticación
 * - Efecto de sombra al hacer scroll
 * 
 * @module components/Header
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import CartDrawer from '@/components/CartDrawer';
import { useCart } from '@/context/CartContext';
import { useDebounce } from '@/hooks/useDebounce';

/**
 * Props del componente Header.
 */
interface HeaderProps {
  /** Callback que se ejecuta cuando el usuario busca productos */
  onSearch?: (query: string) => void;
}

/**
 * Componente de encabezado principal de la aplicación.
 * 
 * Incluye navegación, búsqueda, y acceso al carrito.
 * 
 * @param {HeaderProps} props
 * @returns {JSX.Element}
 */
export default function Header({ onSearch }: HeaderProps) {
  const { totalItems, setIsOpen } = useCart();
  const [searchInput, setSearchInput] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const debouncedSearch = useDebounce(searchInput, 300);

  // Detectar scroll para aplicar sombra al header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ejecutar búsqueda cuando el input debouncedo cambie
  useEffect(() => {
    onSearch?.(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200'
            : 'bg-white'
        }`}
      >
        <div className="bg-[#1c6554] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-9 text-xs">
              <span className="flex items-center gap-1.5">
                <LocationIcon />
                Envíos gratis en compras mayores a $50.000
              </span>
              <div className="hidden sm:flex items-center gap-4">
                <Link href="/auth" className="hover:text-white/80 transition-colors">
                  Iniciar sesión
                </Link>
                <Link href="/auth?mode=register" className="hover:text-white/80 transition-colors">
                  Registrarse
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 sm:gap-6 h-18 sm:h-22">
            <Logo size="lg" className="flex-shrink-0" />

            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Buscar productos, marcas..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full h-11 pl-11 pr-4 border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#1c6554] focus:ring-2 focus:ring-[#1c6554]/20 transition-all"
                  aria-label="Buscar productos"
                />
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    aria-label="Limpiar búsqueda"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="relative flex items-center gap-2 px-3 sm:px-4 h-11 bg-[#1c6554] hover:bg-[#1c6554]/90 text-white transition-all shadow-md hover:shadow-lg"
                aria-label="Abrir carrito de compras"
              >
                <CartIcon />
                <span className="hidden sm:inline text-sm font-medium">Carrito</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer />
    </>
  );
}

/**
 * Icono de ubicación/localización.
 * @returns {JSX.Element}
 */
function LocationIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  );
}

/**
 * Icono de búsqueda/lupa.
 * @returns {JSX.Element}
 */
function SearchIcon() {
  return (
    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

/**
 * Icono de cerrar/X.
 * @returns {JSX.Element}
 */
function CloseIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/**
 * Icono de carrito de compras.
 * @returns {JSX.Element}
 */
function CartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  );
}
