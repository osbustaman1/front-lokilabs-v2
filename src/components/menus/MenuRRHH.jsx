import React from 'react';
import { Link } from "react-router-dom";

export const MenuRRHH = () => {
    return (
        <>
            <div className="sidenav-menu-heading">
                Configuración
            </div>

            <a 
                aria-controls="collapseEmpresas" 
                aria-expanded={localStorage.getItem('item') === 'ver_empresas' ? 'true' : 'false'}
                className={localStorage.getItem('item') === 'ver_empresas' ? 'nav-link' : 'nav-link collapsed'}
                data-bs-target="#collapseEmpresas" 
                data-bs-toggle="collapse" 
                href="#"
            >
                <div className="nav-link-icon">
                    <i className="fa-solid fa-industry"></i>
                </div>
                <span className={localStorage.getItem('item') === 'ver_empresas' ? 'color-text-1' : ''}>Empresa</span>
                <div className="sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                </div>
            </a>
            <div 
                className={localStorage.getItem('item') === 'ver_empresas' ? 'collapse show' : 'collapse'}
                data-bs-parent="#accordionSidenav" 
                id="collapseEmpresas"
            >
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                    <Link className={localStorage.getItem('sub-item') === 'lista_empresas' ? `active nav-link` : 'nav-link'} to='lista-empresas'> Ver Empresas</Link>
                    <Link className={localStorage.getItem('sub-item') === 'agregar_empresa' ? `active nav-link` : 'nav-link'} to='agregar-empresa'> Crear Empresa</Link>
                    <Link className={localStorage.getItem('sub-item') === 'areas' ? `active nav-link` : 'nav-link'} to='lista-areas'> Áreas</Link>
                    <Link className={localStorage.getItem('sub-item') === 'contracts' ? `active nav-link` : 'nav-link'} to='lista-contratos'> Ver Contratos</Link>
                    <Link className='nav-link' to='#'> Carga Masiva</Link>
                </nav>
            </div>

            <a 
                aria-controls="collapseEmpleados" 
                aria-expanded={localStorage.getItem('item') === 'employees' ? 'true' : 'false'}
                className={localStorage.getItem('item') === 'employees' ? 'nav-link' : 'nav-link collapsed'}
                data-bs-target="#collapseEmpleados" 
                data-bs-toggle="collapse" 
                href="#"
            >
                <div className="nav-link-icon">
                    <i className="fa-solid fa-users"></i>
                </div>
                <span className={localStorage.getItem('item') === 'employees' ? 'color-text-1' : ''}>Empleados</span>
                <div className="sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                </div>
            </a>
            <div 
                className={localStorage.getItem('item') === 'employees' ? 'collapse show' : 'collapse'}
                data-bs-parent="#accordionSidenav" 
                id="collapseEmpleados"
            >
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                    <Link className={localStorage.getItem('sub-item') === 'list_employees' ? `active nav-link` : 'nav-link'} to='listado-colaboradores'>Ver colaboradores</Link>
                    <Link className={localStorage.getItem('sub-item') === 'agregar_colaborador' ? `active nav-link` : 'nav-link'} to='agregar-colaborador'>Crear colaborador</Link>                   
                </nav>
            </div>

            <a 
                aria-controls="collapseConfiguracion" 
                aria-expanded={localStorage.getItem('item') === 'configuration' ? 'true' : 'false'}
                className={localStorage.getItem('item') === 'configuration' ? 'nav-link' : 'nav-link collapsed'}
                data-bs-target="#collapseConfiguracion" 
                data-bs-toggle="collapse" 
                href="#"
            >
                <div className="nav-link-icon">
                    <i className="fa-solid fa-gears"></i>
                </div>
                <span className={localStorage.getItem('item') === 'configuration' ? 'color-text-1' : ''}>Configuración</span>
                <div className="sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                </div>
            </a>
            <div 
                className={localStorage.getItem('item') === 'configuration' ? 'collapse show' : 'collapse'}
                data-bs-parent="#accordionSidenav" 
                id="collapseConfiguracion"
            >
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                    {/* <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>Datos AFPs</Link>
                    <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>Datos de salud</Link>   
                    <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>Cajas compensación</Link>
                    <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>Bancos</Link>
                    <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>Mutuales</Link>
                    <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>Apv</Link>
                    <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>Aseguradoras</Link>
                    <Link className={localStorage.getItem('sub-item') === '' ? `active nav-link` : 'nav-link'} to=''>Indicadores previsionales</Link> */}
                    <Link className={localStorage.getItem('sub-item') === 'salary_concept' ? `active nav-link` : 'nav-link'} to='salary-concept'>Concepto remuneraciones</Link>                   
                </nav>
            </div>
        </>
    )
}
