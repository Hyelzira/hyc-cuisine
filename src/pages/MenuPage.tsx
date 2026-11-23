import { useState } from 'react';
import { useCart } from '../components/context/CartContext';
import { useToast } from '../components/context/ToastContext';
import { menu } from '../data/menu';
import { formatCurrency } from '../lib/formatCurrency';
import type { MenuCategory, Dish } from '../types/menu';

const categories: { key: MenuCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'starters', label: 'Starters' },
  { key: 'mains', label: 'Mains' },
  { key: 'desserts', label: 'Desserts' },
  { key: 'tasting-menu', label: 'Tasting Menu' },
  { key: 'beverages', label: 'Beverages' },
];

export function MenuPage() {
  const [active, setActive] = useState<MenuCategory | 'all'>('all');
  const { addItem } = useCart();
  const { showToast } = useToast();

  const filtered =
    active === 'all' ? menu : menu.filter((d) => d.category === active);

  function handleAddToCart(dish: Dish) {
    addItem(dish);
    showToast(`${dish.name} added to cart!`, 'success');
  }

  return (
    <div className="section-container pt-32 pb-24">
      <header className="text-center mb-16">
        <p className="eyebrow mb-4">The Menu</p>
        <h1 className="heading-section">Hyelzira Haute Cuisine</h1>
        <p className="text-neutral-400 mt-4 max-w-xl mx-auto">
          Seasonal, considered, and served with intention.
        </p>
      </header>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-12 border-b border-neutral-800 pb-4">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`whitespace-nowrap px-4 py-2 text-xs tracking-widest uppercase transition-colors ${
              active === c.key
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Dish list */}
      <div>
        {filtered.map((dish) => (
          <DishRow 
            key={dish.id} 
            dish={dish} 
            onAdd={() => handleAddToCart(dish)} 
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-neutral-500 py-16">No dishes in this category yet.</p>
        )}
      </div>
    </div>
  );
}

function DishRow({ dish, onAdd }: { dish: Dish; onAdd: () => void }) {
  return (
    <article className="dish-row group my-4">
      
      <div className="w-full md:w-48 h-48 md:h-40 overflow-hidden flex-shrink-0 mb-6 md:mb-0 md:mr-6">
        {dish.image && (
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <h3 className="font-serif text-2xl text-neutral-100">
              {dish.name}
              {dish.isSignature && (
                <span className="ml-3 text-xs uppercase tracking-widest text-amber-400">
                  Signature
                </span>
              )}
            </h3>
            <span className="font-serif text-xl text-amber-400 whitespace-nowrap">
              {formatCurrency(dish.price)}
            </span>
          </div>
          <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{dish.description}</p>
          {dish.requiresAdvanceNotice && (
            <p className="mt-2 text-xs text-neutral-500">
              Requires {dish.requiresAdvanceNotice}h advance notice
            </p>
          )}
        </div>
        
        <div className="mt-6">
          <button
            onClick={onAdd}
            disabled={!dish.isAvailable}
            className="btn-outline text-xs px-5 py-2"
          >
            {dish.isAvailable ? 'Add to order' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  );
}