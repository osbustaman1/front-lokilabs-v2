import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../providers/AppProvider';
import { Tabs } from '../../../components/tabs/Tabs';
import { FormAddDepartment } from './FormAddDepartment';


export const AddDepartment = () => {

    const { id_area } = useParams();

    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);

    const dict_bread_crumb = [
        { "bread": "empresa" },
        { "bread": "departamento" }
    ];

    const dict_title = { "tittle": "Agregar nuevo departamento" };

    const buttons_menu = [
        { 
            "label" : "Acciones",
            "list_items": []
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
        { id: 'department', label: 'Departamento', content: <FormAddDepartment /> },
    ];

    return (
        <>
            <Tabs tabs={tabData} />
        </>
    )
}
