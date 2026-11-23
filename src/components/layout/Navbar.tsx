import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from './../context/CartContext';
import { MobileMenu } from './MobileMenu';
import { restaurantInfo } from '../../data/restaurantInfo';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/dining', label: 'Dining' },
  { to: '/about', label: 'About' },
  { to: '/reservation', label: 'Reservations' },
];

export function Navbar() {
  // Added `openCart` to the destructured values
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-ink/80 backdrop-blur-md border-b border-neutral-800">
      <nav className="section-container h-20 flex items-center justify-between">
        
        {/* ── UPDATED LOGO SECTION ── */}
        <NavLink to="/" className="flex items-center">
          <img 
            src="/assets/hyel.png" // 👈 Replace with your actual image name/extension
            alt={restaurantInfo.name} 
            className="h-10 md:h-12 w-auto object-contain"
          />
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `text-sm tracking-widest uppercase transition-colors duration-300 ${
                    isActive ? 'text-amber-400' : 'text-neutral-300 hover:text-amber-400'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right cluster: cart + mobile toggle */}
        <div className="flex items-center gap-4">
          
          {/* Changed from NavLink to button, added openCart onClick */}
          <button 
            onClick={openCart} 
            className="relative p-2 text-neutral-200 hover:text-amber-400 transition-colors"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-ink text-[10px] font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 text-neutral-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && <MobileMenu links={links} onClose={() => setMobileOpen(false)} />}
    </header>
  );
}