import React, { useEffect, useMemo, useState } from "react";

/**
 * Simple native color input (no lag)
 *
 * Props:
 * - value: string (hex like #RRGGBB)
 * - onChange: (hex) => void
 * - debounceMs?: number (default 100)
 * - ...props -> passed to <input />
 */
export default function CustomColorPicker({
  value = "#000000",
  onChange,
  debounceMs = 100,
  ...props
}) {
  const [local, setLocal] = useState(normalizeHex(value));

  // keep input synced if parent changes value
  useEffect(() => {
    setLocal(normalizeHex(value));
  }, [value]);

  // debounce emit
  useEffect(() => {
    const t = setTimeout(() => {
      onChange?.(local);
    }, debounceMs);

    return () => clearTimeout(t);
  }, [local, onChange, debounceMs]);

  return (
    <input
      type="color"
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      {...props}
    />
  );
}

/**
 * Native <input type="color" /> ONLY accepts #RRGGBB.
 * If you pass rgba/hsla/#RRGGBBAA it can break or not display.
 */
function normalizeHex(input) {
  if (!input) return "#000000";

  const s = String(input).trim();

  // already #RRGGBB
  if (/^#[0-9a-fA-F]{6}$/.test(s)) return s;

  // if #RRGGBBAA -> drop alpha
  if (/^#[0-9a-fA-F]{8}$/.test(s)) return s.slice(0, 7);

  // if someone passes "FFFFFFFF" etc
  if (/^[0-9a-fA-F]{6}$/.test(s)) return `#${s}`;

  // fallback
  return "#000000";
}
