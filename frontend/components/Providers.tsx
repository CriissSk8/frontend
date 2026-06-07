'use client';

import { ThemeProvider } from 'next-themes';
import { CartProvider } from '@/context/CartContext';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
