import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';

import './style.css';

/**
 * A dynamic table component.
 *
 * @component
 * @param {Object[]} data_in_table - The data to be displayed in the table.
 * @param {Object} config_table - The configuration options for the table.
 * @param {boolean} config_table.loading - Indicates whether the table is in a loading state.
 * @param {string} config_table.search_input - The search input value for the table.
 * @returns {JSX.Element} The rendered table component.
 */


const customStyles = {
    rows: {
        style: {
            '&:hover': {
                backgroundColor: '#f1f1f1',  // Cambia el color al pasar el mouse
                cursor: 'pointer',           // Cambia el cursor al pasar el mouse
            },
        },
    },
};

export const TableDinamycWhitImageAndWidth = ({ data_in_table, config_table, title, timeGetData = 0 }) => {

    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const { loading, search_input } = config_table;
    const [pending, setPending] = useState(loading);

    const columns = [];
    
    data_in_table.forEach((item, index) => {
        if (index === 0) {
            Object.entries(item).forEach(([key, value]) => {
                let header = key
                    .split('_')
                    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
                    .join(' ');

                columns.push({
                    name: header,
                    selector: row => row[key],
                    sortable: true,
                    width: value.width,
                    wrap: true,
                    omit: value.omit,
                });
            });
        }
    });


    useEffect(() => {
        const list_data = () => {
            const data = [];
            data_in_table.forEach(item => {
                let object_data = {};
                Object.entries(item).forEach(([key, value]) => {
                    object_data[key] = value.data;
                });
                data.push(object_data);
            });
            return data;
        };

        const transformedData = list_data();

        const filtered = transformedData.filter(item => {
            return Object.values(item).some(value => {
                return value && value.toString().toLowerCase().includes(search.toLowerCase());
            });
        });

        setFilteredData(filtered);

        const timeout = setTimeout(() => {
            setPending(false);
        }, timeGetData);

        return () => clearTimeout(timeout); // Limpia el timeout al desmontar el componente
    }, [search, data_in_table, timeGetData]);

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const customProgressComponent = (
        <div className="custom-progress">
            Cargando datos...
        </div>
    );
    
    return (
        <>
            <div className="card mb-4">
                <div className="card-header">
                    <div className="row">
                        {title}
                    </div>
                </div>
                <div className="card-body">
                    <div className="col-md-3 col-sm-3 form-group has-feedback text-left align-self-end mb-3">
                        <input
                            type="text"
                            className="form-control has-feedback-left"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="buscar..."
                        />
                    </div>

                    <DataTable
                        columns={columns}
                        data={filteredData.map(item => ({ ...item, key: item.id }))}
                        progressPending={pending}
                        progressComponent={customProgressComponent}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        noHeader
                        noDataComponent="No hay datos"
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                    />
                </div>
            </div>
        </>
    );
};