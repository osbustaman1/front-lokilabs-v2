import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { AppContext } from '../../../providers/AppProvider';
import { SmallButtons } from "../../../components/buttons/SmallButtons";
import { useFech } from '../../../hooks/useFech';
import { WildcardList } from './WildcardList';
import { TextEditor } from './TextEditor';
import { useParams } from 'react-router-dom';
import { TextEditorEdit } from './TextEditorEdit';


const dict_bread_crumb = [
    { "bread": "empresa" },
    { "bread": "ver contratos" },
    { "bread": "editar contrato" },
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
export const EditContracts = () => {
    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);

    const company = localStorage.getItem('company');
    const { id_contract } = useParams();

    const [responseData, setResponseData] = useState([]);

    const { getDataTable: dataContract } = useFech({ url: `contract-type/${id_contract}/${company}/` });

    const getDataContract = async () => {
        const { error, status } = await dataContract();
        if (error) {
            $.alert('Error al obtener los datos del usuario');
            return;
        }
        setResponseData(status);
    };

    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, []);

    useEffect(() => {
        getDataContract();
    }, [company, id_contract]);

    return (
        <div className='container-xl px-4 mt-n10'>
            <div className='row'>
                <TextEditorEdit data={responseData} />
                <WildcardList />
            </div>
        </div>
    )
}
