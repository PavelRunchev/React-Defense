

let auth = {
    moderatorId: '64a8a79f-68bb-4560-8ac3-5d5cf2bf9686',
    adminId: 'f6daf57b-93af-4af1-8a5c-30a0f3508f9d',
    roleId: '',
    authtoken: '',

    isAdmin() { 
        if(localStorage.getItem('isAdmin') !== null && this.adminId && this.roleId) { return true; }      
        else if (localStorage.getItem('isAdmin') !== null) { return true; }
        return false;
    },

    isLogged() {
        return localStorage.getItem('authtoken') !== null ? true : false;
    },

    isModerator() {
        if(localStorage.getItem('isModerator') !== null && this.moderatorId === this.roleId) { return true; }
        if(localStorage.getItem('isModerator') !== null) { return true; }
        return false;
    }
};

export default auth;