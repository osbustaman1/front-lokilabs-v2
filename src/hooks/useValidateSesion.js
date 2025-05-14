export const useValidateSesion = () => {
    const token = localStorage.getItem('token');

    const isToken = () => {
        if (token) {
            return true;
        } else {
            return false;
        }
    }

    return {
        isToken
    };
}
