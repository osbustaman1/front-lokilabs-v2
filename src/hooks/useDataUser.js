import { method_get } from "../js/fech";

export const useDataUser = (id_user) => {

    const getDataUser = async () => {
        const response = await method_get(`data-user-customer/${id_user}`);
        const { user_company, employee } = response.status;
        
        localStorage.setItem('uc_type_user', user_company.uc_type_user == null ? 1 : user_company.uc_type_user);
        localStorage.setItem('perfil_image', employee.emp_perfil_image);

        try {
            if (localStorage.getItem('company') == null) {
                localStorage.setItem('company', user_company.company);
            }
        } catch (error) {
            
        }
        return response
    }

    const getDataPrevired = async () => {
        const response = await method_get(`get-data-previred`);
        return response
    }

    return {
        getDataUser, 
        getDataPrevired
    }
}
