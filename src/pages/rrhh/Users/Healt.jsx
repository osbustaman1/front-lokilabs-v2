import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { useFech } from '../../../hooks/useFech';

export const Healt = () => {
    const { id_user } = useParams();

    const [healts, setHealts] = useState([]);
    const [dataUserHealt, setDataUserHealt] = useState('');
    const [entityType, setEntityType] = useState('');
    const [entity, setEntity] = useState('');
    const [uf, setUf] = useState('');

    const { getDataTable: data_user } = useFech({ url: `get-user-company/forescat-data/by-user/${id_user}/` });
    const { getDataTable: list_healt } = useFech({ url: 'list-healts' });

    const getUserDataHealth = async () => {
        const { status } = await data_user();

        if (status.health === null) {
            //$.alert('Error al obtener datos de la entidad de salud asociada al usuario');
            return;
        }

        setUf(status.uc_ufisapre);
        setEntity(status.healt_entity_type);
        changeHealt('health', { value: status.health, label: 'entidad' });
    };

    const changeHealt = async (name, selectedOption) => {
        setDataUserHealt(selectedOption.value); 

        const afpHealts = useFech({ url: `view-healt/${selectedOption.value}/` });
        const { status } = await afpHealts.getInfo();

        if (status.healt_entity_type === 'F') {
            setUf('');
        }

        setEntityType(status);
        setEntity(status.healt_entity_type);
    };

    const getDataListHealt = async () => {
        const { status } = await list_healt();
        const list_data = status.map(value => ({
            value: value.healt_id,
            label: value.healt_name,
        }));
        setHealts(list_data);
    };

    const send_form_user_healt = async () => {
        if (!entityType) {
            $.alert('Seleccione entidad de salud');
            return;
        }

        if (entity === 'I' && (!uf || uf === '0')) {
            $.alert('Ingrese cantidad de UFs');
            return;
        }

        const data_send = { 
            health_id: entityType.healt_id, 
            entity_type: entity,
            value_plan: uf
        }

        const { updateDataApi } = useFech({ url: `update-user-healt/by-user/${id_user}/` });
        const { error, status } = await updateDataApi(data_send);

        if (error) {
            $.alert('Error al asignar la entidad de salud, contactar con administrador');
        } else {
            $.alert('Entidad de salud asignada con éxito');
        }
    };

    useEffect(() => {
        getDataListHealt();
    }, []);
    
    useEffect(() => {
        getUserDataHealth();
    }, [id_user]);

    return (
        <>
            <form id='form_data_health'>
                <div className="row">
                    <div className="col-3 mb-3">
                        <Select 
                            placeholder={'-- Seleccione --'}
                            options={healts}
                            onChange={(healts) => changeHealt('health', healts)}
                            value={healts.find(option => option.value === dataUserHealt)}
                            />
                    </div>
                    <div className="col-3 mb-3">
                        <input
                                type="number"
                                id='id_input'
                                className="form-control"
                                name='name_input'
                                placeholder='Cantidad UFs'
                                disabled={entity === 'F' ? true : false}
                                onChange={(e) => setUf(e.target.value)}
                                value={entity === 'F' ? '' : uf}
                            />
                    </div>
                    <div className="col-3 mb-3">
                        <button 
                            type='button'
                            className='btn btn-primary btn-sm btn-sm mt-1'
                            onClick={() => send_form_user_healt()}>Guardar</button>
                    </div>
                </div>
            </form>

            <div className="col-6">
                <div className="alert alert-primary alert-icon" role="alert">
                    <div className="alert-icon-aside">
                        <i className="far fa-flag"></i>
                    </div>
                    <div className="alert-icon-content">
                        <h6 className="alert-heading"><small>Datos de la entidad de salud</small> :{entityType.healt_name}</h6>
                        <small>Código: {entityType.healt_code}<br /></small>
                        <small>RUT: {entityType.healt_rut}<br /></small>

                        {entity === 'F' && (
                            <span>Porcentaje pactado de 7%</span>
                        )}
                        {entity === 'I' && (
                            <div>
                                <small>Valor pactado en {uf ? uf : 0}UF a pesos: ($) {isNaN(Math.round(parseFloat(uf) * localStorage.getItem('uf'))) ? 0 : Math.round(parseFloat(uf) * localStorage.getItem('uf')).toLocaleString('es-CL')}<br /></small>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </>
    );
};
