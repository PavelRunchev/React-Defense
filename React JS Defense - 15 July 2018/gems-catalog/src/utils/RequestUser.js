const AppKey = 'kid_BkztNzfX7';
const AppSecrets = 'a4437d8a4bfe4ae590d179cdfcf1151a';
const HostUrl = 'https://baas.kinvey.com';

let RequestUser = {
    login: (user) => {
        return fetch(`${HostUrl}/user/${AppKey}/login`, {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + btoa(`${AppKey}:${AppSecrets}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            return res.json();
        });
    },

    register: (user) => {
        return fetch(`${HostUrl}/user/${AppKey}`, {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + btoa(`${AppKey}:${AppSecrets}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            return res.json();
        });
    },

    logout: () => {
        return fetch(`${HostUrl}/user/${AppKey}/_logout`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        });
    },
};

export default RequestUser;