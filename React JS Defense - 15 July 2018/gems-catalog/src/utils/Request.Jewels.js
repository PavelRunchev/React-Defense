const AppKey = 'kid_BkztNzfX7';
const AppSecrets = 'a4437d8a4bfe4ae590d179cdfcf1151a';
const HostUrl = 'https://baas.kinvey.com';

let RequestJewels = {
    createJewel: (newJewel) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/jewelry`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newJewel)
        }).then(res => {
            return res.json();
        });
    },

    allJewels: () => {
        return fetch(`${HostUrl}/appdata/${AppKey}/jewelry?query={}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    getJewelById: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/jewelry/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    editJewel: (id, jewel) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/jewelry/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jewel)
        }).then(res => {
            return res.json();
        });
    },

    removeJewel: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/jewelry/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    // get jewel with type (for upgrade)
    getJewelForUpgrade: (curType) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/jewelry?query={"type":"${curType}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },
};

export default RequestJewels;