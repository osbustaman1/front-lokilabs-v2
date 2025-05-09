import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'; // Importar SweetAlert2

interfacace SidebarProps {
    token: string;
    apiUrl: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ token, apiUrl }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Sidebar</h2>
            </div>
            <div className="sidebar-content">
                <p>Token: {token}</p>
                <p>API URL: {apiUrl}</p>
            </div>
        </div>
    );
}