import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { useFech } from '../../../hooks/useFech';

export const UserApv = () => {

    const { id_user } = useParams();

    const [instituciones, setInstituciones] = useState([]);
    const [monedas, setMonedas] = useState([
        { value: 1, label: 'Peso (CLP)' },
        { value: 2, label: 'Unidad de Fomento (UF)' },
    ]);
    const [tiposPago, setTiposPago] = useState([
        { value: 1, label: 'Directo' },
        { value: 2, label: 'Indirecto' },
    ]);
    const [regimenes, setRegimenes] = useState([
        { value: 1, label: 'Régimen A' },
        { value: 2, label: 'Régimen B' },
    ]);

    const [institucion, setInstitucion] = useState('1');
    const [valorPlan, setValorPlan] = useState('');
    const [moneda, setMoneda] = useState('');
    const [tipoPago, setTipoPago] = useState('');
    const [rebajaImpuestos, setRebajaImpuestos] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [mesInicio, setMesInicio] = useState('');
    const [mesTermino, setMesTermino] = useState('');
    const [errors, setErrors] = useState({});
    const [exists, setExists] = useState({});

    const { getDataTable: userData } = useFech({ url: `get-voluntary-savings-apv-by-user-view/${id_user}/` });
    const { getDataTable: listInstituciones } = useFech({ url: 'institutions-apv/' });

    const getUserData = async () => {
        const { error, status } = await userData();
        if (error) {
            setExists(false);
            return;
        }

        setExists(true);
        setInstitucion(status.institutions_apv.toString());
        setValorPlan(status.vs_value_plan);
        setMoneda(status.vs_money_type);
        setTipoPago(status.vs_payment_type);
        setRebajaImpuestos(status.vs_regimen_type);
        setNumeroDocumento(status.vs_document_number);
        setMesInicio(status.vs_month_start);
        setMesTermino(status.vs_month_end);
    };

    const getInstituciones = async () => {
        const { error, status } = await listInstituciones();
        if (error) {
            alert('Error al obtener las instituciones');
            return;
        }
        const list_data = status.map(value => ({
            value: value.apv_id.toString(),
            label: value.apv_name,
        }));
        setInstituciones(list_data);
    };

    const validateFields = () => {
        const newErrors = {};
        if (institucion !== '1') {
            if (!valorPlan || isNaN(valorPlan) || valorPlan <= 0) newErrors.valorPlan = 'Debe ingresar un valor válido para el plan.';
            if (!moneda) newErrors.moneda = 'Debe seleccionar una moneda.';
            if (!tipoPago) newErrors.tipoPago = 'Debe seleccionar un tipo de pago.';
            if (!rebajaImpuestos) newErrors.rebajaImpuestos = 'Debe seleccionar un régimen de rebaja de impuestos.';
            if (!numeroDocumento) newErrors.numeroDocumento = 'Debe ingresar el número de documento.';
            if (!mesInicio) newErrors.mesInicio = 'Debe seleccionar el mes de inicio.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInstitutionChange = (option) => {
        setInstitucion(option.value);
        if (option.value === '1') {
            setValorPlan('');
            setMoneda('');
            setTipoPago('');
            setRebajaImpuestos('');
            setNumeroDocumento('');
            setMesInicio('');
            setMesTermino('');
        }
    };

    const sendFormData = async () => {

        if (institucion === '1') {
            $.alert("Debe llenar los campos para asignar un plan APV.");
            return;
        }
        if (!validateFields()) return;

        const data = {
            user: id_user,
            institutions_apv: institucion,
            vs_value_plan: valorPlan,
            vs_money_type: moneda,
            vs_payment_type: tipoPago,
            vs_regimen_type: rebajaImpuestos,
            vs_document_number: numeroDocumento,
            vs_month_start: mesInicio,
            vs_month_end: mesTermino,
        };
    
        const url = exists
            ? `voluntary-savings-apv-user/${id_user}/` // Para actualizar
            : `add-voluntary-savings-apv/`;          // Para crear
    
        const method = exists ? 'updateDataApi' : 'postDataApi';
    
        try {
            const { [method]: apiCall } = useFech({ url });
            const { error, status } = await apiCall(data);
    
            if (error) {
                return;
            }
            $.alert("Plan APV registrado exitosamente.");
        } catch (err) {
            console.error('Error durante la operación:', err);
            $.alert("Error inesperado al procesar la solicitud. Por favor, inténtelo más tarde.");
        }
    };
    

    useEffect(() => {
        getInstituciones();
    }, []);

    useEffect(() => {
        getUserData();
    }, [id_user]);

    return (
        <>
            <div className="row">
                <div className="col-3 mb-3">
                    <label htmlFor="institucion">Institución</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={instituciones}
                        classNamePrefix="react-select"
                        className={errors.institucion ? 'is-invalid' : ''}
                        onChange={handleInstitutionChange}
                        value={instituciones.find((opt) => opt.value === institucion) || null}
                    />
                    {errors.institucion && <div className="text-danger">{errors.institucion}</div>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="valorPlan">Valor del Plan</label>
                    <input
                        type="number"
                        className={`form-control ${errors.valorPlan ? 'is-invalid' : ''}`}
                        onChange={(e) => setValorPlan(e.target.value)}
                        value={valorPlan}
                        disabled={institucion === '1'}
                    />
                    {errors.valorPlan && <div className="text-danger">{errors.valorPlan}</div>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="moneda">Moneda</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={monedas}
                        classNamePrefix="react-select"
                        onChange={(option) => setMoneda(option.value)}
                        value={monedas.find((opt) => opt.value === moneda) || null}
                        isDisabled={institucion === '1'}
                    />
                    {errors.moneda && <div className="text-danger">{errors.moneda}</div>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="tipoPago">Tipo de Pago</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={tiposPago}
                        classNamePrefix="react-select"
                        onChange={(option) => setTipoPago(option.value)}
                        value={tiposPago.find((opt) => opt.value === tipoPago) || null}
                        isDisabled={institucion === '1'}
                    />
                    {errors.tipoPago && <div className="text-danger">{errors.tipoPago}</div>}
                </div>
            </div>

            <div className="row">
                <div className="col-3 mb-3">
                    <label htmlFor="rebajaImpuestos">Régimen de Rebaja de Impuestos</label>
                    <Select
                        placeholder="-- Seleccione --"
                        options={regimenes}
                        classNamePrefix="react-select"
                        onChange={(option) => setRebajaImpuestos(option.value)}
                        value={regimenes.find((opt) => opt.value === rebajaImpuestos) || null}
                        isDisabled={institucion === '1'}
                    />
                    {errors.rebajaImpuestos && <div className="text-danger">{errors.rebajaImpuestos}</div>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="numeroDocumento">N° Documento</label>
                    <input
                        type="text"
                        className={`form-control ${errors.numeroDocumento ? 'is-invalid' : ''}`}
                        onChange={(e) => setNumeroDocumento(e.target.value)}
                        value={numeroDocumento}
                        disabled={institucion === '1'}
                    />
                    {errors.numeroDocumento && <div className="text-danger">{errors.numeroDocumento}</div>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="mesInicio">Mes de Inicio</label>
                    <input
                        type="month"
                        className={`form-control ${errors.mesInicio ? 'is-invalid' : ''}`}
                        onChange={(e) => setMesInicio(e.target.value)}
                        value={mesInicio || '1111-11'}
                        disabled={institucion === '1'}
                    />
                    {errors.mesInicio && <div className="text-danger">{errors.mesInicio}</div>}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="mesTermino">Mes de Término</label>
                    <input
                        type="month"
                        className="form-control"
                        onChange={(e) => setMesTermino(e.target.value)}
                        value={mesTermino || '1111-11'}
                        disabled={institucion === '1'}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 mt-3">
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => sendFormData()}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </>
    );
};
