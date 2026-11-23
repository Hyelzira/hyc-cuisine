import type { CartItem } from './cart';

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  ref: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  orderType: 'pickup' | 'dine-in';
  pickupDate: string;
  pickupTime: string;
  notes?: string;
  createdAt: string;
}