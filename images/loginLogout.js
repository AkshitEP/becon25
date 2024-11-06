// login logout show hide
var loginLogoutShowHide = function loginLogoutShowHide() {
  if (localStorage.userData === undefined) {
    var loginButtonShow = document.getElementById('loginButtonShow');
    loginButtonShow.style.display = 'flex';
  } else {
    var logoutButtonShow = document.getElementById('logoutButtonShow');
    logoutButtonShow.style.display = 'flex';
  }
};
(function () {
  "use strict";

  loginLogoutShowHide();
})();
var logout = function logout() {
  localStorage.clear();
  window.open('index.html', '_self');
};