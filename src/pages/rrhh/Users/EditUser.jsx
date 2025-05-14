import React, { useEffect, useState, useContext } from 'react';
import { AppContext, AppContexCompany } from '../../../providers/AppProvider';

import { Tabs } from '../../../components/tabs/Tabs';
import { useParams } from 'react-router-dom';
import { PersonalData } from './PersonalData';
import { EmploymentData } from './EmploymentData';
import { BankDetails } from './BankDetails';
import { FormEditUser } from './FormEditUser';
import { useFech } from '../../../hooks/useFech';
import { ForescatData } from './ForescatData';
import { HolidaysAndPermits } from './HolidaysAndPermits';
import { SalaryDetail } from './SalaryDetail';


export const EditUser = () => {
    const { id_user } = useParams();

    const { getDataTable } = useFech({ url: `get-employee/${id_user}/` });
    const [dataUser, setDataUser] = useState([]);
    const [usernameCrumbs, setUsernameCrumbs] = useState([]);
    const [fullname, setFullname] = useState([]);

    const get_data_response = async () => {
        const { status } = await getDataTable();
        setDataUser(status);
        setFullname(`${status.first_name} ${status.last_name}`);
        setUsernameCrumbs(status.username);
    };

    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);
    const { title } = useContext(AppContexCompany);

    const dict_bread_crumb = [
        { "bread": "Colaboradores" },
        { "bread": "Editar colaborador" },
        { "bread": usernameCrumbs }
    ];


    const createFolder = async () => {
        const { getInfo } = useFech({ url: `create-folder/${id_user}/` });
        const { status, error } = await getInfo();
        if (status) {
            $.alert('Directorio creado correctamente');
        } else if (error) {
            $.alert('Error al crear el directorio');
        }
    }

    const dict_title = { "tittle": `<i class="fa-solid fa-user"></i> ${fullname}` };
    const buttons_menu = [
        { 
            "label" : "Acciones",
            "icon" : "fa fa-plus",
            "list_items": [
                {
                    "label": "Crear directorio",
                    "url": "",
                    "onClick": createFolder
                },{
                    "label": "Generar contrato",
                    "url": "",
                    "onClick": ""
                },{
                    "label": "Descargar Ficha",
                    "url": "",
                    "onClick": ""
                }
            ]
        },{
            "icon" : "fa-solid fa-arrow-right-from-bracket",
            "url": `listado-colaboradores`,
            "label": "Volver"
        }
    ];

    useEffect(() => {
        get_data_response();
    }, [id_user]);

    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, [usernameCrumbs, fullname]);

    const tabData = [
        { id: 'user', label: 'Colaborador', content: <FormEditUser/> },
        { id: 'employee', label: 'Datos Personales', content: <PersonalData/> },
        { id: 'user_employee', label: 'Datos Laborales', content: <EmploymentData/> },
        { id: 'forescat_data', label: 'Datos Previsionales', content: <ForescatData/> },
        { id: 'bank_details', label: 'Datos Bancarios', content: <BankDetails/> },
        { id: 'holidays_and_permits', label: 'Vacaciones y Permisos', content: <HolidaysAndPermits/> },
        { id: 'salary_detail', label: 'Detalle sueldo', content: <SalaryDetail /> },
    ];

    return (
        <>
            <Tabs tabs={tabData} />
        </>
    );
}
