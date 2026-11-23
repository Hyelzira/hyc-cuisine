export type TrackingStatus =
  | "PENDING"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "FAILED";

export interface Checkpoint {
  label: string;
  at: string | null; // ISO string, null if not reached
  done: boolean;
}

export interface Courier {
  name: string;
  phone: string;
  vehicle?: string;
  photoUrl?: string | null;
}

export interface SupportContact {
  phone: string;
  email: string;
}

export interface TrackingResult {
  trackingId: string;
  status: TrackingStatus;
  etaText: string; // or etaAt: string if you prefer
  checkpoints: Checkpoint[];
  courier: Courier;
  support: SupportContact;
}