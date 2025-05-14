import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../providers/AppProvider';

import { Tabs } from '../../../components/tabs/Tabs';
import { FormAddUser } from './FormAddUser';


export const AddUser = () => {
    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);
    const dict_bread_crumb = [
        { "bread": "Colaboradores" },
        { "bread": "crear colaborador" }
    ];

    const dict_title = { "tittle": "<i class='fa-solid fa-user'></i> Nuevo colaborador" };
    const buttons_menu = [];

    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, []);

    const tabData = [
        { id: 'user', label: 'Colaborador', content: <FormAddUser/> },
    ];

    return (
        <>
            <Tabs tabs={tabData} />
        </>
    );
}
