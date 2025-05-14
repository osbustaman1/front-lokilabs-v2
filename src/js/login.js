import { url_customer } from "./url";

export const login = async ({ username, password }) => {

    const host_url = url_customer();

    const url = `${host_url}/login`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "username": username,
        "password": password
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(url, requestOptions);

        const { status, ok } = response;

        if (status === 200 && ok) {
            const data = await response.json();
            localStorage.setItem('user', data.user);
            localStorage.setItem('token', data.token);
            
            return {
                error: false,
                status: ok
            };
        } else {
            const data = await response.json();
            return {
                error: data.error,
                status: ok
            };
        }
    } catch (error) {
        return {
            error,
            status: false
        };
    }
}
