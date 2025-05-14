import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { AppContext } from '../../providers/AppProvider';
import { TableDinamyc } from '../../components/datatable/TableDinamyc';
import { useFech } from '../../hooks/useFech';
import { SmallButtons } from '../../components/buttons/SmallButtons';
import { ModalStatic } from '../../components/modal/ModalStatic';

const dict_bread_crumb = [
    { "bread": "Solicitudes" }
];

const dict_title = { "tittle": "Solicitudes de mi equipo" };

const buttons_menu = [];

export const TeamRequests = () => {

    const id_user = localStorage.getItem('user');
    const title_table = '';

    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);

    const [dataTable, setDataTable] = useState([]);
    const [timeGetData, setTimeGetData] = useState(0);
    const [loading_, setLoading_] = useState(true);

    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, [id_user]);

    const acction_request = async (id, state, type_request, user) => {
        
        $.confirm({
            title: 'Confirmación!',
            content: `Al aceptar estará ${state == 2 ? 'aprobando' : 'rechazando'} la solicitud de ${type_request}, ¿está seguro de proceder?`,
            buttons: {
                confirmar: async function () {

                    const { updateDataApi } = useFech({ url: `update-vacation-user/` });
                    const payload = {
                        collaborator: user,
                        vac_id: id,
                        vac_request_status: state,
                        vac_response_date: new Date().toISOString().split('T')[0]
                    };

                    console.log(payload);
                    const { error, status } = await updateDataApi(payload);
                    if (error) {
                        $.alert('Error al actualizar el estado de la solicitud');
                        return;
                    }

                    get_data_table();
                    $.alert(`Solicitud! ${state == 2 ? 'Aprobada' : 'Rechazada'} con éxito.`);
                },
                cancelar: function () {
                    return;
                }
            }
        });
    };

    const get_data_table = useCallback(async () => {
        const startTime = performance.now();
        const { getDataTable } = useFech({ url: `get-request-team/${id_user}` });
        const { error, status } = await getDataTable();
    
        if (!error) {
            const element = status.map((item, index) => ({
                fecha_solicitud: item.created_request,
                colaborador: item.full_name,
                desde: item.start_date,
                hasta: item.end_date,
                cantidad_dias: item.days,
                tipo_solicitud: item.type_request,
                acciones: <SmallButtons key={index} config_buttons={[
                    {
                        "class": `btn btn-success btn-icon`,
                        "icon": `fa-regular fa-thumbs-up`,
                        "label": ``,
                        "url": `#`,
                        "id": ``,
                        "def": () => acction_request(item.request_id, 2, item.type_request, item.id_user)
                    }, {
                        "class": `btn btn-danger btn-icon`,
                        "icon": `fa-regular fa-thumbs-down`,
                        "label": ``,
                        "url": `#`,
                        "id": ``,
                        "def": () => acction_request(item.request_id, 3, item.type_request, item.id_user)
                    }
                ]} />
                
            }));
            setDataTable(element);
        }
    
        const endTime = performance.now();
        setTimeGetData(endTime - startTime);
        setLoading_(false);
    }, [id_user]); // Agregamos id_user como dependencia

    useEffect(() => {
        get_data_table();
    }, [id_user]); // Agregamos id_user como dependencia

    const config_table = useMemo(() => ({
        loading: loading_,
        search_input: true,
    }), [loading_]);

    return (
        <>
            <div className='container-xl px-4 mt-n10'>
                <div className='row'>

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

        
        </>
    )
}
