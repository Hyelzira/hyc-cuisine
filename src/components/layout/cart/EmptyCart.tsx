import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export function EmptyCart() {
  const { closeCart } = useCart();

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-6">
        <ShoppingBag size={24} className="text-neutral-500" />
      </div>
      <h3 className="font-serif text-2xl text-neutral-100 mb-2">Your order is empty</h3>
      <p className="text-sm text-neutral-500 mb-8 max-w-xs">
        Explore our seasonal menu and add your first dish to begin the experience.
      </p>
      <Link
        to="/menu"
        onClick={closeCart}
        className="btn-outline w-full"
      >
        Browse the menu
      </Link>
    </div>
  );
}