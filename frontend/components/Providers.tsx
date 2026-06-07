/**
 * Providers Component - New Era Supermercado
 * 
 * Componente que envuelve la aplicación con todos los providers necesarios:
 * - ThemeProvider: Manejo de tema claro/oscuro (forzado a light actualmente)
 * - CartProvider: Estado global del carrito de compras
 * 
 * @module components/Providers
 */

'use client';

import { ThemeProvider } from 'next-themes';
import { CartProvider } from '@/context/CartContext';
import type { ReactNode } from 'react';

/**
 * Componente de providers para la aplicación.
 * 
 * Debe envolver el layout raíz para proporcionar contextos globales
 * a toda la aplicación.
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - Componentes hijos de la app
 * @returns {JSX.Element}
 * 
 * @example
 * // En app/layout.tsx
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="es">
 *       <body>
 *         <Providers>
 *           {children}
 *         </Providers>
 *       </body>
 *     </html>
 *   );
 * }
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false} 
      forcedTheme="light"
    >
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
