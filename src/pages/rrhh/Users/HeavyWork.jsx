import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { useFech } from '../../../hooks/useFech';

export const HeavyWork = () => {
    const { id_user } = useParams();

    const [heavyWorkType, setHeavyWorkType] = useState('0');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    // Opciones para el Select de Trabajo Pesado
    const heavyWorkOptions = [
        { value: 0, label: 'No tiene Trabajo Pesado' },
        { value: 1, label: 'Trabajo Pesado 2%' },
        { value: 2, label: 'Trabajo Menos Pesado 4%' },
    ];

    const { getDataTable: userData } = useFech({ url: `get-user-company/by-user/${id_user}/` });

    const getUserData = async () => {
        const { error, status } = await userData();
        if (error) {
            $.alert('Error al obtener los datos del usuario');
            return;
        }

        setHeavyWorkType(status.uc_heavy_work);
        setDescription(status.uc_description_heavy_work);
    };

    const validateFields = () => {
        const newErrors = {};

        // Validar Trabajo Pesado
        if (heavyWorkType === '' && heavyWorkType !== 0) {
            newErrors.heavyWorkType = 'Debe seleccionar un tipo de trabajo pesado.';
        }

        // Validar Descripción (solo si el tipo de trabajo pesado no es "No tiene Trabajo Pesado")
        if (heavyWorkType !== 0 && !description.trim()) {
            newErrors.description = 'Debe ingresar una descripción.';
        } else if (heavyWorkType !== 0 && description.length < 10) {
            newErrors.description = 'La descripción debe tener al menos 10 caracteres.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleHeavyWorkTypeChange = (option) => {
        setHeavyWorkType(option.value);
        if (option.value === 0) {
            setDescription(''); // Limpiar el campo descripción
        }
    };

    const sendFormHeavyWorkData = async () => {
        if (!validateFields()) {
            console.log('Errores de validación:', errors);
            return;
        }

        const { updateDataApi } = useFech({ url: `update-user-heavy-work/${id_user}/` });
        const { error, status } = await updateDataApi({
            uc_heavy_work: heavyWorkType,
            uc_description_heavy_work: description
        });

        if (error) {
            $.alert(status.message);
        } else {
            $.alert("Colaborador actualizado con éxito");
        }
    };

    useEffect(() => {
        getUserData();
    }, [id_user]);

    return (
        <>
            <div className="row">
                <div className="col-12 mt-3">
                    <div className="alert alert-primary alert-icon" role="alert">
                        <div className="alert-icon-aside">
                            <i className="far fa-flag"></i>
                        </div>
                        <div className="alert-icon-content">
                            <h6 className="alert-heading">Trabajo Pesado: Ley N°19.404</h6>
                            <ul>
                                <li>
                                    La Ley N°19.404 considera como Trabajo Pesado aquellas labores cuya realización acelera el desgaste físico, intelectual o psíquico en quienes las realizan, provocando un envejecimiento precoz, aun cuando no generen una enfermedad laboral. Esta ley permite rebajar la edad legal de jubilación para esas personas imponiendo por un monto mayor al 10% obligatorio, en caso que su empresa tenga acreditadas las labores de trabajo pesado deberá indicar en Tasa si el porcentaje adicional será un 2% o un 4% y además se puede colocar una descripción de dicho trabajo.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <label>Trabajo Pesado</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={heavyWorkOptions}
                        onChange={handleHeavyWorkTypeChange}
                        value={heavyWorkOptions.find((option) => option.value === heavyWorkType) || null}
                    />
                    {errors.heavyWorkType && (
                        <div className="text-danger">{errors.heavyWorkType}</div>
                    )}
                </div>
                <div className="col-md-9">
                    <label>Descripción</label>
                    <textarea
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        rows={10}
                        cols={10}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        disabled={heavyWorkType === 0} // Deshabilitar si no tiene trabajo pesado
                    />
                    {errors.description && (
                        <div className="invalid-feedback">{errors.description}</div>
                    )}
                </div>
            </div>

            <div className="col-md-3 mt-3">
                <button
                    type="button"
                    className="btn btn-primary btn-sm mt-4"
                    onClick={sendFormHeavyWorkData}
                >
                    Guardar
                </button>
            </div>
        </>
    );
};
