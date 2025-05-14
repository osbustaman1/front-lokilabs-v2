import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useFech } from '../../hooks/useFech';

export const MyPerfil = ({ data }) => {

    const id_user = localStorage.getItem('user'); // Obtener usuario de localStorage

    // Estados para los valores del formulario
    const [rut, setRut] = useState('');
    const [fullFirstName, setFullFirstName] = useState('');
    const [fullLastName, setFullLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [sex, setSex] = useState('');
    const [civilStatus, setCivilStatus] = useState('');
    const [phone, setPhone] = useState('');
    const [emailPersonal, setEmailPersonal] = useState('');
    const [emailCorporate, setEmailCorporate] = useState('');

    const [errors, setErrors] = useState({});

    // Opciones para los select
    const [listSexs] = useState([
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Femenino' },
    ]);

    const [listCivilStatus] = useState([
        { value: 1, label: 'Solter@' },
        { value: 2, label: 'Casad@' },
        { value: 3, label: 'Divorciad@' },
        { value: 4, label: 'Viud@' },
        { value: 5, label: 'No Informa' },
    ]);

    const validateFields = () => {
        const newErrors = {};
    
        if (!phone) {
            newErrors.phone = 'Falta número de teléfono.';
        }
    
        if (!emailPersonal) {
            newErrors.emailPersonal = 'Ingresa un correo personal.';
        }
    
        setErrors(newErrors); // Actualiza los errores en el estado.
        return Object.keys(newErrors).length === 0; // Retorna si no hay errores.
    };
    


    const send_form_data = async () => {
        if (!validateFields()) {
            console.log('Errores de validación:', errors);
            return;
        }

        const { updateDataApi } = useFech({ url: `update-personal-data/${id_user}/` });
        const { error, status } = await updateDataApi({
            emp_civilstatus: civilStatus,
            emp_personal_phone: phone,
            emp_personal_email: emailPersonal
        });

        if (error) {
            $.alert(status.message);
        } else {
            const { com_id, message } = status;
            $.alert("Los datos fueron actualizados correctamente.");
            return false;
        }

    };

    // Manejo de los datos recibidos
    useEffect(() => {
        setRut(data?.rut || '');
        setFullFirstName(data?.first_name || '');
        setFullLastName(data?.last_name || '');
        setBirthDate(data?.birth_date || '');
        setSex(data?.sex || '');
        setCivilStatus(data?.civilstatus || '');
        setPhone(data?.personal_phone || '');
        setEmailPersonal(data?.personal_email || '');
        setEmailCorporate(data?.corporative_email || '');
    }, [data]);

    return (
        <div className="col-4 mb-4">
            <div className="card h-100">
                <div className="card-body d-flex justify-content-center flex-column">
                    <div className="align-items-center justify-content-between">
                        <div className="me-3">
                            <i className="fa-solid fa-address-card"></i>
                            <h5>Mis datos personales</h5>
                            <div className="text-muted small row">
                                <div className="col-12">
                                    <label>Rut</label>
                                    <input
                                        className="form-control form-control-solid w-100"
                                        type="text"
                                        disabled
                                        value={rut || ''}
                                    />
                                </div>
                                <div className="col-12 mt-3">
                                    <label>Nombres</label>
                                    <input
                                        className="form-control form-control-solid w-100"
                                        type="text"
                                        disabled
                                        value={fullFirstName || ''}
                                    />
                                </div>
                                <div className="col-12 mt-3">
                                    <label>Apellidos</label>
                                    <input
                                        className="form-control form-control-solid w-100"
                                        type="text"
                                        disabled
                                        value={fullLastName || ''}
                                    />
                                </div>
                                <div className="col-12 mt-3">
                                    <label>Fecha de nacimiento</label>
                                    <input
                                        className="form-control form-control-solid w-100"
                                        type="date"
                                        disabled
                                        value={birthDate || ''}
                                    />
                                </div>
                                <div className="col-6 mt-3">
                                    <label>Sexo</label>
                                    <Select
                                        placeholder={'Seleccione'}
                                        isDisabled
                                        options={listSexs}
                                        value={listSexs.find((option) => option.value === sex) || null}
                                    />
                                </div>
                                <div className="col-6 mt-3">
                                    <label>Estado civil</label>
                                    <Select
                                        placeholder={'Seleccione'}
                                        options={listCivilStatus}
                                        onChange={(option) => setCivilStatus(option?.value || '')}
                                        value={listCivilStatus.find((option) => option.value === civilStatus) || null}
                                    />
                                    {errors.civilStatus && <div className="text-danger">{errors.civilStatus}</div>}
                                </div>
                                <div className="col-12 mt-3">
                                    <label>Número de teléfono</label>
                                    <input
                                        className={`form-control form-control-solid w-100 ${errors.phone ? 'is-invalid' : ''}`}
                                        type="text"
                                        onChange={(e) => setPhone(e.target.value || '')}
                                        value={phone || ''}
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                </div>

                                <div className="col-12 mt-3">
                                    <label>Correo personal</label>
                                    <input
                                        className={`form-control form-control-solid w-100 ${errors.emailPersonal ? 'is-invalid' : ''}`}
                                        type="email"
                                        onChange={(e) => setEmailPersonal(e.target.value || '')}
                                        value={emailPersonal || ''}
                                    />
                                    {errors.emailPersonal && <div className="invalid-feedback">{errors.emailPersonal}</div>}
                                </div>

                                <div className="col-12 mt-3">
                                    <label>Correo corporativo</label>
                                    <input
                                        className="form-control form-control-solid w-100"
                                        type="email"
                                        disabled
                                        onChange={(e) => setEmailCorporate(e.target.value || '')}
                                        value={emailCorporate || ''}
                                    />
                                </div>
                                <div className="col-12 mt-3" style={{ textAlign: 'right' }}>
                                    <button 
                                        className="btn btn-teal" 
                                        type="button"
                                        onClick={send_form_data}
                                        >
                                        <i className="fa-solid fa-floppy-disk"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
