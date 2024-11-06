function routerRedirect(locationUrl) {
  var urlParams = new URLSearchParams(window.location.search);
  var param1Value = urlParams.get('source');
  if (locationUrl.slice(0, 11) === 'index.html#') {
    if (param1Value !== null) {
      window.location.href = "index.html?source=".concat(param1Value).concat(locationUrl.slice(10));
    } else {
      window.location.href = locationUrl;
    }
  } else {
    if (param1Value !== null) {
      window.location.href = "".concat(locationUrl, "?source=").concat(param1Value);
    } else {
      window.location.href = "".concat(locationUrl);
    }
  }
}