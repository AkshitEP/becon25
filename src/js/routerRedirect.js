function routerRedirect(locationUrl) {
    const urlParams = new URLSearchParams(window.location.search);
    const param1Value = urlParams.get('source');
    if (locationUrl.slice(0, 11) === 'index.html#') {
        if (param1Value !== null) {
            window.location.href = `index.html?source=${param1Value}${locationUrl.slice(10)}`;
        }
        else {
            window.location.href = locationUrl;
        }
    }
    else {
        if (param1Value !== null) {
            window.location.href = `${locationUrl}?source=${param1Value}`;
        }
        else {
            window.location.href = `${locationUrl}`;
        }
    }
}
