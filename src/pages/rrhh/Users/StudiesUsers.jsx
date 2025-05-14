import React, { useState, useEffect  } from 'react';
import { useFech } from '../../../hooks/useFech';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

export const StudiesUsers = () => {

    const { id_user } = useParams();

    const [studyType, setStudyType] = useState('');
    const [studyStatus, setStudyStatus] = useState('');
    const [degreeTitle, setDegreeTitle] = useState('');

    const [errors, setErrors] = useState({});

    const { getDataTable: userData } = useFech({ url: `employee/by-user/${id_user}/` });

    const getUserData = async () => {
        const { error, status } = await userData();
        if (error) {
            $.alert('Error al obtener los datos del usuario');
            return;
        }

        setStudyType(status.emp_studiesstatus);
        setStudyStatus(status.emp_studies);
        setDegreeTitle(status.emp_title);
    };

    // Opciones de ejemplo para los Selects
    const studyTypeOptions = [
        { value: 1, label: 'Enseñanza Media' }, 
        { value: 2, label: 'Estudios Superiores (CFT)' }, 
        { value: 3, label: 'Estudios Universitarios' }
    ];

    const studyStatusOptions = [
        { value: 1, label: 'Completo' }, 
        { value: 2, label: 'Incompleto' },
        { value: 3, label: 'Abandonado' },
    ];

    const validateFields = () => {
        const newErrors = {};

        // Validar tipo de estudios
        if (!studyType) {
            newErrors.studyType = 'Debe seleccionar un tipo de estudio.';
        }

        // Validar estado de estudios
        if (!studyStatus) {
            newErrors.studyStatus = 'Debe seleccionar un estado de estudio.';
        }

        // Validar título
        if (!degreeTitle.trim()) {
            newErrors.degreeTitle = 'Debe ingresar un título.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const send_form_data = async () => {
        if (!validateFields()) {
            console.log('Errores de validación:', errors);
            return;
        }

        const { updateDataApi } = useFech({ url: `update-personal-data/${id_user}/` });
        const { error, status } = await updateDataApi({
            emp_studies: studyType,
            emp_studiesstatus: studyStatus,
            emp_title: degreeTitle,
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
                <div className="col-4 mb-3">
                    <label htmlFor="">Tipo de Estudios</label>
                    <Select
                        placeholder={'-- Seleccione --'}
                        options={studyTypeOptions}
                        onChange={(option) => setStudyType(option.value)}
                        value={studyTypeOptions.find((opt) => opt.value === studyType) || null}
                        classNamePrefix="react-select"
                        className={errors.studyType ? 'is-invalid' : ''}
                    />
                    {errors.studyType && <div className="text-danger">{errors.studyType}</div>}
                </div>
                <div className="col-4 mb-3">
                    <label htmlFor="">Estado de Estudios</label>
                    <Select
                        placeholder={'-- Seleccione --'}
                        options={studyStatusOptions}
                        onChange={(option) => setStudyStatus(option.value)}
                        value={studyStatusOptions.find((opt) => opt.value === studyStatus) || null}
                        classNamePrefix="react-select"
                        className={errors.studyStatus ? 'is-invalid' : ''}
                    />
                    {errors.studyStatus && (
                        <div className="text-danger">{errors.studyStatus}</div>
                    )}
                </div>
                <div className="col-4 mb-3">
                    <label htmlFor="">Título</label>
                    <input
                        type="text"
                        className={`form-control form-control-solid w-100 ${errors.degreeTitle ? 'is-invalid' : ''}`}
                        onChange={(e) => setDegreeTitle(e.target.value)}
                        value={degreeTitle}
                    />
                    {errors.degreeTitle && (
                        <div className="invalid-feedback">{errors.degreeTitle}</div>
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
