import { Link } from 'react-router-dom';
import { menu } from '../data/menu';
import { diningSpaces } from '../data/dining';
import { restaurantInfo } from '../data/restaurantInfo';
import { formatCurrency } from '../lib/formatCurrency'; 
import { useMediaQuery } from '../hooks/useMediaQuery'; 

export function HomePage() {
  const signatures = menu.filter((d) => d.isSignature).slice(0, 3);
  const heroSpace = diningSpaces[0];
  
  // Check if the screen is desktop sized (768px or wider)
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* Conditional Background: Video on Desktop, Image on Mobile */}
        {isDesktop ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/dining.jpg" 
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/assets/dine.mp4" type="video/mp4" /> 
          </video>
        ) : (
          <img
            src="/assets/dining.jpg" 
            alt="HYC dining room"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-ink/65" />
        
        {/* Text Content */}
        <div className="relative text-center section-container animate-fade-up pt-20 z-10">
          <p className="eyebrow mb-6">{restaurantInfo.name}</p>
          <h1 className="heading-display text-shadow-soft mb-8">
            A modern dining<br />experience
          </h1>
          <p className="max-w-xl mx-auto text-neutral-300 mb-10">
            {restaurantInfo.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu" className="btn-primary">Explore the menu</Link>
            <Link to="/reservation" className="btn-outline">Reserve a table</Link>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="section-container py-24 text-center max-w-3xl mx-auto">
        <p className="eyebrow mb-6">Our Philosophy</p>
        <div className="divider-gold mx-auto mb-8" />
        <p className="font-serif text-2xl md:text-3xl leading-relaxed text-neutral-200">
          We source with intention, cook with restraint, and serve with reverence —
          a quiet celebration of seasonal ingredients at their peak.
        </p>
      </section>

      {/* ── DINING SPACE PREVIEW ── */}
      {heroSpace && (
        <section className="grid md:grid-cols-2 min-h-[70vh]">
          <div className="relative h-80 md:h-auto">
            <img
              src="/assets/mainhall.jpg" 
              alt={heroSpace.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 md:px-16 py-20 bg-neutral-900">
            <p className="eyebrow mb-4">The Room</p>
            <h2 className="heading-section mb-6">{heroSpace.name}</h2>
            <p className="text-neutral-400 leading-relaxed mb-8">{heroSpace.description}</p>
            <Link to="/dining" className="btn-ghost">Discover the space →</Link>
          </div>
        </section>
      )}

      {/* ── SIGNATURE DISHES ── */}
      <section className="section-container py-24">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Signature</p>
          <h2 className="heading-section">From the kitchen</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {signatures.map((dish) => (
            <Link
              to="/menu"
              key={dish.id}
              className="group block overflow-hidden"
            >
              <div className="aspect-square overflow-hidden mb-6 bg-neutral-900">
                <img
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-2xl mb-2">{dish.name}</h3>
              <p className="text-sm text-neutral-400 mb-3 line-clamp-2">{dish.description}</p>
              <span className="text-amber-400 text-sm">{formatCurrency(dish.price)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── RESERVATION CTA ── */}
      <section className="section-container py-24 text-center border-t border-neutral-800">
        <h2 className="heading-section mb-6">Join us at the table</h2>
        <p className="text-neutral-400 mb-10 max-w-lg mx-auto">
          {restaurantInfo.hours.dinner}. Reservations recommended.
        </p>
        <Link to="/reservation" className="btn-primary">Make a reservation</Link>
      </section>
    </>
  );
}