import { login } from '../js/login';

export const useLogin = (data) => {

    const getFechLogin = async () => {
        const { username, password } = data;
        const response = await login({ username, password });
        return response
    }

    return {
        getFechLogin
    }
}
