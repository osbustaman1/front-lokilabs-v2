import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { MenuAdmin } from '../components/menus/MenuAdmin';
import { NotFound } from '../components/NotFound';
import { BreadCrumbs } from '../components/breadcrumbs/BreadCrumbs';
import { AlertsMails } from './AlertsMails';
import { AlertCenter } from './AlertCenter';
import { Config } from './Config';
import { Profile } from './User/Profile';
import { Title } from "../components/Title";

import { AppProvider, AppProviderCompany, AppContext, AppProviderEntitie, AppProviderWriteDataIsapre } from '../providers/AppProvider';

import { Factory } from './rrhh/Factory';
import { AddFactory } from './rrhh/AddFactory';
import { EditFactory } from './rrhh/EditFactory';
import { ListSmallButtons } from '../components/buttons/ListSmallButtons';

import { AddBranchOffice } from './rrhh/BranchOffice/AddBranchOffice';
import { EditarBranchOffice } from './rrhh/BranchOffice/EditarBranchOffice';
import { AddCenterCost } from './rrhh/CenterCost/AddCenterCost';
import { EditCenterCost } from './rrhh/CenterCost/EditCenterCost';
import { AddAssociatedEntities } from './rrhh/AssociatedEntities/AddAssociatedEntities';
import { EditAssociatedEntities } from './rrhh/AssociatedEntities/EditAssociatedEntities';

import { useDataUser } from '../hooks/useDataUser';

import useMenuMiddleware from '../hooks/useMenuMiddleware';
import { ListAreas } from './rrhh/ListAreas';
import { AddArea } from './rrhh/Area/AddArea';
import { EditArea } from './rrhh/Area/EditArea';
import { AddDepartment } from './rrhh/Area/AddDepartment';
import { EditDepartment } from './rrhh/Area/EditDepartment';
import { AddPosition } from './rrhh/Area/AddPosition';
import { EditPosition } from './rrhh/Area/EditPosition';
import { ListUsers } from './rrhh/Users/ListUsers';
import { AddUser } from './rrhh/Users/AddUser';
import { EditUser } from './rrhh/Users/EditUser';
import { url_customer } from '../js/url';
import { MyContracts } from './User/MyContracts';
import { ListContracts } from './rrhh/ListContracts';
import { AddContracts } from './rrhh/contracts/AddContracts';
import { EditContracts } from './rrhh/contracts/EditContracts';
import { VacationRequest } from './User/VacationRequest';
import { MyApartament } from './leadership/MyApartament';
import { TeamRequests } from './leadership/TeamRequests';
import { SalaryConcept } from './SalaryConcept';


export const App = () => {

    const host_url = url_customer();
    const host_name = (host_url.split('//')[1]).split('.')[0];

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    if (!token) {
        $.confirm({
            title: 'ERROR!',
            content: 'Usuario no autenticado',
            buttons: {
                confirmar: async function () {
                    navigate(`/`);
                }
            }
        });
    }

    useMenuMiddleware();

    const [_first_name, setFirstName] = useState('');
    const [_last_name, setLastName] = useState('');
    const [_email, setEmail] = useState('');
    const [_image_user, setImageUser] = useState('https://lokilabs.s3.amazonaws.com/219983.png');

    const get_data_user = async () => {
        const { getDataUser, getDataPrevired } = useDataUser(localStorage.getItem('user'));
        const { error, status } = await getDataUser();
        const { first_name, last_name, email } = status;

        setFirstName(first_name);
        setLastName(last_name);
        setEmail(email);
        setImageUser(status.employee.emp_perfil_image ? status.employee.emp_perfil_image : 'https://lokilabs.s3.amazonaws.com/219983.png');

    }

    const get_data_previred = async () => {
        const { getDataPrevired } = useDataUser(localStorage.getItem('user'));
        const { error, status } = await getDataPrevired();

        localStorage.setItem('uf', status[0].data[0].value);
        localStorage.setItem('utm', status[0].data[1].value);
        localStorage.setItem('uta', status[0].data[2].value);
    }

    get_data_user();
    get_data_previred();

    const [currentYear, setCurrentYear] = useState('');
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    useEffect(() => {
        // Función para obtener el año actual
        const getYear = () => {
            setCurrentYear(new Date().getFullYear().toString());
        };

        // Llamada inicial para obtener el año actual al montar el componente
        getYear();
        
    }, []);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <AppProvider>
                <AppProviderCompany>
                    <AppProviderEntitie >
                        <AppProviderWriteDataIsapre>
                            <nav className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white"
                                id="sidenavAccordion">

                                <button
                                    className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0"
                                    id="sidebarToggle"
                                    onClick={toggleSidebar}
                                >
                                    <i className="fa-solid fa-bars"></i>
                                </button>

                                <a className="navbar-brand pe-3 ps-4 ps-lg-2" href="#">
                                    Aqui va la imagen
                                </a>

                                <ul className="navbar-nav align-items-center ms-auto">
                                    <AlertCenter />
                                    <AlertsMails />
                                    <Config data={
                                        { 
                                            full_name: `${_first_name} ${_last_name}`, 
                                            email: _email,
                                            perfil_image: _image_user
                                        }
                                    }/>
                                </ul>
                            </nav>

                            <div id="layoutSidenav">
                                <div id="layoutSidenav_nav" className={isSidebarVisible ? "" : "d-none"}>
                                    <nav className="sidenav shadow-right sidenav-light">
                                        <div className="sidenav-menu scroll-div">

                                            <div className="nav accordion" id="accordionSidenav">
                                                <MenuAdmin />
                                            </div>

                                        </div>
                                        <div className="sidenav-footer">
                                            <div className="sidenav-footer-content">
                                                <div className="sidenav-footer-subtitle">
                                                    Bienvenid@:
                                                </div>
                                                <div className="sidenav-footer-title">
                                                    {`${_first_name} ${_last_name}`}
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>

                                <div id="layoutSidenav_content">
                                    <main className='scroll-div'>
                                        <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                                            <div className="container-xl px-4">
                                                <div className="page-header-content pt-4">
                                                    <div className="row align-items-center justify-content-between">
                                                        <div className="col mt-4">
                                                            <h1 className="page-header-title">
                                                                <div className="page-header-icon">
                                                                    <i data-feather="layout">
                                                                    </i>
                                                                </div>
                                                                <AppContext.Consumer>
                                                                    {({ titulo }) => (
                                                                        <>
                                                                            <Title title={titulo} />
                                                                        </>
                                                                    )}
                                                                </AppContext.Consumer>
                                                                
                                                            </h1>
                                                            <div className="page-header-subtitle">
                                                                <div className="row">
                                                                    <div className='col-md-9'>
                                                                        <AppContext.Consumer>
                                                                            {({ breadcrumbs }) => <BreadCrumbs breadcrumbs={breadcrumbs} />}
                                                                        </AppContext.Consumer>
                                                                    </div>
                                                                    <div className='col-md-3 d-flex align-items-center justify-content-end'>
                                                                        <div className="d-none d-sm-block">
                                                                            <AppContext.Consumer>
                                                                                {({ buttons }) => <ListSmallButtons buttons={buttons} />}
                                                                            </AppContext.Consumer>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </header>

                                        <div className="">
                                            <Routes>
                                                <Route path="profile" element={<Profile />} />
                                                <Route path="contracts" element={<MyContracts />} />
                                                <Route path="lista-empresas" element={<Factory />} />
                                                <Route path="lista-contratos" element={<ListContracts />} />
                                                <Route path="agregar-contratos" element={<AddContracts />} />
                                                <Route path="editar-contratos/:id_contract" element={<EditContracts />} />
                                                <Route path="agregar-empresa" element={<AddFactory />} />
                                                <Route path="editar-empresa/:id_customer" element={<EditFactory />} />
                                                <Route path="agregar-sucursal/:id_customer" element={<AddBranchOffice />} />
                                                <Route path="editar-sucursal/:id_customer/:id_branch" element={<EditarBranchOffice />} />
                                                <Route path="agregar-centro-costo/:id_customer" element={<AddCenterCost />} />
                                                <Route path="editar-centro-costo/:id_customer/:cencost_id" element={<EditCenterCost />} />
                                                <Route path="agregar-entidades-asociadas/:id_customer" element={<AddAssociatedEntities />} />
                                                <Route path="editar-entidades-asociadas/:id_customer" element={< EditAssociatedEntities/>} />
                                                <Route path="lista-areas" element={< ListAreas/>} />
                                                <Route path="agregar-area" element={< AddArea/>} />
                                                <Route path="editar-area/:id_area" element={< EditArea/>} />
                                                <Route path="agregar-departamento/:id_area" element={< AddDepartment/>} />
                                                <Route path="editar-departamento/:id_area/:id_department" element={< EditDepartment/>} />
                                                <Route path="agregar-cargo/:id_area/:id_department" element={<AddPosition />} />
                                                <Route path="editar-cargo/:id_area/:id_department/:id_position" element={< EditPosition/>} />
                                                <Route path="listado-colaboradores/" element={< ListUsers/>} />
                                                <Route path="agregar-colaborador/" element={< AddUser/>} />
                                                <Route path="editar-colaborador/:id_user/" element={< EditUser/>} />
                                                <Route path="solicitud-vacaciones/" element={< VacationRequest/>} />

                                                <Route path="mi-equipo/" element={< MyApartament/>} />
                                                <Route path="solicitudes-equipo/" element={< TeamRequests/>} />


                                                <Route path="salary-concept/" element={< SalaryConcept/>} />


                                                <Route path="*" element={<NotFound />} />
                                            </Routes>
                                        </div>
                                        <footer className="footer-admin mt-auto footer-light">
                                            <div className="container-xl px-4">
                                                <div className="row">
                                                    <div className="col-md-6 small">
                                                        {host_name}
                                                    </div>
                                                    <div className="col-md-6 text-md-end small">
                                                        &copy; Solvix SPA. Marca registrada 2024-{currentYear}
                                                    </div>
                                                </div>
                                            </div>
                                        </footer>
                                    </main>
                                    
                                </div>
                            </div>
                        </AppProviderWriteDataIsapre>
                    </AppProviderEntitie>
                </AppProviderCompany>
            </AppProvider>
        </>
    )
}
