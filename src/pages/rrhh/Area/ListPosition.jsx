import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { TableDinamyc } from '../../../components/datatable/TableDinamyc';
import { SmallButtons } from "../../../components/buttons/SmallButtons";
import { useFech } from '../../../hooks/useFech';
import { useParams } from 'react-router-dom';


export const ListPosition = () => {
    const title_table = 'Listado de cargos';
    const { id_area, id_department } = useParams();
    const [dataTable, setDataTable] = useState([]);
    const [timeGetData, setTimeGetData] = useState(0);
    const [loading_, setLoading_] = useState(true);

    const delete_element = useCallback(async (id) => {
        const confirmDelete = async () => {
            const { deleteData } = useFech({ url: `delete-position/${id}/` });
            const { error, status } = await deleteData();

            if (status) {
                get_data_table(); // Actualizar la tabla después de eliminar
            } else if (error) {
                $.alert('Error al eliminar el cargo');
            }
        };

        $.confirm({
            title: 'Confirmación!',
            content: 'Esta seguro de eliminar el cargo?',
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
        const { getDataTable } = useFech({ url: `list-position/${id_department}/` });
        const { error, status } = await getDataTable();

        const element = status.map((item, index) => ({
            id: item.pos_id,
            cargo: item.pos_name_position,
            acciones: <SmallButtons key={index} config_buttons={[
                {
                    "class": "btn btn-green btn-icon",
                    "icon": "fa fa-pencil",
                    "label": "Editar",
                    "url": `/home/editar-cargo/${id_area}/${id_department}/${item.pos_id}/`,
                    "id": ``,
                    "def": ``
                },
                {
                    "class": "btn btn-red btn-icon",
                    "icon": "fa fa-trash",
                    "label": "Eliminar",
                    "url": '#',
                    "id": ``,
                    "def": () => delete_element(item.pos_id)
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
