import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { useFech } from '../../../hooks/useFech';

export const ContractData = () => {
    const { id_user } = useParams();
    const company = localStorage.getItem('company');

    // Opciones estáticas
    const listTypeWorker = [
        { value: 1, label: 'Activo (no pensionado)' },
        { value: 2, label: 'Pensionado y cotiza AFP' },
        { value: 3, label: 'Pensionado y no cotiza AFP' },
        { value: 4, label: 'Activo mayor de 65 años (nunca pensionado)' },
    ];

    const listDayType = [
        { value: 1, label: 'Ordinarias' },
        { value: 2, label: 'Extraordinarias' },
    ];

    const listContractType = [
        { value: 1, label: 'Plazo Indefinido' },
        { value: 2, label: 'Plazo Fijo' },
        { value: 3, label: 'Plazo Indefinido 11 años o más' },
        { value: 4, label: 'Trabajador de Casa Particular' },
    ];

    const listSector = [
        { value: 1, label: 'Público' },
        { value: 2, label: 'Privado' },
    ];

    const listWeekRun = [
        { value: 'Y', label: 'Sí' },
        { value: 'N', label: 'No' },
    ];

    const listDaysAgreed = [
        { value: 1, label: 'Lunes' },
        { value: 2, label: 'Martes' },
        { value: 3, label: 'Miércoles' },
        { value: 4, label: 'Jueves' },
        { value: 5, label: 'Viernes' },
        { value: 6, label: 'Sábado' },
        { value: 7, label: 'Domingo' },
    ];


    const [listTypeOfWorkModes ] = useState([
        { value: 1, label: "Trabajo con horario fijo o jornada ordinaria" },
        { value: 2, label: "Trabajo sin horario (Artículo 22 del Código del Trabajo)" },
        { value: 3, label: "Trabajo presencial" },
        { value: 4, label: "Teletrabajo o trabajo a distancia" },
        { value: 5, label: "Trabajo por turnos (rotativos, fijos, nocturnos, etc.)" },
        { value: 6, label: "Trabajo con jornada parcial" },
        { value: 7, label: "Trabajo por temporada o eventual" },
        { value: 8, label: "Trabajo en plataformas digitales" },
        { value: 9, label: "Trabajo por obra o faena" },
        { value: 10, label: "Trabajo freelance o independiente (con boletas de honorarios)" },
        { value: 11, label: "Trabajo en régimen de subcontratación" },
        { value: 12, label: "Trabajo a tiempo parcial juvenil (para estudiantes entre 18 y 28 años)" },
        { value: 13, label: "Trabajo híbrido (combinación de presencial y teletrabajo)" },
        { value: 14, label: "Trabajo doméstico" },
        { value: 15, label: "Prácticas profesionales" },
        { value: 16, label: "Trabajo en régimen especial para personas con discapacidad" },
        { value: 17, label: "Trabajo voluntario" },
        { value: 18, label: "Trabajo asociado a cooperativas (régimen especial para cooperativas)" },
        { value: 19, label: "Trabajo en régimen de aprendizaje (aprendices o programas formativos)" },
        { value: 20, label: "Trabajo en régimen de servicios transitorios (contratos por empresas de servicios transitorios)" }
    ]);

    const { getDataTable: userData } = useFech({ url: `get-user-company/by-user/${id_user}/` });

    // Estados del formulario
    const [contractDate, setContractDate] = useState('');
    const [typeWorker, setTypeWorker] = useState(null);
    const [dayType, setDayType] = useState(null);
    const [typeOfWorkModes, setTypeOfWorkModes] = useState(null);
    const [contractType, setContractType] = useState(null);
    const [sector, setSector] = useState(null);
    const [weekRun, setWeekRun] = useState(null);
    const [daysAgreed, setDaysAgreed] = useState([]);
    const [agreedWorkHours, setAgreedWorkHours] = useState(0);


    const  [contract, setContract] = useState('');
    const [listContracts, setListContracts] = useState([]);

    const [errors, setErrors] = useState({});

    const getContracts = async () => {
        const { getDataTable } = useFech({ url: `contract-type/${company}/` });
        const { error, status } = await getDataTable();

        if (error) {
            $.alert('Error al obtener los contratos');
            return;
        }

        const list_data = status.map((value) => ({
            value: value.ct_id,
            label: `${value.ct_contractcode} - ${value.ct_contractname}`,
        }));
        setListContracts(list_data);
    }

    const getUserData = async () => {
        const { error, status } = await userData();
        if (error) {
            $.alert('Error al obtener los datos del usuario');
            return;
        }

        setContractDate(status.uc_hiring_date);
        setTypeWorker(status.uc_workertype);
        setDayType(status.uc_type_of_work_day);
        setTypeOfWorkModes(status.us_type_of_work_modes);
        setContractType(status.uc_contracttype);
        setSector(status.uc_workersector);
        setWeekRun(status.uc_semanacorrida);
        setAgreedWorkHours(status.uc_weeklyhours);
        setContract(status.contractType);
        setDaysAgreed(status.uc_agreedworkdays ? status.uc_agreedworkdays.split(',').map((day) => ({ value: parseInt(day, 10), label: listDaysAgreed.find((option) => option.value === parseInt(day, 10)).label })) : []);
    };

    const validateFields = () => {
        const newErrors = {};

        if (!contractDate) {
            newErrors.contractDate = 'Debe ingresar la fecha de contrato.';
        }

        if (!typeWorker) {
            newErrors.typeWorker = 'Debe seleccionar el tipo de trabajador';
        }

        if (!dayType) {
            newErrors.dayType = 'Debe seleccionar el tipo de jornada';
        }

        if (!contractType) {
            newErrors.contractType = 'Debe seleccionar el tipo de contrato';
        }

        if (agreedWorkHours <= 0) {
            newErrors.agreedWorkHours = 'Debe ingresar las horas de trabajo pactadas';
        }

        if (!sector) {
            newErrors.sector = 'Debe seleccionar el sector';
        }

        if (!weekRun) {
            newErrors.weekRun = 'Debe seleccionar si la semana es corrida';
        }

        if (daysAgreed.length === 0) {
            newErrors.daysAgreed = 'Debe seleccionar al menos un día pactado';
        }

        if (contract === '') {
            newErrors.contract = 'Debe seleccionar un contrato';
        }

        if (typeOfWorkModes === '') {
            newErrors.typeOfWorkModes = 'Debe seleccionar una modalidad de trabajo';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Enviar datos del formulario
    const sendFormContractData = async () => {
        if (!validateFields()) {
            console.log('Errores de validación:', errors);
            return;
        }

        const { updateDataApi } = useFech({ url: `update-user-contract-data/by-user/${id_user}/` });
        const { error, status } = await updateDataApi({
            uc_hiring_date: contractDate,
            uc_workertype: typeWorker,
            uc_type_of_work_day: dayType,
            uc_contracttype: contractType,
            uc_weeklyhours: agreedWorkHours,
            uc_workersector: sector,
            uc_semanacorrida: weekRun,
            uc_agreedworkdays: daysAgreed.map((day) => day.value).join(','),
            contractType: contract,
            us_type_of_work_modes: typeOfWorkModes,
        });

        if (error) {
            $.alert(status.message);
        } else {
            const { com_id, message } = status;
            $.alert("Colaborador actualizado con éxito");
            return false;
        }
    };

    useEffect(() => {
        getUserData();
    }, [id_user]);

    useEffect(() => {
        getContracts();
    }, [company]);

    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <label>Fecha Contrato</label>
                    <input
                        type="date"
                        className="form-control form-control-solid w-100 "
                        onChange={(e) => setContractDate(e.target.value)}
                        value={contractDate || '' }
                    />
                    {errors.contractDate && (<div className="text-danger">{errors.contractDate}</div>)}
                </div>
                <div className="col-md-3">
                    <label>Tipo Trabajador</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={listTypeWorker}
                        onChange={(option) => setTypeWorker(option.value)}
                        value={listTypeWorker.find(option => option.value === typeWorker) || null}
                    />
                    {errors.typeWorker && (<div className="text-danger">{errors.typeWorker}</div>)}
                </div>
                <div className="col-md-3">
                    <label>Tipo de Jornada</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={listDayType}
                        onChange={(option) => setDayType(option.value)}
                        value={listDayType.find(option => option.value === dayType) || null}
                    />
                    {errors.dayType && (<div className="text-danger">{errors.dayType}</div>)}
                </div>
                <div className="col-md-3">
                    <label>Tipo de Contrato</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={listContractType}
                        onChange={(option) => setContractType(option.value)}
                        value={listContractType.find(option => option.value === contractType) || null}
                    />
                    {errors.contractType && (<div className="text-danger">{errors.contractType}</div>)}
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-3">
                    <label>Modalidad de trabajo</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={listTypeOfWorkModes}
                        onChange={(option) => setTypeOfWorkModes(option.value)}
                        value={listTypeOfWorkModes.find(option => option.value === typeOfWorkModes) || null}
                    />
                    {errors.typeOfWorkModes && (<div className="text-danger">{errors.typeOfWorkModes}</div>)}
                </div>

                <div className="col-md-3">
                    <label>Contrato</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={listContracts}
                        onChange={(option) => setContract(option.value)}
                        value={listContracts.find(option => option.value === contract) || null}
                    />
                    {errors.contract && (<div className="text-danger">{errors.contract}</div>)}
                </div>


                <div className="col-md-3">
                    <label>Horas de trabajo pactadas</label>
                    <input
                        type="number"
                        className="form-control form-control-solid w-100 "
                        onChange={(e) => setAgreedWorkHours(e.target.value)}
                        value={agreedWorkHours || 0 }
                    />
                    {errors.agreedWorkHours && (<div className="text-danger">{errors.agreedWorkHours}</div>)}
                </div>
                <div className="col-md-3">
                    <label>Sector</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={listSector}
                        onChange={(option) => setSector(option.value)}
                        value={listSector.find(option => option.value === sector) || null}
                    />
                    {errors.sector && (<div className="text-danger">{errors.sector}</div>)}
                </div>

            </div>


            <div className="row mt-3">
                <div className="col-md-3">
                    <label>Semana Corrida</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={listWeekRun}
                        onChange={(option) => setWeekRun(option.value)}
                        value={listWeekRun.find(option => option.value === weekRun) || null}
                    />
                    {errors.weekRun && (<div className="text-danger">{errors.weekRun}</div>)}
                </div>
                <div className="col-md-3">
                    <label>Días Pactados</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={listDaysAgreed}
                        isMulti
                        onChange={(selectedOptions) => setDaysAgreed(selectedOptions || [])}
                        value={daysAgreed}
                    />

                    {errors.daysAgreed && (<div className="text-danger">{errors.daysAgreed}</div>)}
                </div>
            </div>

            <div className="col-md-3 mt-3">
                <button
                    type="button"
                    className="btn btn-primary btn-sm mt-4"
                    onClick={sendFormContractData}
                >
                    Guardar
                </button>
            </div>
        </>
    );
};
