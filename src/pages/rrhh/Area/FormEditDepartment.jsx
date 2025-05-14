import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../providers/AppProvider';
import { useFormValidate } from '../../../hooks/useFormValidate';
import { Forms } from "../../../components/forms/Forms"
import { useFech } from '../../../hooks/useFech';
import { useParams } from 'react-router-dom';

export const FormEditDepartment = () => {

    const { id_area, id_department } = useParams();
    const { getDataList } =  useFech({ url: `get-department/${id_department}/` });
    const [configForm, setConfigForm] = useState(null);
    const [dataResponses, setDataResponses] = useState([]);
    const [companiesLoaded, setCompaniesLoaded] = useState(false);
    const { validate } = useFormValidate();

    const get_data_element = async () => {
        const { error, status } = await getDataList();
        setDataResponses(status);
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
            const { updateDataApi } = useFech({ url: `update-department/${id_department}/` });
            const { error, status } = await updateDataApi(form_data);
            if (error) {
                $.alert(status.message);
            }else{
                $.alert('Departamento editado correctamente!');
                return false;
            }
        }
    };

    useEffect(() => {
        if (Object.keys(dataResponses).length > 0) {
            const { dep_name, dep_description, area } = dataResponses;
            const config_form = {
                number_row: 12,
                id_form: 'form_department',
                position_form: 'vertical',
                def: (event) => { send_form('form_department'); },
                name_button: 'Editar',
                inputs: [
                    {
                        label: 'Nombre departamento',
                        placeholder: '',
                        required: true,
                        name: 'dep_name',
                        type: 'text',
                        value: dep_name,
                    },{
                        label: 'Descripción departamento',
                        placeholder: '',
                        required: true,
                        name: 'dep_description',
                        type: 'textarea',
                        value: dep_description,
                    },{
                        label: '',
                        required: true,
                        name: 'area',
                        type: 'hidden',
                        value: area
                    }
                ],
            }
            setConfigForm(config_form);
        }
    }, [dataResponses, companiesLoaded]);

    useEffect(() => {
        get_data_element();
    }, [id_department]);

    return (
        <>
            {configForm && <Forms config_form={configForm} />}
        </>
    )
}
