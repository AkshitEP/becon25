// var baseUrl = "http://localhost:3000/";
var baseUrl = "https://becon-backend.edciitd.com/";

var YOUR_CLIENT_ID = '895036590591-7i3bjagns1u1bb38daenam2bdthi9942.apps.googleusercontent.com';
var YOUR_REDIRECT_URI = 'https://becon.edciitd.com/loading.html';
var fragmentString = location.hash.substring(1);

// Parse query string to see if page request is coming from OAuth 2.0 server.
var params = {};
var regex = /([^&=]+)=([^&]*)/g, m;
while (m = regex.exec(fragmentString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
if (Object.keys(params).length > 0) {
    localStorage.setItem('oauth2-test-params', JSON.stringify(params));
    if (params['state'] && params['state'] == 'becon_edc_iitd_24') {
        trySampleRequest();
    }
}

function loginToPortal(userDetails) {
    const name = userDetails.name;
    const email = userDetails.email;
    const formData = {
        name: name,
        email: email,
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    };
    const url = `${baseUrl}api/registration/googleLogin`;
    try {
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    localStorage.setItem('userData', JSON.stringify(data.userDetails));
                    alert("Login successful");
                    window.open("index.html", "_self");
                } else {
                    alert(data.message);
                }
            });
    } catch (error) {
        console.log("Error:" + error);
        alert("Some error occured");
    }
}

// If there's an access token, try an API request.
// Otherwise, start OAuth 2.0 flow.
function trySampleRequest() {
    var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
    if (params && params['access_token']) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET',
            'https://www.googleapis.com/oauth2/v2/userinfo?' +
            'access_token=' + params['access_token']);
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const userDetails=JSON.parse(xhr.response);
                    loginToPortal(userDetails);
                } else if (xhr.status === 401) {
                    // Token invalid, so prompt for user permission.
                    oauth2SignIn();
                }
            }
        };
        xhr.send(null);
    } else {
        oauth2SignIn();
    }
}

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauth2SignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create element to open OAuth 2.0 endpoint in new window.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        'client_id': YOUR_CLIENT_ID,
        'redirect_uri': YOUR_REDIRECT_URI,
        'scope': 'email profile',
        'state': 'becon_edc_iitd_24',
        'include_granted_scopes': 'true',
        'response_type': 'token'
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}