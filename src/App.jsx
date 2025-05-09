import React from 'react';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';

function App() {
    return (
        <>
            <div 
                id="kt_app_body" 
                data-kt-app-layout="dark-sidebar" 
                data-kt-app-header-fixed="true" 
                data-kt-app-sidebar-enabled="true" 
                data-kt-app-sidebar-fixed="true" 
                data-kt-app-sidebar-hoverable="true" 
                data-kt-app-sidebar-push-header="true" 
                data-kt-app-sidebar-push-toolbar="true" 
                data-kt-app-sidebar-push-footer="true" 
                data-kt-app-toolbar-enabled="true" 
                className="app-default">
                <div className="d-flex flex-column flex-root app-root" id="kt_app_root">

                    <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                        {/*Aqui van los menus, el Sidebar y el Header*/}
                        <Header token={''} apiUrl={''}/>
                        <Sidebar token={''} apiUrl={''}/>
                    </div>
                </div>

            </div>
        </>
    )
}

export default App
