import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import Select from 'react-select';

import { AppContext, AppContexCompany } from '../providers/AppProvider';
import { DynamicTable } from '../components/datatable/DynamicTable';

export const SalaryConcept = () => {
    const [concept, setConcept] = useState('');
    const [typeConcept, setTypeConcept] = useState('');
    const [nameBoton, setNamBoton] = useState('Agregar concepto');

    const [listTypeConcept] = useState([
        { value: 1, label: 'Imponible' },
        { value: 2, label: 'No Imponible' },
    ]);

    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);
    const { title } = useContext(AppContexCompany);

    const dict_bread_crumb = [{ bread: 'Configuración' }];
    const dict_title = { tittle: `<i class="fa-solid fa-cog"></i> Listado de conceptos de remuneraciones` };
    const buttons_menu = [];

    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, []);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Correo Electrónico' },
    ];

    const data = [
        { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
        { id: 2, name: 'María López', email: 'maria@example.com' },
        { id: 3, name: 'Carlos García', email: 'carlos@example.com' },
        // Reduce el número de datos para mayor claridad
    ];

    const actions = {
        edit: true,
        delete: true,
        custom: false,
    };

    const handleEdit = (row) => {
        Swal.fire({
            title: 'Edit!',
            text: 'Editar fila',
            icon: 'success',
            confirmButtonText: 'Aceptar',
        });
    };

    const handleDelete = (row) => {
        Swal.fire({
            title: 'Estás seguro?',
            text: `Estás a punto de eliminar este concepto: ${row.name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, deseo borrar!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Borrado!',
                    text: 'El concepto fue borrado con éxito.',
                    icon: 'success',
                });
            }
        });
    };

    const handleCustomAction = (row) => {
        alert('Acción personalizada en fila:', row);
    };

    const customStyles = {
        control: (base) => ({
            ...base,
            border: '1px solid #ced4da',
            boxShadow: 'none',
            '&:hover': {
                border: '1px solid #80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        }),
    };

    return (
        <div className="container-xl px-4 mt-n10">
            <div className="row">
                <div className="col-4 mb-4">
                    <div className="card h-100">
                        <div className="card-body justify-content-center flex-column">
                            <h1>Configuración de conceptos</h1>
                            <p className="card-text">Aquí puedes configurar los conceptos de remuneraciones.</p>
                            <div className="text-muted small row">
                                <div className="col-md-12 mt-3">
                                    <label>Concepto</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={concept || ''}
                                            onChange={(e) => setConcept(e.target.value)}
                                            style={{
                                                border: '1px solid #ced4da',
                                                boxShadow: 'none',
                                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                                borderRadius: '0.25rem',
                                                height: '38px',
                                                padding: '0.375rem 0.75rem',
                                                fontSize: '10px',
                                                lineHeight: '1.5',
                                                color: '#495057',
                                            }}
                                            onFocus={(e) => (e.target.style.border = '1px solid #80bdff', e.target.style.boxShadow = '0 0 0 0.2rem rgba(0,123,255,.25)')}
                                            onBlur={(e) => (e.target.style.border = '1px solid #ced4da', e.target.style.boxShadow = 'none')}
                                        />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label>Tipo de concepto</label>
                                    <Select
                                        placeholder="Seleccione"
                                        options={listTypeConcept}
                                        onChange={(option) => setTypeConcept(option?.value || '')}
                                        value={listTypeConcept.find((option) => option.value === typeConcept) || null}
                                        classNamePrefix="select"
                                        styles={customStyles}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-primary mt-3">Agregar concepto</button>
                        </div>
                    </div>
                </div>
                <div className="col-8 mb-4">
                    <div className="card h-100">
                        <div className="card-body justify-content-center flex-column">
                            <h1>Listado de conceptos</h1>
                            <DynamicTable
                                columns={columns}
                                data={data}
                                actions={actions}
                                customActionIcon="fa fa-star"
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onCustomAction={handleCustomAction}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
