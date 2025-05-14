import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { useFech } from '../../../hooks/useFech';

export const UserCompany = () => {

    const { id_user } = useParams();
    const [typeUser, setTypeUser] = useState('');
    const [branch, setBranch] = useState('');
    const [position, setPosition] = useState('');

    const [listBranchOffice, setListBranchOffice] = useState([]);
    const [listPosition, setListPosition] = useState([]);
    const [listTypeUser] = useState([
        { value: 1, label: 'Super-Admin' }, 
        { value: 2, label: 'Recursos Humanos' }, 
        { value: 3, label: 'Recursos Humanos Administrador' }, 
        { value: 4, label: 'Jefatura' },
        { value: 5, label: 'Colaborador' }
    ]);

    const [errors, setErrors] = useState({});
    const company_id = localStorage.getItem('company') ? localStorage.getItem('company') : null;

    const { getDataTable: userData } = useFech({ url: `get-user-company/by-user/${id_user}/` });
    const { getDataTable: list_branch_office } = useFech({ url: `list-branch-office/${company_id}` });
    const { getDataTable: list_position } = useFech({ url: `list-position-company/${company_id}` });


    const getUserData = async () => {
        const { error, status } = await userData();
        if (error) {
            $.alert('Error al obtener los datos del usuario');
            return;
        }

        setTypeUser(status.uc_type_user);
        setBranch(status.subsidiary);
        setPosition(status.position);
    };

    const getBranchOffice = async () => {
        const { error, status } = await list_branch_office();
        if (error) {
            $.alert('Error al obtener las sucursales');
            return;
        }
        const list_data = status.map(value => ({
            value: value.sub_id,
            label: value.sub_name,
        }));
        setListBranchOffice(list_data);
    };

    const getPosition = async () => {
        const { error, status } = await list_position();
        if (error) {
            $.alert('Error al obtener los cargos');
            return;
        }
        const list_data = status.map(value => ({
            value: value.pos_id,
            label: value.pos_name_position,
        }));
        setListPosition(list_data);
    };

    const validateFields = () => {
        const newErrors = {};

        // Validar Tipo Usuario
        if (!typeUser) {
            newErrors.typeUser = 'Debe seleccionar un tipo de usuario.';
        }

        // Validar Sucursal
        if (!branch) {
            newErrors.branch = 'Debe seleccionar una sucursal.';
        }

        // Validar Cargo
        if (!position) {
            newErrors.position = 'Debe seleccionar un cargo.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const send_form_data = async () => {
        if (!validateFields()) {
            console.log('Errores de validación:', errors);
            return;
        }

        const { updateDataApi } = useFech({ url: `update-user-company/by-user/${id_user}/` });
        const { error, status } = await updateDataApi({
            uc_type_user: typeUser,
            uc_branch_office: branch,
            uc_position: position
        });

        if (error) {
            $.alert(status.message);
        } else {
            const { com_id, message } = status;
            $.alert("Colaborador actualizado con éxito");
            return false;
        }
    };

    useEffect(() => {
        getBranchOffice();
        getPosition();
    }, [company_id]);

    useEffect(() => {
        getUserData();
    }, [company_id]);

    return (
        <div className="row">
            <div className="col-4 mb-3">
                <label htmlFor="">Tipo Usuario</label>
                <Select
                    placeholder={'-- Seleccione --'}
                    options={listTypeUser}
                    onChange={(option) => setTypeUser(option.value)}
                    value={listTypeUser.find(option => option.value === typeUser) || null}
                />
                {errors.typeUser && (<div className="text-danger">{errors.typeUser}</div>)}
            </div>
            <div className="col-4 mb-3">
                <label htmlFor="">Sucursal</label>
                <Select
                    placeholder={'-- Seleccione --'}
                    options={listBranchOffice}
                    onChange={(option) => setBranch(option.value)}
                    value={listBranchOffice.find(option => option.value === branch) || null}
                />
                {errors.branch && <div className="text-danger">{errors.branch}</div>}
            </div>
            <div className="col-4 mb-3">
                <label htmlFor="">Cargo</label>
                <Select
                    placeholder={'-- Seleccione --'}
                    options={listPosition}
                    onChange={(option) => setPosition(option.value)}
                    value={listPosition.find((opt) => opt.value === position) || null}
                    classNamePrefix="react-select"
                    className={errors.position ? 'is-invalid' : ''}
                />
                {errors.position && (
                    <div className="text-danger">{errors.position}</div>
                )}
            </div>


            <div className="col-md-3 mt-3">
                <button
                    type="button"
                    className="btn btn-primary btn-sm mt-4"
                    onClick={() => send_form_data()}
                >
                    Guardar
                </button>
            </div>



        </div>
    );
};
