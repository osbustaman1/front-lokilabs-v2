import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import Select from 'react-select';
import { TableDinamyc } from '../../../../components/datatable/TableDinamyc';
import { useFech } from '../../../../hooks/useFech';
import { useParams } from 'react-router-dom';
import { ModalStatic } from '../../../../components/modal/ModalStatic';
import { SmallButtons } from "../../../../components/buttons/SmallButtons";

export const Vacation = () => {

    const { id_user } = useParams();

    const title_table = 'Listado de solicitudes';

    const [dataTable, setDataTable] = useState([]);
    const [timeGetData, setTimeGetData] = useState(0);
    const [loading_, setLoading_] = useState(true);

    const [initDate, setInitDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [days, setDays] = useState(0);
    const [isChecked, setIsChecked] = useState(false); 
    const [errors, setErrors] = useState({});
    const [availableDays, setAvailableDays] = useState(0); // Días iniciales de vacaciones disponibles

    const [isHalfDay, setIsHalfDay] = useState(false); // Controla si es medio día
    const [halfDayTime, setHalfDayTime] = useState(''); // "Mañana" o "Tarde"

    const [listHalfDayTime] = useState([
        { value: 'morning', label: 'Mañana' },
        { value: 'afternoon', label: 'Tarde' },
    ]);

    const [listTypeVacations] = useState([
        { value: 1, label: 'Normales' },
        { value: 2, label: 'Progresivas' },
        { value: 3, label: 'Adicionales' },
    ]);

    const [daysRequested, setDaysRequested] = useState('');
    const [daysStart, setDaysStart] = useState('');
    const [daysStop, setDaysStop] = useState('');
    const [applicationDate, setApplicationDate] = useState('');
    const [requestStatus, setRequestStatus] = useState('');
    const [idVacations, setIdVacations] = useState('');

    const [typeDay, setTypeDay] = useState(1);
    
    const resetForm = () => {
        setInitDate('');
        setEndDate('');
        setDays(0);
        setIsChecked(false);
        setErrors({});
        if (isHalfDay){
            setHalfDayTime('');
            setIsHalfDay(false);
        }
    };

    const { getDataTable: daysVacations } = useFech({ url: `days-vacation-user/${id_user}/` });
    const getDaysVacations = useCallback(async () => {
        const { error, status } = await daysVacations();
        if (error) {
            $.alert('Error al obtener los datos del usuario');
            return;
        }
    
        setAvailableDays(status.proportional_vacation.days_vacations);
    }, [daysVacations]); // Se mantiene estable en la memoria

    useEffect(() => {
        getDaysVacations();
    }, [id_user]); // Se ejecutará solo cuando cambie el id_user

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
    
        if (checked) {
            setIsHalfDay(true); // Activa el modo de medio día
            setDays(0.5); // Asigna 0.5 días
        } else {
            setIsHalfDay(false); // Desactiva el modo de medio día
            setHalfDayTime('');
            setDays(0); // Restablece los días
        }
        resetForm();
    };


    const get_data_row = (option) => {
        setDaysRequested(option.vac_vacation_days);
        setDaysStart(option.vac_start_date);
        setDaysStop(option.vac_end_date);
        setApplicationDate(option.created || '0000-00-00');
        setRequestStatus(option.vac_request_status);
        setIdVacations(option.vac_id);
    };


    const update_estate = async (id, state) => {

        if (!id) {
            $.alert('No se ha seleccionado ninguna solicitud.');
            return;
        }

        $.confirm({
            title: 'Confirmación!',
            content: 'Esta seguro de cambiar el estado de la solicitud?',
            buttons: {
                confirmar: async function () {
                    const { updateDataApi } = useFech({ url: `update-vacation-user/` });
                    const payload = {
                        collaborator: id_user,
                        vac_id: id,
                        vac_request_status: state,
                        vac_response_date: new Date().toISOString().split('T')[0]
                    };
                    const { error, status } = await updateDataApi(payload);
                    if (error) {
                        $.alert('Error al actualizar el estado de la solicitud');
                        return;
                    }

                    get_data_table();
                    getDaysVacations();

                    setDaysRequested('');
                    setDaysStart('');
                    setDaysStop('');
                    setApplicationDate('');
                    setRequestStatus('');
                    setIdVacations('');
                },
                cancelar: function () {
                    return;
                }
            }
        });
    };

    const get_data_table = useCallback(async () => {
        const startTime = performance.now();
        const { getDataTable } = useFech({ url: `vacation/?collaborator=${id_user}` });
        const { error, status } = await getDataTable();
    
        if (!error) {
            const element = status.map((item, index) => ({
                solicitado: item.created,
                dias: item.vac_vacation_days,
                medio_dia: item.vac_half_day_time ? (item.vac_half_day_time == 'morning' ? 'Mañana' : 'Tarde') : '--',
                desde: item.vac_start_date,
                hasta: item.vac_end_date,
                estado: item.vac_request_status,
                fecha_respuesta: item.vac_response_date,
                acciones: <SmallButtons key={index} config_buttons={[
                    {
                        "class": `btn btn-success btn-icon ${item.vac_request_status == 'Pendiente' ? '' : 'disabled'}`,
                        "icon": `fa-regular fa-eye`,
                        "label": ``,
                        "url": `#`,
                        "id": ``,
                        "def": () => get_data_row(item)
                    }
                ]} />
                
            }));
            setDataTable(element);
        }
    
        const endTime = performance.now();
        setTimeGetData(endTime - startTime);
        setLoading_(false);
        getDaysVacations();
    }, [id_user]); // Agregamos id_user como dependencia
    

    const validateFields = () => {
        const newErrors = {};
    
        if (isHalfDay) {
            if (!initDate) {
                newErrors.initDate = 'Debe seleccionar un día para medio día.';
            }
            if (!halfDayTime) {
                newErrors.halfDayTime = 'Debe seleccionar si es en la mañana o en la tarde.';
            }
        } else {
            if (!initDate) {
                newErrors.initDate = 'Debe seleccionar la fecha de inicio.';
            }
            if (!endDate) {
                newErrors.endDate = 'Debe seleccionar la fecha de término.';
            } else if (initDate && endDate < initDate) {
                newErrors.endDate = 'La fecha de término no puede ser menor que la fecha de inicio.';
            }
            if (!days || days <= 0) {
                newErrors.days = 'Debe seleccionar la cantidad de días.';
            } else if (days > availableDays) {
                newErrors.days = `No puede solicitar más de ${availableDays} días.`;
            }
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleEndDateChange = (end) => {
        const startDate = initDate;
        const endDate = end;
        sendVacationRequest(startDate, endDate);
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
        if (!validateFields()) {
            console.log('Errores de validación:', errors);
            return;
        }
    
        const { postDataApi } = useFech({ url: `/vacation/?collaborator=${id_user}` });
    
        const payload = {
            vac_noon_days: isHalfDay ? isHalfDay : null,
            vac_half_day_time: isHalfDay ? halfDayTime : null,
            vac_vacation_days: isHalfDay ? 0.5 : days,
            collaborator: id_user,
            vac_start_date: initDate,
            vac_end_date: endDate,
            vac_type_vacations: typeDay
        };
    
        const { error, status } = await postDataApi(payload);

        if (error) {
            $.alert(status.error);
            return;
        }

        get_data_table();
    };

    const calculateDays = (start, end) => {
        if (isHalfDay) return 0.5; // Si es medio día, retorna directamente 0.5
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate - startDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Incluye ambos días
    };
    
    useEffect(() => {
        get_data_table();
    }, [id_user]);

    const config_table = useMemo(() => ({
        loading: loading_,
        search_input: true,
    }), [loading_]);
    

    return (
        <>
            <div className="row d-flex">
                {/* Lado izquierdo: Cards */}
                <div className="col-3">
                    <div className="card border-start-lg border-start-success mb-3">
                        <div className="card-body">
                            <div className="h3 d-flex align-items-center">
                                Dias de vacaciones: {availableDays} dias
                            </div>
                            <a className="text-arrow-icon small text-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" href="#!">
                                Solicitar vacaciones
                                
                            </a>
                            <ModalStatic 
                                body_modal={{
                                    title: "Solicitar vacaciones",
                                    body: (
                                        <div>
                                            <div className="form-group">
                                                <div className="form-check form-check-solid">
                                                    <input 
                                                        className="form-check-input" 
                                                        id="flexCheckSolidDefault" 
                                                        type="checkbox" 
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexCheckSolidDefault">
                                                        Medio día
                                                    </label>
                                                </div>

                                                {isHalfDay && (
                                                    <div className="mt-3">
                                                        <div className="form-group mt-3">
                                                            <label>Franja horaria</label>
                                                            <Select
                                                                placeholder={'Seleccione'}
                                                                options={listHalfDayTime}
                                                                onChange={(option) => setHalfDayTime(option?.value || '')}
                                                                value={listHalfDayTime.find((option) => option.value === halfDayTime) || null}
                                                            />
                                                            {errors.halfDayTime && (<div className="text-danger">{errors.halfDayTime}</div>)}
                                                        </div>
                                                    </div>
                                                )}

                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-12">
                                                    <div className="form-group mt-3">
                                                        <label>Tipo de días</label>
                                                        <Select
                                                            placeholder="Seleccione"
                                                            options={listTypeVacations}
                                                            onChange={(option) => setTypeDay(option?.value || '')}
                                                            value={listTypeVacations.find((option) => option.value === typeDay) || null}
                                                        />
                                                        {errors.typeDay && <div className="text-danger">{errors.typeDay}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-3">

                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Desde</label>
                                                        <input 
                                                            type="date" 
                                                            className={`form-control form-control-solid w-100 ${errors.initDate ? 'is-invalid' : ''}`}
                                                            onChange={(e) => {
                                                                setInitDate(e.target.value || '');

                                                                if (isHalfDay) {
                                                                    setEndDate(e.target.value); // Si es medio día, "Desde" y "Hasta" deben ser iguales
                                                                    setDays(0.5); // Siempre 0.5 para medio día
                                                                } else if (endDate && e.target.value > endDate) {
                                                                    setEndDate('');
                                                                    setDays(0);
                                                                } else if (endDate) {
                                                                    const diffDays = calculateDays(e.target.value, endDate);
                                                                    if (diffDays > availableDays) {
                                                                        setDays(availableDays);
                                                                        setErrors((prevErrors) => ({
                                                                            ...prevErrors,
                                                                            days: `No puede solicitar más de ${availableDays} días.`,
                                                                        }));
                                                                    } else {
                                                                        setDays(diffDays);
                                                                        setErrors((prevErrors) => ({
                                                                            ...prevErrors,
                                                                            days: undefined,
                                                                        }));
                                                                    }
                                                                }
                                                            }}
                                                            value={initDate}
                                                        />
                                                        {errors.initDate && (<div className="text-danger">{errors.initDate}</div>)}
                                                    </div>
                                                </div>


                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Hasta</label>
                                                        <input 
                                                            type="date" 
                                                            className={`form-control form-control-solid w-100 ${errors.endDate ? 'is-invalid' : ''}`}
                                                            onChange={(e) => {
                                                                if (isHalfDay) {
                                                                    setEndDate(e.target.value); // Si es medio día, "Hasta" y "Desde" deben ser iguales
                                                                    setDays(0.5); // Siempre 0.5 para medio día
                                                                } else if (initDate && e.target.value < initDate) {
                                                                    setEndDate('');
                                                                    setDays(0);
                                                                    setErrors((prevErrors) => ({
                                                                        ...prevErrors,
                                                                        endDate: 'La fecha de término no puede ser menor que la fecha de inicio.'
                                                                    }));
                                                                } else {
                                                                    setEndDate(e.target.value || '');

                                                                    if (initDate) {
                                                                        //const diffDays = calculateDays(initDate, e.target.value);
                                                                        const diffDays = handleEndDateChange(e.target.value)
                                                                        console.log('diff_days', diffDays)
                                                                        if (diffDays > availableDays) {
                                                                            setDays(availableDays);
                                                                            setErrors((prevErrors) => ({
                                                                                ...prevErrors,
                                                                                days: `No puede solicitar más de ${availableDays} días.`,
                                                                            }));
                                                                        } else {
                                                                            setDays(diffDays);
                                                                            setErrors((prevErrors) => ({
                                                                                ...prevErrors,
                                                                                days: undefined,
                                                                            }));
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                            value={endDate}
                                                        />
                                                        {errors.endDate && (<div className="text-danger">{errors.endDate}</div>)}
                                                    </div>
                                                </div>


                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-12">
                                                    <label>Días solicitados</label>
                                                    <input 
                                                        type="number" 
                                                        className={`form-control form-control-solid w-100 ${errors.days ? 'is-invalid' : ''}`}
                                                        value={days}
                                                        readOnly // Bloquear edición manual
                                                    />
                                                    {errors.days && (<div className="text-danger">{errors.days}</div>)}
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                    footer: (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => send_form_data()}
                                        >
                                            Solicitar
                                        </button>
                                    )
                                }}
                                onClose={resetForm}
                            />

                        </div>
                    </div>
                    <div className="card border-start-lg border-start-success">
                        <div className="card-body">
                            <div className="h3 d-flex align-items-center">
                                Detalle:
                            </div>
                            <p>
                                Dias solicitados: {daysRequested}
                            </p>
                            <p>
                                Desde: {daysStart}
                            </p>
                            <p>
                                Hasta: {daysStop}
                            </p>
                            <p>
                                Fecha solicitud: {applicationDate}
                            </p>
                            <p>
                                Estado: {requestStatus}
                            </p>
                            <p className="text-center">
                                <button 
                                    type="button" 
                                    className="btn btn-primary"
                                    onClick={() => update_estate(idVacations, 2)}
                                    >aprobar</button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick={() => update_estate(idVacations, 3)}
                                    >Rechazar</button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Lado derecho: Nuevo contenido */}
                <div className="col-9">
                    <div className="h-100">
                        <div>
                            {loading_ ? (
                                <div className="alert alert-info text-center" role="alert">
                                    Cargando datos...
                                </div>
                            ) : dataTable.length > 0 ? (
                                <TableDinamyc data_in_table={dataTable} config_table={config_table} title={title_table} timeGetData={timeGetData} />
                            ) : (
                                <div className="alert alert-info text-center" role="alert">
                                    No hay datos
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};
