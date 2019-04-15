const AppKey = 'kid_BkztNzfX7';
const HostUrl = 'https://baas.kinvey.com';

let RequestMyGems = {
    // take Gem to My room
    takeGem: (gem) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myGemsStore`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gem)
        }).then(res => {
            return res.json();
        });
    },

    allMyGems: (user) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myGemsStore?query={"owner":"${user}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    getMyGemById: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myGemsStore/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    // delete my gem from private room
    removeMyGem: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myGemsStore/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },
};

export default RequestMyGems;