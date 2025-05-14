import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { AppContext } from '../../providers/AppProvider';
import { TableDinamyc } from '../../components/datatable/TableDinamyc';
import { SmallButtons } from "../../components/buttons/SmallButtons";
import { useFech } from '../../hooks/useFech';

const dict_bread_crumb = [
    { "bread": "empresa" },
    { "bread": "ver empresas" }
];

const dict_title = { "tittle": "Listados de empresas" };

const buttons_menu = [];

export const Factory = () => {
    const title_table = 'Listado de Empresas';

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

        const { getDataTable } = useFech({ url: 'list-companies' });
        const { error, status } = await getDataTable();

        const element = status.map((item, index) => ({
            id: item.com_id,
            nombre_empresa: item.com_name_company,
            rut_empresa: item.com_rut,
            empresa_ingresada: item.created.split('T')[0],
            acciones: <SmallButtons key={index} config_buttons={[
                {
                    "class": "btn btn-green btn-icon",
                    "icon": "fa fa-pencil",
                    "label": "Editar",
                    "url": `/home/editar-empresa/${item.com_id}`,
                    "id": ``,
                    "def": ``
                },
                {
                    "class": "btn btn-red btn-icon",
                    "icon": "fa fa-trash",
                    "label": "Eliminar",
                    "url": '#',
                    "id": ``,
                    "def": () => delete_element(item.com_id)
                }
            ]} />
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
            <div className='container-xl px-4 mt-n10'>
                <div className='row'>
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
        </>
    );
};