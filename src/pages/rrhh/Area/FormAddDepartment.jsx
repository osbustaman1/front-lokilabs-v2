import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../providers/AppProvider';
import { useFormValidate } from '../../../hooks/useFormValidate';
import { Forms } from "../../../components/forms/Forms"
import { useFech } from '../../../hooks/useFech';
import { useParams, useNavigate } from 'react-router-dom';

export const FormAddDepartment = () => {

    const { id_area } = useParams();
    const { getDataList } = useFech({ url: `list-companies` });
    const [dataCompanies, setDataCompanies] = useState([]);
    const navigate = useNavigate();
    const [formKey, setFormKey] = useState(Date.now());
    const { validate } = useFormValidate();

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
            const { postDataApi } = useFech({ url: `add-department/create/` });
            const { error, status } = await postDataApi(form_data);
            if (error) {
                $.alert(status.message);
            }else{
                const { message } = status;
                $.confirm({
                    title: 'Departamento creada correctamente!',
                    content: 'Click en continuar o en nuevo para agregar otro departamento.',
                    buttons: {
                        continuar: function () {
                            navigate(`/home/editar-area/${id_area}/`);
                        }, 
                        nuevo: function () {
                            setFormKey(Date.now());
                        }
                    }
                });
                return false;
            }
        }
    };

    const config_form = {
        number_row: 12,
        id_form: 'form_department',
        position_form: 'vertical',
        def: (event) => { send_form('form_department'); },
        name_button: 'Guardar',
        inputs: [
            {
                label: 'Nombre departamento',
                placeholder: '',
                required: true,
                name: 'dep_name',
                type: 'text',
                value: '',
            },{
                label: 'Descripción departamento',
                placeholder: '',
                required: true,
                name: 'dep_description',
                type: 'textarea',
                value: '',
            },{
                label: '',
                required: true,
                name: 'area',
                type: 'hidden',
                value: id_area
            }
        ],
    }

    useEffect(() => {
        get_list_companies();
    }, []);

    return (
        <>
            <Forms key={formKey} config_form={config_form} />
        </>
    )
}
