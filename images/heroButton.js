// login logout show hide
var heroButtonShowHide = function heroButtonShowHide() {
  if (localStorage.userData === undefined) {
    var heroButtonLogin = document.getElementById('heroButtonLogin');
    heroButtonLogin.style.display = 'flex';
  } else {
    var heroButtonExperience = document.getElementById('heroButtonExperience');
    heroButtonExperience.style.display = 'flex';
  }
};
(function () {
  "use strict";

  heroButtonShowHide();
})();