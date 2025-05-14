import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../providers/AppProvider';
import { useFech } from '../../hooks/useFech';
import { MyWorkDetails } from './MyWorkDetails';

export const MyContracts = () => {
    const id_user = localStorage.getItem('user'); // Obtener usuario de localStorage
    const { updateBreadcrumbs, updateTitulo } = useContext(AppContext);
    const [dataUser, setDataUser] = useState([]);

    const { getDataTable: userData } = useFech({ url: `name-data-user-company/${id_user}/` });

    const getUserData = async () => {

        const { error, status } = await userData();
        if (error) {
            $.alert('Error al obtener los datos del usuario');
            return;
        }

        setDataUser(status);

        // Actualizar título y breadcrumb después de obtener los datos
        updateTitulo(`Contratos`);
        updateBreadcrumbs([
            { bread: `inicio` }, { bread: `mis datos laborales` }]
        );
    };

    useEffect(() => {
        if (id_user) {
            getUserData();
        }
    }, [id_user]);

    return (
        <>
            <div className='container-xl px-4 mt-n10'>
                <div className='row'>
                    <MyWorkDetails data={dataUser} />
                </div>
            </div>
        </>
    );
}
