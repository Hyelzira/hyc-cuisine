import { NavLink } from 'react-router-dom';

interface MobileMenuProps {
  links: { to: string; label: string; end?: boolean }[];
  onClose: () => void;
}

export function MobileMenu({ links, onClose }: MobileMenuProps) {
  return (
    <div className="md:hidden absolute top-20 left-0 w-full bg-ink border-b border-neutral-800 shadow-xl">
      <ul className="flex flex-col px-6 py-4 space-y-4">
        {links.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.end}
              onClick={onClose}
              className={({ isActive }) =>
                `block text-sm tracking-widest uppercase transition-colors duration-300 ${
                  isActive ? 'text-amber-400' : 'text-neutral-300 hover:text-amber-400'
                }`
              }
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}