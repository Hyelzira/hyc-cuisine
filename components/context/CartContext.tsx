import { createContext, useContext, useReducer, useEffect, useState, type ReactNode } from 'react';
import type { Dish } from '../../types/menu';
import type { CartItem } from '../../types/cart';

interface CartContextValue {
  items: CartItem[];
  addItem: (dish: Dish, quantity?: number) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  // Drawer state
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

type Action =
  | { type: 'ADD'; dish: Dish; quantity: number }
  | { type: 'REMOVE'; dishId: string }
  | { type: 'UPDATE_QTY'; dishId: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: CartItem[] };

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((i) => i.dish.id === action.dish.id);
      if (existing) {
        return state.map((i) =>
          i.dish.id === action.dish.id ? { ...i, quantity: i.quantity + action.quantity } : i
        );
      }
      return [...state, { dish: action.dish, quantity: action.quantity }];
    }
    case 'REMOVE':
      return state.filter((i) => i.dish.id !== action.dishId);
    case 'UPDATE_QTY':
      return action.quantity <= 0
        ? state.filter((i) => i.dish.id !== action.dishId)
        : state.map((i) =>
            i.dish.id === action.dishId ? { ...i, quantity: action.quantity } : i
          );
    case 'CLEAR':
      return [];
    case 'HYDRATE':
      return action.items;
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isCartOpen, setIsCartOpen] = useState(false); // NEW: Drawer state

  useEffect(() => {
    const saved = localStorage.getItem('hyc-cart');
    if (saved) {
      try {
        dispatch({ type: 'HYDRATE', items: JSON.parse(saved) });
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hyc-cart', JSON.stringify(items));
  }, [items]);

  const subtotal = items.reduce((sum, i) => sum + i.dish.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem: (dish, quantity = 1) => {
          dispatch({ type: 'ADD', dish, quantity });
          setIsCartOpen(true); // Automatically open drawer when adding an item!
        },
        removeItem: (dishId) => dispatch({ type: 'REMOVE', dishId }),
        updateQuantity: (dishId, quantity) => dispatch({ type: 'UPDATE_QTY', dishId, quantity }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        subtotal,
        itemCount,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}