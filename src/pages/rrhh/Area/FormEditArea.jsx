import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../providers/AppProvider';
import { useFormValidate } from '../../../hooks/useFormValidate';
import { Forms } from "../../../components/forms/Forms"
import { useFech } from '../../../hooks/useFech';
import { useParams } from 'react-router-dom';

export const FormEditArea = () => {

    const { id_area } = useParams();
    const { getDataList } = useFech({ url: `list-companies` });
    const [dataCompanies, setDataCompanies] = useState([]);
    const [configForm, setConfigForm] = useState(null);
    const [dataArea, setDataArea] = useState([]);
    const [companiesLoaded, setCompaniesLoaded] = useState(false);
    const { validate } = useFormValidate();
    const { getDataList: get_area } = useFech({ url: `get-areas/${id_area}/` });

    const get_data_area = async () => {
        const { error, status } = await get_area();
        setDataArea(status);
    };

    const get_list_companies = async () => {
        try {
            const { error, status } = await getDataList();
            const list_data = [];
            status.map((value) => {
                list_data.push({
                    value: value.com_id,
                    label: value.com_name_company
                });
            });
            setDataCompanies(list_data);
            setCompaniesLoaded(true);
        } catch (error) {
            $.alert({
                title: 'Alerta!',
                content: error,
            });
        }
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

            const { updateDataApi } = useFech({ url: `update-areas/${id_area}/` });
            const { error, status } = await updateDataApi(form_data);

            if (error) {
                $.alert(status.message);
            }else{
                $.alert('Área editada correctamente!');
                return false;
            }
        }
    };

    useEffect(() => {
        if (Object.keys(dataArea).length > 0) {
            const { 
                ar_name, 
                company 
            } = dataArea;

            const config_form = {
                number_row: 6,
                id_form: 'form_area',
                position_form: 'vertical',
                def: (event) => { send_form('form_area'); },
                name_button: 'Editar',
                inputs: [
                    {
                        label: 'Nombre área',
                        placeholder: '',
                        required: true,
                        name: 'ar_name',
                        type: 'text',
                        value: ar_name,
                    },{
                        label: 'Empresa',
                        required: true,
                        name: 'company',
                        type: 'select_autocomplete',
                        options: dataCompanies,
                        text_default: '-- Seleccione una empresa --',
                        value: company
                    }
                ],
            }
            setConfigForm(config_form);
        }
    }, [dataArea, companiesLoaded]);

    useEffect(() => {
        get_data_area();
        get_list_companies();
    }, [id_area]);

    return (
        <>
            {configForm && <Forms config_form={configForm} />}
        </>
    )
}
