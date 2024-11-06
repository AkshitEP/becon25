// var baseUrl="http://localhost:3000/";
var baseUrl = "https://becon-backend.edciitd.com/";

// login form
var loginForm = document.getElementById("loginForm");
var loginLoader = document.getElementById("loginLoader");
var loginButton = document.getElementById("loginButton");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var emailInput = document.getElementById("loginEmail");
  var passwordInput = document.getElementById("loginPassword");

  // Remove white spaces from start and end.
  var email = emailInput.value.trim();
  var password = passwordInput.value.trim();

  // Basic email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password validation (at least 6 characters and at most 20 characters)
  var passwordRegex = /^.{6,20}$/;
  if (email === "") {
    alert("Email can not be blank");
  } else if (!emailRegex.test(email)) {
    alert("Invalid email format");
  } else if (!passwordRegex.test(password)) {
    alert("Invalid password format");
  } else {
    loginButton.disable = true;
    loginLoader.style.visibility = "visible";
    var formData = {
      email: email,
      password: password
    };
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    };
    var url = "".concat(baseUrl, "api/login");
    try {
      fetch(url, requestOptions).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 200) {
          localStorage.setItem('userData', JSON.stringify(data.userDetails));
          emailInput.value = "";
          passwordInput.value = "";
          loginLoader.style.visibility = "hidden";
          alert("Login successful");
          window.open("index.html", "_self");
          loginButton.disable = false;
        } else {
          loginLoader.style.visibility = "hidden";
          alert(data.message);
          loginButton.disable = false;
        }
      });
    } catch (error) {
      loginLoader.style.visibility = "hidden";
      console.log("Error:" + error);
      alert("Some error occured");
      loginButton.disable = false;
    }
  }
});