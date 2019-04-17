const AppKey = 'kid_BkztNzfX7';
const HostUrl = 'https://baas.kinvey.com';

let RequestComments = {
    createComment: (newComment) => {
        return fetch(`${HostUrl}/appdata/${AppKey}/comments`, {
            method: 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('authtoken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        }).then(res => {
            return res.json();
        });
    },

    allCommentsToCurrentJewel: (jewelId) => {
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
    },
};

export default RequestComments;