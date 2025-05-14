import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import "./WildcardsList.css";

const items = [
    "{{nombres_colaborador}}",
    "{{apellidos_colaborador}}",
    "{{correo_colaborador}}",
    "{{rut_colaborador}}",
    "{{nacionalidad_colaborador}}",
    "{{pais_colaborador}}",
    "{{region_colaborador}}",
    "{{comuna_colaborador}}",
    "{{direccion_colaborador}}",
    "{{fecha_nacimiento_colaborador}}",
    "{{profesion_colaborador}}",
    "{{estado_civil_colaborador}}",
    "{{telefono_colaborador}}",
    "{{email_colaborador}}",
    "{{cargo_colaborador}}",
    "{{descripcion_cargo_colaborador}}",
    "{{fecha_actual}}",
    "{{dia_actual}}",
    "{{mes_actual}}",
    "{{anio_actual}}",
    "{{nombre_completo_representante_legal}}",
    "{{rut_representante_legal}}",
    "{{nombre_empresa}}",
    "{{razon_social}}",
    "{{rut_empresa}}",
    "{{pais_empresa}}",
    "{{region_empresa}}",
    "{{comuna_empresa}}",
    "{{direccion_empresa}}",
    "{{pais_sucursal_empresa}}",
    "{{region_sucursal_empresa}}",
    "{{comuna_sucursal_empresa}}",
    "{{direccion_sucursal_empresa}}",
    "{{tipo_contrato}}",
    "{{fecha_inicio_contrato}}",
    "{{fecha_fin_contrato}}",
    "{{duracion_contrato}}",
    "{{dias_vacaciones}}",
    "{{sueldo_bruto}}",
    "{{sueldo_bruto_en_palabras}}",
    "{{sueldo_liquido}}",
    "{{sueldo_liquido_en_palabras}}",
    "{{fecha_finiquito}}",
    "{{horas_pactadas}}",
    "{{dias_pactados}}",
    "{{horario_pactado}}",
    "{{fecha_fin_plazo_fijo}}",
    "{{servcios_prestados}}",
];

export const WildcardList = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 10;

    // Filtrar elementos basados en el término de búsqueda
    const filteredItems = items.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    );

    // Calcular elementos de la página actual
    const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Cambiar página
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="col-4 mb-4">
            <div className="card h-100">
                <div className="card-body justify-content-center flex-column">
                    <div className="align-items-center justify-content-between sticky-table">
                        <div className="me-3">
                            <h5>Listado de comodines</h5>
                            <div className="text-muted small row">
                                <div className="container">
                                    <input
                                        type="text"
                                        placeholder="Buscar..."
                                        className="form-control form-control-solid w-100 mb-3"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Elemento</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {filteredItems.length > itemsPerPage && (
                                        <ReactPaginate
                                            previousLabel={"Anterior"}
                                            nextLabel={"Siguiente"}
                                            breakLabel={"..."}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={3}
                                            onPageChange={handlePageChange}
                                            containerClassName={"pagination"}
                                            activeClassName={"active"}
                                            pageClassName={"page-item"}
                                            pageLinkClassName={"page-link"}
                                            previousClassName={"page-item"}
                                            nextClassName={"page-item"}
                                            previousLinkClassName={"page-link"}
                                            nextLinkClassName={"page-link"}
                                            breakClassName={"page-item"}
                                            breakLinkClassName={"page-link"}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
