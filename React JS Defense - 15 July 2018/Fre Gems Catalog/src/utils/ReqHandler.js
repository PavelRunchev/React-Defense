const AppKey = 'kid_BkztNzfX7';
const AppSecrets = 'a4437d8a4bfe4ae590d179cdfcf1151a';
const HostUrl = 'https://baas.kinvey.com';

let ReqHandler = {
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

    detailsGem: (id) => {
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

    deleteMyGems: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myGemsStore/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

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

    myGems: (user) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myGemsStore?query={"owner":"${user}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    myDetailsGem: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myGemsStore/${id}`, {
            method: 'GET',
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

    myJewels: (user) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myJewelryStore?query={"owner":"${user}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    detailsMyJewel: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myJewelryStore/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    editJewel: (id, jewel) => {
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

    deleteMyJewel: (id) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myJewelryStore/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    getJewelCurrentType: (curType) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/jewelry?query={"type":"${curType}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    upgradeGemsToJewel: (jewel) => {
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

    allUpgradeJewels: () => {
        return fetch(`${HostUrl}/appdata/${AppKey}/myJewelryStore`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },


    createReview: (newReview) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/comments`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReview)
        }).then(res => {
            return res.json();
        });
    },

    allReviews: (jewelId) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/comments?query={"jewelId":"${jewelId}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    },

    deleteComment: (commentId) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
            }
        }).then(res => {
            return res.json();
        });
    }
};

export default ReqHandler;