import { Link } from 'react-router-dom';
import { restaurantInfo } from '../../data/restaurantInfo';

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-ink py-12 mt-auto">
      <div className="section-container grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div>
          <h3 className="font-serif text-2xl tracking-widest text-neutral-100 mb-4">
            {restaurantInfo.shortName}
          </h3>
          <p className="text-neutral-400 text-sm max-w-xs">
            {restaurantInfo.tagline}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="eyebrow mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>{restaurantInfo.address}</li>
            <li>
              <a href={`tel:${restaurantInfo.phone}`} className="hover:text-amber-400 transition-colors">
                {restaurantInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${restaurantInfo.email}`} className="hover:text-amber-400 transition-colors">
                {restaurantInfo.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="eyebrow mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link to="/menu" className="hover:text-amber-400 transition-colors">Menu</Link></li>
            <li><Link to="/dining" className="hover:text-amber-400 transition-colors">Dining Spaces</Link></li>
            <li><Link to="/reservation" className="hover:text-amber-400 transition-colors">Reservations</Link></li>
          </ul>
        </div>

      </div>
      
      <div className="section-container mt-12 pt-6 border-t border-neutral-800 text-xs text-neutral-500 text-center">
        &copy; {new Date().getFullYear()} {restaurantInfo.name}. All rights reserved.
      </div>
    </footer>
  );
}