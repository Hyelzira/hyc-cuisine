import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../components/context/CartContext';
import { generateOrderRef } from '../lib/generateOrderRef';
import { isValidEmail, isValidPhone } from '../lib/validators';
import { formatCurrency } from '../lib/formatCurrency';
import { restaurantInfo } from '../data/restaurantInfo';
import { TrackOrderButton } from '../components/TrackOrderButton';
import type { Order } from '../types/order';

export function CheckoutPage() {
  const { items, subtotal, clearCart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    pickupDate: '', pickupTime: '',
    orderType: 'pickup' as 'pickup' | 'dine-in',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<Order | null>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!isValidEmail(form.email)) e.email = 'Valid email required';
    if (!isValidPhone(form.phone)) e.phone = 'Valid phone required';
    if (!form.pickupDate) e.pickupDate = 'Choose a date';
    if (!form.pickupTime) e.pickupTime = 'Choose a time';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function buildWhatsAppLink(order: Order) {
    const lines = [
      `New Order — ${order.ref}`,
      `Name: ${order.customer.name}`,
      `Phone: ${order.customer.phone}`,
      `Type: ${order.orderType === 'pickup' ? 'Pickup' : 'Dine-in pre-order'}`,
      `When: ${order.pickupDate} at ${order.pickupTime}`,
      '',
      'Items:',
      ...order.items.map(
        (i) => `• ${i.dish.name} × ${i.quantity} — ${formatCurrency(i.dish.price * i.quantity)}`
      ),
      '',
      `Subtotal: ${formatCurrency(order.subtotal)}`,
      order.notes ? `\nNotes: ${order.notes}` : '',
    ];
    return `https://wa.me/${restaurantInfo.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    const placedOrder: Order = {
      ref: generateOrderRef(),
      customer: { name: form.name, email: form.email, phone: form.phone },
      items,
      subtotal,
      orderType: form.orderType,
      pickupDate: form.pickupDate,
      pickupTime: form.pickupTime,
      notes: form.notes,
      createdAt: new Date().toISOString(),
    };

    // window.open(buildWhatsAppLink(placedOrder), '_blank'); // comment this out for now
    clearCart();
    setOrder(placedOrder);
    navigate('/order/success', { state: { order: placedOrder } });
  }

  // Success screen — shown after the order is placed.
  if (order) {
    return (
      <div className="section-container pt-32 pb-24 max-w-3xl text-center">
        <p className="eyebrow mb-4">Order placed</p>
        <h1 className="heading-section mb-6">Thank you!</h1>
        <p className="text-neutral-400 mb-2">
          Your order reference is <span className="text-amber-400">{order.ref}</span>.
        </p>
        <p className="text-neutral-400 mb-10">
          Payment on collection. Our team will confirm by phone.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Track Order button — appears now that the order exists */}
          <TrackOrderButton trackingId={order.ref} />
          <Link to="/menu" className="btn-primary">Order again</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="section-container py-40 text-center">
        <h1 className="heading-section mb-6">Your order is empty</h1>
        <p className="text-neutral-400 mb-10">Add a few dishes to get started.</p>
        <Link to="/menu" className="btn-primary">Browse the menu</Link>
      </div>
    );
  }

  const input =
    'w-full bg-transparent border border-neutral-700 px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:border-amber-400 outline-none transition-colors';

  return (
    <div className="section-container pt-32 pb-24 max-w-3xl">
      <header className="text-center mb-12">
        <p className="eyebrow mb-4">Checkout</p>
        <h1 className="heading-section">Complete your order</h1>
      </header>

      {/* Order summary */}
      <div className="border border-neutral-800 p-6 mb-10">
        {items.map((i) => (
          <div
            key={i.dish.id}
            className="flex items-center justify-between gap-4 py-3 border-b border-neutral-800 last:border-b-0"
          >
            <div className="flex-1">
              <p className="font-serif text-lg text-neutral-100">{i.dish.name}</p>
              <p className="text-xs text-neutral-500">{formatCurrency(i.dish.price)} each</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(i.dish.id, i.quantity - 1)}
                className="w-7 h-7 border border-neutral-700 text-neutral-400 hover:border-amber-400"
              >
                −
              </button>
              <span className="w-6 text-center text-sm">{i.quantity}</span>
              <button
                onClick={() => updateQuantity(i.dish.id, i.quantity + 1)}
                className="w-7 h-7 border border-neutral-700 text-neutral-400 hover:border-amber-400"
              >
                +
              </button>
              <span className="w-24 text-right text-amber-400 text-sm">
                {formatCurrency(i.dish.price * i.quantity)}
              </span>
              <button
                onClick={() => removeItem(i.dish.id)}
                className="text-neutral-500 hover:text-red-400 text-xs"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between pt-4 font-serif text-xl text-amber-400">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Order type */}
        <div className="flex gap-3">
          {(['pickup', 'dine-in'] as const).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setForm({ ...form, orderType: t })}
              className={`px-5 py-2 text-xs uppercase tracking-widest border transition-colors ${
                form.orderType === t
                  ? 'border-amber-400 text-amber-400'
                  : 'border-neutral-700 text-neutral-400 hover:border-neutral-500'
              }`}
            >
              {t === 'pickup' ? 'Pickup' : 'Dine-in pre-order'}
            </button>
          ))}
        </div>

        <div>
          <input
            className={input} placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <input
              className={input} type="email" placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              className={input} type="tel" placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <input
              className={input} type="date"
              value={form.pickupDate}
              onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
            />
            {errors.pickupDate && <p className="text-red-400 text-xs mt-1">{errors.pickupDate}</p>}
          </div>
          <div>
            <input
              className={input} type="time"
              value={form.pickupTime}
              onChange={(e) => setForm({ ...form, pickupTime: e.target.value })}
            />
            {errors.pickupTime && <p className="text-red-400 text-xs mt-1">{errors.pickupTime}</p>}
          </div>
        </div>

        <textarea
          className={`${input} min-h-[90px]`}
          placeholder="Order notes (allergies, preferences...)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button type="submit" className="btn-primary w-full">Place order</button>
        <p className="text-xs text-neutral-500 text-center">
          Payment on collection. Our team will confirm by phone.
        </p>
      </form>
    </div>
  );
}