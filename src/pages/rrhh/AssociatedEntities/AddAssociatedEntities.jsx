import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../providers/AppProvider';
import { useFormValidate } from '../../../hooks/useFormValidate';
import { Forms } from "../../../components/forms/Forms"
import { useFech } from '../../../hooks/useFech';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContexCompany } from '../../../providers/AppProvider';
import { capitalizeFirstLetter } from '../../../js/validations';


export const AddAssociatedEntities = () => {

    const { id_customer } = useParams();
    const { validate } = useFormValidate();
    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);
    const navigate = useNavigate();
    const [formKey, setFormKey] = useState(Date.now());
    const { title } = useContext(AppContexCompany);

    const dict_bread_crumb = [
        { "bread": "empresa" },
        { "bread": "editar empresa" },
        { "bread": "agregar entidades asociadas" }
    ];

    const dict_title = { "tittle": `${capitalizeFirstLetter(title)}` };

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

    const [mutualSecurities, setMutualSecurities] = useState([]);
    const [boxesCompensation, setBoxesCompensation] = useState([]);
    const { getDataTable: list_mutualSecurities } = useFech({ url: 'mutual-security' });
    const { getDataTable: list_boxesCompensation } = useFech({ url: 'boxes-compensation' });

    const getDataFech = async (get_data_table, set_state, error_message, type_data_response) => {
        const { error, status } = await get_data_table();
        if (error) {
            $.alert(error_message);
        }
        let list_data = [];

        if (type_data_response === 'mutual_security') {
            status.map((value) => {
                list_data.push({
                    value: value.ms_id,
                    label: value.ms_name
                });
            });
        }else if (type_data_response === 'boxes_compensation') {
            status.map((value) => {
                list_data.push({
                    value: value.bc_id,
                    label: value.bc_fantasy_name
                });
            });
        }
        set_state(list_data);    
    }

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
            const { updateDataApi } = useFech({ url: `create-associated-entities/${id_customer}/` });
            const { error, status } = await updateDataApi(form_data);
            if (error) {
                $.alert(status.message);
            }else{
                const { com_id, message } = status;
                $.confirm({
                    title: message,
                    content: form_data,
                    buttons: {
                        continuar: function () {
                            navigate(`/home/editar-empresa/${id_customer}`);
                        }
                    }
                });
                return false;
            }
        }
    };

    useEffect(() => {
        getDataFech(list_mutualSecurities, setMutualSecurities, 'Error al cargar los datos de las mutuales', 'mutual_security');
        getDataFech(list_boxesCompensation, setBoxesCompensation, 'Error al cargar los datos de las cajas de compensación', 'boxes_compensation');
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
    }, [title]);

    const config_form = {
        number_row: 4,
        id_form: 'form_entities',
        position_form: 'vertical',
        def: (event) => { send_form('form_entities'); },
        name_button: 'Guardar',
        inputs: [
            {
                label: 'Mutual de seguridad',
                required: true,
                name: 'mutual_security',
                type: 'select_autocomplete',
                options: mutualSecurities,
                text_default: '-- Seleccione --',
                value: ''
            },{
                label: 'Cajas de compensación',
                required: true,
                name: 'boxes_compensation',
                type: 'select_autocomplete',
                options: boxesCompensation,
                text_default: '-- Seleccione --',
                value: ''
            }
        ],
    }

    return (
        <>
            <div className="card mb-4">
                <div className="card-header">
                    <nav className="nav nav-borders">
                    </nav>
                </div>
                <div className="card-body">
                    <div className="row">
                        <Forms key={formKey} config_form={config_form} />
                    </div>
                </div>
            </div>
        </>
    )
}
