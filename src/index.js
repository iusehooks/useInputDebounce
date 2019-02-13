import { useState, useEffect } from "react";

const noop = () => undefined;
export default function useInputDebounce(
  effect = noop,
  { initial, delay = 0, minLength = 0 }
) {
  const [value, setValue] = useState(initial);
  const [onChange] = useState(() => e => {
    const value = e && e.target ? e.target.value : undefined;
    if (typeof value === "string") setValue(value || "");
  });

  useEffect(() => {
    let timeout;
    // Avoid to call effect when it first loads unless you do not
    // specify an inital value
    if (value !== undefined && value.length >= minLength) {
      timeout = setTimeout(() => effect(value, onChange), delay);
    }
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return { value: value || "", onChange };
}
