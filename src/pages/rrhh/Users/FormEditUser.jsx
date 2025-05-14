import React, { useState, useEffect } from 'react';
import { InputUploadImageCollaborator } from '../../../components/upload/InputUploadImageCollaborator';
import { useFech } from '../../../hooks/useFech';
import { useParams, useNavigate } from 'react-router-dom';

export const FormEditUser = () => {

    const { id_user } = useParams();

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [rut, setRut] = useState('');
    const [corporateEmail, setCorporateEmail] = useState('');
    
    const [errors, setErrors] = useState({});

    const { getDataTable } = useFech({ url: `get-employee/${id_user}/` });

    const get_data_response = async () => {
        const { status } = await getDataTable();
        setFirstName(status.first_name);
        setLastName(status.last_name);
        setRut(status.username);
        setCorporateEmail(status.email);
    };

    // Validar que solo se ingresen caracteres en nombres y apellidos
    const isValidText = (value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value);

    // Validar RUT chileno
    const validateRut = (rut) => {
        const rutClean = rut.replace(/\./g, '').replace('-', '');
        if (!/^[0-9]+[-]{1}[0-9kK]{1}$/.test(rut)) return false;

        const rutBody = rutClean.slice(0, -1);
        const dv = rutClean.slice(-1).toUpperCase();

        let sum = 0;
        let multiplier = 2;

        for (let i = rutBody.length - 1; i >= 0; i--) {
            sum += parseInt(rutBody[i], 10) * multiplier;
            multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }

        const calculatedDV = 11 - (sum % 11);
        const finalDV = calculatedDV === 11 ? '0' : calculatedDV === 10 ? 'K' : calculatedDV.toString();

        return dv === finalDV;
    };

    const handleRutChange = (value) => {
        const formattedValue = value.replace(/[^0-9kK-]/g, '').slice(0, 12); // Solo números, K/k y guion
        setRut(formattedValue);
    };

    // Función para eliminar acentos y normalizar texto
    const normalizeText = (text) => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    useEffect(() => {
        if (firstName && lastName) {
            const normalizedFirstName = normalizeText(firstName.trim().split(' ')[0]);
            const normalizedLastName = normalizeText(lastName.trim().split(' ')[0]);

            const email =
                normalizedFirstName.slice(0, 3).toLowerCase() +
                '.' +
                normalizedLastName.toLowerCase() +
                '@alexis.cl';

            setCorporateEmail(email);
        } else {
            setCorporateEmail('');
        }
    }, [firstName, lastName]);

    const validateFields = () => {
        const newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = 'Debe ingresar un nombre.';
        } else if (!isValidText(firstName)) {
            newErrors.firstName = 'El nombre solo puede contener caracteres.';
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Debe ingresar un apellido.';
        } else if (!isValidText(lastName)) {
            newErrors.lastName = 'El apellido solo puede contener caracteres.';
        }

        if (!rut.trim()) {
            newErrors.rut = 'Debe ingresar un RUT.';
        } else if (!validateRut(rut)) {
            newErrors.rut = 'El RUT es inválido.';
        }

        if (!corporateEmail.trim()) {
            newErrors.corporateEmail = 'El correo corporativo no puede estar vacío.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const send_form_data = async () => {
        if (!validateFields()) {
            console.log('Errores de validación:', errors);
            return;
        }

        const { updateDataApi } = useFech({ url: `update-employee/${id_user}/` });
        const { error, status } = await updateDataApi({
            first_name: firstName,
            last_name: lastName,
            rut: rut,
            username: rut,
            email: corporateEmail,
        });
        if (error) {
            $.alert(status.error);
        }else{
            $.alert("Usuario actualizado con éxito");
            return false;
        }
    };

    useEffect(() => {
        get_data_response();
    }, [id_user]);

    return (
        <div className="row">
            <InputUploadImageCollaborator title={'Foto colaborador'} />
            <div className="col-xl-8">
                <div className="card mb-4">
                    <div className="card-header">Datos usuario</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6 mb-3">
                                <label htmlFor="">Nombres</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                />
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>
                            <div className="col-6 mb-3">
                                <label htmlFor="">Apellidos</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                />
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>
                            <div className="col-6 mb-3">
                                <label htmlFor="">RUT</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.rut ? 'is-invalid' : ''}`}
                                    onChange={(e) => handleRutChange(e.target.value)}
                                    value={rut}
                                    maxLength={12}
                                />
                                {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
                            </div>
                            <div className="col-6 mb-3">
                                <label htmlFor="">Correo Corporativo</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.corporateEmail ? 'is-invalid' : ''}`}
                                    value={corporateEmail}
                                    disabled
                                />
                                {errors.corporateEmail && (
                                    <div className="invalid-feedback">{errors.corporateEmail}</div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}
