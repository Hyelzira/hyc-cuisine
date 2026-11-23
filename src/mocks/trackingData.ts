import type { TrackingResult } from "../types/tracking";

export const mockOrders: Record<string, TrackingResult> = {
  "TRK-1001": {
    trackingId: "TRK-1001",
    status: "OUT_FOR_DELIVERY",
    etaText: "Today, 2:00–4:00 PM",
    checkpoints: [
      { label: "Order confirmed", at: "2026-11-18T09:12:00Z", done: true },
      { label: "Picked up by courier", at: "2026-11-18T14:40:00Z", done: true },
      { label: "Out for delivery", at: "2026-11-19T08:05:00Z", done: true },
      { label: "Delivered", at: null, done: false },
    ],
    courier: {
      name: "Daniel Okafor",
      phone: "+2348012345678",
      vehicle: "Blue Honda • ABC-123-XY",
      photoUrl: null,
    },
    support: { phone: "+2348099999999", email: "support@yoursite.com" },
  },

  "TRK-1002": {
    trackingId: "TRK-1002",
    status: "IN_TRANSIT",
    etaText: "Tomorrow, 10:00 AM–12:00 PM",
    checkpoints: [
      { label: "Order confirmed", at: "2026-11-18T09:12:00Z", done: true },
      { label: "Picked up by courier", at: "2026-11-18T14:40:00Z", done: true },
      { label: "In transit", at: "2026-11-19T06:00:00Z", done: true },
      { label: "Out for delivery", at: null, done: false },
      { label: "Delivered", at: null, done: false },
    ],
    courier: {
      name: "Amaka Eze",
      phone: "+2348023456789",
      vehicle: "White Van • KJA-456-ZZ",
      photoUrl: null,
    },
    support: { phone: "+2348099999999", email: "support@yoursite.com" },
  },

  "TRK-1003": {
    trackingId: "TRK-1003",
    status: "DELIVERED",
    etaText: "Delivered",
    checkpoints: [
      { label: "Order confirmed", at: "2026-11-17T09:00:00Z", done: true },
      { label: "Picked up by courier", at: "2026-11-17T13:20:00Z", done: true },
      { label: "Out for delivery", at: "2026-11-18T08:00:00Z", done: true },
      { label: "Delivered", at: "2026-11-18T11:42:00Z", done: true },
    ],
    courier: {
      name: "Daniel Okafor",
      phone: "+2348012345678",
      vehicle: "Blue Honda • ABC-123-XY",
      photoUrl: null,
    },
    support: { phone: "+2348099999999", email: "support@yoursite.com" },
  },
};