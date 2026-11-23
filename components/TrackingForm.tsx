import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  /** Called with the trimmed ID instead of navigating, if provided. */
  onSubmit?: (trackingId: string) => void;
  initialValue?: string;
  autoFocus?: boolean;
}

export function TrackingForm({ onSubmit, initialValue = "", autoFocus = false }: Props) {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const trimmed = value.trim();
  const isValid = trimmed.length > 0;
  const showError = touched && !isValid;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    if (onSubmit) {
      onSubmit(trimmed);
    } else {
      navigate(`/track/${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <form className="tracking-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="tracking-id" className="tracking-form__label">
        Tracking ID
      </label>

      <div className="tracking-form__row">
        <input
          id="tracking-id"
          className={`tracking-form__input${showError ? " is-invalid" : ""}`}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="e.g. TRK-1001"
          autoFocus={autoFocus}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          aria-invalid={showError}
          aria-describedby={showError ? "tracking-id-error" : undefined}
        />
        <button type="submit" className="tracking-form__submit" disabled={!isValid}>
          Track
        </button>
      </div>

      {showError && (
        <p id="tracking-id-error" className="tracking-form__error" role="alert">
          Please enter a tracking ID.
        </p>
      )}
    </form>
  );
}