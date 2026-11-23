interface OrderTypeSelectorProps {
  value: 'pickup' | 'dine-in';
  onChange: (value: 'pickup' | 'dine-in') => void;
}

export function OrderTypeSelector({ value, onChange }: OrderTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => onChange('pickup')}
        className={`py-4 px-6 border text-sm uppercase tracking-widest transition-all duration-300 ${
          value === 'pickup'
            ? 'border-amber-400 bg-amber-400/10 text-amber-400'
            : 'border-neutral-800 text-neutral-400 hover:border-neutral-600'
        }`}
      >
        Pickup
      </button>
      <button
        type="button"
        onClick={() => onChange('dine-in')}
        className={`py-4 px-6 border text-sm uppercase tracking-widest transition-all duration-300 ${
          value === 'dine-in'
            ? 'border-amber-400 bg-amber-400/10 text-amber-400'
            : 'border-neutral-800 text-neutral-400 hover:border-neutral-600'
        }`}
      >
        Dine-in Pre-order
      </button>
    </div>
  );
}