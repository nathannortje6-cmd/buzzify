// SCREEN FUNCTIONS
function showScreen(screenId){
    const screens = document.querySelectorAll('.mainScreen');
    screens.forEach(s=>s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

function showSignup(){ document.getElementById("loginPage").classList.add("hidden"); document.getElementById("signupPage").classList.remove("hidden"); }
function showLogin(){ document.getElementById("signupPage").classList.add("hidden"); document.getElementById("loginPage").classList.remove("hidden"); }

// LOGIN/SIGNUP
function login(){
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;
    const storedUser = localStorage.getItem("buzzify_user");
    const storedPass = localStorage.getItem("buzzify_pass");
    if(user===storedUser && pass===storedPass){
        alert("Login success!");
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("appPage").classList.remove("hidden");
        loadProfile();
        loadMarket();
        loadUsers();
    } else { alert("Wrong credentials!"); }
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

// PROFILE
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
        if(p.type==='image'){ gallery.innerHTML += `<img src="${p.content}">`; }
        else if(p.type==='video'){ gallery.innerHTML += `<video src="${p.content}" controls></video>`; }
    });
}

// UPLOAD
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
    const photoInput = document.getElementById("itemPhoto");
    if(!name || !price || photoInput.files.length===0){ alert("Fill all fields"); return; }

    const reader = new FileReader();
    reader.onload = function(e){
        const items = JSON.parse(localStorage.getItem("buzzify_market")||"[]");
        items.push({name, price, photo:e.target.result});
        localStorage.setItem("buzzify_market", JSON.stringify(items));
        loadMarket();
    }
    reader.readAsDataURL(photoInput.files[0]);
}

function loadMarket(){
    const feed = document.getElementById("marketFeed");
    const items = JSON.parse(localStorage.getItem("buzzify_market")||"[]");
    feed.innerHTML = "";
    if(items.length===0){
        for(let i=0;i<4;i++){ feed.innerHTML += '<div class="marketItem placeholder">Item</div>'; }
    } else {
        items.forEach(i=>{
            feed.innerHTML += `<div class="marketItem"><img src="${i.photo}"><strong>${i.name}</strong><span>$${i.price}</span></div>`;
        });
    }
}

// MESSAGING
let currentChatUser = null;

function loadUsers(){
    const messages = JSON.parse(localStorage.getItem("buzzify_messages")||"[]");
    const users = new Set();
    messages.forEach(m=>{
        if(m.user!==localStorage.getItem("buzzify_user")) users.add(m.user);
        if(m.to!==localStorage.getItem("buzzify_user")) users.add(m.to);
    });
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    users.forEach(u=>{
        const div = document.createElement("div");
        div.classList.add("userBtn");
        div.innerText = u;
        div.onclick = ()=>openChat(u);
        userList.appendChild(div);
    });
}

function openChat(user){
    currentChatUser = user;
    document.getElementById("chatUser").innerText = user;
    document.getElementById("chatScreen").classList.remove("hidden");
    document.getElementById("userList").classList.add("hidden");
    loadChatMessages();
}

function closeChat(){
    document.getElementById("chatScreen").classList.add("hidden");
    document.getElementById("userList").classList.remove("hidden");
    currentChatUser = null;
}

function sendChatMessage(){
    const text = document.getElementById("chatInput").value;
    if(!text || !currentChatUser){ return; }
    const messages = JSON.parse(localStorage.getItem("buzzify_messages")||"[]");
    messages.push({user:localStorage.getItem("buzzify_user"), to:currentChatUser, text});
    localStorage.setItem("buzzify_messages", JSON.stringify(messages));
    document.getElementById("chatInput").value = "";
    loadChatMessages();
    loadUsers();
}

function loadChatMessages(){
    const feed = document.getElementById("chatMessages");
    const messages = JSON.parse(localStorage.getItem("buzzify_messages")||"[]");
    feed.innerHTML = "";
    messages.forEach(m=>{
        if((m.user===currentChatUser && m.to===localStorage.getItem("buzzify_user")) || 
           (m.user===localStorage.getItem("buzzify_user") && m.to===currentChatUser)){
            const div = document.createElement("div");
            div.classList.add("messageBubble");
            div.classList.add(m.user===localStorage.getItem("buzzify_user")?"you":"other");
            div.innerText = m.text;
            feed.appendChild(div);
        }
    });
    feed.scrollTop = feed.scrollHeight;
}

// INIT
window.onload = function(){
    loadMarket();
    loadUsers();
    loadProfile();
}
