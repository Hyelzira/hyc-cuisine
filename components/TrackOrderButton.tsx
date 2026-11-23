import { useState } from "react";
import { TrackingModal } from "./TrackingModal";
import { TrackingDetails } from "./TrackingDetails";
import {
  getTracking,
  TrackingNotFoundError,
} from "../services/trackingApi";
import type { TrackingResult } from "../types/tracking";

interface Props {
  trackingId: string;
  /** Optional: hide the button until the order exists / is confirmed. */
  disabled?: boolean;
}

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; data: TrackingResult }
  | { kind: "not_found" }
  | { kind: "error" };

export function TrackOrderButton({ trackingId, disabled = false }: Props) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>({ kind: "idle" });

  async function handleOpen() {
    setOpen(true);

    // Don't refetch if we already have results for this ID.
    if (state.kind === "success") return;

    setState({ kind: "loading" });
    try {
      const data = await getTracking(trackingId);
      setState({ kind: "success", data });
    } catch (err) {
      setState(
        err instanceof TrackingNotFoundError
          ? { kind: "not_found" }
          : { kind: "error" }
      );
    }
  }

  function handleClose() {
    setOpen(false);
  }

  function handleRetry() {
    setState({ kind: "idle" });
    handleOpen();
  }

  return (
    <>
      <button
        type="button"
        className="track-order-btn"
        onClick={handleOpen}
        disabled={disabled}
      >
        Track Order
      </button>

      <TrackingModal open={open} onClose={handleClose}>
        {state.kind === "loading" && <p>Loading tracking…</p>}

        {state.kind === "not_found" && (
          <p>We couldn't find tracking for this order yet. Please try again shortly.</p>
        )}

        {state.kind === "error" && (
          <div>
            <p>Something went wrong loading tracking.</p>
            <button type="button" onClick={handleRetry}>Try again</button>
          </div>
        )}

        {state.kind === "success" && <TrackingDetails data={state.data} />}
      </TrackingModal>
    </>
  );
}