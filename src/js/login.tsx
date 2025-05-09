import { url_customer } from './url.js';

interface imputsLogin {
    username: string;
    password: string;
}

const login = async (data: imputsLogin): Promise<any> => {
    const url = `${url_customer()}/api/login/`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.status !== 200) {
        throw new Error(responseData.detail);
    }
    responseData.status = response.status;
    return await responseData;
};

export { login };

