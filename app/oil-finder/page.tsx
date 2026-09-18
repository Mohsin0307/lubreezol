'use client';

import { useState } from 'react';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Car,
  Truck,
  Bike,
  Bus,
  Tractor,
  Construction,
  type LucideIcon,
} from 'lucide-react';

/**
 * Place this file at: app/oil-finder/page.tsx
 * Linked from the "Lubrezool Oil Finder" card in Highlights.tsx.
 */

interface VehicleType {
  id: string;
  label: string;
  icon: LucideIcon;
}

const VEHICLE_TYPES: VehicleType[] = [
  { id: 'car', label: 'Car', icon: Car },
  { id: 'van', label: 'Van', icon: Truck },
  { id: 'motorcycle', label: 'Motorcycle', icon: Bike },
  { id: 'truck', label: 'Truck', icon: Bus },
  { id: 'tractor', label: 'Tractor', icon: Tractor },
  { id: 'industrial', label: 'Industrial', icon: Construction },
];

// Free-to-use stock photos (Pexels license). Swap for real product/plant photography when ready.
const SLIDES = [
    'sl2.png',
  'https://images.pexels.com/photos/15109994/pexels-photo-15109994.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/185545/pexels-photo-185545.jpeg?auto=compress&cs=tinysrgb&w=1920',
];

export default function OilFinderPage() {
  const [slide, setSlide] = useState(0);
  const [selectedType, setSelectedType] = useState('car');
  const [hsn, setHsn] = useState('');
  const [tsn, setTsn] = useState('');
  const [vehicleQuery, setVehicleQuery] = useState('');

  const nextSlide = () => setSlide((i) => (i + 1) % SLIDES.length);
  const prevSlide = () => setSlide((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  return (
    <main>
      <style>{`
        .lz-panel-bg {
          background:
            radial-gradient(circle at 8px 8px, rgba(255,255,255,0.08) 1px, transparent 1.5px) 0 0/28px 28px,
            linear-gradient(115deg, #0A2E63 0%, #0E4A9E 55%, #1360C4 100%);
        }
      `}</style>

      {/* Hero slider */}
      <section className="relative h-[300px] w-full overflow-hidden sm:h-[360px]">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === slide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[#0A2E63]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E63] via-[#0A2E63]/10 to-transparent" />

        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === slide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Oil finder panel */}
      <section className="lz-panel-bg pb-16 pt-12 text-white">
        <div className="mx-auto max-w-container px-6">
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">Lubrezool Oil Finder</h1>
          <p className="mt-3 max-w-xl text-white/80">
            Find the right engine oil, transmission fluid or service product for your vehicle!
          </p>

          {/* Search row */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 font-display text-lg font-semibold">
                Vehicle registration
                <HelpCircle className="h-4 w-4 text-white/60" aria-hidden />
              </div>
              <div className="mt-3 flex overflow-hidden rounded-md bg-white">
                <input
                  value={hsn}
                  onChange={(e) => setHsn(e.target.value)}
                  placeholder="HSN"
                  className="w-1/2 border-r border-brand-ink/10 px-4 py-3 text-sm text-brand-ink placeholder:text-brand-muted focus:outline-none"
                />
                <div className="flex w-1/2 items-center justify-between px-4 py-3">
                  <input
                    value={tsn}
                    onChange={(e) => setTsn(e.target.value)}
                    placeholder="TSN"
                    className="w-full text-sm text-brand-ink placeholder:text-brand-muted focus:outline-none"
                  />
                  <button
                    aria-label="Look up by registration"
                    className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#0E4A9E] text-[#0E4A9E]"
                  >
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="font-display text-lg font-semibold">Vehicle search</div>
              <div className="mt-3 flex items-center gap-2 rounded-md bg-white px-4 py-3">
                <Search className="h-4 w-4 shrink-0 text-brand-muted" aria-hidden />
                <input
                  value={vehicleQuery}
                  onChange={(e) => setVehicleQuery(e.target.value)}
                  placeholder="Search by make and model"
                  className="w-full text-sm text-brand-ink placeholder:text-brand-muted focus:outline-none"
                />
                <button
                  aria-label="Search"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#0E4A9E] text-[#0E4A9E]"
                >
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            </div>
          </div>

          {/* Vehicle selection */}
          <div className="mt-12">
            <div className="font-display text-lg font-semibold">Vehicle selection</div>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {VEHICLE_TYPES.map((type) => {
                const Icon = type.icon;
                const active = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex h-24 flex-col items-center justify-center gap-2 rounded-md border transition-colors ${
                      active
                        ? 'border-white bg-white text-[#0A2E63]'
                        : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-7 w-7" aria-hidden />
                    <span className="text-[11px] font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}