const AppKey = 'kid_BkztNzfX7';
const HostUrl = 'https://baas.kinvey.com';

let RequestGems = {
    createGem: (newGem) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/gems`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGem)
        }).then(res => {
            return res.json();
        });
    },

    allGems: () => {
        return fetch(`${HostUrl}/appdata/${AppKey}/gems?query={}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    searchGems: (name) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/gems?query={"name":"${name}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    getGemById: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/gems/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    deleteGem: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/gems/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    editGem: (id, gem) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/gems/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gem)
        }).then(res => {
            return res.json();
        });
    },
};

export default RequestGems;