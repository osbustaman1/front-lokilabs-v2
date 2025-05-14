import React from 'react'

export const DaySelection = ({ isHalfDay, setIsHalfDay }) => {
    return (
        <div className="btn-group" role="group" aria-label="Tipo de día">
            {/* Opción Día Completo */}
            <button
                type="button"
                className={`btn ${!isHalfDay ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setIsHalfDay(false)}
            >
                <i className="fas fa-sun me-2"></i> Día Completo
            </button>

            {/* Opción Medio Día */}
            <button
                type="button"
                className={`btn ${isHalfDay ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setIsHalfDay(true)}
            >
                <i className="fas fa-adjust me-2"></i> Medio Día
            </button>
        </div>
    );
}
