import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { AppContext } from '../../providers/AppProvider';
import { TableDinamyc } from '../../components/datatable/TableDinamyc';
import { SmallButtons } from "../../components/buttons/SmallButtons";
import { useFech } from '../../hooks/useFech';
import { useParams } from 'react-router-dom';

const dict_bread_crumb = [
    { "bread": "empresa" },
	{ "bread": "ver areas" }
];

const dict_title = { "tittle": "Empresa: [Nombre Empresa]" };

const buttons_menu = [
	{ 
		"label" : "Acciones",
		"list_items": [
			{
				"label": "Agregar Área",
				"url": `/home/agregar-area`,
			}
		]
	}
];

export const ListAreas = () => {

    const title_table = 'Listado de Áreas';
    const { id_customer } = useParams();
	const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);
    const [dataTable, setDataTable] = useState([]);
    const [timeGetData, setTimeGetData] = useState(0);
    const [loading_, setLoading_] = useState(true);

    const delete_element = useCallback(async (id) => {
        const confirmDelete = async () => {
            const { deleteData } = useFech({ url: `delete-area/${id}/` });
            const { error, status } = await deleteData();

            if (status) {
                get_data_table();
            } else if (error) {
                $.alert('Error al eliminar el área');
            }
        };

        $.confirm({
            title: 'Confirmación!',
            content: 'Esta seguro de eliminar el área?',
            buttons: {
                confirmar: function () {
                    confirmDelete();
                    get_data_table();
                },
                cancelar: function () {
                }
            }
        });
    }, []);

    const get_data_table = useCallback(async () => {
        const startTime = performance.now();
        const { getDataTable } = useFech({ url: `list-areas` });
        const { error, status } = await getDataTable();

        const element = status.map((item, index) => ({
            id: item.ar_id,
            nombre_area: item.ar_name,
            empresa: item.company_name,
            acciones: <SmallButtons key={index} config_buttons={[
                {
                    "class": "btn btn-green btn-icon",
                    "icon": "fa fa-pencil",
                    "label": "Editar",
                    "url": `/home/editar-area/${item.ar_id}`,
                    "id": ``, 
                    "def": ``
                },
                {
                    "class": "btn btn-red btn-icon",
                    "icon": "fa fa-trash",
                    "label": "Eliminar",
                    "url": '#',
                    "id": ``,   
                    "def": () => delete_element(item.ar_id)
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
    }, []);

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
}
