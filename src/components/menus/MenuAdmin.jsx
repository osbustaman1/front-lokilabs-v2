import './style_menu.css';
import { MenuRRHH } from './MenuRRHH';

import { MenuCollaborators } from './MenuCollaborators';
import { MenuLeadership } from './MenuLeadership';

export const MenuAdmin = () => {
    const userType = parseInt(localStorage.getItem('uc_type_user'), 10);

    return (
        <>
            {(userType === 1 || userType === 3) && (
                <>
                    <MenuRRHH />
                    <MenuLeadership />
                    <MenuCollaborators />
                </>
            )}
            {userType === 2 && (
                <>
                    <MenuRRHH />
                    <MenuCollaborators />
                </>
            )}
            {userType === 4 && (
                <>
                    <MenuLeadership />
                    <MenuCollaborators />
                </>
            )}
            {userType === 5 && <MenuCollaborators />}
        </>
    );
};
