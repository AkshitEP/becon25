// var baseUrl = "http://localhost:3000/";
var baseUrl = "https://becon-backend.edciitd.com/";

// Register form
const registerForm = document.getElementById('registerForm');
const registerLoader = document.getElementById('registerLoader');
const registerButton = document.getElementById('registerButton');


registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nameInput = document.getElementById('registerName');
    const emailInput = document.getElementById('registerEmail');
    const phoneInput = document.getElementById('registerPhone');
    const linkedInInput = document.getElementById('registerLinkedin');
    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('registerConfirmPassword');
    const userTypeInput = document.getElementById('registerUserType');
    const companyInput = document.getElementById('registerCompany');
    const vcOrganizationInput = document.getElementById('registerVCOrganization');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const linkedIn = linkedInInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const userType = userTypeInput.value.trim();
    const company = companyInput.value.trim();
    const vcOrganization = vcOrganizationInput.value.trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Phone number validation (basic pattern for demonstration)
    const phoneRegex = /^[0-9]{10}$/;

    // LinkedIn profile validation (basic pattern for demonstration)
    const linkedinRegex = /^(https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?)?$/;

    // Password validation (at least 6 characters and at most 20 characters)
    const passwordRegex = /^.{6,20}$/;

    if (email === '') {
        alert("Email can not be blank");
    }
    else if (!emailRegex.test(email)) {
        alert("Invalid email format")
    }
    else if (!phoneRegex.test(phone)) {
        alert("Invalid phone format")
    }
    else if (linkedIn!=='' && !linkedinRegex.test(linkedIn)) {
        alert("Invalid linkedIn format. Correct format: https://www.linkedin.com/in/xyz")
    }
    else if (!passwordRegex.test(password)) {
        alert("Invalid password format")
    }
    else if (password !== confirmPassword) {
        alert("Password and Confirm Password does not match");
    }
    else {
        registerButton.disable=true;
        registerLoader.style.visibility = 'visible';
        const formData = {
            "name": name,
            "email": email,
            "phone": phone,
            "linkedIn": linkedIn,
            "password": password,
            "userType": userType,
            "company": company,
            "vcOrganization": vcOrganization,
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }
        const url = `${baseUrl}api/registration`;
        try {
            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => {
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
                        registerButton.disable=false;
                    }
                    else {
                        registerLoader.style.visibility = 'hidden';
                        alert(data.message);
                        registerButton.disable=false;
                    }
                })
        }
        catch (error) {
            registerLoader.style.visibility = 'hidden';
            console.log('Error:' + error);
            alert("Some error occured");
            registerButton.disable=false;
        }
    }
})