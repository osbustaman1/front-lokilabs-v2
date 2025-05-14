import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { AppContext } from '../../../providers/AppProvider';
import { SmallButtons } from "../../../components/buttons/SmallButtons";
import { useFech } from '../../../hooks/useFech';
import { WildcardList } from './WildcardList';
import { TextEditor } from './TextEditor';


const dict_bread_crumb = [
    { "bread": "empresa" },
    { "bread": "ver contratos" },
    { "bread": "crear nuevo contrato" },
];

const dict_title = { "tittle": "Contratos" };

const buttons_menu = [
    { 
        "label" : "Acciones",
        "list_items": []
    },{
        "icon" : "fa-solid fa-arrow-right-from-bracket",
        "url": `lista-contratos`,
        "label": "Volver"
    }
];
export const AddContracts = () => {
    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);


    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, []);

    return (
        <div className='container-xl px-4 mt-n10'>
            <div className='row'>
                <TextEditor />
                <WildcardList />
            </div>
        </div>
    )
}
