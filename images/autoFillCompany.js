// Auto fill company
var autoFillCompany = function autoFillCompany() {
  var urlParams = new URLSearchParams(window.location.search);
  var param1Value = urlParams.get('source');
  if (param1Value !== null) {
    var companyInput = document.getElementById('registerCompany');
    companyInput.value = param1Value;
    companyInput.disabled = true;
  }
};
(function () {
  "use strict";

  autoFillCompany();
})();