import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../../lib/formatCurrency';
import type { CartItem as CartItemType } from '../../types/cart';

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-neutral-800 py-5 last:border-b-0">
      {item.dish.image && (
        <div className="w-20 h-24 shrink-0 overflow-hidden bg-neutral-900">
          <img
            src={item.dish.image}
            alt={item.dish.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-serif text-lg leading-tight text-neutral-100">
              {item.dish.name}
            </h4>
            <span className="text-sm font-medium text-amber-400 whitespace-nowrap">
              {formatCurrency(item.dish.price * item.quantity)}
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
            {item.dish.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-neutral-700">
            <button
              onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
              className="p-1.5 text-neutral-400 hover:text-amber-400 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm text-neutral-200">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
              className="p-1.5 text-neutral-400 hover:text-amber-400 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeItem(item.dish.id)}
            className="text-neutral-500 hover:text-red-400 transition-colors p-1"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}