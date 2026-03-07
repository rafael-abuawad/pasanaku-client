"use client";

import { useState, useEffect } from "react";

interface EditableInputProps {
  id?: string;
  placeholder?: string;
  className?: string;
  value?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export function EditableInput({
  id,
  placeholder = "0.00",
  className,
  value: controlledValue,
  onChange,
  readOnly = false,
}: EditableInputProps) {
  const [internalValue, setInternalValue] = useState<number>(0);
  const [displayValue, setDisplayValue] = useState<string>("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const updateValue = (newValue: number) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    // Allow empty string, numbers, and decimal point
    if (text === "" || /^\d*\.?\d*$/.test(text)) {
      setDisplayValue(text);
      const parsed = parseFloat(text) || 0;
      updateValue(parsed);
    }
  };

  // Sync display value with controlled value
  useEffect(() => {
    if (value === 0) {
      setDisplayValue("");
    } else {
      setDisplayValue(value.toString());
    }
  }, [value]);

  return (
    <input
      id={id}
      type="text"
      inputMode="decimal"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      readOnly={readOnly}
    />
  );
}
