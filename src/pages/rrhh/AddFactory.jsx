import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../providers/AppProvider';

import { Tabs } from '../../components/tabs/Tabs';
import { FormFactory } from './FormFactory';

export const AddFactory = () => {

    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);
    const dict_bread_crumb = [
        { "bread": "empresa" },
        { "bread": "crear empresa" }
    ];

    const dict_title = { "tittle": "Creación de una nueva empresa" };
    const buttons_menu = [];

    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, []);

    const tabData = [
        { id: 'empresa', label: 'Empresa', content: <FormFactory /> },
    ];

    return (
        <>
            <Tabs tabs={tabData} />
        </>
    );
}
