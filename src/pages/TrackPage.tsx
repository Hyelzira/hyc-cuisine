import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTracking,
  TrackingNotFoundError,
} from "../services/trackingApi";
import type { TrackingResult } from "../types/tracking";
import { TrackingDetails } from "../components/TrackingDetails";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; data: TrackingResult }
  | { kind: "not_found" }
  | { kind: "error" };

export function TrackPage() {
  const { trackingId } = useParams<{ trackingId?: string }>();
  const navigate = useNavigate();
  const [input, setInput] = useState(trackingId ?? "");
  const [state, setState] = useState<State>({ kind: "idle" });

  useEffect(() => {
    if (!trackingId) {
      setState({ kind: "idle" });
      return;
    }
    let cancelled = false;
    setState({ kind: "loading" });

    getTracking(trackingId)
      .then((data) => !cancelled && setState({ kind: "success", data }))
      .catch((err) => {
        if (cancelled) return;
        setState(
          err instanceof TrackingNotFoundError
            ? { kind: "not_found" }
            : { kind: "error" }
        );
      });

    return () => {
      cancelled = true;
    };
  }, [trackingId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = input.trim();
    if (id) navigate(`/track/${encodeURIComponent(id)}`);
  }

  return (
    <main className="track-page">
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter tracking ID"
        />
        <button type="submit">Track</button>
      </form>

      {state.kind === "loading" && <p>Loading…</p>}
      {state.kind === "not_found" && (
        <p>We couldn't find that tracking ID. Check it and try again.</p>
      )}
      {state.kind === "error" && (
        <p>Something went wrong. Please try again.</p>
      )}
      {state.kind === "success" && <TrackingDetails data={state.data} />}
    </main>
  );
}