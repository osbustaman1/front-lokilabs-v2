import React, { useState } from "react";

export const DynamicTable = ({columns, data, actions = {}, customActionIcon = "fa fa-cog", onEdit, onDelete, onCustomAction }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Filtrar datos según el término de búsqueda
    const filteredData = data.filter((row) =>
        columns.some((col) =>
            String(row[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Paginación
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    // Manejadores de eventos
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reiniciar a la primera página al buscar
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mt-4">
        {/* Barra de búsqueda */}
        <div className="d-flex justify-content-end mb-3">
            <input
            type="text"
            className="form-control form-control-solid w-100"
            style={{ width: "250px" }}
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
            />
        </div>

        {/* Tabla */}
        <table className="table table-bordered table-striped">
            <thead className="thead-dark">
            <tr>
                {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
                ))}
                <th>Opciones</th>
            </tr>
            </thead>
            <tbody>
            {currentData.length > 0 ? (
                currentData.map((row, index) => (
                <tr key={index}>
                    {columns.map((col) => (
                    <td key={col.key}>{row[col.key]}</td>
                    ))}
                    <td>
                    {/* Botones de acciones */}
                    {actions.edit && (
                        <button
                        className="btn btn-sm btn-primary mr-1"
                        onClick={() => onEdit && onEdit(row)}
                        >
                        <i className="fa fa-edit"></i>
                        </button>
                    )}
                    {actions.delete && (
                        <button
                        className="btn btn-sm btn-danger mr-1"
                        onClick={() => onDelete && onDelete(row)}
                        >
                        <i className="fa fa-trash"></i>
                        </button>
                    )}
                    {actions.custom && (
                        <button
                        className="btn btn-sm btn-info"
                        onClick={() => onCustomAction && onCustomAction(row)}
                        >
                        <i className={customActionIcon}></i>
                        </button>
                    )}
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan={columns.length + 1} className="text-center">
                    No hay datos disponibles
                </td>
                </tr>
            )}
            </tbody>
        </table>

        {/* Paginación */}
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                >
                Anterior
                </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""}`}
                >
                <button className="page-link" onClick={() => handlePageChange(page)}>
                    {page}
                </button>
                </li>
            ))}
            <li
                className={`page-item ${
                currentPage === totalPages || totalPages === 0 ? "disabled" : ""
                }`}
            >
                <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                >
                Siguiente
                </button>
            </li>
            </ul>
        </nav>
        </div>
    );
};