import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { useFech } from '../../../hooks/useFech';

export const LegalGratification = () => {
    const { id_user } = useParams();

    // Opciones para los select
    const [optionLegalGratification] = useState([
        { value: "Y", label: "Si" },
        { value: "N", label: "No" }
    ]);

    const [optionTypeGratification] = useState([
        { value: "A", label: "Anual" },
        { value: "M", label: "Mensual" }
    ]);

    // Estados de los select
    const [legalGratification, setLegalGratification] = useState(null);
    const [typeGratification, setTypeGratification] = useState(null);

    // Hook para obtener datos del usuario
    const { getDataTable: data_user } = useFech({ url: `get-user-company/by-user/${id_user}/` });

    const getUserData = async () => {
        const { error, status } = await data_user();
        if (!error) {
            // Ajustar los valores de los select con los datos obtenidos
            const legalOption = optionLegalGratification.find(
                option => option.value === status.uc_gratification
            );
            const typeOption = optionTypeGratification.find(
                option => option.value === status.uc_typegratification
            );

            setLegalGratification(legalOption || null);
            setTypeGratification(typeOption || null);
        }
    };

    // Manejo de cambios en los select
    const changeLegalGratification = (selectedOption) => {
        setLegalGratification(selectedOption);
    };

    const changeTypeGratification = (selectedOption) => {
        setTypeGratification(selectedOption);
    };

    // Enviar los datos
    const send_gratication = async () => {
        if (!legalGratification) {
            $.alert('Seleccione gratificación legal');
            return;
        }

        if (!typeGratification) {
            $.alert('Seleccione el tipo de gratificación legal');
            return;
        }

        const data_send = {
            uc_gratification: legalGratification.value,
            uc_typegratification: typeGratification.value
        };

        const { updateDataApi } = useFech({ url: `update-legal-gratification/${id_user}/` });
        const { error } = await updateDataApi(data_send);

        if (error) {
            $.alert('Error al guardar los datos de gratificación legal');
        } else {
            $.alert('Datos de gratificación legal guardados correctamente');
        }
    };

    useEffect(() => {
        getUserData();
    }, [id_user]);

    return (
        <div className='row'>
            <div className='col-3'>
                <label htmlFor="">Gratificación Legal</label>
                <Select
                    placeholder={'-- Seleccione --'}
                    options={optionLegalGratification}
                    onChange={changeLegalGratification}
                    value={legalGratification}
                />
            </div>
            <div className='col-3'>
                <label htmlFor="">Tipo Gratificación Legal</label>
                <Select
                    placeholder={'-- Seleccione --'}
                    options={optionTypeGratification}
                    onChange={changeTypeGratification}
                    value={typeGratification}
                />
            </div>
            <div className='col-3'>
                <button
                    type='button'
                    className='btn btn-primary btn-sm mt-4'
                    onClick={send_gratication}
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};
