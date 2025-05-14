import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { useFech } from '../../../hooks/useFech';

export const FamilyBurdens = () => {

    const { id_user } = useParams();

    const [familyAllowance, setFamilyAllowance] = useState('');
    const [stretch, setStretch] = useState('');

    const [simple, setSimple] = useState(0);
    const [maternal, setMaternal] = useState(0);
    const [disability, setDisability] = useState(0);

    // Opciones para los select
    const [optionFamilyAllowance] = useState([
        { value: "Y", label: "Si" },
        { value: "N", label: "No" }
    ]);

    const [optionStretch] = useState([
        { value: 1, label: "A" },
        { value: 2, label: "B" },
        { value: 3, label: "C" },
        { value: 4, label: "D" },
    ]);

    // Hook para obtener datos del usuario
    const { getDataTable: data_user } = useFech({ url: `get-user-company/by-user/${id_user}/` });

    const getUserData = async () => {
        const { error, status } = await data_user();
        if (!error) {
            setFamilyAllowance(status.uc_familyassignment);
            setStretch(status.uc_family_allowance_section);
            setSimple(status.uc_simple_family_responsibilities);
            setMaternal(status.uc_maternal_family_responsibilities);
            setDisability(status.uc_family_responsibilities_disability);
        }
    };

    const changeFamilyAllowance = (name, selectedOption) => {
        setFamilyAllowance(selectedOption.value); 

        // Si se selecciona "No", reinicia el valor de tramo y las cantidades
        if (selectedOption.value === 'N') {
            setStretch(null);
            setSimple(0);
            setMaternal(0);
            setDisability(0);
        }
    };

    const changeStretch = (name, selectedOption) => {
        setStretch(selectedOption.value); 
    };

    const changeFamilyLoadAmount = (type, value) => {
        if (type === 'simple') {
            setSimple(value);
        } else if (type === 'maternal') {
            setMaternal(value);
        } else if (type === 'disability') {
            setDisability(value);
        }
    };

    const send_form_family_burden = async () => {
        if (!familyAllowance) {
            $.alert('Seleccione asignación familiar');
            return;
        }

        if (familyAllowance === 'Y') {
            if (!stretch) {
                $.alert('Seleccione tramo');
                return;
            }

            if (simple === '') {
                $.alert('Ingrese cantidad de cargas simples');
                return;
            }

            if (maternal === '') {
                $.alert('Ingrese cantidad de cargas maternales');
                return;
            }

            if (disability === '') {  
                $.alert('Ingrese cantidad de cargas por invalidez');
                return;
            }
        }

        const data_send = {
            uc_familyassignment: familyAllowance,
            uc_family_allowance_section: stretch || null,
            uc_simple_family_responsibilities: simple || 0,
            uc_maternal_family_responsibilities: maternal || 0,
            uc_family_responsibilities_disability: disability || 0
        };

        const { updateDataApi } = useFech({ url: `update-family-responsibilities/${id_user}/` });
        const { error, status } = await updateDataApi(data_send);

        if (error) {
            $.alert('Error al guardar los datos de asignación familiar');
        } else {
            $.alert('Datos de asignación familiar guardados correctamente');
        }
    };

    useEffect(() => {
        getUserData();
    }, [id_user]);

    return (
        <>
            <div className='row'>
                <div className='col-3'>
                    <label htmlFor=''>Asignación familiar</label>
                    <Select
                        placeholder={'-- Seleccione --'}
                        options={optionFamilyAllowance}
                        onChange={(selectedOption) => changeFamilyAllowance('FamilyAllowance', selectedOption)}
                        value={optionFamilyAllowance.find(option => option.value === familyAllowance) || null}
                    />
                </div>
                <div className='col-3'>
                    <label htmlFor=''>Tramo</label>
                    <Select
                        placeholder={'-- Seleccione --'}
                        options={optionStretch}
                        isDisabled={familyAllowance === 'N'}
                        onChange={(selectedOption) => changeStretch('Stretch', selectedOption)}
                        value={optionStretch.find(option => option.value === stretch) || null}
                    />
                </div>
            </div>

            <div className='row mt-5'>
                <h2>Cantidad de cargas</h2>
            </div>

            <div className='row mt-1'>
                <div className='col-2'>
                    <label htmlFor=''>Simples</label>
                    <input
                        type='number'
                        className='form-control'
                        disabled={familyAllowance === 'N'}
                        onChange={(e) => changeFamilyLoadAmount('simple', e.target.value)}
                        value={familyAllowance === 'N' ? 0 : simple}
                    />
                </div>
                <div className='col-2'>
                    <label htmlFor=''>Maternales</label>
                    <input
                        type='number'
                        className='form-control'
                        disabled={familyAllowance === 'N'}
                        onChange={(e) => changeFamilyLoadAmount('maternal', e.target.value)}
                        value={familyAllowance === 'N' ? 0 : maternal}
                    />
                </div>
                <div className='col-2'>
                    <label htmlFor=''>Por invalidez</label>
                    <input
                        type='number'
                        className='form-control'
                        disabled={familyAllowance === 'N'}
                        onChange={(e) => changeFamilyLoadAmount('disability', e.target.value)}
                        value={familyAllowance === 'N' ? 0 : disability}
                    />
                </div>
            </div>

            <div className='row mt-2'>
                <div className="col-3 mb-3">
                    <button 
                        type='button'
                        className='btn btn-primary btn-sm mt-1'
                        onClick={() => send_form_family_burden()}>Guardar</button>
                </div>
            </div>
        </>
    );
};
