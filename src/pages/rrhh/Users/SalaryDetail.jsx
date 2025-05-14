import React from 'react'
import { VerticalTabs } from '../../../components/tabs/VerticalTabs';
import { ViewSalaryDetail } from './ViewSalaryDetail';

export const SalaryDetail = () => {
    const tabs = [
        { label: 'Detalle Sueldo', content: <ViewSalaryDetail /> },
    ];
    return (
        <>
            <VerticalTabs tabs={tabs}/>
        </>
    )
}
