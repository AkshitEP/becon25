// var baseUrl="http://localhost:3000/";
var baseUrl = "https://becon-backend.edciitd.com/";

// forgot password form
var forgotPassForm = document.getElementById("forgotPassForm");
var forgotPassLoader = document.getElementById("forgotPassLoader");
var forgotPassButton = document.getElementById("forgotPassButton");
forgotPassForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var emailInput = document.getElementById("forgotPassEmail");
  var email = emailInput.value.trim();

  // Basic email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    alert("Email can not be blank");
  } else if (!emailRegex.test(email)) {
    alert("Invalid email format");
  } else {
    forgotPassButton.disable = true;
    forgotPassLoader.style.visibility = "visible";
    var formData = {
      email: email
    };
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    };
    var url = "".concat(baseUrl, "api/login/forgotPassword");
    try {
      fetch(url, requestOptions).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 200) {
          emailInput.value = "";
          forgotPassLoader.style.visibility = "hidden";
          alert(data.message);
          window.open("login.html", "_self");
          forgotPassButton.disable = false;
        } else {
          forgotPassLoader.style.visibility = "hidden";
          alert(data.message);
          forgotPassButton.disable = false;
        }
      });
    } catch (error) {
      forgotPassLoader.style.visibility = "hidden";
      console.log("Error:" + error);
      alert("Some error occured");
      forgotPassButton.disable = false;
    }
  }
});