import React, { createContext, useState } from 'react';

export const BreadCrumbContext = createContext();

export const BreadCrumbProvider = ({ children }) => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const updateBreadcrumbs = (newBreadcrumbs) => {
        setBreadcrumbs(newBreadcrumbs);
    };

    return (
        <BreadCrumbContext.Provider value={{ breadcrumbs, updateBreadcrumbs }}>
            {children}
        </BreadCrumbContext.Provider>
    );
};
