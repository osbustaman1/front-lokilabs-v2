import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { Link } from "react-router-dom";

interface HeaderProps {
    token: string;
    apiUrl: string;
}

const Header: React.FC<HeaderProps> = ({ token, apiUrl }) => {
    useEffect(() => {
        // Inicializar el comportamiento del menú utilizando la librería KTMenu
        if (window.KTMenu) {
            window.KTMenu.createInstances();
        }
    }, []);

    return (
        <div 
            id="kt_app_header" 
            className="app-header" 
            data-kt-sticky="true" 
            data-kt-sticky-activate="{default: true, lg: true}" 
            data-kt-sticky-name="app-header-minimize" 
            data-kt-sticky-offset="{default: '200px', lg: '0'}" 
            data-kt-sticky-animation="false">

            <div 
                className="app-container container-fluid d-flex align-items-stretch justify-content-between" 
                id="kt_app_header_container">

                <div className="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2" title="Show sidebar menu">
                    <div className="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_sidebar_mobile_toggle">
                        <i className="ki-duotone ki-abstract-14 fs-2 fs-md-1">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>
                    </div>
                </div>

                <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                    <Link to="/index" className="d-lg-none">
                        <img alt="Logo" src="assets/media/logos/default-small.svg" className="h-30px" />
                    </Link>
                </div>

                <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1" id="kt_app_header_wrapper">
                    <div 
                        className="app-header-menu app-header-mobile-drawer align-items-stretch" 
                        data-kt-drawer="true" 
                        data-kt-drawer-name="app-header-menu" 
                        data-kt-drawer-activate="{default: true, lg: false}" 
                        data-kt-drawer-overlay="true" 
                        data-kt-drawer-width="250px" 
                        data-kt-drawer-direction="end" 
                        data-kt-drawer-toggle="#kt_app_header_menu_toggle" 
                        data-kt-swapper="true" 
                        data-kt-swapper-mode="{default: 'append', lg: 'prepend'}" 
                        data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"></div>

                    <div className="app-navbar flex-shrink-0">
                        <div className="app-navbar-item align-items-stretch ms-1 ms-md-4"></div>
                        
                        <div className="app-navbar-item ms-1 ms-md-4">
                            <div className="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px position-relative" id="kt_drawer_chat_toggle">
                                <i className="ki-duotone ki-message-text-2 fs-2">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                    <span className="path3"></span>
                                </i>
                                <span className="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
                            </div>
                        </div>

                        <div className="app-navbar-item ms-1 ms-md-4" id="kt_header_user_menu_toggle">
                            <div className="cursor-pointer symbol symbol-35px" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                                <img src="https://xsgames.co/randomusers/avatar.php?g=pixel" className="rounded-3" alt="usuario" />
                            </div>

                            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px" data-kt-menu="true">
                                <div className="menu-item px-3">
                                    <div className="menu-content d-flex align-items-center px-3">
                                        <div className="symbol symbol-50px me-5">
                                            <img alt="Logo" src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                        </div>
                                        <div className="d-flex flex-column">
                                            <div className="fw-bold d-flex align-items-center fs-5">Robert Fox 
                                            <span className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">Pro</span></div>
                                            <Link to="" className="fw-semibold text-muted text-hover-primary fs-7">robert@kt.com</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="separator my-2"></div>

                                <div className="menu-item px-5">
                                    <Link to="" className="menu-link px-5">My Profile</Link>
                                </div>

                                <div className="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0">
                                    <Link to="" className="menu-link px-5">
                                        <span className="menu-title">My Subscription</span>
                                        <span className="menu-arrow"></span>
                                    </Link>
                                    <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                        <div className="menu-item px-3">
                                            <Link to="" className="menu-link px-5">Referrals</Link>
                                        </div>

                                        <div className="menu-item px-3">
                                            <Link to="" className="menu-link px-5">Billing</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="separator my-2"></div>

                                <div className="menu-item px-5">
                                    <Link to="" className="menu-link px-5">Sign Out</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    );
}

export { Header };