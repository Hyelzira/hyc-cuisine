import { Link } from 'react-router-dom';
import { X, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../../lib/formatCurrency';

export function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, subtotal } = useCart();

  // If your CartContext doesn't have isCartOpen yet, you can temporarily hide this
  // by adding `const isCartOpen = false;` just to get things compiling.
  
  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-neutral-900 z-50 shadow-2xl flex flex-col animate-slide-in">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <h2 className="font-serif text-2xl text-neutral-100">Your Order</h2>
          <button onClick={closeCart} className="text-neutral-400 hover:text-amber-400">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-neutral-500 text-center mt-10">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.dish.id} className="flex gap-4 border-b border-neutral-800 pb-6">
                  {item.dish.image && (
                    <img 
                      src={item.dish.image} 
                      alt={item.dish.name} 
                      className="w-20 h-20 object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-serif text-lg text-neutral-100">{item.dish.name}</h4>
                    <p className="text-amber-400 text-sm mt-1">{formatCurrency(item.dish.price)}</p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-neutral-700">
                        <button onClick={() => updateQuantity(item.dish.id, item.quantity - 1)} className="px-2 py-1 text-neutral-400 hover:text-amber-400">-</button>
                        <span className="px-2 text-sm text-neutral-200">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.dish.id, item.quantity + 1)} className="px-2 py-1 text-neutral-400 hover:text-amber-400">+</button>
                      </div>
                      <button onClick={() => removeItem(item.dish.id)} className="text-neutral-500 hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-neutral-800 bg-neutral-900">
            <div className="flex justify-between font-serif text-xl text-amber-400 mb-6">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <Link to="/checkout" onClick={closeCart} className="btn-primary w-full text-center block">
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}