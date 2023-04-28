if (localStorage.getItem("loggedIn")){
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
    document.getElementById("loginusername").textContent = localStorage.getItem("username");
    document.getElementById("welcome").innerHTML = "Welcome, "
}else{
    document.getElementById("loginusername").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("welcome").style.display = "none";
}

document.querySelector("#login").addEventListener("click", function(){
    document.querySelector(".popup").classList.add("active");
    // console.log("It worked");
    resetLogIn();
    resetBorderLogIn();
    document.getElementById("login-message").innerHTML = '';
    if (document.querySelector(".signuppopup").classList.contains("active")){
        document.querySelector(".signuppopup").classList.remove("active");
    }
});

document.querySelector(".popup .close-btn").addEventListener("click", function(){
    document.querySelector(".popup").classList.remove("active");
    // console.log("It worked");
});

document.querySelector("#signup").addEventListener("click", function(){
    document.querySelector(".signuppopup").classList.add("active");
    // console.log("It worked");
    resetSignUp();
    resetBorderSignUp();
    if (document.querySelector(".popup").classList.contains("active")){
        document.querySelector(".popup").classList.remove("active");
    }
});

document.querySelector(".signuppopup .close-btn").addEventListener("click", function(){
    document.querySelector(".signuppopup").classList.remove("active");
    // console.log("It worked");
});

document.querySelector("#signuptext").addEventListener("click", function(){
    document.querySelector(".signuppopup").classList.add("active");
    // console.log("It worked");
    resetSignUp();
    resetBorderSignUp();
    if (document.querySelector(".popup").classList.contains("active")){
        document.querySelector(".popup").classList.remove("active");
    }
});

function loginfromlogin(){
    resetBorderLogIn();

    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");

    let url = "./PHP/login.php";
    let data = new FormData();
    data.append("email", email.value);
    data.append("password", password.value);

    var reply = postData(url, data);
    // console.log(reply);
    var loginMessage = JSON.parse(reply);

    if (loginMessage[0] == 2){
        document.getElementById("login-message").innerHTML = "Password Incorrect!";
        document.getElementById("login-message").style.color = "darkred";
        password.style.border = "2px solid red";
        password.style.borderRadius = "5px";
    }else if (loginMessage[0] == 3){
        document.getElementById("login-message").innerHTML = "This account does not exist!";
        document.getElementById("login-message").style.color = "darkred";
        email.style.border = "2px solid red";
        email.style.borderRadius = "5px";
    }else{
        document.getElementById("login-message").innerHTML = "You are logged in!";
        document.getElementById("login-message").style.color = "green";
        var button = document.getElementById("signinbutton");
        button.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; white-space: nowrap;"><div>Logging in...</div><img src="./Media/Spinner-1s-200px.svg" style="width:32px; height:32px;" alt=""></div>';

        localStorage.setItem("loggedIn",true);
        localStorage.setItem("username",loginMessage[1]);
        // console.log(loginMessage);
        // console.log(localStorage.getItem("username"));
        setTimeout(function () {
            document.querySelector(".popup").classList.remove("active");
            // console.log("It worked");
            resetLogIn();
            resetBorderLogIn();

            var button = document.getElementById("signinbutton");
            button.innerHTML = "Sign in";
            document.getElementById("login-message").innerHTML = '';
            location.reload();
        }, 1000);
        showAccount();
    }
}

function loginfromsignup(){
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const username = document.getElementById("username");
    const signupemail = document.getElementById("signup-email");
    const signuppassword = document.getElementById("signup-password");
    const confirmpassword = document.getElementById("confirm-password");

    resetBorderSignUp();

    let url = "./PHP/insert.php";
    let data = new FormData();
    data.append("firstname", document.getElementById("firstname").value);
    data.append("lastname", document.getElementById("lastname").value);
    data.append("username", document.getElementById("username").value);
    data.append("email", document.getElementById("signup-email").value);
    data.append("signuppassword", document.getElementById("signup-password").value)
    data.append("confirmpassword", document.getElementById("confirm-password").value);

    var errorMessage = postData(url, data);
    console.log(errorMessage);
    var errorArray = JSON.parse(errorMessage);

    if (errorArray.includes("1")){
        firstname.style.border = "2px solid red";
        firstname.style.borderRadius = "5px";
        firstname.placeholder = "First name cannot be blank!"
    }
    if (errorArray.includes("2")){
        lastname.style.border = "2px solid red";
        lastname.style.borderRadius = "5px";
        lastname.placeholder = "Last name cannot be blank!"
    }
    if (errorArray.includes("3")){
        username.style.border = "2px solid red";
        username.style.borderRadius = "5px";
        username.placeholder = "User name cannot be blank!";
    }
    if (errorArray.includes("4")){
        username.style.border = "2px solid red";
        username.style.borderRadius = "5px";
        username.value = ''
        username.placeholder = "User name too long!";
    }
    if (errorArray.includes("5")){
        signupemail.style.border = "2px solid red";
        signupemail.style.borderRadius = "5px";
        signupemail.value = '';
        signupemail.placeholder = "Invalid email!";
    }
    if (errorArray.includes("6")){
        signuppassword.style.border = "2px solid red";
        signuppassword.style.borderRadius = "5px";
        signuppassword.placeholder = "Password cannot be blank!";
    }
    if (errorArray.includes("7")){
        signuppassword.style.border = "2px solid red";
        signuppassword.style.borderRadius = "5px";
        signuppassword.value = '';
        signuppassword.placeholder = "Password only can contain 6-20 characters!";
    }
    if (errorArray.includes("8")){
        confirmpassword.style.border = "2px solid red";
        confirmpassword.style.borderRadius = "5px";
        confirmpassword.value = '';
        confirmpassword.placeholder = "Password does not match!";
    }
    if (errorArray.includes("9")){
        document.getElementById("error-message").innerHTML = "Email already exists!";
    }
    if (errorArray.includes("10")){
        document.getElementById("error-message").innerHTML = "Username already taken!";
    }
    if (errorArray.includes("0")){
        var button = document.getElementById("signupbutton");
        button.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; white-space: nowrap;"><div>Signing up...</div><img src="./Media/Spinner-1s-200px.svg" style="width:32px; height:32px;" alt=""></div>';
        document.getElementById("error-message").innerHTML = "<span style='color:green'>Sign up successful!</span>";
        setTimeout(function () {
            document.querySelector(".popup").classList.add("active");
            // console.log("It worked");
            resetLogIn();
            resetBorderLogIn();
            if (document.querySelector(".signuppopup").classList.contains("active")){
                document.querySelector(".signuppopup").classList.remove("active");
            }

            var button = document.getElementById("signupbutton");
            button.innerHTML = "Sign up";
            }, 1000);
    }
}

function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("loggedIn");
    location.reload();
}

function resetBorderSignUp(){
    document.getElementById("firstname").style.border = "2px solid #aaa";
    document.getElementById("firstname").style.borderRadius = "0px";
    document.getElementById("firstname").placeholder = "Enter your first name";

    document.getElementById("lastname").style.border = "2px solid #aaa";
    document.getElementById("lastname").style.borderRadius = "0px";
    document.getElementById("lastname").placeholder = "Enter your last name";

    document.getElementById("username").style.border = "2px solid #aaa";
    document.getElementById("username").style.borderRadius = "0px";
    document.getElementById("username").placeholder = "Enter your user name";

    document.getElementById("signup-email").style.border = "2px solid #aaa";
    document.getElementById("signup-email").style.borderRadius = "0px";
    document.getElementById("signup-email").placeholder = "Enter your email";

    document.getElementById("signup-password").style.border = "2px solid #aaa";
    document.getElementById("signup-password").style.borderRadius = "0px";
    document.getElementById("signup-password").placeholder = "Enter your password";

    document.getElementById("confirm-password").style.border = "2px solid #aaa";
    document.getElementById("confirm-password").style.borderRadius = "0px";
    document.getElementById("confirm-password").placeholder = "Confirm your password";
}

function resetSignUp(){
    document.getElementById("firstname").value = '';
    document.getElementById("lastname").value = '';
    document.getElementById("username").value = '';
    document.getElementById("signup-email").value = '';
    document.getElementById("signup-password").value = '';
    document.getElementById("confirm-password").value = '';
}

function resetBorderLogIn(){
    document.getElementById("login-email").style.border = "2px solid #aaa";
    document.getElementById("login-email").style.borderRadius = "0px";
    document.getElementById("login-email").placeholder = "Enter your email";

    document.getElementById("login-password").style.border = "2px solid #aaa";
    document.getElementById("login-password").style.borderRadius = "0px";
    document.getElementById("login-password").placeholder = "Enter your password";
}

function resetLogIn(){
    document.getElementById("login-email").value = '';
    document.getElementById("login-password").value = '';
}

window.addEventListener("resize", function(){
    //When username too long
    var a = document.getElementById("welcome");
    var b = document.getElementById("logout");
    if (localStorage.getItem("username") != null){
        if (window.innerWidth < 785){
            var length = window.innerWidth - 300;
            document.getElementById("loginusername").style.setProperty("max-width", `${length}px`);
        }else{
            document.getElementById("loginusername").textContent = localStorage.getItem("username");
        }
    }
});
    

function postData(url, data){
    var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState == XMLHttpRequest.DONE) {
    //         var error = xhr.responseText;
    //         console.log(error);
    //     }
    // }
    xhr.open("POST", url, false);
    xhr.send(data);
    if (xhr.status === 200) {
        var error = xhr.responseText;
        // console.log(error);
        return error;
    }
}

function getData(url){
    var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState == XMLHttpRequest.DONE) {
    //         var error = xhr.responseText;
    //         console.log(error);
    //     }
    // }
    xhr.open("GET", url, false);
    xhr.send();
    if (xhr.status === 200) {
        var error = xhr.responseText;
        // console.log(error);
        return error;
    }
}
