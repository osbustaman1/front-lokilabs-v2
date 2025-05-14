import React, { useState } from 'react';

import './style.css';

export const FloatingLabelInput = ({ label, id, value, type, onChange, disabled=false }) => {
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
            {/* Input de texto */}
            <input
                type={type}
                className="form-control"
                id={id}
                value={value}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={onChange}
            />
        </div>
    );
};
