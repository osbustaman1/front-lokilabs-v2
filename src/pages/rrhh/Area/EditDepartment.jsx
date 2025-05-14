import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../providers/AppProvider';
import { Tabs } from '../../../components/tabs/Tabs';
import { FormEditDepartment } from './FormEditDepartment';
import { ListPosition } from './ListPosition';


export const EditDepartment = () => {

    const { id_area, id_department } = useParams();

    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);
    const [dataTable, setDataTable] = useState(false);

    const dict_bread_crumb = [
        { "bread": "empresa" },
        { "bread": "departamento" }
    ];

    const dict_title = { "tittle": "Editar departamento" };

    const buttons_menu = [
        { 
            "label" : "Acciones",
            "list_items": [
                {
                    "label": "Agregar Cargo",
                    "url": `/home/agregar-cargo/${id_area}/${id_department}/`,
                }
            ]
        },{
            "icon" : "fa-solid fa-arrow-right-from-bracket",
            "url": `editar-area/${id_area}/`,
            "label": "Volver"
        }
    ];

    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, []);

    const tabData = [
        { id: 'department', label: 'Departamento', content: <FormEditDepartment /> },
        { id: 'position', label: 'Cargos', content: <ListPosition /> },
    ];

    return (
        <>
            <Tabs tabs={tabData} />
        </>
    )
}
