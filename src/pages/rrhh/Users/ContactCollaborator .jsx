import React, { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { useFech } from '../../../hooks/useFech';

export const ContactCollaborator = () => {

    const { id_user } = useParams();

    const [personalEmail, setPersonalEmail] = useState('');
    const [workEmail, setworkEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [workPhoneNumber, setWorkPhoneNumber] = useState('');

    const [errors, setErrors] = useState({});

    const { getDataTable: userData } = useFech({ url: `employee/by-user/${id_user}/` });

    const getUserData = async () => {
        const { error, status } = await userData();
        if (error) {
            $.alert('Error al obtener los datos del usuario');
            return;
        }

        setPersonalEmail(status.emp_personal_email);
        setworkEmail(status.emp_corporative_email);
        setPhoneNumber(status.emp_personal_phone);
        setWorkPhoneNumber(status.emp_work_phone);
    };

    const validateFields = () => {
        const newErrors = {};

        // Validar correo personal
        if (!personalEmail) {
            newErrors.personalEmail = 'Debe ingresar un correo personal.';
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(personalEmail)
        ) {
            newErrors.personalEmail = 'Debe ingresar un correo válido.';
        }

        // Validar número telefónico
        if (!phoneNumber) {
            newErrors.phoneNumber = 'Debe ingresar un número telefónico.';
        } else if (!/^\+569\d{4}\d{4}$/.test(phoneNumber)) {
            newErrors.phoneNumber =
                'El número debe tener el formato +56XXXXXXXXX.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePhoneChange = (value) => {
        // Permitir solo números, espacios y el signo +
        const formattedValue = value.replace(/[^0-9+\s]/g, '');
        setPhoneNumber(formattedValue);
    };


    const handlePhoneWorkChange = (value) => {
        // Permitir solo números, espacios y el signo +
        const formattedValue = value.replace(/[^0-9+\s]/g, '');
        setWorkPhoneNumber(formattedValue);
    };

    const send_form_data = async () => {
        if (!validateFields()) {
            console.log('Errores de validación:', errors);
            return;
        }

        const { updateDataApi } = useFech({ url: `update-personal-data/${id_user}/` });
        const { error, status } = await updateDataApi({
            emp_personal_email: personalEmail,
            emp_personal_phone: phoneNumber,
            emp_work_phone: workPhoneNumber,
        });

        if (error) {
            $.alert(status.message);
        } else {
            const { com_id, message } = status;
            $.alert("Información general agregada con éxito");
            return false;
        }
    };

    useEffect(() => {
        getUserData();
    }, [id_user]);

    return (
        <>
            <div className="row">
                <div className="col-6 mb-3">
                    <label htmlFor="">Correo Laboral</label>
                    <input
                        type="email"
                        className={`form-control ${errors.workEmail ? 'is-invalid' : ''}`}
                        onChange={(e) => setworkEmail(e.target.value)}
                        value={workEmail || ''}
                        disabled
                    />
                    {errors.workEmail && (
                        <div className="invalid-feedback">{errors.workEmail}</div>
                    )}
                </div>

                <div className="col-6 mb-3">
                    <label htmlFor="">Correo Personal</label>
                    <input
                        type="email"
                        className={`form-control ${errors.personalEmail ? 'is-invalid' : ''}`}
                        onChange={(e) => setPersonalEmail(e.target.value)}
                        value={personalEmail || ''}
                    />
                    {errors.personalEmail && (
                        <div className="invalid-feedback">{errors.personalEmail}</div>
                    )}
                </div>

                <div className="col-6 mb-3">
                    <label htmlFor="">Número Telefónico Labortal</label>
                    <input
                        type="text"
                        className={`form-control ${errors.workPhoneNumber ? 'is-invalid' : ''}`}
                        onChange={(e) => handlePhoneWorkChange(e.target.value)}
                        value={workPhoneNumber || ''}
                        placeholder="+56XXXXXXXXX"
                    />
                    {errors.workPhoneNumber && (
                        <div className="invalid-feedback">{errors.workPhoneNumber}</div>
                    )}
                </div>
                
                <div className="col-6 mb-3">
                    <label htmlFor="">Número Telefónico Personal</label>
                    <input
                        type="text"
                        className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        value={phoneNumber || ''}
                        placeholder="+56XXXXXXXXX"
                    />
                    {errors.phoneNumber && (
                        <div className="invalid-feedback">{errors.phoneNumber}</div>
                    )}
                </div>
                
            </div>

            <div className="row">
                <div className="col-md-3 mt-3">
                    <button
                        type="button"
                        className="btn btn-primary btn-sm mt-4"
                        onClick={() => send_form_data()}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </>
    );
};
