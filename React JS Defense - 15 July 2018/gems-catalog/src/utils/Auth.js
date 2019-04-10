let auth = {

    isAdmin() { 
        return localStorage.getItem('isAdmin') !== null ? true : false;
    },

    isLogged() {
        return localStorage.getItem('authtoken') !== null ? true : false;
    }
};

export default auth;