import { Link, useLocation } from 'react-router-dom';
import { formatCurrency } from '../lib/formatCurrency';
import { restaurantInfo } from '../data/restaurantInfo';
import { TrackOrderButton } from '../components/TrackOrderButton';
import type { Order } from '../types/order';

export function OrderSuccessPage() {
  const location = useLocation();
  const order = (location.state as { order?: Order } | null)?.order;

  if (!order) {
    return (
      <div className="section-container py-40 text-center max-w-lg mx-auto">
        <p className="eyebrow mb-4">No order</p>
        <h1 className="heading-section mb-6">Nothing to show</h1>
        <p className="text-neutral-400 mb-10">
          This page appears after you place an order.
        </p>
        <Link to="/menu" className="btn-outline">Back to menu</Link>
      </div>
    );
  }

  return (
    <div className="section-container pt-32 pb-24 max-w-2xl">
      <div className="text-center mb-12">
        <p className="eyebrow mb-4">Order confirmed</p>
        <h1 className="heading-section mb-3">Thank you, {order.customer.name.split(' ')[0]}</h1>
        <p className="text-neutral-400">
          Reference <span className="text-amber-400">{order.ref}</span>
        </p>
      </div>

      <div className="border border-neutral-800 p-6 mb-8">
        {order.items.map((i) => (
          <div
            key={i.dish.id}
            className="flex justify-between py-3 border-b border-neutral-800 last:border-b-0"
          >
            <span className="text-neutral-300">
              {i.dish.name} × {i.quantity}
            </span>
            <span className="text-neutral-400">
              {formatCurrency(i.dish.price * i.quantity)}
            </span>
          </div>
        ))}
        <div className="flex justify-between pt-4 font-serif text-xl text-amber-400">
          <span>Subtotal</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
      </div>

      <div className="text-sm text-neutral-400 space-y-2 mb-10">
        <p>
          <span className="text-neutral-500">Type:</span>{' '}
          {order.orderType === 'pickup' ? 'Pickup' : 'Dine-in pre-order'}
        </p>
        <p>
          <span className="text-neutral-500">When:</span>{' '}
          {order.pickupDate} at {order.pickupTime}
        </p>
        {order.notes && (
          <p>
            <span className="text-neutral-500">Notes:</span> {order.notes}
          </p>
        )}
        <p className="text-neutral-500 pt-4">
          Our team will contact you at {order.customer.phone} to confirm. If your
          WhatsApp didn't open, message us at{' '}
          <a href={`tel:${restaurantInfo.phone}`} className="text-amber-400">
            {restaurantInfo.phone}
          </a>.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Track Order button added here */}
        <TrackOrderButton trackingId={order.ref} />
        
        <Link to="/menu" className="btn-primary">Order more</Link>
        <Link to="/" className="btn-outline">Back to home</Link>
      </div>
    </div>
  );
}