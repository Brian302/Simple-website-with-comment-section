function showAccount(){
    if (localStorage.getItem("loggedIn") == true){
        var popup = document.getElementById("popupmsg");
        popup.classList.add("show");
        setTimeout(function () {
            leavepopup();
        }, 2500);
    }
}

var event = new MouseEvent('mouseover', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });

var element = document.querySelector('.pop');
element.addEventListener('mouseover', function() {
    var popup = document.getElementById("popupmsg");
    popup.classList.add("show");
});

function leavepopup(){
    var popup = document.getElementById("popupmsg");
    popup.classList.remove("show");
}

function loadAccount(){
    let url = "./PHP/accountpage.php";
    let data = new FormData();
    data.append("username", localStorage.getItem("username"));
    // console.log(localStorage.getItem("username"));
    var accountDetail = postData(url, data);
    var account = JSON.parse(accountDetail);
    // console.log(account);
    var accfname = document.getElementById("accountfname");
    var acclname = document.getElementById("accountlname");
    var accuname = document.getElementById("accountuname");
    var accemail = document.getElementById("accountemail");
    var accpassword = document.getElementById("accountpassword");

    accfname.innerHTML = account[0];
    acclname.innerHTML = account[1];
    accuname.innerHTML = account[2];
    accemail.innerHTML = account[3];
    var string = '';
    for (var i = 0; i < account[4]; i++){
        var string = string + "?";
    }
    accpassword.value = string;
}

if (document.querySelector("#changepassword") != null){
    document.querySelector("#changepassword").addEventListener("click", function(){

    document.querySelector("#passwordform").classList.add("active");
    document.getElementById("old-password").value = '';
    document.getElementById("new-password").value = '';
    document.getElementById("confirm-new-password").value = '';
    resetChangePassword();
    // console.log("It worked");
    });
}

if (document.querySelector("#passwordform .close-btn") != null){
    document.querySelector("#passwordform .close-btn").addEventListener("click", function(){
    document.querySelector("#passwordform").classList.remove("active");
    // console.log("It worked");
    });
}


function changePassword(){
    const oldp = document.getElementById("old-password");
    const newp = document.getElementById("new-password");
    const confirmp = document.getElementById("confirm-new-password");

    resetChangePassword();

    let url = "./PHP/changepassword.php";
    let data = new FormData();
    data.append("oldpassword", oldp.value);
    data.append("newpassword", newp.value);
    data.append("confirmpassword", confirmp.value);
    data.append("username", localStorage.getItem("username"));

    var passwordMessage = postData(url, data);
    var errorIndicator = false;
    
    if (passwordMessage == "1"){
        oldp.style.border = "2px solid red";
        oldp.style.borderRadius = "5px";
        oldp.value = "";
        oldp.placeholder = "Password incorrect!"
        errorIndicator = true;
    }else if (passwordMessage == "2"){
        newp.style.border = "2px solid red";
        newp.style.borderRadius = "5px";
        newp.value = "";
        newp.placeholder = "Password only can contain 6-20 characters!"
        errorIndicator = true;
    }else if (passwordMessage == "3"){
        newp.style.border = "2px solid red";
        newp.style.borderRadius = "5px";
        newp.value = "";
        newp.placeholder = "Password unchanged!"
        errorIndicator = true;
    }else if (passwordMessage == "4"){
        confirmp.style.border = "2px solid red";
        confirmp.style.borderRadius = "5px";
        confirmp.value = "";
        confirmp.placeholder = "Password does not match!"
        errorIndicator = true;
    }

    if (!errorIndicator){
        var button = document.getElementById("change");
        button.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; white-space: nowrap;"><div>Changing...</div><img src="./Media/Spinner-1s-200px.svg" style="width:32px; height:32px;" alt=""></div>';
        document.getElementById("password-message").innerHTML = "Successfully changed!"

        setTimeout(function () {
            document.querySelector("#passwordform").classList.remove("active");
            // console.log("It worked");

            resetChangePassword();

            var button = document.getElementById("change");
            button.innerHTML = "Change";
            location.reload();
        }, 1000); 
    }
}

function resetChangePassword(){
    document.getElementById("old-password").style.border = "2px solid #aaa";
    document.getElementById("old-password").style.borderRadius = "0px";
    document.getElementById("old-password").placeholder = "Enter your old password";
    document.getElementById("new-password").style.border = "2px solid #aaa";
    document.getElementById("new-password").style.borderRadius = "0px";
    document.getElementById("new-password").placeholder = "Enter your new password";
    document.getElementById("confirm-new-password").style.border = "2px solid #aaa";
    document.getElementById("confirm-new-password").style.borderRadius = "0px";
    document.getElementById("confirm-new-password").placeholder = "Confirm your new password";
}