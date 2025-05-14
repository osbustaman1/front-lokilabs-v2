import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { TableDinamyc } from '../../components/datatable/TableDinamyc';
import { SmallButtons } from "../../components/buttons/SmallButtons";
import { useFech } from '../../hooks/useFech';
import { useParams } from 'react-router-dom';

export const ListAssociatedEntities = () => {
    const { id_customer } = useParams();
    const [dataCompany, setDataCompany] = useState({});
    const [loading, setLoading] = useState(true);

    const { getDataList } = useFech({ url: `get-associated-entities/${id_customer}/` });

    const get_data_company = useCallback(async () => {
        const { error, status } = await getDataList();
        setDataCompany(status);
        setLoading(false);
    }, [getDataList]);

    useEffect(() => {
        get_data_company();
    }, [get_data_company, id_customer]);

    const data = useMemo(() => [
        {
            id: 1,
            mutual: dataCompany.mutual_security || 'No disponible',
            caja_compensacion: dataCompany.boxes_compensation || 'No disponible',
            acciones: <SmallButtons key={1} config_buttons={[
                {
                    "class": "btn btn-green btn-icon",
                    "icon": "fa fa-pencil",
                    "label": "Editar",
                    "url": `/home/editar-entidades-asociadas/${id_customer}`,
                    "id": ``
                }
            ]} />
        }
    ], [dataCompany, id_customer]);

    const config_table = useMemo(() => ({
        loading: loading,
        search_input: true,
    }), [loading]);

    const title_table = 'Listado de entidades asociadas';

    return (
        <>
            {loading ? (
                <div className="alert alert-info text-center" role="alert">
                    Cargando datos...
                </div>
            ) : data.length > 0 ? (
                <TableDinamyc data_in_table={data} config_table={config_table} title={title_table} />
            ) : (
                <div className="alert alert-warning text-center" role="alert">
                    No hay registros
                </div>
            )}
        </>
    );
};