// var baseUrl = "http://localhost:3000/";
var baseUrl = "https://becon-backend.edciitd.com/";

// Register form
var registerForm = document.getElementById('registerForm');
var registerLoader = document.getElementById('registerLoader');
var registerButton = document.getElementById('registerButton');
registerForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var nameInput = document.getElementById('registerName');
  var emailInput = document.getElementById('registerEmail');
  var phoneInput = document.getElementById('registerPhone');
  var linkedInInput = document.getElementById('registerLinkedin');
  var passwordInput = document.getElementById('registerPassword');
  var confirmPasswordInput = document.getElementById('registerConfirmPassword');
  var userTypeInput = document.getElementById('registerUserType');
  var companyInput = document.getElementById('registerCompany');
  var vcOrganizationInput = document.getElementById('registerVCOrganization');
  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  var phone = phoneInput.value.trim();
  var linkedIn = linkedInInput.value.trim();
  var password = passwordInput.value.trim();
  var confirmPassword = confirmPasswordInput.value.trim();
  var userType = userTypeInput.value.trim();
  var company = companyInput.value.trim();
  var vcOrganization = vcOrganizationInput.value.trim();

  // Basic email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Phone number validation (basic pattern for demonstration)
  var phoneRegex = /^[0-9]{10}$/;

  // LinkedIn profile validation (basic pattern for demonstration)
  var linkedinRegex = /^(https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?)?$/;

  // Password validation (at least 6 characters and at most 20 characters)
  var passwordRegex = /^.{6,20}$/;
  if (email === '') {
    alert("Email can not be blank");
  } else if (!emailRegex.test(email)) {
    alert("Invalid email format");
  } else if (!phoneRegex.test(phone)) {
    alert("Invalid phone format");
  } else if (linkedIn !== '' && !linkedinRegex.test(linkedIn)) {
    alert("Invalid linkedIn format. Correct format: https://www.linkedin.com/in/xyz");
  } else if (!passwordRegex.test(password)) {
    alert("Invalid password format");
  } else if (password !== confirmPassword) {
    alert("Password and Confirm Password does not match");
  } else {
    registerButton.disable = true;
    registerLoader.style.visibility = 'visible';
    var formData = {
      "name": name,
      "email": email,
      "phone": phone,
      "linkedIn": linkedIn,
      "password": password,
      "userType": userType,
      "company": company,
      "vcOrganization": vcOrganization
    };
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    };
    var url = "".concat(baseUrl, "api/registration");
    try {
      fetch(url, requestOptions).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.status === 201) {
          localStorage.setItem('userData', JSON.stringify(data.registration));
          emailInput.value = '';
          passwordInput.value = '';
          nameInput.value = '';
          phoneInput.value = '';
          linkedInInput.value = '';
          userTypeInput.value = 'Student';
          vcOrganizationInput.value = '';
          companyInput.value = '';
          registerLoader.style.visibility = 'hidden';
          alert("Registration successful. Please check your mail.");
          window.open('index.html', '_self');
          registerButton.disable = false;
        } else {
          registerLoader.style.visibility = 'hidden';
          alert(data.message);
          registerButton.disable = false;
        }
      });
    } catch (error) {
      registerLoader.style.visibility = 'hidden';
      console.log('Error:' + error);
      alert("Some error occured");
      registerButton.disable = false;
    }
  }
});