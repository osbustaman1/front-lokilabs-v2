import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { useFech } from '../../hooks/useFech';

export const MyAddress = ({ data }) => {

    const id_user = localStorage.getItem('user'); // Obtener usuario de localStorage

    const { getDataTable: list_regions } = useFech({ url: 'list-region' });
    const { getDataTable: list_communes } = useFech({ url: 'list-commune' });

    const [region, setRegion] = useState('');
    const [commune, setCommune] = useState('');
    const [address, setAddress] = useState('');
    const [otherData, setOtherData] = useState('');

    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);

    const [errors, setErrors] = useState({});


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
    
        if (!address) {
            newErrors.address = 'Falta la dirección.';
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
            emp_address: address,
            region: region,
            commune: commune,
            emp_other_address: otherData
        });

        if (error) {
            $.alert(status.message);
        } else {
            const { com_id, message } = status;
            $.alert("Los datos fueron actualizados correctamente.");
            return false;
        }

    };

    useEffect(() => {
        getRegion();
        getCommune();
    }, [data]);

    useEffect(() => {
        setAddress(data.address);
        setRegion(data.region);
        setCommune(data.commune);
        setOtherData(data.other_address);
    }, [data]);


    return (
        <>
            <div className="col-4 mb-4">

                <div className="card h-100">
                    <div className="card-body d-flex justify-content-center">
                        <div className="align-items-center justify-content-between">
                            
                            <div className="me-3">
                                <i className="fa-solid fa-map-location-dot"></i>
                                <h5>
                                    Mis dirección
                                </h5>
                                <div className="text-muted small row">
                                    
                                    <div className="col-12">
                                        <label>Región</label>
                                        <Select 
                                            placeholder={'Seleccione'}
                                            options={regions}
                                            classNamePrefix="react-select"
                                            onChange={(option) => setRegion(option.value)}
                                            value={regions.find((opt) => opt.value === region) || null}
                                            />
                                    </div>
                                    <div className="col-12 mt-3">
                                        <label>Comuna</label>
                                        <Select 
                                            placeholder={'Seleccione'}
                                            options={communes}
                                            classNamePrefix="react-select"
                                            onChange={(option) => setCommune(option.value)}
                                            value={communes.find((opt) => opt.value === commune) || null}
                                            />
                                    </div>
                                    <div className="col-12 mt-3">
                                        <label>Calle</label>
                                        <input 
                                            className="form-control form-control-solid w-100" 
                                            type="text"
                                            onChange={(e) => setAddress(e.target.value)}
                                            value={address || ''}
                                            />
                                    </div>
                                    <div className="col-12 mt-3">
                                        <label>Departamento/villa/block</label>
                                        <input 
                                            className="form-control form-control-solid w-100" 
                                            type="text"
                                            onChange={(e) => setOtherData(e.target.value)}
                                            value={otherData || ''}
                                            />
                                    </div>
                                    <div className="col-12 mt-3" style={{textAlign: 'right'}}>
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
        </>
    )
}
