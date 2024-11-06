// login logout show hide
const loginLogoutShowHide = () => {
    if (localStorage.userData === undefined) {
        const loginButtonShow = document.getElementById('loginButtonShow');
        loginButtonShow.style.display = 'flex';
    }
    else {
        const logoutButtonShow = document.getElementById('logoutButtonShow');
        logoutButtonShow.style.display = 'flex';
    }
}

(function () {
    "use strict";
    loginLogoutShowHide()
})();

const logout = () => {
    localStorage.clear();
    window.open('index.html', '_self');
}