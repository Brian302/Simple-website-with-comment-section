//GET ACCOUNT ID
let url = "./PHP/getid.php";
let data = new FormData();
data.append("name", localStorage.getItem("username"));
sessionStorage.setItem("id", postData(url, data));

//SUBMIT COMMENT
function submitComment(){
    if (localStorage.getItem("loggedIn")){
        const commentTitle = document.getElementById("comment_title");
        const comment = document.getElementById("comment");
        document.getElementById("comment-error").innerHTML = '';

        comment.style.border = "2px solid #aaa";
        comment.style.borderRadius = "0px";
        commentTitle.style.border = "2px solid #aaa";
        commentTitle.style.borderRadius = "0px";
        
        let url = "./PHP/submitcomment.php";
        let data = new FormData();
        data.append("commenttitle", commentTitle.value);
        data.append("comment", comment.value);
        data.append("name", localStorage.getItem("username"));
        data.append("layer",1);

        var outputMessage = postData(url, data);
        console.log(outputMessage);
        var outputArray = JSON.parse(outputMessage);

        if (outputArray.includes("1")){
            commentTitle.style.border = "2px solid red";
            commentTitle.style.borderRadius = "5px";
            commentTitle.placeholder = "Comment title cannot be blank!";
        }
        if (outputArray.includes("2")){
            commentTitle.style.border = "2px solid red";
            commentTitle.style.borderRadius = "5px";
            commentTitle.value = '';
            commentTitle.placeholder = "Comment title too long!";
        }
        if (outputArray.includes("3")){
            comment.style.border = "2px solid red";
            comment.style.borderRadius = "5px";
            comment.placeholder = "Comment cannot be blank!";
        }
        if (outputArray.includes("4")){
            comment.style.border = "2px solid red";
            comment.style.borderRadius = "5px";
            document.getElementById("comment-error").innerHTML = "Comment too long!";
        }
        if (outputArray.includes("5")){
            document.getElementById("submitbutton1").innerHTML = '<div style="display: flex; justify-content: center; align-items: center; white-space: nowrap;"><div>Submitting...</div><img src="./Media/Spinner-1s-200px-second.svg" style="width:22px; height:22px; margin: 0; padding:0; background-color: rgba(255,255,255,0)" alt=""></div>';
            document.getElementById("comment-error").innerHTML = "";
            commentTitle.style.border = "2px solid #aaa";
            commentTitle.style.borderRadius = "0px";
            comment.style.border = "2px solid #aaa";
            comment.style.borderRadius = "0px";
            setTimeout(function () {
                commentTitle.value = '';
                comment.value = '';
                commentTitle.placeholder = "Your Comment Title...";
                comment.placeholder = "Your Comment...";
                document.getElementById("submitbutton1").innerHTML = "Submit Comment";
                loadPage();
                }, 1000);
        }
    }else{
        resetBorderLogIn();
        resetLogIn();
        resetSignUp();
        resetBorderSignUp();
        document.getElementById("login-message").textContent = '';
        document.getElementById("error-message").textContent = '';
        window.alert("You must be logged in!");
        document.querySelector(".popup").classList.add("active");
        document.querySelector(".signuppopup").classList.remove("active");
    }
    
}

function loadTitleComments(){
    let url = "./PHP/loadcomment.php";
    var outputMessage = getData(url);
    var outputArray = JSON.parse(outputMessage);

    document.querySelector(".comment_section").textContent = '';
    
    //Creating first layer
    for (var i = 0; i < outputArray.length; i++){
        if (outputArray[i].layer == 1){

            //Count how many replies
            var totalReplies;
            if (outputArray[i].replies != null){
                totalReplies = outputArray[i].replies.split(",").length;
            }else{
                totalReplies = 0;
            }

            //Count how many likes
            var totalLikes;
            if (outputArray[i].likes != null){
                totalLikes = outputArray[i].likes.split(",").length - 1;
            }else{
                totalLikes = 0;
            }

            //Count how many dislikes
            var totalDislikes;
            if (outputArray[i].dislikes != null){
                totalDislikes = outputArray[i].dislikes.split(",").length - 1;
            }else{
                totalDislikes = 0;
            }

            let first = document.createElement("div");
            first.classList.add("container");
            let second = document.createElement("div")
            second.classList.add("comment_container");
            second.classList.add("opened");
            second.id = outputArray[i].commentid;
            let third = document.createElement("div");
            third.classList.add("comment_card");
            let fourth = document.createElement("p");
            fourth.classList.add("comment_title");
            fourth.textContent = `${outputArray[i].title}`;
            let fifth = document.createElement("i");
            fifth.classList.add("comment_subtitle");
            fifth.textContent = "by ";
            let sixth = document.createElement("span");
            sixth.classList.add("comment_person");
            sixth.textContent = `${outputArray[i].name}`;
            let seventh = document.createElement("p");
            seventh.classList.add("comment");
            seventh.textContent = `${outputArray[i].comment}`;
            let eighth = document.createElement("div");
            eighth.classList.add("comment_footer");
            let nineth = document.createElement("div");
            nineth.classList.add("like");
            nineth.id = `like${outputArray[i].commentid}`;
            nineth.textContent = "Likes ";
            nineth.setAttribute("onclick",`like(${outputArray[i].commentid})`);
            if (outputArray[i].likes != null){
                if (outputArray[i].likes.includes(`${sessionStorage.getItem("id")}`)){
                    nineth.classList.add("comment_active");
                }
            }
            let tenth = document.createElement("span");
            tenth.classList.add("like_number");
            tenth.textContent = `${totalLikes}`;
            let eleventh = document.createElement("div");
            eleventh.classList.add("dislike");
            eleventh.id = `dislike${outputArray[i].commentid}`;
            eleventh.textContent = "Dislikes ";
            eleventh.setAttribute("onclick",`dislike(${outputArray[i].commentid})`);
            if (outputArray[i].dislikes != null){
                if (outputArray[i].dislikes.includes(`${sessionStorage.getItem("id")}`)){
                    eleventh.classList.add("comment_active");
                }
            }
            let twelveth = document.createElement("span");
            twelveth.classList.add("dislike_number");
            twelveth.textContent = `${totalDislikes}`;
            let thirteenth = document.createElement("div");
            thirteenth.classList.add("comment_footer-text");
            thirteenth.classList.add("show-replies");
            thirteenth.id = `show${outputArray[i].commentid}`;
            let fourteenth = document.createElement("span");
            fourteenth.classList.add("reply_arrow");
            fourteenth.innerHTML = '&#x25BC; ';
            let fifteenth = document.createElement("span");
            fifteenth.classList.add("reply_number");
            fifteenth.textContent = `${totalReplies}`;
            let sixteenth = document.createElement("div");
            sixteenth.classList.add("comment_footer-text");
            sixteenth.classList.add("reply-text");
            sixteenth.id = `reply${outputArray[i].commentid}`;
            sixteenth.textContent = 'Reply';
            sixteenth.setAttribute("onclick", `reply(${outputArray[i].commentid})`);

            var one = document.querySelector(".comment_section");
            document.querySelector(".comment_section").appendChild(first);
            document.querySelectorAll(".container")[i].appendChild(second);
            document.querySelectorAll(".comment_container.opened")[i].appendChild(third);
            document.querySelectorAll(".comment_card")[i].appendChild(fourth);
            document.querySelectorAll(".comment_card")[i].appendChild(fifth);
            document.querySelectorAll(".comment_subtitle")[i].appendChild(sixth);
            document.querySelectorAll(".comment_card")[i].appendChild(seventh);
            document.querySelectorAll(".comment_card")[i].appendChild(eighth);
            document.querySelectorAll(".comment_footer")[i].appendChild(nineth);
            document.querySelectorAll(".like")[i].appendChild(tenth);
            document.querySelectorAll(".comment_footer")[i].appendChild(eleventh);
            document.querySelectorAll(".dislike")[i].appendChild(twelveth);
            document.querySelectorAll(".comment_footer")[i].appendChild(thirteenth);
            document.querySelectorAll(".comment_footer-text.show-replies")[i].appendChild(fourteenth);
            document.querySelectorAll(".comment_footer-text.show-replies")[i].appendChild(fifteenth);
            document.querySelectorAll(".comment_footer")[i].appendChild(sixteenth); 
        }   
    }
    for (var i = 0; i < outputArray.length; i++){
        if (outputArray[i].replies != null){
            let array = outputArray[i].replies.split(",");
            for (var j = 0; j < array.length; j++){
                for (var k = 0; k < outputArray.length; k++){
                    if (outputArray[k].commentid == array[j]){

                        //Count how many likes
                        var totalLikes;
                        if (outputArray[k].likes != null){
                            totalLikes = outputArray[k].likes.split(",").length - 1;
                        }else{
                            totalLikes = 0;
                        }

                        //Count how many dislikes
                        var totalDislikes;
                        if (outputArray[k].dislikes != null){
                            totalDislikes = outputArray[k].dislikes.split(",").length - 1;
                        }else{
                            totalDislikes = 0;
                        }

                        let two = document.createElement("div")
                        two.classList.add("comment_container");
                        two.setAttribute("dataset",`${outputArray[i].commentid}`);
                        let third = document.createElement("div");
                        third.classList.add("comment_card");
                        let fourth = document.createElement("p");
                        fourth.classList.add("comment_title");
                        fourth.textContent = `${outputArray[k].name}`;
                        let seventh = document.createElement("p");
                        seventh.classList.add("comment");
                        seventh.textContent = `${outputArray[k].comment}`;
                        let eighth = document.createElement("div");
                        eighth.classList.add("comment_footer");
                        let nineth = document.createElement("div");
                        nineth.classList.add("like");
                        nineth.id = `like${outputArray[k].commentid}`;
                        nineth.textContent = "Likes ";
                        nineth.setAttribute("onclick", `like(${outputArray[k].commentid})`);
                        if (outputArray[k].likes != null){
                            if (outputArray[k].likes.includes(`${sessionStorage.getItem("id")}`)){
                                nineth.classList.add("comment_active");
                            }
                        }
                        let tenth = document.createElement("span");
                        tenth.classList.add("like_number");
                        tenth.textContent = `${totalLikes}`;
                        let eleventh = document.createElement("div");
                        eleventh.classList.add("dislike");
                        eleventh.id = `dislike${outputArray[k].commentid}`;
                        eleventh.textContent = "Dislikes ";
                        eleventh.setAttribute("onclick", `dislike(${outputArray[k].commentid})`);
                        if (outputArray[k].dislikes != null){
                            if (outputArray[k].dislikes.includes(`${sessionStorage.getItem("id")}`)){
                                eleventh.classList.add("comment_active");
                            }
                        }
                        let twelveth = document.createElement("span");
                        twelveth.classList.add("dislike_number");
                        twelveth.textContent = `${totalDislikes}`;
                        var one = document.getElementById(`${outputArray[i].commentid}`);

                        one.appendChild(two);
                        one.children[j+1].appendChild(third);
                        one.children[j+1].children[0].appendChild(fourth);
                        one.children[j+1].children[0].appendChild(seventh);
                        one.children[j+1].children[0].appendChild(eighth);
                        one.children[j+1].children[0].children[2].appendChild(nineth);
                        one.children[j+1].children[0].children[2].children[0].appendChild(tenth);
                        one.children[j+1].children[0].children[2].appendChild(eleventh);
                        one.children[j+1].children[0].children[2].children[1].appendChild(twelveth);
                    }
                }    
            }
        }
    }

    // Show how many replies
    
}

function loadPage(){
    loadTitleComments();
    loadShowReplyNodes();
}


function loadShowReplyNodes(){
    // FOR SHOWING REPLY
    const showreplyBtn = document.querySelectorAll(".show-replies");

    showreplyBtn.forEach(btn => btn.addEventListener("click", e => {
    e.target.classList.toggle("comment_active");

    let parentContainer = e.target.closest(".comment_container");
    let pId = parentContainer.id;

    if(pId){
        let childContainer = parentContainer.querySelectorAll(`[dataset="${pId}"]`);
        childContainer.forEach(child => child.classList.toggle("opened"));
    }

    let replyArrow = parentContainer.querySelector(".reply_arrow");
    replyArrow.classList.toggle("rotated");
    }));
}

// Reply pop up
function reply(i){
    if (localStorage.getItem("loggedIn")){
        if (!(document.querySelector("#replycomment").classList.contains("active"))){
            document.querySelector("#replycomment").classList.add("active");
            sessionStorage.setItem("replyTo",i); 
            if (document.querySelector("#replycomment .close-btn") != null){
                document.querySelector("#replycomment .close-btn").addEventListener("click", function(){
                document.querySelector("#replycomment").classList.remove("active");
                });
            }
        } 
    }else{
        resetBorderLogIn();
        resetLogIn();
        resetSignUp();
        resetBorderSignUp();
        document.getElementById("login-message").textContent = '';
        document.getElementById("error-message").textContent = '';
        window.alert("You must be logged in!");
        document.querySelector(".popup").classList.add("active");
        document.querySelector(".signuppopup").classList.remove("active");
    }
    
}

//reply function
function replyComment(){
    if (localStorage.getItem("loggedIn")){
        const reply = document.getElementById("reply");
        const replyMessage = document.getElementById("reply-message");
        
        let url = "./PHP/submitreply.php";
        let data = new FormData();
        data.append("reply", reply.value);
        data.append("name", localStorage.getItem("username"));
        data.append("pid",sessionStorage.getItem("replyTo"));
        data.append("layer", 2);

        var outputMessage = postData(url, data);
        console.log(outputMessage);
        var outputArray = JSON.parse(outputMessage);

        if (outputArray.includes("1")){
            reply.style.border = "2px solid red";
            reply.style.borderRadius = "5px";
            reply.placeholder = "Reply cannot be blank!";
        }
        if (outputArray.includes("2")){
            reply.style.border = "2px solid red";
            reply.style.borderRadius = "5px";
            replyMessage.innerHTML = "Reply too long!";
        }
        if (outputArray.includes("3")){
            document.getElementById("reply_button").innerHTML = '<div style="display: flex; justify-content: center; align-items: center; white-space: nowrap;"><div>Sending reply...</div><img src="./Media/Spinner-1s-200px-second.svg" style="width:22px; height:22px; margin: 0; padding:0; background-color: rgba(255,255,255,0)" alt=""></div>';
            replyMessage.innerHTML = "";
            setTimeout(function () {
                reply.value = '';
                reply.style.border = "2px solid #aaa";
                reply.style.borderRadius = "0px";
                reply.placeholder = "Your Reply...";
                document.getElementById("reply_button").innerHTML = "Send reply";
                if (document.getElementById("replycomment").classList.contains("active")){
                    document.getElementById("replycomment").classList.remove("active");
                }
                // loadPage();
            }, 1000);
        }
    }else{
        resetBorderLogIn();
        resetLogIn();
        resetSignUp();
        resetBorderSignUp();
        document.getElementById("login-message").textContent = '';
        document.getElementById("error-message").textContent = '';
        window.alert("You must be logged in!");
        document.querySelector(".popup").classList.add("active");
        document.querySelector(".signuppopup").classList.remove("active");
    }
}

function like(i){
    if (localStorage.getItem("loggedIn")){
        console.log("Like");
        let url = "./PHP/like.php";
        let data = new FormData();
        data.append("commenter", i);
        data.append("name", localStorage.getItem("username"));
        data.append("selector", "1");

        var outputMessage = postData(url, data);
        var outputArray = JSON.parse(outputMessage);
        console.log(outputArray);

        let likeBtn = document.getElementById(`like${i}`);
        likeBtn.children[0].textContent = outputArray[0];
        let dislikeBtn = document.getElementById(`dislike${i}`);
        dislikeBtn.children[0].textContent = outputArray[1];

        likeBtn.classList.toggle("comment_active");
        if (dislikeBtn.classList.contains("comment_active")){
            dislikeBtn.classList.toggle("comment_active");
        }

    }else{
        resetBorderLogIn();
        resetLogIn();
        resetSignUp();
        resetBorderSignUp();
        document.getElementById("login-message").textContent = '';
        document.getElementById("error-message").textContent = '';
        window.alert("You must be logged in!");
        document.querySelector(".popup").classList.add("active");
        document.querySelector(".signuppopup").classList.remove("active");
    }  
}

function dislike(i){
    if (localStorage.getItem("loggedIn")){
        console.log("Dislike");
        let url = "./PHP/like.php";
        let data = new FormData();
        data.append("commenter", i);
        data.append("name", localStorage.getItem("username"));
        data.append("selector", "2");

        var outputMessage = postData(url, data);
        var outputArray = JSON.parse(outputMessage);
        console.log(outputArray);

        let likeBtn = document.getElementById(`like${i}`);
        likeBtn.children[0].textContent = outputArray[0];
        let dislikeBtn = document.getElementById(`dislike${i}`);
        dislikeBtn.children[0].textContent = outputArray[1];

        dislikeBtn.classList.toggle("comment_active");
        if (likeBtn.classList.contains("comment_active")){
            likeBtn.classList.toggle("comment_active");
        }

    }else{
        resetBorderLogIn();
        resetLogIn();
        resetSignUp();
        resetBorderSignUp();
        document.getElementById("login-message").textContent = '';
        document.getElementById("error-message").textContent = '';
        window.alert("You must be logged in!");
        document.querySelector(".popup").classList.add("active");
        document.querySelector(".signuppopup").classList.remove("active");
    }
}