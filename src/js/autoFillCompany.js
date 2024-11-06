// Auto fill company
const autoFillCompany = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const param1Value = urlParams.get('source');
    if(param1Value!==null){
        const companyInput = document.getElementById('registerCompany');
        companyInput.value=param1Value;
        companyInput.disabled=true;
    }
}

(function () {
    "use strict";
    autoFillCompany()
})();