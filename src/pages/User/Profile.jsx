import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../providers/AppProvider';
import { useFech } from '../../hooks/useFech';
import { MyPerfil } from './MyPerfil';
import { MyAddress } from './MyAddress';
import { MyRemunerationData } from './MyRemunerationData';

export const Profile = () => {
    const id_user = localStorage.getItem('user'); // Obtener usuario de localStorage
    const { updateBreadcrumbs, updateTitulo } = useContext(AppContext);

    const [dataUser, setDataUser] = useState([]);
    const [dataAddressUser, setDataAddressUser] = useState([]);
    const [dataMethodPayment, setDataMethodPayment] = useState([]);
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');

    const { getDataTable: userData } = useFech({ url: `get-data-employee-perfil/${id_user}/` });

    const calculateAge = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const getUserData = async () => {
        const { error, status } = await userData();
        if (error) {
            $.alert('Error al obtener los datos del usuario');
            return;
        }

        const full_name = `${status.first_name} ${status.last_name}`;
        setFullName(full_name);

        const userAge = calculateAge(status.employee.emp_birthdate);
        setAge(userAge);

        const position = status.position;
        const company = (status.company || '').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

        setDataUser({
            rut: status.employee.emp_rut,
            first_name: status.first_name,
            last_name: status.last_name,
            birth_date: status.employee.emp_birthdate,
            sex: status.employee.emp_sex,
            civilstatus: status.employee.emp_civilstatus,
            personal_phone: status.employee.emp_personal_phone,
            personal_email: status.employee.emp_personal_email,
            corporative_email: status.employee.emp_corporative_email
        });

        setDataAddressUser({
            address: status.employee.emp_address,
            region: status.employee.region,
            commune: status.employee.commune,
            other_address: status.employee.emp_other_address
        });

        setDataMethodPayment({
            paymentformat: status.employee.emp_paymentformat,
            bank: status.employee.bank,
            accounttype: status.employee.emp_accounttype,
            bankaccount: status.employee.emp_bankaccount,
        });

        // Actualizar título y breadcrumb después de obtener los datos
        updateTitulo(`${full_name}`);
        updateBreadcrumbs([{ bread: `${userAge} años / Cargo: ${position} / Empresa: ${company}` }]);
    };

    useEffect(() => {
        if (id_user) {
            getUserData();
        }
    }, [id_user]);

    return (
        <>
            <div className='container-xl px-4 mt-n10'>
                <div className='row'>
                    <MyPerfil data={dataUser} />
                    <MyAddress data={dataAddressUser} />
                    <MyRemunerationData data={dataMethodPayment} />
                </div>
            </div>
        </>
    );
};
