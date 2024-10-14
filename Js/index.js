var myEmailIcon = document.querySelector(".fa-envelope");
var myPasswordIcon = document.querySelector(".fa-eye-slash");
var myuserIcon = document.querySelector(".fa-user");
var myOpenPasswordIcon = document.querySelector(".fa-eye");
var signUpName = document.querySelector("#userNameSignUp");
var signUpEmail = document.querySelector("#userEmailSignUp");
var signUpPassword = document.querySelector("#userPasswordSignUp");
var myUserEmailInput = document.querySelector("#userEmailLogin");
var myUserPasswordInput = document.querySelector("#userPasswordLogin");
var myAlertLogin = document.querySelector(".alert-Fileds");
var loginCheck = document.querySelector(".alert-check");
var btnSignIn = document.querySelector("#buttonSignIn");
var btnSignUpForRegistar = document.querySelector("#buttonSignUpForRegister");
var btnsignUp = document.querySelector("#buttonSignUp");

var allUsers = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];


function addUsers() {
    if (!signUpName.value || !signUpEmail.value || !signUpPassword.value) {
    
        
        myAlertLogin.classList.remove("d-none");
        setTimeout(() => {
            myAlertLogin.classList.add("d-none");
            
        }, 1000);
        loginCheck.classList.add("d-none");
        return;
    }
    else {
        myAlertLogin.classList.add("d-none");

    }

    var users = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
    };

    allUsers.push(users);
    localStorage.setItem("users", JSON.stringify(allUsers));

    clearValue();

    open("./login.html", "_self");
}





function clearValue() {
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPassword.value = "";
}




btnsignUp?.addEventListener("click", addUsers);






btnSignIn?.addEventListener("click", function () {
    var email = myUserEmailInput.value;
    var password = myUserPasswordInput.value;
    var user = allUsers.find(user => user.email === email && user.password === password);

    if (!email || !password) {
        myAlertLogin.classList.remove("d-none");
        setTimeout(() => {
            myAlertLogin.classList.add("d-none");
            
        }, 1000);
        loginCheck.classList.add("d-none");
        return;
    }
    if (user) {

        localStorage.setItem("loggedInUserName", user.name);

        loginCheck.classList.add("d-none");
        
        open("./homepage.html", "_self");
    } else {

        loginCheck.classList.remove("d-none");
        myAlertLogin.classList.add("d-none");
        setTimeout(() => {
            loginCheck.classList.add("d-none");
            
        }, 1000);
    }
});








btnSignUpForRegistar?.addEventListener("click", function () {
    open("./index.html", "_self");
});







myPasswordIcon?.addEventListener("click", function () {
    if (myUserPasswordInput && myUserPasswordInput.type === "password") {
        myUserPasswordInput.type = "text";
        myPasswordIcon.classList.add("d-none");
        myOpenPasswordIcon.classList.remove("d-none");
    } else if (signUpPassword && signUpPassword.type === "password") {
        signUpPassword.type = "text";
        myPasswordIcon.classList.add("d-none");
        myOpenPasswordIcon.classList.remove("d-none");
    }
});




myOpenPasswordIcon?.addEventListener("click", function () {
    if (myUserPasswordInput && myUserPasswordInput.type === "text") {
        myUserPasswordInput.type = "password";
        myPasswordIcon.classList.remove("d-none");
        myOpenPasswordIcon.classList.add("d-none");
    } else if (signUpPassword && signUpPassword.type === "text") {
        signUpPassword.type = "password";
        myPasswordIcon.classList.remove("d-none");
        myOpenPasswordIcon.classList.add("d-none");
    }
});



var userEmailLoginRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var userPasswordLoginRegex = /^[\S]{6,}$/;
var userNameSignUpRegex = /^[a-zA-Z0-9 ]{3,16}$/;
var userEmailSignUpRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var userPasswordSignUpRegex = /^[\S]{6,}$/;




function validateUser(element) {
    switch (element.id) {
        case 'userEmailLogin':
            if (userEmailLoginRegex.test(element.value)) {
                element.classList.remove('is-invalid');
                myEmailIcon.classList.remove("d-none");

            } else {
                element.classList.add('is-invalid');
                element.classList.remove('is-valid');
                myEmailIcon.classList.add("d-none");

            }
            break;

        case 'userPasswordLogin':
            if (userPasswordLoginRegex.test(element.value)) {
                element.classList.remove('is-invalid');
                myPasswordIcon.classList.remove("d-none");


            } else {
                element.classList.add('is-invalid');
                element.classList.remove('is-valid');
                myPasswordIcon.classList.add("d-none");
                myOpenPasswordIcon.classList.add("d-none")

            }
            break;

        case 'userNameSignUp':
            if (userNameSignUpRegex.test(element.value)) {
                element.classList.remove('is-invalid');
                myuserIcon.classList.remove("d-none");

            } else {
                element.classList.add('is-invalid');
                element.classList.remove('is-valid');
                myuserIcon.classList.add("d-none");

            }
            break;

        case 'userEmailSignUp':
            if (userEmailSignUpRegex.test(element.value)) {
                element.classList.remove('is-invalid');
                myEmailIcon.classList.remove("d-none");

            } else {
                element.classList.add('is-invalid');
                element.classList.remove('is-valid');
                myEmailIcon.classList.add("d-none");

            }
            break;

        case 'userPasswordSignUp':
            if (userPasswordSignUpRegex.test(element.value)) {
                element.classList.remove('is-invalid');
                myPasswordIcon.classList.remove("d-none");



            } else {
                element.classList.add('is-invalid');
                element.classList.remove('is-valid');
                myPasswordIcon.classList.add("d-none");
                myOpenPasswordIcon.classList.add("d-none")

            }
            break;

        default:
            return;
    }
}
