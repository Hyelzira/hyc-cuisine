import { useState } from 'react';
import { restaurantInfo } from '../data/restaurantInfo';
import { isValidEmail, isValidPhone } from '../lib/validators';

export function ReservationPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    date: '', time: '', partySize: '2', notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!isValidEmail(form.email)) e.email = 'Valid email required';
    if (!isValidPhone(form.phone)) e.phone = 'Valid phone required';
    if (!form.date) e.date = 'Choose a date';
    if (!form.time) e.time = 'Choose a time';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    const body = [
      `Reservation request — ${restaurantInfo.name}`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Date: ${form.date} at ${form.time}`,
      `Party size: ${form.partySize}`,
      form.notes ? `Notes: ${form.notes}` : '',
    ].join('\n');

    window.location.href = `mailto:${restaurantInfo.email}?subject=Reservation Request&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="section-container py-40 text-center max-w-lg mx-auto">
        <p className="eyebrow mb-4">Request sent</p>
        <h1 className="heading-section mb-6">Thank you</h1>
        <p className="text-neutral-400">
          If your email client didn't open, call us at{' '}
          <a href={`tel:${restaurantInfo.phone}`} className="text-amber-400">
            {restaurantInfo.phone}
          </a>.
        </p>
      </div>
    );
  }

  const input =
    'w-full bg-transparent border border-neutral-700 px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:border-amber-400 outline-none transition-colors';

  return (
    <div className="section-container pt-32 pb-24 max-w-xl">
      <header className="text-center mb-12">
        <p className="eyebrow mb-4">Reservations</p>
        <h1 className="heading-section">Reserve a table</h1>
        <p className="text-neutral-400 mt-4 text-sm">
          Or call{' '}
          <a href={`tel:${restaurantInfo.phone}`} className="text-amber-400">
            {restaurantInfo.phone}
          </a>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
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

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <input
              className={input} type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
          </div>
          <div>
            <input
              className={input} type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
            {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
          </div>
          <select
            className={input}
            value={form.partySize}
            onChange={(e) => setForm({ ...form, partySize: e.target.value })}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n} className="bg-ink">{n} guest{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <textarea
          className={`${input} min-h-[100px]`}
          placeholder="Special requests (allergies, occasion...)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button type="submit" className="btn-primary w-full">Send request</button>
      </form>
    </div>
  );
}