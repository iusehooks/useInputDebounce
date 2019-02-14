import React, { useState, useRef, useEffect } from "react";

const noop = () => undefined;
export default function useInputDebounce(
  effect = noop,
  { initial = "", delay = 0, minLength = 0 }
) {
  const [value, setValue] = useState(initial);
  const debounceEnabled = useRef(true);
  const [onChange] = useState(() => e => {
    const value = e && e.target ? e.target.value : undefined;
    if (value) setValue(value);
  });

  const updateValue = value => {
    debounceEnabled.current = false;
    setValue(String(value));
  };

  useEffect(() => {
    let timeout;
    if (
      value !== undefined &&
      value.length >= minLength &&
      debounceEnabled.current
    ) {
      timeout = setTimeout(() => effect(value, updateValue), delay);
    }
    debounceEnabled.current = true;
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return { value, onChange };
}
