import type { TrackingResult } from "../types/tracking";
import { mockOrders } from "../mocks/trackingData";

const USE_MOCK = true;

export class TrackingNotFoundError extends Error {
  constructor() {
    super("NOT_FOUND");
    this.name = "TrackingNotFoundError";
  }
}

export async function getTracking(trackingId: string): Promise<TrackingResult> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 600));
    const key = trackingId.toUpperCase();
    // Demo fallback: any unknown ID resolves to TRK-1001 so the
    // Track Order button always has something to show.
    // Delete this line when the backend is live.
    const order = mockOrders[key] ?? mockOrders["TRK-1001"];
    if (!order) throw new TrackingNotFoundError();
    return { ...order, trackingId: key };
  }

  const res = await fetch(`/api/track/${encodeURIComponent(trackingId)}`);
  if (res.status === 404) throw new TrackingNotFoundError();
  if (!res.ok) throw new Error("SERVER_ERROR");
  return (await res.json()) as TrackingResult;
}