import { url_customer } from "./url";

export const method_update = async (url, data_form) => {
    
    const host_url = url_customer();
    const route_url = `${host_url}/${url}`;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem('token'));

    var raw = JSON.stringify(data_form);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    try {
        const response = await fetch(route_url, requestOptions);
        const { status, ok } = response;
        const data = await response.json();
        if (status === 200 && ok) {
            return {
                error: false,
                status: data
            };
        }else{
            return {
                error: true,
                status: data
            };
        }
        
    } catch (error) {
        return {
            error: true,
            status: error
        };
    }
}


export const method_post = async (url, data_form) => {

    const host_url = url_customer();
    const route_url = `${host_url}/${url}`;
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem('token'));

    var raw = JSON.stringify(data_form);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(route_url, requestOptions);
        const { status, ok } = response;
        const data = await response.json();
        if (status === 201 && ok) {
            return {
                error: false,
                status: data
            };
        }else{
            return {
                error: true,
                status: data
            };
        }
        
    } catch (error) {
        return {
            error: true,
            status: error
        };
    }
}


export const method_get = async (url) => {

    const host_url = url_customer();
    const route_url = `${host_url}/${url}`;
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem('token'));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(route_url, requestOptions);
        const { status, ok } = response;
        const data = await response.json();
        if (status === 200 && ok) {
            return {
                error: false,
                status: data
            };
        }else if (status === 201 && ok) {
            return {
                error: false,
                status: data
            };
        }else{
            return {
                error: true,
                status: data
            };
        }
        
    } catch (error) {
        return {
            error: true,
            status: error
        };
    }
}
