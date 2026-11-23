import type { TrackingResult, TrackingStatus } from "../types/tracking";

const STATUS_LABEL: Record<TrackingStatus, string> = {
  PENDING: "Pending",
  IN_TRANSIT: "In transit",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  FAILED: "Delivery failed",
};

interface Props {
  data: TrackingResult;
}

export function TrackingDetails({ data }: Props) {
  return (
    <div className="tracking-details">
      <header>
        <h2>Order {data.trackingId}</h2>
        <span className={`status status--${data.status.toLowerCase()}`}>
          {STATUS_LABEL[data.status]}
        </span>
        <p>Estimated arrival: {data.etaText}</p>
      </header>

      <ol className="timeline">
        {data.checkpoints.map((cp, i) => (
          <li key={i} className={cp.done ? "done" : "pending"}>
            <span>{cp.label}</span>
            {cp.at && <time dateTime={cp.at}>{new Date(cp.at).toLocaleString()}</time>}
          </li>
        ))}
      </ol>

      <section className="courier-card">
        <h3>Your courier</h3>
        <p>{data.courier.name}</p>
        {data.courier.vehicle && <p>{data.courier.vehicle}</p>}
        <a href={`tel:${data.courier.phone}`}>Call courier</a>
      </section>

      <footer>
        <p>Need help? {data.support.phone} · {data.support.email}</p>
      </footer>
    </div>
  );
}