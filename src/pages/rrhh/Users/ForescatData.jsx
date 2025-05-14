import React from 'react';
import { VerticalTabs } from '../../../components/tabs/VerticalTabs';
import { Afp } from './Afp';
import { Healt } from './Healt';
import { LegalGratification } from './LegalGratification';
import { FamilyBurdens } from './FamilyBurdens';
import { HeavyWork } from './HeavyWork';
import { UserApv } from './UserApv';

export const ForescatData = () => {

    const tabs = [
        { label: 'Afp', content: <Afp /> },
        { label: 'Salud', content: <Healt /> },
        { label: 'Gratificación legal', content: <LegalGratification /> },
        { label: 'Cargas Familiares', content: <FamilyBurdens /> },
        { label: 'Apv', content: <UserApv /> },
        { label: 'Trabajo pesado', content: <HeavyWork /> }
    ];
    return (
        <>
            <VerticalTabs tabs={tabs}/>
        </>
    )
}