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

    allUsers: () => {
        return fetch(`${HostUrl}/user/${AppKey}/`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    getUserById: (id) => {
        return fetch(`${HostUrl}/user/${AppKey}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        });
    },

    editUser: (id, user) => {
        return fetch(`${HostUrl}/user/${AppKey}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    },

    infoForMe: () => {
        return fetch(`${HostUrl}/user/${AppKey}/_me`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        });
    },

    disableUser: (id) => {
        return fetch(`${HostUrl}/user/${AppKey}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        });
    },

    removeUser: (id) => {
        return fetch(`${HostUrl}/user/${AppKey}/${id}?hard=true`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        });
    },

    restoreUser: (id) => {
        return fetch(`${HostUrl}/user/${AppKey}/${id}/_restore`, {
            method: 'POST',
            header: {
                Authorization: '978d5f30e4b140e79ff46b5ce9cea09b',
                'Content-Type': 'application/json'
            },
        }).then(res => {
            return res.json();
        });
    },

    lockdownUser: (user) => {
        return fetch(`${HostUrl}/rpc/kid_BkztNzfX7/lockdown-user`, {
            method: 'POST',
            header: {
                Authorization: 'Basic 9f55457387ed44f383636d1be6fca65b',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            return res.json();
        });
    }
};

export default RequestUser;