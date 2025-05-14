import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { TableDinamyc } from '../../components/datatable/TableDinamyc';
import { SmallButtons } from "../../components/buttons/SmallButtons";
import { useFech } from '../../hooks/useFech';
import { useParams } from 'react-router-dom';


export const ListCenterCost = () => {
    const title_table = 'Listado de Centros de Costos';
    const { id_customer } = useParams();
    const [dataTable, setDataTable] = useState([]);
    const [timeGetData, setTimeGetData] = useState(0);
    const [loading_, setLoading_] = useState(true);

    const delete_element = useCallback(async (id) => {
        const confirmDelete = async () => {
            const { deleteData } = useFech({ url: `delete-center-cost/${id}/` });
            const { error, status } = await deleteData();

            if (status) {
                get_data_table(); // Actualizar la tabla después de eliminar
            } else if (error) {
                $.alert('Error al eliminar el centro de costo');
            }
        };

        $.confirm({
            title: 'Confirmación!',
            content: 'Esta seguro de eliminar el centro de costo?',
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
        const { getDataTable } = useFech({ url: `list-center-cost/${id_customer}/` });
        const { error, status } = await getDataTable();

        const element = status.map((item, index) => ({
            id: item.cencost_id,
            nombre_centro_costo: item.cencost_name,
            acciones: <SmallButtons key={index} config_buttons={[
                {
                    "class": "btn btn-green btn-icon",
                    "icon": "fa fa-pencil",
                    "label": "Editar",
                    "url": `/home/editar-centro-costo/${id_customer}/${item.cencost_id}/`,
                    "id": ``,
                    "def": ``
                },
                {
                    "class": "btn btn-red btn-icon",
                    "icon": "fa fa-trash",
                    "label": "Eliminar",
                    "url": '#',
                    "id": ``,
                    "def": () => delete_element(item.cencost_id)
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
        get_data_table();
    }, []);

    const config_table = useMemo(() => ({
        loading: loading_,
        search_input: true,
    }), [loading_]);

    return (
        <>
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
        </>
    );
}
