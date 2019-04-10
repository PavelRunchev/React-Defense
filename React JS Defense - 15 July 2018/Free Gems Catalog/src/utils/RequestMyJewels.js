const AppKey = 'kid_BkztNzfX7';
const AppSecrets = 'a4437d8a4bfe4ae590d179cdfcf1151a';
const HostUrl = 'https://baas.kinvey.com';

let RequestMyJewels = {
    createMyJewel: (jewel) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myJewelryStore`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jewel)
        }).then(res => {
            return res.json();
        });
    },

    allMyJewels: (user) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myJewelryStore?query={"owner":"${user}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    getMyJewelById: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myJewelryStore/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    // delete my jewel from private room
    removeMyJewel: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myJewelryStore/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },
};

export default RequestMyJewels;