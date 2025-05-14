import React, { useEffect, useState, useContext } from 'react';

import { useParams } from 'react-router-dom';

import { AppContext } from '../../../providers/AppProvider';
import { Tabs } from '../../../components/tabs/Tabs';
import { FormEditArea } from './FormEditArea';
import { ListDepartament } from './ListDepartament';

export const EditArea = () => {

    const { id_area } = useParams();

    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);
    const [dataTable, setDataTable] = useState(false);

    const dict_bread_crumb = [
        { "bread": "empresa" },
        { "bread": "área" }
    ];

    const dict_title = { "tittle": "Editar Área" };

    const buttons_menu = [
        { 
            "label" : "Acciones",
            "list_items": [
                {
                    "label": "Agregar Departamento",
                    "url": `/home/agregar-departamento/${id_area}/`,
                }
            ]
        },{
            "icon" : "fa-solid fa-arrow-right-from-bracket",
            "url": `lista-areas`,
            "label": "Volver"
        }
    ];


    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, []);

    const tabData = [
        { id: 'area', label: 'Área', content: <FormEditArea /> },
        { id: 'dpto', label: 'Departamento', content: <ListDepartament /> },
    ];

    return (
        <>
            <Tabs tabs={tabData} />
        </>
    )
}
