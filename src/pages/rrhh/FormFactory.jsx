import React, { useEffect, useState, useContext } from 'react';
import { Forms } from "../../components/forms/Forms"
import { useFormValidate } from '../../hooks/useFormValidate';
import { useFech } from '../../hooks/useFech';
import { useNavigate } from 'react-router-dom';
import { InputUploadImage } from '../../components/upload/InputUploadImage';

export const FormFactory = () => {

    const { validate } = useFormValidate();

    const { getDataTable: list_countries } = useFech({ url: 'list-countries' });
    const { getDataTable: list_regions } = useFech({ url: 'list-region' });
    const { getDataTable: list_communes } = useFech({ url: 'list-commune' });
    const { getDataTable: list_reason_social } = useFech({ url: 'list-reason-social' });

    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [comSocialReason, setComSocialReason] = useState([]);

    const navigate = useNavigate();
    const [formKey, setFormKey] = useState(Date.now());
    
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
        }else if (type_data_response === 'social_reason') {
            status.map((value) => {
                list_data.push({
                    value: value.id,
                    label: value.name
                });
            });
        }
        set_state(list_data);    
    }

    const send_form_user = async (form) => {
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
            const { postDataApi } = useFech({ url: 'create-company' });
            const { error, status } = await postDataApi(form_data);
            if (error) {
                $.alert(status.message);
            }else{
                const { com_id, message } = status;
                $.confirm({
                    title: message,
                    content: form_data,
                    buttons: {
                        continuar: function () {
                            navigate(`/home/editar-empresa/${com_id}`);
                        }
                    }
                });
                return false;
            }
        }
    };

    useEffect(() => {
        getDataFech(list_countries, setCountries, 'Error al cargar los datos de los paises', 'countries');
        getDataFech(list_regions, setRegions, 'Error al cargar los datos de las regiones', 'regions');
        getDataFech(list_communes, setCommunes, 'Error al cargar los datos de las comunas', 'communes');
        getDataFech(list_reason_social, setComSocialReason, 'Error al cargar los datos de las razones sociales', 'social_reason');
    }, []);

    const config_form = {
        number_row: 6,
        id_form: 'form_company',
        position_form: 'vertical',
        def: (event) => { send_form_user('form_company'); },
        name_button: 'Guardar',
        inputs: [
            {
                label: 'Rut de la compañia',
                placeholder: '',
                required: true,
                name: 'com_rut',
                type: 'rut',
                value: ''
            },{
                label: 'Nombre de la compañia',
                placeholder: '',
                required: true,
                name: 'com_name_company',
                type: 'text',
                value: ''
            },{
                label: 'Es Holding',
                required: true,
                name: 'com_is_holding',
                type: 'select_autocomplete',
                options: [{value: 'Y', label: 'Si'}, {value: 'N', label: 'No'}],
                text_default: '-- Seleccione --',
                value: ''
            },{
                label: 'Compañia principal?',
                required: true,
                name: 'com_id_parent_company',
                type: 'select_autocomplete',
                options: [{value: 'Y', label: 'Si'}, {value: 'N', label: 'No'}],
                text_default: '-- Seleccione --',
                value: ''
            },{
                label: 'Nombre del representante',
                placeholder: '',
                required: true,
                name: 'com_representative_name',
                type: 'text',
                value: ''
            },{
                label: 'Rut del representante',
                placeholder: '',
                required: true,
                name: 'com_rut_representative',
                type: 'rut',
                value: ''
            },{
                label: 'Es estatal?',
                required: true,
                name: 'com_is_state',
                type: 'select_autocomplete',
                options: [{value: 'Y', label: 'Si'}, {value: 'N', label: 'No'}],
                text_default: '-- Seleccione --',
                value: ''
            },{
                label: 'Razón social',
                required: true,
                name: 'com_social_reason',
                type: 'select_autocomplete',
                options: comSocialReason,
                text_default: '-- Seleccione --',
                value: ''
            },{
                label: 'Giro de la compañia',
                placeholder: '',
                required: true,
                name: 'com_twist_company',
                type: 'text',
                value: ''
            },{
                label: 'Dirección',
                placeholder: '',
                required: true,
                name: 'com_address',
                type: 'text',
                value: ''
            },{
                label: 'Comunas',
                required: true,
                name: 'commune',
                type: 'select_autocomplete',
                options: communes,
                text_default: '-- Seleccione --',
                value: ''
            },{
                label: 'Regiones',
                required: true,
                name: 'region',
                type: 'select_autocomplete',
                options: regions,
                text_default: '-- Seleccione --',
                value: ''
            },{
                label: 'País',
                required: true,
                name: 'country',
                type: 'select_autocomplete',
                options: countries,
                text_default: '-- Seleccione --',
                value: ''
            },{
                label: 'Teléfono 1',
                placeholder: '',
                required: true,
                name: 'com_phone_one',
                type: 'text',
                value: ''
            },{
                label: 'Teléfono 2',
                placeholder: '',
                required: true,
                name: 'com_phone_two',
                type: 'text',
                value: ''
            },{
                label: 'Correo 1',
                placeholder: '',
                required: true,
                name: 'com_mail_one',
                type: 'email',
                value: ''
            },{
                label: 'Correo 2',
                placeholder: '',
                required: true,
                name: 'com_mail_two',
                type: 'email',
                value: ''
            }
        ],
    }

    return (
        <>
            <div className="row">
                <InputUploadImage />
                <div className="col-xl-8">
                    <div className="card mb-4">
                        <div className="card-header">
                            Datos de la empresa
                        </div>
                        <div className="card-body">
                            <Forms key={formKey} config_form={config_form} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
