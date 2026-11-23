import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../../lib/formatCurrency';

export function CartSummary() {
  const { subtotal, closeCart, itemCount } = useCart();

  return (
    <div className="border-t border-neutral-800 bg-ink p-6">
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm text-neutral-400">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-neutral-400">
          <span>Taxes</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="flex justify-between font-serif text-xl text-amber-400 pt-3 border-t border-neutral-800">
          <span>Total</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        onClick={closeCart}
        className="btn-primary w-full text-center block"
      >
        Proceed to Checkout ({itemCount})
      </Link>
      <p className="text-[10px] text-neutral-500 text-center mt-4 uppercase tracking-widest">
        Secure checkout · Payment on collection
      </p>
    </div>
  );
}