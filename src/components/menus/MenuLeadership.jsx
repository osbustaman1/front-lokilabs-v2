import React from 'react';
import { Link } from "react-router-dom";

export const MenuLeadership = () => {
    return (
        <>
            <div className="sidenav-menu-heading">
                Departamento
            </div>

            <a 
                aria-controls="collapseleadership" 
                aria-expanded={localStorage.getItem('item') === 'leadership' ? 'true' : 'false'}
                className={localStorage.getItem('item') === 'leadership' ? 'nav-link' : 'nav-link collapsed'}
                data-bs-target="#collapseleadership" 
                data-bs-toggle="collapse" 
                href="#"
            >
                <div className="nav-link-icon">
                    <i className="fa-solid fa-handshake"></i>
                </div>
                <span className={localStorage.getItem('item') === 'leadership' ? 'color-text-1' : ''}>Jefatura</span>
                <div className="sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                </div>
            </a>
            <div 
                className={localStorage.getItem('item') === 'leadership' ? 'collapse show' : 'collapse'}
                data-bs-parent="#accordionSidenav" 
                id="collapseleadership"
            >
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                    <Link className={localStorage.getItem('sub-item') === 'my_apartament' ? `active nav-link` : 'nav-link'} to='mi-equipo/'> Ver área</Link>
                    <Link className={localStorage.getItem('sub-item') === 'team_requests' ? `active nav-link` : 'nav-link'} to='solicitudes-equipo/'> Solicitudes</Link>
                </nav>
            </div>

        </>
    )
}
