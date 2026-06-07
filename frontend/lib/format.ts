import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from '@/lib/constants';

/** Formatea un precio en pesos colombianos (COP). */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/** Calcula el costo de envío según el subtotal del carrito. */
export function getShippingCost(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
}

/** Calcula el total del pedido (subtotal + envío). */
export function getOrderTotal(subtotal: number): number {
  return subtotal + getShippingCost(subtotal);
}
