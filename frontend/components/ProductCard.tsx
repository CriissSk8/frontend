'use client';

import { useCart } from '@/context/CartContext';
import { getCategoryEmoji } from '@/lib/constants';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find((item) => item.product.id === product.id);
  const isInCart = Boolean(cartItem);
  const isOutOfStock = product.stock <= 0;

  return (
    <article className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-square bg-slate-50 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
        <span className="text-7xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
          {getCategoryEmoji(product.categoryId)}
        </span>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <span className="px-4 py-2 bg-red-500 text-white text-sm font-semibold">Agotado</span>
          </div>
        )}

        {product.stock > 0 && product.stock <= 10 && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold">
            ¡Solo {product.stock}!
          </div>
        )}

        {product.category && !isOutOfStock && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-xs font-medium text-slate-600 dark:text-slate-400">
            {product.category.name}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2 leading-snug min-h-[2.5rem]">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
            {product.description}
          </p>
        )}

        <div className="mt-3">
          <p className="text-xl font-bold text-[#2E7D32] dark:text-green-400">
            {formatPrice(product.price)}
          </p>
          {product.stock > 10 && (
            <p className="text-xs text-slate-400 mt-0.5">Disponible</p>
          )}
        </div>

        <div className="mt-4">
          {isOutOfStock ? (
            <button
              type="button"
              disabled
              className="w-full py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-400 text-sm font-medium cursor-not-allowed"
            >
              Sin stock
            </button>
          ) : isInCart && cartItem ? (
            <QuantityControls
              quantity={cartItem.quantity}
              maxQuantity={product.stock}
              onDecrease={() => updateQuantity(product.id, cartItem.quantity - 1)}
              onIncrease={() => updateQuantity(product.id, cartItem.quantity + 1)}
            />
          ) : (
            <button
              type="button"
              onClick={() => addItem(product)}
              className="w-full py-2.5 bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-white text-sm font-semibold transition-all hover-lift flex items-center justify-center gap-2"
            >
              <PlusIcon />
              Agregar
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

interface QuantityControlsProps {
  quantity: number;
  maxQuantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

function QuantityControls({ quantity, maxQuantity, onDecrease, onIncrease }: QuantityControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrease}
        className="flex-1 py-2.5 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors"
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <span className="w-12 text-center font-bold text-slate-900 dark:text-white">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= maxQuantity}
        className="flex-1 py-2.5 bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}
