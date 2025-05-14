import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../providers/AppProvider';
import { useFormValidate } from '../../../hooks/useFormValidate';
import { Forms } from "../../../components/forms/Forms"
import { useFech } from '../../../hooks/useFech';
import { useParams } from 'react-router-dom';
import { AppContexCompany } from '../../../providers/AppProvider';
import { capitalizeFirstLetter } from '../../../js/validations';


export const EditarBranchOffice = () => {

    const { id_customer, id_branch } = useParams();
    const { validate } = useFormValidate();
    const { getDataTable } = useFech({ url: `view-branch-office/${id_branch}/` });

    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);
    const { title } = useContext(AppContexCompany);

    const dict_bread_crumb = [
        { "bread": "empresa" },
        { "bread": "editar empresa" },
        { "bread": "editar sucursal" }
    ];

    const dict_title = { "tittle": `${capitalizeFirstLetter(title)} ` };

    const buttons_menu = [
        { 
            "label" : "Acciones",
            "list_items": []
        },{
            "icon" : "fa-solid fa-arrow-right-from-bracket",
            "url": `/home/editar-empresa/${id_customer}`,
            "label": "Volver"
        }
    ];

    const { getDataTable: list_countries } = useFech({ url: 'list-countries' });
    const { getDataTable: list_regions } = useFech({ url: 'list-region' });
    const { getDataTable: list_communes } = useFech({ url: 'list-commune' });
    
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [dataBranchOffice, setDataBranchOffice] = useState([]);
    const [configForm, setConfigForm] = useState(null);

    const getDataFech = async (get_data_table, set_state, error_message, type_data_response) => {
        
        const { error, status } = await get_data_table();

        if (error) {
            $.alert(error_message);
        }

        let list_data = [];

        if (type_data_response === 'countries') {
            status.map((value) => {
                list_data.push({
                    value: value.cou_id,
                    label: value.cou_name
                });
            });
        }else if (type_data_response === 'regions') {
            status.map((value) => {
                list_data.push({
                    value: value.re_id,
                    label: value.re_name
                });
            });
        }else if (type_data_response === 'communes') {
            status.map((value) => {
                list_data.push({
                    value: value.com_id,
                    label: value.com_name
                });
            });
        }
        set_state(list_data);    
    }


    const get_data_branch_office = async () => {
        const { error, status } = await getDataTable();
        setDataBranchOffice(status);
    };

    const send_form = async (form) => {

        const { error, form_data } = validate(form);

        if (error) {
            $.confirm({
                title: 'Tienes errores en los siguientes campos!',
                content: form_data,
                buttons: {
                    aceptar: function () {
                        const form_data = document.getElementById(form);
                        const formData = new FormData(form_data);
                        formData.forEach((value, key) => {
                            const input = document.getElementsByName(key);
                            input[0].classList.remove('is-invalid');
                        });
                    }
                }
            });
            return false;
        }else{

            const { updateDataApi } = useFech({ url: `edit-branch-office/${id_branch}/` });
            const { error, status } = await updateDataApi(form_data);

            if (error) {
                $.alert(status.message);
            }else{
                const { com_id, message } = status;
                $.alert(message);
                return false;
            }
        }
    };

    useEffect(() => {
        getDataFech(list_countries, setCountries, 'Error al cargar los datos de los paises', 'countries');
        getDataFech(list_regions, setRegions, 'Error al cargar los datos de las regiones', 'regions');
        getDataFech(list_communes, setCommunes, 'Error al cargar los datos de las comunas', 'communes');
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, [title]);

    useEffect(() => {
        get_data_branch_office();
    }, [id_customer]);

    useEffect(() => {
        if (Object.keys(dataBranchOffice).length > 0) {
            const {
                sub_name,
                sub_mail,
                sub_phone,
                sub_address,
                commune,
                region,
                country,
                sub_matrixhouse
            } = dataBranchOffice;  

            const config_form = {
                number_row: 3,
                id_form: 'form_branch_office',
                position_form: 'vertical',
                def: (event) => { send_form('form_branch_office'); },
                name_button: 'Editar',
                inputs: [
                    {
                        label: 'Descripción de la unidad',
                        placeholder: '',
                        required: true,
                        name: 'sub_name',
                        type: 'text',
                        value: sub_name
                    },{
                        label: 'Correo',
                        placeholder: '',
                        required: true,
                        name: 'sub_mail',
                        type: 'email',
                        value: sub_mail
                    },{
                        label: 'Teléfono',
                        placeholder: '',
                        required: true,
                        name: 'sub_phone',
                        type: 'text',
                        value: sub_phone
                    },{
                        label: 'Dirección',
                        placeholder: '',
                        required: true,
                        name: 'sub_address',
                        type: 'text',
                        value: sub_address
                    },{
                        label: 'Comunas',
                        required: true,
                        name: 'commune',
                        type: 'select_autocomplete',
                        options: communes,
                        text_default: '-- Seleccione --',
                        value: commune
                    },{
                        label: 'Regiones',
                        required: true,
                        name: 'region',
                        type: 'select_autocomplete',
                        options: regions,
                        text_default: '-- Seleccione --',
                        value: region
                    },{
                        label: 'País',
                        required: true,
                        name: 'country',
                        type: 'select_autocomplete',
                        options: countries,
                        text_default: '-- Seleccione --',
                        value: country
                    },{
        
                        label: 'Es casa matriz?',
                        required: true,
                        name: 'sub_matrixhouse',
                        type: 'select_autocomplete',
                        options: [{value: 'Y', label: 'Si'}, {value: 'N', label: 'No'}],
                        text_default: '-- Seleccione --',
                        value: sub_matrixhouse
                    }
                ],
            }

            setConfigForm(config_form);
        }
    }, [dataBranchOffice, communes, regions, countries]);


    return (
        <>
            <div className="card mb-4">
                <div className="card-header">
                    <nav className="nav nav-borders">
                    </nav>
                </div>
                <div className="card-body">
                    <div className="row">
                        {configForm && <Forms config_form={configForm} />}
                    </div>
                </div>
            </div>
        </>
    )
}
