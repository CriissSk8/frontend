/**
 * Logo Component - New Era Supermercado
 * 
 * Componente de logo con diferentes tamaños y modo solo-icono.
 * Incluye link a la página principal y efecto hover.
 * 
 * @module components/Logo
 */

import Image from 'next/image';
import Link from 'next/link';

/**
 * Props del componente Logo.
 */
interface LogoProps {
  /** Tamaño del logo */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Mostrar solo el icono (sin texto) */
  iconOnly?: boolean;
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * Clases de altura según el tamaño seleccionado.
 */
const SIZE_CLASSES = {
  sm: 'h-9',
  md: 'h-[52px]',
  lg: 'h-[72px]',
  xl: 'h-[90px]',
} as const;

/**
 * Componente de logo de la marca.
 * 
 * Muestra el logo de New Era Supermercado con link a la home.
 * Incluye efecto de escala en hover.
 * 
 * @param {LogoProps} props
 * @returns {JSX.Element}
 * 
 * @example
 * // Logo tamaño mediano (por defecto)
 * <Logo />
 * 
 * // Logo grande
 * <Logo size="lg" />
 * 
 * // Solo icono pequeño
 * <Logo size="sm" iconOnly />
 */
export default function Logo({ size = 'md', iconOnly = false, className = '' }: LogoProps) {
  const heightClass = iconOnly ? SIZE_CLASSES.sm : SIZE_CLASSES[size];

  return (
    <Link href="/" className={`inline-flex items-center group ${className}`}>
      <Image
        src="/logo.png"
        alt="New Era Domicilios"
        width={220}
        height={90}
        priority
        className={`${heightClass} w-auto object-contain transition-transform duration-200 group-hover:scale-105`}
      />
    </Link>
  );
}
