import React, { useState, useEffect  } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { useFech } from '../../../hooks/useFech';

export const GeneralInformation = () => {
    const { id_user } = useParams();

    const [listForeignerData] = useState([
        { value: 'Y', label: 'Si' },
        { value: 'N', label: 'No' },
    ]);

    const [listSexs] = useState([
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Femenino' },
    ]);

    const [ListCivilStatus] = useState([
        { value: 1, label: 'Solter@' },
        { value: 2, label: 'Casad@' },
        { value: 3, label: 'Divorciad@' },
        { value: 4, label: 'Viud@' },
    ]);

    const [listDriverLicense] = useState([
        { value: 'Y', label: 'Si' }, 
        { value: 'N', label: 'No' }
    ]);

    const [rut, setRut] = useState('');
    const [foreigner, setForeigner] = useState('');
    const [nationality, setNationality] = useState('Chilen@');
    const [sexs, setSexs] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [civilStatus, setCivilStatus] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const [typeDriverLicense, setTypeDriverLicense] = useState('');

    const [errors, setErrors] = useState({});

    const { getDataTable: userData } = useFech({ url: `employee/by-user/${id_user}/` });

    const getUserData = async () => {
        const { error, status } = await userData();
        if (error) {
            $.alert('Error al obtener los datos del usuario');
            return;
        }

        setRut(status.emp_rut);
        setForeigner(status.emp_foreign);
        setNationality(status.emp_nationality);
        setSexs(status.emp_sex);
        setBirthdate(status.emp_birthdate);
        setCivilStatus(status.emp_civilstatus);
        setDriverLicense(status.emp_drivellicense);
        setTypeDriverLicense(status.emp_typelicense);
    };

    // Función para validar RUT chileno
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

    // Función para manejar el cambio en el campo de RUT
    const changeRut = (value) => {
        // Permitir solo números, guión (-) y las letras K/k
        const formattedValue = value.replace(/[^0-9kK-]/g, '');

        // Limitar a un máximo de 12 caracteres (formato XXXXXXXX-K)
        if (formattedValue.length <= 12) {
            setRut(formattedValue);

            // Validar RUT solo si el formato básico es válido
            if (validateRut(formattedValue)) {
                setErrors((prev) => ({ ...prev, rut: null }));
            } else {
                setErrors((prev) => ({ ...prev, rut: 'El RUT es inválido.' }));
            }
        }
    };

    const changeTypeDriverLicense = (value) => {
        // Permitir solo los caracteres A, B, C, D
        const formattedValue = value.replace(/[^ABCD]/g, '');
    
        // Limitar el largo máximo a 4 caracteres
        if (formattedValue.length <= 4) {
            setTypeDriverLicense(formattedValue);
    
            // Validar longitud de 1 a 4 caracteres si es requerido
            if (formattedValue.length >= 1) {
                setErrors((prev) => ({ ...prev, typeDriverLicense: null }));
            } else if (driverLicense === 'Y') {
                setErrors((prev) => ({
                    ...prev,
                    typeDriverLicense: 'El tipo de licencia debe tener entre 1 y 4 caracteres.',
                }));
            }
        }
    };

    const validateFields = () => {
        const newErrors = {};

        if (!foreigner) {
            newErrors.foreigner = 'Debe seleccionar si es extranjero.';
        }

        if (!nationality.trim()) {
            newErrors.nationality = 'Debe ingresar una nacionalidad.';
        }

        if (!sexs) {
            newErrors.sexs = 'Debe seleccionar un sexo.';
        }

        if (!birthdate) {
            newErrors.birthdate = 'Debe ingresar una fecha de nacimiento.';
        }

        if (!civilStatus) {
            newErrors.civilStatus = 'Debe seleccionar un estado civil.';
        }

        if (!driverLicense) {
            newErrors.driverLicense = 'Debe seleccionar licensia de conducir.';
        }

        if (driverLicense === 'Y' && (!typeDriverLicense || typeDriverLicense.length < 1 || typeDriverLicense.length > 4)) {
            newErrors.typeDriverLicense = 'El tipo de licencia debe tener entre 1 y 4 caracteres.';
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
            emp_foreign: foreigner,
            emp_nationality: nationality,
            emp_sex: sexs,
            emp_birthdate: birthdate,
            emp_civilstatus: civilStatus,
            emp_drivellicense: driverLicense,
            emp_typelicense: typeDriverLicense
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
                <div className="col-3 mb-3">
                    <label htmlFor="">Rut</label>
                    <input
                        type="text"
                        className={`form-control`}
                        value={rut}
                        maxLength={12}
                        disabled
                    />
                    {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="">Es extranjero</label>
                    <Select
                        placeholder={'-- Seleccione --'}
                        options={listForeignerData}
                        onChange={(option) => setForeigner(option.value)}
                        value={listForeignerData.find((opt) => opt.value === foreigner) || null}
                        className={errors.foreigner ? 'is-invalid' : ''}
                    />
                    {errors.foreigner && <div className="text-danger">{errors.foreigner}</div>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="">Nacionalidad</label>
                    <input
                        type="text"
                        className={`form-control ${errors.nationality ? 'is-invalid' : ''}`}
                        onChange={(e) => setNationality(e.target.value)}
                        value={nationality}
                    />
                    {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="">Sexo</label>
                    <Select
                        placeholder={'-- Seleccione --'}
                        options={listSexs}
                        onChange={(option) => setSexs(option.value)}
                        value={listSexs.find((opt) => opt.value === sexs) || null}
                        className={errors.sexs ? 'is-invalid' : ''}
                    />
                    {errors.sexs && <div className="text-danger">{errors.sexs}</div>}
                </div>
                <div className="col-md-3">
                    <label>Fecha Nacimiento</label>
                    <input
                        type="date"
                        className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}
                        onChange={(e) => setBirthdate(e.target.value)}
                        value={birthdate}
                    />
                    {errors.birthdate && <div className="invalid-feedback">{errors.birthdate}</div>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="">Estado Civil</label>
                    <Select
                        placeholder={'-- Seleccione --'}
                        options={ListCivilStatus}
                        onChange={(option) => setCivilStatus(option.value)}
                        value={ListCivilStatus.find((opt) => opt.value === civilStatus) || null}
                        className={errors.civilStatus ? 'is-invalid' : ''}
                    />
                    {errors.civilStatus && <div className="text-danger">{errors.civilStatus}</div>}
                </div>

                <div className="col-3 mb-3">
                    <label htmlFor="">Licencia de Conducir</label>
                    <Select
                        placeholder={'-- Seleccione --'}
                        options={listDriverLicense}
                        onChange={(option) => {
                            setDriverLicense(option.value);
                            if (option.value === 'N') {
                                setTypeDriverLicense('');
                                setErrors((prev) => ({ ...prev, typeDriverLicense: null }));
                            }
                        }}
                        value={listDriverLicense.find((opt) => opt.value === driverLicense) || null}
                        className={errors.driverLicense ? 'is-invalid' : ''}
                    />
                    {errors.driverLicense && <div className="text-danger">{errors.driverLicense}</div>}
                </div>

                <div className="col-3 mb-3">
                    <label htmlFor="">Tipo Licencia</label>
                    <input
                        type="text"
                        className={`form-control ${errors.typeDriverLicense ? 'is-invalid' : ''}`}
                        onChange={(e) => changeTypeDriverLicense(e.target.value)}
                        value={typeDriverLicense}
                        disabled={driverLicense === 'N'}
                    />
                    {errors.typeDriverLicense && <div className="invalid-feedback">{errors.typeDriverLicense}</div>}
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
