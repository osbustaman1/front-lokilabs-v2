import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { Link } from "react-router-dom";
import { useSidebarMenu } from '../../hooks/sidebarMenu';

interface SidebarProps {
    token: string;
    apiUrl: string;
}

const Sidebar: React.FC<SidebarProps> = ({ token, apiUrl }) => {

    useEffect(() => {
        // Inicializar el comportamiento del menú utilizando la librería KTMenu
        if (window.KTMenu) {
            window.KTMenu.createInstances();
        }
    }, []);

    console.log("useSidebarMenu: ", useSidebarMenu({ user_id: { id: 1 } }));

    const menuUser = useSidebarMenu({ user_id: { id: 1 } });

    return (
        <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
            <div 
                id="kt_app_sidebar" 
                className="app-sidebar flex-column" 
                data-kt-drawer="true" 
                data-kt-drawer-name="app-sidebar" 
                data-kt-drawer-activate="{default: true, lg: false}" 
                data-kt-drawer-overlay="true" 
                data-kt-drawer-width="225px" 
                data-kt-drawer-direction="start" 
                data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle">

                <div className="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
                    <Link to="">
                        <img alt="Logo" src="assets/media/logos/default-dark.svg" className="h-25px app-sidebar-logo-default" />
                        <img alt="Logo" src="assets/media/logos/default-small.svg" className="h-20px app-sidebar-logo-minimize" />
                    </Link>
                    
                    <div id="kt_app_sidebar_toggle" className="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary h-30px w-30px position-absolute top-50 start-100 translate-middle rotate" data-kt-toggle="true" data-kt-toggle-state="active" data-kt-toggle-target="body" data-kt-toggle-name="app-sidebar-minimize">
                        <i className="ki-duotone ki-black-left-line fs-3 rotate-180">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>
                    </div>
                </div>

                <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
                    <div id="kt_app_sidebar_menu_wrapper" className="app-sidebar-wrapper">
                        <div 
                            id="kt_app_sidebar_menu_scroll" 
                            className="scroll-y my-5 mx-3" 
                            data-kt-scroll="true" 
                            data-kt-scroll-activate="true" 
                            data-kt-scroll-height="auto" 
                            data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer" 
                            data-kt-scroll-wrappers="#kt_app_sidebar_menu" 
                            data-kt-scroll-offset="5px" 
                            data-kt-scroll-save-state="true">
                        
                            <div 
                                className="menu menu-column menu-rounded menu-sub-indention fw-semibold fs-6" 
                                id="#kt_app_sidebar_menu" 
                                data-kt-menu="true" 
                                data-kt-menu-expand="false">

                                {menuUser.map((mnu, index) => (
                                    <div className="menu-item pt-5">
                                        <div className="menu-content">
                                            <span className="menu-heading fw-bold text-uppercase fs-7">{mnu.title}</span>
                                        </div>
                                    </div>
                                ))}
                                                                

                                {/* Items del menu */}
                                <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                    <span className="menu-link">
                                        <span className="menu-icon">
                                            <i className="ki-duotone ki-user fs-2">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                            </i>
                                        </span>
                                        <span className="menu-title">Authentication</span>
                                        <span className="menu-arrow"></span>
                                    </span>

                                    <div className="menu-sub menu-sub-accordion">
                                        <div data-kt-menu-trigger="click" className="menu-item menu-accordion">
                                            <span className="menu-link">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Corporate Layout</span>
                                                <span className="menu-arrow"></span>
                                            </span>
                                            <div className="menu-sub menu-sub-accordion menu-active-bg">
                                                <div className="menu-item">
                                                    <Link className="menu-link" to="">
                                                        <span className="menu-bullet">
                                                            <span className="bullet bullet-dot"></span>
                                                        </span>
                                                        <span className="menu-title">Sign-in</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="menu-item">
                                            <Link className="menu-link" to="">
                                                <span className="menu-bullet">
                                                    <span className="bullet bullet-dot"></span>
                                                </span>
                                                <span className="menu-title">Error 500</span>
                                            </Link>
                                        </div>
                                    </div>



                                    
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

                <div className="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6" id="kt_app_sidebar_footer">
                    <Link to="" className="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss-="click" title="200+ in-house components and 3rd-party plugins">
                        <span className="btn-label">Cerrar Sesión</span>
                        <i className="ki-duotone ki-document btn-icon fs-2 m-0">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export { Sidebar };