import React, { useEffect, useState, useContext } from 'react';
import { Forms } from "../../components/forms/Forms";
import { useFormValidate } from '../../hooks/useFormValidate';
import { useFech } from '../../hooks/useFech';
import { useParams } from 'react-router-dom';
import { InputUploadImage } from '../../components/upload/InputUploadImage';

import { AppContexCompany } from '../../providers/AppProvider';

export const EditFormFactory = () => {
    const { id_customer } = useParams();
    const { validate } = useFormValidate();
    const { getDataTable } = useFech({ url: `view-company/${id_customer}/` });
    const { getDataTable: list_countries } = useFech({ url: 'list-countries' });
    const { getDataTable: list_regions } = useFech({ url: 'list-region' });
    const { getDataTable: list_communes } = useFech({ url: 'list-commune' });
    const { getDataTable: list_reason_social } = useFech({ url: 'list-reason-social' });

    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [comSocialReason, setComSocialReason] = useState([]);
    const [dataCompany, setDataCompany] = useState({});
    const [configForm, setConfigForm] = useState(null);

    const { updateTitle } = useContext(AppContexCompany);

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
        } else if (type_data_response === 'regions') {
            status.map((value) => {
                list_data.push({
                    value: value.re_id,
                    label: value.re_name
                });
            });
        } else if (type_data_response === 'communes') {
            status.map((value) => {
                list_data.push({
                    value: value.com_id,
                    label: value.com_name
                });
            });
        } else if (type_data_response === 'social_reason') {
            status.map((value) => {
                list_data.push({
                    value: value.id,
                    label: value.name
                });
            });
        }
        set_state(list_data);
    };

    const get_data_company = async () => {
        const { error, status } = await getDataTable();
        setDataCompany(status);
    };

    const send_form_user = async (form) => {
        const { error, form_data } = validate(form);
        const { id_parent_company, ...newObject } = form_data;

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
        } else {
            const { updateDataApi } = useFech({ url: `edit-company/${id_customer}/` });
            const { error, status } = await updateDataApi(newObject);

            if (error) {
                $.alert('Error al actualizar la compañia');
            } else {
                $.alert('La empresa fue actualizada con éxito');
                return false;
            }
        }
    };

    const clean_form_user = (id_form) => {
        setTimeout(() => {
            const form = document.getElementById(id_form);
            const formData = new FormData(form);
            formData.forEach((value, key) => {
                const input = document.getElementsByName(key);
                input[0].value = '';
                input[0].classList.remove('is-invalid');
            });
        }, 3000);
    };

    useEffect(() => {
        getDataFech(list_countries, setCountries, 'Error al cargar los datos de los paises', 'countries');
        getDataFech(list_regions, setRegions, 'Error al cargar los datos de las regiones', 'regions');
        getDataFech(list_communes, setCommunes, 'Error al cargar los datos de las comunas', 'communes');
        getDataFech(list_reason_social, setComSocialReason, 'Error al cargar los datos de las razones sociales', 'social_reason');
    }, []);

    useEffect(() => {
        get_data_company();
    }, [id_customer]);

    useEffect(() => {
        if (Object.keys(dataCompany).length > 0) {
            const {
                com_rut,
                com_name_company,
                com_is_holding,
                com_id_parent_company,
                com_representative_name,
                com_rut_representative,
                com_is_state,
                com_social_reason,
                com_twist_company,
                com_address,
                commune,
                region,
                country,
                com_phone_one,
                com_phone_two,
                com_mail_one,
                com_mail_two
            } = dataCompany;

            updateTitle(com_name_company);

            const newConfigForm = {
                number_row: 6,
                id_form: 'form_company',
                position_form: 'vertical',
                def: (event) => { send_form_user('form_company'); },
                name_button: 'Editar',
                inputs: [
                    {
                        label: 'Rut de la compañia',
                        placeholder: '',
                        required: true,
                        name: 'com_rut',
                        type: 'rut',
                        value: com_rut
                    }, {
                        label: 'Nombre de la compañia',
                        placeholder: '',
                        required: true,
                        name: 'com_name_company',
                        type: 'text',
                        value: com_name_company
                    }, {
                        label: 'Es Holding',
                        required: true,
                        name: 'com_is_holding',
                        type: 'select_autocomplete',
                        options: [{ value: 'Y', label: 'Si' }, { value: 'N', label: 'No' }],
                        text_default: '-- Seleccione --',
                        value: com_is_holding
                    }, {
                        label: 'Compañia principal?',
                        required: true,
                        name: 'id_parent_company',
                        type: 'select_autocomplete',
                        options: [{ value: 'Y', label: 'Si' }, { value: 'N', label: 'No' }],
                        text_default: '-- Seleccione --',
                        value: com_id_parent_company ? 'Y' : 'N'
                    }, {
                        label: '',
                        required: true,
                        name: 'com_id_parent_company',
                        type: 'hidden',
                        value: com_id_parent_company
                    }, {
                        label: 'Nombre del representante',
                        placeholder: '',
                        required: true,
                        name: 'com_representative_name',
                        type: 'text',
                        value: com_representative_name
                    }, {
                        label: 'Rut del representante',
                        placeholder: '',
                        required: true,
                        name: 'com_rut_representative',
                        type: 'rut',
                        value: com_rut_representative
                    }, {
                        label: 'Es estatal?',
                        required: true,
                        name: 'com_is_state',
                        type: 'select_autocomplete',
                        options: [{ value: 'Y', label: 'Si' }, { value: 'N', label: 'No' }],
                        text_default: '-- Seleccione --',
                        value: com_is_state
                    }, {
                        label: 'Razón social',
                        required: true,
                        name: 'com_social_reason',
                        type: 'select_autocomplete',
                        options: comSocialReason,
                        text_default: '-- Seleccione --',
                        value: com_social_reason
                    }, {
                        label: 'Giro de la compañia',
                        placeholder: '',
                        required: true,
                        name: 'com_twist_company',
                        type: 'text',
                        value: com_twist_company
                    }, {
                        label: 'Dirección',
                        placeholder: '',
                        required: true,
                        name: 'com_address',
                        type: 'text',
                        value: com_address
                    }, {
                        label: 'Comunas',
                        required: true,
                        name: 'commune',
                        type: 'select_autocomplete',
                        options: communes,
                        text_default: '-- Seleccione --',
                        value: commune
                    }, {
                        label: 'Regiones',
                        required: true,
                        name: 'region',
                        type: 'select_autocomplete',
                        options: regions,
                        text_default: '-- Seleccione --',
                        value: region
                    }, {
                        label: 'País',
                        required: true,
                        name: 'country',
                        type: 'select_autocomplete',
                        options: countries,
                        text_default: '-- Seleccione --',
                        value: country
                    }, {
                        label: 'Teléfono 1',
                        placeholder: '',
                        required: true,
                        name: 'com_phone_one',
                        type: 'text',
                        value: com_phone_one
                    }, {
                        label: 'Teléfono 2',
                        placeholder: '',
                        required: true,
                        name: 'com_phone_two',
                        type: 'text',
                        value: com_phone_two
                    }, {
                        label: 'Correo 1',
                        placeholder: '',
                        required: true,
                        name: 'com_mail_one',
                        type: 'mail',
                        value: com_mail_one
                    }, {
                        label: 'Correo 2',
                        placeholder: '',
                        required: true,
                        name: 'com_mail_two',
                        type: 'mail',
                        value: com_mail_two
                    }
                ]
            };

            setConfigForm(newConfigForm);
        }
    }, [dataCompany, communes, regions, countries, comSocialReason]);

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
                            {configForm && <Forms config_form={configForm} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};