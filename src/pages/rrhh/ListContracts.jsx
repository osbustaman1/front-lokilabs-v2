import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { AppContext } from '../../providers/AppProvider';
import { TableDinamycNoCard } from '../../components/datatable/TableDinamycNoCard';
import { SmallButtons } from "../../components/buttons/SmallButtons";
import { useFech } from '../../hooks/useFech';

const dict_bread_crumb = [
    { "bread": "empresa" },
    { "bread": "ver contratos" }
];

const dict_title = { "tittle": "Contratos" };

const buttons_menu = [
	{ 
		"label" : "Opciones",
		"list_items": [
			{
				"label": "Agregar nuevo contrato",
				"url": `/home/agregar-contratos`,
			}
		]
	}
];

export const ListContracts = () => {
    const title_table = '';

    const company = localStorage.getItem('company');

    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);
    const [dataTable, setDataTable] = useState([]);
    const [timeGetData, setTimeGetData] = useState(0);
    const [loading_, setLoading_] = useState(true);

    const delete_element = useCallback(async (id) => {
        const confirmDelete = async () => {
            const { deleteData } = useFech({ url: `delete-contract-type/${id}/` });
            const { error, status } = await deleteData();

            if (status) {
                get_data_table();
            } else if (error) {
                $.alert('Error al eliminar el contrato');
            }
        };

        $.confirm({
            title: 'Confirmación!',
            content: 'Esta seguro de eliminar el contrato?',
            buttons: {
                confirmar: function () {
                    confirmDelete();
                },
                cancelar: function () {
                }
            }
        });
    }, []);

    const download_word = async (id) => {
        const { postDataApi } = useFech({ url: `generate-word-from-html/${id}/` });
        const { error, status } = await postDataApi({});

        // Procesar el archivo Base64
        const base64Data = status.file_base64;
        const byteCharacters = atob(base64Data);
        const byteNumbers = Array.from(byteCharacters).map((char) => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);

        // Crear un Blob y un enlace para descargar el archivo
        const blob = new Blob([byteArray], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "documento.docx";
        link.click();
    };

    const get_data_table = useCallback(async () => {
        const startTime = performance.now();

        const { getDataTable } = useFech({ url: `contract-type/${company}/` });
        const { error, status } = await getDataTable();

        const element = status.map((item, index) => ({
            id: item.ct_id,
            nombre_contrato: item.ct_contractname,
            codigo: item.ct_contractcode,
            tipo_contrato: item.ct_typecontract === 1 ? 'Contrato' : 'Anexo',
            creado: item.created.split('T')[0],
            acciones: <SmallButtons key={index} config_buttons={[
                {
                    "class": "btn btn-green btn-icon",
                    "icon": "fa fa-pencil",
                    "label": "Editar",
                    "url": `/home/editar-contratos/${item.ct_id}`,
                    "id": ``,
                    "def": ``
                },
                {
                    "class": "btn btn-green btn-icon",
                    "icon": "fa fa-cloud-arrow-down",
                    "label": "Descargar",
                    "url": '#',
                    "id": ``,
                    "def": () => download_word(item.ct_id),
                },
                {
                    "class": "btn btn-red btn-icon",
                    "icon": "fa fa-trash",
                    "label": "Eliminar",
                    "url": '#',
                    "id": ``,
                    "def": () => delete_element(item.ct_id)
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


                    <div className="col-12 mb-4">
                        <div className="card h-100">
                            <div className="card-body d-flex justify-content-center flex-column">
                                <div className="align-items-center justify-content-between">
                                    <div className="me-3">
                                        <i className="fa-regular fa-rectangle-list"></i>
                                        <h5>Listado de contratos de la empresa</h5>
                                        <div className="text-muted small row">
                                            {loading_ ? (
                                                <div className="alert alert-info text-center" role="alert">
                                                    Cargando datos...
                                                </div>
                                            ) : dataTable.length > 0 ? (
                                                <TableDinamycNoCard data_in_table={dataTable} config_table={config_table} title={title_table} timeGetData={timeGetData} />
                                            ) : (
                                                <div className="alert alert-info text-center" role="alert">
                                                    No hay datos
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};