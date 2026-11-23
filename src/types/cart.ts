import type { Dish } from './menu';

export interface CartItem {
  dish: Dish;
  quantity: number;
  notes?: string;
}