import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="section-container pt-32 pb-24 max-w-6xl mx-auto overflow-hidden">
      
      {/* ── HEADER ── */}
      <header className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <p className="text-xs tracking-[0.2em] uppercase text-amber-400 mb-4">Our Story</p>
        <h1 className="font-serif text-5xl md:text-6xl text-neutral-100 mb-6">
          Hyelzira Haute Cuisine
        </h1>
        <div className="w-16 h-[1px] bg-amber-400 mx-auto opacity-50"></div>
      </header>

      {/* ── FOUNDER & STORY (Split Layout) ── */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
        
        {/* Founder Image Column */}
        <div className="relative group animate-in fade-in slide-in-from-left-8 duration-700">
          {/* Decorative background offset block */}
          <div className="absolute inset-0 border border-amber-400/30 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
          
          {/* The Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-neutral-800">
            {/* 
              IMPORTANT: Add your founder's image to your public/assets folder 
              and change the src below to match the filename! 
            */}
            <img 
              src="/assets/founder.jpg" 
              alt="Founder of Hyelzira Haute Cuisine" 
              className="w-full h-full object-cover grayscale sepia-[0.3] contrast-110 transition-all duration-700 group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-105"
            />
            {/* Subtle vignette overlay */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.6)] pointer-events-none"></div>
          </div>

          {/* Founder Name Tag */}
          <div className="absolute bottom-6 -right-6 bg-neutral-950 border border-neutral-800 px-6 py-3 shadow-xl">
            <p className="font-serif text-lg text-neutral-100">Chef Hyelzira</p>
            <p className="text-[10px] uppercase tracking-widest text-amber-400 mt-1">Founder & Head Chef</p>
          </div>
        </div>

        {/* Story Text Column */}
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
          <p className="text-neutral-300 text-lg leading-relaxed font-light">
            Hyelzira Haute Cuisine was born from a simple conviction: that a meal can be a quiet act of care. Every plate that leaves our kitchen carries the season, the producer, and the hands that shaped it.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            Our menu changes with the harvest. We work closely with a small circle of growers and fishers, favoring depth of flavor over spectacle and restraint over excess. It is a return to the roots of cooking—slow, deliberate, and deeply personal.
          </p>
          
          {/* Pull Quote / Philosophy */}
          <blockquote className="border-l-2 border-amber-400 pl-6 my-10">
            <p className="font-serif text-2xl text-neutral-200 italic leading-snug">
              "The room is designed to disappear — warm light, soft edges, and a pace that lets conversation lead."
            </p>
          </blockquote>
          
          <p className="text-neutral-400 leading-relaxed">
            We hope you leave nourished in more ways than one. Whether you are joining us for a quick bite or our signature tasting menu, you are part of our story.
          </p>
        </div>
      </div>

      {/* ── FOOTER / CALL TO ACTION ── */}
      <div className="text-center border-t border-neutral-800/50 pt-16 mt-16 animate-in fade-in duration-1000 delay-300">
        <p className="text-sm text-neutral-500 mb-8">
          Taste the story for yourself. Explore our seasonal offerings.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/menu" className="btn-primary">
            View The Menu
          </Link>
          <Link to="/reservation" className="btn-outline">
            Make a Reservation
          </Link>
        </div>
      </div>

    </div>
  );
}