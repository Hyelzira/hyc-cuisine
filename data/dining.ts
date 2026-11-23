import type { DiningSpace } from '../types/dining';

export const diningSpaces: DiningSpace[] = [
  {
    id: 'main-hall',
    name: 'The Main Hall',
    type: 'Fine Dining',
    description: 'An intimate room anchored by a sculptural chandelier, where the full tasting menu is served.',
    image: '/assets/mainhall.jpg',
    capacity: '48 guests',
    hours: 'Dinner Tue–Sun',
  },
  {
    id: 'private-suite',
    name: 'The Private Suite',
    type: 'Private Dining',
    description: 'A secluded space for celebrations and tastings, with a dedicated service team.',
    image: '/assets/suite.jpg', 
    capacity: '12 guests',
    hours: 'By reservation',
  },
  {
    id: 'chefs-counter',
    name: "The Chef's Counter",
    type: 'Counter Experience',
    description: 'Eight seats facing the open kitchen — a front-row view of the craft.',
    image: '/assets/counter.jpg', 
    capacity: '8 guests',
    hours: 'Dinner Thu–Sat',
  },
];