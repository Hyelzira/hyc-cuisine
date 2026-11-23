import { ShieldCheck } from 'lucide-react';

export function PaymentSection() {
  return (
    <div className="border border-neutral-800 p-6 bg-neutral-900/50">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-ink rounded-full shrink-0">
          <ShieldCheck className="text-amber-400" size={24} />
        </div>
        <div>
          <h3 className="font-serif text-lg text-neutral-100 mb-1">
            Payment on Collection
          </h3>
          <p className="text-sm text-neutral-400 leading-relaxed">
            We do not require payment online. Our team will confirm your order via phone or WhatsApp. 
            Payment can be made upon collection or at the table.
          </p>
        </div>
      </div>
    </div>
  );
}