import React, { useEffect, useState } from 'react';
import { VerticalTabs } from '../../../components/tabs/VerticalTabs';
import { GeneralInformation } from './GeneralInformation';
import { HomeAddress } from './HomeAddress';
import { StudiesUsers } from './StudiesUsers';
import { ContactCollaborator } from './ContactCollaborator ';


export const PersonalData = () => {
    const tabs = [
        { label: 'Información General', content: <GeneralInformation /> },
        { label: 'Dirección Particular', content: <HomeAddress /> },
        { label: 'Datos de contacto', content: <ContactCollaborator /> },
        { label: 'Formación Educacional', content: <StudiesUsers /> },
    ];
    return (
        <>
            <VerticalTabs tabs={tabs}/>
        </>
    )
};