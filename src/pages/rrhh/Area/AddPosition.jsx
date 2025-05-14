import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../providers/AppProvider';
import { Tabs } from '../../../components/tabs/Tabs';
import { useParams } from 'react-router-dom';
import { FormAddPosition } from './FormAddPosition';

export const AddPosition = () => {

    const { id_area, id_department } = useParams();

    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);

    const dict_bread_crumb = [
        { "bread": "empresa" },
        { "bread": "cargo" }
    ];

    const dict_title = { "tittle": "Agregar nuevo cargo" };

    const buttons_menu = [
        { 
            "label" : "Acciones",
            "list_items": []
        },{
            "icon" : "fa-solid fa-arrow-right-from-bracket",
            "url": `editar-departamento/${id_area}/${id_department}/`,
            "label": "Volver"
        }
    ];


    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, []);

    const tabData = [
        { id: 'position', label: 'Cargo', content: <FormAddPosition /> },
    ];

    return (
        <>
            <Tabs tabs={tabData} />
        </>
    )
}
