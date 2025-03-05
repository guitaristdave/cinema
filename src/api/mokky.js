async function register(params) {
    const options = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    };
    try {
        const response = await fetch('https://70df281730fe0425.mokky.dev/register', options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
    
}


async function login(params) {
    const options = {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    };
    try {
        const response = await fetch('https://70df281730fe0425.mokky.dev/auth', options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}


async function checkAuth(token) {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    try {
        const response = await fetch('https://70df281730fe0425.mokky.dev/auth_me', options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export { register, login, checkAuth };
