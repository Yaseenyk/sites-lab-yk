import type { ReactNode } from "react";

/** A labelled text input used by every calculator. */
export function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "date" | "time";
}) {
  return (
    <div className="fld">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        inputMode={type === "text" ? "decimal" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  );
}

/** One result: a label over a large value. `hero` highlights the main answer. */
export function Tile({ label, value, hero }: { label: string; value: ReactNode; hero?: boolean }) {
  return (
    <div className={`tile ${hero ? "hero-tile" : ""}`}>
      <span className="tile-label">{label}</span>
      <span className="tile-value">{value}</span>
    </div>
  );
}

/** A status line shown while an input is missing or invalid. */
export function Hint({ children, error }: { children: ReactNode; error?: boolean }) {
  return (
    <p className={`status ${error ? "err" : ""}`} role="status" aria-live="polite">
      {children}
    </p>
  );
}

/** A titled block inside a calculator card, with its own fields and result. */
export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="block">
      <h3 className="block-title">{title}</h3>
      {children}
    </section>
  );
}
