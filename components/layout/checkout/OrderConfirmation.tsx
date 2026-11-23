import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../lib/formatCurrency';
import type { Order } from '../../types/order';

export function OrderConfirmation({ order }: { order: Order }) {
  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="text-center mb-12">
        <p className="eyebrow mb-4">Order Confirmed</p>
        <h1 className="heading-section mb-3">
          Thank you, {order.customer.name.split(' ')[0]}
        </h1>
        <p className="text-neutral-400">
          Reference <span className="text-amber-400 font-medium">{order.ref}</span>
        </p>
      </div>

      <div className="border border-neutral-800 p-8 mb-8 bg-neutral-900/30">
        <h3 className="font-serif text-xl mb-6 border-b border-neutral-800 pb-4">Order Details</h3>
        <div className="space-y-4 mb-6">
          {order.items.map((item: Order['items'][number]) => (
            <div key={item.dish.id} className="flex justify-between text-sm">
              <span className="text-neutral-300">
                <span className="text-amber-400 mr-2">{item.quantity}×</span> 
                {item.dish.name}
              </span>
              <span className="text-neutral-400">
                {formatCurrency(item.dish.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-4 border-t border-neutral-800 font-serif text-xl text-amber-400">
          <span>Total</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/menu" className="btn-primary">Order more</Link>
        <Link to="/" className="btn-outline">Back to home</Link>
      </div>
    </div>
  );
}