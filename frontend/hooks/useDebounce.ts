import { useEffect, useState } from 'react';

/**
 * Retorna un valor debounced que solo se actualiza
 * después de que el usuario deja de cambiar el valor original.
 */
export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
