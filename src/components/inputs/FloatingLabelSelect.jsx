import React, { useState } from 'react';

import './style.css';

export const FloatingLabelSelect = ({ label, id, value, options, onChange, disabled = false }) => {
    const [isFocused, setIsFocused] = useState(false);

    // Determina si el label debe estar en posición flotante
    const isFloating = isFocused || value;

    return (
        <div className="form-group position-relative">
            {/* Label flotante */}
            <label
                htmlFor={id}
                className={`floating-label ${isFloating ? 'floating' : ''}`}
            >
                {label}
            </label>
            {/* Select */}
            <select
                className="form-control"
                id={id}
                value={value}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={onChange}
            >
                <option value="" disabled hidden>
                    Select an option
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                    {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
