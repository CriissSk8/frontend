/** Colores corporativos de New Era Supermercado */
export const BRAND = {
  blue: '#0C447C',
  green: '#2E7D32',
} as const;

/** Umbral de envío gratis en COP */
export const FREE_SHIPPING_THRESHOLD = 50_000;

/** Costo de envío estándar en COP */
export const STANDARD_SHIPPING_COST = 5_000;

/** Clave de persistencia del carrito en localStorage */
export const CART_STORAGE_KEY = 'new-era-cart';

/** URL base de la API (configurable vía entorno) */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

/** Emojis representativos por ID de categoría */
export const CATEGORY_EMOJIS_BY_ID: Record<string, string> = {
  'cat-1': '🥬',
  'cat-2': '🥛',
  'cat-3': '🥩',
  'cat-4': '🍞',
  'cat-5': '🥤',
  'cat-6': '🫘',
  'cat-7': '🍪',
  'cat-8': '🧹',
};

/** Emojis representativos por nombre de categoría */
export const CATEGORY_EMOJIS_BY_NAME: Record<string, string> = {
  'Frutas y Verduras': '🥬',
  'Lácteos y Huevos': '🥛',
  'Carnes y Pescados': '🥩',
  Panadería: '🍞',
  Bebidas: '🥤',
  Despensa: '🫘',
  'Snacks y Dulces': '🍪',
  'Limpieza y Hogar': '🧹',
};

export const DEFAULT_CATEGORY_EMOJI = '📦';

export function getCategoryEmoji(categoryId: string): string {
  return CATEGORY_EMOJIS_BY_ID[categoryId] ?? DEFAULT_CATEGORY_EMOJI;
}

export function getCategoryEmojiByName(name: string): string {
  return CATEGORY_EMOJIS_BY_NAME[name] ?? DEFAULT_CATEGORY_EMOJI;
}
