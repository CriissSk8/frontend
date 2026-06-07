/**
 * API Client Module - New Era Supermercado
 * 
 * Este módulo maneja todas las peticiones al backend.
 * Actualmente usa datos mock para desarrollo, pero incluye comentarios
 * que muestran cómo integrar con el backend real.
 * 
 * @module lib/api
 */

import { API_BASE_URL } from '@/lib/constants';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/data/catalog';
import type { Category, Product } from '@/lib/types';

// Re-exportar funciones de formateo para conveniencia
export { formatPrice, getShippingCost, getOrderTotal } from '@/lib/format';

/**
 * Obtiene la URL base configurada para el API del backend.
 * 
 * @returns {string} URL base del API (ej: 'http://localhost:4000/api')
 */
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

/**
 * Simula un delay de red para dar realismo a las peticiones mock.
 * Útil durante desarrollo para testear estados de carga.
 * 
 * @param {number} ms - Milisegundos de delay
 * @returns {Promise<void>}
 * @private
 */
function simulateNetworkDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Obtiene todas las categorías de productos disponibles.
 * 
 * **Nota:** Actualmente retorna datos mock. Ver comentarios en el código
 * para la implementación real con el backend.
 * 
 * @returns {Promise<Category[]>} Lista de categorías
 * @throws {Error} Si la petición al backend falla
 * 
 * @example
 * const categories = await getCategories();
 * console.log(categories); // [{ id: '1', name: 'Frutas y Verduras' }, ...]
 */
export async function getCategories(): Promise<Category[]> {
  await simulateNetworkDelay(100);
  return MOCK_CATEGORIES;

  // Integración real:
  // const res = await fetch(`${getApiBaseUrl()}/categories`, { next: { revalidate: 60 } });
  // if (!res.ok) throw new Error('Error al obtener categorías');
  // const { data } = await res.json();
  // return data;
}

/**
 * Obtiene productos con filtros opcionales de búsqueda y categoría.
 * 
 * - Si no se pasan filtros, retorna todos los productos activos
 * - Solo retorna productos con `isActive: true`
 * - La búsqueda es case-insensitive y busca en nombre y descripción
 * 
 * **Nota:** Actualmente usa filtrado local de datos mock. Ver comentarios
 * en el código para la implementación real con el backend.
 * 
 * @param {string} [search] - Término de búsqueda (opcional)
 * @param {string} [categoryId] - ID de categoría para filtrar (opcional)
 * @returns {Promise<Product[]>} Lista de productos filtrados
 * @throws {Error} Si la petición al backend falla
 * 
 * @example
 * // Obtener todos los productos
 * const allProducts = await getProducts();
 * 
 * // Buscar por término
 * const results = await getProducts('manzana');
 * 
 * // Filtrar por categoría
 * const frutas = await getProducts(undefined, 'cat-1');
 * 
 * // Combinar búsqueda y categoría
 * const frutasFrescas = await getProducts('frescas', 'cat-1');
 */
export async function getProducts(
  search?: string,
  categoryId?: string
): Promise<Product[]> {
  await simulateNetworkDelay(150);

  // Filtrar solo productos activos
  let results = MOCK_PRODUCTS.filter((product) => product.isActive);

  // Aplicar filtro de categoría
  if (categoryId) {
    results = results.filter((product) => product.categoryId === categoryId);
  }

  // Aplicar búsqueda por texto
  if (search) {
    const query = search.toLowerCase().trim();
    results = results.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
    );
  }

  return results;

  // Integración real:
  // const params = new URLSearchParams();
  // if (search) params.set('search', search);
  // if (categoryId) params.set('categoryId', categoryId);
  // const res = await fetch(`${getApiBaseUrl()}/products?${params}`, { next: { revalidate: 30 } });
  // if (!res.ok) throw new Error('Error al obtener productos');
  // const { data } = await res.json();
  // return data;
}
