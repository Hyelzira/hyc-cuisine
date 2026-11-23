// src/types/menu.ts
export type Allergen = 'soy' | 'fish' | 'eggs' | 'nuts' | 'shellfish' | 'gluten' | 'dairy' | 'sesame';
export type MenuCategory = 'starters' | 'mains' | 'desserts' | 'tasting-menu' | 'beverages';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number; // in kobo/cents
  category: MenuCategory;
  image?: string;
  allergens: Allergen[];
  isSignature?: boolean;
  isAvailable: boolean;
  requiresAdvanceNotice?: number;
}