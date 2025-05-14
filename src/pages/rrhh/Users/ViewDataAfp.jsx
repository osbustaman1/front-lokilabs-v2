import React, { useEffect, useState, useContext } from 'react';
import { useFech } from '../../../hooks/useFech';
import { AppContexEntitie } from '../../../providers/AppProvider';

export const ViewDataAfp = () => {

    const { nameEntitie: { value, label, type_entitie } } = useContext(AppContexEntitie);

    const [afp, setAfp] = useState({});
    const [healt, setHealt] = useState({});


    const afpFetch = useFech({ url: `view-afp/${value}/` });
    const healtFetch = useFech({ url: `view-healt/${value}/` });
    
    const getAfpData = async () => {
        const { error, status } = await afpFetch.getInfo();
        setAfp(status);
    };

    const getHealtData = async () => {
        const { error, status } = await healtFetch.getInfo();
        setHealt(status);
    };

    useEffect(() => {
        if (type_entitie === 'afp') {
            getAfpData();
        } else if (type_entitie === 'healt') {
            getHealtData();
        }
    }, [value, type_entitie]);

    useEffect(() => {
        if (healt.healt_entity_type === 'F') {
            console.log('Fonasa')
        } else if (healt.healt_entity_type === 'I') {
            console.log('Isapre')
        }
    }, [healt]);


    return (
        <>

            <div className="col-6">
                <div className="alert alert-primary alert-icon" role="alert">
                    
                    <div className="alert-icon-aside">
                        <i className="far fa-flag"></i>
                    </div>
                    <div className="alert-icon-content">
                        <h6 className="alert-heading">Datos de la AFP</h6>
                        Código Previred: {afp.afp_code_previred}<br />
                        Nombre: {afp.afp_name}<br />
                        Porcentaje: {afp.afp_dependent_worker_rate}%
                    </div>
                </div>

            </div>


            <div className="col-6">
                <div className="alert alert-primary alert-icon" role="alert">
                    
                    <div className="alert-icon-aside">
                        <i className="far fa-flag"></i>
                    </div>
                    <div className="alert-icon-content">
                        <h6 className="alert-heading">Datos entidad de Salud</h6>
                        Código Previred: {healt.healt_code}<br />
                        Nombre: {healt.healt_name}<br />
                        Rut :  {healt.healt_rut} <br />
                        {healt.healt_entity_type === 'F' && (
                            <span>Porcentaje pactado de 7%</span>
                        )}
                        {healt.healt_entity_type === 'I' && (
                            <span>Valor pactado en UF</span>
                        )} 
                        
                        
                        <br />
                    </div>
                </div>

            </div>


        </>
    )
}