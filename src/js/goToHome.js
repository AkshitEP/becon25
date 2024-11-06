const ifLoginGoToHome = () => {
    if (localStorage.userData !== undefined) {
        window.open('index.html', '_self');
    }
}

(function () {
    "use strict";
    ifLoginGoToHome()
})();