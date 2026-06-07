import { API_BASE_URL } from '@/lib/constants';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/data/catalog';
import type { Category, Product } from '@/lib/types';

export { formatPrice, getShippingCost, getOrderTotal } from '@/lib/format';

/** URL configurada para la integración con el backend */
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

function simulateNetworkDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getCategories(): Promise<Category[]> {
  await simulateNetworkDelay(100);
  return MOCK_CATEGORIES;

  // Integración real:
  // const res = await fetch(`${getApiBaseUrl()}/categories`, { next: { revalidate: 60 } });
  // if (!res.ok) throw new Error('Error al obtener categorías');
  // const { data } = await res.json();
  // return data;
}

export async function getProducts(
  search?: string,
  categoryId?: string
): Promise<Product[]> {
  await simulateNetworkDelay(150);

  let results = MOCK_PRODUCTS.filter((product) => product.isActive);

  if (categoryId) {
    results = results.filter((product) => product.categoryId === categoryId);
  }

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
