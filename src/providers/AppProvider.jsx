import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [buttons, setButtons] = useState([]);

    const updateBreadcrumbs = (newBreadcrumbs) => {
        setBreadcrumbs(newBreadcrumbs);
    };

    const updateTitulo = (newTitulo) => {
        setTitulo(newTitulo);
    };

    const updateButtons = (newButtons) => {
        setButtons(newButtons);
    };

    return (
        <AppContext.Provider value={{ breadcrumbs, updateBreadcrumbs, titulo, updateTitulo, buttons, updateButtons }}>
            {children}
        </AppContext.Provider>
    );
};


export const AppContexCompany = createContext();

export const AppProviderCompany = ({ children }) => {

    const [title, setTitle] = useState('');
    const updateTitle = (newTitulo) => {
        setTitle(newTitulo);
    };

    return (
        <AppContexCompany.Provider value={{ title, updateTitle }}>
            {children}
        </AppContexCompany.Provider>
    );
};


export const AppContexTitle = createContext();

export const AppProviderTitle = ({ children }) => {
    const [bigTitle, setBigTitle] = useState('');
    const updateBigTitle = (newTitulo) => {
        setBigTitle(newTitulo);
    };

    return (
        <AppContexTitle.Provider value={{ bigTitle, updateBigTitle }}>
            {children}
        </AppContexTitle.Provider>
    );
};



export const AppContexEntitie = createContext();

export const AppProviderEntitie = ({ children }) => {
    const [nameEntitie, setNameEntitie] = useState({});
    
    const updateEntitie = (newEntitie) => {
        setNameEntitie(newEntitie);
    };

    return (
        <AppContexEntitie.Provider value={{ nameEntitie, updateEntitie }}>
            {children}
        </AppContexEntitie.Provider>
    );
};



export const AppContextWriteDataIsapre = createContext();

export const AppProviderWriteDataIsapre = ({ children }) => {
    const [nameEntitie, setNameEntitie] = useState({});
    const readData = (newData) => {
        console.log('newData: ', newData);
        //setNameEntitie(newEntitie);
    };

    return (
        <AppContextWriteDataIsapre.Provider value={{ nameEntitie, readData }}>
            {children}
        </AppContextWriteDataIsapre.Provider>
    );
};

