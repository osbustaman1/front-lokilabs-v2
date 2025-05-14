import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { useFech } from '../../../hooks/useFech';

export const Settlement = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <div className="mb-3">
                        <label htmlFor="settlement_date" className="form-label">Fecha de finiquito</label>
                        <input type="date" className="form-control" id="settlement_date" name="settlement_date" />
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="settlement_type" className="form-label">Tipo de finiquito</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={[
                            { value: 'V', label: 'Voluntario' },
                            { value: 'I', label: 'Indemnizado' },
                        ]}
                    />
                </div>
                
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <label htmlFor="" className="form-label">Observación</label>
                    <textarea 
                        className="form-control" 
                        rows="8"></textarea>
                </div>
            </div>
            <div className="col-md-3 mt-3">
                <button
                    type="button"
                    className="btn btn-primary btn-sm mt-4"
                >
                    Guardar
                </button>
            </div>
        </>
    )
}
