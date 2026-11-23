import { diningSpaces } from '../data/dining';

export function DiningPage() {
  return (
    <div className="pt-32 pb-24">
      <header className="section-container text-center mb-20">
        <p className="eyebrow mb-4">The Spaces</p>
        <h1 className="heading-section">Where you dine</h1>
        <p className="text-neutral-400 mt-4 max-w-xl mx-auto">
          Each room is designed to frame the plate — quiet, warm, and unhurried.
        </p>
      </header>

      {diningSpaces.map((space, idx) => (
        <section
          key={space.id}
          className={`grid md:grid-cols-2 min-h-[70vh] ${
            idx % 2 === 1 ? 'md:[direction:rtl]' : ''
          }`}
        >
          <div className="relative h-80 md:h-auto">
            <img
              src={space.image}
              alt={space.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 md:px-16 py-20 bg-neutral-900 [direction:ltr]">
            <p className="eyebrow mb-4">{space.type}</p>
            <h2 className="heading-section mb-6">{space.name}</h2>
            <p className="text-neutral-400 leading-relaxed mb-6">{space.description}</p>
            <dl className="space-y-2 text-sm mb-8">
              <div className="flex gap-3">
                <dt className="text-neutral-500 w-24">Seats</dt>
                <dd className="text-neutral-200">{space.capacity}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-neutral-500 w-24">Availability</dt>
                <dd className="text-neutral-200">{space.hours}</dd>
              </div>
            </dl>
          </div>
        </section>
      ))}
    </div>
  );
}