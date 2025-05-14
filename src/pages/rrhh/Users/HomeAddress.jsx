import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { useFech } from '../../../hooks/useFech';

export const HomeAddress = () => {

    const { id_user } = useParams();
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);

    
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [commune, setCommune] = useState('');
    const [address, setAddress] = useState('');

    const [errors, setErrors] = useState({});

    const { getDataTable: list_countries } = useFech({ url: 'list-countries' });
    const { getDataTable: list_regions } = useFech({ url: 'list-region' });
    const { getDataTable: list_communes } = useFech({ url: 'list-commune' });

    const { getDataTable: userData } = useFech({ url: `employee/by-user/${id_user}/` });

    const getUserData = async () => {
        const { error, status } = await userData();
        if (error) {
            $.alert('Error al obtener los datos del usuario');
            return;
        }

        setCountry(status.country);
        setRegion(status.region);
        setCommune(status.commune);
        setAddress(status.emp_address);
    };

    const getCountry = async () => {
        const { error, status } = await list_countries();
        if (error) {
            $.alert('Error al obtener los paises');
            return;
        }
        const list_data = status.map(value => ({
            value: value.cou_id,
            label: value.cou_name,
        }));
        setCountries(list_data);
    };

    const getRegion = async () => {
        const { error, status } = await list_regions();
        if (error) {
            $.alert('Error al obtener las regiones');
            return;
        }
        const list_data = status.map(value => ({
            value: value.re_id,
            label: value.re_name,
        }));
        setRegions(list_data);
    };

    const getCommune = async () => {
        const { error, status } = await list_communes();
        if (error) {
            $.alert('Error al obtener las comunas');
            return;
        }
        const list_data = status.map(value => ({
            value: value.com_id,
            label: value.com_name,
        }));
        setCommunes(list_data);
    };

    const validateFields = () => {
        const newErrors = {};

        if (!countries) {
            newErrors.countries = 'Debe seleccionar un país.';
        }

        if (!regions) {
            newErrors.regions = 'Debe seleccionar una región.';
        }

        if (!communes) {
            newErrors.communes = 'Debe seleccionar una comuna.';
        }

        if (!address.trim()) {
            newErrors.address = 'Debe ingresar una dirección.';
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
            country: country,
            region: region,
            commune: commune,
            emp_address: address
        });

        if (error) {
            $.alert(status.message);
        } else {
            const { com_id, message } = status;
            $.alert("Dirección particular agregada con éxito");
            return false;
        }
    };

    useEffect(() => {
        getCountry();
        getRegion();
        getCommune();
    }, [id_user]);

    useEffect(() => {
        getUserData();
    }, [id_user]);

    return (
        <>
            <div className="row">
                <div className="col-3 mb-3">
                    <label htmlFor="">País</label>
                    <Select
                        placeholder={'-- Seleccione --'}
                        options={countries}
                        classNamePrefix="react-select"
                        className={errors.countries ? 'is-invalid' : ''}
                        onChange={(option) => setCountry(option.value)}
                        value={countries.find((opt) => opt.value === country) || null}
                    />
                    {errors.countries && (
                        <div className="text-danger">{errors.countries}</div>
                    )}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="">Región</label>
                    <Select
                        placeholder={'-- Seleccione --'}
                        options={regions}
                        classNamePrefix="react-select"
                        onChange={(option) => setRegion(option.value)}
                        className={errors.regions ? 'is-invalid' : ''}
                        value={regions.find((opt) => opt.value === region) || null}
                    />
                    {errors.regions && (
                        <div className="text-danger">{errors.regions}</div>
                    )}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="">Comuna</label>
                    <Select
                        placeholder={'-- Seleccione --'}
                        options={communes}
                        classNamePrefix="react-select"
                        onChange={(option) => setCommune(option.value)}
                        className={errors.communes ? 'is-invalid' : ''}
                        value={communes.find((opt) => opt.value === commune) || null}
                    />
                    {errors.communes && (
                        <div className="text-danger">{errors.communes}</div>
                    )}
                </div>
                <div className="col-3 mb-3">
                    <label htmlFor="">Dirección</label>
                    <input
                        type="text"
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        onChange={(e) => setAddress(e.target.value)}
                        value={address || ''}
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
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
