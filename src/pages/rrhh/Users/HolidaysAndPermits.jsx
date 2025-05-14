import React from 'react'
import { VerticalTabs } from '../../../components/tabs/VerticalTabs';
import { Vacation } from './HolidaysAndPermits/Vacation';
import { WorkPermit } from './HolidaysAndPermits/WorkPermit';

export const HolidaysAndPermits = () => {
    const tabs = [
        { label: 'Vacaciones', content: <Vacation /> },
        { label: 'Permisos', content: <WorkPermit /> },
    ];
    return (
        <>
            <VerticalTabs tabs={tabs}/>
        </>
    )
}
