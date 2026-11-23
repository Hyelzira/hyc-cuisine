import { restaurantInfo } from '../data/restaurantInfo';

export function AboutPage() {
  return (
    <div className="pt-32 pb-24 section-container max-w-4xl">
      <header className="text-center mb-16">
        <p className="eyebrow mb-4">Our Story</p>
        <h1 className="heading-section">Hyelzira Haute Cuisine</h1>
        <div className="divider-gold mx-auto mt-8" />
      </header>

      <div className="prose prose-invert max-w-none space-y-6 text-neutral-300 leading-relaxed">
        <p>
          {restaurantInfo.name} was born from a simple conviction: that a meal can be a
          quiet act of care. Every plate that leaves our kitchen carries the season, the
          producer, and the hands that shaped it.
        </p>
        <p>
          Our menu changes with the harvest. We work closely with a small circle of
          growers and fishers, favoring depth of flavor over spectacle and restraint
          over excess.
        </p>
        <p>
          The room is designed to disappear — warm light, soft edges, and a pace that
          lets conversation lead. We hope you leave nourished in more ways than one.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-neutral-800">
        <div>
          <p className="eyebrow mb-3">Address</p>
          <p className="text-neutral-300 text-sm">{restaurantInfo.address}</p>
        </div>
        <div>
          <p className="eyebrow mb-3">Hours</p>
          <p className="text-neutral-300 text-sm">
            {restaurantInfo.hours.lunch}<br />
            {restaurantInfo.hours.dinner}<br />
            Closed {restaurantInfo.hours.closed}
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Contact</p>
          <p className="text-neutral-300 text-sm">
            <a href={`tel:${restaurantInfo.phone}`} className="hover:text-amber-400">
              {restaurantInfo.phone}
            </a>
            <br />
            <a href={`mailto:${restaurantInfo.email}`} className="hover:text-amber-400">
              {restaurantInfo.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}