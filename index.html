// ---------------- LOGIN / SIGNUP ----------------
function showLogin() {
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('signupPage').classList.add('hidden');
    document.getElementById('appPage').classList.add('hidden');
}

function showSignup() {
    document.getElementById('signupPage').classList.remove('hidden');
    document.getElementById('loginPage').classList.add('hidden');
}

function login() {
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    const users = JSON.parse(localStorage.getItem("buzzify_users")||"[]");

    const found = users.find(u => u.username === user && u.password === pass);
    if(found){
        localStorage.setItem("buzzify_user", user);
        localStorage.setItem("buzzify_bio", found.bio||"");
        localStorage.setItem("buzzify_avatar", found.avatar||"https://i.ibb.co/6NX5vTq/default-avatar.png");
        showApp();
    } else {
        alert("Incorrect username or password!");
    }
}

function signup() {
    const user = document.getElementById('newUser').value.trim();
    const pass = document.getElementById('newPass').value.trim();
    const bio = document.getElementById('newBio').value.trim();

    if(!user || !pass){ alert("Fill in all fields!"); return; }

    const users = JSON.parse(localStorage.getItem("buzzify_users")||"[]");
    if(users.find(u=>u.username===user)){ alert("Username taken!"); return; }

    users.push({username:user,password:pass,bio,avatar:"https://i.ibb.co/6NX5vTq/default-avatar.png"});
    localStorage.setItem("buzzify_users", JSON.stringify(users));
    alert("Account created!");
    showLogin();
}

// ---------------- SHOW APP ----------------
function showApp() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('signupPage').classList.add('hidden');
    document.getElementById('appPage').classList.remove('hidden');
    showScreen('homeScreen');
    loadProfile();
    renderHomeFeed();
    renderVideoFeed();
    renderProfilePosts();
    loadMarket();
    loadUsers();
}

// ---------------- SCREEN NAVIGATION ----------------
function showScreen(screenId){
    const screens = document.querySelectorAll('.mainScreen');
    screens.forEach(s=>s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');

    // Pause all videos except visible screen
    document.querySelectorAll('video').forEach(v=>v.pause());
}

// ---------------- PROFILE ----------------
function loadProfile(){
    document.getElementById('profileUsername').innerText = localStorage.getItem("buzzify_user");
    document.getElementById('profileBioText').innerText = localStorage.getItem("buzzify_bio");
    document.getElementById('profileAvatar').src = localStorage.getItem("buzzify_avatar");
}

function updateProfilePic(){
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = function(){
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e){
            localStorage.setItem("buzzify_avatar", e.target.result);
            loadProfile();
        };
        reader.readAsDataURL(file);
    };
    fileInput.click();
}

function editBio(){
    const newBio = prompt("Enter new bio:", localStorage.getItem("buzzify_bio")||"");
    if(newBio!==null){
        localStorage.setItem("buzzify_bio", newBio);
        loadProfile();
    }
}

// ---------------- UPLOAD POSTS ----------------
function uploadPost(){
    const fileInput = document.getElementById('uploadFile');
    const file = fileInput.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = function(e){
        let posts = JSON.parse(localStorage.getItem("buzzify_posts")||"[]");
        posts.unshift({user:localStorage.getItem("buzzify_user"), src:e.target.result});
        localStorage.setItem("buzzify_posts", JSON.stringify(posts));
        renderHomeFeed();
        renderVideoFeed();
        renderProfilePosts();
    };
    reader.readAsDataURL(file);
    fileInput.value = "";
}

// ---------------- HOME FEED ----------------
function renderHomeFeed(){
    const feed = document.getElementById('homeFeed');
    const posts = JSON.parse(localStorage.getItem("buzzify_posts")||"[]");
    feed.innerHTML = "";
    if(posts.length===0){
        for(let i=0;i<3;i++){
            feed.innerHTML += '<div class="post placeholder">Photo/Video Placeholder</div>';
        }
    } else {
        posts.forEach(p=>{
            feed.innerHTML += `<div class="post" style="opacity:0; animation:fadeIn 0.5s forwards;">
                <img src="${p.src}">
                <div style="display:flex; justify-content:space-between; width:90%; margin-top:5px;">
                    <span>❤️</span><span>💬</span>
                </div>
            </div>`;
        });
    }
}

// ---------------- VIDEO FEED ----------------
function renderVideoFeed(){
    const feed = document.getElementById('videoFeed');
    const posts = JSON.parse(localStorage.getItem("buzzify_posts")||"[]");
    feed.innerHTML = "";
    if(posts.length===0){
        for(let i=0;i<3;i++){
            feed.innerHTML += '<div class="videoPost placeholder">Video Placeholder</div>';
        }
    } else {
        posts.forEach((p, idx)=>{
            feed.innerHTML += `<div class="videoPost" style="opacity:0; animation:fadeIn 0.5s forwards; animation-delay:${idx*0.2}s;">
                <video src="${p.src}" controls loop muted playsinline style="width:100%; border-radius:15px;"></video>
                <div style="display:flex; justify-content:space-between; width:90%; margin-top:5px;">
                    <span>❤️</span><span>💬</span>
                </div>
            </div>`;
        });
        observeVideos();
    }
}

// ---------------- OBSERVE VIDEOS FOR AUTOPLAY ----------------
function observeVideos(){
    const videos = document.querySelectorAll("#videoFeed video");
    const options = { root: document.getElementById("videosScreen"), threshold: 0.5 };
    const observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){ entry.target.play(); }
            else { entry.target.pause(); }
        });
    }, options);

    videos.forEach(v=>observer.observe(v));
}

// ---------------- PROFILE POSTS ----------------
function renderProfilePosts(){
    const feed = document.getElementById('profilePosts');
    const posts = JSON.parse(localStorage.getItem("buzzify_posts")||"[]").filter(p=>p.user===localStorage.getItem("buzzify_user"));
    feed.innerHTML = "";
    if(posts.length===0){
        for(let i=0;i<3;i++){
            feed.innerHTML += '<div class="placeholder"></div>';
        }
    } else {
        posts.forEach(p=>{
            feed.innerHTML += `<div><img src="${p.src}" style="width:100%; height:100%; border-radius:10px;"></div>`;
        });
    }
}

// ---------------- MARKETPLACE ----------------
function loadMarket(){
    const feed = document.getElementById('marketFeed');
    const items = JSON.parse(localStorage.getItem("buzzify_market")||"[]");
    feed.innerHTML = "";
    if(items.length===0){
        for(let i=0;i<3;i++){ feed.innerHTML += '<div class="marketItem placeholder">Item</div>'; }
    } else {
        items.forEach((i,idx)=>{
            feed.innerHTML += `<div class="marketItem" style="opacity:0; animation:fadeIn 0.4s forwards; animation-delay:${idx*0.2}s;">
                <img src="${i.photo}">
                <strong>${i.name}</strong>
                <span>$${i.price}</span>
            </div>`;
        });
    }
}

function addItem(){
    const fileInput = document.getElementById('itemPhoto');
    const file = fileInput.files[0];
    const name = document.getElementById('itemName').value.trim();
    const price = document.getElementById('itemPrice').value;

    if(!file || !name || !price){ alert("Fill all fields"); return; }

    const reader = new FileReader();
    reader.onload = function(e){
        const items = JSON.parse(localStorage.getItem("buzzify_market")||"[]");
        items.unshift({photo:e.target.result,name,price});
        localStorage.setItem("buzzify_market", JSON.stringify(items));
        loadMarket();
        fileInput.value = "";
        document.getElementById('itemName').value="";
        document.getElementById('itemPrice').value="";
    };
    reader.readAsDataURL(file);
}

// ---------------- MESSAGES ----------------
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

// ---------------- INIT ----------------
window.onload = function(){
    if(localStorage.getItem("buzzify_user")){
        showApp();
    } else {
        showLogin();
    }
    renderHomeFeed();
    renderVideoFeed();
    renderProfilePosts();
    loadMarket();
    loadUsers();
}
