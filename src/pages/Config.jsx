import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFech } from '../hooks/useFech';

export const Config = ({ data }) => {

    const uc_type_user = parseInt(localStorage.getItem('uc_type_user'), 10);

    const { getDataTable } = useFech({ url: 'list-companies' });
    const [listCompany, setListCompany] = useState([]);

    const get_data_response = async () => {
        const { status } = await getDataTable();
        setListCompany(status);
    };

    const navigate = useNavigate();
    const [imageUser, setImageUser] = useState(localStorage.getItem('perfil_image'));

    const handleLogout = async () => {
        $.confirm({
            title: 'Confirmación!',
            content: '¿Está seguro de cerrar la sesión?',
            buttons: {
                confirmar: async function () {
                    const { postDataApi } = useFech({ url: `logout` });
                    const { error, status } = await postDataApi({});
                    if (!error) {
                        console.error('Error al cerrar sesión:', error);
                    } else {
                        localStorage.clear();
                        navigate(`/`);
                    }
                },
                cancelar: function () {}
            }
        });
    };

    const setCompany = (com_id) => {
        localStorage.setItem('company', com_id);
        window.location.reload();
    };

    useEffect(() => {
        get_data_response();
    }, [uc_type_user]);

    return (
        <>
            <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
                <a aria-expanded="false" aria-haspopup="true" className="btn btn-icon btn-transparent-dark dropdown-toggle"
                    data-bs-toggle="dropdown" href="#" id="navbarDropdownUserImage" role="button">
                    <img 
                        className="img-fluid" 
                        src={data.perfil_image} // Usa la imagen desde el estado
                        alt="Perfil"
                    />
                </a>
                <div aria-labelledby="navbarDropdownUserImage"
                    className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up">
                    <h6 className="dropdown-header d-flex align-items-center">
                        <img className="dropdown-user-img img-fluid" src={data.perfil_image} alt="Perfil" />
                        <div className="dropdown-user-details">
                            <div className="dropdown-user-details-name">
                                {data?.full_name || 'Cargando...'}
                            </div>
                            <div className="dropdown-user-details-email">
                                {data?.email || ''}
                            </div>
                        </div>
                    </h6>
                    <div className="dropdown-divider"></div>

                    {(uc_type_user === 1 || uc_type_user === 3) && listCompany.map((item, index) => (
                        <a className="dropdown-item" key={index} onClick={() => setCompany(item.com_id)} style={{cursor: 'pointer'}}>
                            <div className="dropdown-item-icon">
                                <i data-feather="settings"></i>
                            </div>
                            {item.com_name_company}

                        </a>
                    ))}

                    <Link className='dropdown-item' onClick={handleLogout}> 
                        <div className="dropdown-item-icon">
                            <i data-feather="log-out"></i>
                        </div>
                        Cerrar sesión
                    </Link>
                </div>
            </li>
        </>
    );
};
