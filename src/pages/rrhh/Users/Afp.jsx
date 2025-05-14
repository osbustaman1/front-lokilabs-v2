import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { useFech } from '../../../hooks/useFech';

export const Afp = () => {
    const { id_user } = useParams();

    const [afps, setAfps] = useState([]);
    const [dataUserAfp, setDataUserAfp] = useState('');
    const [afp, setAfp] = useState({});

    const { getDataTable: data_user } = useFech({ url: `get-user-company/forescat-data/by-user/${id_user}/` });
    const { getDataTable: list_afp } = useFech({ url: 'list-afps' });

    const getDataListAfp = async () => {
        const { status } = await list_afp();
        const list_data = status.map(value => ({
            value: value.afp_id,
            label: value.afp_name,
        }));
        setAfps(list_data);
    };

    const getUserDataAfp = async () => {
        const { status } = await data_user();
        setDataUserAfp(status.afp);

        const { getDataTable: get_afp } = useFech({ url: `view-afp/${status.afp}/` });
        const data = await get_afp();
        setAfp(data.status);

        changeAfp('afp', { value: data.status.afp_id, label: 'entidad' });
    };

    const changeAfp = async (name, selectedOption) => {
        setDataUserAfp(selectedOption.value);
        const afpFetch = useFech({ url: `view-afp/${selectedOption.value}/` });
        const { status } = await afpFetch.getInfo();
        setAfp(status);
    };

    const sendAfp = async () => {

        if (!afp || Object.keys(afp).length === 0) {
            $.alert('Seleccione una AFP');
            return;
        }

        const { updateDataApi } = useFech({ url: `update-user-afp/by-user/${id_user}/` });
        const { error } = await updateDataApi({ afp_id: afp.afp_id });

        if (error) {
            $.alert('Error al asignar la AFP');
        } else {
            $.alert('AFP asignada con éxito');
        }
    };

    useEffect(() => {
        getDataListAfp();
    }, []);

    useEffect(() => {
        getUserDataAfp();
    }, [id_user]);

    return (
        <>
            <form id='form_data_afp'>
                <div className="row">
                    <div className="col-3 mb-3">
                        <Select 
                            placeholder={'-- Seleccione --'}
                            options={afps}
                            onChange={(afps) => changeAfp('afp', afps)}
                            value={afps.find(option => option.value === dataUserAfp)}
                            />
                    </div>
                    
                    <div className="col-3 mb-3">
                    <button 
                            type='button'
                            className='btn btn-primary btn-sm btn-sm mt-1'
                            onClick={() => sendAfp()}>Guardar</button>
                    </div>
                </div>
            </form>

            <div className="col-6">
                <div className="alert alert-primary alert-icon" role="alert">
                    <div className="alert-icon-aside">
                        <i className="far fa-flag"></i>
                    </div>
                    <div className="alert-icon-content">
                        <h6 className="alert-heading"><small>Datos de la AFP</small> :{afp.afp_name}</h6>
                        <small>Código Previred: {afp.afp_code_previred}<br /></small>
                        <small>Porcentaje: {afp.afp_dependent_worker_rate}%<br /></small>
                        <small>Pensionados: {afp.afp_self_employed_worker_rate}%<br /></small>
                        <small>SIS: {afp.afp_sis}%<br /></small>
                    </div>
                </div>
            </div>
        </>
    );
};
