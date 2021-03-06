const AppKey = 'kid_BkztNzfX7';
const AppSecrets = 'a4437d8a4bfe4ae590d179cdfcf1151a';
const HostUrl = 'https://baas.kinvey.com';

let PublicJewels = {
    allPublicJewels: () => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myJewelryStore`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    detailsPublicJewel: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myJewelryStore/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    editPublicJewel: (id, jewel) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myJewelryStore/${id}`, {
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

    deletePublicJewel: (id) => {
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

export default PublicJewels;