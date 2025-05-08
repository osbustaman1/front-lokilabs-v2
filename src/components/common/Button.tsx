import React, { useState } from "react";

interface ButtonProps {
    onClick: () => Promise<void> | void;
    label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
    const [isLoading, setIsLoading] = useState(false); // Hook useState

    // Manejo de clics con async/await
    const handleClick = async () => {
        setIsLoading(true);
        try {
            await onClick();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className="btn-primary"
            aria-busy={isLoading}
        >
        {isLoading ? 'Loading...' : label}
        </button>
    );
};

export default Button;