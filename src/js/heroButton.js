// login logout show hide
const heroButtonShowHide = () => {
    if (localStorage.userData === undefined) {
        const heroButtonLogin = document.getElementById('heroButtonLogin');
        heroButtonLogin.style.display = 'flex';
    }
    else {
        const heroButtonExperience = document.getElementById('heroButtonExperience');
        heroButtonExperience.style.display = 'flex';
    }
}

(function () {
    "use strict";
    heroButtonShowHide()
})();