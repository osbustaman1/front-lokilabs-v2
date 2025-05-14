import React, { useEffect, useState, useContext } from 'react';
import { AppContext, AppContexCompany } from '../../providers/AppProvider';
import { useParams } from 'react-router-dom';

import { Tabs } from '../../components/tabs/Tabs';
import { EditFormFactory } from './EditFormFactory';
import { ListBranchOffice } from './ListBranchOffice';
import { ListCenterCost } from './ListCenterCost';
import { ListAssociatedEntities } from './ListAssociatedEntities';
import { capitalizeFirstLetter } from '../../js/validations';

export const EditFactory = () => {

    const { id_customer } = useParams();
    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);
    const { title } = useContext(AppContexCompany);

    const dict_bread_crumb = [
        { "bread": "empresa" },
        { "bread": "editar empresa" }
    ];

    const dict_title = { "tittle": capitalizeFirstLetter(title) };

    const buttons_menu = [
        { 
            "label" : "Acciones",
            "icon" : "fa fa-plus",
            "list_items": [
                {
                    "label": "Agregar Sucursal",
                    "url": `/home/agregar-sucursal/${id_customer}`,
                },{
                    "label": "Agregar Centro de Costos",
                    "url": `/home/agregar-centro-costo/${id_customer}`,
                },{
                    "label": "Agregar Entidad Asociada",
                    "url": `/home/agregar-entidades-asociadas/${id_customer}`,
                }
            ]
        },{
            "icon" : "fa-solid fa-arrow-right-from-bracket",
            "url": `lista-empresas`,
            "label": "Volver"
        }
    ];

    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, [title]);

    const tabData = [
        { id: 'empresa', label: 'Empresa', content: <EditFormFactory /> },
        { id: 'sucursales', label: 'Sucursales', content: <ListBranchOffice /> },
        { id: 'centros_costos', label: 'Centros de costos', content: <ListCenterCost /> },
        { id: 'entidades_asociadas', label: 'Entidades Asociadas', content: <ListAssociatedEntities /> },
    ];

    return (
        <>
            <Tabs tabs={tabData}/>
        </>
    );
};