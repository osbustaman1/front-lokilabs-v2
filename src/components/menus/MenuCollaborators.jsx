import React from 'react';
import { Link } from "react-router-dom";

export const MenuCollaborators = () => {
    return (
        <>
            <div className="sidenav-menu-heading">
                Colaborador
            </div>

            <a 
                aria-controls="collapseColaborattor" 
                aria-expanded={localStorage.getItem('item') === 'my_data' ? 'true' : 'false'}
                className={localStorage.getItem('item') === 'my_data' ? 'nav-link' : 'nav-link collapsed'}
                data-bs-target="#collapseColaborattor" 
                data-bs-toggle="collapse" 
                href="#"
            >
                <div className="nav-link-icon">
                    <i className="fa-solid fa-book"></i>
                </div>
                <span className={localStorage.getItem('item') === 'my_data' ? 'color-text-1' : ''}>Mis datos</span>
                <div className="sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                </div>
            </a>
            <div 
                className={localStorage.getItem('item') === 'my_data' ? 'collapse show' : 'collapse'}
                data-bs-parent="#accordionSidenav" 
                id="collapseColaborattor"
            >
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                    <Link className={localStorage.getItem('sub-item') === 'profile' ? `active nav-link` : 'nav-link'} to='profile'> Mis datos personales</Link>
                    <Link className={localStorage.getItem('sub-item') === 'contracts' ? `active nav-link` : 'nav-link'} to='contracts'> Mis datos laborales</Link>
                    {/* <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''> Asignaciones</Link>
                    <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''> Vacaciones</Link>
                    <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''> Permisos</Link>
                    <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''> Ausentismos</Link> */}
                </nav>
            </div>

            <a 
                aria-controls="collapseMyRequest" 
                aria-expanded={localStorage.getItem('item') === 'my_request' ? 'true' : 'false'}
                className={localStorage.getItem('item') === 'my_request' ? 'nav-link' : 'nav-link collapsed'}
                data-bs-target="#collapseMyRequest" 
                data-bs-toggle="collapse" 
                href="#"
            >
                <div className="nav-link-icon">
                    <i className="fa-solid fa-pen-nib"></i>
                </div>
                <span className={localStorage.getItem('item') === 'my_request' ? 'color-text-1' : ''}>Mis solicitudes</span>
                <div className="sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                </div>
            </a>
            <div 
                className={localStorage.getItem('item') === 'my_request' ? 'collapse show' : 'collapse'}
                data-bs-parent="#accordionSidenav" 
                id="collapseMyRequest"
            >
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                <Link className={localStorage.getItem('sub-item') === 'request_vacations' ? `active nav-link` : 'nav-link'} to='solicitud-vacaciones/'>Solicitar vacaciones</Link>
                {/*<Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>En proceso</Link>
                <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>Historial</Link> */}
                </nav>
            </div>



            <a 
                aria-controls="collapseDocuments" 
                aria-expanded={localStorage.getItem('item') === 'collaborators' ? 'true' : 'false'}
                className={localStorage.getItem('item') === 'collaborators' ? 'nav-link' : 'nav-link collapsed'}
                data-bs-target="#collapseDocuments" 
                data-bs-toggle="collapse" 
                href="#"
            >
                <div className="nav-link-icon">
                    <i className="fa-regular fa-folder"></i>
                </div>
                <span className={localStorage.getItem('item') === 'collaborators' ? 'color-text-1' : ''}>Documentos</span>
                <div className="sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                </div>
            </a>
            <div 
                className={localStorage.getItem('item') === 'collaborators' ? 'collapse show' : 'collapse'}
                data-bs-parent="#accordionSidenav" 
                id="collapseDocuments"
            >
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>Contratos</Link>
                <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>Remuneraciones</Link>
                <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>Documentos por revisar</Link>  
                <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>Mi certificado de antiguedad</Link>  
                </nav>
            </div>

            

        </>
    )
}
