import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { AppContext } from '../../../providers/AppProvider';
import { TableDinamycWhitImageAndWidth } from '../../../components/datatable/TableDinamycWhitImageAndWidth';
import { SmallButtons } from "../../../components/buttons/SmallButtons";
import { useFech } from '../../../hooks/useFech';
import { SmallIamgeWithData } from '../../../components/images/SmallIamge';

const dict_bread_crumb = [
    { "bread": "empresa" },
    { "bread": "ver colaboradores" }
];

const dict_title = { "tittle": "<i class='fa-solid fa-users'></i> Colaboradores" };

const buttons_menu = [];

export const ListUsers = () => {

    const title_table = 'Listado de Colaboradores';

    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);
    const [dataTable, setDataTable] = useState([]);
    const [timeGetData, setTimeGetData] = useState(0);
    const [loading_, setLoading_] = useState(true);

    const delete_element = useCallback(async (id) => {
        const confirmDelete = async () => {
            const { deleteData } = useFech({ url: `delete-company/${id}/` });
            const { error, status } = await deleteData();

            if (status) {
                get_data_table();
            } else if (error) {
                $.alert('Error al eliminar la compañía');
            }
        };

        $.confirm({
            title: 'Confirmación!',
            content: 'Esta seguro de eliminar la empresa?',
            buttons: {
                confirmar: function () {
                    confirmDelete();
                },
                cancelar: function () {
                }
            }
        });
    }, []);

    const get_data_table = useCallback(async () => {
        const startTime = performance.now();

        const { getDataTable } = (localStorage.getItem('uc_type_user') == 1) || localStorage.getItem('uc_type_user')
        ? useFech({ url: `list-employees/${localStorage.getItem('company')}` })
        : useFech({ url: `list-employees/${localStorage.getItem('company')}` }) ;
        const { error, status } = await getDataTable();

        const element = status.map((item, index) => ({
            colaborador: {
                data:<SmallIamgeWithData key={index} data={
                    { 
                        url_image: item.emp_perfil_image ? item.emp_perfil_image : 'https://lokilabs.s3.amazonaws.com/219983.png', 
                        alt: item.full_name,
                        name: item.full_name,
                        rut: item.rut,
                        url: `/home/editar-colaborador/${item.user_id}`
                    }
                } />,
                width: 'auto'
            },
            cargo: {
                data: item.position_user,
                width: 'auto'
            },
            area: {
                data: item.area_user,
                width: 'auto'
            },
            sucursal: {
                data: item.subsidiary_user,
                width: 'auto'
            },
            contrato: {
                data: item.uc_contracttype,
                width: '150px'
            },
            hidden_rut: {
                data: item.rut,
                width: '110px',
                omit: true
            },
            hidden_nombre: {
                data: item.full_name,
                width: '110px',
                omit: true
            },
            acciones: {
                data: <SmallButtons key={index} config_buttons={[
                    {
                        "class": "btn btn-green btn-icon",
                        "icon": "fa fa-pencil",
                        "label": "Editar",
                        "url": `/home/editar-colaborador/${item.user_id}`,
                        "id": ``,
                        "def": ``
                    },
                    {
                        "class": "btn btn-red btn-icon",
                        "icon": "fa fa-trash",
                        "label": "Eliminar",
                        "url": '#',
                        "id": ``,
                        "def": () => delete_element(item.user_id)
                    }
                ]} />,
                width: '120px'
            }
        }));

        setDataTable(element);
        const endTime = performance.now();
        const duration = endTime - startTime;
        setTimeGetData(duration);
        setLoading_(false);
    }, [delete_element]);

    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
        get_data_table();
    }, [updateBreadcrumbs, updateTitulo, updateButtons, get_data_table]);

    const config_table = useMemo(() => ({
        loading: loading_,
        search_input: true,
    }), [loading_]);

    return (
        <>
            <div className="container-xl px-4 mt-n10">
                <div className="row">
                    {loading_ ? (
                        <div className="alert alert-info text-center" role="alert">
                            Cargando datos...
                        </div>
                    ) : dataTable.length > 0 ? (
                        <TableDinamycWhitImageAndWidth data_in_table={dataTable} config_table={config_table} title={title_table} timeGetData={timeGetData} />
                    ) : (
                        <div className="alert alert-info text-center" role="alert">
                            No hay datos
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
