import React, { useEffect, useContext, useState, useCallback } from 'react';
import { AppContext } from '../../providers/AppProvider';
import { DaySelection } from './DaySelection';
import { useFech } from '../../hooks/useFech';
import Select from 'react-select';

import './VacationRequest.css';

const dict_bread_crumb = [
    { "bread": "Mis solicitudes" },
    { "bread": "Vacaciones" }
];

const dict_title = { "tittle": "Vacaciones" };

const buttons_menu = [];

export const VacationRequest = () => {

    const id_user = localStorage.getItem('user');

    const [isHalfDay, setIsHalfDay] = useState(false);
    const [halfDayTime, setHalfDayTime] = useState(null);
    const [days, setDays] = useState(0);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false); // Habilita o deshabilita el botón
    const [availableDays, setAvailableDays] = useState(0); // Días iniciales de vacaciones disponibles
    const [daysProgresive, setDaysProgresive] = useState(0); // Días progresivos de vacaciones
    const [daysAdditional, setDaysAdditional] = useState(0); // Días adicionales de vacaciones
    const [typeDay, setTypeDay] = useState(1); // Tipo de días de vacaciones

    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);

    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Opciones para elegir "Mañana" o "Tarde"
    const listHalfDayTime = [
        { value: 'morning', label: 'Mañana' },
        { value: 'afternoon', label: 'Tarde' }
    ];

    const [listTypeVacations] = useState([
        { value: 1, label: 'Normales' },
        { value: 2, label: 'Progresivas' },
        { value: 3, label: 'Adicionales' },
    ]);

    const { getDataTable: daysVacations } = useFech({ url: `days-vacation-user/${id_user}/` });
    const getDaysVacations = useCallback(async () => {
        const { error, status } = await daysVacations();
        if (error) {
            $.alert('Error al obtener los datos del usuario');
            return;
        }
    
        setAvailableDays(status.proportional_vacation.days_vacations);
    }, [daysVacations]); // Se mantiene estable en la memoria

    const { postDataApi: postProgresiveVacation } = useFech({ url: `get-progresive-vacation-days/` });
    const getProgresiveVacation = async (start, end) => {

        try {
            const payload = {
                collaborator: id_user
            };

            const { status } = await postProgresiveVacation(payload);
            setDaysProgresive(status.progressive_vacation_days);

        } catch (err) {
            console.error("Error inesperado en sendVacationRequest:", err);
            return null;
        }
    };

    useEffect(() => {
        getDaysVacations();
        getProgresiveVacation();
    }, [id_user]); // Se ejecutará solo cuando cambie el id_user

    // Función para calcular la diferencia de días entre dos fechas
    const calculateDays = (start, end) => {
        if (!start || !end) return 0;
        if (isHalfDay) return 0.5;

        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate - startDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    // Resetear formulario cuando se cambia entre Día Completo y Medio Día
    useEffect(() => {
        if (isHalfDay) {
            setHalfDayTime(null);
            setDateStart('');
            setDateEnd('');
            setDays(0.5);
            setErrors({});
        } else {
            setHalfDayTime(null);
            setDateStart('');
            setDateEnd('');
            setDays(0);
            setErrors({});
        }
    }, [isHalfDay]);

    // Validar si el formulario es válido
    useEffect(() => {
        setIsFormValid(Object.keys(errors).length === 0 && dateStart && dateEnd);
    }, [errors, dateStart, dateEnd]);

    // Cuando se selecciona la fecha "Desde"
    const handleStartDateChange = (value) => {
        if (value < today) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dateStart: 'No puede seleccionar una fecha anterior al día de hoy.',
            }));
            setDateStart('');
            setDateEnd('');
            setDays(0);
            return;
        }

        setDateStart(value);
        setErrors((prevErrors) => {
            const { dateStart, ...rest } = prevErrors;
            return rest;
        });

        if (isHalfDay) {
            setDateEnd(value); // Medio día: "Hasta" debe ser igual a "Desde"
            setDays(0.5);
        } else {
            setDays(dateEnd ? calculateDays(value, dateEnd) : 0);
        }
    };

    // Cuando se selecciona la fecha "Hasta"
    const handleEndDateChange = async (value) => {
        if (isHalfDay) return;

        if (value < today) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dateEnd: 'No puede seleccionar una fecha anterior al día de hoy.',
            }));
            setDateEnd('');
            setDays(0);
            return;
        }

        setDateEnd(value);

        if (!dateStart) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dateEnd: 'Debe seleccionar la fecha de inicio primero.',
            }));
            return;
        }

        if (value < dateStart) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dateEnd: 'La fecha de término no puede ser menor que la fecha de inicio.',
            }));
            setDays(0);
        } else {
            setErrors((prevErrors) => {
                const { dateEnd, ...rest } = prevErrors;
                return rest;
            });
            
            if (await sendVacationRequest(dateStart, value) > availableDays) {

                $.alert('No puedes solicitar más días de los que tienes disponibles.');

                setHalfDayTime(null);
                setDateStart('');
                setDateEnd('');
                setDays(isHalfDay ? 0.5 : 0);
                setErrors({});
                return;
            }

            // Ejecutar la API al completar la fecha de término
            
        }
    };

    const { postDataApi } = useFech({ url: `get-vacation-days/` });
    const sendVacationRequest = async (start, end) => {

        try {
            const payload = {
                collaborator: id_user,
                vac_start_date: start,
                vac_end_date: end
            };

            const { status } = await postDataApi(payload);
            setDays(status.days_vacations);
            return status.days_vacations;

        } catch (err) {
            console.error("Error inesperado en sendVacationRequest:", err);
            return null;
        }
    };

    const send_form_data = async () => {
        const { postDataApi } = useFech({ url: `/vacation/?collaborator=${id_user}` });
        const payload = {
            vac_noon_days: isHalfDay ? isHalfDay : null,
            vac_half_day_time: isHalfDay ? halfDayTime : null,
            vac_vacation_days: isHalfDay ? 0.5 : days,
            collaborator: id_user,
            vac_start_date: dateStart,
            vac_end_date: dateEnd,
            vac_type_vacations: typeDay
        };

        const { error, status } = await postDataApi(payload);

        if (error) {
            $.alert(status.error);
            return;
        }

        $.alert('Solicitud enviada correctamente, al ser respondida se notificará por correo.');

        setHalfDayTime(null);
        setDateStart('');
        setDateEnd('');
        setDays(isHalfDay ? 0.5 : 0);
        setErrors({});
    
    };


    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, [id_user]);

    return (
        <div className='container-xl px-4 mt-n10'>
            <div className='row'>

                <div className="col-3 mb-4">
                    <div className="card h-100">
                        <div className="card-body justify-content-center flex-column">
                            <div className="align-items-center justify-content-between">
                                
                                <div className="row">
                                    {/* Selector de Día Completo / Medio Día */}
                                    <DaySelection isHalfDay={isHalfDay} setIsHalfDay={setIsHalfDay} />

                                    {isHalfDay && (
                                        <div className="col-12 mt-3">
                                            <label>Franja horaria</label>
                                            <Select
                                                placeholder="Seleccione"
                                                options={listHalfDayTime}
                                                onChange={(option) => setHalfDayTime(option?.value || '')}
                                                value={listHalfDayTime.find((option) => option.value === halfDayTime) || null}
                                            />
                                            {errors.halfDayTime && <div className="text-danger">{errors.halfDayTime}</div>}
                                        </div>
                                    )}

                                    <div className="col-12 mt-3">
                                        <label>Tipo de días</label>
                                        <Select
                                            placeholder="Seleccione"
                                            options={listTypeVacations}
                                            onChange={(option) => setTypeDay(option?.value || '')}
                                            value={listTypeVacations.find((option) => option.value === typeDay) || null}
                                        />
                                        {errors.typeDay && <div className="text-danger">{errors.typeDay}</div>}

                                    </div>

                                    <div className="col-6 mt-3">
                                        <label>Desde</label>
                                        <input 
                                            type="date" 
                                            min={today} // Evita fechas pasadas
                                            className={`form-control form-control-solid w-100 ${errors.dateStart ? 'is-invalid' : ''}`} 
                                            value={dateStart}
                                            onChange={(e) => handleStartDateChange(e.target.value)}
                                        />
                                        {errors.dateStart && <div className="text-danger">{errors.dateStart}</div>}
                                    </div>

                                    <div className="col-6 mt-3">
                                        <label>Hasta</label>
                                        <input 
                                            type="date" 
                                            min={today} 
                                            className={`form-control form-control-solid w-100 ${errors.dateEnd ? 'is-invalid' : ''}`} 
                                            value={dateEnd}
                                            onChange={(e) => handleEndDateChange(e.target.value)}
                                            disabled={isHalfDay} 
                                        />
                                        {errors.dateEnd && <div className="text-danger">{errors.dateEnd}</div>}
                                    </div>                                   
                                    
                                    <div className="col-12 mt-3 text-center mb-3">
                                        <label>Días solicitados:</label>
                                        <p><span className="big-font">{days}</span></p>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <button 
                                            type="button" 
                                            className="btn btn-primary w-100"
                                            onClick={() => send_form_data()}
                                            disabled={!isFormValid} // Bloquea si hay errores
                                        >
                                            Solicitar
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-2 mb-4">
                    <div className="card">
                        <div className="card-body justify-content-center flex-column">
                            <div className="align-items-center justify-content-between">
                                <div className="me-3 text-left">
                                    <i className="fa-regular fa-calendar"></i> Mis días disponibles:
                                    <div className="size-35">{availableDays}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-4">
                        <div className="card-body justify-content-center flex-column">
                            <div className="align-items-center justify-content-between">
                                <div className="me-3">
                                    <i className="fa-regular fa-calendar"></i> Días Progresivos:
                                    <div className="size-35">{daysProgresive}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-4">
                        <div className="card-body justify-content-center flex-column">
                            <div className="align-items-center justify-content-between">
                                <div className="me-3">
                                    <i className="fa-regular fa-calendar"></i> Días Adicionales:
                                    <div className="size-35">{daysAdditional}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}
