// SHOW/HIDE SCREENS
function showScreen(screenId){
    const screens = document.querySelectorAll('.mainScreen');
    screens.forEach(s=>s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

function showSignup(){
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("signupPage").classList.remove("hidden");
}

function showLogin(){
    document.getElementById("signupPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
}

// LOGIN/SIGNUP LOCAL STORAGE
function login(){
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;
    const storedUser = localStorage.getItem("buzzify_user");
    const storedPass = localStorage.getItem("buzzify_pass");
    if(user === storedUser && pass === storedPass){
        alert("Login success!");
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("appPage").classList.remove("hidden");
        loadProfile();
    } else {
        alert("Wrong credentials!");
    }
}

function signup(){
    const user = document.getElementById("newUser").value;
    const pass = document.getElementById("newPass").value;
    const bio = document.getElementById("newBio").value;
    localStorage.setItem("buzzify_user", user);
    localStorage.setItem("buzzify_pass", pass);
    localStorage.setItem("buzzify_bio", bio);
    alert("Account created!");
    showLogin();
}

// PROFILE FUNCTIONS
function updateProfile(){
    const pic = document.getElementById("profilePic").value;
    const bio = document.getElementById("profileBio").value;
    if(pic) localStorage.setItem("buzzify_pic", pic);
    if(bio) localStorage.setItem("buzzify_bio", bio);
    loadProfile();
}

function loadProfile(){
    const user = localStorage.getItem("buzzify_user");
    document.getElementById("profileUsername").innerText = user;
    document.getElementById("profileBioText").innerText = localStorage.getItem("buzzify_bio")||'';
    document.getElementById("profileAvatar").src = localStorage.getItem("buzzify_pic")||'https://i.ibb.co/6NX5vTq/default-avatar.png';

    const gallery = document.getElementById("profilePosts");
    const posts = JSON.parse(localStorage.getItem("buzzify_posts")||"[]");
    gallery.innerHTML = "";
    posts.filter(p=>p.user===user).forEach(p=>{
        if(p.type==='image'){
            gallery.innerHTML += `<img src="${p.content}">`;
        } else if(p.type==='video'){
            gallery.innerHTML += `<video src="${p.content}" controls></video>`;
        }
    });
}

// POSTS / UPLOAD
function uploadPost(){
    const fileInput = document.getElementById("uploadFile");
    if(fileInput.files.length===0){ alert("Select file"); return; }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e){
        const posts = JSON.parse(localStorage.getItem("buzzify_posts")||"[]");
        const type = file.type.includes("video")?"video":"image";
        posts.push({user:localStorage.getItem("buzzify_user"), content:e.target.result, type});
        localStorage.setItem("buzzify_posts", JSON.stringify(posts));
        alert("Uploaded!");
        loadProfile();
    }
    reader.readAsDataURL(file);
}

// MARKETPLACE
function addItem(){
    const name = document.getElementById("itemName").value;
    const price = document.getElementById("itemPrice").value;
    if(!name || !price){alert("Fill all fields"); return;}
    const items = JSON.parse(localStorage.getItem("buzzify_market")||"[]");
    items.push({name, price});
    localStorage.setItem("buzzify_market", JSON.stringify(items));
    loadMarket();
}

function loadMarket(){
    const feed = document.getElementById("marketFeed");
    const items = JSON.parse(localStorage.getItem("buzzify_market")||"[]");
    feed.innerHTML = "";
    if(items.length===0){
        // placeholders
        for(let i=0;i<4;i++){
            feed.innerHTML += '<div class="marketItem placeholder">Item</div>';
        }
    } else {
        items.forEach(i=>{
            feed.innerHTML += `<div class="marketItem">${i.name} - $${i.price}</div>`;
        });
    }
}

// MESSAGES
function sendMessage(){
    const to = document.getElementById("msgUser").value;
    const text = document.getElementById("msgText").value;
    if(!to || !text){alert("Fill fields"); return;}
    const messages = JSON.parse(localStorage.getItem("buzzify_messages")||"[]");
    messages.push({to,user:localStorage.getItem("buzzify_user"),text});
    localStorage.setItem("buzzify_messages", JSON.stringify(messages));
    loadMessages();
}

function loadMessages(){
    const feed = document.getElementById("messageFeed");
    const messages = JSON.parse(localStorage.getItem("buzzify_messages")||"[]");
    feed.innerHTML = "";
    messages.forEach(m=>{
        feed.innerHTML += `<div class="messageItem ${m.user===localStorage.getItem("buzzify_user")?"you":"other"}"><b>${m.user}:</b> ${m.text}</div>`;
    });
}

// INIT
window.onload = function(){
    loadMarket();
    loadMessages();
}
