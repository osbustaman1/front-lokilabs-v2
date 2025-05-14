import React from 'react';
import { VerticalTabs } from '../../../components/tabs/VerticalTabs';
import { ViewSalaryDetail } from './ViewSalaryDetail';
import { UserCompany } from './UserCompany';
import { ContractData } from './ContractData';
import { Settlement } from './Settlement';


export const EmploymentData = () => {

    const tabs = [
        { label: 'Usuario Empresa', content: <UserCompany /> },
        { label: 'Datos Contrato', content: <ContractData /> },
        { label: 'Finiquito', content: <Settlement /> },
    ];
    return (
        <>
            <VerticalTabs tabs={tabs}/>
        </>
    )
}