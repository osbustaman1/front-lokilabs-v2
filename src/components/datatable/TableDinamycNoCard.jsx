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

export const TableDinamycNoCard = ({ data_in_table, config_table, title, timeGetData = 0 }) => {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const { loading, search_input } = config_table;
    const [pending, setPending] = useState(loading);

    useEffect(() => {
        const filtered = data_in_table.filter(item => {
            return Object.values(item).some(value => {
                // Verificar que value esté definido antes de llamar a toString()
                return value && value.toString().toLowerCase().includes(search.toLowerCase());
            });
        });
        setFilteredData(filtered);

        const timeout = setTimeout(() => {
            setPending(false);
        }, timeGetData);

        return () => clearTimeout(timeout); // Limpia el timeout al desmontar el componente
    }, [search, data_in_table, timeGetData]);

    if (data_in_table.length > 0) {
        let columns = [];
        let headers_list = Object.keys(data_in_table[0]);
        headers_list.map((key, value) => {
            const transformString = (str) => {
                return str
                    .split('_')
                    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
                    .join(' ');
            };

            columns.push({
                name: transformString(key),
                selector: row => row[key],
                sortable: true,
                width: 'auto',
                wrap: true,
            });
        });

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

                <div className="mt-5"></div>
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
                    
            </>
        );
    }
};