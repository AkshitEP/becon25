// var baseUrl="http://localhost:3000/";
var baseUrl = "https://becon-backend.edciitd.com/";

// forgot password form
const forgotPassForm = document.getElementById("forgotPassForm");
const forgotPassLoader = document.getElementById("forgotPassLoader");
const forgotPassButton = document.getElementById("forgotPassButton");

forgotPassForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const emailInput = document.getElementById("forgotPassEmail");
  const email = emailInput.value.trim();

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    alert("Email can not be blank");
  } else if (!emailRegex.test(email)) {
    alert("Invalid email format");
  } else {
    forgotPassButton.disable=true;
    forgotPassLoader.style.visibility = "visible";
    const formData = {
      email: email,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const url = `${baseUrl}api/login/forgotPassword`;
    try {
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            emailInput.value = "";
            forgotPassLoader.style.visibility = "hidden";
            alert(data.message);
            window.open("login.html", "_self");
            forgotPassButton.disable=false;
          } else {
            forgotPassLoader.style.visibility = "hidden";
            alert(data.message);
            forgotPassButton.disable=false;
          }
        });
    } catch (error) {
      forgotPassLoader.style.visibility = "hidden";
      console.log("Error:" + error);
      alert("Some error occured");
      forgotPassButton.disable=false;
    }
  }
});
